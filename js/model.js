/* ============================================================
   model.js — oyun durumu ve beslenme kuralları (DOM'a dokunmaz,
   yalnızca toast/meters/render gibi arayüz işlevlerini çağırır)
   ============================================================ */

/* Besin grupları */
const FAST = ["cips", "burger", "pizza", "patates", "sosis"];
const ACID = ["kola", "limon", "portakal", "meyvesuyu", "enerji"];
const STICKY = ["lolipop", "kurabiye", "bal", "pasta", "waffle", "donut", "cupcake"];
const CAF = { kahve: 25, enerji: 40, cay: 10, cikolata: 8, kola: 10 };

/* Vücut modelinin başlangıç değerleri (hepsi 0-100 ölçeğinde)
   f kilo, m kas, h boy, td diş çürüğü, cv kalıcı çürük, ac cilt sorunu,
   cf kafein, bn kemik, br zeka, im bağışıklık, gt bağırsak, ht kalp riski,
   hy su dengesi, bs kan şekeri, gs şişkinlik, fu tokluk,
   jit kısa süreli heyecan/titreme (hızla söner) */
const BODY0 = {
  f: 20,
  m: 10,
  h: 0,
  td: 0,
  cv: 0,
  ac: 0,
  cf: 0,
  bn: 30,
  br: 30,
  im: 50,
  gt: 50,
  ht: 20,
  hy: 60,
  bs: 0,
  gs: 0,
  fu: 20,
  jit: 0,
};

/* Ölçek: Ömer yetişkin. Boy ve kilo, 0-100 puanlık vücut değerlerinden hesaplanır. */
const BASE_HEIGHT_CM = 175;
const HEIGHT_CM_PER_POINT = 0.06;
const BASE_WEIGHT_KG = 62;
const KG_PER_FAT = 0.35;
const KG_PER_MUSCLE = 0.1;
const heightCm = () => BASE_HEIGHT_CM + B.h * HEIGHT_CM_PER_POINT;
const weightKg = () => BASE_WEIGHT_KG + B.f * KG_PER_FAT + B.m * KG_PER_MUSCLE;
const heightScale = () => 1 + (B.h * HEIGHT_CM_PER_POINT) / BASE_HEIGHT_CM;

/* Oyun durumu */
let st; // [sağlık, enerji, diş]
let B; // vücut modeli
let last = {},
  eaten = [],
  times = [];
let sug, salt, streak, tot, hist, cnt, prevK;
let flex = 0; // kas gösterme animasyonunun bitiş zamanı
let lastFeed = 0;
let un = []; // açılmış rozetler
try {
  un = JSON.parse(localStorage.getItem("mb") || "[]");
} catch (e) {}

function resetState() {
  st = [60, 60, 80];
  B = { ...BODY0 };
  last = {};
  eaten = [];
  times = [];
  sug = salt = streak = 0;
  tot = [0, 0, 0, 0, 0, 0];
  hist = [[60, 60, 80]];
  cnt = {};
  prevK = "";
  lastFeed = 0;
}

/* Her saniye: kısa süreli etkiler söner */
function tickBody() {
  B.bs *= 0.97;
  B.gs *= 0.96;
  B.cf *= 0.985;
  B.jit *= 0.86;
  B.fu = Math.max(0, B.fu - 0.45);
  B.hy = Math.max(0, B.hy - 0.25);
}

/* Titreme şiddeti 0-1: yalnızca heyecan belirgin olduğunda başlar */
function jitterAmount() {
  return B.jit > 20 ? Math.min(1, (B.jit - 20) / 80) : 0;
}

/* Uzun süre bir şey yenmediyse Ömer ihtiyacını söyler */
function ambientLine() {
  if (B.hy < 15) return "Çok susadım, biraz su lazım.";
  if (B.fu <= 3 && eaten.length) return "Karnım guruldadı, acıktım.";
  if (B.bs > 75) return "Duramıyorum, çok şeker yedim!";
  if (B.gs > 60) return "Karnım şişti, gaz var.";
  if (B.im < 20) return "Hapşuu! Bağışıklığım düştü.";
  return null;
}

