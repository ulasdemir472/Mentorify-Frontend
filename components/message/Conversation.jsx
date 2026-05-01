import { useSocketContext } from "@/contexts/SocketContext";
import useConversation from "@/zustand/useConversation";
import Image from "next/image";
import React from "react";

const Conversation = ({ user }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`flex items-center gap-4 p-4 cursor-pointer transition-all duration-200 rounded-xl mx-2 my-1
        ${isSelected 
          ? "bg-indigo-50 shadow-sm border-l-4 border-indigo-500 pl-3" 
          : "hover:bg-gray-50 border-l-4 border-transparent pl-3"
        }`}
      onClick={() => {
        setSelectedConversation(user);
      }}
    >
      <div className="relative flex-shrink-0">
        <Image
          src={user.image || "/avatar.png"}
          alt={`${user.name} profile`}
          width={48}
          height={48}
          className="object-cover rounded-full border-2 border-white shadow-sm"
        />
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white shadow-sm ring-2 ring-white"></span>
        )}
      </div>
      
      <div className="flex flex-col min-w-0 overflow-hidden">
        <span className={`text-sm font-semibold truncate ${isSelected ? "text-indigo-900" : "text-gray-900"}`}>
          {user.name} {user.surname}
        </span>
        <div className="flex items-center gap-1">
          <span className={`text-[11px] font-medium ${isOnline ? "text-green-600" : "text-gray-400"}`}>
            {isOnline ? "Aktif" : "Çevrimdışı"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Conversation;
