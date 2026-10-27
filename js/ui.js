/* ============================================================
   ui.js — arayüz, etkileşim ve çizimler
   ============================================================ */

/* Metinlerdeki emojileri ayıklar: konuşma balonu ve etiketler düz metin kalır */
const stripEmoji = (t) =>
  t
    .replace(/[\p{Extended_Pictographic}️‍]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
const R = Math.round;
const fmt = (n, d = 1) => n.toLocaleString("tr-TR", { minimumFractionDigits: d, maximumFractionDigits: d });

let aid = 0; // bekleyen "after" konuşmasını iptal etmek için
let timer;
let drag = null;
let lastMsg = 0;
let muted = false;
let audioCtx;

const OF = [
  ["Günlük", "👕", "#7FB2E5", "#35557F", "#EEEEEE", {}],
  ["Okul", "🎒", "#F2F2F2", "#1F2A44", "#1A1A1A", { tie: 1 }],
  ["Spor", "⚽", "#D32F2F", "#1E1E1E", "#FFFFFF", { stripe: 1 }],
  ["Kış", "🧥", "#2F6B4F", "#3A3A3A", "#5B3A21", { hat: 1, scarf: "#F4C430", bulk: 1 }],
  ["Bayramlık", "🎉", "#F6F1E7", "#3B3B4A", "#2A1A12", { vest: 1 }],
  ["Gezi", "🥾", "#6B7A3A", "#8B7A55", "#6A4B2A", { scarf: "#6B7A3A" }],
];

let oi = 0;
try {
  oi = +localStorage.getItem("mo") || 0;
} catch (e) {}
window.applyOutfit = () => window.setOutfit && window.setOutfit(OF[oi].slice(2));

/* ---------- Küçük yardımcılar ---------- */
function say(text) {
  $("bubble").textContent = stripEmoji(text);
}

function setFact(title, text) {
  $("fact").innerHTML = title
    ? `<strong>${title}</strong> ${text}`
    : "Bir yiyeceği Ömer’e sürükle ya da dokun. Vücudunda ne değiştiğini sağdaki raporda izle.";
}

function anim(a) {
  kid.className = "";
  void kid.offsetWidth;
  kid.className = "a-" + a + (a === "tummy" ? " hold" : "");
}

function toast(t) {
  const e = $("toast");
  e.textContent = stripEmoji(t);
  e.classList.add("show");
  setTimeout(() => e.classList.remove("show"), 2600);
}

function meters() {
  st.forEach((v, i) => {
    const b = $("b" + i);
    b.style.width = v + "%";
    b.dataset.c = v < 30 ? "bad" : v < 55 ? "warn" : "good";
    $("v" + i).textContent = R(v);
  });
}

/* ---------- Değişim çipleri ---------- */
/* [anahtar, etiket, birim katsayısı, birim, iyi yön (+1 artış iyi, -1 azalış iyi, 0 nötr)] */
const DELTAS = [
  ["f", "Kilo", KG_PER_FAT, " kg", 0],
  ["m", "Kas", 1, "%", 1],
  ["h", "Boy", HEIGHT_CM_PER_POINT, " cm", 1],
  ["td", "Diş çürüğü", 1, "%", -1],
  ["bn", "Kemik", 1, "%", 1],
  ["br", "Zeka", 1, "%", 1],
  ["im", "Bağışıklık", 1, "%", 1],
  ["ht", "Kalp riski", 1, "%", -1],
  ["hy", "Su dengesi", 1, "%", 1],
  ["bs", "Kan şekeri", 1, "%", -1],
  ["gs", "Şişkinlik", 1, "%", -1],
  ["gt", "Bağırsak", 1, "%", 1],
  ["cf", "Kafein", 1, "%", -1],
];

function deltaChips(before) {
  return DELTAS.map(([k, label, scale, unit, pol]) => {
    const pts = B[k] - before[k];
    return { label, unit, pol, pts, d: pts * scale };
  })
    .filter((x) => Math.abs(x.pts) >= 1)
    .sort((a, b) => Math.abs(b.pts) - Math.abs(a.pts))
    .slice(0, 3);
}

function showChips(list) {
  const box = $("chips");
  list.forEach((x, i) => {
    const el = document.createElement("div");
    const tone = x.pol === 0 ? "neutral" : x.d * x.pol > 0 ? "good" : "bad";
    el.className = "chip chip--" + tone;
    el.style.animationDelay = i * 90 + "ms";
    el.textContent =
      x.label +
      " " +
      (x.d > 0 ? "+" : "−") +
      Math.abs(x.d).toLocaleString("tr-TR", { maximumFractionDigits: 1 }) +
      x.unit;
    box.appendChild(el);
    while (box.children.length > 5) box.firstChild.remove();
    setTimeout(() => el.remove(), 3200);
  });
}

/* ---------- Konuşma: yedikten sonra ---------- */
function after(k) {
  const n = NUT[k].split("").map(Number),
    a = [];
  if (n[4] >= 3) a.push(...AF.s);
  if (n[5] >= 3 && SALTY.includes(k)) a.push(...AF.t);
  if (n[1] >= 3) a.push(...AF.l);
  if (n[0] >= 3) a.push(...AF.p);
  if (n[3] >= 3) a.push(...AF.k);
  if (n[2] >= 3) a.push(...AF.v);
  if (!a.length) a.push(...AF.o);
  if (k === "kola" || k === "enerji") a.unshift(["Hııık! Geğirdim, pardon!"], ["Hııık! Geğirdim, pardon!"]);
  const t = a[(Math.random() * a.length) | 0][0];
  const my = ++aid;
  setTimeout(() => {
    if (my === aid) say(t);
  }, 2500);
}

/* ---------- Besleme ---------- */
function feed(k) {
  const f = F[k],
    pool = f[3];
  let i;
  do {
    i = Math.floor(Math.random() * pool.length);
  } while (pool.length > 1 && i === last[k]);
  last[k] = i;

  let [face_, an, line, fact] = combo(k, pool[i]);
  const before = bodyUp(k);
  st = st.map((v, j) => Math.max(0, Math.min(100, v + f[2][j] * 2)));

  const now = Date.now();
  times = times.filter((t) => now - t < 45000);
  times.push(now);
  if (times.length >= 7) {
    face_ = "tired";
    an = "tummy";
    line = "Karnım patlayacak, artık yiyemem.";
    fact =
      "Mide dolunca beyne “tokum” sinyali gider; bu sinyal yaklaşık 20 dakikada ulaşır. Yavaş yemek aşırı yemeyi önler.";
  }

  setFace(face_, face_ === "sick" ? "#C5E8A0" : face_ === "hot" ? "#FF9E8A" : null);
  snd(face_);
  anim(an);
  say(line);
  setFact(f[1] + ":", fact);
  showChips(deltaChips(before));
  meters();
  eaten.push(f[0]);
  track(k);
  renderLog();
  if (!window.K3)
    kid.style.scale =
      (1 + (B.f / 100) * 0.35 + (B.m / 100) * 0.1).toFixed(3) + " " + heightScale().toFixed(3);

  clearTimeout(timer);
  timer = setTimeout(() => {
    kid.classList.remove("hold");
    const m =
      st[0] < 30
        ? ["tired", "Kendimi halsiz hissediyorum."]
        : st[0] > 80
          ? ["love", "Kendimi çok iyi hissediyorum."]
          : ["idle", "Bir şey daha yiyebilir miyim?"];
    setFace(m[0], st[0] < 30 ? "#E6D9C3" : null);
    say(m[1]);
  }, 4200);
}

function track(k) {
  after(k);
  setTimeout(quest, 60);
  cnt[k] = (cnt[k] || 0) + 1;
  const n = NUT[k];
  n.split("").forEach((d, i) => (tot[i] += +d));
  sug = sug * 0.75 + +n[4];
  salt = salt * 0.75 + (SALTY.includes(k) ? 4 : 0);
  streak = F[k][2][0] > 0 ? streak + 1 : 0;
  prevK = k;
  hist.push([...st]);
  BD.forEach((b) => {
    if (!un.includes(b[1]) && b[3]()) {
      un.push(b[1]);
      toast("Yeni rozet: " + b[1]);
      try {
        localStorage.setItem("mb", JSON.stringify(un));
      } catch (e) {}
    }
  });
  render();
}

function reset() {
  aid++;
  clearTimeout(timer);
  resetState();
  kid.style.scale = "1";
  kid.className = "";
  meters();
  setFace("idle");
  say("Ben Ömer. Karnım aç, beni besle.");
  setFact();
  renderLog();
  render();
}

function renderLog() {
  $("log").innerHTML = eaten
    .slice(-8)
    .map((e) => `<span>${e}</span>`)
    .join("");
  $("logEmpty").hidden = eaten.length > 0;
}

/* ---------- Yiyecek paneli ---------- */
const quality = (k) => (F[k][2][0] >= 5 ? "good" : F[k][2][0] > -4 ? "mid" : "low");
const QNAME = { good: "Besleyici", mid: "Dengeli", low: "Ara sıra" };

function tabs(i) {
  $("tabs").innerHTML = G.map(
    (g, j) =>
      `<button class="tab" role="tab" aria-selected="${j === i}" data-i="${j}">${stripEmoji(g[0])}</button>`,
  ).join("");
  $("tray").innerHTML = G[i][1]
    .map(
      (k) =>
        `<button class="food" data-k="${k}" title="${QNAME[quality(k)]}"><span class="food__ico">${F[k][0]}</span><span class="food__name">${F[k][1]}</span><i class="food__dot" data-q="${quality(k)}"></i></button>`,
    )
    .join("");
}

$("tabs").onclick = (e) => {
  const b = e.target.closest(".tab");
  if (b) tabs(+b.dataset.i);
};
$("reset").onclick = reset;

/* Sürükle-bırak: yiyecek Ömer'in üzerine bırakılırsa yenir, kısa dokunuş da yeter */
const ghost = $("ghost");
function over(x, y) {
  const r = kid.getBoundingClientRect();
  return x > r.left - 20 && x < r.right + 20 && y > r.top - 20 && y < r.bottom + 10;
}
$("tray").addEventListener("pointerdown", (e) => {
  const b = e.target.closest(".food");
  if (!b) return;
  drag = { k: b.dataset.k, x: e.clientX, y: e.clientY, m: false };
  b.setPointerCapture(e.pointerId);
});
$("tray").addEventListener("pointermove", (e) => {
  if (!drag) return;
  if (!drag.m && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) > 8) {
    drag.m = true;
    ghost.textContent = F[drag.k][0];
    ghost.style.display = "block";
  }
  if (drag.m) {
    ghost.style.left = e.clientX + "px";
    ghost.style.top = e.clientY + "px";
    const o = over(e.clientX, e.clientY);
    $("stage").classList.toggle("is-over", o);
    if (o && !kid.dataset.o) setFace("open");
    else if (!o && kid.dataset.o) setFace("idle");
    kid.dataset.o = o ? "1" : "";
  }
});
function endDrag(e, ok) {
  if (!drag) return;
  const d = drag;
  drag = null;
  ghost.style.display = "none";
  $("stage").classList.remove("is-over");
  kid.dataset.o = "";
  if (!ok) return setFace("idle");
  if (!d.m || over(e.clientX, e.clientY)) feed(d.k);
  else setFace("idle");
}
$("tray").addEventListener("pointerup", (e) => endDrag(e, true));
$("tray").addEventListener("pointercancel", (e) => endDrag(e, false));
$("tray").addEventListener("keydown", (e) => {
  const b = e.target.closest(".food");
  if (b && (e.key === "Enter" || e.key === " ")) {
    e.preventDefault();
    feed(b.dataset.k);
  }
});

