import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";

/* ============ RENDERER / CAMERA ============ */

export function createSetup(){

  const $ = (s) => document.querySelector(s),
    canvas = $("#c"),
    panel = $("#panel"),
    tip = $("#tip");
  // 1. El renderer WebGL DEBE tener alpha: true
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // three r128: la salida se controla con outputEncoding (outputColorSpace llega en r152+)
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.75;

  // 2. El CSS3DRenderer va DETRÁS del canvas (zIndex: 1)
  const cssRenderer = new CSS3DRenderer();
  cssRenderer.domElement.style.position = "fixed";
  cssRenderer.domElement.style.top = "0";
  cssRenderer.domElement.style.left = "0";
  cssRenderer.domElement.style.zIndex = "1";
  cssRenderer.domElement.style.pointerEvents = "none";
  document.body.appendChild(cssRenderer.domElement);
  const cssScene = new THREE.Scene();

  // 3. El canvas WebGL va ENCIMA del CSS3DRenderer (zIndex: 2)
  canvas.style.position = "fixed";
  canvas.style.top = "0";
  canvas.style.left = "0";
  canvas.style.zIndex = "2";


  const scene = new THREE.Scene();
  scene.background = null;
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
    cssRenderer.setSize(w, h); // <-- AÑADIR ESTA LÍNEA
    camera.aspect = w / h;
    camera.fov = w / h < 1 ? 52 : 32;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", rs);
  rs();
  return { $, canvas, panel, tip, scene, cssScene, camera, controls, renderer, cssRenderer, HOME};
}