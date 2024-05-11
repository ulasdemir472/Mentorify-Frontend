"use client";
import MainFooter from "@/components/footer";
import TagsWithBadges from "@/components/inputs/tags-w-badges";
import { useAuth } from "@/contexts/AuthContext";
import { useUserStore } from "@/zustand/userStore";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MentorProfile = () => {
  const params = useParams();
  const [mentor, setMentor] = useState({});
  const { user } = useAuth();
  const { currentUser, fetchUserInfo } = useUserStore();

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
    } catch (error) {
      console.error("Error fetching mentor:", error);
    }
  };

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
        toast.success("Added to wishlist");
        window.location.reload();
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
        toast.success("Removed from wishlist");
        window.location.reload();
      } else {
        toast.error("Failed to remove from wishlist");
      }
    } catch (error) {
      toast.error("Failed to remove from wishlist");
    }
  };

  useEffect(() => {
    getMentor(params.id);
  }, []);

  return (
    <>
      <div>
        <div className="relative bg-[#1c3d7a] pt-8">
          <div className="max-w-screen-xl mx-auto">
            <div className="-mt-12 w-full lg:w-1/2 xl:w-2/3 px-4 pb-8 align-bottom flex items-end">
              <div className="inline-block w-48 h-48 relative top-20 rounded-full overflow-hidden bg-white p-1 flex-none">
                <Image
                  className="w-full h-full rounded-full"
                  width={200}
                  height={200}
                  src={mentor.image || "/avatar.png"}
                  alt={mentor.name}
                />
              </div>
              <div className="hidden sm:inline-block ml-6 grow">
                <div className="flex items-end gap-x-4">
                  <div>
                    <div className="whitespace-nowrap text-sm text-slate-800 flex font-medium bg-teal-50 hover:bg-teal-100 duration-150 transition-all rounded-full px-4 py-2 cursor-default">
                      <svg
                        className="w-5 h-5 text-teal-700 align-middle mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      Quick Responder
                    </div>
                  </div>
                </div>
              </div>
              <div
                id="socials"
                className="flex-none flex items-end gap-x-6 pl-6 sm:pl-0"
              >
                <span>
                  <a target="_blank" href={mentor.linkedIn}>
                    <svg
                      className="h-6 w-6 text-white align-bottom cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M22.2283 0H1.77167C1.30179 0 0.851162 0.186658 0.51891 0.51891C0.186658 0.851162 0 1.30179 0 1.77167V22.2283C0 22.6982 0.186658 23.1488 0.51891 23.4811C0.851162 23.8133 1.30179 24 1.77167 24H22.2283C22.6982 24 23.1488 23.8133 23.4811 23.4811C23.8133 23.1488 24 22.6982 24 22.2283V1.77167C24 1.30179 23.8133 0.851162 23.4811 0.51891C23.1488 0.186658 22.6982 0 22.2283 0ZM7.15333 20.445H3.545V8.98333H7.15333V20.445ZM5.34667 7.395C4.93736 7.3927 4.53792 7.2692 4.19873 7.04009C3.85955 6.81098 3.59584 6.48653 3.44088 6.10769C3.28592 5.72885 3.24665 5.31259 3.32803 4.91146C3.40942 4.51032 3.6078 4.14228 3.89816 3.85378C4.18851 3.56529 4.55782 3.36927 4.95947 3.29046C5.36112 3.21165 5.77711 3.25359 6.15495 3.41099C6.53279 3.56838 6.85554 3.83417 7.08247 4.17481C7.30939 4.51546 7.43032 4.91569 7.43 5.325C7.43386 5.59903 7.38251 5.87104 7.27901 6.12481C7.17551 6.37857 7.02198 6.6089 6.82757 6.80207C6.63316 6.99523 6.40185 7.14728 6.14743 7.24915C5.893 7.35102 5.62067 7.40062 5.34667 7.395ZM20.4533 20.455H16.8467V14.1933C16.8467 12.3467 16.0617 11.7767 15.0483 11.7767C13.9783 11.7767 12.9283 12.5833 12.9283 14.24V20.455H9.32V8.99167H12.79V10.58H12.8367C13.185 9.875 14.405 8.67 16.2667 8.67C18.28 8.67 20.455 9.865 20.455 13.365L20.4533 20.455Z"
                        fill="white"
                      ></path>
                    </svg>
                  </a>
                </span>
                <span>
                  <a target="_blank" href={mentor.github}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 496 512"
                      className="h-6 w-6 text-white align-bottom cursor-pointer"
                    >
                      <path
                        fill="white"
                        d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                      />
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative pt-20">
            <div className="sm:grid sm:grid-cols-2 gap-x-8 px-4 sm:px-8">
              <div>
                <div className="inline-block sm:hidden mb-6">
                  <div className="flex items-end gap-x-4">
                    <div>
                      <div className="whitespace-nowrap text-sm text-slate-800 font-medium bg-teal-50 hover:bg-teal-100 duration-150 transition-all rounded-full px-4 py-2 cursor-default">
                        <svg
                          className="w-5 h-5 text-teal-700 align-middle mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                        Quick Responder
                      </div>
                    </div>
                  </div>
                </div>
                <h1 className="text-slate-900 font-bold text-2xl mb-1">
                  {mentor.name} {mentor.surname}
                </h1>
                <span className="inline-block font-medium text-slate-900 text-md leading-normal">
                  {mentor.jobTitle}
                </span>
                <br />
                <div className="mt-5 font-normal text-slate-600">
                  <span className="flex mb-2">
                    <svg
                      className="w-5 h-5 text-teal-600 align-sub mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span>
                      5.0 (
                      <a className="text-slate-600 underline">
                        {mentor.review?.length || 4} reviews
                      </a>
                      )
                    </span>
                  </span>
                  <span className="flex mb-2">
                    <svg
                      className="w-5 h-5 text-teal-600 align-sub mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Bugün aktif</span>
                  </span>
                  <span className="flex mb-2">
                    <svg
                      className="w-5 h-5 text-teal-600 align-sub mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                      <path
                        fillRule="evenodd"
                        d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>24 saat içinde cevap</span>
                  </span>
                </div>
                <div className="mt-5 flex gap-x-4">
                  <button
                    className="flex border small px-[15px] py-[7px] text-sm rounded-lg hover:bg-slate-100"
                    onClick={
                      currentUser?.wishlist.includes(mentor._id)
                        ? removeWishlist
                        : addWishlist
                    }
                  >
                    {currentUser?.wishlist?.includes(mentor._id) ? (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-rose-500 mr-1"
                        >
                          <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                        İstek Listesinde
                      </div>
                    ) : (
                      <div className="flex">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 mr-1"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                        İstek Listeme Ekle
                      </div>
                    )}
                  </button>
                </div>
              </div>
              <div className="hidden sm:block" id="short-tags">
                <div className="mb-5">
                  <h3 className="text-slate-900 font-semibold mb-2">Skills</h3>
                  <div className="flex gap-3">
                    {mentor.interests?.map((interest, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-x-0.5 rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-12" />
        <div className="max-w-screen-xl mx-auto">
          <div className="w-full lg:w-1/2 xl:w-2/3 relative py-4 px-4 sm:px-8">
            <div>
              <div className="my-8 lg:my-0 w-full sm:w-[420px] lg:left-[55%] xl:left-2/3 lg:fixed lg:top-[15%]">
                <div className="p-0 w-full h-fit" id="plan-float-b">
                  <div className="block rounded-2xl bg-white border-2 border-solid border-slate-300 overflow-hidden">
                    <div>
                      <div className="px-6 pt-6 pb-8">
                        <p className="text-4xl font-extrabold text-slate-900">
                          <span className="price-element">
                            {mentor.price || 100} ₺
                          </span>{" "}
                          <span className="text-xl">/ Ay</span>
                        </p>
                        <div className="mt-2 text-slate-900">
                          Herhangi bir seviyede kariyerinizde bir sonraki adımı
                          planlayın: mülakat hazırlığı, pazar araştırması,
                          strateji
                        </div>
                        <div className="flex flex-col">
                          <div className="mt-4 text-slate-900">
                            <p className="mb-2 flex">
                              <svg
                                className="w-5 h-5 mr-1 align-sub text-teal-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                  d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                                ></path>
                              </svg>
                              <span>İstediğin gibi mesajlaş</span>
                            </p>
                            <p className="mb-2 flex cursor-pointer">
                              <svg
                                className="w-5 h-5 mr-1 align-sub text-teal-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                                ></path>
                              </svg>
                              24 saat içinde cevap
                            </p>
                            <p className="mb-2 flex cursor-pointer">
                              <svg
                                className="w-5 h-5 mr-1 align-sub text-teal-600"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                              >
                                <path
                                  clipRule="evenodd"
                                  fillRule="evenodd"
                                  d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                ></path>
                                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z"></path>
                              </svg>
                              Elle destek
                            </p>
                          </div>
                          <div className="mt-8 w-full flex flex-col">
                            <a
                              className="bg-[#118577] px-4 py-2 rounded-lg text-white w-full text-center"
                              href="/"
                            >
                              Başvur
                            </a>
                            <div className="mt-2 text-sm flex flex-col">
                              <span className="mt-2 text-slate-600 flex">
                                <svg
                                  className="w-5 h-5 align-sub text-slate-500 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  ></path>
                                </svg>
                                Mentorunla anlaş
                              </span>
                              <span className="mt-2 text-slate-600 flex">
                                <svg
                                  className="w-5 h-5 align-sub text-slate-500 mr-1"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth={1.5}
                                  viewBox="0 0 24 24"
                                  xmlns="http://www.w3.org/2000/svg"
                                  aria-hidden="true"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  ></path>
                                </svg>
                                Kolay iletişim!
                              </span>
                              <span className="mt-2 text-slate-600 flex">
                                <svg
                                  className="w-5 h-5 align-sub text-slate-500 mr-1"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                Sadece 2 kişilik yer kaldı!
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-slate-900 font-bold text-2xl mb-1" id="bio">
                About
              </h2>
              <div className="mt-5">
                <div className="inline-block">
                  <div className="text-black overflow-hidden leading-normal text-lg">
                    <p>{mentor.desc}</p>
                  </div>
                </div>
              </div>
              <div
                className="rounded-lg bg-slate-100 my-6 px-4 py-5 flex gap-x-4 text-slate-700"
                id="inquiry-banner"
              >
                <div className="flex-none">
                  <svg
                    className="w-5 h-5 m-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="font-bold ">Sorulara açık</p>
                  <p className="text-sm">
                    Önceden {mentor.name} ile iletişim kurabilirsin.
                  </p>
                  <a
                    href="/messages"
                    className="px-4 py-2 rounded-md border mt-3 sm:hidden"
                  >
                    Mesajlaş
                  </a>
                </div>
                <div className="flex-none self-center hidden sm:block">
                  <a href="/messages" className="px-4 py-2 rounded-md border">
                    Mesajlaş
                  </a>
                </div>
              </div>
            </div>
            <hr className="my-12" />
            <div className="mt-6 md:mb-14" id="reviews">
              <div className="flex">
                <div>
                  <h2
                    className="text-slate-900 font-bold text-2xl mb-1"
                    id="bio"
                  >
                    {"Mentee'ler neler diyor?"}
                  </h2>
                </div>
              </div>
              <div id="testimonial_list">
                <div className="py-10 border-0 border-solid border-b border-gray-200">
                  <div className="flex text-sm text-gray-500 space-x-4">
                    <div className="flex-none">
                      <Image
                        src="https://cdn.mentorcruise.com/cache/20d0ceea17f45e5172a60eceaa7875c3/352b150bb0acbb75/81ccbb017fa36763824deab42ca509aa.jpg"
                        alt="Peter"
                        width={40}
                        height={40}
                        className="bg-gray-100 rounded-full"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 inline">Cenk</h3>
                      <div className="sm:grid sm:grid-cols-2">
                        <div className="flex gap-x-2">
                          <div className="flex items-center mt-1">
                            <svg
                              className="text-teal-600 h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>

                            <svg
                              className="text-teal-600 h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>

                            <svg
                              className="text-teal-600 h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>

                            <svg
                              className="text-teal-600 h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>

                            <svg
                              className="text-teal-600 h-5 w-5 flex-shrink-0"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                          </div>
                          <p className="sr-only">5 out of 5 stars</p>
                          <time className="mt-1.5" datetime="2024-05-05">
                            May 5, 2024
                          </time>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 max-w-none text-slate-900">
                    <p className="text-lg">
                      Ulaş gerçekten olağanüstü biri; masaya sürekli olarak taze
                      ve yenilikçi fikirler getiriyor. Ayrıca yeni konseptlerin
                      geliştirilmesinde paha biçilmez bir yardım sunuyor ve
                      olağanüstü bir akıl hocası olarak hizmet veriyor. Sizi,
                      mükemmellik için çok önemli bir nitelik olan kalıpların
                      dışında düşünmeye teşvik eder.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MainFooter />
    </>
  );
};

export default MentorProfile;