function combo(k, r) {
  const p = prevK;
  const sw = SWEET.reduce((a, x) => a + (cnt[x] || 0), 0),
    fr = FRUIT.reduce((a, x) => a + (cnt[x] || 0), 0);
  if (SWEET.includes(k) && sw >= 3 && (sw + 1) % 4 === 0) {
    st[2] = Math.max(0, st[2] - 10);
    return [
      "sick",
      "shake",
      "Diş ağrısı başladı! Ahh!",
      "Sık şekerli yiyecek diş çürüğü riskini artırır; bakteriler şekerden asit üretir. Fırçalamak ve şekeri azaltmak gerekir.",
      "🦷",
    ];
  }
  if (FRUIT.includes(k) && fr >= 5 && (fr + 1) % 6 === 0) {
    st[0] = Math.min(100, st[0] + 8);
    return [
      "love",
      "grow",
      "Formda ve güçlü hissediyorum!",
      "Düzenli ve çeşitli beslenme enerji, bağışıklık ve kas sağlığı için en önemli temeldir.",
      "🌟",
    ];
  }
  if (cnt[k] === 2 && k !== "su")
    return [
      "tired",
      "wobble",
      F[k][1] + " hep aynı... Çeşit lazım!",
      "Tek tip beslenme bazı vitamin ve minerallerin eksik kalmasına yol açar; renkli ve çeşitli yemek önemlidir.",
      "🌈",
    ];
  if (cnt[k] === 5)
    return [
      "sick",
      "tummy",
      "Hep " + F[k][1].toLowerCase() + " yedim, midem bunaldı...",
      "Bir besini çok fazla yemek diğerlerinin yerini alır ve dengeyi bozar.",
      "⚖️",
    ];
  if ((k === "sut" || k === "yogurt") && p === "biber")
    return [
      "yum",
      "jump",
      "Süt acıyı söndürdü! Ahh!",
      "Sütteki kazein proteini kapsaisini çözer; su ise acıyı ağzın her yerine yayar.",
      "🥛",
    ];
  if (k === "sut" && p === "kurabiye")
    return [
      "love",
      "jump",
      "Süt ve kurabiye, klasik ikili!",
      "Kalsiyum dişleri güçlendirir ama şekerli yiyeceklerden sonra fırçalamak yine şart.",
      "🍪",
    ];
  if (k === "su" && salt >= 4)
    return [
      "yum",
      "jump",
      "Tuzu yıkadım, susuzluğum geçti!",
      "Su, fazla tuzun böbrekler yoluyla atılmasına yardım eder.",
      "💧",
    ];
  if (k === "su" && sug >= 4)
    return [
      "yum",
      "wobble",
      "Ağzım temizlendi!",
      "Su, dişlerdeki şekeri ve asidi seyrelterek çürük riskini azaltır.",
      "🦷",
    ];
  if (SWEET.includes(k) && sug >= 6)
    return [
      "shock",
      "spin",
      "Şeker çarpması! Dünya dönüyor!",
      "Üst üste şeker, kan şekerini hızla yükseltip düşürür; titreme, yorgunluk ve baş dönmesi yapabilir.",
      "🌪️",
    ];
  if (SALTY.includes(k) && salt >= 6)
    return [
      "sick",
      "tummy",
      "Şişmiş gibiyim, ayaklarım ağır...",
      "Fazla tuz vücutta su tutulmasına yol açar; şişkinlik hissi verir.",
      "🎈",
    ];
  if (streak >= 3 && F[k][2][0] > 0)
    return [
      "love",
      "grow",
      "Süper güç! Kendimi çok güçlü hissediyorum!",
      "Çeşitli ve dengeli beslenme vitamin, mineral ve lif dengesini korur.",
      "🌈",
    ];
  return r;
}

