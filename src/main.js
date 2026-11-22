import * as THREE from "three";
import { createSetup } from "./scene/setup.js";
import {
  setHelpersScene,
  createBook,
  createPoster,
  loadProp,
  createMeshStandardMaterial,
  createEmissiveMaterial,
  addToScene,
  createBoxMesh,
  createCylinderMesh,
  createGroup,
  createLight,
  createCanvasTexture,
  createPlaneMesh,
  gltfLoader,
  texLoader,
} from "./scene/helpers.js";
import { createDesk } from "./scene/desk.js";
import { createMonitor } from "./scene/monitor.js";
import { deskTopHeight, createLights } from "./scene/lights.js";
import { createRoom } from "./scene/room.js";
import { createBookshelf } from "./scene/books.js";
import { createAvatar } from "./scene/avatar.js";
import { createDecorations } from "./scene/decoration.js";
import { createHotspots } from "./interaction/hotspots.js";
import { createCameraController } from "./interaction/camera.js";
import { PANELS } from "./content/portfolio.js";
/* ============ RENDERER / CAMERA ============ */
const {
  $,
  canvas,
  panel,
  tip,
  scene,
  cssScene,
  camera,
  controls,
  renderer,
  cssRenderer,
  HOME,
} = createSetup();
setHelpersScene(scene);
/* ============ LIGHTS ============ */
// Ambiente contenido: si sube demasiado, el cuarto pierde contraste y se ve "lavado".
createLights({ scene, createLight });

/* ============ ROOM ============ */
createRoom({
  createBoxMesh,
  createCylinderMesh,
  createMeshStandardMaterial,
  createEmissiveMaterial,
});
const { pj, cube, ring } = createDesk({
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
});
const { mon, osIframe, cssScreen, scr, setScreenMode } = createMonitor({
  cssScene,
  deskTopHeight,
  createGroup,
  createMeshStandardMaterial,
  createCanvasTexture,
});
let isUsingPC = false;

window.addEventListener("message", (e) => {
  if (e.data === "EXIT_PC") reset();
});

/* ============ BOOKSHELF ============ */
const bs = createBookshelf();

/* ============ DECORATIONS ============ */
let pendingEducationHotspot = null;
let hotspots = null;

const decorations = createDecorations({
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
  onReady: (educationHotspot) => {
    pendingEducationHotspot = educationHotspot;
    if (hotspots) {
      hotspots.register(
        educationHotspot,
        "edu",
        "Education & Credentials",
        0,
        1,
        0,
      );
    }
  },
});
const { guitarStand: gt, educationHotspot: dg, setDiplomaLanguage } = decorations;

/* ============ DIPLOMA LANGUAGE ============ */
// El botón vive dentro del panel de Educación (#pb), que se reescribe al abrirlo.
let diplomaLang = "es";
function syncDiplomaButton() {
  const b = $("#dlang");
  if (!b) return;
  b.textContent =
    diplomaLang === "es" ? "View diploma in English" : "View diploma in Spanish";
}
$("#pb").addEventListener("click", (e) => {
  if (!e.target.closest("#dlang")) return;
  diplomaLang = setDiplomaLanguage(diplomaLang === "es" ? "en" : "es");
  syncDiplomaButton();
});

const avatar = createAvatar({
  scene,
  gltfLoader,
  guitarStand: gt,
  scr,
  setScreenMode,
  getIsUsingPC: () => isUsingPC,
});
window.setPose = (name) => {
  if (isUsingPC) reset();
  avatar.setPose(name);
};

/* ============ CAMERA + HOTSPOTS ============ */
const cameraController = createCameraController({
  camera,
  controls,
  canvas,
  deskTopHeight,
  innerWidth: () => innerWidth,
  HOME,
  cssRenderer,
  osIframe,
  panel,
  avatar,
  setScreenMode,
  getIsUsingPC: () => isUsingPC,
  setIsUsingPC: (value) => {
    isUsingPC = value;
  },
});
const reset = cameraController.reset;

hotspots = createHotspots({
  canvas,
  camera,
  tip,
  createEmissiveMaterial,
  onSelect: (id) =>
    cameraController.focus(id, PANELS, $, syncDiplomaButton),
  mon,
  bs,
  pj,
});

if (pendingEducationHotspot) {
  hotspots.register(
    pendingEducationHotspot,
    "edu",
    "Education & Credentials",
    0,
    1,
    0,
  );
}
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
  avatar.update(dt);
  cameraController.update(dt);
  hotspots.update(t);
  cube.rotation.y += dt * 0.7;
  cube.position.y = 0.58 + Math.sin(t * 1.6) * 0.05;
  ring.rotation.y += dt * 0.8;
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
  cssRenderer.render(cssScene, camera); // <-- AÑADIR ESTA LÍNEA
})();
