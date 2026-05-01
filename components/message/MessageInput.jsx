"use client";
import React, { useState } from "react";
import { CameraIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext";
import useConversation from "@/zustand/useConversation";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const { messages, setMessages, selectedConversation } = useConversation();

  const { user } = useAuth();

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSend();
    }
  };

  const handleSend = async () => {
    try {
      const response = await fetch(
        `/api/messages?recieverId=${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text, senderId: user.id }),
        }
      );

      const res = await response.json();
      if (res.error) throw new Error(res.error);
      setMessages([...messages, res]);
      setText("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
      <div className="flex items-center">
        <label 
          htmlFor="file" 
          className="p-2 hover:bg-gray-100 rounded-full cursor-pointer transition-colors text-gray-500 hover:text-indigo-600"
        >
          <CameraIcon className="w-6 h-6" />
        </label>
        <input
          type="file"
          id="file"
          className="hidden"
          onChange={handleImg}
        />
      </div>
      
      <div className="flex-1 relative flex items-center">
        <input
          type="text"
          placeholder="Mesajınızı yazın..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyUp={handleKeyPress}
          className="w-full bg-gray-50 border-none rounded-2xl py-3 px-5 pr-12 focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all text-sm outline-none"
        />
        
        <button
          className={`absolute right-2 p-2 rounded-xl transition-all duration-200 
            ${text.trim() ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-100" : "bg-gray-200 text-gray-400 scale-90 cursor-not-allowed"}`}
          onClick={handleSend}
          disabled={!text.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
