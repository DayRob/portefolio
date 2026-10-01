#!/usr/bin/env node
// Liste les marqueurs « [À CONFIRMER] » et « [À COMPLÉTER] » restant dans le code source.
// Usage : npm run check:todo            (liste, code de sortie 0)
//         npm run check:todo -- --strict (code de sortie 1 s'il en reste : à brancher avant une mise en production)
import fs from "node:fs";
import path from "node:path";

const roots = ["app", "components", "data", "public/.well-known"];
const exts = new Set([".ts", ".tsx", ".txt", ".md"]);
const marker = /\[(À CONFIRMER|À COMPLÉTER)[^\]]*\]/g;
const found = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (exts.has(path.extname(entry.name)) || entry.name === "security.txt") {
      fs.readFileSync(full, "utf8")
        .split("\n")
        .forEach((line, i) => {
          const t = line.trim();
          // Les commentaires de code qui décrivent la convention ne sont pas des marqueurs à traiter.
          if (/\.(ts|tsx)$/.test(full) && (t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"))) return;
          for (const m of line.matchAll(marker)) found.push(`${full}:${i + 1}  ${m[0]}`);
        });
    }
  }
}

roots.forEach(walk);
if (found.length === 0) {
  console.log("Aucun marqueur restant.");
} else {
  console.log(`${found.length} marqueur(s) à traiter :\n`);
  console.log(found.join("\n"));
}
if (process.argv.includes("--strict") && found.length > 0) process.exit(1);
