"use client";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useEffect } from "react";

const Dashboard = () => {
  const user = Cookies.get("session-user") || "";

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <>
      {user ? (
        <div>Login başarılı</div>
      ) : (
        <Link href="/login">Lütfen giriş yapınız</Link>
      )}
    </>
  );
};

export default Dashboard;
