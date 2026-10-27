/* face.js — Ömer'in yüzü (SVG). 3D karakterde yüz bu SVG'den dokuya çevrilir. */
const $ = (id) => document.getElementById(id);
const kid = $("kid"),
  face = $("face");

const FACE = {
  idle: ["dot", "smile", "idle"],
  love: ["heart", "big", "up"],
  yum: ["arc", "tongue", "up"],
  sick: ["dizzy", "wavy", "sick"],
  shock: ["wide", "O", "hi"],
  tired: ["sleep", "tiny", "low"],
  ew: ["squint", "frown", "ang"],
  hot: ["wide", "O", "up"],
  open: ["wide", "O", "hi"],
};
const S = 'stroke="#3A2A2A" stroke-width="3" stroke-linecap="round" fill="none"';
const BROW = {
  idle: "M68 80Q79 74 91 79M109 79Q121 74 132 80",
  up: "M68 75Q79 68 91 73M109 73Q121 68 132 75",
  hi: "M68 72Q79 63 91 69M109 69Q121 63 132 72",
  sick: "M68 83Q80 77 91 73M109 73Q120 77 132 83",
  low: "M68 82Q79 80 91 82M109 82Q121 80 132 82",
  ang: "M68 76Q80 77 91 84M109 84Q120 77 132 76",
};
let eid = 0;
function eye(cx, o, a) {
  a = a || {};
  const iris = a.iris || "#6B4426",
    dx = a.dx || 0,
    p = a.p == null ? 2.6 : a.p,
    cy = 94,
    T = 16 * o,
    B = 9 * o,
    d = `M${cx - 11} ${cy}Q${cx} ${cy - T} ${cx + 11} ${cy}Q${cx} ${cy + B} ${cx - 11} ${cy}Z`,
    id = "ec" + eid++;
  return `<clipPath id="${id}"><path d="${d}"/></clipPath><path d="${d}" fill="#FBF7F2"/><g clip-path="url(#${id})"><circle cx="${cx + dx}" cy="${cy}" r="5.8" fill="${iris}" stroke="#3A2414" stroke-width="1"/><circle cx="${cx + dx}" cy="${cy}" r="${p}" fill="#120A06"/><circle cx="${cx + dx + 2}" cy="${cy - 2}" r="1.5" fill="#fff"/>${a.h ? `<text x="${cx}" y="${cy + 4}" font-size="10" text-anchor="middle" fill="#E0245E">♥</text>` : ""}<path d="${d}" fill="url(#lidsh)"/></g><path d="M${cx - 11} ${cy}Q${cx} ${cy - T} ${cx + 11} ${cy}" stroke="#2A1A12" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
}
const pair = (o, a) => eye(80, o, a) + eye(120, o, a);
const EYE = {
  dot: pair(1),
  wide: pair(1.35, { p: 2.2 }),
  sleep: pair(0.38),
  squint: pair(0.42),
  heart: pair(1.25, { iris: "#F2A9C0", h: 1, p: 0 }),
  dizzy: eye(80, 0.75, { dx: 3, p: 2 }) + eye(120, 0.75, { dx: -3, p: 2 }),
  arc: `<path d="M70 97Q80 85 90 97M110 97Q120 85 130 97" ${S} stroke-width="3.4"/>`,
};
const L = "#D9726F",
  LD = "#8A3A3A";
const MOUTH = {
  get smile() {
    return `<path d="M80 113Q100 120 120 113Q100 133 80 113Z" fill="#6B2228"/>${T()}<path d="M80 113Q100 120 120 113" stroke="${LD}" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M81 114Q100 136 119 114" stroke="${L}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
  },
  get big() {
    return `<path d="M79 114Q100 146 121 114Q100 120 79 114Z" fill="#6B2228"/>${T()}<path d="M79 114Q100 121 121 114" stroke="${LD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  },
  get tongue() {
    return `<path d="M80 114Q100 140 120 114Q100 120 80 114Z" fill="#6B2228"/>${T()}<ellipse cx="100" cy="128" rx="8.5" ry="5.5" fill="#E8737F"/><path d="M80 114Q100 121 120 114" stroke="${LD}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;
  },
  wavy: `<path d="M83 122q4.5-5 9 0t9 0t9 0t9 0" stroke="${LD}" stroke-width="3" fill="none" stroke-linecap="round"/>`,
  O: `<ellipse cx="100" cy="122" rx="8" ry="10" fill="#6B2228" stroke="${L}" stroke-width="3.5"/>`,
  tiny: `<path d="M90 120Q100 123 110 120" stroke="${LD}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`,
  frown: `<path d="M83 125Q100 111 117 125Q100 119 83 125Z" fill="${L}"/><path d="M83 125Q100 116 117 125" stroke="${LD}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
};
function T() {
  const th = [40, 15, 55, 25, 70, 35],
    td = B.td;
  let o = "";
  for (let i = 0; i < 6; i++) {
    if (td >= 88 && i % 3 === 1) continue;
    const x = 84 + i * 5.4,
      u = (x + 2.5 - 80) / 40,
      y = 114 + 12 * u * (1 - u) + 0.4,
      d = td - th[i],
      c = d <= 0 ? "#FBF7F2" : d < 25 ? "#E6D58A" : d < 50 ? "#B98A4B" : "#5A3A1E";
    o +=
      `<rect x="${x}" y="${y}" width="5" height="5.4" rx="1.4" fill="${c}" stroke="#CFC6B8" stroke-width=".5"/>` +
      (d > 12 ? `<circle cx="${x + 2.5}" cy="${y + 3}" r="1.1" fill="#2A140A"/>` : "");
  }
  return o;
}
function FX() {
  const q = Math.min(0.4, B.cf / 130);
  let o =
    q > 0.04
      ? `<ellipse cx="80" cy="103" rx="10" ry="3" fill="#4B2E6B" opacity="${q}"/><ellipse cx="120" cy="103" rx="10" ry="3" fill="#4B2E6B" opacity="${q}"/>`
      : "";
  [
    [64, 114],
    [136, 112],
    [96, 76],
    [70, 126],
    [128, 128],
  ]
    .slice(0, Math.floor(B.ac / 20))
    .forEach((p) => (o += `<circle cx="${p[0]}" cy="${p[1]}" r="1.9" fill="#D9534F" opacity=".85"/>`));
  if (B.ht > 45) {
    const a = Math.min(0.5, (B.ht - 45) / 110).toFixed(2);
    o += `<ellipse cx="68" cy="118" rx="13" ry="9" fill="#E5484D" opacity="${a}"/><ellipse cx="132" cy="118" rx="13" ry="9" fill="#E5484D" opacity="${a}"/>`;
  }
  if (B.hy < 25)
    o += `<path d="M140 66q-6 9 0 13q6-4 0-13z" fill="#8FD3F4" stroke="#4A9BC8" stroke-width=".8"/>`;
  if (B.br > 60)
    o += `<text x="52" y="56" font-size="12" fill="#F4B400">✦</text><text x="138" y="50" font-size="9" fill="#F4B400">✦</text>`;
  if (B.im < 25) o += `<circle cx="100" cy="110" r="4" fill="#E5484D" opacity=".5"/>`;
  return o;
}

function setFace(n, skin) {
  const [a, b, br] = FACE[n];
  face.innerHTML =
    `<path d="${BROW[br]}" stroke="#4A3020" stroke-width="3.4" fill="none" stroke-linecap="round"/>` +
    EYE[a] +
    FX() +
    `<g transform="translate(0 6)">${MOUTH[b]}</g>`;
  const c = skin || "#FFD3B0";
  document.querySelectorAll(".sk").forEach((e) => e.setAttribute("fill", c));
}
