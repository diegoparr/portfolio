/* ============ ROOM ============ */
export function createRoom({
  createBoxMesh,
  createCylinderMesh,
  createMeshStandardMaterial,
  createEmissiveMaterial,
}) {
    createBoxMesh(10.4, 0.3, 10.4, createMeshStandardMaterial(0x1a1740, { roughness: 0.85 }), 0, -0.15, 0);
    createCylinderMesh(2.5, 2.5, 0.03, createMeshStandardMaterial(0x35206b, { roughness: 1 }), 0.4, 0.015, -0.3, null, 48);
    createCylinderMesh(2.1, 2.1, 0.035, createMeshStandardMaterial(0x1f1450, { roughness: 1 }), 0.4, 0.016, -0.3, null, 48);
    createBoxMesh(10.4, 6, 0.3, createMeshStandardMaterial(0x141a3d), 0, 3, -5.15);
    createBoxMesh(0.3, 6, 10.4, createMeshStandardMaterial(0x1a1545), -5.15, 3, 0);
    createBoxMesh(10, 0.25, 0.1, 0x0c0e22, 0, 0.12, -4.95);
    createBoxMesh(0.1, 0.25, 10, 0x0c0e22, -4.95, 0.12, 0);
    createBoxMesh(10, 0.06, 0.06, createEmissiveMaterial(0x2de2e6), 0, 5.8, -4.95);
    createBoxMesh(0.06, 0.06, 10, createEmissiveMaterial(0xff3fa4), -4.95, 5.8, 0);

}