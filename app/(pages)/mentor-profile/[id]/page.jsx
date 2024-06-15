"use client";
import MainFooter from "@/components/footer";
import Loading from "@/components/loading";
import MentorAbout from "@/components/mentor-profile/MentorAbout";
import MentorHeader from "@/components/mentor-profile/MentorHeader";
import MentorInfo from "@/components/mentor-profile/MentorInfo";
import MentorPrice from "@/components/mentor-profile/MentorPrice";
import MentorReview from "@/components/mentor-profile/MentorReview";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStore } from "@/zustand/userStore";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const MentorProfile = () => {
  const params = useParams();
  const [mentor, setMentor] = useState({});
  const { user } = useAuth();
  const { currentUser, fetchUserInfo } = useUserStore();
  const [loading, setLoading] = useState(true);

  const getMentor = async () => {
    try {
      const response = await fetch(`/api/mentors/mentor?id=${params.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      setMentor(data.data);
      if (user?.id) {
        await fetchUserInfo(user.id, user.role.toLowerCase());
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching mentor:", error);
    }
  };

  useEffect(() => {
    getMentor(params.id);
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="relative bg-[#1c3d7a] pt-8">
            <MentorHeader mentor={mentor} />
          </div>
          <MentorInfo mentor={mentor} currentUser={currentUser} />
          <hr className="my-12" />
          <div className="max-w-screen-xl mx-auto">
            <div className="w-full lg:w-1/2 xl:w-2/3 relative py-4 px-4 sm:px-8">
              <MentorPrice mentor={mentor} currentUser={currentUser} />
              <MentorAbout mentor={mentor} />
              <hr className="my-12" />
              <MentorReview mentor={mentor} currentUser={currentUser} />
            </div>
          </div>
          <MainFooter />
        </div>
      )}
    </div>
  );
};

export default MentorProfile;
