import { defineConfig, devices } from "@playwright/test";
import { loadProjectEnvironment } from "./scripts/lib/environment";
import { assertLocalDatabase } from "./scripts/lib/database-safety";

loadProjectEnvironment();
const databaseUrl = assertLocalDatabase(
  {
    appEnvironment: process.env.APP_ENV,
    nodeEnvironment: process.env.NODE_ENV,
    databaseUrl: process.env.DATABASE_URL,
  },
  "test",
);

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: "catalog.spec.ts",
  fullyParallel: false,
  workers: 1,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3100", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm start --port 3100",
    url: "http://127.0.0.1:3100/api/health/live",
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      APP_ENV: "test",
      DATABASE_URL: databaseUrl,
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
    },
  },
});
