/* ============================================================
   arch@diego — Hyprland / Catppuccin Mocha
   WM de tiling real, terminal, nvim, yazi y zathura.
   Contrato con main.js: postMessage("EXIT_PC") +
   escuchar { type: "SET_AUTO_TYPE", active }.
   ============================================================ */

"use strict";
/* ----------------------------- configuración ----------------------------- */

export const CONFIG = {
  cvPath: "../cv/cv-diego-parrado.pdf",
  github: "https://github.com/diegoparr",
  linkedin: "https://www.linkedin.com/in/diego-alejandro-parrado-agudelo-401948317/",
  email: "diego.parrado3322@gmail.com", 
};

export const PROJECTS = [
  {
    id: "ai-minecraft-npc",
    stack: ["TypeScript", "NestJS", "OpenRouter"],
  },
  {
    id: "crimson-list",
    stack: ["Kotlin", "Jetpack Compose", "GraphQL"],
  },
  {
    id: "medical-records-rag",
    stack: ["n8n", "Supabase", "RAG"],
  },
  {
    id: "3d-portfolio-room",
    stack: ["Three.js", "Vite", "WebGL"],
  },
];

 export const PALETTE = [
  "#f38ba8",
  "#fab387",
  "#f9e2af",
  "#a6e3a1",
  "#94e2d5",
  "#89b4fa",
  "#cba6f7",
  "#f5c2e7",
];

 export const ARCH_LOGO = [
  "        /\\",
  "       /  \\",
  "      /\\   \\",
  "     /      \\",
  "    /   ,,   \\",
  "   /   |  |  -\\",
  "  /_-''    ''-_\\",
].join("\n");

 export const SAMPLE_CODE = `import { Injectable } from '@nestjs/common';
import { SupabaseRagService } from './rag.service';

@Injectable()
export class AgentService {
  constructor(private readonly rag: SupabaseRagService) {}

  async runFlow(input: string) {
    const ctx = await this.rag
      .similaritySearch(input, { topK: 5 });
    return await this.llm.chat({
      model: 'openrouter/claude-3.5-sonnet',
      context: ctx,
      prompt: input,
    });
  }
}`;

export const TS_KEYWORDS = new Set(
  (
    "import from export default class extends implements constructor constructor private public readonly " +
    "protected async await return const let var new this if else for of in interface type void " +
    "string number boolean true false null undefined try catch throw switch case break"
  ).split(" "),
);

/* ------------------------------- i18n ----------------------------------- */

