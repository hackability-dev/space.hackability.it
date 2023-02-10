"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { UserMenu } from "@ui/user-menu";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UploadProvider } from "src/providers/upload";
import { getBaseUrl, reactApi } from "src/utils/trpc";
import SuperJSON from "superjson";
import { DialogContainer } from "./dialog";
import { SideNav } from "./sidenav";
import { useSidebarStore } from "./sidenav.store";

const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  useProtectedRoute();
  const { status } = useSession();

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Loading...</div>;

  return (
    <>
      <SideNav />
      <div className="md:pl-64">
        <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
          <TopBar />
          <main className="flex-1">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-0"></div>
              <div className="px-4 sm:px-6 md:px-0">{children}</div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
      <DialogContainer />
    </>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() => createCli());
  return (
    <SessionProvider>
      <reactApi.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <UploadProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </UploadProvider>
        </QueryClientProvider>
      </reactApi.Provider>
    </SessionProvider>
  );
};

export default Layout;

const TopBar = () => {
  const setSidebarOpen = useSidebarStore((s) => s.setIsOpen);
  return (
    <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 border-b border-gray-200 bg-white">
      <button
        type="button"
        className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
        onClick={() => setSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      <div className="flex flex-1 justify-between px-4 md:px-0">
        <div className="flex flex-1"></div>
        <div className="ml-4 flex items-center md:ml-6">
          <UserMenu />
        </div>
      </div>
    </div>
  );
};

function useProtectedRoute() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log("status", status);
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);
}

function createCli() {
  return reactApi.createClient({
    links: [
      httpBatchLink({
        url: getBaseUrl() + "/api/trpc",
        headers() {
          return {};
        },
      }),
    ],
    transformer: SuperJSON,
  });
}
