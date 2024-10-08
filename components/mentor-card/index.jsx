"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import GenericButton from "@/components/generic-button";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { cn } from "@/utils/utils";
import Star from "../inputs/star";
import HalfStar from "../inputs/half-star";

const MentorCard = ({ mentor, currentUser }) => {
  const { user } = useAuth();
  const fullStars = Math.floor(mentor.rating);
  const hasHalfStar = mentor.rating - fullStars >= 0.5;

  const addWishlist = async () => {
    try {
      const response = await fetch(
        `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentor._id}`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Added to wishlist", { autoClose: 500 });
        window.location.reload();
        localStorage.setItem("scrollPosition", window.scrollY);
      } else {
        toast.error("Failed to add to wishlist");
      }
    } catch (error) {
      toast.error("Failed to add to wishlist");
    }
  };

  const removeWishlist = async () => {
    try {
      const response = await fetch(
        `/api/mentees/wishlist?menteeId=${user.id}&mentorId=${mentor._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Removed from wishlist", { autoClose: 500 });
        window.location.reload();
        localStorage.setItem("scrollPosition", window.scrollY);
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    const scrollPosition = localStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
      localStorage.removeItem("scrollPosition");
    }
  }, []);

  return (
    <div className="border py-8 px-7 flex flex-col md:flex md:flex-row rounded-lg w-full md:w-[56rem] gap-3">
      <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full md:w-1/3 group">
        <Image
          src={
            mentor.image.includes("localhost") ? "/avatar.png" : mentor.image
          }
          alt="mentor"
          width={200}
          height={300}
          className="rounded-lg object-cover absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
        <a
          href={`/mentor-profile/${mentor._id}`}
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
        <h2 className="text-lg">{mentor.jobTitle}</h2>
        <div className="flex items-center mb-4 text-yellow-300">
          {[...Array(fullStars)].map((_, index) => (
            <Star key={index} />
          ))}
          {hasHalfStar && <HalfStar />}
          <span className="text-black font-md text-sm">
            <span className="font-bold">{mentor.rating.toFixed(2)}</span> (
            {mentor?.reviews?.length} inceleme)
          </span>
        </div>
        <p className="my-6 text-sm leading-6 font-normal">{mentor.desc}</p>
        <div className="my-4 flex gap-3">
          {mentor.interests.map((interest, index) => (
            <div className="py-2 flex flex-wrap items-center gap-3" key={index}>
              <span className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                {interest}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5 lg:gap-10 lg:w-full lg:flex-row lg:h-14">
          <div className="flex flex-col w-1/3">
            <span className="text-gray-500 font-medium text-sm">Fiyat</span>
            <span className="font-bold text-2xl">{mentor.price}₺/ay</span>
          </div>
          <Link
            href={`/mentor-profile/${mentor._id}`}
            className="bg-indigo-500 w-full text-white flex items-center justify-center py-2 px-4 rounded-lg"
          >
            Profile git
          </Link>

          {currentUser?.wishlist?.includes(mentor._id) ? (
            <button
              onClick={removeWishlist}
              className="text-indigo-500 bg-white w-full border border-indigo-500 rounded-lg py-2 px-3 hover:bg-red-500 hover:text-white hover:border-red-500"
            >
              İstek listesinden çıkar
            </button>
          ) : (
            <GenericButton
              className={cn(
                "bg-indigo-500 w-full",
                user.role === "Mentor" ? "hidden" : ""
              )}
              onClick={addWishlist}
              //disabled={currentUser?.wishlist.includes(mentor._id) ? true : false}
            >
              İstek listesine ekle
            </GenericButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorCard;
