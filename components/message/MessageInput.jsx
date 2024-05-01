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
    <div className="p-5 flex items-center justify-between mt-auto gap-5 w-full">
      <div className="flex gap-5">
        <label htmlFor="file">
          <CameraIcon className="w-5 h-5 cursor-pointer" alt="" />
        </label>
        <input
          type="file"
          id="file"
          style={{ display: "none" }}
          onChange={handleImg}
        />
      </div>
      <input
        type="text"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyUp={handleKeyPress}
        className="flex flex-1 p-2 rounded-lg border outline-none focus:outline-none text-base focus:ring-2 focus:ring-[#5183fe]"
      />
      <button
        className="py-2 px-5 bg-[#5183fe] text-white rounded-md shadow-md border-none"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
