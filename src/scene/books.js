
import * as THREE from "three";
import { createBoxMesh, createGroup, createMeshStandardMaterial, createBook, texLoader } from "./helpers.js";

const LIBRARY = [
  // Repisa 1 (y = 3.15)
  {
    y: 3.15,
    x: -0.18,
    title: "PRAGMATIC PROG",
    author: "Hunt",
    bg: "#7f1d1d",
    acc: "#fbbf24",
    h: 0.78,
    w: 0.16,
  },
  {
    y: 3.15,
    x: 0.0,
    title: "CLEAN CODE",
    author: "R. Martin",
    bg: "#064e3b",
    acc: "#34d399",
    h: 0.76,
    w: 0.16,
  },

  // Repisa 2 (y = 2.15)
  {
    y: 2.15,
    x: -0.18,
    title: "LINUX KERNEL",
    author: "R. Love",
    bg: "#27272a",
    acc: "#facc15",
    h: 0.78,
    w: 0.17,
  },
  {
    y: 2.15,
    x: 0.0,
    title: "WEB APP HACKER",
    author: "Stuttard",
    bg: "#18181b",
    acc: "#ef4444",
    h: 0.8,
    w: 0.17,
  },

  // Repisa 3 (y = 1.15)
  {
    y: 1.15,
    x: -0.18,
    title: "DEMIAN",
    author: "H. Hesse",
    bg: "#312e81",
    acc: "#c084fc",
    h: 0.72,
    w: 0.15,
  },
  {
    y: 1.15,
    x: -0.01,
    title: "CATCHER IN RYE",
    author: "Salinger",
    bg: "#7c2d12",
    acc: "#fdba74",
    h: 0.71,
    w: 0.15,
  },

  // Repisa 4 (y = 0.10)
  {
    y: 0.1,
    x: -0.18,
    title: "CLRS ALGORITHMS",
    author: "Cormen",
    bg: "#0f172a",
    acc: "#38bdf8",
    h: 0.82,
    w: 0.18,
  },
  {
    y: 0.1,
    x: 0.01,
    title: "COMPUTER NETS",
    author: "Tanenbaum",
    bg: "#4c0519",
    acc: "#fb7185",
    h: 0.79,
    w: 0.17,
  },
];

const REAL_COVER_BOOKS = [
  { shelfY: 3.15, x: -0.54, image: "./assets/book-csapp.jpg", spine: "#0f172a", rotY: 0.14 },
  { shelfY: 3.15, x: 0.52, image: "./assets/book-aws.jpg", spine: "#1e293b", rotY: -0.14 },
  { shelfY: 2.15, x: -0.54, image: "./assets/book-ai-eng.jpg", spine: "#172554", rotY: 0.14 },
  { shelfY: 2.15, x: 0.52, image: "./assets/book-ddia.jpg", spine: "#7f1d1d", rotY: -0.14 },
  { shelfY: 1.15, x: -0.54, image: "./assets/book-clean-arch.jpg", spine: "#18181b", rotY: 0.14 },
  { shelfY: 1.15, x: 0.52, image: "./assets/book-microservices.jpg", spine: "#064e3b", rotY: -0.14 },
  { shelfY: 0.1, x: -0.54, image: "./assets/book-hfdp.jpg", spine: "#3b0764", rotY: 0.14 },
  { shelfY: 0.1, x: 0.52, image: "./assets/book-ddd.jpg", spine: "#431407", rotY: -0.14 },
];

function addRealCoverBook(
  shelf,
  shelfY,
  xPos,
  imagePath,
  spineHex = "#1e293b",
  rotY = -0.12,
) {
  const coverTex = texLoader.load(imagePath);
  coverTex.encoding = THREE.sRGBEncoding;

  const coverMat = createMeshStandardMaterial(0xffffff, {
    map: coverTex,
    emissive: 0xffffff,
    emissiveMap: coverTex,
    emissiveIntensity: 0.42,
    roughness: 0.55,
  });
  const spineMat = createMeshStandardMaterial(spineHex, { roughness: 0.7 });
  const pagesMat = createMeshStandardMaterial(0xe2e8f0, { roughness: 0.9 });

  const bookMesh = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.76, 0.09), [
    pagesMat,
    spineMat,
    pagesMat,
    spineMat,
    coverMat,
    spineMat,
  ]);

  bookMesh.position.set(xPos, shelfY + 0.37, 0.16);
  bookMesh.rotation.x = -0.16;
  bookMesh.rotation.y = rotY;
  bookMesh.castShadow = true;
  bookMesh.receiveShadow = true;
  shelf.add(bookMesh);
}

export function createBookshelf() {
  const shelf = createGroup(-3.6, 0, -4.5);
  const wood = createMeshStandardMaterial(0x3a2650, { roughness: 0.8 });

  createBoxMesh(0.1, 4.3, 0.9, wood, -0.95, 2.15, 0, shelf);
  createBoxMesh(0.1, 4.3, 0.9, wood, 0.95, 2.15, 0, shelf);
  createBoxMesh(2, 4.3, 0.04, 0x241838, 0, 2.15, -0.43, shelf);
  [0.05, 1.1, 2.1, 3.1, 4.25].forEach((y) =>
    createBoxMesh(2, 0.1, 0.9, wood, 0, y, 0, shelf),
  );

  LIBRARY.forEach((bookData) => {
    const book = createBook(
      bookData.title,
      bookData.author,
      bookData.bg,
      bookData.acc,
      bookData.w,
      bookData.h,
      0.58,
    );
    book.position.set(
      bookData.x + bookData.w / 2,
      bookData.y + bookData.h / 2,
      0.08,
    );
    shelf.add(book);
  });

  REAL_COVER_BOOKS.forEach((book) =>
    addRealCoverBook(
      shelf,
      book.shelfY,
      book.x,
      book.image,
      book.spine,
      book.rotY,
    ),
  );

  return shelf;
}