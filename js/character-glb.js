/* ============================================================
   character-glb.js — Ömer'in 3D modeli (glb)
   Model iskeletsiz tek bir mesh olduğu için vücut değişimleri iki yolla yapılır:
   tüm gövdenin ölçeklenmesi ve köşe gölgelendiricisinde bölgesel şişirme
   (karın, yüz, kollar). Yüklenemezse yedek karakter devreye girer.
   ============================================================ */
(async () => {
  try {
    if (!window.OMER_GLB_B64) throw new Error("Model dosyası bulunamadı");
    const THREE = await import("three");
    const { GLTFLoader } = await import("three/addons/loaders/GLTFLoader.js");

    const kidEl = document.getElementById("kid");
    const svg = kidEl.querySelector("svg");

    /* Sahne */
    const R = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    R.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    R.setSize(340, 680, false);
    R.toneMapping = THREE.ACESFilmicToneMapping;
    R.toneMappingExposure = 1.7;
    const cv = R.domElement;
    cv.style.cssText = "display:block;width:100%;height:auto;aspect-ratio:1/2";

    const sc = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(30, 0.5, 0.1, 20);
    cam.position.set(0, 0, 2.4);
    cam.lookAt(0, 0, 0);
    sc.add(new THREE.HemisphereLight(0xf4f8ff, 0x8a96a6, 1.6));
    const key = new THREE.DirectionalLight(0xfff1e0, 2.8);
    key.position.set(-1.2, 1.6, 2.4);
    sc.add(key);
    const rim = new THREE.DirectionalLight(0xbcd2ff, 1.4);
    rim.position.set(2, 1.2, -2);
    sc.add(rim);

    /* Modeli yükle (base64 → ArrayBuffer) */
    const bytes = Uint8Array.from(atob(window.OMER_GLB_B64), (c) => c.charCodeAt(0));
    window.OMER_GLB_B64 = null;
    const gltf = await new Promise((ok, fail) => new GLTFLoader().parse(bytes.buffer, "", ok, fail));
    const model = gltf.scene;

    /* Model dizden kesik: sanal zemin modelin altında kalır, boy değişimi bu zemine göre ölçeklenir */
    const FLOOR_Y = -0.9;
    const root = new THREE.Group();
    const pivot = new THREE.Group();
    pivot.position.y = FLOOR_Y;
    model.position.y = -FLOOR_Y;
    pivot.add(model);
    root.add(pivot);
    sc.add(root);

    /* Köşe gölgelendiricisi: bölgesel şişirme + alt kenarda yumuşak solma */
    const U = { uBelly: { value: 0 }, uFace: { value: 0 }, uArm: { value: 0 } };
    let mat = null;
    model.traverse((o) => {
      if (o.isMesh && !mat) mat = o.material;
    });
    mat.transparent = true;
    mat.onBeforeCompile = (sh) => {
      Object.assign(sh.uniforms, U);
      sh.vertexShader =
        "uniform float uBelly;uniform float uFace;uniform float uArm;varying float vObjY;\n" +
        sh.vertexShader.replace(
          "#include <begin_vertex>",
          `vec3 transformed = vec3(position);
           vec3 nn = normalize(normal);
           float bw = exp(-pow((position.y + 0.12) / 0.13, 2.0));
           float fw = smoothstep(0.26, 0.31, position.y) * (1.0 - smoothstep(0.42, 0.47, position.y));
           float aw = smoothstep(0.15, 0.2, abs(position.x)) * smoothstep(-0.12, 0.0, position.y) * (1.0 - smoothstep(0.15, 0.28, position.y));
           transformed.xz += nn.xz * (uBelly * bw + uFace * fw + uArm * aw);
           vObjY = position.y;`,
        );
      sh.fragmentShader =
        "varying float vObjY;\n" +
        sh.fragmentShader.replace(
          "#include <dithering_fragment>",
          `/* Dokudaki koyu tonları aç: siyah giysiler füme/gri görünsün */
           gl_FragColor.rgb = pow(gl_FragColor.rgb, vec3(0.58));
           gl_FragColor.a *= smoothstep(-0.5, -0.36, vObjY);
           #include <dithering_fragment>`,
        );
    };

    /* Yüz ifadesi dokuya pişmiş; bunun yerine hasta/acı/yorgun hâli ten rengiyle verilir */
    const TINT = { "#C5E8A0": 0xc9e8a8, "#FF9E8A": 0xffb4a4, "#E6D9C3": 0xd8d2c8 };
    const origSetFace = window.setFace;
    window.setFace = (n, skin) => {
      origSetFace(n, skin);
      mat.color.set(TINT[skin] || 0xffffff);
    };

    /* Boy cetveli: baş üstü BASE_HEIGHT_CM kabul edilir, sanal ayak zemini FLOOR_Y'dedir */
    const visibleH = 2 * cam.position.z * Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    FIG.top = 0.5 - 0.5 / visibleH;
    FIG.floor = 0.5 - FLOOR_Y / visibleH;

    /* Her karede vücut durumunu modele yansıt */
    const S = { f: 20, m: 10, h: 0, gs: 0, fu: 20 };
    const clk = new THREE.Clock();
    (function loop() {
      const t = clk.getElapsedTime();
      for (const k in S) S[k] += (B[k] - S[k]) * 0.06;
      const fa = S.f / 100,
        mu = S.m / 100,
        hg = S.h / 100;
      const wide = 1 + fa * 0.2 + mu * 0.05;
      pivot.scale.set(
        wide,
        1 + (S.h * HEIGHT_CM_PER_POINT) / BASE_HEIGHT_CM + Math.sin(t * 1.8) * 0.003,
        wide,
      );
      U.uBelly.value = fa * 0.08 + (S.gs / 100) * 0.05 + (S.fu / 100) * 0.02;
      U.uFace.value = fa * 0.03;
      U.uArm.value = mu * 0.025 + fa * 0.015;

      const hold = kidEl.classList.contains("hold");
      pivot.rotation.y = Math.sin(t * 0.5) * 0.22;
      pivot.rotation.x += ((hold ? 0.14 : 0) - pivot.rotation.x) * 0.1;

      const jt = jitterAmount();
      root.position.x = Math.sin(t * 30) * jt * 0.004;
      root.position.y = Math.abs(Math.sin(t * 11)) * jt * 0.006;

      R.render(sc, cam);
      requestAnimationFrame(loop);
    })();

    window.K3 = 1;
    kidEl.prepend(cv);
    svg.style.display = "none";
    /* Kıyafet model dokusuna pişmiş olduğundan seçici gizlenir */
    const field = document.querySelector(".field");
    if (field) field.hidden = true;
    window.placeRuler && window.placeRuler();
  } catch (e) {
    console.warn("GLB model yüklenemedi, yedek karakter kullanılıyor", e);
    window.startProceduralCharacter && window.startProceduralCharacter();
  }
})();