$("brush").onclick = () => {
  const before = { ...B };
  B.td = Math.max(B.cv, B.td - 25);
  anim("wobble");
  setFace("yum");
  say("Dişlerimi fırçaladım, pırıl pırıl.");
  setFact(
    "Diş fırçalama:",
    "Plağı ve şeker artıklarını temizler. Oluşmuş çürük kendiliğinden iyileşmez; diş hekimi gerekir.",
  );
  showChips(deltaChips(before));
  st[2] = Math.min(100, st[2] + 12);
  meters();
  render();
};

/* ---------- Kıyafet ve ses ---------- */
function outfit(i) {
  oi = i;
  try {
    localStorage.setItem("mo", i);
  } catch (e) {}
  $("outfit").value = i;
  window.applyOutfit();
}
$("outfit").innerHTML = OF.map((o, j) => `<option value="${j}">${o[0]}</option>`).join("");
$("outfit").onchange = (e) => outfit(+e.target.value);

function snd(f) {
  if (muted) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    const q = {
        yum: [500, 700, 900],
        love: [600, 800, 1000, 1200],
        sick: [300, 260, 220, 180],
        shock: [900, 400],
        tired: [300, 250],
        ew: [350, 300],
        hot: [800, 500, 800, 500],
      }[f] || [500],
      t = audioCtx.currentTime;
    q.forEach((fr, i) => {
      const o = audioCtx.createOscillator(),
        g = audioCtx.createGain();
      o.type = f === "sick" || f === "ew" ? "sawtooth" : "sine";
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.08, t + i * 0.1);
      g.gain.exponentialRampToValueAtTime(0.001, t + i * 0.1 + 0.12);
      o.connect(g);
      g.connect(audioCtx.destination);
      o.start(t + i * 0.1);
      o.stop(t + i * 0.1 + 0.13);
    });
  } catch (e) {}
}
$("mute").onclick = () => {
  muted = !muted;
  $("mute").textContent = muted ? "Ses kapalı" : "Ses açık";
  $("mute").setAttribute("aria-pressed", muted);
};

