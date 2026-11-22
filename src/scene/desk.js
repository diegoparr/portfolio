import * as THREE from "three";

export function createDesk({
  deskTopHeight,
  loadProp,
  createMeshStandardMaterial,
  createEmissiveMaterial,
  createBoxMesh,
  createCylinderMesh,
  createGroup,
  createLight,
  addToScene,
  createCanvasTexture,
}) {
  loadProp("./assets/keyboard.glb", 1.35, [0.42, deskTopHeight - 0.65, -3.72], 0, -1);

  createBoxMesh(0.9, 0.01, 0.55, 0x0b0b16, 1.6, deskTopHeight + 0.006, -3.75);
  createBoxMesh(0.09, 0.04, 0.14, 0x15151f, 1.6, deskTopHeight + 0.03, -3.75);
  createBoxMesh(4.6, 0.14, 1.7, createMeshStandardMaterial(0x2a2540, { roughness: 0.5 }), 0.5, 1.65, -4.05);
  createBoxMesh(0.12, 1.6, 1.5, 0x1c1830, -1.7, 0.8, -4.05);
  createBoxMesh(0.12, 1.6, 1.5, 0x1c1830, 2.7, 0.8, -4.05);
  createBoxMesh(4.3, 0.03, 0.03, createEmissiveMaterial(0x8b3dff, 1.2), 0.5, 1.56, -3.25);

  const lamp = createGroup(2.4, deskTopHeight, -4.5);
  createCylinderMesh(0.2, 0.22, 0.05, 0x15151f, 0, 0.025, 0, lamp);
  createBoxMesh(0.04, 0.9, 0.04, 0x2a2a38, 0, 0.5, 0, lamp);
  createBoxMesh(0.04, 0.04, 0.7, 0x2a2a38, 0, 0.95, 0.35, lamp);
  createCylinderMesh(0.04, 0.16, 0.25, 0x2a2a38, 0, 0.88, 0.7, lamp);
  addToScene(
    new THREE.Mesh(new THREE.SphereGeometry(0.05, 12, 12), createEmissiveMaterial(0xffb067, 3)),
    0,
    0,
    0.78,
    0.7,
    lamp,
  );

  const GR = ["#5fae3f", "#55a038", "#68b848", "#4c9433"];
  const DI = ["#7a5230", "#6b4527", "#86593a", "#5d3c22"];
  let sd = 7;
  const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  function pix(base, rows) {
    return createCanvasTexture(16, 16, (x) => {
      for (let i = 0; i < 16; i++) {
        for (let j = 0; j < 16; j++) {
          x.fillStyle = (j < rows ? GR : base)[(rnd() * 4) | 0];
          x.fillRect(i, j, 1, 1);
        }
      }
    });
  }

  const tGr = pix(GR, 16);
  const tSi = pix(DI, 4);
  const tDi = pix(DI, 0);
  [tGr, tSi, tDi].forEach((t) => (t.magFilter = THREE.NearestFilter));

  const pj = createGroup(-1.4, deskTopHeight, -4.2);
  createCylinderMesh(0.32, 0.36, 0.05, createMeshStandardMaterial(0x14142a, { metalness: 0.5 }), 0, 0.025, 0, pj);
  createCylinderMesh(0.3, 0.3, 0.012, createEmissiveMaterial(0x2de2e6), 0, 0.056, 0, pj);
  const cube = addToScene(
    new THREE.Mesh(
      new THREE.BoxGeometry(0.46, 0.46, 0.46),
      [tSi, tSi, tGr, tDi, tSi, tSi].map((t) =>
        createMeshStandardMaterial(0xffffff, {
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
    createEmissiveMaterial(0x2de2e6, 2),
  );
  ring.position.y = 0.58;
  ring.rotation.x = 1.2;
  pj.add(ring);
  createLight("PointLight", 0x6bd06b, 0.5, 3, -1.4, deskTopHeight + 0.7, -4.2);

  return { pj, cube, ring };
}
