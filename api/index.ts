import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const bundlePath = path.join(process.cwd(), "dist", "server", "vercel-app.mjs");
if (!fs.existsSync(bundlePath)) {
  throw new Error(`SSR bundle not found at ${bundlePath}. Run pnpm run build first.`);
}

const { default: app } = await import(pathToFileURL(bundlePath).href);
export default app;