/* ---------- Rapor sekmeleri ---------- */
$("rtabs").onclick = (e) => {
  const b = e.target.closest(".tab");
  if (!b) return;
  document.querySelectorAll("#rtabs .tab").forEach((t) => t.setAttribute("aria-selected", t === b));
  document.querySelectorAll(".panel").forEach((p) => (p.hidden = p.id !== "p-" + b.dataset.p));
};

/* ---------- Vücut raporu ---------- */
/* g grup, n ad, v gösterilen değer, p çubuk yüzdesi, c renk */
const METRICS = [
  {
    g: "Gelişim",
    n: "Kilo",
    v: () => fmt(weightKg()) + " kg",
    p: () => B.f,
    c: () => (B.f > 60 ? "bad" : "good"),
  },
  { g: "Gelişim", n: "Kas", v: () => R(B.m) + "%", p: () => B.m, c: () => "blue" },
  { g: "Gelişim", n: "Boy", v: () => fmt(heightCm()) + " cm", p: () => B.h, c: () => "violet" },
  { g: "Gelişim", n: "Kemik yoğunluğu", v: () => R(B.bn) + "%", p: () => B.bn, c: () => "blue" },
  { g: "Gelişim", n: "Zihinsel gelişim", v: () => R(B.br) + "%", p: () => B.br, c: () => "violet" },
  {
    g: "Sağlık",
    n: "Diş sağlığı",
    v: () => R(100 - B.td) + "%",
    p: () => 100 - B.td,
    c: () => (B.td > 50 ? "bad" : "good"),
  },
  {
    g: "Sağlık",
    n: "Cilt",
    v: () => R(100 - B.ac) + "%",
    p: () => 100 - B.ac,
    c: () => (B.ac > 40 ? "bad" : "good"),
  },
  {
    g: "Sağlık",
    n: "Bağışıklık",
    v: () => R(B.im) + "%",
    p: () => B.im,
    c: () => (B.im < 30 ? "bad" : "good"),
  },
  {
    g: "Sağlık",
    n: "Bağırsak",
    v: () => R(B.gt) + "%",
    p: () => B.gt,
    c: () => (B.gt < 30 ? "bad" : "good"),
  },
  {
    g: "Sağlık",
    n: "Kalp riski",
    v: () => R(B.ht) + "%",
    p: () => B.ht,
    c: () => (B.ht > 50 ? "bad" : "good"),
  },
  {
    g: "Anlık durum",
    n: "Su dengesi",
    v: () => R(B.hy) + "%",
    p: () => B.hy,
    c: () => (B.hy < 25 ? "bad" : "blue"),
  },
  {
    g: "Anlık durum",
    n: "Kan şekeri",
    v: () => R(B.bs) + "%",
    p: () => B.bs,
    c: () => (B.bs > 60 ? "bad" : "warn"),
  },
  {
    g: "Anlık durum",
    n: "Şişkinlik",
    v: () => R(B.gs) + "%",
    p: () => B.gs,
    c: () => (B.gs > 50 ? "bad" : "good"),
  },
  {
    g: "Anlık durum",
    n: "Tokluk",
    v: () => R(B.fu) + "%",
    p: () => B.fu,
    c: () => (B.fu > 85 ? "bad" : "good"),
  },
  {
    g: "Anlık durum",
    n: "Kafein",
    v: () => R(B.cf) + "%",
    p: () => B.cf,
    c: () => (B.cf > 40 ? "bad" : "warn"),
  },
];

