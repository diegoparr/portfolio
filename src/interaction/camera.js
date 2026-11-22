import * as THREE from "three";

export function createCameraController({
  camera,
  controls,
  canvas,
  deskTopHeight,
  innerWidth,
  HOME,
  cssRenderer,
  osIframe,
  panel,
  avatar,
  setScreenMode,
  getIsUsingPC,
  setIsUsingPC,
}) {
  const views = {
    work: {
      p: [0.5, deskTopHeight + 1.38, -2.05],
      t: [0.5, deskTopHeight + 1.3, -4.45],
    },
    books: {
      p: [-3.4, 2.9, 2.6],
      t: [-3.6, 2.3, -4.5],
    },
    project: {
      p: [-0.8, 3.2, -1.7],
      t: [-1.4, 2.3, -4.2],
    },
    edu: {
      p: [3.8, 3.8, -1],
      t: [3.8, 3.4, -4.95],
    },
  };
  let target = null;

  controls.addEventListener("start", () => {
    target = null;
  });

  function focus(id, panels, query, syncDiplomaButton) {
    if (id === "work") {
      setIsUsingPC(true);
      controls.enabled = false;
      cssRenderer.domElement.style.zIndex = "5";
      osIframe.style.pointerEvents = "auto";

      const avatarObject = avatar.getAvatar();
      if (avatarObject) avatarObject.visible = false;

      target = {
        p: new THREE.Vector3(...views.work.p),
        t: new THREE.Vector3(...views.work.t),
      };
      panel.classList.remove("open");
      avatar.setPose("Typing");
      setScreenMode("interactive");
      return;
    }

    const view = views[id];
    if (!view) return;

    const position = new THREE.Vector3(...view.p);
    const lookAt = new THREE.Vector3(...view.t);

    if (innerWidth() > 800) {
      const direction = lookAt.clone().sub(position);
      const width =
        2 *
        direction.length() *
        Math.tan((camera.fov * Math.PI) / 360) *
        camera.aspect;
      const offset = direction
        .normalize()
        .cross(new THREE.Vector3(0, 1, 0))
        .normalize()
        .multiplyScalar((width * 210) / innerWidth());
      position.add(offset);
      lookAt.add(offset);
    }

    target = { p: position, t: lookAt };
    query("#pb").innerHTML = panels[id];
    syncDiplomaButton();
    query("#panel").scrollTop = 0;
    panel.classList.add("open");

    if (id === "books" || id === "study") avatar.setPose("Reading");
    if (id === "music" || id === "guitar") avatar.setPose("Guitar");
  }

  function reset() {
    cssRenderer.domElement.style.zIndex = "1";
    osIframe.style.pointerEvents = "none";

    const avatarObject = avatar.getAvatar();
    if (avatarObject) avatarObject.visible = true;

    setIsUsingPC(false);
    controls.enabled = true;
    target = {
      p: HOME.p.clone(),
      t: HOME.t.clone(),
    };
    panel.classList.remove("open");
    avatar.setPose("Typing");
  }

  function update(dt) {
    if (!target) return;
    const interpolation = 1 - Math.exp(-5 * dt);
    camera.position.lerp(target.p, interpolation);
    controls.target.lerp(target.t, interpolation);

    if (
      camera.position.distanceTo(target.p) < 0.02 &&
      controls.target.distanceTo(target.t) < 0.02
    ) {
      target = null;
    }
  }

  return {
    focus,
    reset,
    update,
  };
}