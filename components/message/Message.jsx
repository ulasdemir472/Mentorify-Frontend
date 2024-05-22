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
          `http://localhost:8800/api/v1/messages/messages/${message._id}/seen`,
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
    <div className="flex w-full">
      <div className={"flex flex-col gap-1 w-full " + chatClassName}>
        <Image
          className="w-8 h-8 rounded-full"
          src={
            fromMe
              ? currentUser?.image
                ? currentUser.image
                : "/avatar.png"
              : selectedConversation?.image
              ? selectedConversation.image
              : "/avatar.png"
          }
          alt="Bonnie Green image"
          width={32}
          height={32}
        />
        <div className={"flex flex-col gap-1 w-full " + chatClassName}>
          <div
            className={`flex flex-col w-full max-w-[326px] leading-1.5 p-4 border-gray-200 bg-gray-100 ${
              fromMe
                ? "rounded-l-xl rounded-b-xl"
                : "rounded-e-xl rounded-es-xl"
            }  ${bubbleBgColor} ${shakeClass}`}
          >
            <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {fromMe ? "You" : selectedConversation?.name}
              </span>
              <span className="text-sm font-normal text-gray-500 dark:text-white">
                {formattedTime}
              </span>
            </div>
            <p className={`text-md font-normal text-gray-900 dark:text-white`}>
              {message.message}
            </p>
            <span className="text-sm font-normal text-gray-500 dark:text-slate-200">
              {message.isSeen ? "Seen" : "Delivered"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
