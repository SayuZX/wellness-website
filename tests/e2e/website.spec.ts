import { expect, test } from "@playwright/test";

test("language, catalog search, favorites, details, and persistence", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "ID" }).first().click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Relaksasi premium");
  await expect(page.locator(".demo-banner")).toContainText("Pratinjau wellness interaktif");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "id");
  const catalog = page.locator("#treatments");
  await catalog.getByRole("button", { name: "Pemulihan" }).click();
  await expect(catalog.getByRole("article")).toHaveCount(3);
  await catalog.getByRole("button", { name: "Semua perawatan" }).click();
  await catalog.getByRole("searchbox").fill("aromaterapi");
  await expect(catalog.getByRole("article")).toHaveCount(1);
  const card = catalog.getByRole("article", { name: "Pijat Aromaterapi" });
  await card.getByRole("button", { name: "Simpan perawatan" }).click();
  await expect(card.getByRole("button", { name: "Hapus dari favorit" })).toHaveAttribute("aria-pressed", "true");
  await card.getByRole("button", { name: "Lihat detail" }).click();
  const detail = page.getByRole("dialog", { name: "Pijat Aromaterapi" });
  await expect(detail).toBeVisible();
  await detail.getByLabel("Durasi").selectOption("90");
  await expect(detail).toContainText("280.000");
  await detail.getByRole("button", { name: "Tutup" }).click();
  await page.reload();
  await expect(page.locator("#treatments").getByRole("article", { name: "Pijat Aromaterapi" }).getByRole("button", { name: "Hapus dari favorit" })).toHaveAttribute("aria-pressed", "true");
});

test("area and FAQ search show localized demo states", async ({ page }) => {
  await page.goto("/");
  await page.locator("#service-areas").getByRole("searchbox").fill("Bali");
  await expect(page.locator("#service-areas")).toContainText("Unavailable in demo");
  await expect(page.locator("#service-areas").getByRole("button", { name: /Bali/ })).toHaveCount(0);
  const faq = page.locator("#faq");
  await faq.getByRole("searchbox").fill("Are these real service areas");
  await expect(faq.locator("details")).toHaveCount(1);
  await faq.getByRole("searchbox").fill("no matching question phrase");
  await expect(faq).toContainText("No questions match");
});

test("detail booking carries the chosen treatment and duration into the request", async ({ page }) => {
  await page.goto("/");
  const card = page.locator("#treatments").getByRole("article", { name: "Aromatherapy Massage" });
  await card.getByRole("button", { name: "View details" }).click();
  const detail = page.getByRole("dialog", { name: "Aromatherapy Massage" });
  await detail.getByLabel("Duration").selectOption("90");
  await detail.getByRole("button", { name: "Book a session" }).click();
  const booking = page.getByRole("dialog", { name: "Make time for you." });
  await expect(booking.getByRole("button", { name: /Aromatherapy Massage/ })).toHaveAttribute("aria-pressed", "true");
  await booking.getByRole("button", { name: "Continue" }).click();
  await expect(booking.getByRole("button", { name: /90 min/ })).toHaveAttribute("aria-pressed", "true");
});

test("therapist preference starts with a compatible demo treatment", async ({ page }) => {
  await page.goto("/");
  const therapist = page.locator("#therapists").getByRole("article").filter({ hasText: "Sarah" });
  await therapist.getByRole("button", { name: "Request preference" }).click();
  const booking = page.getByRole("dialog", { name: "Make time for you." });
  await expect(booking.getByRole("button", { name: /Deep Tissue Massage/ })).toHaveAttribute("aria-pressed", "true");
  await expect(booking.locator(".booking-summary")).toContainText("Sarah");
});

test("all local visuals load when brought into view", async ({ page }) => {
  await page.goto("/");
  for (const image of await page.locator("img").all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0)).toBe(true);
  }
});

test("sharing image is a PNG", async ({ request }) => {
  const response = await request.get("/share-image");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("image/png");
  const image = await response.body();
  expect([...image.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
});
