import { spawn } from "node:child_process";

export async function runLocalBinary(
  binary: string,
  args: string[],
  environment: NodeJS.ProcessEnv,
) {
  const result = await new Promise<number>((resolve, reject) => {
    const child = spawn(process.execPath, [binary, ...args], {
      stdio: "inherit",
      env: environment,
      shell: false,
    });
    child.once("error", reject);
    child.once("exit", (code) => resolve(code ?? 1));
  });
  if (result !== 0) {
    throw new Error("Polecenie zakończyło się błędem. Sprawdź poprzedni komunikat.");
  }
}