function buildMetrics() {
  let html = "",
    g = "";
  METRICS.forEach((m, i) => {
    if (m.g !== g) {
      if (g) html += "</div>";
      html += `<h3 class="group__title">${m.g}</h3><div class="group">`;
      g = m.g;
    }
    html += `<div class="meter"><div class="meter__head"><span>${m.n}</span><b id="mv${i}"></b></div><div class="track"><i id="mb${i}"></i></div></div>`;
  });
  $("metrics").innerHTML = html + "</div>";
}

function teethSVG() {
  const th = [40, 15, 55, 25, 70, 35, 45, 20, 60, 30, 75, 50],
    td = B.td;
  let o =
    '<svg viewBox="0 0 240 72" role="img" aria-label="Diş durumu" class="teeth__svg"><rect width="240" height="72" rx="10" fill="#7A2E3A"/>';
  for (let r = 0; r < 2; r++)
    for (let i = 0; i < 6; i++) {
      const idx = r * 6 + i,
        x = 9 + i * 37,
        y = r ? 40 : 6,
        d = td - th[idx];
      if (td >= 92 && idx % 4 === 1) continue;
      const c = d <= 0 ? "#FBF7F2" : d < 25 ? "#E6D58A" : d < 50 ? "#B98A4B" : "#5A3A1E";
      o += `<rect x="${x}" y="${y}" width="32" height="26" rx="10" fill="${c}" stroke="#CFC6B8"/>`;
      if (d > 12) o += `<circle cx="${x + 16}" cy="${y + 13}" r="${3 + Math.min(7, d / 8)}" fill="#2A140A"/>`;
    }
  return o + "</svg>";
}

