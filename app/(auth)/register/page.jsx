"use client";
import MenteeRegisterForm from "@/components/forms/mentee-register-form";
import MentorLoginForm from "@/components/forms/mentor-login-form";
import { Tab } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "@/public/logo.svg";
import MentorRegisterForm from "@/components/forms/mentor-register-form";

const tabs = ["Mentee", "Mentor"];
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Register = () => {
  return (
    <div className="w-full min-h-screen flex flex-col md:flex-row">
      <div className="hidden md:block md:w-1/3">
        <section className="w-full h-full bg-indigo-900 min-h-screen flex">
          <div className="m-auto">
            <Link className="w-full" href="/" aria-label="Home">
              <Image
                width={300}
                height={300}
                src={Logo}
                priority={true}
                alt="Mentorify Logo White"
                className="bg-white rounded-full aspect-auto"
              />
            </Link>
          </div>
        </section>
      </div>
      <div className="flex flex-col justify-center items-center md:w-2/3">
        <div className="w-full flex justify-center mt-10">
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Kayıt ol
          </h2>
        </div>
        <Tab.Group>
          <div className="sm:flex justify-center">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <Tab.List className="flex w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 gap-5">
                  {tabs.map((tab) => (
                    <Tab
                      key={tab}
                      className={({ selected }) =>
                        cn(
                          "group inline-flex items-center border-b-2 py-4 px-1 text-sm font-medium",
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
          </div>
          <Tab.Panels>
            <Tab.Panel>
              <MenteeRegisterForm />
            </Tab.Panel>
            <Tab.Panel>
              <MentorRegisterForm />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default Register;
