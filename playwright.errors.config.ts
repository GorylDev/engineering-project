import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  testMatch: ["unavailable.spec.ts", "preview.spec.ts"],
  workers: 1,
  forbidOnly: true,
  retries: 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: { baseURL: "http://127.0.0.1:3101", trace: "retain-on-failure" },
  projects: [{ name: "chromium-errors", use: { ...devices["Desktop Chrome"] } }],
  webServer: {
    command: "pnpm start --port 3101",
    url: "http://127.0.0.1:3101/api/health/live",
    reuseExistingServer: false,
    timeout: 60000,
    env: {
      APP_ENV: "test",
      NODE_ENV: "production",
      NEXT_TELEMETRY_DISABLED: "1",
      DATABASE_URL: "postgresql://unavailable:unavailable@127.0.0.1:1/olfunara_test",
    },
  },
});
