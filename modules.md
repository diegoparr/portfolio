# Mapeo de módulos de `src/main.js`

Este documento describe cómo está organizado actualmente `src/main.js` y qué partes podrían extraerse a módulos independientes.

## 1. Renderer y cámara — líneas 7–73

Se inicializa todo lo relacionado con Three.js:

- Canvas WebGL.
- `CSS3DRenderer`.
- Escena y cámara.
- `OrbitControls`.
- Redimensionamiento de ventana.
- Posición inicial de la cámara: `HOME`.

Funciones y estados principales:

- `rs`: ajusta tamaños y aspect ratio.
- `controls`: permite mover la cámara.

Posible destino:

```text
src/scene/setup.js
```

---

## 2. Helpers de Three.js — líneas 75–323

Funciones reutilizables para crear objetos:

- `makeSpineTex`: crea textura vertical para lomos de libros.
- `createBook`: crea un libro 3D.
- `createPoster`: crea un póster con marco.
- `loadProp`: carga modelos `.glb`.
- `M`, `E`: crean materiales normales y emisivos.
- `put`, `B`, `Cy`: crean y posicionan meshes.
- `G`: crea grupos.
- `L`: crea luces.
- `canv`, `plane`: crean texturas y planos.

Posibles destinos:

```text
src/scene/helpers.js
src/scene/loaders.js
src/scene/materials.js
```

Como primer paso, se pueden dejar juntos en `helpers.js`.

---

## 3. Iluminación — líneas 325–346

Aquí se crean:

- Luz ambiental.
- Luz hemisférica.
- Luz direccional tipo luna.
- Luces de colores.
- Luz de la lámpara.
- Luz del monitor.
- Luz de la torre PC.

Posible destino:

```text
src/scene/lights.js
```

---

## 4. Habitación — líneas 348–357

Construye:

- Piso.
- Pared del fondo.
- Pared lateral.
- Bordes luminosos.

Posible destino:

```text
src/scene/room.js
```

---

## 5. Escritorio y monitor — líneas 359–584

Esta es una de las secciones más grandes. Contiene:

- Escritorio.
- Teclado.
- Mousepad y mouse.
- Monitor.
- Código dibujado en canvas.
- Video de anime.
- `iframe` del sistema operativo.
- Pantalla CSS3D.
- Cambio entre video, pantalla interactiva y pantalla automática.

Funciones y estados importantes:

- `setScreenMode`.
- `osIframe`.
- `cssScreen`.
- `animeVid`.
- `isUsingPC`.

Posibles destinos:

```text
src/scene/desk.js
src/scene/computer-screen.js
```

---

## 6. Proyecto de Minecraft — líneas 539–584

Aquí se crea el cubo estilo Minecraft:

- Texturas pixeladas.
- Cubo flotante.
- Anillo luminoso.
- Animación posterior en el loop principal.

Posible destino:

```text
src/scene/projects.js
```

---

## 7. PC y silla — líneas 585–592

Carga:

- `gaming-pc.glb`.
- `gaming-chair.glb`.

Puede permanecer dentro de `desk.js` o extraerse a:

```text
src/scene/furniture.js
```

---

## 8. Avatar y animaciones — líneas 593–681

Gestiona:

- Modelo del avatar.
- Animaciones disponibles.
- Poses.
- Posiciones del avatar.
- Guitarra en las manos.
- Cambio de pantalla cuando está sentado.

Elementos importantes:

- `mixer`.
- `activeAction`.
- `avatarActions`.
- `POSE_SPOTS`.
- `setPose`.
- Carga de `avatar.glb`.

Posible destino:

```text
src/scene/avatar.js
```

---

## 9. Biblioteca — líneas 682–847

Contiene:

- Estructura de la estantería.
- Datos de libros ficticios: `LIBRARY`.
- Portadas reales.
- `addRealCoverBook`.
- Carga de portadas desde `assets`.

Posible destino:

```text
src/scene/bookshelf.js
```

---

## 10. Diploma y pósters — líneas 848–921

Crea:

- Pósters de las paredes.
- Diploma de la Universidad EAN.
- Textura del diploma.
- Marco del diploma.

Posible destino:

```text
src/scene/wall-decor.js
```

---

## 11. Guitarra y gimnasio — líneas 922–990

Contiene:

- Soporte de guitarra.
- Modelo de la guitarra.
- Mancuernas.
- Pesas.
- Elementos decorativos del gimnasio.

Función principal:

- `dumb`.

Posibles destinos:

```text
src/scene/guitar.js
src/scene/gym.js
```

---

## 12. Interactividad — líneas 991–1144

Gestiona todos los hotspots de la escena:

- Monitor.
- Biblioteca.
- Proyecto.
- Diploma.
- Hover.
- Click.
- Raycaster.
- Cámara enfocada en cada objeto.
- Panel HTML lateral.
- Reset de cámara.
- Eventos de teclado.
- Modo 2D.

Funciones principales:

- `hot`: registra objetos interactivos.
- `setHot`: activa o desactiva la iluminación del hotspot.
- `focus`: enfoca la cámara en un objeto.
- `reset`: vuelve a la vista inicial.
- `pick`: detecta qué objeto se seleccionó.

Posibles destinos:

```text
src/interaction/hotspots.js
src/interaction/camera-focus.js
src/interaction/events.js
```

---

## 13. Game/render loop — líneas 1146–final

El loop ejecuta constantemente:

- Animación del avatar.
- Movimiento de la guitarra.
- Transición de cámara.
- Rotación del cubo.
- Animación del anillo.
- Animación de hotspots.
- Actualización de controles.
- Límites de movimiento.
- Render WebGL.
- Render CSS3D.

Esta parte debería quedarse probablemente en:

```text
src/main.js
```

`main.js` funcionaría como punto central de composición y arrancaría la escena, los módulos y el loop principal.

---

## Estructura inicial recomendada

No es necesario dividir el archivo en quince módulos desde el principio. Una primera versión razonable sería:

```text
src/
├── main.js                 # composición y loop
├── scene/
│   ├── setup.js             # renderer, cámara y controles
│   ├── helpers.js           # M, E, B, Cy, G, L, canv, plane
│   ├── room.js              # habitación y luces
│   ├── desk.js              # escritorio, monitor e iframe
│   ├── avatar.js            # avatar, poses y animaciones
│   ├── bookshelf.js         # biblioteca y libros
│   └── decorations.js       # pósters, diploma, guitarra y gimnasio
└── interaction/
    └── hotspots.js          # raycaster, focus, reset y eventos
```

El primer módulo recomendable es `setup.js`, extrayendo únicamente las líneas 7–73 porque es una sección relativamente independiente y con pocas dependencias.
