import { getConfigs } from "env-ts-conf";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const googleConfig = getConfigs({
  clientId: {
    type: "string",
    variableName: "GOOGLE_CLIENT_ID",
  },
  clientSecret: {
    type: "string",
    variableName: "GOOGLE_CLIENT_SECRET",
  },
});

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: googleConfig.clientId,
      clientSecret: googleConfig.clientSecret,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session: ({ session, token, user }) => {
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
