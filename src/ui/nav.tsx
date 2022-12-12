import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "./logo";
import { Popover } from "@headlessui/react";
import { signIn } from "next-auth/react";
import { stat } from "fs";

export function Nav() {
  return (
    <div>
      <Popover className="relative bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/" className="flex items-center align-middle">
                <Logo className="mr-4 h-12 w-12" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold uppercase">
                    Hackability
                  </span>
                  <span className="text-sm uppercase text-green-600">
                    Space
                  </span>
                </div>
              </Link>
              <AvatarInfo />
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
      <div className="mx-auto max-w-7xl py-3 px-3 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex w-0 flex-1 items-center">
            <span className="flex rounded-lg bg-cyan-800 p-2">
              <InformationCircleIcon
                className="h-6 w-6 text-white"
                aria-hidden="true"
              />
            </span>
            <p className="ml-3 truncate text-sm font-medium text-white">
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

const AvatarInfo = () => {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex items-center justify-end md:flex-1 lg:w-0">
        <button
          className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
          onClick={() => signIn()}
        >
          Sign in
        </button>
      </div>
    );
  }

  const user = session?.user!;
  return (
    <div className="flex items-center justify-end md:flex-1 lg:w-0">
      <div>
        <Link href="/admin">
          <img
            className="h-10 w-10 rounded-full"
            src={user.image!}
            alt={user.name || "a user"}
          />
        </Link>
      </div>
      )
    </div>
  );
};
