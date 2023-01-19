import { type DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user?: {
      id: string;
      email: string;
      isAdmin: boolean;
      isAuthor: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    isAdmin: boolean;
    isAuthor: boolean;
    email: string;
    name: string;
  }
}