export const I18N = {
  es: {
    exitLabel: "salir",
    wsTitles: { 1: "code", 2: "docs" },
    titles: {
      editor: "nvim — agent.service.ts",
      terminal: "zsh — ~/portfolio",
      projects: "yazi — ~/projects",
      cv: "zathura — cv.pdf",
    },
    iconLabels: { cv: "cv.pdf", linkedin: "linkedin", terminal: "terminal" },
    term: {
      hint:
        'Escribe <span class="cmd-hint">help</span> para ver los comandos disponibles.',
      helpTitle: "Comandos disponibles",
      help: [
        ["help", "muestra esta ayuda"],
        ["fastfetch", "ficha del sistema (neofetch)"],
        ["whoami", "perfil corto"],
        ["about", "perfil profesional"],
        ["stack", "tecnologías agrupadas"],
        ["projects", "lista de proyectos"],
        ["projects <n>", "detalle del proyecto n"],
        ["experience", "experiencia (git log)"],
        ["nvim", "abre el editor"],
        ["cv", "abre el visor de CV"],
        ["github", "abre GitHub"],
        ["linkedin", "abre LinkedIn"],
        ["contact", "correo y enlaces"],
        ["lang es · en", "cambia el idioma"],
        ["clear", "limpia la terminal"],
        ["exit", "vuelve al cuarto 3D"],
      ],
      ff: {
        user: "diego@arch",
        rows: [
          ["OS", "Arch Linux x86_64"],
          ["WM", "Hyprland (Wayland)"],
          ["Shell", "zsh 5.9"],
          ["Rol", "Ingeniero Backend & IA"],
          ["Estudios", "Ing. de Sistemas @ EAN"],
          ["Stack", "TypeScript · NestJS · Java · Python"],
          ["Cloud", "AWS · Docker · Supabase"],
          ["GitHub", "github.com/diegoparr"],
        ],
      },
      whoami: [
        "Diego Alejandro Parrado Agudelo",
        "Ingeniería de Sistemas @ Universidad EAN · Bogotá, CO",
        "Backend · Cloud · Sistemas de IA",
      ],
      about: [
        "Ingeniero de sistemas enfocado en backend, arquitectura cloud e",
        "ingeniería de IA. Construyo APIs y pipelines que conectan modelos",
        "con datos reales: RAG, agentes, automatización y servicios NestJS.",
        "Actualmente en el último año de Ingeniería de Sistemas (EAN).",
      ],
      stack: [
        ["lenguajes", "TypeScript · Java · Python · Kotlin"],
        ["backend", "Node.js · NestJS · Spring Boot · REST"],
        ["cloud", "AWS · Docker · Supabase · n8n"],
        ["datos", "PostgreSQL · RAG · embeddings"],
      ],
      experience: [
        [
          "9f2c1ab",
          "(HEAD -> main)",
          "Junior Technical Consultant · Solutions Integrator",
          "n8n · Mistral · OpenAI · Supabase RAG",
        ],
        [
          "4d7e0c3",
          "",
          "QA & Functional Analyst · Audiocom",
          "pruebas funcionales · debugging de APIs REST",
        ],
        [
          "b12a8f0",
          "",
          "BSc Systems Engineering · Universidad EAN",
          "Bogotá, CO",
        ],
      ],
      contact: {
        email: "correo",
        github: "github",
        linkedin: "linkedin",
        missingEmail: "— pendiente (configura CONFIG.email en os.js)",
        missingLinkedin: "— pendiente (configura CONFIG.linkedin en os.js)",
      },
    },

    projects: {
        "ai-minecraft-npc":
          "Mod de Minecraft conectado a un wrapper en Node.js/TypeScript, Last.fm API y OpenRouter para diálogos dinámicos in-game.",
        "crimson-list":
          "App nativa de catálogo de anime y manga construida con Kotlin, Jetpack Compose y la API GraphQL de AniList.",
        "medical-records-rag":
          "Pipeline agéntico con n8n, webhooks, extracción de PDF con Mistral, OpenAI API y embeddings RAG en Supabase.",
        "3d-portfolio-room":
          "Escena WebGL + CSS3DRenderer con avatar animado, oclusión en tiempo real y este entorno de escritorio Hyprland.",
      },
      projectMeta: { stack: "stack", repo: "repo", index: "índice" },
      yaziHint: "clic para previsualizar · los archivos no se ejecutan",
      msg: {
        openingProjects: "Abriendo ~/projects...",
        openingEditor: "Abriendo nvim...",
        openingCv: "Abriendo cv-diego-parrado.pdf...",
        openingGithub: "Abriendo github.com/diegoparr...",
        openingLinkedin: "Abriendo LinkedIn...",
        noLinkedin:
          'CONFIG.linkedin está vacío. Edita <code>public/os/os.js</code> y añade tu URL.',
        noEmail:
          'CONFIG.email está vacío. Edita <code>public/os/os.js</code> y añade tu correo.',
        langSet: "Idioma: Español",
        exiting: "Saliendo al cuarto 3D...",
        unknownLang: "uso: lang es | en",
      },
      cv: {
        missing: "archivo no encontrado",
        hint:
          "Coloca tu PDF en <code>public/cv/</code> o ajusta <code>CONFIG.cvPath</code> en <code>public/os/os.js</code>.",
        download: "descargar",
        page: "pág. 1 / 1",
        loading: "cargando documento...",
      },
  },

  en: {
    exitLabel: "exit",
    wsTitles: { 1: "code", 2: "docs" },
    titles: {
      editor: "nvim — agent.service.ts",
      terminal: "zsh — ~/portfolio",
      projects: "yazi — ~/projects",
      cv: "zathura — cv.pdf",
    },
    iconLabels: { cv: "cv.pdf", linkedin: "linkedin", terminal: "terminal" },
    term: {
      hint:
        'Type <span class="cmd-hint">help</span> to list the available commands.',
      helpTitle: "Available commands",
      help: [
        ["help", "show this help"],
        ["fastfetch", "system information (neofetch)"],
        ["whoami", "short profile"],
        ["about", "professional profile"],
        ["stack", "technologies"],
        ["projects", "list projects"],
        ["projects <n>", "project details"],
        ["experience", "experience (git log)"],
        ["nvim", "open the editor"],
        ["cv", "open the CV viewer"],
        ["github", "open GitHub"],
        ["linkedin", "open LinkedIn"],
        ["contact", "email and links"],
        ["lang es · en", "switch language"],
        ["clear", "clear the terminal"],
        ["exit", "return to the 3D room"],
      ],
      ff: {
        user: "diego@arch",
        rows: [
          ["OS", "Arch Linux x86_64"],
          ["WM", "Hyprland (Wayland)"],
          ["Shell", "zsh 5.9"],
          ["Role", "Backend & AI Systems Engineer"],
          ["Studies", "Systems Eng. @ Universidad EAN"],
          ["Stack", "TypeScript · NestJS · Java · Python"],
          ["Cloud", "AWS · Docker · Supabase"],
          ["GitHub", "github.com/diegoparr"],
        ],
      },
      whoami: [
        "Diego Alejandro Parrado Agudelo",
        "Systems Engineering @ Universidad EAN · Bogotá, CO",
        "Backend · Cloud · AI Systems",
      ],
      about: [
        "Systems engineer focused on backend, cloud architecture and",
        "AI engineering. I build APIs and pipelines that connect models",
        "to real data: RAG, agents, automation and NestJS services.",
        "Currently in the final year of Systems Engineering (EAN).",
      ],
      stack: [
        ["languages", "TypeScript · Java · Python · Kotlin"],
        ["backend", "Node.js · NestJS · Spring Boot · REST"],
        ["cloud", "AWS · Docker · Supabase · n8n"],
        ["data", "PostgreSQL · RAG · embeddings"],
      ],
      experience: [
        [
          "9f2c1ab",
          "(HEAD -> main)",
          "Junior Technical Consultant · Solutions Integrator",
          "n8n · Mistral · OpenAI · Supabase RAG",
        ],
        [
          "4d7e0c3",
          "",
          "QA & Functional Analyst · Audiocom",
          "functional testing · REST API debugging",
        ],
        [
          "b12a8f0",
          "",
          "BSc Systems Engineering · Universidad EAN",
          "Bogotá, CO",
        ],
      ],
      contact: {
        email: "email",
        github: "github",
        linkedin: "linkedin",
        missingEmail: "— not set (edit CONFIG.email in os.js)",
        missingLinkedin: "— not set (edit CONFIG.linkedin in os.js)",
      },
    },

    projects: {
        "ai-minecraft-npc":
          "Minecraft mod connected to a Node.js/TypeScript wrapper, the Last.fm API and OpenRouter for dynamic in-game dialogue.",
        "crimson-list":
          "Native anime and manga catalog app built with Kotlin, Jetpack Compose and the AniList GraphQL API.",
        "medical-records-rag":
          "Agentic pipeline with n8n, webhooks, Mistral PDF extraction, the OpenAI API and RAG embeddings in Supabase.",
        "3d-portfolio-room":
          "WebGL + CSS3DRenderer scene with an animated avatar, real-time occlusion and this Hyprland desktop environment.",
      },
      projectMeta: { stack: "stack", repo: "repo", index: "index" },
      yaziHint: "click to preview · files are not executed",
      msg: {
        openingProjects: "Opening ~/projects...",
        openingEditor: "Opening nvim...",
        openingCv: "Opening cv-diego-parrado.pdf...",
        openingGithub: "Opening github.com/diegoparr...",
        openingLinkedin: "Opening LinkedIn...",
        noLinkedin:
          'CONFIG.linkedin is empty. Edit <code>public/os/os.js</code> and add your URL.',
        noEmail:
          'CONFIG.email is empty. Edit <code>public/os/os.js</code> and add your email.',
        langSet: "Language: English",
        exiting: "Leaving for the 3D room...",
        unknownLang: "usage: lang es | en",
      },
      cv: {
        missing: "file not found",
        hint:
          "Drop your PDF at <code>public/cv/</code> or change <code>CONFIG.cvPath</code> in <code>public/os/os.js</code>.",
        download: "download",
        page: "page 1 / 1",
        loading: "loading document...",
      },
  },
};


