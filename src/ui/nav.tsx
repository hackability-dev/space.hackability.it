import { Popover } from "@headlessui/react";
import Link from "next/link";
import { Logo } from "./logo";
import { UserMenu } from "./user-menu";

export function Nav() {
  return (
    <div>
      <Popover className="relative bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between py-6 md:justify-start md:space-x-10">
            <div className="flex w-full items-center  justify-between lg:flex-1">
              <LogoLink />
              <UserMenu />
            </div>
          </div>
        </div>
      </Popover>
    </div>
  );
}

const LogoLink = () => {
  return (
    <Link href="/" className="flex items-center align-middle">
      <Logo className="mr-4 h-12 w-12" />
      <div className="flex flex-col">
        <span className="text-sm uppercase text-green-600">Space</span>
        <span className="text-sm font-semibold uppercase">Hackability</span>
      </div>
    </Link>
  );
};
