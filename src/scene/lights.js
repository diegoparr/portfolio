import * as THREE from "three";
/* ============ LIGHTS ============ */
// Ambiente contenido: si sube demasiado, el cuarto pierde contraste y se ve "lavado".
export const deskTopHeight = 1.72;
export function createLights({ scene, createLight}) {
    scene.add(new THREE.AmbientLight(0x3b3f8f, 0.45));
    scene.add(new THREE.HemisphereLight(0x5b4bff, 0x1a0f2e, 0.35));
    const moon = createLight("DirectionalLight", 0x8da2ff, 0.8, 0, 9, 13, 10, 2048);
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
    createLight("PointLight", 0x2de2e6, 0.6, 10, 0, 5.2, -4.3);
    createLight("PointLight", 0xff3fa4, 0.6, 10, -4.3, 5.2, 0);
    createLight("PointLight", 0xffa860, 1.7, 8, 2.4, deskTopHeight + 0.8, -3.8, 1024); // desk lamp
    createLight("PointLight", 0x6f9bff, 0.9, 7, 0.5, deskTopHeight + 1.3, -3.3); // monitor glow
    createLight("PointLight", 0xa040ff, 0.9, 5, 4.6, 0.9, -3.6); // PC glow
}