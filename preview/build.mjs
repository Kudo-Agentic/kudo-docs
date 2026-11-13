// Local preview of the GitBook space: renders SUMMARY.md + pages into a
// static site in preview/dist laid out like a published GitBook site.
// GitBook itself reads the Markdown in the repo root; this is only for preview.
//
//   cd preview && npm install && npm run preview   # http://localhost:4000
// Links are root-absolute clean URLs (/roadmap), so open the site through
// serve.mjs (or Vercel with cleanUrls), not as files.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Marked } from "marked";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const out = path.join(here, "dist");
const SITE = { title: "Kudo", url: "https://docs.kudo.archi" };

// ---------- SUMMARY.md -> nav tree ----------
function parseSummary() {
  const lines = fs.readFileSync(path.join(root, "SUMMARY.md"), "utf8").split("\n");
  const groups = [{ title: null, items: [] }];
  const stack = [{ indent: -1, children: groups[0].items }];
  for (const line of lines) {
    const g = line.match(/^##\s+(.+)/);
    if (g) {
      groups.push({ title: g[1].trim(), items: [] });
      stack.length = 1;
      stack[0] = { indent: -1, children: groups.at(-1).items };
      continue;
    }
    const m = line.match(/^(\s*)[*-]\s+\[(.+?)\]\((.+?)\)/);
    if (!m) continue;
    const indent = m[1].replace(/\t/g, "  ").length;
    const item = { title: m[2], src: m[3], children: [] };
    while (stack.at(-1).indent >= indent) stack.pop();
    stack.at(-1).children.push(item);
    stack.push({ indent, children: item.children });
  }
  return groups;
}

const outPath = (src) => src.replace(/(^|\/)README\.md$/i, "$1index.html").replace(/\.md$/, ".html");

function flatten(items, acc = []) {
  for (const it of items) {
    acc.push(it);
    flatten(it.children, acc);
  }
  return acc;
}

// ---------- helpers ----------
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const slug = (s) =>
  s.toLowerCase().replace(/<[^>]+>/g, "").replace(/&[a-z]+;/g, "").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/\s+/g, "-");

