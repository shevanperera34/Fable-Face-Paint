import autoprefixer from "autoprefixer";
import * as esbuild from "esbuild";
import fs from "fs";
import path from "path";
import postcss from "postcss";
import tailwindPostcss from "@tailwindcss/postcss";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const fileLoaders = {
  ".png": "file",
  ".jpg": "file",
  ".jpeg": "file",
  ".webp": "file",
  ".avif": "file",
  ".gif": "file",
  ".svg": "file",
  ".ttf": "file",
  ".otf": "file",
};

async function copyPublicFonts() {
  const destFonts = path.join(root, "public", "assets", "fonts");
  const destRootFonts = path.join(root, "public", "fonts");
  fs.mkdirSync(destFonts, { recursive: true });
  fs.mkdirSync(destRootFonts, { recursive: true });

  const germania = path.join(root, "src", "assets", "fonts", "GermaniaOne-Regular.ttf");
  if (fs.existsSync(germania)) {
    fs.copyFileSync(germania, path.join(destFonts, "GermaniaOne-Regular.ttf"));
  }

  const alter = path.join(root, "src", "assets", "Website Photos etc_", "Alter Bridge.ttf");
  if (fs.existsSync(alter)) {
    fs.copyFileSync(alter, path.join(destRootFonts, "AlterBridge.ttf"));
  }
}

async function buildCss() {
  const cssPath = path.join(root, "src", "index.css");
  const input = fs.readFileSync(cssPath, "utf8");
  const result = await postcss([tailwindPostcss, autoprefixer]).process(input, { from: cssPath });
  const outDir = path.join(root, "public", "assets");
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, "bundle.css");
  fs.writeFileSync(outFile, result.css, "utf8");
  return "/assets/bundle.css";
}

async function buildClient() {
  const basePath = process.env.BASE_PATH ?? "";
  const result = await esbuild.build({
    entryPoints: [path.join(root, "src", "main.tsx")],
    bundle: true,
    outdir: path.join(root, "public"),
    format: "esm",
    platform: "browser",
    jsx: "automatic",
    metafile: true,
    loader: fileLoaders,
    entryNames: "js/[name]-[hash]",
    assetNames: "assets/[name]-[hash]",
    define: {
      "process.env.NODE_ENV": JSON.stringify("production"),
    },
  });

  const outputs = result.metafile.outputs;
  const jsEntry = Object.entries(outputs).find(
    ([, o]) => o.entryPoint && o.entryPoint.replace(/\\/g, "/").endsWith("src/main.tsx")
  );
  if (!jsEntry) {
    throw new Error("Could not find client JS entry in esbuild metafile");
  }
  const jsPath = jsEntry[0].split(path.sep).join("/");
  const rel = path.relative(path.join(root, "public"), jsPath).split(path.sep).join("/");
  return `/${rel}`;
}

async function buildServer() {
  await esbuild.build({
    entryPoints: [path.join(root, "server", "apiEntry.ts")],
    bundle: true,
    outfile: path.join(root, "dist", "server", "vercel-app.mjs"),
    format: "esm",
    platform: "node",
    target: "node20",
    jsx: "automatic",
    loader: { ...fileLoaders, ".ts": "ts", ".tsx": "tsx" },
    assetNames: "../../public/assets/[name]-[hash]",
    packages: "external",
  });
}

function writeSitemap(siteUrl) {
  const origin = siteUrl.replace(/\/$/, "");
  const paths = [
    "/",
    "/small-events",
    "/large-events",
    "/services",
    "/gallery",
    "/about",
    "/faq",
    "/contact",
  ];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths
  .map(
    (p) => `  <url>
    <loc>${origin}${p}</loc>
    <changefreq>weekly</changefreq>
  </url>`
  )
  .join("\n")}
</urlset>
`;
  fs.writeFileSync(path.join(root, "public", "sitemap.xml"), body, "utf8");
}

async function main() {
  fs.mkdirSync(path.join(root, "public"), { recursive: true });
  fs.mkdirSync(path.join(root, "dist", "server"), { recursive: true });

  await copyPublicFonts();
  const cssUrl = await buildCss();
  const jsUrl = await buildClient();
  await buildServer();

  const manifest = { js: jsUrl, css: cssUrl };
  fs.writeFileSync(path.join(root, "public", "build-manifest.json"), JSON.stringify(manifest, null, 2), "utf8");

  const siteUrl = process.env.SITE_URL || "https://fablefacepaint.com";
  writeSitemap(siteUrl);

  console.log("Build complete:", manifest);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
