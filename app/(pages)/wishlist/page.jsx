import Image from "next/image";
import React from "react";

const Wishlist = () => {
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-8">
      <div className="my-8">
        <h2 className="mb-4 font-extrabold text-lg">İstek Listesi</h2>
        <div className="sm:grid grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="border border-[#d0dce6] rounded-xl p-5 relative h-full block">
              <a className="text-slate-900 text-xl font-bold" href="/">
                Alessandro Liparoti
              </a>
              <div className="my-4 ">
                <a href="/" className="font-medium text-slate-900">
                  <Image
                    height={28}
                    width={28}
                    src={"/avatar.png"}
                    alt="Alessandro Liparoti"
                    className="inline rounded-full mr-2 align-bottom"
                  />
                  <span className="text-md">Software Engineer at Meta</span>
                </a>
              </div>
              <div className="mt-6 gap-x-3 flex">
                <button className="px-4 py-2 text-white bg-[#1c3d7a] rounded-md">
                  Apply
                </button>
                <button className="px-4 py-2 border hover:bg-[#1c3d7a] hover:text-white rounded-md">
                  Unsave
                </button>
              </div>
            </div>
          </div>
          <div>
            <a
              href="/dashboard"
              className="relative block w-full h-full cursor-pointer rounded-lg border-2 border-dashed border-gray-300 px-12 py-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-transparent"
            >
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span className="mt-2 block text-sm font-medium text-gray-900">
                Find more mentors
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
