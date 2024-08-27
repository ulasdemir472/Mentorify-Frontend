"use client";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Wishlist = () => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  const getWishlist = async () => {
    try {
      const response = await fetch(
        `/api/mentees/wishlist?menteeId=${user.id}`,
        {
          method: "GET",
        }
      );
      const res = await response.json();
      if (res.success) {
        setWishlist(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (mentorId) => {
    try {
      const response = await fetch(
        `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentorId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.success) {
        toast.success("Removed from wishlist");
        setWishlist(wishlist.filter((mentor) => mentor._id !== mentorId));
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-8">
      <div className="my-8">
        <h2 className="mb-4 font-extrabold text-lg">İstek Listesi</h2>
        <div className="sm:grid grid-cols-3 gap-8">
          {wishlist.map((mentor) => (
            <div key={mentor._id} className="col-span-1">
              <div className="border border-[#d0dce6] rounded-xl p-5 relative h-full flex flex-col justify-between">
                <span className="text-slate-900 text-xl font-bold">
                  {mentor.name} {mentor.surname}
                </span>
                <div className="my-4 ">
                  <div className="font-medium text-slate-900">
                    <Image
                      height={36}
                      width={36}
                      src={
                        mentor.image.includes("localhost")
                          ? "/avatar.png"
                          : mentor.image
                      }
                      alt="Alessandro Liparoti"
                      className="inline rounded-full mr-2 align-bottom"
                    />
                    <span className="text-md">{mentor.jobTitle}</span>
                  </div>
                </div>
                <div className="mt-6 gap-x-3 flex">
                  <a
                    href={`/mentor-profile/${mentor._id}`}
                    className="px-4 py-2 text-white bg-[#1c3d7a] rounded-md"
                  >
                    Profile git
                  </a>
                  <button
                    className="px-4 py-2 border hover:bg-red-500 hover:text-white rounded-md"
                    onClick={() => removeWishlist(mentor._id)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div>
            <a
              href="/dashboard"
              className="relative block w-full h-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-12 py-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-transparent"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Find more mentors
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
