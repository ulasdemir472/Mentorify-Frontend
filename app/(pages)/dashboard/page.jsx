"use client";
import React, { useEffect, useState } from "react";
import GeneralSearch from "@/components/general-search";
import SelectSkills from "@/components/inputs/select-skills";
import MentorCard from "@/components/mentor-card";
import FilterPrice from "@/components/inputs/filter-price";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

const Dashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [input, setInput] = useState("");
  const [skills, setSkills] = useState([]);

  const fetchMentors = async () => {
    try {
      const response = await fetch("/api/mentors", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch mentors");
      }
      const data = await response.json();
      console.log(data.data);
      setMentors(data.data);
    } catch (error) {
      console.error("Error fetching mentors:", error);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  const filteredMentors =
    input === ""
      ? mentors
      : mentors.filter(
          (mentor) =>
            mentor?.name?.toLowerCase().includes(input.toLowerCase()) ||
            mentor?.category?.toLowerCase().includes(input.toLowerCase())
        );

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 overflow-hidden container">
      <div className="w-full flex flex-col justify-start items-center border-b-2 shadow-sm">
        <div className="w-full flex gap-3 items-center justify-start py-10 px-8">
          <div className="relative">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-indigo-500"
              aria-hidden="true"
            />
            <input
              type="text"
              className="bg-transparent ml-1 border border-1 border-gray-300 h-10 w-full px-8 py-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg rounded-lg shadow-sm"
              placeholder="Search..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full flex justify-start items-center pb-10 px-8 gap-5">
          <div className="">
            <SelectSkills />
          </div>
          <div className="">
            <FilterPrice />
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-8">
        {filteredMentors.length > 0 ? (
          filteredMentors.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))
        ) : (
          <p>No mentors found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
