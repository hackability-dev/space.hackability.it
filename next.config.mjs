import { withSuperjson } from "next-superjson";

// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */

!process.env.SKIP_ENV_VALIDATION && (await import("./src/env/server.mjs"));

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  output: "standalone",
  reactStrictMode: false,
  i18n: {
    locales: ["it"],
    defaultLocale: "it",
  },
};

export default withSuperjson()(config);
