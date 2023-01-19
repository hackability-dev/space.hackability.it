// @ts-check
import { z } from "zod";

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(["development", "test", "production", "build"]),
  NEXTAUTH_SECRET:
    process.env.NODE_ENV === "production"
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => process.env.VERCEL_URL ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    process.env.VERCEL ? z.string() : z.string().url()
  ),
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_APPLICATION_CREDENTIALS: z.string(),
  GS_BUCKET_NAME: z.string(),
  GS_BASE_FOLDER: z.string(),
  CLOUDINARY_BASE_FORLDER: z.string(),
  CLOUDINARY_KEY: z.string(),
  CLOUDINARY_SECRET: z.string(),
  CLOUDINARY_NAME: z.string(),

  // kannon
  KANNON_KEY: z.string(),
  KANNON_DOMAIN: z.string(),
  KANNON_EMAIL: z.string().email(),
  KANNON_ALIAS: z.string(),
  KANNON_HOST: z.string(),
});

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_APPLICATION_CREDENTIALS: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  GS_BUCKET_NAME: process.env.GS_BUCKET_NAME,
  GS_BASE_FOLDER: process.env.GS_BASE_FOLDER,
  CLOUDINARY_BASE_FORLDER: process.env.CLOUDINARY_BASE_FORLDER,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
  KANNON_KEY: process.env.KANNON_KEY,
  KANNON_DOMAIN: process.env.KANNON_DOMAIN,
  KANNON_EMAIL: process.env.KANNON_EMAIL,
  KANNON_ALIAS: process.env.KANNON_ALIAS,
  KANNON_HOST: process.env.KANNON_HOST,
};
