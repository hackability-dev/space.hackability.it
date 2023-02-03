"use client";

import {
  BellIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useCallback,
  type ForwardRefExoticComponent,
  type SVGProps,
} from "react";

export const Navigation = () => {
  const navigation = useNavigation();
  const pathname = usePathname();
  const isCurrentPath = useCallback(
    (path: string) => {
      return path === pathname;
    },
    [pathname]
  );

  return (
    <nav className="flex-1 space-y-1 px-2 pb-4">
      {navigation.map((item, id) => {
        if (item.type === "link") {
          return (
            <Link
              key={id}
              href={item.href}
              className={clsx(
                isCurrentPath(item.href)
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                "group flex items-center rounded-md py-2 px-2 text-base font-medium"
              )}
            >
              <item.icon
                className={clsx(
                  isCurrentPath(item.href)
                    ? "text-gray-500"
                    : "text-gray-400 group-hover:text-gray-500",
                  "mr-4 h-6 w-6 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          );
        } else if (item.type === "section") {
          return (
            <div key={id} className="ml-3 pt-4 text-sm text-gray-700">
              <span>{item.name}</span>
            </div>
          );
        }
      })}
    </nav>
  );
};

function useNavigation(): Nav[] {
  const { data: session } = useSession();
  const navigation: Nav[] = [
    {
      type: "link",
      name: "Dashboard",
      href: "/dashboard",
      icon: HomeIcon,
    },
  ];

  const user = session?.user;
  if (!user) return navigation;

  if (user.isAuthor) {
    navigation.push({
      type: "link",
      name: "I miei progetti",
      href: "/dashboard/projects",
      icon: FolderIcon,
    });
  }
  if (user.isAdmin) {
    navigation.push({
      type: "section",
      name: "Admin",
    });
    navigation.push({
      type: "link",
      name: "Admin Projects",
      href: "/dashboard/admin/projects",
      icon: BellIcon,
    });
    navigation.push({
      type: "link",
      name: "Admin Users",
      href: "/dashboard/admin/users",
      icon: UsersIcon,
    });
  }

  return navigation;
}

interface LinkNav {
  readonly type: "link";
  name: string;
  href: string;
  icon: ForwardRefExoticComponent<SVGProps<SVGSVGElement>>;
}

interface SectionNav {
  readonly type: "section";
  name: string;
}

type Nav = LinkNav | SectionNav;
