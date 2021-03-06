import { getSession, getAccessToken } from "@auth0/nextjs-auth0";
import { PrismaClient } from "@prisma/client";
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { storage } from "./storage";
import { imageStorage } from "./cloudinary";

const db = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions) => {
  const session = getSession(req, res);
  return {
    req,
    res,
    db,
    storage,
    imageStorage,
    user: session?.user,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
