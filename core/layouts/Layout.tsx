import Head from "next/head";
import { FC } from "react";

const Layout: FC<{ title?: string }> = ({ title, children }) => {
  return <>{children}</>;
};

export default Layout;
