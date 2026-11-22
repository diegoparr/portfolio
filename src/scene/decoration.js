import * as THREE from "three";

export function createDecorations({
  loadProp,
  texLoader,
  createPoster,
  createCanvasTexture,
  createGroup,
  createBoxMesh,
  createPlaneMesh,
  createCylinderMesh,
  createMeshStandardMaterial,
  addToScene,
  gltfLoader,
  onReady,
}) {
  loadProp(
    "./assets/gaming-pc.glb",
    1.65,
    [3.7, 0, -4],
    -Math.PI / 2,
  );
  loadProp(
    "./assets/gaming-chair.glb",
    2.45,
    [0.3, 0, -2.08],
    Math.PI,
  );

  const educationHotspot = createGroup(3.85, 3.5, -4.96);
  const guitarStand = createGroup(-4.35, 0, 2.2, 0);
  const steelMaterial = createMeshStandardMaterial(0x14141c, {
    metalness: 0.65,
    roughness: 0.35,
  });
  const padMaterial = createMeshStandardMaterial(0x0a0a0e, {
    roughness: 0.9,
  });

  // Patas laterales en A + barra trasera + horquillas acolchadas donde apoya el cuerpo
  createBoxMesh(0.55, 0.04, 0.05, steelMaterial, 0, 0.02, -0.24, guitarStand);
  createBoxMesh(0.55, 0.04, 0.05, steelMaterial, 0, 0.02, 0.24, guitarStand);
  createBoxMesh(0.05, 0.04, 0.52, steelMaterial, -0.24, 0.02, 0, guitarStand);
  createBoxMesh(0.04, 0.65, 0.04, steelMaterial, -0.14, 0.32, -0.22, guitarStand).rotation.z = -0.22;
  createBoxMesh(0.04, 0.65, 0.04, steelMaterial, -0.14, 0.32, 0.22, guitarStand).rotation.z = -0.22;
  createBoxMesh(0.04, 0.04, 0.48, padMaterial, -0.07, 0.62, 0, guitarStand);
  createBoxMesh(0.22, 0.04, 0.05, padMaterial, 0.14, 0.12, -0.22, guitarStand).rotation.z = 0.25;
  createBoxMesh(0.22, 0.04, 0.05, padMaterial, 0.14, 0.12, 0.22, guitarStand).rotation.z = 0.25;

  // Pósters de la pared izquierda
  createPoster("./assets/matrix.webp", 0.95, 1.65, [-4.95, 3.4, 3.55], Math.PI / 2);
  createPoster("./assets/poster1.webp", 1.1, 1.5, [-4.95, 3.45, 2.05], Math.PI / 2);
  createPoster("./assets/poster2.webp", 1.1, 1.5, [-4.95, 3.45, 0.45], Math.PI / 2);
  createPoster("./assets/linus.webp", 1.55, 1.1, [-4.95, 3.45, -1.45], Math.PI / 2);

  // Pósters del fondo
  createPoster("./assets/carmack.webp", 1.1, 1.45, [-2.05, 3.35, -4.95], 0);
  createPoster("./assets/terry-davis.webp", 1.0, 1.15, [-0.2, 4.12, -4.95], 0);
  createPoster("./assets/opensrc.webp", 1.0, 1.15, [1.05, 4.12, -4.95], 0);

  // Diploma ilustrativo: mismo layout que un título real, pero de "futuro graduado".
  // Se dibuja a 2x para que el texto se lea nítido al acercar la cámara.
  const DIPLOMA_W = 640;
  const DIPLOMA_H = 480;
  const DIPLOMA_FONT = '"Carlito", Calibri, Arial, sans-serif';
  const DIPLOMA_TEXT = {
    es: {
      university: "La Universidad EAN",
      confer: "Otorgará el título de",
      name: "DIEGO ALEJANDRO PARRADO AGUDELO",
      degree: "Ingeniero de Sistemas",
      program: "Programa de Ingeniería de Sistemas · Facultad de Ingeniería",
      graduation: "Graduación prevista en 2027",
      seal: "2027",
      signatures: [
        ["Lorena Piñeiro Cortés", "Rectora", "Universidad EAN"],
        ["Jeffrey León Pulido", "Decano", "Facultad de Ingeniería"],
      ],
      footer:
        "Diploma ilustrativo · Futuro graduado 2027 · No es un documento oficial",
    },
    en: {
      university: "EAN University",
      confer: "Will confer the degree of",
      name: "DIEGO ALEJANDRO PARRADO AGUDELO",
      degree: "B.S. in Systems Engineering",
      program: "Systems Engineering Program · School of Engineering",
      graduation: "Expected graduation 2027",
      seal: "2027",
      signatures: [
        ["Lorena Piñeiro Cortés", "Rector", "EAN University"],
        ["Jeffrey León Pulido", "Dean", "School of Engineering"],
      ],
      footer:
        "Illustrative diploma · Future graduate 2027 · Not an official document",
    },
  };

  let diplomaCtx = null;
  let diplomaTexture = null;
  let diplomaLogo = null;
  let diplomaLang = "es";

  function drawDiploma() {
    if (!diplomaCtx) return;
    const ctx = diplomaCtx;
    const t = DIPLOMA_TEXT[diplomaLang] || DIPLOMA_TEXT.es;
    const cx = DIPLOMA_W / 2;

    // Resetea la escala de 2x para que cada redibujado parta del mismo estado
    ctx.setTransform(2, 0, 0, 2, 0, 0);
    ctx.clearRect(0, 0, DIPLOMA_W, DIPLOMA_H);

    // Papel blanco con un borde fino, como una hoja escaneada
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, DIPLOMA_W, DIPLOMA_H);
    ctx.strokeStyle = "#e2e2e2";
    ctx.lineWidth = 1;
    ctx.strokeRect(7.5, 7.5, DIPLOMA_W - 15, DIPLOMA_H - 15);

    ctx.textAlign = "center";

    // Logo de la universidad, respetando su relación de aspecto
    if (diplomaLogo?.width) {
      const logoW = 155;
      const logoH = (logoW * diplomaLogo.height) / diplomaLogo.width;
      ctx.drawImage(diplomaLogo, cx - logoW / 2, 24, logoW, logoH);
    }

    ctx.fillStyle = "#2b2b2b";
    ctx.font = `20px ${DIPLOMA_FONT}`;
    ctx.fillText(t.university, cx, 126);

    ctx.fillStyle = "#555555";
    ctx.font = `11px ${DIPLOMA_FONT}`;
    ctx.fillText(t.confer, cx, 158);

    ctx.fillStyle = "#1a1a1a";
    ctx.font = `700 18px ${DIPLOMA_FONT}`;
    ctx.fillText(t.name, cx, 196);

    ctx.font = `700 14px ${DIPLOMA_FONT}`;
    ctx.fillText(t.degree, cx, 224);

    ctx.fillStyle = "#4a4a4a";
    ctx.font = `11px ${DIPLOMA_FONT}`;
    ctx.fillText(t.program, cx, 258);
    ctx.fillText(t.graduation, cx, 276);

    // Sello de futuro graduado
    ctx.strokeStyle = "#b08d3a";
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(cx, 330, 25, 0, Math.PI * 2);
    ctx.stroke();
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.arc(cx, 330, 21, 0, Math.PI * 2);
    ctx.stroke();
    ctx.fillStyle = "#8a6c28";
    ctx.font = `700 12px ${DIPLOMA_FONT}`;
    ctx.fillText(t.seal, cx, 334.5);

    // Dos espacios de firma, sin rúbricas
    const sign = (x, [name, role, entity]) => {
      ctx.strokeStyle = "#333333";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - 105, 396);
      ctx.lineTo(x + 105, 396);
      ctx.stroke();

      ctx.fillStyle = "#1f1f1f";
      ctx.font = `700 10px ${DIPLOMA_FONT}`;
      ctx.fillText(name, x, 411);
      ctx.fillStyle = "#4a4a4a";
      ctx.font = `9px ${DIPLOMA_FONT}`;
      ctx.fillText(role, x, 424);
      ctx.fillText(entity, x, 436);
    };
    sign(cx - 155, t.signatures[0]);
    sign(cx + 155, t.signatures[1]);

    ctx.fillStyle = "#8a8a8a";
    ctx.font = `8px ${DIPLOMA_FONT}`;
    ctx.fillText(t.footer, cx, 462);
  }

  // Cambia el idioma del diploma sin recrear malla ni textura
  function setDiplomaLanguage(lang) {
    diplomaLang = lang === "en" ? "en" : "es";
    drawDiploma();
    if (diplomaTexture) diplomaTexture.needsUpdate = true;
    return diplomaLang;
  }

  async function mountDiploma(logoTexture) {
    try {
      await document.fonts?.ready;
    } catch {
      /* sin la API de fuentes seguimos con las del sistema */
    }

    diplomaLogo = logoTexture?.image || null;
    diplomaTexture = createCanvasTexture(DIPLOMA_W * 2, DIPLOMA_H * 2, (ctx) => {
      diplomaCtx = ctx;
    });
    diplomaTexture.anisotropy = 8;
    drawDiploma();

    createBoxMesh(
      1.95,
      1.5,
      0.06,
      createMeshStandardMaterial(0x14141f, { metalness: 0.35, roughness: 0.55 }),
      0,
      0,
      0,
      educationHotspot,
    );
    createPlaneMesh(1.8, 1.35, diplomaTexture, 0, 0, 0.035, 0, 0.35, educationHotspot);
    onReady?.(educationHotspot);
  }

  texLoader.load(
    "./assets/ean-logo.png",
    mountDiploma,
    undefined,
    () => mountDiploma(null),
  );

  function createDumbbell(x, z) {
    const dumbbell = createGroup(x, 0.14, z, Math.PI / 2);
    const metal = createMeshStandardMaterial(0x15151c, {
      metalness: 0.7,
      roughness: 0.35,
    });

    createCylinderMesh(0.035, 0.035, 0.5, metal, 0, 0, 0, dumbbell, 12).rotation.z = Math.PI / 2;
    [-0.22, 0.22].forEach((position) =>
      createCylinderMesh(0.13, 0.13, 0.1, metal, position, 0, 0, dumbbell, 6).rotation.z = Math.PI / 2,
    );
  }

  createDumbbell(-4.3, 4.2);
  createDumbbell(-4.3, 4.6);

  const kettlebell = createGroup(-3.7, 0, 3.5);
  const kettlebellMaterial = createMeshStandardMaterial(0x14141c, {
    metalness: 0.6,
    roughness: 0.4,
  });
  addToScene(
    new THREE.Mesh(new THREE.SphereGeometry(0.27, 24, 16), kettlebellMaterial),
    kettlebellMaterial,
    0,
    0.27,
    0,
    kettlebell,
  );
  addToScene(
    new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.04, 10, 24), kettlebellMaterial),
    kettlebellMaterial,
    0,
    0.62,
    0,
    kettlebell,
  );

  return {
    guitarStand,
    educationHotspot,
    setDiplomaLanguage,
  };
}