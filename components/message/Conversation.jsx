import { useSocketContext } from "@/contexts/SocketContext";
import useConversation from "@/zustand/useConversation";
import Image from "next/image";
import React from "react";

const Conversation = ({ user }) => {
  const { selectedConversation, setSelectedConversation, messages } =
    useConversation();

  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={
        "flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd50]" +
        (isSelected ? " bg-indigo-500 text-white" : "")
      }
      onClick={() => setSelectedConversation(user)}
    >
      {isOnline && <span className="w-4 h-4 rounded-full bg-green-500"></span>}
      <Image
        src={user.image || "/avatar.png"}
        alt="user-image"
        width={50}
        height={50}
        className="object-cover rounded-lg"
      />
      <div className="flex flex-col gap-2.5">
        <span className="font-medium">
          {user.name} {user.surname}
        </span>
        <p className="text-sm font-light">{isOnline ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
};

export default Conversation;
