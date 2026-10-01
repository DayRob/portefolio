#!/usr/bin/env node
// Contrôle automatisé du site exporté (out/) :
//  - axe-core (WCAG 2.0/2.1 A et AA + bonnes pratiques), sur chaque page, en thème clair et sombre,
//    à 390 px, 1280 px et 320 px (reflow), avec prefers-reduced-motion
//  - absence de débordement horizontal à 320 px
//  - lien d'évitement et indicateur de focus visible, navigation clavier sans piège
//  - aucune violation de CSP, aucune requête hors de l'origine du site
//  - aucun cookie, aucune clé localStorage
// Usage : npm run build && npm run check:a11y
// Variable optionnelle : CHROME_PATH (sinon le Chromium de Playwright est utilisé).
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
import AxeBuilder from "@axe-core/playwright";

// A11Y_BASE_URL permet de tester un serveur déjà lancé (par exemple nginx avec la vraie configuration).
const PORT = Number(process.env.A11Y_PORT ?? 3210);
const base = process.env.A11Y_BASE_URL ?? `http://localhost:${PORT}`;
const server = process.env.A11Y_BASE_URL
  ? { kill() {} }
  : spawn("node", ["scripts/serve-out.mjs"], {
      env: { ...process.env, PORT: String(PORT) },
      stdio: "ignore"
    });
await new Promise((r) => setTimeout(r, 1500));

function pagesFromOut(dir = "out", prefix = "") {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    if (e.isDirectory()) {
      if (e.name === "_next" || e.name.startsWith(".")) return [];
      return pagesFromOut(path.join(dir, e.name), `${prefix}/${e.name}`);
    }
    return e.name === "index.html" ? [prefix === "" ? "/" : `${prefix}/`] : [];
  });
}
const pages = [...pagesFromOut(), "/page-inexistante/"].sort();

const viewports = [
  { name: "320px", width: 320, height: 640 },
  { name: "390px", width: 390, height: 844 },
  { name: "1280px", width: 1280, height: 800 }
];
const schemes = ["light", "dark"];

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || undefined,
  args: ["--no-sandbox"]
});

const problems = [];
const summary = { pages: pages.length, axeRuns: 0 };

for (const pagePath of pages) {
  for (const vp of viewports) {
    for (const scheme of schemes) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: scheme,
        reducedMotion: "reduce"
      });
      const page = await ctx.newPage();
      const label = `${pagePath} [${vp.name}, ${scheme}]`;
      const external = new Set();
      page.on("request", (r) => {
        const u = new URL(r.url());
        if (u.origin !== base && u.protocol.startsWith("http")) external.add(u.origin);
      });
      page.on("console", (m) => {
        if (m.type() === "error" || /content security policy/i.test(m.text())) {
          // La route 404 renvoie volontairement un statut 404 : ce message n'est pas une erreur du site.
          if (/Failed to load resource.*404/.test(m.text()) && pagePath === "/page-inexistante/") return;
          problems.push(`${label} console : ${m.text().slice(0, 200)}`);
        }
      });
      page.on("pageerror", (e) => problems.push(`${label} erreur JS : ${e.message}`));
      await page.goto(base + pagePath, { waitUntil: "networkidle" });

      const res = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"])
        .analyze();
      summary.axeRuns++;
      for (const v of res.violations) {
        problems.push(`${label} axe ${v.id} (${v.impact}) : ${v.help} (${v.nodes.length} nœud(s))`);
      }
      for (const v of res.incomplete) {
        summary.incomplete = summary.incomplete ?? new Set();
        for (const n of v.nodes) summary.incomplete.add(`${v.id} ${label} : ${n.html.slice(0, 80)}`);
      }

      if (vp.width === 320) {
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth
        );
        if (overflow > 0) problems.push(`${label} débordement horizontal de ${overflow}px`);
      }
      if (external.size) problems.push(`${label} requêtes hors origine : ${[...external].join(", ")}`);

      const cookies = await ctx.cookies();
      if (cookies.length) problems.push(`${label} cookies déposés : ${cookies.map((c) => c.name)}`);
      const ls = await page.evaluate(() => Object.keys(localStorage).concat(Object.keys(sessionStorage)));
      if (ls.length) problems.push(`${label} stockage navigateur : ${ls}`);

      await ctx.close();
    }
  }
}

// Navigation clavier : lien d'évitement, focus visible, absence de piège.
const kbd = { pagesChecked: 0, maxStops: 0 };
for (const pagePath of pages.filter((p) => p !== "/page-inexistante/")) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + pagePath, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  const first = await page.evaluate(() => {
    const el = document.activeElement;
    const r = el.getBoundingClientRect();
    return { text: el.textContent?.trim(), top: r.top, visible: r.bottom > 0 && r.top >= -1 };
  });
  if (!/contenu principal/i.test(first.text ?? "")) {
    problems.push(`${pagePath} clavier : le premier arrêt n'est pas le lien d'évitement (« ${first.text} »)`);
  }
  if (!first.visible) problems.push(`${pagePath} clavier : lien d'évitement non visible au focus`);
  await page.keyboard.press("Enter");
  const target = await page.evaluate(() => document.activeElement?.id);
  if (target !== "contenu") problems.push(`${pagePath} clavier : le lien d'évitement ne place pas le focus sur #contenu`);

  await page.evaluate(() => document.activeElement.blur());
  const seen = new Set();
  let stops = 0;
  for (let i = 0; i < 80; i++) {
    await page.keyboard.press("Tab");
    const info = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const cs = getComputedStyle(el);
      return {
        key: `${el.tagName}|${el.textContent?.trim().slice(0, 40)}|${el.getAttribute("href")}`,
        outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) >= 2
      };
    });
    if (!info) break;
    if (seen.has(info.key)) break;
    seen.add(info.key);
    stops++;
    if (!info.outline) problems.push(`${pagePath} clavier : pas d'indicateur de focus sur ${info.key}`);
  }
  kbd.maxStops = Math.max(kbd.maxStops, stops);
  kbd.pagesChecked++;
  await ctx.close();
}

// Sans JavaScript : l'adresse e-mail ne doit pas apparaître d'un bloc, le contenu doit rester lisible.
const html = fs
  .readdirSync("out", { recursive: true })
  .filter((f) => String(f).endsWith(".html"))
  .map((f) => fs.readFileSync(path.join("out", String(f)), "utf8"))
  .join("\n");
if (/cmvilleroy@gmail\.com/.test(html)) problems.push("e-mail en clair dans le HTML exporté");
if (/\+33|06 ?49/.test(html)) problems.push("numéro de téléphone présent dans le HTML exporté");

await browser.close();
server.kill();

console.log(JSON.stringify({
  pages: summary.pages,
  executionsAxe: summary.axeRuns,
  arretsClavierMax: kbd.maxStops,
  regleAxeIncompletes: summary.incomplete ? [...summary.incomplete] : []
}, null, 2));
if (problems.length) {
  console.log(`\n${problems.length} problème(s) :`);
  console.log([...new Set(problems)].join("\n"));
  process.exit(1);
}
console.log("\nAucun problème détecté (axe : 0 violation, CSP : 0 violation, 0 requête tierce, 0 cookie).");
