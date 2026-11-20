import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
/* ============ CONTENT (edit here) ============ */
      const GH = "https://github.com/diegoparr",
        LI = "https://www.linkedin.com/in/TU-USUARIO",
        CV_FILE = "cv-diego-parrado.pdf";
      const chip = (a) =>
        a.map((x) => `<span class="chip">${x}</span>`).join("");
      const H = {
        links: `<div class="links"><a class="btn pri" href="${CV_FILE}" download>Download CV</a><a class="btn" href="${GH}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="${LI}" target="_blank" rel="noopener">LinkedIn</a></div>`,
        exp: `<h3>Experience</h3><div class="card"><h4>Junior Technical Consultant &amp; Solutions Integrator</h4><p>Architected agentic workflows with n8n and webhooks, integrating Mistral and the OpenAI API, with RAG on Supabase.</p></div><div class="card"><h4>QA &amp; Functional Analyst</h4><p>Debugged REST APIs and ran functional testing.</p></div>`,
        stack: `<h3>Stack</h3><div class="chips">${chip(["TypeScript", "Node.js", "NestJS", "Docker", "AWS", "PostgreSQL / Supabase", "OpenRouter"])}</div>`,
        proj: `<div class="card"><h4>AI-Powered Minecraft NPC</h4><p>A Minecraft mod connected to a Node.js / TypeScript API wrapper. The wrapper reads a player’s listening profile from the Last.fm API, sends it to an LLM on OpenRouter to write a personalized review, and the mod delivers it in-game through an NPC.</p></div><div class="flow"><span>Minecraft mod</span><i>→</i><span>Node.js / TS wrapper</span><i>→</i><span>Last.fm API</span><i>→</i><span>LLM on OpenRouter</span><i>→</i><span>NPC dialogue</span></div>`,
        books: `<h3>Currently reading</h3><div class="card"><h4>AI Engineering</h4><p>Chip Huyen</p></div><div class="card"><h4>Clean Architecture</h4><p>Robert C. Martin</p></div><h3>Up next</h3><div class="card"><h4>System Design on AWS</h4></div><div class="card"><h4>Designing Data-Intensive Applications</h4></div><div class="card"><h4>Building Microservices</h4></div>`,
        edu: `<h3>Education</h3><div class="card"><h4>B.S. in Systems Engineering</h4><p>Universidad EAN · Expected 2027</p></div><h3>Credentials</h3><div class="card"><h4>AWS Academy Cloud Foundations</h4></div><div class="card"><h4>English B2</h4></div>`,
      };
      const NAME = "Diego Alejandro Parrado Agudelo",
        ROLE =
          "Systems Engineering Student (Bogotá, Colombia) | Backend &amp; AI Systems Engineer";
      const head = (t, s) =>
        `<h2>${t}</h2>${s ? `<p class="sub">${s}</p>` : ""}`;
      const PANELS = {
        work: head(NAME, ROLE) + H.exp + H.stack + H.links,
        books:
          head("Engineering Bookshelf", "Technical reading list") + H.books,
        project: head("AI-Powered Minecraft NPC", "Active project") + H.proj,
        edu: head("Education &amp; Credentials") + H.edu,
      };
      document.getElementById("cvb").innerHTML =
        `<h1>${NAME}</h1><p class="sub">${ROLE}</p>${H.links}${H.exp}${H.stack}<h3>Active project</h3>${H.proj}${H.books}${H.edu}`;

      /* ============ RENDERER / CAMERA ============ */
      const $ = (s) => document.querySelector(s),
        canvas = $("#c"),
        panel = $("#panel"),
        tip = $("#tip");
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x070914);
      scene.fog = new THREE.Fog(0x070914, 30, 60);
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      const HOME = {
        p: new THREE.Vector3(14, 11, 14),
        t: new THREE.Vector3(0, 2.2, 0),
      };
      camera.position.copy(HOME.p);
      const controls = new OrbitControls(camera, canvas);
      Object.assign(controls, {
        enableDamping: true,
        dampingFactor: 0.07,
        enablePan: true,
        screenSpacePanning: false,
        minDistance: 2,
        maxDistance: 26,
        minPolarAngle: 0.45,
        maxPolarAngle: 1.56,
        minAzimuthAngle: -0.5,
        maxAzimuthAngle: 1.6,
      });
      controls.target.copy(HOME.t);
      function rs() {
        const w = innerWidth,
          h = innerHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.fov = w / h < 1 ? 52 : 32;
        camera.updateProjectionMatrix();
      }
      addEventListener("resize", rs);
      rs();

      /* ============ HELPERS ============ */

      function makeSpineTex(
        title,
        author,
        bgHex,
        textHex = "#f1f5f9",
        accentHex = "#38bdf8",
      ) {
        const c = document.createElement("canvas");
        c.width = 128;
        c.height = 512;
        const ctx = c.getContext("2d");

        // Fondo del lomo
        ctx.fillStyle = bgHex;
        ctx.fillRect(0, 0, 128, 512);

        // Líneas decorativas arriba y abajo del lomo
        ctx.fillStyle = accentHex;
        ctx.fillRect(0, 28, 128, 10);
        ctx.fillRect(0, 474, 128, 10);

        // Sombra sutil en los bordes para dar volumen
        ctx.fillStyle = "rgba(0,0,0,0.28)";
        ctx.fillRect(0, 0, 14, 512);
        ctx.fillRect(114, 0, 14, 512);

        // Título rotado 90° en vertical
        ctx.save();
        ctx.translate(64, 240);
        ctx.rotate(-Math.PI / 2);
        ctx.fillStyle = textHex;
        ctx.font = "bold 26px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(title, 0, -8);

        // Autor más pequeño debajo
        ctx.fillStyle = accentHex;
        ctx.font = "16px sans-serif";
        ctx.fillText(author, 0, 18);
        ctx.restore();

        const tex = new THREE.CanvasTexture(c);
        tex.encoding = THREE.sRGBEncoding;
        return tex;
      }

      function createBook(
        title,
        author,
        bgHex,
        accentHex,
        width = 0.14,
        height = 0.72,
        depth = 0.55,
      ) {
        const tex = makeSpineTex(title, author, bgHex, "#f8fafc", accentHex);
        const spineMat = new THREE.MeshStandardMaterial({
          map: tex,
          emissive: 0xffffff,
          emissiveMap: tex,
          emissiveIntensity: 0.35,
          roughness: 0.65,
        });
        const coverMat = new THREE.MeshStandardMaterial({
          color: bgHex,
          roughness: 0.7,
        });
        const pagesMat = new THREE.MeshStandardMaterial({
          color: 0xe2e8f0,
          roughness: 0.9,
        });

        const materials = [
          coverMat,
          coverMat,
          pagesMat,
          coverMat,
          spineMat,
          coverMat,
        ];
        return new THREE.Mesh(
          new THREE.BoxGeometry(width, height, depth),
          materials,
        );
      }

      function createPoster(imagePath, width, height, pos, rotY = 0) {
        const group = new THREE.Group();

        // Marco oscuro
        const frame = new THREE.Mesh(
          new THREE.BoxGeometry(width + 0.08, height + 0.08, 0.04),
          M(0x14141f, { roughness: 0.5 }),
        );
        group.add(frame);

        // Textura de la imagen
        const tex = texLoader.load(imagePath);
        tex.encoding = THREE.sRGBEncoding;

        // Lienzo con ligero brillo para que destaque en la luz morada del cuarto
        const art = new THREE.Mesh(
          new THREE.PlaneGeometry(width, height),
          new THREE.MeshStandardMaterial({
            map: tex,
            emissiveMap: tex,
            emissive: 0xffffff,
            emissiveIntensity: 0.22,
            roughness: 0.6,
          }),
        );
        art.position.z = 0.022;
        group.add(art);

        group.position.set(...pos);
        group.rotation.y = rotY;
        scene.add(group);
        return group;
      }

      const manager = new THREE.LoadingManager();
      manager.onLoad = () => {
        console.log("Todos los modelos 3D y pósters listos");
      };

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
      );
      dracoLoader.preload();

      const gltfLoader = new GLTFLoader(manager);
      gltfLoader.setDRACOLoader(dracoLoader);

      const texLoader = new THREE.TextureLoader(manager);

      function loadProp(
        path,
        targetSize,
        pos,
        rotY = 0,
        rotX = 0,
        parent = scene,
      ) {
        gltfLoader.load(path, (gltf) => {
          const model = gltf.scene;
          model.rotation.order = "YXZ";
          model.rotation.set(rotX, rotY, 0);
          model.updateMatrixWorld(true);

          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const refDim = rotX !== 0 ? Math.max(size.x, size.z) : size.y;
          const scale = targetSize / (refDim || 1);
          model.scale.setScalar(scale);
          model.updateMatrixWorld(true);

          box.setFromObject(model);
          const center = box.getCenter(new THREE.Vector3());
          model.position.set(
            pos[0] - center.x,
            pos[1] - box.min.y,
            pos[2] - center.z,
          );

          model.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true;
              o.receiveShadow = true;
            }
          });

          parent.add(model);
        });
      }

      let sd = 7;
      const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
      const M = (c, o) =>
        new THREE.MeshStandardMaterial(
          Object.assign({ color: c, roughness: 0.7, metalness: 0.05 }, o),
        );
      const E = (c, i) =>
        M(0x000000, { emissive: c, emissiveIntensity: i || 1.6 });
      function put(o, m, x, y, z, p) {
        o.position.set(x || 0, y || 0, z || 0);
        o.castShadow = o.receiveShadow = true;
        (p || scene).add(o);
        return o;
      }
      const B = (w, h, d, m, x, y, z, p) =>
        put(
          new THREE.Mesh(
            new THREE.BoxGeometry(w, h, d),
            typeof m === "number" ? M(m) : m,
          ),
          m,
          x,
          y,
          z,
          p,
        );
      const Cy = (a, b, h, m, x, y, z, p, s) =>
        put(
          new THREE.Mesh(
            new THREE.CylinderGeometry(a, b, h, s || 24),
            typeof m === "number" ? M(m) : m,
          ),
          m,
          x,
          y,
          z,
          p,
        );
      function G(x, y, z, ry) {
        const g = new THREE.Group();
        g.position.set(x, y, z);
        g.rotation.y = ry || 0;
        scene.add(g);
        return g;
      }
      function L(type, c, i, d, x, y, z, sh) {
        const l = new THREE[type](c, i, d);
        l.position.set(x, y, z);
        if (sh) {
          l.castShadow = true;
          l.shadow.mapSize.set(sh, sh);
        }
        scene.add(l);
        return l;
      }
      function canv(w, h, fn) {
        const c = document.createElement("canvas");
        c.width = w;
        c.height = h;
        fn(c.getContext("2d"), w, h);
        const t = new THREE.CanvasTexture(c);
        t.encoding = THREE.sRGBEncoding;
        t.anisotropy = 4;
        return t;
      }
      function plane(w, h, t, x, y, z, ry, ei, p) {
        const m = new THREE.Mesh(
          new THREE.PlaneGeometry(w, h),
          M(0xffffff, {
            map: t,
            emissive: 0xffffff,
            emissiveMap: t,
            emissiveIntensity: ei,
            roughness: 0.9,
          }),
        );
        m.position.set(x, y, z);
        m.rotation.y = ry || 0;
        (p || scene).add(m);
        return m;
      }

      /* ============ LIGHTS ============ */
      scene.add(new THREE.AmbientLight(0x3b3f8f, 0.55));
      scene.add(new THREE.HemisphereLight(0x5b4bff, 0x1a0f2e, 0.35));
      const moon = L("DirectionalLight", 0x8da2ff, 0.7, 0, 9, 13, 10, 2048);
      Object.assign(moon.shadow.camera, {
        left: -9,
        right: 9,
        top: 9,
        bottom: -9,
        near: 1,
        far: 40,
      });
      moon.shadow.camera.updateProjectionMatrix();
      moon.shadow.bias = -0.0005;
      moon.shadow.normalBias = 0.05;
      L("PointLight", 0x2de2e6, 0.6, 10, 0, 5.2, -4.3);
      L("PointLight", 0xff3fa4, 0.6, 10, -4.3, 5.2, 0);
      const DT = 1.72;
      L("PointLight", 0xffa860, 1.7, 8, 2.4, DT + 0.8, -3.8, 1024); // desk lamp
      L("PointLight", 0x6f9bff, 0.9, 7, 0.5, DT + 1.3, -3.3); // monitor glow
      L("PointLight", 0xa040ff, 0.9, 5, 4.6, 0.9, -3.6); // PC glow

      /* ============ ROOM ============ */
      B(10.4, 0.3, 10.4, M(0x1a1740, { roughness: 0.85 }), 0, -0.15, 0);
      Cy(
        2.5,
        2.5,
        0.03,
        M(0x35206b, { roughness: 1 }),
        0.4,
        0.015,
        -0.3,
        null,
        48,
      );
      Cy(
        2.1,
        2.1,
        0.035,
        M(0x1f1450, { roughness: 1 }),
        0.4,
        0.016,
        -0.3,
        null,
        48,
      );
      B(10.4, 6, 0.3, M(0x141a3d), 0, 3, -5.15);
      B(0.3, 6, 10.4, M(0x1a1545), -5.15, 3, 0);
      B(10, 0.25, 0.1, 0x0c0e22, 0, 0.12, -4.95);
      B(0.1, 0.25, 10, 0x0c0e22, -4.95, 0.12, 0);
      B(10, 0.06, 0.06, E(0x2de2e6), 0, 5.8, -4.95);
      B(0.06, 0.06, 10, E(0xff3fa4), -4.95, 5.8, 0);

      /* ============ DESK SETUP ============ */
      // Teclado real (Womier SK80) apoyado sobre el escritorio (DT = 1.72)
      loadProp("./assets/keyboard.glb", 1.35, [0.42, DT - 0.65, -3.72], 0, -1);

      // Mousepad + Mouse (los dejamos igual)
      B(0.9, 0.01, 0.55, 0x0b0b16, 1.6, DT + 0.006, -3.75);
      B(0.09, 0.04, 0.14, 0x15151f, 1.6, DT + 0.03, -3.75);
      B(4.6, 0.14, 1.7, M(0x2a2540, { roughness: 0.5 }), 0.5, 1.65, -4.05);
      B(0.12, 1.6, 1.5, 0x1c1830, -1.7, 0.8, -4.05);
      B(0.12, 1.6, 1.5, 0x1c1830, 2.7, 0.8, -4.05);
      B(4.3, 0.03, 0.03, E(0x8b3dff, 1.2), 0.5, 1.56, -3.25);
      const CODE = [
        [
          ["import ", "#c792ea"],
          ["{ Injectable } ", "#e8eaff"],
          ["from ", "#c792ea"],
          ["'@nestjs/common'", "#c3e88d"],
        ],
        [],
        [["@Injectable()", "#ffcb6b"]],
        [
          ["export class ", "#c792ea"],
          ["AgentService ", "#82aaff"],
          ["{", "#e8eaff"],
        ],
        [
          ["  async ", "#c792ea"],
          ["runFlow", "#82aaff"],
          ["(input: string) {", "#e8eaff"],
        ],
        [
          ["    const ", "#c792ea"],
          ["ctx = await ", "#e8eaff"],
          ["this.rag.search", "#82aaff"],
          ["(input);", "#e8eaff"],
        ],
        [
          ["    return ", "#c792ea"],
          ["this.llm.chat", "#82aaff"],
          ["({ ctx });", "#e8eaff"],
        ],
        [["  }", "#e8eaff"]],
        [["}", "#e8eaff"]],
      ];
      const sTex = canv(1024, 384, (x, w, h) => {
        x.fillStyle = "#0b1020";
        x.fillRect(0, 0, w, h);
        x.fillStyle = "#141a36";
        x.fillRect(0, 0, w, 38);
        x.fillStyle = "#8b7cff";
        x.fillRect(0, 0, 230, 38);
        x.fillStyle = "#fff";
        x.font = "600 18px monospace";
        x.fillText("agent.service.ts", 16, 25);
        x.fillStyle = "#5a6396";
        x.font = "20px monospace";
        for (let i = 0; i < 9; i++) x.fillText(String(i + 1), 20, 86 + i * 32);
        x.font = "22px monospace";
        CODE.forEach((ln, i) => {
          let px = 60;
          ln.forEach(([t, c]) => {
            x.fillStyle = c;
            x.fillText(t, px, 86 + i * 32);
            px += x.measureText(t).width;
          });
        });
        x.fillStyle = "#141a36";
        x.fillRect(0, h - 34, w, 34);
        x.fillStyle = "#4ade80";
        x.font = "18px monospace";
        x.fillText(
          "webhook 200 OK  |  RAG: supabase  |  model: openrouter",
          16,
          h - 11,
        );
      });
      const mon = G(0.5, DT, -4.5);
      B(0.9, 0.04, 0.5, 0x15151f, 0, 0.02, 0.12, mon);
      B(0.12, 0.72, 0.08, 0x15151f, 0, 0.38, 0, mon);
      B(3, 1.2, 0.08, 0x0b0b12, 0, 1.3, 0, mon);
      const scr = new THREE.Mesh(
        new THREE.PlaneGeometry(2.88, 1.08),
        M(0x000000, {
          emissive: 0xffffff,
          emissiveMap: sTex,
          emissiveIntensity: 0.9,
          roughness: 0.4,
        }),
      );
      scr.position.set(0, 1.3, 0.045);
      mon.add(scr);

      // Crear elemento de video en memoria para la pantalla

      const animeVid = document.createElement("video");
      animeVid.src = "./assets/clip.mp4";
      animeVid.loop = true;
      animeVid.muted = true; // Obligatorio para que los navegadores permitan reproducirlo automáticamente
      animeVid.playsInline = true;

      const animeTex = new THREE.VideoTexture(animeVid);
      animeTex.encoding = THREE.sRGBEncoding;
      animeTex.minFilter = THREE.LinearFilter;
      animeTex.magFilter = THREE.LinearFilter;

      // keyboard + mouse
      B(0.9, 0.01, 0.55, 0x0b0b16, 1.6, DT + 0.006, -3.75);
      B(0.09, 0.04, 0.14, 0x15151f, 1.6, DT + 0.03, -3.75);
      // lamp
      const lamp = G(2.4, DT, -4.5);
      Cy(0.2, 0.22, 0.05, 0x15151f, 0, 0.025, 0, lamp);
      B(0.04, 0.9, 0.04, 0x2a2a38, 0, 0.5, 0, lamp);
      B(0.04, 0.04, 0.7, 0x2a2a38, 0, 0.95, 0.35, lamp);
      Cy(0.04, 0.16, 0.25, 0x2a2a38, 0, 0.88, 0.7, lamp);
      put(
        new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), E(0xffb067, 3)),
        0,
        0,
        0.78,
        0.7,
        lamp,
      );
      // Active project: minecraft cube
      const GR = ["#5fae3f", "#55a038", "#68b848", "#4c9433"],
        DI = ["#7a5230", "#6b4527", "#86593a", "#5d3c22"];
      function pix(base, rows) {
        return canv(16, 16, (x) => {
          for (let i = 0; i < 16; i++)
            for (let j = 0; j < 16; j++) {
              x.fillStyle = (j < rows ? GR : base)[(rnd() * 4) | 0];
              x.fillRect(i, j, 1, 1);
            }
        });
      }
      const tGr = pix(GR, 16),
        tSi = pix(DI, 4),
        tDi = pix(DI, 0);
      [tGr, tSi, tDi].forEach((t) => (t.magFilter = THREE.NearestFilter));
      const pj = G(-1.4, DT, -4.2);
      Cy(0.32, 0.36, 0.05, M(0x14142a, { metalness: 0.5 }), 0, 0.025, 0, pj);
      Cy(0.3, 0.3, 0.012, E(0x2de2e6), 0, 0.056, 0, pj);
      const cube = put(
        new THREE.Mesh(
          new THREE.BoxGeometry(0.46, 0.46, 0.46),
          [tSi, tSi, tGr, tDi, tSi, tSi].map((t) =>
            M(0xffffff, {
              map: t,
              emissive: 0xffffff,
              emissiveMap: t,
              emissiveIntensity: 0.3,
              roughness: 1,
            }),
          ),
        ),
        0,
        0,
        0.58,
        0,
        pj,
      );
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(0.38, 0.012, 8, 64),
        E(0x2de2e6, 2),
      );
      ring.position.y = 0.58;
      ring.rotation.x = 1.2;
      pj.add(ring);
      L("PointLight", 0x6bd06b, 0.5, 3, -1.4, DT + 0.7, -4.2);

      /* ============ PC TOWER + CHAIR ============ */

      // Torre gamer en el piso a la derecha del escritorio (alto ~1.65)
      loadProp("./assets/gaming-pc.glb", 1.65, [3.7, 0, -4.0], -Math.PI / 2);

      // Silla gamer alineada en el mismo punto que la anterior (x: 0.3, z: -2.08)
      loadProp("./assets/gaming-chair.glb", 2.45, [0.3, 0, -2.08], Math.PI);

      /* ============ AVATAR (.GLB) ============ */
      let mixer = null,
      activeAction = null,
      av = null,
      guitarModel = null,
      guitarAttachBone = null;
      const avatarActions = {};

      // Coordenadas globales en el cuarto para cada animación
      const POSE_SPOTS = {
        Typing: {
          pos: [0.35, 0.04, -2.29], // Exacto sobre el cojín de la silla frente al teclado
          rotY: Math.PI,
        },
        Sitting: {
          pos: [0.35, 0.04, -2.29], // Misma posición y orientación que Typing
          rotY: Math.PI,
        },
        Reading: {
          pos: [-3.5, 0.0, -2.8], // De pie frente a la estantería (bs está en x: -3.6, z: -4.5)
          rotY: Math.PI, // Mirando hacia los libros
        },
        Guitar: {
          pos: [-2.5, 0.0, 1.8], // De pie junto a la esquina de la guitarra
          rotY: Math.PI * 0.35, // Mirando hacia el centro del cuarto
        },
      };

      function setPose(name) {
        if (!av) return;
        const next = avatarActions[name];
        const spot = POSE_SPOTS[name];
        if (!next || !spot) return;

        if (next !== activeAction) {
          if (activeAction) activeAction.fadeOut(0.35);
          next.reset().fadeIn(0.35).play();
          activeAction = next;
        }

        av.position.set(...spot.pos);
        av.rotation.y = spot.rotY;

        // Alternar pantalla entre el video de anime ('Sitting') y el código
        if (name === "Sitting") {
          animeVid.play().catch(() => {}); // Arranca el bucle
          scr.material.emissiveMap = animeTex;
        } else {
          animeVid.pause(); // Pausa para ahorrar recursos
          scr.material.emissiveMap = sTex;
        }
        scr.material.needsUpdate = true;

        // Mover la guitarra a las manos del avatar en pose 'Guitar' o devolverla al soporte
        if (guitarModel) {
          if (name === "Guitar") {
            scene.add(guitarModel);
            guitarModel.scale.setScalar(2.65);
          } else {
            gt.add(guitarModel);
            guitarModel.scale.setScalar(2.4);
            guitarModel.position.set(0.04, 1.25, -0.2);
            guitarModel.rotation.set(0, Math.PI / 2, Math.PI / 2 + 0.18);
          }
        }
      }

      window.setPose = setPose;

      gltfLoader.load("./assets/avatar.glb", (gltf) => {
        av = gltf.scene;
        av.scale.setScalar(4.5);

        av.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = false;
            o.receiveShadow = true;
            o.frustumCulled = false;
          }
        });

        scene.add(av);

        mixer = new THREE.AnimationMixer(av);
        gltf.animations.forEach((clip) => {
          avatarActions[clip.name] = mixer.clipAction(clip);
        });
        setPose("Typing");
      });

      /* ============ BOOKSHELF ============ */
      /* ============ BOOKSHELF ============ */
      const bs = G(-3.6, 0, -4.5),
        wd = M(0x3a2650, { roughness: 0.8 });
      B(0.1, 4.3, 0.9, wd, -0.95, 2.15, 0, bs);
      B(0.1, 4.3, 0.9, wd, 0.95, 2.15, 0, bs);
      B(2, 4.3, 0.04, 0x241838, 0, 2.15, -0.43, bs);
      [0.05, 1.1, 2.1, 3.1, 4.25].forEach((y) =>
        B(2, 0.1, 0.9, wd, 0, y, 0, bs),
      );

      // Libros con lomos pintados en el centro de cada repisa (entre las portadas reales)
      const LIBRARY = [
        // Repisa 1 (y = 3.15)
        {
          y: 3.15,
          x: -0.18,
          title: "PRAGMATIC PROG",
          author: "Hunt",
          bg: "#7f1d1d",
          acc: "#fbbf24",
          h: 0.78,
          w: 0.16,
        },
        {
          y: 3.15,
          x: 0.0,
          title: "CLEAN CODE",
          author: "R. Martin",
          bg: "#064e3b",
          acc: "#34d399",
          h: 0.76,
          w: 0.16,
        },

        // Repisa 2 (y = 2.15)
        {
          y: 2.15,
          x: -0.18,
          title: "LINUX KERNEL",
          author: "R. Love",
          bg: "#27272a",
          acc: "#facc15",
          h: 0.78,
          w: 0.17,
        },
        {
          y: 2.15,
          x: 0.0,
          title: "WEB APP HACKER",
          author: "Stuttard",
          bg: "#18181b",
          acc: "#ef4444",
          h: 0.8,
          w: 0.17,
        },

        // Repisa 3 (y = 1.15)
        {
          y: 1.15,
          x: -0.18,
          title: "DEMIAN",
          author: "H. Hesse",
          bg: "#312e81",
          acc: "#c084fc",
          h: 0.72,
          w: 0.15,
        },
        {
          y: 1.15,
          x: -0.01,
          title: "CATCHER IN RYE",
          author: "Salinger",
          bg: "#7c2d12",
          acc: "#fdba74",
          h: 0.71,
          w: 0.15,
        },

        // Repisa 4 (y = 0.10)
        {
          y: 0.1,
          x: -0.18,
          title: "CLRS ALGORITHMS",
          author: "Cormen",
          bg: "#0f172a",
          acc: "#38bdf8",
          h: 0.82,
          w: 0.18,
        },
        {
          y: 0.1,
          x: 0.01,
          title: "COMPUTER NETS",
          author: "Tanenbaum",
          bg: "#4c0519",
          acc: "#fb7185",
          h: 0.79,
          w: 0.17,
        },
      ];

      LIBRARY.forEach((b) => {
        const book = createBook(b.title, b.author, b.bg, b.acc, b.w, b.h, 0.58);
        book.position.set(b.x + b.w / 2, b.y + b.h / 2, 0.08);
        bs.add(book);
      });

      // Helper para montar tus 8 portadas reales extraídas de los PDFs
      function addRealCoverBook(
        shelfY,
        xPos,
        imagePath,
        spineHex = "#1e293b",
        rotY = -0.12,
      ) {
        const coverTex = texLoader.load(imagePath);
        coverTex.encoding = THREE.sRGBEncoding;

        const coverMat = M(0xffffff, {
          map: coverTex,
          emissive: 0xffffff,
          emissiveMap: coverTex,
          emissiveIntensity: 0.42,
          roughness: 0.55,
        });
        const spineMat = M(spineHex, { roughness: 0.7 });
        const pagesMat = M(0xe2e8f0, { roughness: 0.9 });

        const bookMesh = new THREE.Mesh(
          new THREE.BoxGeometry(0.52, 0.76, 0.09),
          [pagesMat, spineMat, pagesMat, spineMat, coverMat, spineMat],
        );

        bookMesh.position.set(xPos, shelfY + 0.37, 0.16);
        bookMesh.rotation.x = -0.16;
        bookMesh.rotation.y = rotY;
        bookMesh.castShadow = true;
        bookMesh.receiveShadow = true;
        bs.add(bookMesh);
      }

      // Repisa 1 (Superior, y = 3.15): CS:APP + System Design on AWS
      addRealCoverBook(3.15, -0.54, "./assets/book-csapp.jpg", "#0f172a", 0.14);
      addRealCoverBook(3.15, 0.52, "./assets/book-aws.jpg", "#1e293b", -0.14);

      // Repisa 2 (y = 2.15): AI Engineering (O'Reilly) + Designing Data-Intensive Applications
      addRealCoverBook(
        2.15,
        -0.54,
        "./assets/book-ai-eng.jpg",
        "#172554",
        0.14,
      );
      addRealCoverBook(2.15, 0.52, "./assets/book-ddia.jpg", "#7f1d1d", -0.14);

      // Repisa 3 (y = 1.15): Clean Architecture + Building Microservices
      addRealCoverBook(
        1.15,
        -0.54,
        "./assets/book-clean-arch.jpg",
        "#18181b",
        0.14,
      );
      addRealCoverBook(
        1.15,
        0.52,
        "./assets/book-microservices.jpg",
        "#064e3b",
        -0.14,
      );

      // Repisa 4 (Inferior, y = 0.10): Head First Design Patterns + Learning Domain-Driven Design
      addRealCoverBook(0.1, -0.54, "./assets/book-hfdp.jpg", "#3b0764", 0.14);
      addRealCoverBook(0.1, 0.52, "./assets/book-ddd.jpg", "#431407", -0.14);

      /* ============ DIPLOMA + POSTERS ============ */

      // --- PARED IZQUIERDA (x = -4.95, rotY = Math.PI / 2) ---
      createPoster(
        "./assets/matrix.webp",
        0.95,
        1.65,
        [-4.95, 3.4, 3.55],
        Math.PI / 2,
      ); // Matrix (bien vertical, sobre las pesas)
      createPoster(
        "./assets/poster1.webp",
        1.1,
        1.5,
        [-4.95, 3.45, 2.05],
        Math.PI / 2,
      ); // Soul Eater
      createPoster(
        "./assets/poster2.webp",
        1.1,
        1.5,
        [-4.95, 3.45, 0.45],
        Math.PI / 2,
      ); // Sasuke
      createPoster(
        "./assets/linus.webp",
        1.55,
        1.1,
        [-4.95, 3.45, -1.45],
        Math.PI / 2,
      ); // Linus (horizontal)

      // --- PARED DEL FONDO / ESCRITORIO (z = -4.95, rotY = 0) ---
      createPoster("./assets/carmack.webp", 1.1, 1.45, [-2.05, 3.35, -4.95], 0); // Carmack (izquierda del monitor)
      createPoster(
        "./assets/terry-davis.webp",
        1.0,
        1.15,
        [-0.2, 4.12, -4.95],
        0,
      ); // Terry Davis (arriba izquierda del monitor)
      createPoster("./assets/opensrc.webp", 1.0, 1.15, [1.05, 4.12, -4.95], 0); // Open Source (entre el monitor y el diploma)

      const dip = canv(640, 460, (x, w, h) => {
        x.fillStyle = "#f3ead3";
        x.fillRect(0, 0, w, h);
        x.strokeStyle = "#b08a2e";
        x.lineWidth = 8;
        x.strokeRect(18, 18, w - 36, h - 36);
        x.lineWidth = 2;
        x.strokeRect(34, 34, w - 68, h - 68);
        x.fillStyle = "#3a2c10";
        x.textAlign = "center";
        x.font = "700 34px serif";
        x.fillText("UNIVERSIDAD EAN", w / 2, 100);
        x.font = "italic 22px serif";
        x.fillText("Bachelor of Science in", w / 2, 170);
        x.font = "700 40px serif";
        x.fillText("Systems Engineering", w / 2, 225);
        x.font = "22px serif";
        x.fillText("Diego Alejandro Parrado Agudelo", w / 2, 300);
        x.fillText("Expected 2027", w / 2, 340);
        x.fillStyle = "#b08a2e";
        x.beginPath();
        x.arc(w / 2, 395, 18, 0, 7);
        x.fill();
      });
      const dg = G(3.85, 3.5, -4.96);
      B(
        1.95,
        1.45,
        0.06,
        M(0x9a7a2a, { metalness: 0.6, roughness: 0.4 }),
        0,
        0,
        0,
        dg,
      );
      plane(1.8, 1.3, dip, 0, 0, 0.035, 0, 0.4, dg);

      /* ============ GUITAR + GYM ============ */
      const gt = G(-4.35, 0, 2.2, 0);
      const stMat = M(0x14141c, { metalness: 0.65, roughness: 0.35 });
      const padMat = M(0x0a0a0e, { roughness: 0.9 });

      // Patas laterales en A + barra trasera + horquillas acolchadas donde apoya el cuerpo
      B(0.55, 0.04, 0.05, stMat, 0, 0.02, -0.24, gt);
      B(0.55, 0.04, 0.05, stMat, 0, 0.02, 0.24, gt);
      B(0.05, 0.04, 0.52, stMat, -0.24, 0.02, 0, gt); // Travesaño trasero
      // Patas inclinadas del respaldo
      B(0.04, 0.65, 0.04, stMat, -0.14, 0.32, -0.22, gt).rotation.z = -0.22;
      B(0.04, 0.65, 0.04, stMat, -0.14, 0.32, 0.22, gt).rotation.z = -0.22;
      B(0.04, 0.04, 0.48, padMat, -0.07, 0.62, 0, gt); // Apoyo superior acolchado
      // Horquillas inferiores donde encaja el cuerpo de la Ibanez
      B(0.22, 0.04, 0.05, padMat, 0.14, 0.12, -0.22, gt).rotation.z = 0.25;
      B(0.22, 0.04, 0.05, padMat, 0.14, 0.12, 0.22, gt).rotation.z = 0.25;

      gltfLoader.load("./assets/guitarra_diego.glb", (gltf) => {
        const gModel = gltf.scene;
        guitarModel = gModel;

        // Calculamos el centro real del modelo en escala 1 para poder posicionarlo sin que se desvíe por su pivote
        const box = new THREE.Box3().setFromObject(gModel);
        gModel.userData.centerOffset = box.getCenter(new THREE.Vector3());

        gModel.scale.setScalar(2.4);
        gModel.position.set(0.04, 1.25, -0.2);
        gModel.rotation.set(0, Math.PI / 2, Math.PI / 2 + 0.18);

        gModel.traverse((o) => {
          if (o.isMesh) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.frustumCulled = false;
          }
        });

        gt.add(gModel);
      });

      function dumb(x, z) {
        const g = G(x, 0.14, z, Math.PI / 2),
          m = M(0x15151c, { metalness: 0.7, roughness: 0.35 });
        Cy(0.035, 0.035, 0.5, m, 0, 0, 0, g, 12).rotation.z = Math.PI / 2;
        [-0.22, 0.22].forEach(
          (s) =>
            (Cy(0.13, 0.13, 0.1, m, s, 0, 0, g, 6).rotation.z = Math.PI / 2),
        );
      }
      dumb(-4.3, 4.2);
      dumb(-4.3, 4.6);
      const kb = G(-3.7, 0, 3.5),
        km = M(0x14141c, { metalness: 0.6, roughness: 0.4 });
      put(
        new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 16), km),
        km,
        0,
        0.27,
        0,
        kb,
      );
      put(
        new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.04, 10, 24), km),
        km,
        0,
        0.62,
        0,
        kb,
      );

      /* ============ INTERACTIVITY ============ */
      const HOT = [],
        hotMeshes = [];
      function hot(g, id, name, mx, my, mz) {
        const mk = new THREE.Mesh(
          new THREE.SphereGeometry(0.07, 12, 12),
          E(0xffb067, 3),
        );
        mk.position.set(mx, my, mz);
        g.add(mk);
        g.userData = { id, name, mk, mats: [] };
        g.traverse((o) => {
          if (!o.isMesh) return;
          o.material = Array.isArray(o.material)
            ? o.material.map((m) => m.clone())
            : o.material.clone();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach(
            (m) => {
              m.userData = { eh: m.emissive.getHex(), ei: m.emissiveIntensity };
              g.userData.mats.push(m);
            },
          );
          o.userData.root = g;
          hotMeshes.push(o);
        });
        HOT.push(g);
      }
      hot(mon, "work", "Monitor: Work & CV", 0, 2.25, 0);
      hot(bs, "books", "Engineering Bookshelf", 0, 4.75, 0);
      hot(pj, "project", "Active Project: AI Minecraft NPC", 0, 1.15, 0);
      hot(dg, "edu", "Education & Credentials", 0, 1.0, 0);
      function setHot(g, on) {
        g.userData.mats.forEach((m) => {
          if (!on) {
            m.emissive.setHex(m.userData.eh);
            m.emissiveIntensity = m.userData.ei;
          } else if (m.userData.eh === 0) {
            m.emissive.setHex(0x3a2f8f);
            m.emissiveIntensity = 0.9;
          } else m.emissiveIntensity = m.userData.ei + 0.8;
        });
      }
      const VIEWS = {
        work: { p: [0.5, 3.4, -0.2], t: [0.5, 2.95, -4.5] },
        books: { p: [-3.4, 2.9, 2.6], t: [-3.6, 2.3, -4.5] },
        project: { p: [-0.8, 3.2, -1.7], t: [-1.4, 2.3, -4.2] },
        edu: { p: [3.8, 3.8, -1], t: [3.8, 3.4, -4.95] },
      };
      let tw = null,
        hov = null;
      controls.addEventListener("start", () => {
        tw = null;
      });
      function focus(id) {
        const v = VIEWS[id],
          p = new THREE.Vector3(...v.p),
          t = new THREE.Vector3(...v.t);
        if (innerWidth > 800) {
          const d = t.clone().sub(p),
            W =
              2 *
              d.length() *
              Math.tan((camera.fov * Math.PI) / 360) *
              camera.aspect,
            r = d
              .normalize()
              .cross(new THREE.Vector3(0, 1, 0))
              .normalize()
              .multiplyScalar((W * 210) / innerWidth);
          p.add(r);
          t.add(r);
        }
        tw = { p, t };
        $("#pb").innerHTML = PANELS[id];
        $("#panel").scrollTop = 0;
        panel.classList.add("open");

        if (id === "pc" || id === "work" || id === "code") setPose("Typing");
        if (id === "books" || id === "study") setPose("Reading");
        if (id === "music" || id === "guitar") setPose("Guitar");
      }
      function reset() {
        tw = { p: HOME.p.clone(), t: HOME.t.clone() };
        panel.classList.remove("open");
        setPose("Typing");
      }
      const ray = new THREE.Raycaster(),
        mouse = new THREE.Vector2();
      function pick(e) {
        const r = canvas.getBoundingClientRect();
        mouse.set(
          ((e.clientX - r.left) / r.width) * 2 - 1,
          -((e.clientY - r.top) / r.height) * 2 + 1,
        );
        ray.setFromCamera(mouse, camera);
        const h = ray.intersectObjects(hotMeshes, false)[0];
        return h ? h.object.userData.root : null;
      }
      canvas.addEventListener("pointermove", (e) => {
        if (e.pointerType !== "mouse" || e.buttons) return;
        const g = pick(e);
        if (g !== hov) {
          if (hov) setHot(hov, false);
          hov = g;
          if (g) setHot(g, true);
          canvas.style.cursor = g ? "pointer" : "grab";
          tip.textContent = g ? g.userData.name : "";
          tip.style.opacity = g ? 1 : 0;
        }
        tip.style.transform = `translate(${e.clientX + 16}px,${e.clientY + 16}px)`;
      });
      let down = null;

      canvas.addEventListener("pointerdown", (e) => {
        if (e.button === 0) down = [e.clientX, e.clientY];
      });
      canvas.addEventListener("pointerup", (e) => {
        if (e.button !== 0 || !down) return;
        const d = Math.hypot(e.clientX - down[0], e.clientY - down[1]);
        down = null;
        if (d < 6) {
          const g = pick(e);
          if (g) focus(g.userData.id);
        }
      });
      $("#reset").onclick = reset;
      $("#close").onclick = () => panel.classList.remove("open");
      addEventListener("keydown", (e) => {
        if (e.key === "Escape") reset();
      });
      let run = true;
      $("#t2d").onclick = () => {
        const on = !document.body.classList.contains("v2d");
        document.body.classList.toggle("v2d", on);
        run = !on;
        $("#t2d").textContent = on ? "3D Room" : "2D Quick View";
        panel.classList.remove("open");
      };

      /* ============ LOOP ============ */
      const clock = new THREE.Clock();
      (function loop() {
        requestAnimationFrame(loop);
        if (!run) return;
        const dt = Math.min(clock.getDelta(), 0.05),
          t = clock.elapsedTime;
        if (mixer) mixer.update(dt);
       if (guitarModel && guitarModel.parent === scene && av) {
          guitarModel.rotation.order = "YXZ";
          guitarModel.rotation.set(0.25, av.rotation.y, Math.PI / 2 - 1.02);

          // Aumentamos Z de 0.48 a 0.56 para adelantar el mástil justo hasta los dedos de la mano izquierda
          const targetPoint = new THREE.Vector3(0.22, 1.94, 0.56)
            .applyAxisAngle(new THREE.Vector3(0, 1, 0), av.rotation.y)
            .add(av.position);

          const cOff = (guitarModel.userData.centerOffset || new THREE.Vector3())
            .clone()
            .multiplyScalar(guitarModel.scale.x)
            .applyEuler(guitarModel.rotation);

          guitarModel.position.copy(targetPoint).sub(cOff);
        }
        if (tw) {
          const a = 1 - Math.exp(-5 * dt);
          camera.position.lerp(tw.p, a);
          controls.target.lerp(tw.t, a);
          if (
            camera.position.distanceTo(tw.p) < 0.02 &&
            controls.target.distanceTo(tw.t) < 0.02
          )
            tw = null;
        }
        cube.rotation.y += dt * 0.7;
        cube.position.y = 0.58 + Math.sin(t * 1.6) * 0.05;
        ring.rotation.y += dt * 0.8;
        HOT.forEach((g, i) =>
          g.userData.mk.scale.setScalar(1 + Math.sin(t * 3 + i) * 0.25),
        );
        controls.update();

        // Limitar el desplazamiento lateral para no salirse del cuarto
        const prevX = controls.target.x;
        const prevZ = controls.target.z;
        controls.target.x = THREE.MathUtils.clamp(controls.target.x, -4.2, 4.2);
        controls.target.z = THREE.MathUtils.clamp(controls.target.z, -4.2, 4.2); // Cambia a HOME.t.z si quieres bloquear Z
        controls.target.y = THREE.MathUtils.clamp(controls.target.y, 1.0, 4.2);

        // Si el target tocó el borde, compensamos la cámara para que no se desplace sola
        camera.position.x += controls.target.x - prevX;
        camera.position.z += controls.target.z - prevZ;

        renderer.render(scene, camera);
      })();