/* ------------------------------- estado ---------------------------------- */

const state = { lang: "es" };

let termLog = [{ kind: "fastfetch" }, { kind: "hint" }];
let termScroll = null;
let termHistory = null;
let termInput = null;
let termGhost = null;
let cmdHistory = [];
let histIndex = -1;
let histDraft = "";

const editorState = { auto: true, chars: 0 };
let editorTimer = null;
let editorLastShown = -1;

let projectSel = 0;
let cvState = "unknown"; // unknown | checking | ready | missing

const LS_KEY = "diegoos.lang";
const MAX_TILES = 3;
const TILE = { x: 0, y: 0, w: 1326, h: 476 };
const TILE_GAP = 6;

/* ------------------------------- utils ----------------------------------- */

function T() {
  return I18N[state.lang];
}

function esc(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function $(sel, root = document) {
  return root.querySelector(sel);
}

function openExternal(url) {
  if (!url) return false;
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.parent.postMessage({ type: "OPEN_URL", url }, "*");
  } catch (_) {
    window.parent.postMessage({ type: "OPEN_URL", url }, "*");
  }
  return true;
}

/* --------------------------- ventanas / WM ------------------------------- */

const WM = {
  current: 1,
  ws: {
    1: { order: [], focus: null },
    2: { order: [], focus: null },
  },
  wins: new Map(),
};

const APPS = {
  editor: { ws: 1, build: buildEditor },
  terminal: { ws: 1, build: buildTerminal },
  cv: { ws: 2, build: buildCv },
  projects: { ws: 2, build: buildProjects },
};

function createWindow(id) {
  const def = APPS[id];
  const el = document.createElement("section");
  el.className = "window opening";
  el.dataset.app = id;

  const close = document.createElement("button");
  close.className = "win-close";
  close.type = "button";
  close.title = "cerrar";
  close.setAttribute("aria-label", "cerrar ventana");
  close.textContent = "×";

  const inner = document.createElement("div");
  inner.className = "win-inner";

  el.append(close, inner);
  el.style.visibility = "hidden";
  document.getElementById("tiling").appendChild(el);

  const rec = { id, el, inner, ws: def.ws, rect: null };
  WM.wins.set(id, rec);

  def.build(inner, rec);

  close.addEventListener("click", (e) => {
    e.stopPropagation();
    closeApp(id);
  });
  el.addEventListener("mousedown", (e) => {
    if (e.target.closest("a")) return;
    if (WM.current === rec.ws) focusApp(id);
  });

  el.addEventListener(
    "animationend",
    () => el.classList.remove("opening"),
    { once: true },
  );
  return rec;
}

function openApp(id) {
  let rec = WM.wins.get(id);
  const created = !rec;
  if (!rec) rec = createWindow(id);

  const st = WM.ws[rec.ws];
  if (created) {
    // el editor siempre es la ventana master de su workspace
    if (id === "editor") st.order.unshift(id);
    else st.order.push(id);
    if (st.order.length > MAX_TILES) {
      const victim = st.order[1];
      closeApp(victim, { instant: true });
    }
  }

  layoutWs(rec.ws);
  rec.el.style.visibility = "";
  if (created) {
    rec.el.classList.remove("opening");
    void rec.el.offsetWidth;
    rec.el.classList.add("opening");
  }

  if (WM.current !== rec.ws) setWorkspace(rec.ws);
  focusApp(id);
  updateWaybar();
}

function closeApp(id, opts = {}) {
  const rec = WM.wins.get(id);
  if (!rec) return;
  const st = WM.ws[rec.ws];

  st.order = st.order.filter((x) => x !== id);
  WM.wins.delete(id);

  if (opts.instant) rec.el.remove();
  else {
    rec.el.classList.remove("opening");
    rec.el.classList.add("ws-off");
    setTimeout(() => rec.el.remove(), 160);
  }

  if (id === "terminal") {
    termScroll = null;
    termHistory = null;
    termInput = null;
    termGhost = null;
  }

  if (st.focus === id) st.focus = st.order[0] || null;
  layoutWs(rec.ws);
  if (WM.current === rec.ws) focusApp(st.focus);
  updateWaybar();
}

function focusApp(id) {
  if (!id) {
    WM.wins.forEach((w) => w.el.classList.remove("focused"));
    return;
  }
  const rec = WM.wins.get(id);
  if (!rec) return;

  WM.ws[rec.ws].focus = id;
  WM.wins.forEach((w) => {
    const on = w === rec && w.ws === WM.current;
    w.el.classList.toggle("focused", on);
    w.el.style.zIndex = on ? 6 : w.ws === WM.current ? 1 : 0;
  });
  updateWaybar();
}

function setWorkspace(n) {
  if (n !== 1 && n !== 2) return;
  WM.current = n;

  WM.wins.forEach((w) => {
    const off = w.ws !== n;
    w.el.classList.toggle("ws-off", off);
    if (off) w.el.classList.remove("opening");
  });
  layoutWs(n);

  const st = WM.ws[n];
  if (!st.focus || !st.order.includes(st.focus)) st.focus = st.order[0] || null;
  focusApp(st.focus);
  updateWaybar();
}

