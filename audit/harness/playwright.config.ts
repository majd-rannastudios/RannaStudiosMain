import { defineConfig } from "@playwright/test";
import path from "path";

const REPO_ROOT = path.resolve(__dirname, "..", "..");

export default defineConfig({
  testDir: "./tests",
  outputDir: "./results/artifacts",
  timeout: 60_000,
  expect: { timeout: 10_000 },
  fullyParallel: false, // shares one Next.js server; avoid hammering it
  workers: 1,
  reporter: [["list"], ["json", { outputFile: "./results/playwright-report.json" }]],
  use: {
    baseURL: "http://localhost:3000",
    viewport: { width: 1280, height: 800 },
    ignoreHTTPSErrors: true,
  },
  webServer: {
    command: "pnpm start",
    cwd: REPO_ROOT,
    url: "http://localhost:3000",
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
