"use client";
import React, { useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import { useUserStore } from "@/zustand/userStore";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import Messages from "./Messages";
import MessageInput from "./MessageInput";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <>
          <div className="flex p-5 justify-between border-b border-gray-500 w-full shadow-md">
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
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { fetchUserInfo, currentUser } = useUserStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchUserInfo(user.id);
    }
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-8 py-6 text-center sm:text-lg md:text-xl text-indigo-500 font-semibold flex flex-col items-center gap-2 border rounded-md border-indigo-500">
        <p>Welcome 👋 {currentUser?.name} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default MessageContainer;