function calcRects(count) {
  const { x, y, w, h } = TILE;
  if (count <= 0) return [];
  if (count === 1) return [{ x, y, w, h }];
  if (count === 2) {
    const mw = Math.round((w - TILE_GAP) / 2);
    return [
      { x, y, w: mw, h },
      { x: x + mw + TILE_GAP, y, w: w - mw - TILE_GAP, h },
    ];
  }
  const mw = Math.round((w - TILE_GAP) * 0.55);
  const sw = w - TILE_GAP - mw;
  const sh = Math.floor((h - TILE_GAP) / 2);
  return [
    { x, y, w: mw, h },
    { x: x + mw + TILE_GAP, y, w: sw, h: sh },
    { x: x + mw + TILE_GAP, y: y + sh + TILE_GAP, w: sw, h: h - sh - TILE_GAP },
  ];
}

function layoutWs(n) {
  const st = WM.ws[n];
  const recs = st.order.map((id) => WM.wins.get(id)).filter(Boolean);
  const rects = calcRects(recs.length);
  recs.forEach((rec, i) => {
    const r = rects[i];
    if (!r) return;
    rec.rect = r;
    rec.el.style.left = r.x + "px";
    rec.el.style.top = r.y + "px";
    rec.el.style.width = r.w + "px";
    rec.el.style.height = r.h + "px";
  });
}

function moveFocus(dir) {
  const st = WM.ws[WM.current];
  if (st.order.length < 2) return;
  const currentIndex = st.order.indexOf(st.focus);
  if (currentIndex < 0) {
    focusApp(st.order[0]);
    return;
  }
  const cur = WM.wins.get(st.order[currentIndex]);
  if (!cur || !cur.rect) return;
  const cx = cur.rect.x + cur.rect.w / 2;
  const cy = cur.rect.y + cur.rect.h / 2;

  let best = null;
  let bestDist = Infinity;
  st.order.forEach((id, i) => {
    if (i === currentIndex) return;
    const rec = WM.wins.get(id);
    if (!rec || !rec.rect) return;
    const dx = rec.rect.x + rec.rect.w / 2 - cx;
    const dy = rec.rect.y + rec.rect.h / 2 - cy;
    const ok =
      (dir === "left" && dx < 0) ||
      (dir === "right" && dx > 0) ||
      (dir === "up" && dy < 0) ||
      (dir === "down" && dy > 0);
    if (!ok) return;
    const d = Math.hypot(dx, dy);
    if (d < bestDist) {
      bestDist = d;
      best = id;
    }
  });
  if (best) focusApp(best);
}

/* ------------------------------- editor ---------------------------------- */

function highlightTs(code) {
  let out = "";
  let i = 0;
  const span = (cls, text) => `<span class="tok-${cls}">${esc(text)}</span>`;

  while (i < code.length) {
    const c = code[i];

    if (c === "/" && code[i + 1] === "/") {
      let j = code.indexOf("\n", i);
      if (j < 0) j = code.length;
      out += span("cmt", code.slice(i, j));
      i = j;
      continue;
    }

    if (c === "'" || c === '"' || c === "`") {
      const q = c;
      let j = i + 1;
      while (j < code.length && code[j] !== q) {
        if (code[j] === "\\") j++;
        j++;
      }
      j = Math.min(j + 1, code.length);
      out += span("str", code.slice(i, j));
      i = j;
      continue;
    }

    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1;
      while (j < code.length && /[A-Za-z0-9_$]/.test(code[j])) j++;
      const word = code.slice(i, j);
      let cls = "txt";
      if (TS_KEYWORDS.has(word)) cls = "kw";
      else if (/^[A-Z]/.test(word)) cls = "typ";
      else if (code[j] === "(") cls = "fn";
      out += span(cls, word);
      i = j;
      continue;
    }

    if (/[0-9]/.test(c)) {
      let j = i + 1;
      while (j < code.length && /[0-9._]/.test(code[j])) j++;
      out += span("num", code.slice(i, j));
      i = j;
      continue;
    }

    if (/[{}()[\];,.:=<>+\-*/@]/.test(c)) {
      out += span("pun", c);
      i++;
      continue;
    }

    out += esc(c);
    i++;
  }
  return out;
}

function buildEditor(inner) {
  inner.innerHTML = `
    <div class="app-editor">
      <div class="editor-code" id="ed-code"></div>
      <div class="statusline">
        <div class="mode insert" id="ed-mode">INSERT</div>
        <div class="seg"><span class="branch"> main</span></div>
        <div class="seg">agent.service.ts</div>
        <div class="seg grow" id="ed-pos">utf-8 · ts</div>
        <div class="seg"><span class="badge" id="ed-badge">auto</span></div>
      </div>
    </div>`;
  editorLastShown = -1;
  renderEditor();
}

function renderEditor() {
  const codeEl = document.getElementById("ed-code");
  if (!codeEl) return;

  const shown = editorState.auto
    ? Math.min(editorState.chars, SAMPLE_CODE.length)
    : SAMPLE_CODE.length;

  if (shown === editorLastShown) {
    updateEditorChrome();
    return;
  }
  editorLastShown = shown;

  const text = SAMPLE_CODE.slice(0, shown);
  const lines = text.split("\n");
  let html = "";

  for (let i = 0; i < lines.length; i++) {
    const isLast = i === lines.length - 1;
    const body = highlightTs(lines[i]) + (isLast ? '<span class="cursor"></span>' : "");
    html += `<div class="ln"><span class="ln-no">${i + 1}</span><span class="ln-code">${
      body || " "
    }</span></div>`;
  }
  codeEl.innerHTML = html;

  const pos = document.getElementById("ed-pos");
  if (pos) {
    const row = lines.length;
    const col = lines[lines.length - 1].length + 1;
    pos.textContent = `utf-8 · ts · ln ${row}, col ${col}`;
  }
  updateEditorChrome();
}

function updateEditorChrome() {
  const mode = document.getElementById("ed-mode");
  const badge = document.getElementById("ed-badge");
  if (mode) {
    mode.textContent = editorState.auto ? "INSERT" : "NORMAL";
    mode.classList.toggle("insert", editorState.auto);
  }
  if (badge) {
    badge.textContent = editorState.auto ? "auto" : "manual";
    badge.classList.toggle("manual", !editorState.auto);
  }
}

