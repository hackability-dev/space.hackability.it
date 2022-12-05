import Head from "next/head";
import { FC, ReactNode } from "react";

const Layout: FC<{ title?: string; children: ReactNode }> = ({
  title,
  children,
}) => {
  return <>{children}</>;
};

export default Layout;
