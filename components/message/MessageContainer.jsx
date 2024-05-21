"use client";
import React, { useEffect } from "react";
import useConversation from "@/zustand/useConversation";
import { useUserStore } from "@/zustand/userStore";
import { useAuth } from "@/contexts/AuthContext";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import MessageHeader from "./MessageHeader";

const MessageContainer = () => {
  const { selectedConversation, setSelectedConversation } = useConversation();

  useEffect(() => {
    // cleanup function (unmounts)
    return () => setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-gray-100 overflow-auto">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col w-full h-full">
          <MessageHeader selectedConversation={selectedConversation} />
          <Messages />
          <MessageInput />
        </div>
      )}
    </div>
  );
};

const NoChatSelected = () => {
  const { fetchUserInfo, currentUser } = useUserStore();
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      fetchUserInfo(user.id, user.role);
    }
  }, [fetchUserInfo, user]);

  return (
    <div className="flex items-center justify-center w-full h-full relative">
      <div className="absolute top-80 px-8 py-6 text-center sm:text-lg md:text-xl text-indigo-500 font-semibold flex flex-col items-center gap-2 border rounded-md border-indigo-500">
        <p>Welcome 👋 {currentUser?.name} ❄</p>
        <p>Select a chat to start messaging</p>
      </div>
    </div>
  );
};

export default MessageContainer;
