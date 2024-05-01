"use client";
import { useAuth } from "@/contexts/AuthContext";
import { extractTime } from "@/utils/extractTime";
import useConversation from "@/zustand/useConversation";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import React from "react";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { selectedConversation } = useConversation();
  const { currentUser } = useUserStore();

  const fromMe = message.senderId === user.id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "items-end" : "";
  const bubbleBgColor = fromMe ? "bg-indigo-500" : "bg-gray-700";
  const shakeClass = message.shouldShake ? "shake" : "";

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
            {/* <div className="group relative my-2.5">
              <div className="absolute w-full h-full bg-gray-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg flex items-center justify-center">
                <button
                  data-tooltip-target="download-image"
                  className="inline-flex items-center justify-center rounded-full h-10 w-10 bg-white/30 hover:bg-white/50 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50"
                >
                  <svg
                    className="w-5 h-5 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 16 18"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"
                    />
                  </svg>
                </button>
                <div
                  id="download-image"
                  role="tooltip"
                  className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                >
                  Download image
                  <div className="tooltip-arrow" data-popper-arrow></div>
                </div>
              </div>
              <img src="/docs/images/blog/image-2.jpg" className="rounded-lg" />
            </div> */}
            <span className="text-sm font-normal text-gray-500 dark:text-slate-200">
              Delivered
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
