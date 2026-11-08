// @ts-check
/**
 * This file is included in `/next.config.mjs` which ensures the app isn't built with invalid env vars.
 * It has to be a `.mjs`-file to be imported there.
 */
import { serverSchema } from "./schema.mjs";
import { env as clientEnv, formatErrors } from "./client.mjs";

/** @returns {import("zod").infer<typeof serverSchema>} */
const parseServerEnv = () => {
  // `next build` imports server modules while collecting page data, but server
  // secrets are only injected at runtime, so the image build skips validation.
  if (process.env.SKIP_ENV_VALIDATION) {
    return /** @type {any} */ (process.env);
  }

  const _serverEnv = serverSchema.safeParse(process.env);

  if (!_serverEnv.success) {
    console.error(
      "❌ Invalid environment variables:\n",
      ...formatErrors(_serverEnv.error.format())
    );
    throw new Error("Invalid environment variables");
  }

  for (let key of Object.keys(_serverEnv.data)) {
    if (key.startsWith("NEXT_PUBLIC_")) {
      console.warn("❌ You are exposing a server-side env-variable:", key);

      throw new Error("You are exposing a server-side env-variable");
    }
  }

  return _serverEnv.data;
};

export const env = { ...parseServerEnv(), ...clientEnv };
