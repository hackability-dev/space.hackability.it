"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { data } = useSession();
  const router = useRouter();
  const user = data?.user;
  useEffect(() => {
    if (!user?.isAdmin) {
      router.push("/dashboard");
    }
  }, [user?.isAdmin, router]);

  if (!user?.isAdmin) return <div>Loading...</div>;
  return children;
};

export default Layout;
