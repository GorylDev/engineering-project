import { loadProjectEnvironment } from "./lib/environment";
import {
  assertLocalDatabase,
  assertNonProductionEnvironment,
  assertTestResetConfirmation,
} from "./lib/database-safety";
import { runLocalBinary } from "./lib/run-command";
import { checkLocalDatabase } from "./lib/check-database";

loadProjectEnvironment();
const action = process.argv[2];

async function main() {
  const target = {
    appEnvironment: process.env.APP_ENV,
    nodeEnvironment: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
  };
  assertNonProductionEnvironment(target);
  const isTest = ["integration", "e2e", "prepare-test", "reset-test"].includes(action ?? "");
  const databaseUrl = assertLocalDatabase(
    isTest
      ? { ...target, appEnvironment: "test", databaseUrl: process.env.TEST_DATABASE_URL }
      : target,
    isTest ? "test" : "development",
  );
  const environment: NodeJS.ProcessEnv = {
    ...process.env,
    APP_ENV: isTest ? "test" : "development",
    DATABASE_URL: databaseUrl,
    ...(isTest ? { NODE_ENV: "test" } : {}),
  };
  if (action === "reset-test") {
    assertTestResetConfirmation(process.argv[3]);
  }
  await checkLocalDatabase(databaseUrl);
  const prisma = (args: string[]) =>
    runLocalBinary(
      "node_modules/prisma/build/index.js",
      [...args, "--config", "prisma.config.ts"],
      environment,
    );
  if (action === "reset-test") {
    await prisma(["migrate", "reset", "--force"]);
    await prisma(["db", "seed"]);
  } else if (action === "migrate") {
    await prisma(["migrate", "deploy"]);
  } else if (action === "seed") {
    await prisma(["db", "seed"]);
  } else if (isTest) {
    await prisma(["migrate", "deploy"]);
    await prisma(["db", "seed"]);
    if (action === "integration") {
      await runLocalBinary(
        "node_modules/vitest/vitest.mjs",
        ["run", "--config", "vitest.integration.config.ts"],
        environment,
      );
    } else if (action === "e2e") {
      await runLocalBinary("node_modules/next/dist/bin/next", ["build", "--webpack"], {
        ...environment,
        NODE_ENV: "production",
      });
      await runLocalBinary("node_modules/@playwright/test/cli.js", ["test"], environment);
    }
  } else {
    throw new Error("Nieznana operacja bazy danych.");
  }
}

main().catch((error: unknown) => {
  if (error instanceof Error) console.error(error.message);
  console.error(
    "Operacja nie powiodła się. Sprawdź środowisko i dostępność właściwego PostgreSQL. Adres połączenia nie jest wyświetlany przez ten skrypt.",
  );
  process.exitCode = 1;
});
