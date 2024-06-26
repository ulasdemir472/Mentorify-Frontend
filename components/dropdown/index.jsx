import React, { useEffect } from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { cn } from "@/utils/utils";
import Image from "next/image";
import { useUserStore } from "@/zustand/userStore";
import { useAuth } from "@/contexts/AuthContext";

const Dropdown = () => {
  const { user } = useAuth();
  const { currentUser, fetchUserInfo } = useUserStore();
  useEffect(() => {
    if (user?.id) {
      fetchUserInfo(user.id, user.role.toLowerCase());
    }
  }, []);
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            height={60}
            width={60}
            className="rounded-full h-10 object-cover"
            src={currentUser?.image || "/avatar.png"}
            alt="profile image"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <a
                href={
                  user.role === "Mentor"
                    ? `/mentor-profile/${user.id}`
                    : "/profile"
                }
                className={cn(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Profil
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <a
                href="#"
                className={cn(
                  active ? "bg-gray-100" : "",
                  "block px-4 py-2 text-sm text-gray-700"
                )}
              >
                Çıkış yap
              </a>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default Dropdown;