function bodyUp(k) {
  const n = NUT[k].split("").map(Number),
    h = F[k][2][0],
    o = { ...B },
    c = (v, a, b) => Math.max(a, Math.min(b, v));
  let f = 0,
    m = 0,
    g = 0,
    t = 0,
    a = 0;
  if (FAST.includes(k)) f += 9;
  else if (SWEET.includes(k)) f += 5;
  else if (h >= 5) f -= 1.5;
  else if (h < 0) f += 3;
  if (k === "su") f -= 0.5;
  if (n[0] >= 3) m += h > 0 ? 7 : 2;
  else if (n[0] >= 2 && h > 0) m += 3;
  if (n[3] >= 3) g += 6;
  else if (n[3] >= 1 && h > 0) g += 1;
  if (n[0] >= 3 && h > 0) g += 2;
  if (ACID.includes(k)) t += 8;
  else if (n[4] >= 3 && h < 0) t += 6;
  else if (n[4] >= 3) t += 1;
  if (STICKY.includes(k)) t += 2;
  if (k === "cay" || k === "kahve") t += 2;
  if (["sut", "yogurt", "peynir"].includes(k)) t -= 3;
  if (k === "su") t -= 4;
  if (["elma", "havuc", "salatalik"].includes(k)) t -= 2;
  if (FAST.includes(k) || SWEET.includes(k)) a += 5;
  if (k === "su") a -= 3;
  if (n[2] >= 3) a -= 2;
  B.f = c(B.f + f, 0, 100);
  B.m = c(B.m + m, 0, 100);
  B.h = c(B.h + g, 0, 100);
  B.td = c(B.td + t, B.cv, 100);
  B.ac = c(B.ac + a, 0, 100);
  const WET = {
      karpuz: 6,
      salatalik: 6,
      portakal: 5,
      domates: 4,
      sut: 5,
      meyvesuyu: 3,
      cilek: 3,
      uzum: 3,
      elma: 2,
      cay: -1,
    },
    CARB = ["makarna", "pilav", "simit", "ekmek", "misir"],
    GAS = { kola: 30, enerji: 25, mercimek: 12, brokoli: 8, patates: 4 };
  let gt = 0,
    bn = 0,
    br = 0,
    im = 0,
    ht = 0,
    hy = 0;
  if (n[1] >= 2) gt += 5;
  if (k === "yogurt") gt += 8;
  if (FAST.includes(k) || SWEET.includes(k)) gt -= 4;
  if (n[3] >= 3) bn += 6;
  else if (n[3] >= 1 && h > 0) bn += 1;
  if (k === "kola" || k === "enerji") bn -= 4;
  if (SALTY.includes(k)) bn -= 1;
  if (["balik", "yumurta", "ceviz"].includes(k)) br += 8;
  else if (n[0] >= 3 && h > 0) br += 2;
  if (n[2] >= 3) br += 2;
  if (SWEET.includes(k)) br -= 2;
  if (k === "enerji") br -= 3;
  if (n[2] >= 3) im += 6;
  if (h >= 5) im += 2;
  if (FAST.includes(k) || SWEET.includes(k)) im -= 3;
  if (n[5] >= 3) ht += 6;
  if (SALTY.includes(k)) ht += 3;
  if (n[1] >= 3) ht -= 2;
  if (k === "balik") ht -= 4;
  if (k === "ceviz") ht -= 3;
  if (h >= 5) ht -= 1.5;
  if (k === "su") hy = 20;
  else if (WET[k] != null) hy = WET[k];
  else if (SALTY.includes(k)) hy = -6;
  else if (k === "kahve" || k === "enerji") hy = -4;
  B.gt = c(B.gt + gt, 0, 100);
  B.bn = c(B.bn + bn, 0, 100);
  B.br = c(B.br + br, 0, 100);
  B.im = c(B.im + im, 0, 100);
  B.ht = c(B.ht + ht, 0, 100);
  B.hy = c(B.hy + hy, 0, 100);
  B.bs = c(B.bs + n[4] * 12 + (CARB.includes(k) ? 10 : 0), 0, 100);
  B.gs = c(B.gs + (GAS[k] || 0), 0, 100);
  B.fu = c(B.fu + 14 + n[0] * 2 + n[1] * 3, 0, 100);
  lastFeed = Date.now();
  B.cf = c(B.cf * 0.7 + (CAF[k] || 0), 0, 100);
  B.jit = Math.min(100, B.jit + (CAF[k] || 0) * 1.2 + (n[4] >= 3 ? 18 : 0));
  B.cv = Math.max(B.cv, Math.max(0, B.td - 55) * 0.8);
  if (m >= 3) flex = performance.now() + 1600;
  const M = [
    [o.f, B.f, 25, "⚖️ Ömer kilo alıyor!", "⚖️ Ömer zayıflıyor"],
    [o.m, B.m, 25, "💪 Kasları belirginleşti!"],
    [o.h, B.h, 20, "📏 Boyu uzadı!"],
    [o.cv, B.cv, 10, "🦷 Dişlerinde kalıcı çürük başladı!"],
    [o.bn, B.bn, 25, "🦴 Kemikleri güçlendi!", "🦴 Kemikleri zayıflıyor"],
    [o.br, B.br, 25, "🧠 Zekası parladı!", "🧠 Zihni bulanıyor"],
    [o.im, B.im, 25, "🛡️ Bağışıklığı güçlendi!", "🤧 Bağışıklığı zayıfladı"],
    [o.ht, B.ht, 25, "🫀 Kalp riski artıyor!"],
    [o.gt, B.gt, 25, "😊 Bağırsakları mutlu!", "😖 Bağırsakları bozuldu"],
  ];
  for (const q of M) {
    const a1 = Math.floor(q[1] / q[2]),
      a0 = Math.floor(q[0] / q[2]);
    if (a1 > a0) {
      toast(q[3]);
      break;
    }
    if (q[4] && a1 < a0) {
      toast(q[4]);
      break;
    }
  }
  return o;
}

