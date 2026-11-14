import { afterEach, describe, expect, it, vi } from "vitest";
import { createKannonClient, EmailSender } from "./kannon";

const config = {
  KANNON_DOMAIN: "k.hackability.it",
  KANNON_KEY: "test-key",
  KANNON_ALIAS: "Space Hackability",
  KANNON_EMAIL: "email@hackability.it",
};

function mockHttp(status = 201) {
  const fetch = vi.fn().mockResolvedValue(
    new Response(
      JSON.stringify(
        status === 201
          ? {
              id: "batch-test",
              accepted_count: 1,
              rejected_count: 0,
              scheduled_at: "2026-11-14T12:00:00Z",
            }
          : {
              type: "about:blank",
              title: "Unauthorized",
              status,
              code: "unauthorized",
            }
      ),
      { status }
    )
  );
  vi.stubGlobal("fetch", fetch);
  return fetch;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("welcome email REST integration", () => {
  it("posts the existing welcome template and personalization to the hosted v1 API", async () => {
    const fetch = mockHttp();
    vi.stubEnv("KANNON_HOST", "grpc.kannon.email:443");
    try {
      const sender = new EmailSender(createKannonClient(config));
      const receipt = await sender.sendWellcomeUserEmail(
        "user@example.com",
        "Ada"
      );
      expect(receipt.batchId).toBe("batch-test");
      expect(fetch).toHaveBeenCalledTimes(1);
      const [url, request] = fetch.mock.calls[0]!;
      expect(url).toBe(
        "https://api.kannon.email/v1/domains/k.hackability.it/batches"
      );
      expect(request.method).toBe("POST");
      expect(request.headers.Authorization).toBe("Bearer test-key");
      expect(request.headers["Content-Type"]).toBe("application/json");
      expect(JSON.parse(request.body)).toEqual({
        content: {
          type: "template",
          template_id: "template_cld2wru4b001v01ctu8393gqo@k.hackability.it",
        },
        from: { email: config.KANNON_EMAIL, name: config.KANNON_ALIAS },
        recipients: [{ email: "user@example.com", fields: { name: "Ada" } }],
        subject: "Wellcome in Space Hackability 🔨👨‍🦽!",
      });
    } finally {
      vi.unstubAllEnvs();
    }
  });

  it("supports a separate REST origin and adds exactly one version path", async () => {
    const fetch = mockHttp();
    await new EmailSender(
      createKannonClient({
        ...config,
        KANNON_REST_API_URL: "https://rest.example.com/",
      })
    ).sendWellcomeUserEmail("user@example.com", "Ada");
    expect(fetch.mock.calls[0]![0]).toBe(
      "https://rest.example.com/v1/domains/k.hackability.it/batches"
    );
  });

  it("propagates API failures to the account creation handler", async () => {
    mockHttp(401);
    await expect(
      new EmailSender(createKannonClient(config)).sendWellcomeUserEmail(
        "user@example.com",
        "Ada"
      )
    ).rejects.toThrow();
  });
});
