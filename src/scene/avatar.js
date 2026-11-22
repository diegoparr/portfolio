import * as THREE from "three";

const POSE_SPOTS = {
  Typing: {
    pos: [0.35, 0.04, -2.29],
    rotY: Math.PI,
  },
  Sitting: {
    pos: [0.35, 0.04, -2.29],
    rotY: Math.PI,
  },
  Reading: {
    pos: [-3.5, 0.0, -2.8],
    rotY: Math.PI,
  },
  Guitar: {
    pos: [-2.5, 0.0, 1.8],
    rotY: Math.PI * 0.35,
  },
};

export function createAvatar({
  scene,
  gltfLoader,
  guitarStand,
  scr,
  setScreenMode,
  getIsUsingPC,
}) {
  let mixer = null;
  let activeAction = null;
  let avatar = null;
  let guitarModel = null;
  const avatarActions = {};

  function setPose(name) {
    if (!avatar) return;
    const next = avatarActions[name];
    const spot = POSE_SPOTS[name];
    if (!next || !spot) return;

    if (next !== activeAction) {
      if (activeAction) activeAction.fadeOut(0.35);
      next.reset().fadeIn(0.35).play();
      activeAction = next;
    }

    avatar.position.set(...spot.pos);
    avatar.rotation.y = spot.rotY;

    if (name === "Sitting") {
      setScreenMode("anime");
    } else if (name === "Typing") {
      setScreenMode("code");
    } else if (!getIsUsingPC()) {
      setScreenMode("auto");
    }
    scr.material.needsUpdate = true;

    if (!guitarModel) return;
    if (name === "Guitar") {
      scene.add(guitarModel);
      guitarModel.scale.setScalar(2.65);
    } else {
      guitarStand.add(guitarModel);
      guitarModel.scale.setScalar(2.4);
      guitarModel.position.set(0.04, 1.25, -0.2);
      guitarModel.rotation.set(0, Math.PI / 2, Math.PI / 2 + 0.18);
    }
  }

  gltfLoader.load("./assets/avatar.glb", (gltf) => {
    avatar = gltf.scene;
    avatar.scale.setScalar(4.5);

    avatar.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = false;
      object.receiveShadow = true;
      object.frustumCulled = false;
    });

    scene.add(avatar);
    mixer = new THREE.AnimationMixer(avatar);
    gltf.animations.forEach((clip) => {
      avatarActions[clip.name] = mixer.clipAction(clip);
    });
    setPose("Typing");
  });

  gltfLoader.load("./assets/guitarra_diego.glb", (gltf) => {
    guitarModel = gltf.scene;
    const box = new THREE.Box3().setFromObject(guitarModel);
    guitarModel.userData.centerOffset = box.getCenter(new THREE.Vector3());

    guitarModel.scale.setScalar(2.4);
    guitarModel.position.set(0.04, 1.25, -0.2);
    guitarModel.rotation.set(0, Math.PI / 2, Math.PI / 2 + 0.18);

    guitarModel.traverse((object) => {
      if (!object.isMesh) return;
      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = false;
    });

    guitarStand.add(guitarModel);
  });

  function update(dt) {
    if (mixer) mixer.update(dt);
    if (!guitarModel || guitarModel.parent !== scene || !avatar) return;

    guitarModel.rotation.order = "YXZ";
    guitarModel.rotation.set(0.25, avatar.rotation.y, Math.PI / 2 - 1.02);

    const targetPoint = new THREE.Vector3(0.22, 1.94, 0.56)
      .applyAxisAngle(new THREE.Vector3(0, 1, 0), avatar.rotation.y)
      .add(avatar.position);

    const centerOffset = (guitarModel.userData.centerOffset || new THREE.Vector3())
      .clone()
      .multiplyScalar(guitarModel.scale.x)
      .applyEuler(guitarModel.rotation);

    guitarModel.position.copy(targetPoint).sub(centerOffset);
  }

  return {
    getAvatar: () => avatar,
    getGuitarModel: () => guitarModel,
    setPose,
    update,
  };
}

