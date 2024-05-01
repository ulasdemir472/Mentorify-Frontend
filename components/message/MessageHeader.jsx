import React from "react";
import Image from "next/image";

const MessageHeader = ({ selectedConversation }) => {
  return (
    <div className="flex p-5 justify-between border-b border-gray-400 w-full shadow-md bg-slate-200">
      <div className="flex items-center gap-5">
        <Image
          src={selectedConversation.image || "/avatar.png"}
          width={60}
          height={60}
          alt="p"
          className="object-cover rounded-lg"
        />
        <div className="flex flex-col gap-1">
          <span className="text-lg font-bold">
            {selectedConversation.name} {selectedConversation.surname}
          </span>
          <p className="text-sm font-light color-[#a5a5a5]">
            {selectedConversation.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
