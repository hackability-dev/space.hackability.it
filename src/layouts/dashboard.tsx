import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  FolderIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState, type FC, type ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Logo } from "../ui/logo";
import { UserMenu } from "../ui/user-menu";

const baseNav = [{ name: "Dashboard", href: "/dashboard", icon: HomeIcon }];

export const DashboardLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log("status", status);
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [router, status]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "unauthenticated") return <div>Loading...</div>;

  const user = session!.user!;

  function isCurrentPage(href: string) {
    return href === router.asPath;
  }

  const navigation = [...baseNav];
  if (user.isAuthor) {
    navigation.push({
      name: "I miei progetti",
      href: "/dashboard/projects",
      icon: FolderIcon,
    });
  }
  if (user.isAdmin) {
    navigation.push({
      name: "Admin",
      href: "/dashboard/admin",
      icon: BellIcon,
    });
  }

  return (
    <>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex flex-shrink-0 items-center px-4">
                <Logo className="h-8 w-auto" />
              </div>
              <div className="mt-5 h-0 flex-1 overflow-y-auto">
                <nav className="space-y-1 px-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={clsx(
                        isCurrentPage(item.href)
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "group flex items-center rounded-md py-2 px-2 text-base font-medium"
                      )}
                    >
                      <item.icon
                        className={clsx(
                          isCurrentPage(item.href)
                            ? "text-gray-500"
                            : "text-gray-400 group-hover:text-gray-500",
                          "mr-4 h-6 w-6 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </Transition.Child>
          <div className="w-14 flex-shrink-0">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-grow flex-col overflow-y-auto border-r border-gray-200 bg-white pt-5">
          <div className="flex flex-shrink-0 items-center px-4">
            <Logo className="h-8 w-auto" />
          </div>
          <div className="mt-5 flex flex-grow flex-col">
            <nav className="flex-1 space-y-1 px-2 pb-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={clsx(
                    isCurrentPage(item.href)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md py-2 px-2 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={clsx(
                      isCurrentPage(item.href)
                        ? "text-gray-500"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-6 w-6 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="md:pl-64">
        <div className="mx-auto flex max-w-4xl flex-col md:px-8 xl:px-0">
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
                <button
                  type="button"
                  className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <UserMenu />
              </div>
            </div>
          </div>

          <main className="flex-1">
            <div className="py-6">
              <div className="px-4 sm:px-6 md:px-0"></div>
              <div className="px-4 sm:px-6 md:px-0">{children}</div>
            </div>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
