import { expect, test } from "@playwright/test";

test("strona renderuje rekord PostgreSQL bez JavaScriptu klienta", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto("http://127.0.0.1:3100/");
    await expect(page.getByRole("heading", { name: "Przykład katalogowy Olfunara" })).toBeVisible();
    await expect(page.getByText("Wpis demonstracyjny", { exact: true })).toBeVisible();
    await expect(page.getByText(/Własne dane demonstracyjne projektu Olfunara/)).toBeVisible();
  } finally {
    await context.close();
  }
});

test("gotowość aplikacji wymaga połączenia i zmigrowanej tabeli", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
  expect(response.headers()["cache-control"]).toContain("no-store");
});
