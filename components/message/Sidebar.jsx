"use client";
import React, { useEffect, useState } from "react";
import Conversation from "./Conversation";
import { useAuth } from "@/contexts/AuthContext";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Sidebar = () => {
  const [chatUsers, setChatUsers] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useAuth();

  useEffect(() => {
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
    getChatUsers();
  }, [user.id]);

  const filteredUsers =
    query === ""
      ? chatUsers
      : chatUsers.filter(
          (user) =>
            user?.name.toLowerCase().includes(query.toLowerCase()) ||
            user?.surname.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <aside className="flex flex-col w-[20%] h-full overflow-auto scrollbar-thin scrollbar-thumb-gray scrollbar-track-gray">
      <h1 className="p-4 text-bold font-bold">Kişiler</h1>
      <div className="relative">
        <MagnifyingGlassIcon
          className="pointer-events-none absolute left-6 top-3.5 h-5 w-5 text-indigo-500"
          aria-hidden="true"
        />
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="bg-transparent ml-4 border border-1 border-gray-300 h-10 px-8 py-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg rounded-lg shadow-sm w-[90%]"
        />
      </div>
      <div className="w-full h-2 my-2 shadow-md" />
      {filteredUsers.map((user) => (
        <div className="flex flex-col gap-5 hover:bg-indigo-100" key={user._id}>
          <Conversation user={user} />
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
