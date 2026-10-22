import { expect, test, type Page } from "@playwright/test";

async function navigate(page: Page, label: string) {
  const menu = page.getByRole("button", { name: "Open navigation", exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole("navigation", { name: "Workspace navigation" }).getByRole("button", { name: label }).click();
}

test("customer approval, repair and collection stay in sync and survive refresh", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  const requests: string[] = [];
  page.on("request", request => { if (request.method() !== "GET" && !request.url().includes("/_next/") && new URL(request.url()).origin === new URL(page.url()).origin) requests.push(request.url()); });
  await page.goto("/phone");
  await expect(page.getByRole("heading", { name: "A clearer day at the desk." })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Explore the journey" }).click();
  let dialog = page.getByRole("dialog");
  await expect(dialog.getByText("Awaiting approval", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Open customer preview" }).click();
  await page.getByRole("button", { name: "Approve sample quote" }).click();
  await expect(page.getByRole("heading", { name: "You're all set." })).toBeVisible();
  await page.getByRole("button", { name: "Back to repair desk" }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByRole("button", { name: "Start repair", exact: true }).click();
  await expect(dialog.getByText("In repair", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Complete repair & quality check" }).click();
  await dialog.getByRole("button", { name: "Open customer preview" }).click();
  await expect(page.getByRole("heading", { name: "Ready when you are." })).toBeVisible();
  await page.getByRole("button", { name: "Back to repair desk" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Mark as collected" }).click();
  await page.getByRole("dialog").getByRole("button", { name: "Open customer preview" }).click();
  await expect(page.getByRole("heading", { name: "Back in your hands." })).toBeVisible();
  await page.reload();
  await navigate(page, "Customer preview");
  await expect(page.getByRole("heading", { name: "Back in your hands." })).toBeVisible();
  expect(errors).toEqual([]);
  expect(requests).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test("inventory transfers update both stores and check-in creates a quotable repair", async ({ page }) => {
  await page.goto("/phone");
  await page.getByRole("button", { name: /^Open repairs/ }).click();
  await expect(page.getByRole("table").getByRole("row")).toHaveCount(8);
  await page.getByLabel("Search repairs").fill("No matching device");
  await expect(page.getByRole("heading", { name: "No repairs found" })).toBeVisible();
  await page.getByRole("button", { name: "Clear filters" }).click();
  await navigate(page, "Parts & stock");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
  await page.getByRole("button", { name: "Transfer iPhone 14 display", exact: true }).click();
  let dialog = page.getByRole("dialog");
  await dialog.getByLabel("From store").selectOption("Evesham");
  await dialog.getByLabel("To store").selectOption("Newark");
  await dialog.getByLabel("Quantity", { exact: true }).fill("2");
  await dialog.getByRole("button", { name: "Record sample transfer" }).click();
  const stockRow = page.getByRole("row").filter({ hasText: "iPhone 14 display" });
  await expect(stockRow.getByRole("cell").nth(2)).toHaveText("3");
  await expect(stockRow.getByRole("cell").nth(3)).toHaveText("2");
  await expect(page.getByText("TR-101", { exact: false })).toBeVisible();
  await navigate(page, "Repair desk");
  await page.getByRole("button", { name: "New repair", exact: true }).click();
  dialog = page.getByRole("dialog");
  await dialog.getByLabel("Sample customer name").fill("Taylor Sample");
  await dialog.getByLabel("What needs attention?").fill("Cracked display, sample repair");
  await dialog.getByRole("button", { name: "Create sample repair" }).click();
  dialog = page.getByRole("dialog");
  await expect(dialog.getByRole("heading", { name: "DP-1043" })).toBeVisible();
  await dialog.getByLabel("Labour price (£)").fill("35");
  await dialog.getByRole("button", { name: "Prepare sample quote" }).click();
  await expect(dialog.getByText("Awaiting approval", { exact: true })).toBeVisible();
  await dialog.getByRole("button", { name: "Open customer preview" }).click();
  await expect(page.getByRole("heading", { name: "Your quote is ready." })).toBeVisible();
  await expect(page.getByText("£114", { exact: true })).toBeVisible();
  await page.goto("/phone/customer");
  await expect(page.getByRole("heading", { name: "Your quote is ready." })).toBeVisible();
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});
