/* This example requires Tailwind CSS v2.0+ */
import { useUser } from "@auth0/nextjs-auth0";
import { Popover, Transition } from "@headlessui/react";
import {
  BookmarkAltIcon,
  CalendarIcon,
  ChartBarIcon,
  ChevronDownIcon,
  CursorClickIcon,
  InformationCircleIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  RefreshIcon,
  ShieldCheckIcon,
  SupportIcon,
  ViewGridIcon,
  XIcon,
} from "@heroicons/react/outline";
import Link from "next/link";
import { Fragment } from "react";
import { Logo } from "./logo";

const navigation = [
  { name: "About us", href: "#", current: true },
  { name: "label", href: "#" },
  { name: "label", href: "#" },
];

const callsToAction = [
  { name: "Watch Demo", href: "#", icon: PlayIcon },
  { name: "Contact Sales", href: "#", icon: PhoneIcon },
];

const features = [
  {
    name: "Analytics",
    href: "#",
    description:
      "Get a better understanding of where your traffic is coming from.",
    icon: ChartBarIcon,
  },
  {
    name: "Engagement",
    href: "#",
    description: "Speak directly to your customers in a more meaningful way.",
    icon: CursorClickIcon,
  },
  {
    name: "Security",
    href: "#",
    description: "Your customers' data will be safe and secure.",
    icon: ShieldCheckIcon,
  },
  {
    name: "Integrations",
    href: "#",
    description: "Connect with third-party tools that you're already using.",
    icon: ViewGridIcon,
  },
  {
    name: "Automations",
    href: "#",
    description:
      "Build strategic funnels that will drive your customers to convert",
    icon: RefreshIcon,
  },
];

const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "#",
    icon: SupportIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "#",
    icon: BookmarkAltIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "#",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "#",
    icon: ShieldCheckIcon,
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Nav() {
  const { user, isLoading } = useUser();
  return (
    <div>
      <Popover className="relative bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center py-6 md:justify-start md:space-x-10">
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Link href="/">
                <a className="flex items-center align-middle">
                  <Logo className="h-12 w-12 mr-4" />
                  <div className="flex flex-col">
                    <span className="uppercase text-sm font-semibold">
                      Hackability
                    </span>
                    <span className="uppercase text-sm text-green-600">
                      Space
                    </span>
                  </div>
                </a>
              </Link>
            </div>

            <div className="flex items-center justify-end md:flex-1 lg:w-0">
              {user ? (
                <div>
                  <Link href="/admin">
                    <a>
                      <img
                        className="h-10 w-10 rounded-full"
                        src={user.picture!}
                        alt={user.name || "a user"}
                      />
                    </a>
                  </Link>
                </div>
              ) : (
                <Link href="/api/auth/login">
                  <a className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900">
                    Sign in
                  </a>
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
