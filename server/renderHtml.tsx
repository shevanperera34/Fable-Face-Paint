import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { AppRoutes } from "../src/AppRoutes";
import {
  absoluteUrl,
  jsonLdOrganizationAndWebsite,
  renderJsonLdScript,
  seoForPathname,
} from "../src/seo/routeMeta";

export type BuildManifest = {
  js: string;
  css: string;
};

export function renderFullPage(requestPath: string, basePath: string, assets: BuildManifest): string {
  const seo = seoForPathname(requestPath, basePath);
  const appHtml = renderToString(
    <StrictMode>
      <StaticRouter location={requestPath} basename={basePath || undefined}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  const canonical = absoluteUrl(seo.path);
  const ogUrl = absoluteUrl(seo.path);
  const jsonLd = jsonLdOrganizationAndWebsite();
  const baseJson = JSON.stringify(basePath);

  return `<!DOCTYPE html>
<html lang="en-CA">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escapeHtml(seo.title)}</title>
  <meta name="description" content="${escapeHtml(seo.description)}" />
  <meta name="keywords" content="${escapeHtml(seo.keywords)}" />
  <link rel="canonical" href="${escapeHtml(canonical)}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${escapeHtml(seo.title)}" />
  <meta property="og:description" content="${escapeHtml(seo.description)}" />
  <meta property="og:url" content="${escapeHtml(ogUrl)}" />
  <meta property="og:site_name" content="Fable Face Paint" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeHtml(seo.title)}" />
  <meta name="twitter:description" content="${escapeHtml(seo.description)}" />
  <link rel="stylesheet" href="${escapeHtml(assets.css)}" />
  <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=Cinzel:wght@400;600;700;900&display=swap" rel="stylesheet" />
  ${renderJsonLdScript(jsonLd)}
</head>
<body>
  <div id="root">${appHtml}</div>
  <script>window.__FFP_BASE_PATH__=${baseJson};</script>
  <script type="module" src="${escapeHtml(assets.js)}"></script>
</body>
</html>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
