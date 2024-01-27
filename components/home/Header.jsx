import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/logo.svg";

const Header = () => {
  return (
    <header className="py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="relative z-50 flex justify-between">
          <div className="flex items-center md:gap-x-12">
            <Link href="#" aria-label="Home">
              <Image src={Logo} width={100} height={100} alt="logo" />
            </Link>
            <div className="hidden md:flex md:gap-x-6">
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-indigo-100 hover:text-slate-900"
                href="#features"
              >
                Features
              </Link>
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-indigo-100 hover:text-slate-900"
                href="#testimonials"
              >
                Testimonials
              </Link>
              <Link
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-indigo-100 hover:text-slate-900"
                href="#pricing"
              >
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-x-5 md:gap-x-8">
            <div className="hidden md:block">
              <Link
                className="inline-block rounded-lg px-4 py-2 text-sm bg-indigo-600 text-white hover:bg-indigo-500"
                href="/login"
              >
                Sign in
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
