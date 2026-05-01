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
      : chatUsers.filter((user) =>
          user?.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <aside className="flex flex-col w-full md:w-[320px] lg:w-[380px] h-full bg-white border-r border-gray-100 shadow-sm z-10 transition-all duration-300">
      <div className="p-6 pb-4">
        <h1 className="text-2xl font-bold text-gray-800 tracking-tight mb-4">Mesajlar</h1>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            placeholder="Kişilerde ara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 sm:text-sm transition-all duration-200"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 space-y-1 scrollbar-hide">
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 mt-2">
          Son Sohbetler
        </div>
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <div key={user._id} className="group">
              <Conversation user={user} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
            <p className="text-sm text-gray-500 italic">Sonuç bulunamadı</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
