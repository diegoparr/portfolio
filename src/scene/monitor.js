import * as THREE from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { createBoxMesh } from "./helpers.js";

export function createMonitor({
  cssScene,
  deskTopHeight,
  createGroup,
  createMeshStandardMaterial,
  createCanvasTexture,
}) {
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

  const sTex = createCanvasTexture(1024, 384, (x, w, h) => {
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

  const mon = createGroup(0.5, deskTopHeight, -4.5);
  createBoxMesh(0.9, 0.04, 0.5, createMeshStandardMaterial(0x15151f), 0, 0.02, 0.12, mon);
  createBoxMesh(0.12, 0.72, 0.08, createMeshStandardMaterial(0x15151f), 0, 0.38, 0, mon);
  createBoxMesh(3, 1.2, 0.08, createMeshStandardMaterial(0x0b0b12), 0, 1.3, 0, mon);

  const scr = new THREE.Mesh(
    new THREE.PlaneGeometry(2.88, 1.08),
    createMeshStandardMaterial(0x000000, {
      emissive: 0xffffff,
      emissiveMap: sTex,
      emissiveIntensity: 0.9,
      roughness: 0.4,
    }),
  );
  scr.position.set(0, 1.3, 0.045);
  mon.add(scr);

  const animeVid = document.createElement("video");
  animeVid.src = "./assets/clip.mp4";
  animeVid.loop = true;
  animeVid.muted = true;
  animeVid.playsInline = true;

  const animeTex = new THREE.VideoTexture(animeVid);
  animeTex.encoding = THREE.sRGBEncoding;
  animeTex.minFilter = THREE.LinearFilter;
  animeTex.magFilter = THREE.LinearFilter;

  const osWrapper = document.createElement("div");
  osWrapper.style.width = "1440px";
  osWrapper.style.height = "540px";
  osWrapper.style.background = "#0b1020";

  const osIframe = document.createElement("iframe");
  osIframe.src = "./os/index.html";
  osIframe.style.width = "100%";
  osIframe.style.height = "100%";
  osIframe.style.border = "none";
  osIframe.style.pointerEvents = "none";
  osWrapper.appendChild(osIframe);

  let autoTypeOnLoad = false;

  osIframe.addEventListener("load", () => {
    if (!autoTypeOnLoad) return;
    osIframe.contentWindow?.postMessage(
      { type: "SET_CODE_VIEW", active: true },
      "*",
    );
  });

  const cssScreen = new CSS3DObject(osWrapper);
  cssScreen.position.set(0.5, deskTopHeight + 1.3, -4.5 + 0.045);
  cssScreen.scale.setScalar(0.002);
  cssScene.add(cssScreen);

  const holeMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    opacity: 0,
    transparent: true,
    blending: THREE.NoBlending,
    side: THREE.DoubleSide,
  });
  const videoMat = scr.material;

  function setScreenMode(mode) {
    if (mode === "anime") {
      cssScreen.visible = false;
      osIframe.style.pointerEvents = "none";
      scr.material = videoMat;
      scr.material.emissiveMap = animeTex;
      scr.material.needsUpdate = true;
      animeVid.play().catch(() => {});
    } else if (mode === "interactive") {
      animeVid.pause();
      scr.material = holeMat;
      cssScreen.visible = true;
      osIframe.style.pointerEvents = "auto";
      osIframe.contentWindow?.postMessage(
        { type: "SET_AUTO_TYPE", active: false },
        "*",
      );
    } else if (mode === "code"){
      animeVid.pause();
      scr.material = holeMat;
      cssScreen.visible = true;
      osIframe.style.pointerEvents = "none";
      autoTypeOnLoad = true;
      osIframe.contentWindow?.postMessage(
        { type: "SET_CODE_VIEW", active: true },
        "*",
      );
    } 
    else {
      animeVid.pause();
      scr.material = holeMat;
      cssScreen.visible = true;
      osIframe.style.pointerEvents = "none";
      osIframe.contentWindow?.postMessage(
        { type: "SET_AUTO_TYPE", active: true },
        "*",
      );
    }
  }

  return { mon, osIframe, cssScreen, scr, setScreenMode };
}