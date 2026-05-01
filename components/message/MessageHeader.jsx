import React from "react";
import Image from "next/image";

const MessageHeader = ({ selectedConversation }) => {
  return (
    <div className="flex px-6 py-4 items-center justify-between border-b border-gray-100 w-full bg-white/80 backdrop-blur-md sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Image
            src={selectedConversation.image || "/avatar.png"}
            width={48}
            height={48}
            alt="profile"
            className="object-cover rounded-full border-2 border-indigo-50 shadow-sm"
          />
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm"></span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-bold text-gray-900 leading-tight">
            {selectedConversation.name} {selectedConversation.surname}
          </span>
          <span className="text-xs font-medium text-green-600">
            Çevrimiçi
          </span>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageHeader;
