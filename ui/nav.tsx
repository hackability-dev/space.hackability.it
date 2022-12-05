import { useUser } from "@auth0/nextjs-auth0/client";
import { Popover } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Logo } from "./logo";

export function Nav() {
  const { user, isLoading } = useUser();
  return (
    <div>
      <Popover className="relative bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center align-middle">

                <Logo className="h-12 w-12 mr-4" />
                <div className="flex flex-col">
                  <span className="uppercase text-sm font-semibold">
                    Hackability
                  </span>
                  <span className="uppercase text-sm text-green-600">
                    Space
                  </span>
                </div>

              </Link>
            </div>

            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              {user ? (
                <div>
                  <Link href="/admin">

                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.picture!}
                      alt={user.name || "a user"}
                    />

                  </Link>
                </div>
              ) : (
                <Link
                  href="/api/auth/login"
                  className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                  
                    Sign in
                  
                </Link>
              )}
            </div>
          </div>
        </div>
      </Popover>
      <Banner />
    </div>
  );
}

const Banner = () => {
  return (
    <div className="bg-cyan-600">
      <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between flex-wrap">
          <div className="w-0 flex-1 flex items-center">
            <span className="flex p-2 rounded-lg bg-cyan-800">
              <InformationCircleIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 font-medium text-white truncate text-sm">
              <span className="md:hidden">
                App in beta. Segnalare problemi su{" "}
                <a
                  className="underline underline-offset-2"
                  href="https://github.com/hackability-dev/space.hackability.it/issues"
                >
                  Github
                </a>
              </span>
              <span className="hidden md:inline">
                Questa applicazione e in fase di sviluppo (beta)! Per
                suggerimenti e informazioni usare{" "}
                <a
                  className="underline underline-offset-2"
                  href="https://github.com/hackability-dev/space.hackability.it/issues"
                >
                  Github
                </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
