/* data.js — besin verileri, gruplar ve yüz ifadeleri için metinler */
const G = [
  ["🍎 Meyve", ["elma", "muz", "cilek", "portakal", "avokado", "uzum", "karpuz", "armut", "kiraz", "limon"]],
  ["🥦 Sebze", ["havuc", "brokoli", "ispanak", "domates", "salatalik", "mercimek"]],
  [
    "🥛 Süt-Protein",
    ["sut", "yogurt", "peynir", "yumurta", "balik", "tavuk", "kofte", "ceviz", "fistik", "su"],
  ],
  ["🍞 Tahıl", ["ekmek", "simit", "makarna", "pilav", "misir"]],
  ["🍔 Fast food", ["cips", "burger", "pizza", "patates", "sosis", "biber"]],
  [
    "🍭 Tatlı-İçecek",
    [
      "kola",
      "lolipop",
      "cupcake",
      "dondurma",
      "donut",
      "cikolata",
      "kurabiye",
      "pasta",
      "waffle",
      "bal",
      "meyvesuyu",
      "cay",
      "kahve",
      "enerji",
    ],
  ],
];
// face, anim, söz, bilimsel bilgi, efekt
const F = {
  elma: [
    "🍎",
    "Elma",
    [6, 5, 6],
    [
      [
        "yum",
        "jump",
        "Çıtır çıtır!",
        "Elma çiğnemek tükürüğü artırır; tükürük dişlerin yüzeyini temizlemeye yardım eder.",
        "🦷",
      ],
      [
        "love",
        "grow",
        "Lifli ve doyurucu!",
        "Elmadaki lif bağırsakları çalıştırır ve tokluk hissi verir.",
        "🍎",
      ],
    ],
  ],
  havuc: [
    "🥕",
    "Havuç",
    [7, 4, 3],
    [
      [
        "yum",
        "jump",
        "Gözlerim parladı!",
        "Havuçtaki beta-karoten vücutta A vitaminine dönüşür; göz sağlığı için önemlidir.",
        "👀",
      ],
      ["love", "wobble", "Tavşan gibi kıtır kıtır!", "A vitamini bağışıklığı ve cildi de destekler.", "🐰"],
    ],
  ],
  brokoli: [
    "🥦",
    "Brokoli",
    [10, 5, 3],
    [
      [
        "ew",
        "shake",
        "Tadı garip ama güçlendim!",
        "Brokoli C vitamini, K vitamini ve lif bakımından zengindir.",
        "💪",
      ],
      ["yum", "grow", "Kaslarım şişti!", "Brokolideki K vitamini kemik sağlığına katkı sağlar.", "💪"],
    ],
  ],
  muz: [
    "🍌",
    "Muz",
    [6, 10, 2],
    [
      [
        "love",
        "jump",
        "Enerji doldu!",
        "Muz potasyum içerir; kas ve sinirlerin çalışmasına yardım eder, doğal şekerle hızlı enerji verir.",
        "⚡",
      ],
      ["yum", "spin", "Koşmaya hazırım!", "Potasyum kas kramplarını önlemeye yardımcı olur.", "🏃"],
    ],
  ],
  cilek: [
    "🍓",
    "Çilek",
    [7, 4, 3],
    [
      ["love", "jump", "Tatlı ama dengeli!", "Çilek C vitamini ve antioksidan bakımından zengindir.", "🛡️"],
      [
        "yum",
        "wobble",
        "Bağışıklık kalkanı!",
        "C vitamini bağışıklık sisteminin çalışmasına yardım eder.",
        "🛡️",
      ],
    ],
  ],
  portakal: [
    "🍊",
    "Portakal",
    [7, 5, 2],
    [
      [
        "yum",
        "jump",
        "C vitamini patlaması!",
        "Portakal C vitamini içerir; bağışıklık ve yara iyileşmesi için gereklidir.",
        "🛡️",
      ],
      [
        "ew",
        "shake",
        "Ekşi! Yüzüm buruştu!",
        "Asitli meyveler diş minesini geçici yumuşatabilir; yedikten sonra su içmek iyi olur.",
        "😝",
      ],
    ],
  ],
  ispanak: [
    "🥬",
    "Ispanak",
    [9, 7, 2],
    [
      [
        "yum",
        "grow",
        "Demir takviyesi!",
        "Ispanak demir ve folat içerir; demir kanda oksijen taşınmasına yardım eder.",
        "💪",
      ],
      [
        "ew",
        "wobble",
        "Tuhaf tat ama güçlüyüm!",
        "C vitaminiyle birlikte yenen bitkisel demir daha iyi emilir.",
        "🍋",
      ],
    ],
  ],
  avokado: [
    "🥑",
    "Avokado",
    [8, 6, 2],
    [
      ["love", "wobble", "Kremsi ve doyurucu!", "Avokado tekli doymamış yağ, lif ve potasyum içerir.", "💚"],
      ["yum", "grow", "Cildim yumuşadı!", "Avokadodaki E vitamini hücreleri korumaya yardım eder.", "✨"],
    ],
  ],
  sut: [
    "🥛",
    "Süt",
    [8, 6, 10],
    [
      [
        "yum",
        "grow",
        "Kemiklerim güçleniyor!",
        "Sütteki kalsiyum ve D vitamini kemik ve dişlerin sertleşmesine yardım eder.",
        "🦴",
      ],
      [
        "love",
        "jump",
        "Kendimi dinç hissediyorum!",
        "Kemik kütlesi 30 yaş civarında en yüksek seviyeye ulaşır; sonrasında kalsiyum ve hareket kemikleri korumaya yardım eder.",
        "⭐",
      ],
      ["yum", "wobble", "Süt bıyığı çıktı!", "Süt kasların onarımı için gereken proteini de sağlar.", "🥛"],
    ],
  ],
  yogurt: [
    "🥣",
    "Yoğurt",
    [8, 5, 5],
    [
      [
        "yum",
        "wobble",
        "Bağırsaklarım mutlu!",
        "Yoğurttaki probiyotik bakteriler bağırsak florasını destekler.",
        "😊",
      ],
      ["love", "grow", "Kalsiyum yükü!", "Yoğurt kalsiyum ve protein bakımından zengindir.", "🦴"],
    ],
  ],
  peynir: [
    "🧀",
    "Peynir",
    [6, 5, 7],
    [
      [
        "yum",
        "grow",
        "Kalsiyum zamanı!",
        "Peynir kalsiyum içerir; ağızdaki asidi dengeleyerek çürük riskini azaltmaya yardım edebilir.",
        "🦷",
      ],
      [
        "love",
        "wobble",
        "Çok lezzetli!",
        "Peynirdeki protein ve kalsiyum kemik ve kaslar için gereklidir.",
        "🧀",
      ],
    ],
  ],
  yumurta: [
    "🥚",
    "Yumurta",
    [8, 7, 2],
    [
      [
        "yum",
        "grow",
        "Protein deposu!",
        "Yumurta, vücudun ihtiyaç duyduğu temel amino asitleri içerir.",
        "💪",
      ],
      ["love", "jump", "Beynim hızlandı!", "Yumurtadaki kolin beyin gelişimi için önemlidir.", "🧠"],
    ],
  ],
  balik: [
    "🐟",
    "Balık",
    [10, 6, 2],
    [
      [
        "love",
        "jump",
        "Beynim parlıyor!",
        "Balıktaki omega-3 yağ asitleri beyin ve göz gelişimini destekler.",
        "🧠",
      ],
      ["yum", "wobble", "Yüzme zamanı!", "Balık D vitamini ve kaliteli protein sağlar.", "🌊"],
    ],
  ],
  ceviz: [
    "🌰",
    "Ceviz",
    [8, 6, 2],
    [
      ["love", "jump", "Beyin gıdası!", "Ceviz omega-3 ve sağlıklı yağlar içerir.", "🧠"],
      [
        "yum",
        "grow",
        "Uzun süre tokum!",
        "Kuruyemişler sağlıklı yağ ve protein ile uzun süre tok tutar.",
        "🌰",
      ],
    ],
  ],
  mercimek: [
    "🍲",
    "Mercimek",
    [9, 7, 2],
    [
      ["yum", "grow", "Sıcacık, içim ısındı!", "Mercimek bitkisel protein, demir ve lif içerir.", "🔥"],
      [
        "love",
        "jump",
        "Güçlendim!",
        "Lif sindirimi düzenler ve kan şekerinin yavaş yükselmesine yardım eder.",
        "💪",
      ],
    ],
  ],
  su: [
    "💧",
    "Su",
    [5, 4, 3],
    [
      [
        "yum",
        "jump",
        "Ahh, ferahladım!",
        "Vücudun yaklaşık yarısı sudur; su ısıyı dengeler, besinleri taşır.",
        "💧",
      ],
      [
        "love",
        "spin",
        "Beynim susuz kalmasın!",
        "Hafif susuzluk bile dikkati ve ruh halini olumsuz etkileyebilir.",
        "💦",
      ],
    ],
  ],
  cips: [
    "🥔",
    "Cips",
    [-8, -2, -4],
    [
      [
        "sick",
        "tummy",
        "Çok tuzlu... karnım ağrıdı",
        "Fazla tuz vücudun su dengesini bozar; sık tüketim uzun vadede tansiyon riskini artırır.",
        "💧",
      ],
      [
        "shock",
        "shake",
        "Su, su! Çok tuzlu!",
        "Cips yağ ve tuz bakımından yoğundur ama besin değeri düşüktür.",
        "🧂",
      ],
      [
        "ew",
        "wobble",
        "Parmaklarım yağ içinde...",
        "İşlenmiş atıştırmalıklar çabuk sıkar ama kalori yoğundur.",
        "🛢️",
      ],
    ],
  ],
  burger: [
    "🍔",
    "Hamburger",
    [-6, 2, -3],
    [
      [
        "tired",
        "tummy",
        "Çok ağır geldi...",
        "Doymuş yağ fazlası sindirimi yavaşlatır, ağırlık ve uyku hali yapabilir.",
        "😴",
      ],
      [
        "yum",
        "wobble",
        "Lezzetli ama yağlı...",
        "Fast food düzenli yenirse kolesterolü ve kiloyu artırabilir.",
        "🍟",
      ],
    ],
  ],
  pizza: [
    "🍕",
    "Pizza",
    [-2, 4, -1],
    [
      [
        "yum",
        "jump",
        "Peynirli ve lezzetli!",
        "Pizza karbonhidrat ve protein verir ama tuz ve yağ fazla olabilir; sebzeli ve ara sıra olmalı.",
        "🍕",
      ],
      ["tired", "tummy", "Biraz fazla yedim galiba", "Aşırı porsiyon sindirimi yorar.", "😴"],
    ],
  ],
  patates: [
    "🍟",
    "Patates kızartması",
    [-6, 1, -2],
    [
      [
        "yum",
        "wobble",
        "Çıtır ama yağlı!",
        "Yüksek ısıda kızartmada akrilamid oluşur; fazla tüketilmemesi önerilir.",
        "🔥",
      ],
      ["tired", "tummy", "Karnım ağırlaştı", "Kızartmalar çok yağ içerir, sindirmek zaman alır.", "🛢️"],
    ],
  ],
  biber: [
    "🌶️",
    "Acı biber",
    [-3, 0, 0],
    [
      [
        "hot",
        "shake",
        "Ağzım yanıyor!!",
        "Acılık, kapsaisin maddesinin ağızdaki ağrı sinirlerini uyarmasıdır.",
        "🔥",
      ],
      ["hot", "tummy", "Midem yanıyor!", "Aşırı acı mide rahatsızlığına yol açabilir.", "🔥"],
      ["ew", "spin", "Gözlerim yaşardı!", "Süt veya yoğurt kapsaisini çözer; su acıyı pek geçirmez.", "😭"],
    ],
  ],
  kola: [
    "🥤",
    "Gazlı içecek",
    [-9, 3, -9],
    [
      [
        "sick",
        "tummy",
        "Gaz yaptı! Geğiriyorum...",
        "Gazlı içeceklerdeki karbondioksit mideyi şişirip gaz ve geğirmeye yol açabilir.",
        "💨",
      ],
      [
        "shock",
        "jump",
        "Şeker şoku! Zıplıyorum!",
        "Bir kutu gazlı içecekte 7-10 çay kaşığı kadar şeker olabilir; kan şekerini hızla yükseltip düşürür.",
        "🍬",
      ],
      [
        "ew",
        "shake",
        "Dişlerim sızlıyor!",
        "Şeker ve asit diş minesini aşındırarak çürük riskini artırır.",
        "🦷",
      ],
    ],
  ],
  lolipop: [
    "🍭",
    "Lolipop",
    [-5, 5, -10],
    [
      [
        "shock",
        "spin",
        "Şeker patlaması! Duramıyorum!",
        "Şeker kan glikozunu hızla yükseltir; sonra ani düşüşle yorgunluk gelebilir.",
        "⚡",
      ],
      [
        "ew",
        "shake",
        "Diş ağrısı!",
        "Ağızdaki bakteriler şekerle beslenip asit üretir ve çürük yapar. Uzun süre emilen şeker daha da risklidir.",
        "🦷",
      ],
    ],
  ],
  cupcake: [
    "🧁",
    "Cupcake",
    [-5, 4, -7],
    [
      [
        "love",
        "jump",
        "Tatlııı!",
        "Şeker beyindeki ödül merkezini uyarır; keyif verir ama etkisi kısa sürer.",
        "🧠",
      ],
      [
        "tired",
        "tummy",
        "Şekerim düştü, yoruldum...",
        "Hızla yükselen kan şekeri ardından düşünce yorgunluk ve açlık gelir.",
        "📉",
      ],
    ],
  ],
  dondurma: [
    "🍦",
    "Dondurma",
    [-4, 3, -6],
    [
      [
        "shock",
        "shake",
        "Beynim dondu!",
        'Soğuk, damaktaki sinirleri tetikler; "beyin donması" denen bu his geçicidir.',
        "🥶",
      ],
      [
        "yum",
        "wobble",
        "Soğuk ve tatlı!",
        "Dondurmada şeker ve doymuş yağ yüksektir; ara sıra yenmeli.",
        "🍦",
      ],
    ],
  ],
  donut: [
    "🍩",
    "Donut",
    [-6, 3, -7],
    [
      ["love", "jump", "Delikli mutluluk!", "Rafine un ve şeker hızla kana karışır.", "🍩"],
      ["sick", "tummy", "Midem bulandı...", "Yağda kızartılmış tatlılar mideyi ağırlaştırır.", "🤢"],
    ],
  ],
  cikolata: [
    "🍫",
    "Çikolata",
    [-3, 5, -5],
    [
      [
        "love",
        "jump",
        "Mutluluk geldi!",
        "Çikolata beyinde keyif verir; bitter olanda antioksidan daha çoktur.",
        "😊",
      ],
      [
        "shock",
        "spin",
        "Kafam karıştı, duramıyorum!",
        "Çikolatadaki kafein ve teobromin hafif uyarıcıdır.",
        "⚡",
      ],
    ],
  ],
  meyvesuyu: [
    "🧃",
    "Paketli meyve suyu",
    [-4, 3, -6],
    [
      [
        "ew",
        "shake",
        "Çok tatlı!",
        "Paketli meyve sularında lif yoktur ve şeker oranı yüksek olabilir.",
        "🧃",
      ],
      [
        "love",
        "jump",
        "Mmm, tatlı!",
        "Meyvenin kendisini yemek, suyunu içmekten daha lifli ve doyurucudur.",
        "🍊",
      ],
    ],
  ],
  domates: [
    "🍅",
    "Domates",
    [7, 5, 3],
    [
      [
        "yum",
        "jump",
        "Sulu sulu!",
        "Domatesteki likopen güçlü bir antioksidandır; C vitamini de içerir.",
        "🍅",
      ],
      ["love", "grow", "Kırmızı güç!", "Pişirilince likopen vücuda daha iyi emilir.", "💪"],
    ],
  ],
  salatalik: [
    "🥒",
    "Salatalık",
    [5, 3, 3],
    [
      [
        "yum",
        "wobble",
        "Ferahladım!",
        "Salatalığın yaklaşık %95'i sudur; susuzluğa karşı iyi bir destektir.",
        "💧",
      ],
      ["love", "jump", "Çıtır çıtır!", "Salatalık az kalorili ve lifli bir atıştırmalıktır.", "🥒"],
    ],
  ],
  uzum: [
    "🍇",
    "Üzüm",
    [6, 6, 2],
    [
      [
        "love",
        "jump",
        "Minik enerji topları!",
        "Üzümdeki doğal şeker hızlı enerji verir; kabuğundaki antioksidanlar hücreleri korur.",
        "⚡",
      ],
      [
        "yum",
        "wobble",
        "Tatlı ama doğal!",
        "Meyve yedikten sonra su içmek ağızdaki şekeri temizlemeye yardım eder.",
        "🍇",
      ],
    ],
  ],
  karpuz: [
    "🍉",
    "Karpuz",
    [5, 4, 2],
    [
      ["yum", "jump", "Su gibi!", "Karpuzun %90'ından fazlası sudur; yazın vücudu serinletir.", "💦"],
      ["love", "spin", "Çekirdek atma yarışı!", "Karpuz likopen ve C vitamini içerir.", "🍉"],
    ],
  ],
  tavuk: [
    "🍗",
    "Tavuk",
    [7, 7, 2],
    [
      [
        "yum",
        "grow",
        "Kas yapıcı!",
        "Tavuk, kasların büyümesi ve onarımı için kaliteli protein sağlar.",
        "💪",
      ],
      [
        "love",
        "jump",
        "Gücüm arttı!",
        "B vitaminleri yiyeceği enerjiye çevirmeye yardım eder; tavuk bu vitaminleri içerir.",
        "⚡",
      ],
    ],
  ],
  makarna: [
    "🍝",
    "Makarna",
    [2, 8, -1],
    [
      [
        "yum",
        "jump",
        "Enerji yüklendi!",
        "Makarna karbonhidrat içerir; karbonhidrat vücudun ana yakıtıdır.",
        "⚡",
      ],
      [
        "tired",
        "wobble",
        "Biraz uykum geldi...",
        "Büyük porsiyonlu rafine karbonhidratlar sonrasında halsizlik yapabilir.",
        "😴",
      ],
    ],
  ],
  ekmek: [
    "🍞",
    "Tam buğday ekmek",
    [4, 6, 0],
    [
      [
        "yum",
        "wobble",
        "Lifli ekmek harika!",
        "Tam tahıllı ekmek, beyaz ekmekten daha fazla lif ve B vitamini içerir.",
        "🌾",
      ],
      ["love", "grow", "Uzun süre tokum!", "Lif sindirimi yavaşlatarak daha uzun süre tok tutar.", "🌾"],
    ],
  ],
  misir: [
    "🍿",
    "Patlamış mısır",
    [2, 3, 0],
    [
      [
        "yum",
        "jump",
        "Pat pat pat!",
        "Patlamış mısır tam tahıldır ve lif içerir; yağsız ve tuzsuz yenirse iyi bir atıştırmalıktır.",
        "🍿",
      ],
      ["love", "wobble", "Film zamanı!", "Tuzlu ve tereyağlı hali kalori ve tuzu çok artırır.", "🎬"],
    ],
  ],
  kurabiye: [
    "🍪",
    "Kurabiye",
    [-4, 4, -6],
    [
      [
        "love",
        "jump",
        "Tatlı ve ufalanıyor!",
        "Kurabiyeler şeker ve tereyağı bakımından yoğundur; ara sıra yenmeli.",
        "🍪",
      ],
      [
        "ew",
        "wobble",
        "Dişime yapıştı!",
        "Yapışkan tatlılar dişlerde uzun süre kalıp çürük riskini artırır.",
        "🦷",
      ],
    ],
  ],
  sosis: [
    "🌭",
    "Sosis",
    [-6, 2, -2],
    [
      [
        "tired",
        "tummy",
        "Çok tuzlu ve yağlı...",
        "İşlenmiş etlerde tuz ve katkı maddeleri fazladır; sık tüketilmesi önerilmez.",
        "🧂",
      ],
      ["ew", "shake", "Su içmem lazım!", "Tuz hücrelerden su çeker; susama hissi bu yüzden gelir.", "💧"],
    ],
  ],
  bal: [
    "🍯",
    "Bal",
    [0, 6, -4],
    [
      [
        "love",
        "jump",
        "Tatlı enerji!",
        "Bal da bir şekerdir; doğal olsa bile fazlası dişlere zarar verir.",
        "🍯",
      ],
      [
        "yum",
        "wobble",
        "Yapış yapış!",
        "Bal kısa sürede enerji verir ama vitamin ve mineral miktarı azdır.",
        "🐝",
      ],
    ],
  ],
  kahve: [
    "☕",
    "Kahve",
    [-5, 6, -2],
    [
      [
        "shock",
        "shake",
        "Kalbim güm güm atıyor!",
        "Kafein sinir sistemini uyarır; fazlası uykuyu ve dikkati bozabilir.",
        "💓",
      ],
      [
        "tired",
        "wobble",
        "Gözüm kapanmıyor...",
        "Kafein, uyku baskısı yapan adenozinin etkisini engelleyerek uykuyu geciktirir.",
        "😵",
      ],
    ],
  ],
  enerji: [
    "🥫",
    "Enerji içeceği",
    [-10, 4, -8],
    [
      [
        "shock",
        "spin",
        "Kalbim hızlandı! Titriyorum!",
        "Enerji içecekleri çok kafein ve şeker içerir; fazla içilirse çarpıntı yapabilir.",
        "💓",
      ],
      [
        "sick",
        "tummy",
        "Midem bulandı!",
        "Yüksek kafein çarpıntı, mide bulantısı ve uyku sorunlarına yol açabilir.",
        "🤢",
      ],
    ],
  ],
  armut: [
    "🍐",
    "Armut",
    [6, 5, 4],
    [
      [
        "yum",
        "jump",
        "Sulu ve tatlı!",
        "Armut lif bakımından zengindir; kabuğuyla yenince bağırsakları çalıştırır.",
        "🍐",
      ],
      ["love", "wobble", "Midem rahatladı!", "Armuttaki pektin lifi sindirimi destekler.", "😌"],
    ],
  ],
  kiraz: [
    "🍒",
    "Kiraz",
    [6, 4, 3],
    [
      [
        "love",
        "jump",
        "Mmm, kiraz zamanı!",
        "Kiraz antioksidan (antosiyanin) içerir; hücreleri korumaya yardım eder.",
        "🍒",
      ],
      [
        "yum",
        "wobble",
        "Çekirdeğini tükürürüm!",
        "Kirazda doğal melatonin de bulunur; uyku düzenine katkı sağlayabilir.",
        "🌙",
      ],
    ],
  ],
  limon: [
    "🍋",
    "Limon",
    [4, 3, 1],
    [
      [
        "ew",
        "shake",
        "Ekşiii! Yüzüm büzüştü!",
        "Limondaki sitrik asit tat tomurcuklarını güçlü uyarır; dişlere uzun süre temas etmemeli.",
        "😝",
      ],
      [
        "yum",
        "wobble",
        "C vitamini yüklendi!",
        "C vitamini bağışıklığı destekler ve demirin emilimini artırır.",
        "🛡️",
      ],
    ],
  ],
  fistik: [
    "🥜",
    "Fıstık",
    [7, 6, 2],
    [
      [
        "love",
        "jump",
        "Kıtır protein!",
        "Fıstık protein ve sağlıklı yağ içerir; bazı kişilerde alerji yapabilir.",
        "🥜",
      ],
      ["yum", "grow", "Enerjim yükseldi!", "Fıstık E vitamini ve magnezyum içerir.", "💪"],
    ],
  ],
  kofte: [
    "🥩",
    "Köfte",
    [7, 7, 2],
    [
      ["yum", "grow", "Demir ve protein!", "Kırmızı et, kolay emilen demir ve protein içerir.", "💪"],
      ["love", "jump", "Kaslarım güçlendi!", "Kırmızı et çinko ve B12 vitamini sağlar.", "⚡"],
    ],
  ],
  pilav: [
    "🍚",
    "Pilav",
    [2, 7, 0],
    [
      [
        "yum",
        "jump",
        "Enerji yüklendi!",
        "Pirinç karbonhidrat kaynağıdır; karbonhidrat vücudun ana yakıtıdır.",
        "⚡",
      ],
      [
        "tired",
        "wobble",
        "Karnım doydu, uyku bastı...",
        "Bol karbonhidratlı öğünlerden sonra uyku hali olabilir.",
        "😴",
      ],
    ],
  ],
  simit: [
    "🥯",
    "Simit",
    [3, 6, -1],
    [
      ["yum", "wobble", "Susamlı ve çıtır!", "Susam kalsiyum ve sağlıklı yağ içerir.", "🌾"],
      [
        "love",
        "jump",
        "Sabah enerjisi!",
        "Simit karbonhidrat verir ama rafine undur; yanına süt veya peynir iyi olur.",
        "☀️",
      ],
    ],
  ],
  pasta: [
    "🍰",
    "Pasta",
    [-6, 4, -6],
    [
      ["love", "jump", "Kremalı mutluluk!", "Pastalarda şeker ve doymuş yağ yoğundur.", "🍰"],
      ["tired", "tummy", "Çok ağırdı, uykum geldi...", "Yüksek şeker ve yağ birlikte mideyi yorar.", "😴"],
    ],
  ],
  waffle: [
    "🧇",
    "Waffle",
    [-5, 4, -6],
    [
      ["love", "jump", "Soslu mutluluk!", "Waffle üstüne eklenen soslar şeker miktarını çok artırır.", "🧇"],
      ["sick", "tummy", "Midem tatlıdan bunaldı...", "Aşırı tatlı mideyi bulandırabilir.", "🤢"],
    ],
  ],
  cay: [
    "🍵",
    "Çay",
    [-2, 2, -3],
    [
      ["ew", "wobble", "Biraz acımsı...", "Çaydaki tanenler demir emilimini azaltır.", "🍵"],
      ["tired", "shake", "Uykum kaçtı!", "Çaydaki kafein akşam içilirse uykuyu bozabilir.", "😵"],
    ],
  ],
};
const NUT = {
  elma: "032020",
  havuc: "024010",
  brokoli: "134200",
  muz: "122030",
  cilek: "024020",
  portakal: "014120",
  ispanak: "234300",
  avokado: "132001",
  domates: "014010",
  salatalik: "012000",
  uzum: "012030",
  karpuz: "012020",
  sut: "301411",
  yogurt: "301311",
  peynir: "301402",
  yumurta: "402101",
  balik: "403101",
  tavuk: "401001",
  ceviz: "221102",
  mercimek: "342100",
  su: "000000",
  ekmek: "231000",
  makarna: "210000",
  misir: "130001",
  cips: "110004",
  burger: "310114",
  pizza: "211213",
  patates: "121004",
  sosis: "200004",
  biber: "013000",
  kola: "000040",
  lolipop: "000040",
  cupcake: "100042",
  dondurma: "100242",
  donut: "100042",
  cikolata: "110142",
  kurabiye: "100033",
  bal: "000040",
  meyvesuyu: "001040",
  kahve: "000010",
  enerji: "000040",
  armut: "031020",
  kiraz: "022020",
  limon: "014010",
  fistik: "320002",
  kofte: "401003",
  pilav: "110001",
  simit: "220002",
  pasta: "100043",
  waffle: "100043",
  cay: "000020",
};
const SALTY = ["cips", "sosis", "patates", "pizza", "burger"],
  SWEET = [
    "kola",
    "lolipop",
    "cupcake",
    "dondurma",
    "donut",
    "cikolata",
    "kurabiye",
    "meyvesuyu",
    "enerji",
    "bal",
  ],
  FRUIT = [
    "armut",
    "kiraz",
    "limon",
    "elma",
    "havuc",
    "brokoli",
    "muz",
    "cilek",
    "portakal",
    "ispanak",
    "avokado",
    "domates",
    "salatalik",
    "uzum",
    "karpuz",
  ];
