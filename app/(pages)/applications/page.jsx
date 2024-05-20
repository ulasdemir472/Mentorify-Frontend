"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const { user } = useAuth();
  const { currentUser, fetchUserInfo } = useUserStore();

  const getApplications = async () => {
    try {
      const response = await fetch(
        `/api/mentees/applications?menteeId=${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 0 },
        }
      );

      const data = await response.json();
      console.log(data.data);
      setApplications(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getApplicants = async () => {
    try {
      const response = await fetch(
        `/api/mentors/applications?mentorId=${user.id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          next: { revalidate: 0 },
        }
      );

      const data = await response.json();
      console.log(data);
      setApplications(data.applicants);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user.role === "Mentee") {
      fetchUserInfo(user.id, user.role.toLowerCase());
      getApplications();
    } else {
      fetchUserInfo(user.id, user.role.toLowerCase());
      getApplicants();
    }
  }, []);

  return (
    <div className="max-w-screen-lg px-4 mx-auto py-8">
      <h1 className="font-extrabold text-2xl m-4">Başvurular</h1>
      <div id="aplications" className="flex flex-col gap-y-6 w-full">
        {applications.length > 0 ? (
          applications.map((application) => (
            <div
              id="application"
              key={application._id}
              className="flex justify-between items-center border rounded-lg py-4 px-4 w-full"
            >
              <div className="flex justify-center items-center gap-3">
                <Image
                  src="/avatar.png"
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <span className="font-medium text-base">
                  {application.name}{" "}
                  {application.surname ? application.surname : ""}
                </span>
              </div>
              <div className="flex justify-center items-center gap-3">
                {user.role === "Mentee" ? (
                  <span className="font-medium text-base">
                    {currentUser?.approvedMentors.includes(application._id)
                      ? "Onaylandı"
                      : "Onaylanmadı"}
                  </span>
                ) : (
                  <>
                    <button className="bg-green-600 rounded-lg text-white py-2 px-4">
                      Onayla
                    </button>
                    <button className="bg-red-500 rounded-lg text-white py-2 px-4">
                      Reddet
                    </button>
                  </>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center">
            Başvuru bulunamadı.
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