let teethKey = "";
function updateBody() {
  if (!B) return;
  METRICS.forEach((m, i) => {
    $("mv" + i).textContent = m.v();
    const bar = $("mb" + i);
    bar.style.width = Math.max(0, Math.min(100, m.p())) + "%";
    bar.dataset.c = m.c();
  });
  const tags = [B.f > 65 ? "Kilolu" : B.f < 8 ? "Fit" : "Normal kilolu"];
  if (B.m > 50) tags.push("Kaslı");
  if (B.h > 50) tags.push("Uzun boylu");
  if (B.td > 50) tags.push("Çürük dişler");
  if (B.bn > 60) tags.push("Güçlü kemik");
  if (B.br > 60) tags.push("Zeki");
  if (B.bs > 60) tags.push("Hiperaktif");
  if (B.gs > 50) tags.push("Gaz sıkıntısı");
  if (B.hy < 20) tags.push("Susuz");
  if (B.im < 25) tags.push("Hasta olmaya yakın");
  if (B.ht > 60) tags.push("Kalp yoruldu");
  if (B.cf > 40) tags.push("Kafeinli");
  const tagHTML = tags.map((t) => `<li>${t}</li>`).join("");
  if ($("tags").dataset.k !== tagHTML) {
    $("tags").innerHTML = tagHTML;
    $("tags").dataset.k = tagHTML;
  }
  const key = R(B.td) + "|" + R(B.cv);
  if (key !== teethKey) {
    teethKey = key;
    $("teeth").innerHTML = teethSVG();
  }
  moveRuler();
}

