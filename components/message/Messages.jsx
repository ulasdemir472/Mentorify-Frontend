"use client";
import useGetMessages from "@/hooks/useGetMessages";
import React, { useEffect, useRef } from "react";
import Message from "./Message";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import useListenMessages from "@/hooks/useListenMessages";

const Messages = () => {
  const endRef = useRef();
  const { messages, loading } = useGetMessages();
  useListenMessages();

  useEffect(() => {
    setTimeout(() => {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="p-5 flex-1 flex gap-5 flex-col w-full overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={endRef}>
            <Message message={message} />
          </div>
        ))}
      {loading && [...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && messages.length === 0 && (
        <p className="text-center">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
