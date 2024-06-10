"use client";
import React, { useEffect, useState } from "react";
import MentorCard from "@/components/mentor-card";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStore } from "@/zustand/userStore";
import MainFooter from "@/components/footer";
import Pagination from "@/components/pagination";
import { paginate } from "@/helpers/paginate";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [mentors, setMentors] = useState([]);
  const [input, setInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const { user } = useAuth();
  const { fetchUserInfo, currentUser } = useUserStore();

  useEffect(() => {
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
        console.log(data);
        if (data.success) {
          setMentors(data.data);
        }

        if (user?.id) {
          await fetchUserInfo(user.id, user.role.toLowerCase());
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
      }
    };

    fetchMentors();
  }, [user, fetchUserInfo]);

  console.log("currentUser : ", currentUser);

  const filteredMentors =
    input === ""
      ? mentors
      : mentors.filter(
          (mentor) =>
            mentor?.name?.toLowerCase().includes(input.toLowerCase()) ||
            mentor?.category?.toLowerCase().includes(input.toLowerCase()) ||
            mentor?.price >= parseInt(input) ||
            mentor?.interests.some((interest) =>
              interest.toLowerCase().includes(input.toLowerCase())
            )
        );

  const paginatedPosts = paginate(filteredMentors, currentPage, pageSize);

  const onPageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAIRecommendation = async () => {
    try {
      const response = await fetch("/api/mentors/ai-recommendation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mentee_id: currentUser._id,
          mentee_category: "Müzik",
          mentee_interests: ["Jazz", "Rock"],
        }),
      });

      const res = await response.json();
      if (res) {
        console.log(res);
        setMentors(res);
      }
    } catch (error) {
      toast.error(
        "AI önerisi alınırken bir hata çıktı. Lütfen tekrar deneyin veya destek ekibimizle iletişime geçin."
      );
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-5 overflow-hidden my-6">
      <div className="w-full flex flex-col justify-start items-center border-b-2 shadow-sm">
        <div className="w-full flex gap-8 items-center justify-start py-10 px-8">
          <div className="relative lg:w-[40%]">
            <MagnifyingGlassIcon
              className="pointer-events-none absolute left-3 top-3.5 h-5 w-5 text-indigo-500"
              aria-hidden="true"
            />
            <input
              type="text"
              className="bg-transparent ml-1 border border-1 border-gray-300 h-10 w-full px-8 py-6 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-lg rounded-lg shadow-sm"
              placeholder="İsim , Kategori veya Fiyat(üzeri) ara..."
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={handleAIRecommendation}
              className="bg-white text-indigp-500 px-2 py-4 rounded-lg flex gap-3 justify-center items-center shadow-lg border active:scale-90 transition-transform"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.6 5.613C7.91 5.466 6.98 4.874 6.484 3.7c-.179-.423-.304-.917-.384-1.5 0-.1-.1-.2-.2-.2s-.2.1-.2.2c-.08.583-.205 1.077-.384 1.5C4.821 4.874 3.891 5.466 2.2 5.613c-.1 0-.2.1-.2.2s.1.2.2.2c2.1.4 3.2 1.187 3.5 3.387 0 .1.1.2.2.2s.2-.1.2-.2c.3-2.2 1.4-2.987 3.5-3.387.1 0 .2-.1.2-.2s-.1-.2-.2-.2Z"
                  fill="url(#_1924317027__a)"
                ></path>
                <path
                  d="M19.469 11.865c-4-.8-5.726-2.73-6.526-6.629a.493.493 0 0 0-.474-.371.493.493 0 0 0-.475.376c-.009.006.007-.015 0 0-.8 4-2.625 5.824-6.525 6.624a.5.5 0 0 0 0 1c4 .8 5.717 2.687 6.517 6.587a.493.493 0 0 0 .483.413.493.493 0 0 0 .477-.387c-.005.01.006-.008 0 0 .8-4 2.623-5.813 6.523-6.613a.5.5 0 0 0 0-1Z"
                  fill="url(#_1924317027__b)"
                ></path>
                <path
                  d="M21.465 5.8c0-.084-.061-.14-.144-.156l-.056-.013c-1.168-.305-1.876-1.024-2.073-2.108a.153.153 0 0 0-.153-.153v.004c-.084 0-.14.062-.156.144l-.013.056c-.305 1.168-1.024 1.876-2.108 2.073a.153.153 0 0 0-.153.153h.004c0 .084.062.14.145.156l.055.013c1.168.305 1.876 1.024 2.073 2.108 0 .084.069.153.153.153v-.004c.084 0 .14-.062.156-.145l.014-.055c.304-1.168 1.023-1.876 2.107-2.073a.15.15 0 0 0 .15-.153Z"
                  fill="url(#_1924317027__c)"
                ></path>
                <path
                  d="M7.919 18.715c-1-.3-1.582-.782-1.782-1.782a.218.218 0 1 0-.436 0c-.3 1-.782 1.582-1.782 1.782a.218.218 0 0 0 0 .436c1 .3 1.582.782 1.782 1.782a.218.218 0 0 0 .436 0c.3-1 .782-1.582 1.782-1.782a.218.218 0 0 0 0-.436Z"
                  fill="url(#_1924317027__d)"
                ></path>
                <defs>
                  <linearGradient
                    id="_1924317027__a"
                    x1="-7.733"
                    y1="11.576"
                    x2="11.416"
                    y2="31.039"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#03A5AB"></stop>
                    <stop offset="1" stop-color="#8B3DFF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="_1924317027__b"
                    x1="-7.733"
                    y1="11.576"
                    x2="11.416"
                    y2="31.039"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#03A5AB"></stop>
                    <stop offset="1" stop-color="#8B3DFF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="_1924317027__c"
                    x1="-7.733"
                    y1="11.576"
                    x2="11.416"
                    y2="31.039"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#03A5AB"></stop>
                    <stop offset="1" stop-color="#8B3DFF"></stop>
                  </linearGradient>
                  <linearGradient
                    id="_1924317027__d"
                    x1="-7.733"
                    y1="11.576"
                    x2="11.416"
                    y2="31.039"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#03A5AB"></stop>
                    <stop offset="1" stop-color="#8B3DFF"></stop>
                  </linearGradient>
                </defs>
              </svg>
              AI ile Mentor öner
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto flex flex-col gap-8">
        {paginatedPosts.length > 0 ? (
          paginatedPosts.map((mentor) => (
            <MentorCard
              key={mentor._id}
              mentor={mentor}
              currentUser={currentUser}
              fetchUserInfo={fetchUserInfo}
            />
          ))
        ) : (
          <p>Mentor bulunamadı</p>
        )}
      </div>
      <Pagination
        items={filteredMentors.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={onPageChange}
      />
      <MainFooter />
    </div>
  );
};

export default Dashboard;
