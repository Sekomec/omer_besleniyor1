/* character-procedural.js — yedek karakter: GLB modeli yüklenemezse geometrik şekillerden kurulan 3D Ömer.
   O da yüklenemezse SVG karakter kullanılır. */
window.startProceduralCharacter = async () => {
  try {
    const THREE = await import("https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js");
    const kid = document.getElementById("kid"),
      svg = kid.querySelector("svg"),
      faceG = document.getElementById("face"),
      defs = svg.querySelector("defs").outerHTML;
    const R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    R.setSize(340, 680, false);
    R.shadowMap.enabled = true;
    R.toneMapping = THREE.ACESFilmicToneMapping;
    R.toneMappingExposure = 1.05;
    const cv = R.domElement;
    cv.style.cssText = "display:block;width:100%;height:auto;aspect-ratio:1/2";
    const sc = new THREE.Scene(),
      cam = new THREE.PerspectiveCamera(30, 0.5, 0.1, 20);
    cam.position.set(0, 0.62, 3.1);
    cam.lookAt(0, 0.6, 0);
    sc.add(new THREE.HemisphereLight(0xf4f8ff, 0x6d7886, 0.95));
    const key = new THREE.DirectionalLight(0xfff1e0, 2.4);
    key.position.set(-1.5, 2.5, 2.5);
    key.castShadow = true;
    key.shadow.mapSize.set(1024, 1024);
    Object.assign(key.shadow.camera, { left: -1, right: 1, top: 2, bottom: -0.5 });
    sc.add(key);
    const rim = new THREE.DirectionalLight(0xbcd2ff, 1.4);
    rim.position.set(2, 1.5, -2);
    sc.add(rim);
    const gnd = new THREE.Mesh(new THREE.PlaneGeometry(4, 4), new THREE.ShadowMaterial({ opacity: 0.22 }));
    gnd.rotation.x = -Math.PI / 2;
    gnd.receiveShadow = true;
    sc.add(gnd);
    const root = new THREE.Group();
    sc.add(root);
    const M = (c, r) => new THREE.MeshStandardMaterial({ color: c, roughness: r || 0.7 });
    const skin = new THREE.MeshPhysicalMaterial({
      color: 0xffd3b0,
      roughness: 0.55,
      sheen: 1,
      sheenColor: new THREE.Color(0xff8f7a),
    });
    const add = (g, m, x, y, z, p, s) => {
      const o = new THREE.Mesh(g, m);
      o.position.set(x, y, z);
      o.castShadow = true;
      if (s) o.scale.set(...s);
      (p || root).add(o);
      return o;
    };
    const cap = (r, l) => new THREE.CapsuleGeometry(r, l, 8, 20),
      sp = (r) => new THREE.SphereGeometry(r, 32, 24);
    const shirtM = M(0x3e7db8, 0.8),
      shortsM = M(0x3a4a5e, 0.9),
      shoeM = M(0xb83a2e, 0.6);
    const legs = [],
      armP = [],
      S = { f: 20, m: 10, h: 0 };
    let bulk = 0;
    [-1, 1].forEach((s) => {
      legs.push(add(cap(0.049, 0.3), shortsM, s * 0.065, 0.265, 0));
      add(sp(1), shoeM, s * 0.065, 0.04, 0.03, root, [0.05, 0.04, 0.1]);
      add(new THREE.BoxGeometry(0.1, 0.015, 0.21), M(0xeeeeee), s * 0.065, 0.008, 0.03);
    });
    add(new THREE.CylinderGeometry(0.115, 0.125, 0.17, 28), shortsM, 0, 0.52, 0);
    const torso = add(cap(0.11, 0.2), shirtM, 0, 0.72, 0, root, [1, 1, 0.72]);
    const arms = [-1, 1].map((s) => {
      const g = new THREE.Group();
      g.position.set(s * 0.15, 0.86, 0);
      root.add(g);
      armP.push(add(cap(0.04, 0.1), shirtM, 0, -0.07, 0, g));
      armP.push(add(cap(0.038, 0.17), shirtM, 0, -0.23, 0, g));
      add(sp(0.036), skin, 0, -0.36, 0, g);
      return g;
    });
    add(new THREE.CylinderGeometry(0.04, 0.046, 0.09, 20), skin, 0, 0.9, 0);
    const hd = new THREE.Group();
    hd.position.set(0, 1.04, 0);
    root.add(hd);
    add(sp(1), skin, 0, 0, 0, hd, [0.1, 0.1125, 0.1025]);
    [-1, 1].forEach((s) => add(sp(1), skin, s * 0.098, 0, 0, hd, [0.016, 0.03, 0.022]));
    add(sp(1), skin, 0, -0.012, 0.098, hd, [0.014, 0.014, 0.014]);
    const hair = add(
      new THREE.SphereGeometry(1, 40, 28, 0, Math.PI * 2, 0, 1.62),
      M(0x3b2416, 0.5),
      0,
      0.004,
      -0.004,
      hd,
      [0.104, 0.1165, 0.107],
    );
    hair.rotation.x = -0.5;
    const fc = document.createElement("canvas");
    fc.width = 480;
    fc.height = 560;
    const fx = fc.getContext("2d"),
      tex = new THREE.CanvasTexture(fc);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    const fm = new THREE.Mesh(
      new THREE.SphereGeometry(1, 48, 48, Math.PI / 2 - 1.1, 2.2, 0.3, 2.5),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.6 }),
    );
    fm.scale.set(0.1008, 0.1133, 0.1033);
    hd.add(fm);
    function drawFace(c) {
      const s = `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="560" viewBox="36 24 128 144">${defs}<rect x="36" y="24" width="128" height="144" fill="${c}"/><rect x="36" y="24" width="128" height="144" fill="url(#sh)"/><ellipse cx="68" cy="118" rx="13" ry="9" fill="url(#bl)"/><ellipse cx="132" cy="118" rx="13" ry="9" fill="url(#bl)"/>${faceG.innerHTML}</svg>`;
      const im = new Image();
      im.onload = () => {
        fx.clearRect(0, 0, 480, 560);
        fx.drawImage(im, 0, 0, 480, 560);
        tex.needsUpdate = true;
      };
      im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
    }
    const orig = window.setFace;
    window.setFace = (n, k) => {
      orig(n, k);
      const c = k || "#FFD3B0";
      skin.color.set(c);
      drawFace(c);
    };
    window.setFace("idle");
    const belly = add(sp(1), shirtM, 0, 0.64, 0.055);
    belly.visible = false;
    const clk = new THREE.Clock();
    (function L() {
      const t = clk.getElapsedTime(),
        h = kid.classList.contains("hold");
      root.rotation.y = Math.sin(t * 0.5) * 0.25;
      root.rotation.x += ((h ? 0.14 : 0) - root.rotation.x) * 0.1;
      const kk = 0.06;
      S.f += (B.f - S.f) * kk;
      S.m += (B.m - S.m) * kk;
      S.h += (B.h - S.h) * kk;
      const fa = S.f / 100,
        mu = S.m / 100,
        hg = S.h / 100,
        tx = (bulk ? 1.15 : 1) * (1 + fa * 0.4 + mu * 0.14);
      torso.scale.set(tx, 1 + Math.sin(t * 2) * 0.01, (bulk ? 0.84 : 0.72) * (1 + fa * 0.5));
      hd.position.y = 1.04 + Math.sin(t * 2) * 0.003;
      const fb2 = fa + ((B.gs || 0) / 100) * 0.45 + ((B.fu || 0) / 100) * 0.12;
      belly.scale.set(0.02 + fb2 * 0.095, 0.02 + fb2 * 0.085, 0.02 + fb2 * 0.08);
      belly.visible = fb2 > 0.25;
      legs.forEach((l) => l.scale.set(1 + fa * 0.35, 1, 1 + fa * 0.35));
      armP.forEach((a) => a.scale.set(1 + mu * 0.5 + fa * 0.25, 1, 1 + mu * 0.5 + fa * 0.25));
      arms.forEach((g, i) => (g.position.x = (i ? 1 : -1) * (0.04 + 0.11 * tx)));
      hd.scale.set(1 + fa * 0.12, 1, 1 + fa * 0.06);
      root.scale.set(1 + hg * 0.02, 1 + (hg * 100 * HEIGHT_CM_PER_POINT) / BASE_HEIGHT_CM, 1 + hg * 0.02);
      const jt = jitterAmount();
      root.position.x = Math.sin(t * 30) * jt * 0.004;
      root.position.y = Math.abs(Math.sin(t * 11)) * jt * 0.006;
      const fl = performance.now() < flex;
      arms.forEach((g, i) => {
        const s = i ? 1 : -1;
        g.rotation.x += ((fl ? -0.1 : h ? -0.45 : Math.sin(t * 1.5 + i) * 0.04) - g.rotation.x) * 0.15;
        g.rotation.z += ((fl ? s * 1.25 : h ? -s * 0.5 : s * 0.12) - g.rotation.z) * 0.15;
      });
      R.render(sc, cam);
      requestAnimationFrame(L);
    })();
    const tieM = M(0xb22234, 0.6),
      vestM = M(0x5b2e2e, 0.8),
      hatM = M(0xc0392b, 0.9),
      scarfM = M(0xf4c430, 0.9),
      stM = M(0xffffff, 0.6);
    const tie = add(new THREE.BoxGeometry(0.028, 0.12, 0.012), tieM, 0, 0.78, 0.084),
      vest = add(cap(0.116, 0.17), vestM, 0, 0.72, 0, root, [1, 1, 0.75]);
    const hat = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 20, 0, Math.PI * 2, 0, 1.4), hatM);
    hat.scale.set(0.109, 0.121, 0.112);
    hat.rotation.x = -0.45;
    hat.position.set(0, 0.012, -0.004);
    hat.castShadow = true;
    hd.add(hat);
    const pom = add(sp(0.025), hatM, 0, 0.13, -0.04, hd);
    const scarf = add(new THREE.TorusGeometry(0.058, 0.02, 12, 28), scarfM, 0, 0.89, 0);
    scarf.rotation.x = Math.PI / 2;
    const stripes = [-1, 1].map((s) =>
      add(new THREE.BoxGeometry(0.007, 0.34, 0.03), stM, s * 0.112, 0.27, 0),
    );
    window.setOutfit = (o) => {
      const f = o[3] || {};
      shirtM.color.set(o[0]);
      shortsM.color.set(o[1]);
      shoeM.color.set(o[2]);
      tie.visible = !!f.tie;
      vest.visible = !!f.vest;
      hat.visible = pom.visible = !!f.hat;
      scarf.visible = !!f.scarf;
      if (f.scarf) scarfM.color.set(f.scarf);
      stripes.forEach((m) => (m.visible = !!f.stripe));
      bulk = f.bulk ? 1 : 0;
    };
    window.applyOutfit && window.applyOutfit();
    window.K3 = 1;
    kid.prepend(cv);
    svg.style.display = "none";
    window.placeRuler && window.placeRuler();
  } catch (e) {
    console.warn("3D yüklenemedi, SVG karakter kullanılıyor", e);
  }
};
