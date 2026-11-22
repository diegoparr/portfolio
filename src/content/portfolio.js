/* ============ CONTENT (edit here) ============ */
export const GH = "https://github.com/diegoparr"
 export const LI = "https://www.linkedin.com/in/diego-alejandro-parrado-agudelo-401948317/"
export const CV_FILE = "cv-diego-parrado.pdf";
export const chip = (a) =>
  a.map((x) => `<span class="chip">${x}</span>`).join("");
export const H = {
  links: `<div class="links"><a class="btn pri" href="${CV_FILE}" download>Download CV</a><a class="btn" href="${GH}" target="_blank" rel="noopener">GitHub</a><a class="btn" href="${LI}" target="_blank" rel="noopener">LinkedIn</a></div>`,
  exp: `<h3>Experience</h3><div class="card"><h4>Junior Technical Consultant &amp; Solutions Integrator</h4><p>Architected agentic workflows with n8n and webhooks, integrating Mistral and the OpenAI API, with RAG on Supabase.</p></div><div class="card"><h4>QA &amp; Functional Analyst</h4><p>Debugged REST APIs and ran functional testing.</p></div>`,
  stack: `<h3>Stack</h3><div class="chips">${chip(["TypeScript", "Node.js", "NestJS", "Docker", "AWS", "PostgreSQL / Supabase", "OpenRouter"])}</div>`,
  proj: `<div class="card"><h4>AI-Powered Minecraft NPC</h4><p>A Minecraft mod connected to a Node.js / TypeScript API wrapper. The wrapper reads a player’s listening profile from the Last.fm API, sends it to an LLM on OpenRouter to write a personalized review, and the mod delivers it in-game through an NPC.</p></div><div class="flow"><span>Minecraft mod</span><i>→</i><span>Node.js / TS wrapper</span><i>→</i><span>Last.fm API</span><i>→</i><span>LLM on OpenRouter</span><i>→</i><span>NPC dialogue</span></div>`,
  books: `<h3>Currently reading</h3><div class="card"><h4>AI Engineering</h4><p>Chip Huyen</p></div><div class="card"><h4>Clean Architecture</h4><p>Robert C. Martin</p></div><h3>Up next</h3><div class="card"><h4>System Design on AWS</h4></div><div class="card"><h4>Designing Data-Intensive Applications</h4></div><div class="card"><h4>Building Microservices</h4></div>`,
  edu: `<h3>Education</h3><div class="card"><h4>B.S. in Systems Engineering</h4><p>Universidad EAN · Expected 2027</p></div><h3>Credentials</h3><div class="card"><h4>AWS Academy Cloud Foundations</h4></div><div class="card"><h4>English B2</h4></div>`,
};
export const NAME = "Diego Alejandro Parrado Agudelo";
export const ROLE = "Systems Engineering Student (Bogotá, Colombia) | Backend &amp; AI Systems Engineer";
export const head = (t, s) =>
  `<h2>${t}</h2>${s ? `<p class="sub">${s}</p>` : ""}`;
export const PANELS = {
  work: head(NAME, ROLE) + H.exp + H.stack + H.links,
  books: head("Engineering Bookshelf", "Technical reading list") + H.books,
  project: head("AI-Powered Minecraft NPC", "Active project") + H.proj,
  edu: head("Education &amp; Credentials") + H.edu + `<button class="pill" id="dlang">View diploma in English</button>`,
};
document.getElementById("cvb").innerHTML =
  `<h1>${NAME}</h1><p class="sub">${ROLE}</p>${H.links}${H.exp}${H.stack}<h3>Active project</h3>${H.proj}${H.books}${H.edu}`;