function startEditorAuto(restart) {
  editorState.auto = true;
  if (restart) {
    editorState.chars = 0;
    editorLastShown = -1;
  }
  if (editorTimer) clearInterval(editorTimer);
  editorTimer = setInterval(() => {
    if (document.hidden) return;
    if (!WM.wins.has("editor")) return;
    editorState.chars++;
    if (editorState.chars > SAMPLE_CODE.length + 36) editorState.chars = 0;
    renderEditor();
  }, 45);
  renderEditor();
}

function stopEditorAuto() {
  editorState.auto = false;
  if (editorTimer) {
    clearInterval(editorTimer);
    editorTimer = null;
  }
  editorState.chars = SAMPLE_CODE.length;
  renderEditor();
}

/* ------------------------------ terminal --------------------------------- */

function buildTerminal(inner) {
  inner.innerHTML = `
    <div class="app-term">
      <div id="term-scroll">
        <div id="term-history"></div>
        <div class="term-live">
          <div class="term-prompt">
            <span class="p-path">~/portfolio</span><span class="p-git">main</span>
          </div>
          <div class="term-line">
            <span class="prompt-arrow">❯</span>
            <span class="input-wrap">
              <span class="term-ghost" id="term-ghost"></span>
              <input id="term-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="terminal" />
            </span>
          </div>
        </div>
      </div>
    </div>`;

  termScroll = inner.querySelector("#term-scroll");
  termHistory = inner.querySelector("#term-history");
  termInput = inner.querySelector("#term-input");
  termGhost = inner.querySelector("#term-ghost");

  histIndex = -1;
  histDraft = "";

  renderTermAll();

  termScroll.addEventListener("mousedown", (e) => {
    if (e.target.closest("a")) return;
    termInput?.focus();
  });

  termInput.addEventListener("input", () => {
    histIndex = -1;
    updateGhost();
  });
  termInput.addEventListener("keydown", onTermKey);
  termInput.addEventListener("click", () => {
    histIndex = -1;
  });

  updateGhost();
}

function suggest(input) {
  const value = input.toLowerCase();
  if (!value) return "";

  if (/^projects\s+\S*$/.test(value)) {
    const part = value.split(/\s+/)[1] || "";
    const names = PROJECTS.map((p) => p.id).filter((id) => id.startsWith(part));
    if (names.length === 1) return names[0].slice(part.length);
    return "";
  }

  const matches = COMMAND_NAMES.filter((c) => c.startsWith(value));
  if (!matches.length) return "";
  return matches[0].slice(value.length);
}

function updateGhost() {
  if (!termInput || !termGhost) return;
  const s = suggest(termInput.value);
  termGhost.textContent = s;
  termGhost.style.left = measureText(termInput.value) + "px";
}

const measureCtx = document.createElement("canvas").getContext("2d");
function measureText(text) {
  if (!termInput || !measureCtx) return 0;
  const cs = getComputedStyle(termInput);
  measureCtx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
  return measureCtx.measureText(text).width;
}

function onTermKey(e) {
  if (e.key === "Enter") {
    const raw = termInput.value;
    termInput.value = "";
    updateGhost();
    execCommand(raw);
    return;
  }

  if (e.key === "Tab") {
    e.preventDefault();
    const value = termInput.value;
    if (!value) return;
    let pool = [];
    if (/^projects\s+\S*$/.test(value.toLowerCase())) {
      const part = value.split(/\s+/)[1] || "";
      pool = PROJECTS.map((p) => p.id).filter((id) => id.startsWith(part));
    } else {
      pool = COMMAND_NAMES.filter((c) => c.startsWith(value.toLowerCase()));
    }
    if (!pool.length) return;
    const common = pool.reduce((a, b) => {
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      return a.slice(0, i);
    });
    if (common.length > value.length) {
      termInput.value = common;
      updateGhost();
    }
    return;
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!cmdHistory.length) return;
    if (histIndex === -1) {
      histDraft = termInput.value;
      histIndex = cmdHistory.length - 1;
    } else if (histIndex > 0) {
      histIndex--;
    }
    termInput.value = cmdHistory[histIndex];
    updateGhost();
    return;
  }

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (histIndex === -1) return;
    if (histIndex < cmdHistory.length - 1) {
      histIndex++;
      termInput.value = cmdHistory[histIndex];
    } else {
      histIndex = -1;
      termInput.value = histDraft;
    }
    updateGhost();
  }
}

const COMMAND_NAMES = [
  "help",
  "fastfetch",
  "neofetch",
  "whoami",
  "about",
  "stack",
  "projects",
  "experience",
  "nvim",
  "editor",
  "cv",
  "github",
  "linkedin",
  "contact",
  "lang",
  "clear",
  "exit",
  "logout",
  "ls",
  "pwd",
];

function addHistory(raw) {
  if (cmdHistory[cmdHistory.length - 1] !== raw) cmdHistory.push(raw);
  if (cmdHistory.length > 80) cmdHistory.shift();
  histIndex = -1;
  histDraft = "";
}

function execCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const arg = parts.slice(1).join(" ").toLowerCase();

  if (cmd === "clear") {
    termLog = [];
    renderTermAll();
    return;
  }

  termLog.push({ kind: "input", raw: trimmed });
  addHistory(trimmed);

  let entry = null;

  switch (cmd) {
    case "help":
      entry = { kind: "help" };
      break;
    case "fastfetch":
    case "neofetch":
      entry = { kind: "fastfetch" };
      break;
    case "whoami":
      entry = { kind: "whoami" };
      break;
    case "about":
      entry = { kind: "about" };
      break;
    case "stack":
      entry = { kind: "stack" };
      break;
    case "experience":
      entry = { kind: "experience" };
      break;
    case "nvim":
    case "editor":
      openApp("editor");
      entry = { kind: "msgKey", key: "openingEditor" };
      break;
    case "projects": {
      if (arg) {
        entry = projectEntry(arg);
      } else {
        openApp("projects");
        entry = { kind: "ls" };
      }
      break;
    }
    case "ls":
      entry = { kind: "ls" };
      break;
    case "pwd":
      entry = {
        kind: "msg",
        html: '<span class="dim">/home/diego/portfolio</span>',
      };
      break;
    case "cv":
      openApp("cv");
      entry = { kind: "msgKey", key: "openingCv" };
      break;
    case "github":
      openExternal(CONFIG.github);
      entry = { kind: "msgKey", key: "openingGithub" };
      break;
    case "linkedin":
      if (CONFIG.linkedin) {
        openExternal(CONFIG.linkedin);
        entry = { kind: "msgKey", key: "openingLinkedin" };
      } else {
        entry = { kind: "msgKey", key: "noLinkedin" };
      }
      break;
    case "contact":
      entry = { kind: "contact" };
      break;
    case "lang":
      if (arg === "es" || arg === "en") {
        setLang(arg);
        entry = { kind: "msgKey", key: "langSet" };
      } else {
        entry = { kind: "msgKey", key: "unknownLang" };
      }
      break;
    case "exit":
    case "logout":
      termLog.push({ kind: "msgKey", key: "exiting" });
      renderTermAll();
      setTimeout(exitPC, 420);
      return;
    default:
      entry = { kind: "error", raw: trimmed };
  }

  if (entry) termLog.push(entry);
  renderTermAll();
  focusTerminalIfVisible();
}

function focusTerminalIfVisible() {
  if (!termInput || !WM.wins.has("terminal")) return;
  if (!WM.ws[WM.current].order.includes("terminal")) return;
  termInput.focus();
}

function projectEntry(arg) {
  let index = Number.parseInt(arg, 10);
  if (Number.isNaN(index)) {
    index = PROJECTS.findIndex((p) => p.id === arg);
  } else {
    index -= 1;
  }
  if (index < 0 || index >= PROJECTS.length) {
    return { kind: "projectMissing", raw: arg };
  }
  return { kind: "project", index };
}

function renderTermAll() {
  if (!termHistory) return;
  termHistory.innerHTML = "";
  termLog.forEach((entry) => termHistory.appendChild(termEntryNode(entry)));
  if (termScroll) termScroll.scrollTop = termScroll.scrollHeight;
}

function termEntryNode(entry) {
  if (entry.kind === "input") {
    const div = document.createElement("div");
    div.className = "term-entry";
    div.innerHTML = `
      <div class="term-prompt"><span class="p-path">~/portfolio</span><span class="p-git">main</span></div>
      <div class="term-line"><span class="prompt-arrow">❯</span><span class="cmd-text">${esc(
        entry.raw,
      )}</span></div>`;
    return div;
  }

  const div = document.createElement("div");
  div.className = "term-entry term-out";
  div.innerHTML = renderOut(entry);
  return div;
}

function renderOut(entry) {
  const l = T();
  switch (entry.kind) {
    case "hint":
      return `<span class="dim">${l.term.hint}</span>`;
    case "help":
      return helpHtml();
    case "fastfetch":
      return fastfetchHtml();
    case "whoami":
      return l.term.whoami
        .map((line, i) =>
          i === 0
            ? `<div><b>${esc(line)}</b></div>`
            : `<div class="dim">${esc(line)}</div>`,
        )
        .join("");
    case "about":
      return l.term.about
        .map((line) => `<p class="dim">${esc(line)}</p>`)
        .join("");
    case "stack":
      return `<div class="kv">${l.term.stack
        .map(([k, v]) => `<span class="k">${esc(k)}</span><span class="v">${esc(v)}</span>`)
        .join("")}</div>`;
    case "experience":
      return l.term.experience
        .map(
          ([hash, dec, subject, meta]) => `
            <div class="git-item">
              <div><span class="git-hash">${hash}</span> ${
                dec ? `<span class="git-dec">${esc(dec)}</span> ` : ""
              }<span class="git-subj">${esc(subject)}</span></div>
              <div class="git-meta">${esc(meta)}</div>
            </div>`,
        )
        .join("");
    case "ls":
      return lsHtml();
    case "project":
      return projectHtml(entry.index);
    case "projectMissing":
      return `<span class="muted">projects:</span> <span class="err">no such project:</span> ${esc(
        entry.raw,
      )}`;
    case "contact":
      return contactHtml();
    case "msg":
      return entry.html || "";
    case "msgKey":
      return l.msg[entry.key] || "";
    case "error":
      return `<span class="err">zsh: command not found:</span> ${esc(entry.raw)}`;
    default:
      return "";
  }
}

function helpHtml() {
  const l = T();
  const rows = l.term.help
    .map(
      ([cmd, desc]) =>
        `<span class="c">${esc(cmd)}</span><span class="d">${esc(desc)}</span>`,
    )
    .join("");
  return `<div class="muted help-title">${esc(l.term.helpTitle)}</div><div class="help-table">${rows}</div>`;
}

function fastfetchHtml() {
  const ff = T().term.ff;
  const rows = ff.rows
    .map(
      ([k, v]) =>
        `<div class="ff-row"><span class="ff-k">${esc(k)}</span><span class="ff-v">${esc(
          v,
        )}</span></div>`,
    )
    .join("");
  const swatches = PALETTE.map(
    (color) => `<i style="background:${color}"></i>`,
  ).join("");

  return `
    <div class="ff">
      <pre class="ff-logo">${esc(ARCH_LOGO)}</pre>
      <div class="ff-info">
        <div class="ff-user">${esc(ff.user)}</div>
        <div class="ff-rule">──────────</div>
        ${rows}
        <div class="ff-palette">${swatches}</div>
      </div>
    </div>`;
}

function lsHtml() {
  const items = PROJECTS.map(
    (p) => `<span class="project-line">${esc(p.id)}/</span>`,
  ).join("");
  return `<div class="ls-grid">${items}<span class="muted">README.md</span></div>`;
}

function projectHtml(index) {
  const project = PROJECTS[index];
  const l = T();
  return `
    <div class="readme-name"># ${esc(project.id)}</div>
    <p class="readme-desc">${esc(l.projects[project.id])}</p>
    <div class="kv">
      <span class="k">${esc(l.projectMeta.stack)}</span><span class="v">${esc(
        project.stack.join(" · "),
      )}</span>
      <span class="k">${esc(l.projectMeta.repo)}</span><span class="v">github.com/diegoparr</span>
    </div>`;
}

