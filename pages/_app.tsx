import { withTRPC } from "@trpc/next";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    const url = "/api/trpc";
    return {
      url,
    };
  },
  ssr: false,
})(MyApp);
