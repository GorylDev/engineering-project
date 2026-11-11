import { expect, test } from "@playwright/test";

test("gotowość zwraca 503 bez szczegółów konfiguracji", async ({ request }) => {
  const response = await request.get("/api/health");
  expect(response.status()).toBe(503);
  expect(await response.json()).toEqual({ status: "unavailable" });
  expect(response.headers()["cache-control"]).toContain("no-store");
});

test("żywotność procesu nie udaje sprawnego połączenia bazy", async ({ request }) => {
  const response = await request.get("/api/health/live");
  expect(response.status()).toBe(200);
  expect(await response.json()).toEqual({ status: "ok" });
});

test("błąd katalogu ma bezpieczny komunikat i możliwość ponowienia", async ({ page }) => {
  const response = await page.goto("/katalog-bazy");
  await expect(
    page.getByRole("heading", { name: "Nie możemy teraz wczytać katalogu" }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Spróbuj ponownie" })).toBeVisible();
  const body = await page.locator("body").innerText();
  expect(body).not.toMatch(
    /DATABASE_URL|postgresql:\/\/|Prisma|unavailable:unavailable|stack trace/i,
  );
  expect(await response?.text()).not.toMatch(
    /postgresql:\/\/|unavailable:unavailable|DATABASE_URL/,
  );
});

test("nieznany adres ma stronę 404", async ({ page }) => {
  const response = await page.goto("/nieistniejaca-strona");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "Nie znaleźliśmy tej strony" })).toBeVisible();
});
