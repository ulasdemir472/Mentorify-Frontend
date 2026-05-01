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
    <div className="flex flex-col flex-1 bg-gray-50/50 overflow-hidden h-full relative">
      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col w-full h-full bg-white shadow-2xl shadow-indigo-100/20">
          <MessageHeader selectedConversation={selectedConversation} />
          <div className="flex-1 overflow-hidden flex flex-col relative">
            <Messages />
          </div>
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
    <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-indigo-500">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-gray-800 mb-2">Hoş geldin, {currentUser?.name}! 👋</h3>
      <p className="text-gray-500 max-w-xs mx-auto">Sohbet etmeye başlamak için soldaki listeden birini seçebilirsin.</p>
    </div>
  );
};

export default MessageContainer;
