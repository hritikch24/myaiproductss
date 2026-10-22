import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  testMatch: "phone-demo.spec.ts",
  outputDir: "/tmp/kraftai-phone-test-results",
  fullyParallel: false,
  workers: 1,
  use: { baseURL: process.env.PHONE_DEMO_BASE_URL || "http://127.0.0.1:3107", screenshot: "only-on-failure", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1440, height: 1000 } } },
    { name: "mobile", use: { ...devices["Pixel 7"], defaultBrowserType: "chromium" } },
  ],
  webServer: process.env.PHONE_DEMO_BASE_URL ? undefined : { command: "npm run dev -- --hostname 127.0.0.1 --port 3107", url: "http://127.0.0.1:3107/phone", reuseExistingServer: true, timeout: 120_000 },
});
