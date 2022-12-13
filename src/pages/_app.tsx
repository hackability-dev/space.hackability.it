import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Head from "next/head";
import { UploadProvider } from "../providers/upload";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <AppHead />
      <UploadProvider>
        <SessionProvider session={session}>
          <Component {...pageProps} />
        </SessionProvider>
      </UploadProvider>
      <IubendaCookieBanner />
    </>
  );
};

export default trpc.withTRPC(MyApp);

const AppHead = () => (
  <Head>
    <meta name="description" content="Farmaceutica Younger" />
    <link
      rel="apple-touch-icon"
      sizes="57x57"
      href="/icon/apple-icon-57x57.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="60x60"
      href="/icon/apple-icon-60x60.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="72x72"
      href="/icon/apple-icon-72x72.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="/icon/apple-icon-76x76.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="114x114"
      href="/icon/apple-icon-114x114.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="120x120"
      href="/icon/apple-icon-120x120.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="144x144"
      href="/icon/apple-icon-144x144.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="152x152"
      href="/icon/apple-icon-152x152.png"
    />
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/icon/apple-icon-180x180.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="192x192"
      href="/icon/android-icon-192x192.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/icon/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="96x96"
      href="/icon/favicon-96x96.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/icon/favicon-16x16.png"
    />
    <link rel="manifest" href="/icon/manifest.json" />
    <meta name="msapplication-TileColor" content="#ec489a" />
    <meta name="msapplication-TileImage" content="/icon/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ec489a" />
  </Head>
);

const IubendaCookieBanner = () => {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  const script = `<script type="text/javascript">
  var _iub = _iub || [];
  _iub.csConfiguration = {"lang":"it","siteId":1591860,"whitelabel":false,"cookiePolicyId":58588882, "banner":{ "position":"top","textColor":"white","backgroundColor":"black" }};
  </script>
  <script type="text/javascript" src="//cdn.iubenda.com/cs/iubenda_cs.js" charset="UTF-8" async></script>`;
  return <div dangerouslySetInnerHTML={{ __html: script }}></div>;
};
