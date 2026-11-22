import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/* ============ HELPERS ============ */

let sceneRef = null; 
// Guarda la escena principal para ser utilizado por los helpers que agregan objetos a la escena
export function setHelpersScene(scene) {
  sceneRef = scene;
}
// Dibuja con Canvas 2D el lomo de un libro y lo convierte en textura 3D 
export function makeSpineTex(
  title,
  author,
  bgHex,
  textHex = "#f1f5f9",
  accentHex = "#38bdf8",
) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

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

  const tex = new THREE.CanvasTexture(canvas);
  tex.encoding = THREE.sRGBEncoding;
  return tex;
}
// Crea un libro 3D como una caja con material para portada, paginas y lomo
export function createBook(
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
  return new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), materials);
}

export function createPoster(imagePath, width, height, pos, rotY = 0) {
  const group = new THREE.Group();

  // Marco oscuro
  const frame = new THREE.Mesh(
    new THREE.BoxGeometry(width + 0.08, height + 0.08, 0.04),
    createMeshStandardMaterial(0x14141f, { roughness: 0.5 }),
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
  sceneRef.add(group);
  return group;
}

// Supervisa la carga de modelos 3D y texturas
export const manager = new THREE.LoadingManager();
manager.onLoad = () => {
  console.log("Todos los modelos 3D y pósters listos");
};

// Carga modelos 3D comprimidos con Draco y texturas
export const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath(
  "https://www.gstatic.com/draco/versioned/decoders/1.5.6/",
);
dracoLoader.preload();

// Carga modelos 3D en formato GLTF/GLB comprimidos con Draco
export const gltfLoader = new GLTFLoader(manager);
gltfLoader.setDRACOLoader(dracoLoader);
// Carga texturas de imágenes
export const texLoader = new THREE.TextureLoader(manager);

// Carga modelos glb, los escala y posiciona en la escena principal
export function loadProp(path, targetSize, pos, rotY = 0, rotX = 0, parent) {
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

    (parent || sceneRef).add(model);
  });
}

let sd = 7;
export const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
export const createMeshStandardMaterial = (c, o) =>
  new THREE.MeshStandardMaterial(
    Object.assign({ color: c, roughness: 0.7, metalness: 0.05 }, o),
  );
export const createEmissiveMaterial = (color, intensity) =>
  createMeshStandardMaterial(0x000000, {
    emissive: color,
    emissiveIntensity: intensity || 1.6,
  });
export function addToScene(o, m, x, y, z, p) {
  o.position.set(x || 0, y || 0, z || 0);
  o.castShadow = o.receiveShadow = true;
  (p || sceneRef).add(o);
  return o;
}
export const createBoxMesh = (w, h, d, m, x, y, z, p) =>
  addToScene(
    new THREE.Mesh(
      new THREE.BoxGeometry(w, h, d),
      typeof m === "number" ? createMeshStandardMaterial(m) : m,
    ),
    m,
    x,
    y,
    z,
    p,
  );
export const createCylinderMesh = (a, b, h, m, x, y, z, p, s) =>
  addToScene(
    new THREE.Mesh(
      new THREE.CylinderGeometry(a, b, h, s || 24),
      typeof m === "number" ? createMeshStandardMaterial(m) : m,
    ),
    m,
    x,
    y,
    z,
    p,
  );
export function createGroup(x, y, z, ry) {
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.rotation.y = ry || 0;
  sceneRef.add(g);
  return g;
}
export function createLight(type, c, i, d, x, y, z, sh) {
  const l = new THREE[type](c, i, d);
  l.position.set(x, y, z);
  if (sh) {
    l.castShadow = true;
    l.shadow.mapSize.set(sh, sh);
  }
  sceneRef.add(l);
  return l;
}
export function createCanvasTexture(w, h, fn) {
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  fn(c.getContext("2d"), w, h);
  const t = new THREE.CanvasTexture(c);
  t.encoding = THREE.sRGBEncoding;
  t.anisotropy = 4;
  return t;
}
export function createPlaneMesh(w, h, t, x, y, z, ry, ei, p) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    createMeshStandardMaterial(0xffffff, {
      map: t,
      emissive: 0xffffff,
      emissiveMap: t,
      emissiveIntensity: ei,
      roughness: 0.9,
    }),
  );
  m.position.set(x, y, z);
  m.rotation.y = ry || 0;
  (p || sceneRef).add(m);
  return m;
}
