import React from "react";
import Sidebar from "@/components/message/Sidebar";
import MessageContainer from "@/components/message/MessageContainer";

const Messsages = () => {
  return (
    <div className="flex  w-full overflow-hidden">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Messsages;
