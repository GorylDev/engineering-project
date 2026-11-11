import { describe, expect, it } from "vitest";
import { parseServerEnvironment } from "../../src/config/environment";

const localUrl = "postgresql://olfunara:test-value@127.0.0.1:5432/olfunara";

describe("walidacja konfiguracji serwera", () => {
  it("akceptuje konfigurację PostgreSQL", () => {
    expect(parseServerEnvironment({ APP_ENV: "development", DATABASE_URL: localUrl })).toEqual({
      APP_ENV: "development",
      DATABASE_URL: localUrl,
    });
  });

  it.each([
    undefined,
    "",
    "invalid",
    "file:./database.sqlite",
    "https://example.com/db",
    "postgresql://localhost/db",
  ])("odrzuca brak lub niewłaściwy adres bazy: %s", (databaseUrl) => {
    expect(() =>
      parseServerEnvironment({ APP_ENV: "development", DATABASE_URL: databaseUrl }),
    ).toThrow("DATABASE_URL");
  });

  it.each([undefined, "preview", ""])("wymaga znanego środowiska: %s", (appEnvironment) => {
    expect(() =>
      parseServerEnvironment({ APP_ENV: appEnvironment, DATABASE_URL: localUrl }),
    ).toThrow("APP_ENV");
  });

  it("nie umieszcza wartości wejścia w błędzie", () => {
    const secretMarker = "unit-test-secret-marker";
    let message = "";
    try {
      parseServerEnvironment({ APP_ENV: "development", DATABASE_URL: `invalid:${secretMarker}` });
    } catch (error) {
      message = (error as Error).message;
    }
    expect(message).toContain("DATABASE_URL");
    expect(message).not.toContain(secretMarker);
  });
});
