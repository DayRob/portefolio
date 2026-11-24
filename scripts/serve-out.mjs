#!/usr/bin/env node
// Petit serveur statique pour contrôler le site exporté (out/) avec les MÊMES
// en-têtes de sécurité que nginx. Sert uniquement aux tests locaux.
// Usage : npm run build && npm run serve   (PORT=3000 par défaut)
import fs from "node:fs";
import http from "node:http";
import path from "node:path";

const root = path.resolve("out");
const port = Number(process.env.PORT ?? 3000);
const { staticHeaders, cspTemplate, hashesByPath } = JSON.parse(
  fs.readFileSync(path.join("deploy", "generated", "security-headers.json"), "utf8")
);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf"
};

function resolve(urlPath) {
  const clean = decodeURIComponent(urlPath.split("?")[0]);
  if (/\/\.(?!well-known)/.test(clean)) return null;
  let file = path.join(root, clean);
  if (!file.startsWith(root)) return null;
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  return fs.existsSync(file) ? file : null;
}

http
  .createServer((req, res) => {
    const file = resolve(req.url ?? "/");
    const status = file ? 200 : 404;
    const target = file ?? path.join(root, "404.html");
    const key = "/" + path.relative(root, target).split(path.sep).join("/");
    const csp = cspTemplate.replace("{{SCRIPTS}}", (hashesByPath[key] ?? []).join(" "));
    res.writeHead(status, {
      ...staticHeaders,
      "Content-Security-Policy": csp,
      "Content-Type": types[path.extname(target)] ?? "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    fs.createReadStream(target).pipe(res);
  })
  .listen(port, () => console.log(`http://localhost:${port}`));