/* ---------- Boy cetveli ---------- */
/* Ömer'in 3D modelindeki ayak ve baş konumları (tuval yüksekliğine oranla).
   Karakter modülü yüklenince bu değerleri kendi kamerasına göre günceller. */
const FIG = { floor: 0.878, top: 0.166, base: BASE_HEIGHT_CM }; // base: başlangıç boyu (cm)
function placeRuler() {
  const stage = $("stage").getBoundingClientRect(),
    k = kid.getBoundingClientRect();
  if (!k.height) return;
  const feet = k.top - stage.top + k.height * FIG.floor,
    perCm = (k.height * (FIG.floor - FIG.top)) / FIG.base;
  let html = "";
  for (let cm = FIG.base - 70; cm <= FIG.base + 25; cm += 5) {
    const y = feet - cm * perCm;
    if (y < 56 || y > stage.height - 30) continue;
    html += `<div class="ruler__tick${cm % 10 === 0 ? " is-major" : ""}" style="top:${y.toFixed(1)}px">${cm % 10 === 0 ? `<span>${cm}</span>` : ""}</div>`;
  }
  $("ruler").innerHTML = html + '<div class="ruler__mark" id="rmark"><span id="rval"></span></div>';
  $("ruler").dataset.feet = feet;
  $("ruler").dataset.per = perCm;
  $("ruler").hidden = !window.K3;
  moveRuler();
}
function moveRuler() {
  const m = $("rmark");
  if (!m || !B) return;
  const cm = heightCm(),
    y = +$("ruler").dataset.feet - cm * +$("ruler").dataset.per;
  m.style.top = y.toFixed(1) + "px";
  $("rval").textContent = fmt(cm) + " cm";
}
window.placeRuler = placeRuler;
window.addEventListener("resize", placeRuler);

/* ---------- Beslenme grafikleri ---------- */
function radar() {
  const L = ["Protein", "Lif", "Vitamin", "Kalsiyum", "Şeker", "Yağ/Tuz"];
  let p = "",
    g = "",
    t = "";
  L.forEach((l, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3,
      c = Math.cos(a),
      s = Math.sin(a),
      v = Math.min(1, tot[i] / 12);
    p += (100 + c * 70 * v).toFixed(1) + "," + (100 + s * 70 * v).toFixed(1) + " ";
    g += `<line class="rd-axis" x1="100" y1="100" x2="${100 + c * 70}" y2="${100 + s * 70}"/>`;
    t += `<text class="rd-lbl${i > 3 ? " rd-lbl--bad" : ""}" x="${100 + c * 88}" y="${103 + s * 88}" text-anchor="middle">${l}</text>`;
  });
  const rings = [0.33, 0.66, 1]
    .map((r) => `<circle class="rd-ring" cx="100" cy="100" r="${70 * r}"/>`)
    .join("");
  return `<svg viewBox="0 0 200 200" role="img" aria-label="Besin dengesi grafiği">${rings}${g}<polygon class="rd-area" points="${p}"/>${t}</svg>`;
}

function line() {
  const h = hist.slice(-15),
    w = h.length - 1 || 1,
    X0 = 30,
    X1 = 312,
    Y = (v) => (126 - v * 1.2).toFixed(1),
    P = (j) => h.map((v, i) => (X0 + (i / w) * (X1 - X0)).toFixed(1) + "," + Y(v[j])).join(" ");
  let grid = "";
  [0, 50, 100].forEach((v) => {
    grid += `<line class="ln-grid" x1="${X0}" x2="${X1}" y1="${Y(v)}" y2="${Y(v)}"/><text class="ln-lbl" x="${X0 - 6}" y="${+Y(v) + 3}" text-anchor="end">${v}</text>`;
  });
  const series = [
    ["ln-h", 0],
    ["ln-e", 1],
    ["ln-d", 2],
  ]
    .map(
      (c) =>
        `<polyline class="ln ${c[0]}" points="${P(c[1])}"/><circle class="ln-dot ${c[0]}" cx="${X1}" cy="${Y(h[h.length - 1][c[1]])}" r="3.5"/>`,
    )
    .join("");
  return `<svg viewBox="0 0 320 136" role="img" aria-label="Sağlık, enerji ve diş değerlerinin gidişatı">${grid}${series}</svg>`;
}

