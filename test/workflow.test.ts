import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

describe("CI/CD Workflow Configuration", () => {
  const workflowPath = resolve(process.cwd(), ".github/workflows/deploy-firebase.yml");

  it("exists in the repository", () => {
    expect(existsSync(workflowPath)).toBe(true);
  });

  it("defines the expected triggers and branch constraints", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("push:");
    expect(content).toContain("pull_request:");
    expect(content).toContain("branches:\n      - main");
  });

  it("runs the full validation pipeline (lint, tsc, test, build)", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("npm run lint");
    expect(content).toContain("npx tsc --noEmit");
    expect(content).toContain("npm test");
    expect(content).toContain("npm run build:static");
  });

  it("restricts production deploy strictly to push on main branch", () => {
    const content = readFileSync(workflowPath, "utf-8");
    expect(content).toContain("if: github.event_name == 'push' && github.ref == 'refs/heads/main'");
    expect(content).toContain("channelId: live");
    expect(content).toContain("projectId: my-portfolio-874e7");
    expect(content).toContain("secrets.FIREBASE_SERVICE_ACCOUNT_MY_PORTFOLIO_874E7");
  });
});
