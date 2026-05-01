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
    <div className="flex-1 overflow-y-auto px-6 py-4 scrollbar-hide bg-gray-50/30">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={endRef}>
            <Message message={message} />
          </div>
        ))}
      
      {loading && (
        <div className="space-y-4">
          {[...Array(5)].map((_, idx) => <MessageSkeleton key={idx} />)}
        </div>
      )}
      
      {!loading && messages.length === 0 && (
        <div className="h-full flex flex-col items-center justify-center opacity-40">
          <div className="w-16 h-16 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785 0.5 0.5 0 0 0 .565.753 4.483 4.483 0 0 0 1.515-.56c.422-.242.922-.306 1.393-.161.859.263 1.782.406 2.743.406h.142Z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-gray-500 tracking-tight">Henüz mesaj yok. İlk adımı sen at!</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
