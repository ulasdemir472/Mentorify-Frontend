"use client";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useAuth } from "@/contexts/AuthContext";

const Sidebar = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const { user } = useAuth();

  const getChatUsers = async () => {
    try {
      const response = await fetch(`/api/messages/chats?id=${user.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setChatUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getChatUsers();
  }, []);

  return (
    <aside className="flex flex-col border-r border-gray-400 w-[20%] h-[50%] sticky top-0">
      <h1 className="p-4 text-bold shadow-md">Kişiler</h1>
      {chatUsers.map((user) => (
        <div
          className="flex flex-col gap-5 overflow-auto hover:bg-indigo-100"
          key={user._id}
        >
          <Conversation user={user} />
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
