import Head from "next/head";
import { FC } from "react";

const Layout: FC<{ title?: string }> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "hackability.space"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {children}
    </>
  );
};

export default Layout;
