import { expect, test } from "vitest";

test("all routes forbid framing and require declared content types", async () => {
  const previous = process.env.SKIP_ENV_VALIDATION;
  process.env.SKIP_ENV_VALIDATION = "1";

  try {
    const { default: config } = await import("./next.config.mjs");
    const rules = await config.headers();
    const globalRule = rules.find((rule) => rule.source === "/:path*");

    expect(globalRule).toBeDefined();
    expect(globalRule.has).toBeUndefined();
    expect(globalRule.missing).toBeUndefined();
    expect(globalRule.headers).toEqual(
      expect.arrayContaining([
        { key: "Content-Security-Policy", value: "frame-ancestors 'none'" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
      ])
    );
  } finally {
    if (previous === undefined) delete process.env.SKIP_ENV_VALIDATION;
    else process.env.SKIP_ENV_VALIDATION = previous;
  }
});
