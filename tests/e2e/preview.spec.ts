import { expect, test, type Page } from "@playwright/test";

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth))
    .toBe(true);
}

test("wyszukiwanie po nucie prowadzi do profilu i pokazuje pusty wynik", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("searchbox", { name: "Nazwa perfum lub nuta" }).fill("bergamotka");
  await page.getByRole("button", { name: "Szukaj", exact: true }).click();
  await expect(page.getByRole("status")).toHaveText("Liczba wyników: 1");
  await page.getByRole("link", { name: /Zielony świt/ }).click();
  await expect(page.getByRole("heading", { name: "Zielony świt" })).toBeVisible();
  await expect(page.getByText("Białe piżmo", { exact: true })).toBeVisible();
  await expect(
    page.getByText("Ten profil jest fikcyjny, dlatego nie ma powiązanych ofert."),
  ).toBeVisible();

  await page.goto("/szukaj?q=xyzxyz");
  await expect(page.getByRole("heading", { name: "Brak pasujących zapachów" })).toBeVisible();
  await page.getByRole("link", { name: "Wyczyść wszystkie filtry" }).click();
  await expect(page.getByRole("status")).toHaveText("Liczba wyników: 4");
});

test("na telefonie można otworzyć i zamknąć filtry klawiaturą oraz zastosować wykluczenie", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 820 });
  await page.goto("/szukaj?occasion=work");
  const trigger = page.getByRole("button", { name: "Filtry, aktywne warunki: 1" });
  const dialog = page.getByRole("dialog", { name: "Filtry" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Zamknij" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("textbox", { name: "Wykluczona nuta" }).fill("pizmo");
  await dialog.getByRole("button", { name: "Zastosuj filtry" }).click();
  await expect(page.getByRole("button", { name: "Filtry, aktywne warunki: 2" })).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Liczba wyników: 1");
  await expect(page.getByRole("heading", { name: "Cichy cedr" })).toBeVisible();
  await expectNoHorizontalOverflow(page);
});

test("kreator zachowuje odpowiedzi po cofnięciu i stosuje oba warunki", async ({ page }) => {
  await page.goto("/wybor");
  await page.getByRole("radio", { name: "Na wieczór" }).check();
  await page.getByRole("button", { name: "Dalej" }).click();
  await expect(page.getByText("Jaki zapach lubisz?", { exact: true })).toBeFocused();
  await page.getByRole("radio", { name: "Ciepły, jak wanilia i przyprawy" }).check();
  await page.getByRole("button", { name: "Wstecz" }).click();
  await expect(page.getByRole("radio", { name: "Na wieczór" })).toBeChecked();
  await page.getByRole("button", { name: "Dalej" }).click();
  await expect(page.getByRole("radio", { name: "Ciepły, jak wanilia i przyprawy" })).toBeChecked();
  await page.getByRole("button", { name: "Pokaż wyniki" }).click();
  await expect(page.getByRole("status")).toHaveText("Liczba wyników: 1");
  await expect(page.getByRole("heading", { name: "Po zmierzchu" })).toBeVisible();
});

test("układy od 360 px, polskie glify i zrzuty desktop oraz mobile", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const fonts = await page.evaluate(async () => {
    const sample = "ĄĆĘŁŃÓŚŹŻ ąćęłńóśźż";
    const inter = await document.fonts.load('16px "Inter Variable"', sample);
    const serif = await document.fonts.load('40px "Instrument Serif"', sample);
    const italic = await document.fonts.load('italic 40px "Instrument Serif"', sample);
    return [inter.length, serif.length, italic.length];
  });
  expect(fonts.every((count) => count >= 2)).toBe(true);
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/home-desktop.png", fullPage: true });
  await page.getByRole("link", { name: /Do pracy/ }).click();
  await expect(page.getByRole("status")).toHaveText("Liczba wyników: 2");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/results-desktop.png", fullPage: true });

  await page.setViewportSize({ width: 360, height: 820 });
  await page.goto("/");
  await expect(page.getByRole("button", { name: "Szukaj", exact: true })).toBeInViewport();
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/home-mobile.png", fullPage: true });
  await page.goto("/szukaj?occasion=work");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/results-mobile.png", fullPage: true });
  await page.getByRole("button", { name: "Filtry, aktywne warunki: 1" }).focus();
  await page.keyboard.press("Enter");
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("button", { name: "Zamknij" })).toHaveCSS("outline-width", "3px");
  await page.screenshot({ path: "test-results/visual/filters-mobile.png" });
  await page.goto("/perfumy/cichy-cedr");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/detail-mobile.png", fullPage: true });
  await page.goto("/wybor");
  await expectNoHorizontalOverflow(page);
  await page.screenshot({ path: "test-results/visual/wizard-mobile.png", fullPage: true });
});
