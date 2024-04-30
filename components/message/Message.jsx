"use client";
import { useAuth } from "@/contexts/AuthContext";
import { extractTime } from "@/utils/extractTime";
import React from "react";

const Message = ({ message }) => {
  const { user } = useAuth();

  const fromMe = message.senderId === user.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "items-end" : "";
  const bubbleBgColor = fromMe ? "bg-indigo-500" : "bg-gray-500";
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className="flex w-full">
      <div className={"flex flex-col gap-1 w-full " + chatClassName}>
        {/* {message.img && <Image src={message.img} alt="" width={} height={} />} */}
        <p
          className={`p-5 rounded-lg w-1/3 text-white ${bubbleBgColor} ${shakeClass}`}
        >
          {message.message}
        </p>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default Message;
