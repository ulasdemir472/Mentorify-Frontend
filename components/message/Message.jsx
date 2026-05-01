"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useSocketContext } from "@/contexts/SocketContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import React, { useEffect } from "react";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { selectedConversation } = useConversation();
  const { currentUser } = useUserStore();

  const fromMe = message.senderId === user.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "items-end" : "";
  const bubbleBgColor = fromMe ? "bg-indigo-500" : "bg-gray-700";
  const shakeClass = message.shouldShake ? "shake" : "";

  useEffect(() => {
    if (!fromMe && !message.isSeen) {
      const markAsSeen = async () => {
        await fetch(
          `/api/v1/messages/messages/${message._id}/seen`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      };

      markAsSeen();
    }
  }, [message, fromMe]);

  return (
    <div className={`flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${fromMe ? "justify-end" : "justify-start"}`}>
      <div className={`flex max-w-[80%] md:max-w-[70%] ${fromMe ? "flex-row-reverse" : "flex-row"} items-end gap-2`}>
        <div className="flex-shrink-0 mb-1">
          <Image
            className="w-8 h-8 rounded-full border border-gray-100 shadow-sm object-cover"
            src={
              fromMe
                ? currentUser?.image || "/avatar.png"
                : selectedConversation?.image || "/avatar.png"
            }
            alt="profile"
            width={32}
            height={32}
          />
        </div>
        
        <div className={`flex flex-col ${fromMe ? "items-end" : "items-start"}`}>
          <div
            className={`px-4 py-2.5 shadow-sm ${
              fromMe
                ? "bg-indigo-600 text-white rounded-2xl rounded-tr-none"
                : "bg-white border border-gray-100 text-gray-800 rounded-2xl rounded-tl-none"
            } ${shakeClass}`}
          >
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.message}
            </p>
          </div>
          
          <div className="flex items-center gap-1.5 mt-1 px-1">
            <span className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">
              {formattedTime}
            </span>
            {fromMe && (
              <span className={`text-[10px] font-bold ${message.isSeen ? "text-indigo-500" : "text-gray-300"}`}>
                {message.isSeen ? "✓✓" : "✓"}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
