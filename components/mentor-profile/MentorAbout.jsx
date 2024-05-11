import React from "react";

const MentorAbout = ({ mentor }) => {
  return (
    <div id="about">
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
  );
};

export default MentorAbout;
