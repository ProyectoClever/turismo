import { spawn, execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const envPath = path.join(root, ".env.local");

function run(command, args) {
  return spawn(command, args, {
    stdio: "inherit",
    shell: true,
    cwd: root,
  });
}

function ensureSupabase() {
  console.log("\n→ Iniciando backend (Supabase local)...\n");
  try {
    execSync("npx supabase start", {
      stdio: "inherit",
      cwd: root,
      shell: true,
    });
    return true;
  } catch {
    console.error(`
⚠ No se pudo iniciar Supabase local.
  Abre Docker Desktop y vuelve a correr: npm run dev

  Mientras tanto se inicia solo el frontend.
`);
    return false;
  }
}

function readStatusEnv() {
  const raw = execSync("npx supabase status -o env", {
    encoding: "utf8",
    cwd: root,
    shell: true,
  });

  const values = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (!match) continue;
    values[match[1]] = match[2].replace(/^"|"$/g, "");
  }
  return values;
}

function updateEnv(status) {
  const apiUrl = status.API_URL || status.SUPABASE_URL;
  const anonKey = status.ANON_KEY || status.SUPABASE_ANON_KEY;

  if (!apiUrl || !anonKey) {
    console.warn(
      "No se pudieron leer API_URL/ANON_KEY. Revisa .env.local manualmente."
    );
    return;
  }

  let content = existsSync(envPath) ? readFileSync(envPath, "utf8") : "";

  const setVar = (key, value) => {
    const line = `${key}=${value}`;
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(content)) {
      content = content.replace(regex, line);
    } else {
      content = `${content.trimEnd()}\n${line}\n`;
    }
  };

  setVar("NEXT_PUBLIC_SUPABASE_URL", apiUrl);
  setVar("NEXT_PUBLIC_SUPABASE_ANON_KEY", anonKey);
  writeFileSync(envPath, content.trimEnd() + "\n", "utf8");

  console.log("\n✓ Backend listo — .env.local actualizado");
  console.log(`  URL: ${apiUrl}\n`);
}

function startFrontend() {
  console.log("→ Iniciando frontend (Next.js) en http://localhost:3000\n");
  const child = run("npx", ["next", "dev"]);

  const shutdown = () => {
    child.kill("SIGINT");
    process.exit(0);
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  child.on("exit", (code) => process.exit(code ?? 0));
}

const backendOk = ensureSupabase();
if (backendOk) {
  try {
    updateEnv(readStatusEnv());
  } catch (error) {
    console.warn("Supabase arrancó, pero no se pudo leer el status:", error);
  }
}
startFrontend();
