import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";
import { EmailSender } from "../../../server/kannon";
import { KannonCli } from "kannon.js";
import { TelegramNotifier } from "../../../server/bot";

const kannon = new KannonCli(
  env.KANNON_DOMAIN,
  env.KANNON_KEY,
  {
    alias: env.KANNON_ALIAS,
    email: env.KANNON_EMAIL,
  },
  {
    host: env.KANNON_HOST,
  }
);
const sender = new EmailSender(kannon);

export const telegramNotifier = new TelegramNotifier(
  env.TELEGRAM_TOKEN,
  env.TELEGRAM_ADMIN_CHAT_ID
);

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.isAdmin = user.isAdmin;
        session.user.isAuthor = user.isAuthor;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  events: {
    createUser: async ({ user }) => {
      await sender.sendWellcomeUserEmail(user.email, user.name);
      await telegramNotifier.notifyUserCreated(user);
    },
  },
};

export default NextAuth(authOptions);