function frontMatter(md) {
  const m = md.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { meta: {}, body: md };
  const meta = {};
  for (const l of m[1].split("\n")) {
    const kv = l.match(/^(\w+):\s*(.*)$/);
    if (kv) meta[kv[1]] = kv[2].replace(/^["']|["']$/g, "");
  }
  return { meta, body: md.slice(m[0].length) };
}

// Root-absolute clean URL for an output path, as served on Vercel with
// cleanUrls: "how-it-works/index.html" -> "/how-it-works",
// "roadmap.html" -> "/roadmap". Absolute, so links work with or without a
// trailing slash on the current URL.
const href = (o) => "/" + o.replace(/(^|\/)index\.html$/, "").replace(/\.html$/, "");

const ICONS = {
  info: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></svg>',
  warning: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17h.01"/></svg>',
  danger: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></svg>',
  success: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>',
};

// ---------- page rendering ----------
function renderPage(srcRel, pagesByOut) {
  const raw = fs.readFileSync(path.join(root, srcRel), "utf8");
  const { meta, body } = frontMatter(raw);
  const pageOut = outPath(srcRel);
  const toc = [];
  const used = new Map();

  const marked = new Marked({ gfm: true });
  marked.use({
    renderer: {
      heading(text, level, rawText) {
        let id = slug(rawText);
        const n = used.get(id) || 0;
        used.set(id, n + 1);
        if (n) id += "-" + n;
        if (level === 2 || level === 3) toc.push({ id, text: text.replace(/<[^>]+>/g, ""), level });
        return `<h${level} id="${id}"><a class="anchor" href="#${id}" aria-hidden="true">#</a>${text}</h${level}>\n`;
      },
      table(header, rows) {
        // GitBook-style tables with an empty header row render as plain grids.
        const emptyHead = !header.replace(/<[^>]+>/g, "").trim();
        return `<div class="table-wrap"><table${emptyHead ? ' class="no-head"' : ""}>${emptyHead ? "" : `<thead>${header}</thead>`}<tbody>${rows}</tbody></table></div>\n`;
      },
    },
  });

  const fixLinks = (html) =>
    html.replace(/(href|src)="([^"]+)"/g, (all, attr, url) => {
      if (/^(https?:|mailto:|#|data:)/.test(url)) {
        if (attr === "href" && /^https?:/.test(url)) return `${attr}="${url}" target="_blank" rel="noopener"`;
        return all;
      }
      const [p, hash] = url.split("#");
      if (attr === "href" && /\.md$/i.test(p)) {
        const target = p.startsWith("/")
          ? p.slice(1)
          : path.posix.normalize(path.posix.join(path.posix.dirname(srcRel), p));
        const t = outPath(target);
        if (!pagesByOut.has(t)) console.warn(`  ! ${srcRel}: link to missing page ${url}`);
        return `${attr}="${href(t)}${hash ? "#" + hash : ""}"`;
      }
      return all;
    });

  // GitBook blocks: render inner Markdown separately, then splice back in.
  const blocks = [];
  const keep = (html) => `\n\nGBBLOCK${blocks.push(html) - 1}\n\n`;
  const inner = (md) => marked.parse(md.trim());
  let md = body;
  md = md.replace(/\{%\s*tabs\s*%\}([\s\S]*?)\{%\s*endtabs\s*%\}/g, (_, content) => {
    const tabs = [...content.matchAll(/\{%\s*tab\s+title="([^"]*)"\s*%\}([\s\S]*?)\{%\s*endtab\s*%\}/g)];
    const head = tabs.map((t, i) => `<button role="tab" aria-selected="${i === 0}" data-i="${i}">${esc(t[1])}</button>`).join("");
    const panes = tabs.map((t, i) => `<div class="tab-pane" role="tabpanel"${i ? " hidden" : ""}>${inner(t[2])}</div>`).join("");
    return keep(`<div class="tabs"><div class="tab-list" role="tablist">${head}</div>${panes}</div>`);
  });
  md = md.replace(/\{%\s*hint\s+style="(\w+)"\s*%\}([\s\S]*?)\{%\s*endhint\s*%\}/g, (_, style, content) =>
    keep(`<div class="hint hint-${style}"><span class="hint-icon">${ICONS[style] || ICONS.info}</span><div class="hint-body">${inner(content)}</div></div>`),
  );

  // Title = first H1; GitBook shows it in the page header with the description.
  let title = null;
  md = md.replace(/^#\s+(.+)\n/m, (_, t) => ((title = t.trim()), ""));

  let html = marked.parse(md);
  html = html.replace(/<p>GBBLOCK(\d+)<\/p>|GBBLOCK(\d+)/g, (_, a, b) => blocks[+(a ?? b)]);
  html = fixLinks(html);
  return { title, description: meta.description || "", html, toc, text: html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ") };
}

// ---------- layout ----------
function navHtml(items, current, depth = 0) {
  if (!items.length) return "";
  return `<ul class="nav-list${depth ? " nested" : ""}">${items
    .map((it) => {
      const o = outPath(it.src);
      const active = o === current;
      const open = active || flatten(it.children).some((c) => outPath(c.src) === current);
      return `<li${open ? ' class="open"' : ""}><a href="${href(o)}"${active ? ' class="active" aria-current="page"' : ""}>${esc(it.title)}${
        it.children.length ? '<svg class="chev" viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>' : ""
      }</a>${navHtml(it.children, current, depth + 1)}</li>`;
    })
    .join("")}</ul>`;
}

function layout({ groups, page, current, prev, next, crumbs, searchIndexRel, assetsRel }) {
  const nav = groups.map((g) => (g.title ? `<div class="nav-group">${esc(g.title)}</div>` : "") + navHtml(g.items, current)).join("");
  const toc = page.toc.length
    ? `<nav class="toc"><div class="toc-title">On this page</div><ul>${page.toc
        .map((t) => `<li class="l${t.level}"><a href="#${t.id}">${t.text}</a></li>`)
        .join("")}</ul></nav>`
    : "";
  const card = (p, dir) =>
    p
      ? `<a class="pn pn-${dir}" href="${href(outPath(p.src))}"><span class="pn-label">${dir === "prev" ? "Previous" : "Next"}</span><span class="pn-title">${esc(p.title)}</span></a>`
      : "<span></span>";
  const home = "/";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title || "")} | ${SITE.title}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${SITE.url}/${current.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "")}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${assetsRel}style.css">
</head>
<body>
<header class="site-header">
  <button class="menu-btn" aria-label="Open navigation"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg></button>
  <a class="brand" href="${home}"><span class="logo">K</span><span>${SITE.title}</span></a>
  <button class="search-btn" aria-label="Search"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg><span>Search...</span><kbd>⌘K</kbd></button>
  <nav class="header-links">
    <a href="https://kudo.archi" target="_blank" rel="noopener">Website</a>
    <a href="https://app.kudo.archi/dashboard" target="_blank" rel="noopener">Dashboard</a>
    <a href="https://x.com/kudo_archi" target="_blank" rel="noopener">X</a>
  </nav>
</header>
<div class="shell">
  <aside class="sidebar"><div class="sidebar-inner">${nav}</div></aside>
  <main class="main">
    <article class="page">
      ${crumbs.length ? `<div class="crumbs">${crumbs.map((c) => `<a href="${href(outPath(c.src))}">${esc(c.title)}</a>`).join('<span>/</span>')}</div>` : ""}
      <header class="page-header">
        <h1>${esc(page.title || "")}</h1>
        ${page.description ? `<p class="page-desc">${esc(page.description)}</p>` : ""}
      </header>
      <div class="content">${page.html}</div>
      <div class="pn-row">${card(prev, "prev")}${card(next, "next")}</div>
    </article>
    <aside class="toc-col">${toc}</aside>
  </main>
</div>
<div class="search-modal" hidden>
  <div class="search-box">
    <input type="search" placeholder="Search the docs" aria-label="Search the docs">
    <ul class="search-results"></ul>
  </div>
</div>
<script>window.__SEARCH_URL=${JSON.stringify(searchIndexRel)};window.__BASE="/";</script>
<script src="${searchIndexRel}"></script>
<script src="${assetsRel}site.js"></script>
</body>
</html>`;
}

// ---------- build ----------
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
const groups = parseSummary();
const all = groups.flatMap((g) => flatten(g.items));
const byOut = new Map(all.map((p) => [outPath(p.src), p]));

const parentOf = new Map();
(function walk(items, parent) {
  for (const it of items) {
    if (parent) parentOf.set(it, parent);
    walk(it.children, it);
  }
})(groups.flatMap((g) => g.items));

const index = [];
const rendered = all.map((p) => ({ p, r: renderPage(p.src, byOut) }));
for (const { p, r } of rendered) {
  r.title ||= p.title;
  index.push({ u: href(outPath(p.src)).slice(1), t: p.title, d: r.description, x: r.text.slice(0, 4000) });
}
fs.writeFileSync(path.join(out, "search-index.js"), "window.__SEARCH=" + JSON.stringify(index) + ";");

rendered.forEach(({ p, r }, i) => {
  const current = outPath(p.src);
  const crumbs = [];
  for (let c = parentOf.get(p); c; c = parentOf.get(c)) crumbs.unshift(c);
  const html = layout({
    groups,
    page: r,
    current,
    prev: all[i - 1],
    next: all[i + 1],
    crumbs,
    searchIndexRel: "/search-index.js",
    assetsRel: "/_assets/",
  });
  fs.mkdirSync(path.dirname(path.join(out, current)), { recursive: true });
  fs.writeFileSync(path.join(out, current), html);
});

fs.cpSync(path.join(here, "assets"), path.join(out, "_assets"), { recursive: true });
if (fs.existsSync(path.join(root, ".gitbook"))) fs.cpSync(path.join(root, ".gitbook"), path.join(out, ".gitbook"), { recursive: true });
console.log(`Built ${all.length} pages -> ${path.relative(process.cwd(), out) || out}`);
