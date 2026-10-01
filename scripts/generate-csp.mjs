#!/usr/bin/env node
// Après `next build` : calcule les hachages SHA-256 de tous les scripts en ligne
// des pages exportées (out/**/*.html) et produit les en-têtes de sécurité :
//   deploy/generated/security-headers.conf  (à inclure dans nginx)
//   deploy/generated/security-headers.json  (utilisé par scripts/serve-out.mjs)
// Cela permet une CSP sans 'unsafe-inline' pour les scripts.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

const outDir = "out";
const genDir = path.join("deploy", "generated");

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const full = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(full) : e.name.endsWith(".html") ? [full] : [];
  });
}

// Hachages des scripts en ligne, page par page : une CSP par page reste courte
// (la limite d'un paramètre nginx est de 4 Ko) et plus stricte qu'une liste globale.
const hashesByPath = {};
let inlineStyles = 0;
let styleAttributes = 0;
for (const file of htmlFiles(outDir)) {
  const html = fs.readFileSync(file, "utf8");
  const key = "/" + path.relative(outDir, file).split(path.sep).join("/");
  const hashes = new Set();
  for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/g)) {
    hashes.add(`'sha256-${crypto.createHash("sha256").update(m[1], "utf8").digest("base64")}'`);
  }
  hashesByPath[key] = [...hashes].sort();
  inlineStyles += (html.match(/<style[\s>]/g) ?? []).length;
  styleAttributes += (html.match(/\sstyle="/g) ?? []).length;
}

if (inlineStyles > 0 || styleAttributes > 0) {
  console.warn(
    `Attention : ${inlineStyles} balise(s) <style> et ${styleAttributes} attribut(s) style en ligne détectés. ` +
      "La CSP (style-src 'self') les bloquera."
  );
}

// {{SCRIPTS}} est remplacé par les hachages de la page servie.
const cspTemplate = [
  "default-src 'none'",
  "script-src 'self' {{SCRIPTS}}",
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests"
].join("; ");

const staticHeaders = {
  "Strict-Transport-Security": "max-age=63072000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy":
    "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin"
};

fs.mkdirSync(genDir, { recursive: true });

// Utilisé par scripts/serve-out.mjs (tests locaux).
fs.writeFileSync(
  path.join(genDir, "security-headers.json"),
  JSON.stringify({ staticHeaders, cspTemplate, hashesByPath }, null, 2)
);

// nginx : un `map` (contexte http) associe chaque page à ses hachages,
// puis un fichier d'en-têtes inclus dans chaque location.
const mapLines = Object.entries(hashesByPath)
  .filter(([, h]) => h.length > 0)
  .map(([k, h]) => `    "${k}" "${h.join(" ")}";`);
fs.writeFileSync(
  path.join(genDir, "csp-map.conf"),
  "# Fichier généré par scripts/generate-csp.mjs. Ne pas modifier à la main.\n" +
    "# À placer dans /etc/nginx/conf.d/ (contexte http).\n" +
    `map $uri $csp_script_hashes {\n    default "";\n${mapLines.join("\n")}\n}\n`
);
const cspNginx = cspTemplate.replace("{{SCRIPTS}}", "$csp_script_hashes");
fs.writeFileSync(
  path.join(genDir, "security-headers.conf"),
  "# Fichier généré par scripts/generate-csp.mjs. Ne pas modifier à la main.\n" +
    `add_header Content-Security-Policy "${cspNginx}" always;\n` +
    Object.entries(staticHeaders)
      .map(([k, v]) => `add_header ${k} "${v}" always;`)
      .join("\n") +
    "\n"
);

const total = Object.values(hashesByPath).reduce((n, h) => n + h.length, 0);
const max = Math.max(...Object.values(hashesByPath).map((h) => h.length));
console.log(
  `CSP générée : ${Object.keys(hashesByPath).length} page(s), ${total} hachage(s) de script en ligne (max ${max} par page).`
);
