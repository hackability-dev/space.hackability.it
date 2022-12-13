import { Menu, Transition } from "@headlessui/react";
import clsx from "clsx";
import { signIn, signOut, useSession } from "next-auth/react";

interface NavLink {
  readonly type: "link";
  name: string;
  href: string;
}

interface NavAction {
  readonly type: "action";
  name: string;
  action: () => void;
}

const userNavigation: (NavLink | NavAction)[] = [
  { type: "link", name: "Dashbaord", href: "/dashboard" },
  { type: "action", name: "Sign out", action: () => signOut() },
];

export const UserMenu = () => {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
  if (status === "unauthenticated") {
    return (
      <button
        className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    );
  }
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full"
            src={session!.user!.image!}
            alt=""
          />
        </Menu.Button>
      </div>
      <Transition
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      ></Transition>
      <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        {userNavigation.map((item) => (
          <Menu.Item key={item.name}>
            {({ active }) => {
              if (item.type === "link") {
                return (
                  <a
                    href={item.href}
                    className={clsx(
                      active ? "bg-gray-100" : "",
                      "block py-2 px-4 text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </a>
                );
              } else {
                return (
                  <button
                    onClick={item.action}
                    className={clsx(
                      active ? "bg-gray-100" : "",
                      "block w-full py-2 px-4 text-left text-sm text-gray-700"
                    )}
                  >
                    {item.name}
                  </button>
                );
              }
            }}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Menu>
  );
};