function contactHtml() {
  const l = T();
  const c = l.term.contact;
  const github = CONFIG.github.replace(/^https?:\/\//, "");
  const email = CONFIG.email
    ? `<a class="ext" data-url="mailto:${esc(CONFIG.email)}">${esc(CONFIG.email)}</a>`
    : `<span class="muted">${esc(c.missingEmail)}</span>`;
  const linkedin = CONFIG.linkedin
    ? `<a class="ext" data-url="${esc(
        CONFIG.linkedin,
      )}">${esc(CONFIG.linkedin.replace(/^https?:\/\//, ""))}</a>`
    : `<span class="muted">${esc(c.missingLinkedin)}</span>`;

  return `<div class="kv">
    <span class="k">${esc(c.email)}</span><span class="v">${email}</span>
    <span class="k">${esc(c.github)}</span><span class="v"><a class="ext" data-url="${esc(
      CONFIG.github,
    )}">${esc(github)}</a></span>
    <span class="k">${esc(c.linkedin)}</span><span class="v">${linkedin}</span>
  </div>`;
}

/* ------------------------------ proyectos -------------------------------- */

function buildProjects(inner) {
  inner.innerHTML = `
    <div class="app-yazi">
      <aside class="y-col y-tree">
        <div class="y-head">~/portfolio</div>
        <div class="y-row"><span class="y-dir">projects/</span></div>
        <div class="y-row y-dim">about/</div>
        <div class="y-row y-dim">stack/</div>
        <div class="y-row y-dim">contact/</div>
        <div class="y-row y-dim">README.md</div>
      </aside>
      <div class="y-col y-list">
        <div class="y-head">projects/</div>
        <div id="proj-list"></div>
      </div>
      <article class="y-preview" id="proj-preview"></article>
    </div>`;

  inner.querySelector("#proj-list").addEventListener("click", (e) => {
    const btn = e.target.closest(".y-item");
    if (!btn) return;
    projectSel = Number(btn.dataset.idx);
    refreshProjectsWindow();
  });

  refreshProjectsWindow();
}

function refreshProjectsWindow() {
  const list = document.getElementById("proj-list");
  if (!list) return;

  list.innerHTML = PROJECTS.map(
    (p, i) => `
      <button class="y-item ${i === projectSel ? "active" : ""}" data-idx="${i}">
        <span class="idx">${i + 1}</span><span class="y-dir">${esc(p.id)}/</span>
      </button>`,
  ).join("");

  renderProjectPreview();
}

function renderProjectPreview() {
  const preview = document.getElementById("proj-preview");
  if (!preview) return;
  const project = PROJECTS[projectSel];
  const l = T();

  preview.innerHTML = `
    <div class="y-name"># ${esc(project.id)}</div>
    <p class="y-desc">${esc(l.projects[project.id])}</p>
    <div class="y-meta">
      <span class="k">${esc(l.projectMeta.stack)}</span><span class="v">${esc(
        project.stack.join(" · "),
      )}</span>
      <span class="k">${esc(l.projectMeta.repo)}</span><span class="v">github.com/diegoparr</span>
      <span class="k">${esc(l.projectMeta.index)}</span><span class="v">${String(
        projectSel + 1,
      ).padStart(2, "0")} / ${String(PROJECTS.length).padStart(2, "0")}</span>
    </div>
    <div class="y-hint">${esc(l.yaziHint)}</div>`;
}

/* --------------------------------- CV ------------------------------------ */

function buildCv(inner) {
  inner.innerHTML = `
    <div class="app-cv">
      <div class="z-page" id="cv-page"></div>
      <div class="z-bar">
        <span class="z-file">cv-diego-parrado.pdf</span>
        <span id="cv-pageinfo">—</span>
        <span class="z-spacer"></span>
        <a class="z-act" id="cv-dl" href="${esc(CONFIG.cvPath)}" download>
          ↓ <span id="cv-dl-label"></span>
        </a>
        <button class="z-act" id="cv-gh" type="button">GitHub</button>
      </div>
    </div>`;

  inner.querySelector("#cv-gh").addEventListener("click", () => {
    openExternal(CONFIG.github);
  });

  if (cvState === "unknown") {
    cvState = "checking";
    renderCvPage();
    checkCv().then((exists) => {
      cvState = exists ? "ready" : "missing";
      renderCvPage();
      refreshCvWindow();
    });
  } else {
    renderCvPage();
  }
  refreshCvWindow();
}

async function checkCv() {
  try {
    const res = await fetch(CONFIG.cvPath, { method: "HEAD", cache: "no-store" });
    const type = (res.headers.get("content-type") || "").toLowerCase();
    return res.ok && type.includes("pdf");
  } catch (_) {
    return false;
  }
}

function renderCvPage() {
  const page = document.getElementById("cv-page");
  if (!page) return;
  const l = T();

  if (cvState === "checking") {
    page.innerHTML = `<div class="z-loading">${esc(l.cv.loading)}</div>`;
    return;
  }

  if (cvState === "ready") {
    if (!page.querySelector(".z-frame")) {
      page.innerHTML = "";
      const frame = document.createElement("iframe");
      frame.className = "z-frame";
      frame.src = `${CONFIG.cvPath}#view=FitH&toolbar=0&navpanes=0`;
      frame.title = "CV";
      page.appendChild(frame);
    }
    return;
  }

  page.innerHTML = `
    <div class="z-missing">
      <div class="z-err">zathura: ${esc(l.cv.missing)}: <span>${esc(
        CONFIG.cvPath,
      )}</span></div>
      <p class="z-hint">${l.cv.hint}</p>
      <div class="z-cursor">_</div>
    </div>`;
}

function refreshCvWindow() {
  const dlLabel = document.getElementById("cv-dl-label");
  if (!dlLabel) return;
  const l = T();
  dlLabel.textContent = l.cv.download;

  const info = document.getElementById("cv-pageinfo");
  if (info) info.textContent = cvState === "ready" ? l.cv.page : "—";

  const dl = document.getElementById("cv-dl");
  if (dl) dl.classList.toggle("disabled", cvState !== "ready");

  if (cvState === "missing") renderCvPage();
}

/* ------------------------------- waybar ---------------------------------- */

function bindWaybar() {
  document.getElementById("workspaces").addEventListener("click", (e) => {
    const btn = e.target.closest(".ws");
    if (btn) setWorkspace(Number(btn.dataset.ws));
  });

  document.getElementById("lang").addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-lang]");
    if (btn) setLang(btn.dataset.lang);
  });

  document.getElementById("wb-github").addEventListener("click", () => {
    openExternal(CONFIG.github);
  });

  document.getElementById("wb-exit").addEventListener("click", exitPC);
}