const AF = {
  s: [
    ["Birazdan şekerim düşecek, yorulabilirim...", "📉"],
    ["Dişlerimi fırçalama zamanı! 🪥", "🦷"],
    ["Kalbim hızlı atıyor, şeker yüklendi!", "💓"],
  ],
  t: [
    ["Çok susadım, su lazım!", "💧"],
    ["Dilim tuz tuz oldu...", "🧂"],
    ["Yüzüm şişmiş gibi...", "🎈"],
  ],
  l: [
    ["Karnım tok, bağırsaklarım mutlu!", "😊"],
    ["Uzun süre acıkmam!", "🕒"],
  ],
  p: [
    ["Kaslarım güçleniyor!", "💪"],
    ["Beynim tam gaz çalışıyor!", "🧠"],
  ],
  k: [
    ["Kemiklerim sağlam!", "🦴"],
    ["Dişlerim parlıyor!", "😁"],
  ],
  v: [
    ["Bağışıklık kalkanım yükseldi!", "🛡️"],
    ["Cildim ışıldıyor!", "✨"],
  ],
  o: [
    ["Hmm, sırada ne var?", "🤔"],
    ["Bir şey daha yiyebilirim!", "😋"],
  ],
};

/* Her yiyeceğe besin değerlerine göre ek tepkiler üretir */
const XP = {
  p: [
    [
      "yum",
      "grow",
      "{n} ile kaslarım doyuyor!",
      "Protein kasların, organların ve bağışıklık hücrelerinin yapı taşıdır.",
      "💪",
    ],
    [
      "love",
      "jump",
      "Güçlendim gibi!",
      "Yetişkinlerin protein ihtiyacı günde kilo başına yaklaşık 0,8 gramdır; spor yapanlarda daha yüksektir.",
      "📈",
    ],
  ],
  k: [
    [
      "yum",
      "wobble",
      "Kemiklerim sağlamlaşıyor!",
      "Kemik kütlesi 30 yaş civarında zirveye ulaşır; sonrasında kalsiyum ve hareket onu korumaya yardım eder.",
      "🦴",
    ],
    ["love", "jump", "Gülüşüm parlıyor!", "Kalsiyum diş minesinin ana bileşenlerinden biridir.", "😁"],
  ],
  v: [
    [
      "love",
      "jump",
      "Vitamin yüklemesi yaptım!",
      "Vitaminler vücudun enerji üretimine ve savunma reaksiyonlarına yardım eder.",
      "🛡️",
    ],
    [
      "yum",
      "grow",
      "Bağışıklığım güçlendi!",
      "Renkli sebze ve meyveler farklı vitamin ve antioksidanlar sağlar.",
      "🌈",
    ],
  ],
  l: [
    ["yum", "wobble", "Karnım uzun süre tok!", "Lif sindirimi yavaşlatır ve tokluk hissini uzatır.", "🕒"],
    ["love", "jump", "Bağırsaklarım mutlu!", "Lif, bağırsaktaki faydalı bakterilere besin olur.", "😊"],
  ],
  z: [
    ["yum", "jump", "Enerji doldu!", "Karbonhidratlar vücudun ve beynin ana yakıtıdır.", "⚡"],
    ["love", "spin", "Koşasım geldi!", "Karbonhidrat kaslardaki glikojen depolarını doldurur.", "🏃"],
  ],
  s: [
    [
      "shock",
      "spin",
      "Şeker patladı kafamda!",
      "Şeker kan glikozunu hızla yükseltir, ardından düşüş gelebilir.",
      "📉",
    ],
    [
      "ew",
      "shake",
      "Dişlerim sızladı!",
      "Şeker ağızdaki bakteriler için yakıttır; bakteriler diş minesini çözen asit üretir.",
      "🦷",
    ],
    ["tired", "tummy", "Biraz bunaldım...", "Çok tatlı yiyecekler tokluk vermeden kalori yükler.", "🍬"],
  ],
  y: [
    [
      "tired",
      "tummy",
      "Karnım ağırlaştı...",
      "Yağ mideden daha yavaş boşalır; bu yüzden ağırlık hissi verir.",
      "🛢️",
    ],
    ["ew", "wobble", "Yağlanmış gibi hissediyorum", "Doymuş yağ fazlası kolesterolü yükseltebilir.", "🫀"],
  ],
};
Object.keys(F).forEach((k) => {
  const n = NUT[k].split("").map(Number),
    g = F[k][2][0] >= 0,
    x = [];
  if (g) {
    if (n[0] >= 3) x.push(...XP.p);
    if (n[3] >= 3) x.push(...XP.k);
    if (n[2] >= 3) x.push(...XP.v);
    if (n[1] >= 3) x.push(...XP.l);
    if (!x.length && F[k][2][1] >= 6) x.push(...XP.z);
  } else {
    if (n[4] >= 3) x.push(...XP.s);
    if (n[5] >= 3) x.push(...XP.y);
  }
  if (x.length < 2)
    x.push(
      ...(g
        ? [
            [
              "yum",
              "wobble",
              "{n} fena değil!",
              "Her besin vücuda farklı bir şey katar; önemli olan çeşitli ve ölçülü yemektir.",
              "⚖️",
            ],
            [
              "love",
              "jump",
              "Kendimi hafif hissediyorum!",
              "Yeterli sıvı ve dengeli beslenme dikkat ve enerji düzeyini korur.",
              "✨",
            ],
          ]
        : [
            [
              "ew",
              "wobble",
              "{n}... çok sık olmasın!",
              "Bu tür yiyecekler ara sıra yenebilir; ama her gün yenmesi dengeyi bozar.",
              "⚠️",
            ],
            [
              "tired",
              "shake",
              "Biraz fazla geldi...",
              "Besin değeri düşük yiyecekler doyurur gibi görünür ama vücuda gereken vitamin ve mineralleri vermez.",
              "😕",
            ],
          ]),
    );
  x.sort(() => Math.random() - 0.5);
  x.slice(0, 3).forEach((r) => F[k][3].push(r.map((t) => String(t).replace("{n}", F[k][1]))));
});
