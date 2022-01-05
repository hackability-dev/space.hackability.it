import { withTRPC } from "@trpc/next";
import "../styles/globals.css";
import { AppRouter } from "./api/trpc/[trpc]";

function MyApp({ Component, pageProps }: any) {
  return <Component {...pageProps} />;
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