function updateWaybar() {
  document.querySelectorAll("#workspaces .ws").forEach((btn) => {
    const n = Number(btn.dataset.ws);
    btn.classList.toggle("active", n === WM.current);
    btn.classList.toggle("occupied", WM.ws[n].order.length > 0);
  });

  const title = document.getElementById("wb-title");
  if (title) {
    const focused = WM.ws[WM.current].focus;
    title.textContent = focused ? T().titles[focused] : "";
  }
}

function updateClock() {
  const clock = document.getElementById("clock");
  if (!clock) return;
  const locale = state.lang === "es" ? "es-CO" : "en-US";
  const now = new Date();

  const parts = new Intl.DateTimeFormat(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).formatToParts(now);
  const get = (type) => parts.find((p) => p.type === type)?.value || "";

  const time = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  clock.textContent = `${get("weekday")} ${get("day")} ${get(
    "month",
  )} · ${time}`;
}

function startClock() {
  updateClock();
  setInterval(updateClock, 1000);
}

/* --------------------------------- i18n ---------------------------------- */

function initialLang() {
  let saved = null;
  try {
    saved = localStorage.getItem(LS_KEY);
  } catch (_) {
    saved = null;
  }
  if (saved === "es" || saved === "en") return saved;
  return (navigator.language || "en").toLowerCase().startsWith("es")
    ? "es"
    : "en";
}

function setLang(lang) {
  if (lang !== "es" && lang !== "en") return;
  state.lang = lang;
  try {
    localStorage.setItem(LS_KEY, lang);
  } catch (_) {
    /* almacenamiento no disponible */
  }
  document.documentElement.lang = lang;
  refreshI18n();
}

function refreshI18n() {
  const l = T();

  const exitLabel = document.getElementById("exit-label");
  if (exitLabel) exitLabel.textContent = l.exitLabel;

  const labelCv = document.getElementById("label-cv");
  if (labelCv) labelCv.textContent = l.iconLabels.cv;

  const labelLinkedin = document.getElementById("label-linkedin");
  if (labelLinkedin) labelLinkedin.textContent = l.iconLabels.linkedin;

  const labelTerminal = document.getElementById("label-terminal");
  if (labelTerminal) labelTerminal.textContent = l.iconLabels.terminal;

  document.querySelectorAll("#lang button[data-lang]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.lang === state.lang);
  });

  updateWaybar();
  updateClock();
  updateEditorChrome();
  if (termHistory) renderTermAll();
  refreshProjectsWindow();
  refreshCvWindow();
}

/* ------------------------------- enlaces --------------------------------- */

function bindIcons() {
  document.querySelectorAll(".d-icon").forEach((btn) => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.action;

      if (action === "cv") {
        openApp("cv");
        return;
      }

      if (action === "terminal") {
        openApp("terminal");
        setTimeout(() => termInput?.focus(), 80);
        return;
      }

      if (action === "linkedin") {
        if (CONFIG.linkedin) {
          openExternal(CONFIG.linkedin);
        } else {
          openApp("terminal");
          termLog.push({ kind: "msgKey", key: "noLinkedin" });
          renderTermAll();
          setTimeout(() => termInput?.focus(), 80);
        }
      }
    });
  });

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a.ext");
    if (!link) return;
    e.preventDefault();
    openExternal(link.dataset.url || "");
  });
}

/* ------------------------------ contrato --------------------------------- */

function exitPC() {
  window.parent.postMessage("EXIT_PC", "*");
}

function onMessage(e) {
  const data = e.data;
  if (!data || typeof data !== "object") return;
  if (data.type === "SET_CODE_VIEW") {
    closeApp("terminal", { instant: true });
    openApp("editor");
    setWorkspace(1);
    startEditorAuto(true);
    return;
  }
  if (data.type === "SET_AUTO_TYPE") {
    if (data.active) startEditorAuto(true);
    else stopEditorAuto();
  }
}

function onKey(e) {
  if (e.key === "Escape") {
    exitPC();
    return;
  }

  if (!e.altKey || e.ctrlKey || e.metaKey) return;

  if (e.key === "1" || e.key === "2") {
    e.preventDefault();
    setWorkspace(Number(e.key));
    return;
  }

  if (e.key === "q" || e.key === "Q") {
    const focused = WM.ws[WM.current].focus;
    if (focused) {
      e.preventDefault();
      closeApp(focused);
    }
    return;
  }

  const dirs = {
    ArrowLeft: "left",
    h: "left",
    ArrowRight: "right",
    l: "right",
    ArrowUp: "up",
    k: "up",
    ArrowDown: "down",
    j: "down",
  };
  const dir = dirs[e.key];
  if (dir) {
    e.preventDefault();
    moveFocus(dir);
  }
}

/* --------------------------------- init ---------------------------------- */

function init() {
  state.lang = initialLang();
  document.documentElement.lang = state.lang;

  bindWaybar();
  bindIcons();
  window.addEventListener("message", onMessage);
  window.addEventListener("keydown", onKey);

  openApp("editor");
  openApp("cv");
  openApp("projects");
  setWorkspace(1);

  startClock();
  startEditorAuto(true);
  refreshI18n();
}

init();
