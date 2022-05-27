import { UserProvider } from "@auth0/nextjs-auth0";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "src/api/mod";
import "../styles/globals.css";
import superjson from "superjson";

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
      transformer: superjson,
    };
  },
  ssr: false,
})(MyApp);
