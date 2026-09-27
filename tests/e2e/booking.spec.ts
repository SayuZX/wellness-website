import { expect, test } from "@playwright/test";

test("eight step demo request prepares a WhatsApp message without claiming confirmation", async ({ page }) => {
  await page.clock.setFixedTime(new Date("2026-09-28T01:00:00Z"));
  await page.goto("/");
  await page.getByRole("button", { name: "Book a session" }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: /Swedish Relaxation Massage/ }).click();
  await dialog.getByRole("button", { name: "Continue" }).click();
  await dialog.getByRole("button", { name: /90 min/ }).click();
  await expect(dialog.locator(".summary-total")).toContainText("250.000");
  await dialog.getByRole("button", { name: "Continue" }).click();
  await dialog.getByRole("button", { name: /South Jakarta/ }).click();
  await dialog.getByRole("button", { name: "Continue" }).click();
  await dialog.getByLabel("Preferred date").fill("2026-10-01");
  await expect(dialog.locator('button[name="time"]')).toHaveCount(8);
  await expect(dialog.locator('button[name="time"][value="12:00"]')).toBeDisabled();
  await dialog.locator('button[name="time"][value="10:30"]').click();
  await dialog.getByRole("button", { name: "Continue" }).click();
  await dialog.getByRole("button", { name: "No preference" }).click();
  await dialog.getByRole("button", { name: "Continue" }).click();
  await dialog.getByLabel("Full name").fill("Ayu Test");
  await dialog.getByLabel("Full service address").fill("Test street 10, South Jakarta");
  await dialog.getByRole("checkbox").check();
  await dialog.getByRole("button", { name: "Continue" }).click();
  await expect(dialog).toContainText("Review request");
  await dialog.getByRole("button", { name: "Prepare message" }).click();
  await expect(dialog).toContainText("Your request is ready to be sent via WhatsApp.");
  await expect(dialog.getByLabel("Request text preview")).toContainText("Swedish Relaxation Massage");
  await expect(dialog.getByLabel("Request text preview")).toContainText("Ayu Test");
  await expect(dialog.getByRole("button", { name: "WhatsApp not configured" })).toBeDisabled();
  await expect(dialog).not.toContainText("Booking confirmed");
});

test("language changes inside the open booking dialog", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Book a session" }).first().click();
  const dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "ID", exact: true }).click();
  await expect(dialog).toContainText("Langkah 1 dari 8");
  await expect(dialog.getByRole("heading", { name: "Luangkan waktu untuk Anda." })).toBeVisible();
  await dialog.getByRole("button", { name: "Tutup" }).click();
  await expect(page.locator(".demo-banner")).toContainText("Pratinjau wellness interaktif");
});
