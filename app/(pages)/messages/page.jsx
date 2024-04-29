"use client";
import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect, useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/20/solid";

const Messsages = () => {
  const randomImageUrl = `https://i.pravatar.cc/200?u=${Math.random()}`;

  const endRef = useRef(null);

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col border-r border-gray-400 w-[20%]">
        <h1 className="p-4 text-bold shadow-md">Kişiler</h1>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd50]">
            <img
              src={randomImageUrl}
              alt="pp"
              className="w-[50px] h-[50px] object-cover rounded-lg"
            />
            <div className="flex flex-col gap-2.5">
              <span className="font-medium">Ulaş</span>
              <p className="text-sm font-light">Son Mesaj</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-5 p-5 cursor-pointer border-b border-[#dddddd50]">
            <img
              src={randomImageUrl}
              alt="pp"
              className="w-[50px] h-[50px] object-cover rounded-lg"
            />
            <div className="flex flex-col gap-2.5">
              <span className="font-medium">Ulaş</span>
              <p className="text-sm font-light">Son Mesaj</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-1 items-center justify-center bg-gray-100">
        {/* <div className="px-4 text-center sm:text-lg md:text-xl text-gray-500 font-semibold flex flex-col items-center gap-2">
          <p>Welcome 👋 Ulaş ❄</p>
          <p>Select a chat to start messaging</p>
        </div> */}
        <div className="flex p-5 justify-between border-b border-gray-500 w-full shadow-md">
          <div className="flex items-center gap-5">
            <img
              src={randomImageUrl}
              alt="p"
              className="w-[60px] h-[60px] object-cover rounded-lg"
            />
            <div className="flex flex-col gap-1">
              <span className="text-lg font-bold">Username</span>
              <p className="text-sm font-light color-[#a5a5a5]">
                Lorem ipsum dolor, sit amet.
              </p>
            </div>
          </div>
        </div>
        <div className="center p-5 flex-1 flex gap-5 flex-col w-full">
          <div className="flex w-full">
            <div className="flex flex-col gap-1 w-full items-end">
              {/* {message.img && <img src={message.img} alt="" />} */}
              <p className="p-5 rounded-lg bg-[#5183fe] w-1/3 text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad,
                tempore.
              </p>
              {/* <span>{message.createdAt.toDate()}</span> */}
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col gap-1 w-full">
              {/* {message.img && <img src={message.img} alt="" />} */}
              <p className="p-5 rounded-lg bg-[#5183fe] w-1/3 text-white">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad,
                tempore.
              </p>
              {/* <span>{message.createdAt.toDate()}</span> */}
            </div>
          </div>
          <div ref={endRef}></div>
        </div>
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
            className="flex flex-1 p-2 rounded-lg border outline-none focus:outline-none text-base focus:ring-2 focus:ring-[#5183fe]"
          />
          <button className="py-2 px-5 bg-[#5183fe] text-white rounded-md shadow-md border-none">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messsages;
