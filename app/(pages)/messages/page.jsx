import React from "react";
import Sidebar from "@/components/message/Sidebar";
import MessageContainer from "@/components/message/MessageContainer";

const Messsages = () => {
  return (
    <div className="min-h-screen flex w-full relative">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Messsages;
