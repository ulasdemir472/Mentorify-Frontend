"use client";
import React, { useEffect, useState } from "react";
import GeneralSearch from "@/components/general-search";
import SelectSkills from "@/components/inputs/select-skills";
import MentorCard from "@/components/mentor-card";
import FilterPrice from "@/components/inputs/filter-price";

const Dashboard = () => {
  const [mentors, setMentors] = useState([]);

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

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 overflow-hidden container">
      <div className="w-full flex flex-col justify-start items-center border-b-2 shadow-sm">
        <div className="w-full flex gap-3 items-center justify-start py-10 px-8">
          <GeneralSearch className="w-1/3" />
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
        {mentors.length > 0 ? (
          mentors.map((mentor) => (
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
