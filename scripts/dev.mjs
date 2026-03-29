import { spawnSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function run(cmd, args) {
  const r = spawnSync(cmd, args, { cwd: root, stdio: "inherit", shell: process.platform === "win32" });
  if (r.status !== 0) process.exit(r.status ?? 1);
}

run(process.execPath, [path.join(root, "scripts", "generate-image-manifests.mjs")]);
run(process.execPath, [path.join(root, "scripts", "build.mjs")]);

const { default: app } = await import(path.join(root, "dist", "server", "vercel-app.mjs"));
const port = Number(process.env.PORT) || 5173;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