const QP = [
  ["3 farklı meyve ye", () => FRUIT.filter((x) => cnt[x]).length >= 3],
  ["2 bardak su iç", () => (cnt.su || 0) >= 2],
  ["Bir süt ürünü ye", () => cnt.sut || cnt.yogurt || cnt.peynir],
  ["Gazlı/enerji içeceği içmeden 6 yiyecek ye", () => eaten.length >= 6 && !cnt.kola && !cnt.enerji],
  ["Protein ye: yumurta, balık, tavuk veya köfte", () => cnt.yumurta || cnt.balik || cnt.tavuk || cnt.kofte],
  ["Havuç, brokoli veya ıspanak ye", () => cnt.havuc || cnt.brokoli || cnt.ispanak],
  ["Sağlığı %80 üstüne çıkar", () => st[0] >= 80],
  [
    "En fazla 1 şekerli ile 8 yiyecek ye",
    () => eaten.length >= 8 && SWEET.reduce((a, x) => a + (cnt[x] || 0), 0) <= 1,
  ],
];
const day = Math.floor(Date.now() / 864e5),
  QS = [0, 1, 2].map((i) => ((day % 8) + 3 * i) % 8);
let qd = { d: day, done: [] };
try {
  const x = JSON.parse(localStorage.getItem("mq") || "null");
  if (x && x.d === day) qd = x;
} catch (e) {}
function quest() {
  let ch = 0;
  QS.forEach((i) => {
    if (!qd.done.includes(i) && QP[i][1]()) {
      qd.done.push(i);
      ch = 1;
      toast("📋 Görev tamamlandı! +10 sağlık");
      st[0] = Math.min(100, st[0] + 10);
      meters();
      try {
        localStorage.setItem("mq", JSON.stringify(qd));
      } catch (e) {}
    }
  });
  if (ch) render();
}

const BD = [
  ["🌈", "Gökkuşağı", "5 farklı meyve/sebze", () => FRUIT.filter((x) => cnt[x]).length >= 5],
  ["🦴", "Kemik Ustası", "4 süt ürünü", () => (cnt.sut || 0) + (cnt.yogurt || 0) + (cnt.peynir || 0) >= 4],
  ["🧠", "Beyin Gücü", "Balık, yumurta, ceviz", () => cnt.balik && cnt.yumurta && cnt.ceviz],
  ["💧", "Su Kahramanı", "3 kez su iç", () => cnt.su >= 3],
  ["🔥", "Ateş Ağızlı", "Acı biber ye", () => cnt.biber],
  [
    "🍬",
    "Şeker Canavarı",
    "6 şekerli şey (dikkat!)",
    () => SWEET.reduce((a, x) => a + (cnt[x] || 0), 0) >= 6,
  ],
  ["🍽️", "Gurme", "15 farklı yiyecek", () => Object.keys(cnt).length >= 15],
  ["💪", "Süper Form", "Sağlık %95+", () => st[0] >= 95],
  ["🤢", "Mide Bulantısı", "Sağlık %15 altı", () => st[0] <= 15],
  ["🍎", "Meyve Avcısı", "10 meyve/sebze", () => FRUIT.reduce((a, x) => a + (cnt[x] || 0), 0) >= 10],
  ["🧂", "Tuz Kaçağı", "5 tuzlu şey", () => SALTY.reduce((a, x) => a + (cnt[x] || 0), 0) >= 5],
  ["🥦", "Sebze Sever", "Brokoli + ıspanak", () => cnt.brokoli && cnt.ispanak],
  ["🌾", "Tahıl Gücü", "Ekmek, simit, pilav", () => cnt.ekmek && cnt.simit && cnt.pilav],
  [
    "⚖️",
    "Dengeli Tabak",
    "10+ yiyecek, dengeli",
    () =>
      eaten.length >= 10 && (tot[0] + tot[1] + tot[2] + tot[3]) / 48 > 0.4 && (tot[4] + tot[5]) / 24 < 0.25,
  ],
  ["🧠", "Zeki Kafa", "Zeka %80+", () => B.br >= 80],
  ["🦴", "Çelik Kemik", "Kemik %80+", () => B.bn >= 80],
  ["⚡", "Hiperaktif", "Kan şekeri %80+", () => B.bs >= 80],
  ["💨", "Gaz Bombası", "Şişkinlik %70+", () => B.gs >= 70],
  ["🫀", "Kalp Dostu", "10+ yiyecek, kalp riski düşük", () => eaten.length >= 10 && B.ht <= 15],
  ["🛡️", "Demir Bağışıklık", "Bağışıklık %85+", () => B.im >= 85],
  ["🦷", "Çürük Avı", "Dişler %50 bozuk", () => B.td >= 50],
  ["🏋️", "Kas Yığını", "Kas %60+", () => B.m >= 60],
  ["🍔", "Kilolu", "Kilo %70+", () => B.f >= 70],
  ["📏", "Boy Uzadı", "Boy %50+", () => B.h >= 50],
  ["😊", "Mutlu Bağırsak", "Bağırsak %85+", () => B.gt >= 85],
];
