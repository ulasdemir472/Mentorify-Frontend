"use client";
import Image from "next/image";
import React from "react";
import Logo from "@/public/logo.svg";
import GenericButton from "@/components/generic-button";
import Cookies from "js-cookie";

const Navbar = () => {
  const logout = () => {
    Cookies.remove("session-user");
    Cookies.remove("token");
    window.location.href = "/";
  };

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
          <li className="p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold">
            <a href="dashboard">Ana Sayfa</a>
          </li>
          <li className="p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold">
            <a href="applications">Başvurular</a>
          </li>
          <li className="p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold">
            <a href="messages">Mesajlar</a>
          </li>
          <li className="p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold">
            <a href="wishlist">İstek Listesi</a>
          </li>
          <li className="p-2 hover:bg-[#1C3D7A] rounded-md text-sm cursor-pointer font-bold">
            <a href="profile">Ayarlar</a>
          </li>
        </ul>
      </div>
      <div className="flex gap-3">
        <Image
          src={Logo}
          width={50}
          height={50}
          alt="Logo"
          className="flex rounded-lg bg-white cursor-pointer"
        />
        {/* Profil Fotosu */}
        <GenericButton type="button" onClick={() => logout()}>
          Çıkış
        </GenericButton>
      </div>
    </nav>
  );
};

export default Navbar;
