"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.svg";
import GenericButton from "@/components/generic-button";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Dropdown from "../dropdown";
import { useUserStore } from "@/zustand/userStore";

const tabs = [
  { tr: "Ana Sayfa", en: "dashboard" },
  { tr: "Başvurular", en: "applications" },
  { tr: "Mesajlar", en: "messages" },
  { tr: "İstek Listesi", en: "wishlist" },
  { tr: "Ayarlar", en: "profile" },
];

const Navbar = () => {
  const logout = () => {
    Cookies.remove("session-user");
    Cookies.remove("token");
    window.location.href = "/";
  };

  const { currentUser } = useUserStore();

  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();
  const activeTabTr = tabs.find((tab) => tab.en === activeTab)?.tr;

  return (
    <nav className="w-full bg-[#172E59] text-white px-6 py-4 flex items-center space-x-10">
      <Image
        src={Logo}
        width={50}
        height={50}
        alt="Logo"
        className="flex rounded-lg bg-white cursor-pointer"
      />
      <div className="flex w-full">
        <ul className="flex justify-start w-full gap-8">
          {tabs.map((tab, index) => (
            <li
              key={index}
              className={
                "p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold" +
                " " +
                (activeTabTr === tab.tr ? "bg-[#1C3D7A]" : "")
              }
            >
              <a href={`/${tab.en}`}>{tab.tr}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex gap-3">
        <Dropdown user={currentUser} />
        <GenericButton type="button" onClick={() => logout()}>
          Çıkış
        </GenericButton>
      </div>
    </nav>
  );
};

export default Navbar;
