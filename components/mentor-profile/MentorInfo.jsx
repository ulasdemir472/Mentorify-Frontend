import { useAuth } from "@/contexts/AuthContext";
import React from "react";
import { toast } from "react-toastify";

const MentorInfo = ({ mentor, currentUser }) => {
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

  return (
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
  );
};

export default MentorInfo;
