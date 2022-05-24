import { withTRPC } from "@trpc/next";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
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
