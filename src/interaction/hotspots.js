import * as THREE from "three";

export function createHotspots({
  canvas,
  camera,
  tip,
  createEmissiveMaterial,
  onSelect,
  mon,
  bs,
  pj,
}) {
  const hotspots = [];
  const hotMeshes = [];
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let hovered = null;
  let pointerStart = null;

  function setHot(group, isActive) {
    group.userData.materials.forEach((material) => {
      if (!isActive) {
        material.emissive.setHex(material.userData.originalEmissive);
        material.emissiveIntensity =
          material.userData.originalEmissiveIntensity;
      } else if (material.userData.originalEmissive === 0) {
        material.emissive.setHex(0x3a2f8f);
        material.emissiveIntensity = 0.9;
      } else {
        material.emissiveIntensity =
          material.userData.originalEmissiveIntensity + 0.8;
      }
    });
  }

  function register(group, id, name, markerX, markerY, markerZ) {
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.07, 12, 12),
      createEmissiveMaterial(0xffb067, 3),
    );
    marker.position.set(markerX, markerY, markerZ);
    group.add(marker);

    group.userData = {
      id,
      name,
      marker,
      materials: [],
    };

    group.traverse((object) => {
      if (!object.isMesh) return;

      object.material = Array.isArray(object.material)
        ? object.material.map((material) => material.clone())
        : object.material.clone();

      const materials = Array.isArray(object.material)
        ? object.material
        : [object.material];

      materials.forEach((material) => {
        material.userData.originalEmissive = material.emissive.getHex();
        material.userData.originalEmissiveIntensity =
          material.emissiveIntensity;
        group.userData.materials.push(material);
      });

      object.userData.root = group;
      hotMeshes.push(object);
    });

    hotspots.push(group);
  }

  function pick(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );

    raycaster.setFromCamera(mouse, camera);

    const hit = raycaster.intersectObjects(hotMeshes, false)[0];
    return hit ? hit.object.userData.root : null;
  }

  register(mon, "work", "Monitor: Work & CV", 0, 2.25, 0);
  register(bs, "books", "Engineering Bookshelf", 0, 4.75, 0);
  register(pj, "project", "Active Project: AI Minecraft NPC", 0, 1.15, 0);

  canvas.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || event.buttons) return;

    const nextHovered = pick(event);

    if (nextHovered !== hovered) {
      if (hovered) setHot(hovered, false);
      hovered = nextHovered;
      if (hovered) setHot(hovered, true);

      canvas.style.cursor = hovered ? "pointer" : "grab";
      tip.textContent = hovered ? hovered.userData.name : "";
      tip.style.opacity = hovered ? "1" : "0";
    }

    tip.style.transform =
      `translate(${event.clientX + 16}px,${event.clientY + 16}px)`;
  });

  canvas.addEventListener("pointerdown", (event) => {
    if (event.button === 0) {
      pointerStart = [event.clientX, event.clientY];
    }
  });

  canvas.addEventListener("pointerup", (event) => {
    if (event.button !== 0 || !pointerStart) return;

    const distance = Math.hypot(
      event.clientX - pointerStart[0],
      event.clientY - pointerStart[1],
    );
    pointerStart = null;

    if (distance >= 6) return;

    const selected = pick(event);
    if (selected) onSelect(selected.userData.id);
  });

  function update(time) {
    hotspots.forEach((hotspot, index) => {
      hotspot.userData.marker.scale.setScalar(
        1 + Math.sin(time * 3 + index) * 0.25,
      );
    });
  }

  return {
    hotspots,
    hotMeshes,
    register,
    setHot,
    update,
  };
}