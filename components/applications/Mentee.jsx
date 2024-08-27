"use client";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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
      setApplications(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserInfo(user.id, user.role.toLowerCase());
    getApplications();
  }, []);

  return (
    <div className="max-w-screen-lg px-4 mx-auto py-8">
      <h1 className="font-extrabold text-2xl m-4">Başvurular</h1>
      <div id="aplications" className="flex flex-col gap-y-6 w-full">
        {applications.length > 0 ? (
          applications.map((application, index) => (
            <div
              id="application"
              key={index}
              className="flex justify-between items-center border rounded-lg py-4 px-4 w-full"
            >
              <div className="flex justify-center items-center gap-3 h-16">
                <Image
                  src={
                    application.image.includes("localhost")
                      ? "/avatar.png"
                      : application.image
                  }
                  alt="avatar"
                  width={50}
                  height={50}
                  className="rounded-full object-cover"
                />
                <span className="font-medium text-base">
                  {application.name} {application.surname}
                </span>
              </div>
              <div className="flex justify-center items-center gap-3">
                <span className="font-medium text-base">
                  {application.status === "approved" ? (
                    <div className="flex gap-3 items-center justify-center">
                      <span className="bg-green-600 text-white py-2 px-4 rounded-lg ">
                        Onaylandı
                      </span>
                      <button className="bg-white text-black border border-black rounded-lg px-4 py-2  hover:bg-black hover:text-white">
                        Ödeme yap
                      </button>
                    </div>
                  ) : application.status === "pending" ? (
                    <span className="bg-yellow-500 text-white py-2 px-4 rounded-lg ">
                      Onay bekleniyor
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white py-2 px-4 rounded-lg ">
                      Reddedildi
                    </span>
                  )}
                </span>
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
