"use client";
import React from "react";
import { Tab } from "@headlessui/react";
import User from "./user";
import Billing from "./billing";
import Balance from "./balance";
import Password from "./password";

const tabs = ["Profile", "Billing", "Password"];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Profile = () => {
  return (
    <div className="w-full min-h-screen">
      <Tab.Group>
        <div className="hidden sm:flex px-[7.5rem] py-4 shadow-md w-full">
          <nav className="flex" aria-label="Tabs">
            <Tab.List className="flex w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 gap-8">
              {tabs.map((tab) => (
                <Tab
                  key={tab}
                  className={({ selected }) =>
                    cn(
                      "group inline-flex items-center border-b-2 py-2 px-1 text-md font-medium",
                      selected
                        ? "border-indigo-500 text-indigo-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    )
                  }
                >
                  {tab}
                </Tab>
              ))}
            </Tab.List>
          </nav>
        </div>
        <Tab.Panels className="max-w-screen-lg w-full mx-auto p-8 mb-12 mt-4 relative">
          <Tab.Panel className="w-full max-w-screen-lg xl:mx-auto">
            <User />
          </Tab.Panel>
          <Tab.Panel className="w-full max-w-screen-lg xl:mx-auto">
            <Billing />
          </Tab.Panel>
          <Tab.Panel className="w-full max-w-screen-lg xl:mx-auto">
            <Balance />
          </Tab.Panel>
          <Tab.Panel className="w-full max-w-screen-lg xl:mx-auto">
            <Password />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Profile;