function renderCharts() {
  $("radar").innerHTML = radar();
  $("line").innerHTML = line();
  const a = (tot[0] + tot[1] + tot[2] + tot[3]) / 48,
    b = (tot[4] + tot[5]) / 24;
  $("bal").textContent = !eaten.length
    ? "Henüz bir şey yemedi."
    : a > 0.4 && b < 0.25
      ? "Dengeli besleniyor."
      : b > a
        ? "Şeker ve yağ fazla, vitamin az."
        : "Biraz daha çeşit gerekiyor.";
  let g = 0,
    m = 0,
    x = 0;
  for (const k in cnt) {
    const h = F[k][2][0];
    if (h >= 5) g += cnt[k];
    else if (h > -4) m += cnt[k];
    else x += cnt[k];
  }
  const total = g + m + x;
  $("mix").innerHTML = total
    ? [
        [g, "good"],
        [m, "warn"],
        [x, "bad"],
      ]
        .map((c) => `<i style="flex:${c[0]}" data-c="${c[1]}"></i>`)
        .join("")
    : '<i style="flex:1" data-c="none"></i>';
  $("mixLeg").innerHTML =
    `<li data-c="good">Besleyici ${g}</li><li data-c="warn">Dengeli ${m}</li><li data-c="bad">Ara sıra ${x}</li>`;
  return g;
}

function renderMisc(g) {
  $("badges").innerHTML = BD.map(
    (b) =>
      `<li class="badge${un.includes(b[1]) ? " is-on" : ""}"><span class="badge__ico" aria-hidden="true">${b[0]}</span><div><b>${b[1]}</b><small>${b[2]}</small></div></li>`,
  ).join("");
  $("bcount").textContent = un.length + "/" + BD.length;

  $("quests").innerHTML = QS.map(
    (i) => `<li class="${qd.done.includes(i) ? "is-done" : ""}">${QP[i][0]}</li>`,
  ).join("");

  const gl = [
    ["Meyve ve sebze", "porsiyon", FRUIT.reduce((a, x) => a + (cnt[x] || 0), 0), 5, 1],
    ["Su", "bardak", cnt.su || 0, 6, 1],
    ["Şeker (tahmini)", "çay kaşığı", Math.round(tot[4] * 1.5), 6, 0],
  ];
  $("goals").innerHTML = gl
    .map((q) => {
      const r = Math.min(1, q[2] / q[3]),
        c = q[4] ? (r >= 1 ? "good" : "warn") : r >= 1 ? "bad" : r > 0.7 ? "warn" : "good";
      const note = q[4] ? (q[2] >= q[3] ? "Hedef tamam" : "") : q[2] > q[3] ? "Sınır aşıldı" : "";
      return `<div class="meter"><div class="meter__head"><span>${q[0]}</span><b>${q[2]}/${q[3]} ${q[1]}</b></div><div class="track"><i style="width:${r * 100}%" data-c="${c}"></i></div>${note ? `<small class="meter__note" data-c="${c}">${note}</small>` : ""}</div>`;
    })
    .join("");

  const s = st[0],
    e = st[1];
  $("lvl").textContent =
    "Seviye " +
    (1 + ((g / 5) | 0)) +
    " · " +
    (s >= 85 ? "Süper güçlü" : s <= 25 ? "Halsiz" : e >= 90 ? "Enerji dolu" : s >= 60 ? "İyi" : "Yorgun");
}

function render() {
  renderMisc(renderCharts());
  updateBody();
}

/* ---------- Başlat ---------- */
buildMetrics();
tabs(0);
outfit(oi);
reset();
placeRuler();

/* Her saniye: kısa süreli etkiler söner, Ömer ihtiyaçlarını söyler */
setInterval(() => {
  if (!B) return;
  tickBody();
  const now = Date.now();
  if (now - lastFeed > 8000 && now - lastMsg > 25000 && !drag) {
    const m = ambientLine();
    if (m) {
      lastMsg = now;
      say(m);
    }
  }
  updateBody();
}, 1000);
