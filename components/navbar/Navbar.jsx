"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Logo from "@/public/logo.svg";
import GenericButton from "@/components/generic-button";
import Cookies from "js-cookie";
import { usePathname } from "next/navigation";
import Dropdown from "../dropdown";
import { useUserStore } from "@/zustand/userStore";
import { useAuth } from "@/contexts/AuthContext";

const tabs = [
  { tr: "Ana Sayfa", en: "dashboard" },
  { tr: "Mesajlar", en: "messages" },
  { tr: "Başvurular", en: "applications" },
  { tr: "İstek Listesi", en: "wishlist" },
  { tr: "Ayarlar", en: "profile" },
];

const Navbar = () => {
  const logout = () => {
    Cookies.remove("session-user");
    Cookies.remove("token");
    window.location.href = "/";
  };

  const { user } = useAuth();
  const { currentUser } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();
  const activeTab = pathname.split("/").pop();
  const activeTabTr = tabs.find((tab) => tab.en === activeTab)?.tr;

  const filteredTabs =
    user.role === "Mentee" ? tabs : tabs.filter((tab) => tab.en !== "wishlist");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="w-full bg-[#172E59] text-white px-4 py-4 flex items-center justify-between flex-wrap">
      <div className="flex items-center flex-shrink-0 md:mr-3">
        <Image
          src={Logo}
          width={50}
          height={50}
          alt="Logo"
          className="flex rounded-lg bg-white cursor-pointer"
        />
      </div>
      <div className={`lg:hidden`}>
        <button
          className="flex items-center px-3 py-2 text-white"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="text-white"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1 18h22v-2H1v2zM1 11h22V9H1v2zm0-7h22V2H1v2z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col md:flex md:flex-row md:justify-start md:w-full gap-8 m-3">
          {filteredTabs.map((tab, index) => (
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
        <div className="flex gap-3 ml-auto">
          <Dropdown user={currentUser} />
          <GenericButton type="button" onClick={() => logout()}>
            Çıkış
          </GenericButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
