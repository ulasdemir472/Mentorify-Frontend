import Navbar from "@/components/navbar/Navbar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
