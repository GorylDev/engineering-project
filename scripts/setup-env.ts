import { randomBytes } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const developmentPassword = randomBytes(24).toString("hex");
const testPassword = randomBytes(24).toString("hex");
const values: Record<string, string> = {
  POSTGRES_PASSWORD: developmentPassword,
  TEST_POSTGRES_PASSWORD: testPassword,
  DATABASE_URL: `postgresql://olfunara:${developmentPassword}@127.0.0.1:5432/olfunara`,
  TEST_DATABASE_URL: `postgresql://olfunara_test:${testPassword}@127.0.0.1:5433/olfunara_test`,
};

try {
  const template = await readFile(".env.example", "utf8");
  const contents = template.replace(/^([A-Z_]+)=$/gm, (line: string, key: string) =>
    values[key] ? `${key}=${values[key]}` : line,
  );
  await writeFile(".env", contents, { flag: "wx", mode: 0o600 });
  console.info("Utworzono lokalny .env. Nie wyświetlono haseł. Plik nie podlega wersjonowaniu.");
} catch (error) {
  if ((error as NodeJS.ErrnoException).code === "EEXIST") {
    console.info("Plik .env już istnieje; zachowano jego zawartość.");
  } else {
    console.error("Nie udało się przygotować lokalnej konfiguracji środowiska.");
    process.exitCode = 1;
  }
}
