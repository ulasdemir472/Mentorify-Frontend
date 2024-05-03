"use client";
import React from "react";
import Image from "next/image";
import GenericButton from "@/components/generic-button";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

const MentorCard = ({ mentor }) => {
  const { user } = useAuth();

  const addWishlist = async () => {
    try {
      const response = await fetch(
        `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentor._id}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      console.log(data);
      if (data.success) {
        toast.success("Added to wishlist");
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  return (
    <div className="border py-8 px-7 flex rounded-lg w-[56rem]">
      <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-1/3 group">
        <Image
          src={mentor.image || "/avatar.png"}
          alt="mentor"
          width={200}
          height={300}
          className="rounded-lg object-cover absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <a
          href=""
          className="z-10 capitalize mt-3 text-3xl font-bold text-white cursor-pointer hover:underline opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"
        >
          {mentor.name} {mentor.surname}
        </a>
        <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
          {mentor.category}
        </div>
      </article>

      <div className="flex flex-col gap-3 pr-10 ml-10 w-full">
        <h1 className="font-bold text-2xl capitalize">
          {mentor.name} {mentor.surname}
        </h1>
        <h2 className="">
          Senior Front End Developer at{" "}
          <span className="font-bold inline">Elmalı Tech</span>
        </h2>
        <div className="flex items-center mb-4 text-yellow-300">
          <svg
            className="w-5 h-5 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <svg
            className="w-5 h-5 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
            style={{ clipPath: "inset(0 50% 0 0)" }}
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
          <span className="text-black font-md text-sm">
            <span className="font-bold">1.5</span> (10 reviews)
          </span>
        </div>
        <p className="my-6 text-sm leading-6 font-normal">{mentor.desc}</p>
        <div className="my-4">
          {mentor.interests.map((interest, index) => (
            <div className="py-2 flex flex-wrap items-center gap-3" key={index}>
              <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {interest}
              </span>
            </div>
          ))}
        </div>
        <div className="flex gap-10 w-full">
          <div className="flex flex-col w-1/3">
            <span className="text-gray-500 font-medium text-sm">
              Starting from
            </span>
            <span className="font-bold text-2xl">200$/month</span>
          </div>
          <GenericButton className="bg-indigo-500 w-full">
            View Profile
          </GenericButton>
          <GenericButton className="bg-indigo-500 w-full" onClick={addWishlist}>
            Add to Wishlist
          </GenericButton>
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
