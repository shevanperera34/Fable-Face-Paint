import express from "express";
import fs from "fs";
import path from "path";
import type { BuildManifest } from "./renderHtml";
import { renderFullPage } from "./renderHtml";

const rootDir = process.cwd();

function loadManifest(): BuildManifest {
  const p = path.join(rootDir, "public", "build-manifest.json");
  return JSON.parse(fs.readFileSync(p, "utf8")) as BuildManifest;
}

export function createApp() {
  const app = express();

  app.use(express.static(path.join(rootDir, "public"), { index: false }));

  app.use((req, res, next) => {
    if (req.method !== "GET") {
      next();
      return;
    }
    const p = req.path;
    if (p !== "/" && /\.[a-zA-Z0-9]+$/.test(p)) {
      next();
      return;
    }
    try {
      const manifest = loadManifest();
      const basePath = (process.env.BASE_PATH ?? "").replace(/\/$/, "");
      const html = renderFullPage(req.path, basePath, manifest);
      res.type("html").send(html);
    } catch (err) {
      next(err);
    }
  });

  return app;
}
