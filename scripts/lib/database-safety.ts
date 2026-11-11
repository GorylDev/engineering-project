import { databaseUrlSchema } from "../../src/config/environment";

type DatabaseTarget = {
  appEnvironment: string | undefined;
  nodeEnvironment: string | undefined;
  databaseUrl: string | undefined;
};

export function assertNonProductionEnvironment(target: DatabaseTarget) {
  if (
    target.nodeEnvironment === "production" ||
    !["development", "test"].includes(target.appEnvironment ?? "")
  ) {
    throw new Error("Operacja lokalna jest zabroniona w tym środowisku.");
  }
}

export function assertLocalDatabase(target: DatabaseTarget, mode: "development" | "test") {
  assertNonProductionEnvironment(target);
  if (!databaseUrlSchema.safeParse(target.databaseUrl).success) {
    throw new Error("Brak poprawnej konfiguracji lokalnej bazy PostgreSQL.");
  }
  const url = new URL(target.databaseUrl!);
  const expected =
    mode === "test"
      ? { port: "5433", database: "/olfunara_test", user: "olfunara_test" }
      : { port: "5432", database: "/olfunara", user: "olfunara" };
  if (
    !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
    url.port !== expected.port ||
    url.pathname !== expected.database ||
    decodeURIComponent(url.username) !== expected.user ||
    url.search !== "" ||
    url.hash !== "" ||
    target.appEnvironment !== mode
  ) {
    throw new Error("Operacja wymaga właściwej lokalnej bazy i roli dla wybranego środowiska.");
  }
  return url.toString();
}

export function assertTestResetConfirmation(confirmation: string | undefined) {
  if (confirmation !== "--confirm-reset=olfunara_test") {
    throw new Error(
      "Reset wymaga parametru --confirm-reset=olfunara_test i usuwa wyłącznie dane testowe.",
    );
  }
}
