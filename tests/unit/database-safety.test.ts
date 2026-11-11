import { describe, expect, it } from "vitest";
import {
  assertLocalDatabase,
  assertTestResetConfirmation,
} from "../../scripts/lib/database-safety";

const testTarget = {
  appEnvironment: "test",
  nodeEnvironment: "test",
  databaseUrl: "postgresql://olfunara_test:test-value@127.0.0.1:5433/olfunara_test",
};

describe("ochrona lokalnych operacji bazy", () => {
  it("dopuszcza wyłącznie właściwy cel testowy", () => {
    expect(assertLocalDatabase(testTarget, "test")).toContain("/olfunara_test");
  });
  it("dopuszcza oddzielny cel developerski", () => {
    expect(
      assertLocalDatabase(
        {
          appEnvironment: "development",
          nodeEnvironment: "development",
          databaseUrl: "postgresql://olfunara:test-value@127.0.0.1:5432/olfunara",
        },
        "development",
      ),
    ).toContain(":5432/olfunara");
  });
  it.each([
    "postgresql://olfunara:test-value@127.0.0.1:5432/olfunara",
    "postgresql://olfunara_test:test-value@production.example:5433/olfunara_test",
    "postgresql://olfunara_test:test-value@127.0.0.1:5432/olfunara_test",
    "postgresql://olfunara_test:test-value@127.0.0.1:5433/olfunara",
    "postgresql://admin:test-value@127.0.0.1:5433/olfunara_test",
    "postgresql://olfunara_test:test-value@127.0.0.1:5433/olfunara_test?host=production.example",
    "postgresql://olfunara_test:test-value@127.0.0.1:5433/olfunara_test?schema=other",
    "postgresql://olfunara_test:test-value@127.0.0.1:5433/olfunara_test#fragment",
    "file:./database.sqlite",
    "",
  ])("odrzuca niewłaściwy cel przed połączeniem: %s", (databaseUrl) => {
    expect(() => assertLocalDatabase({ ...testTarget, databaseUrl }, "test")).toThrow();
  });
  it("odrzuca APP_ENV=production", () => {
    expect(() =>
      assertLocalDatabase({ ...testTarget, appEnvironment: "production" }, "test"),
    ).toThrow();
  });
  it("odrzuca NODE_ENV=production niezależnie od APP_ENV", () => {
    expect(() =>
      assertLocalDatabase({ ...testTarget, nodeEnvironment: "production" }, "test"),
    ).toThrow();
  });
  it("nie dopuszcza testowej bazy w trybie developerskim", () => {
    expect(() =>
      assertLocalDatabase({ ...testTarget, appEnvironment: "development" }, "development"),
    ).toThrow();
  });
  it.each([undefined, "--force", "--confirm-reset=olfunara"])(
    "reset wymaga precyzyjnego potwierdzenia: %s",
    (confirmation) => {
      expect(() => assertTestResetConfirmation(confirmation)).toThrow(
        "--confirm-reset=olfunara_test",
      );
    },
  );
  it("dopuszcza potwierdzenie resetu testowego", () => {
    expect(() => assertTestResetConfirmation("--confirm-reset=olfunara_test")).not.toThrow();
  });
});
