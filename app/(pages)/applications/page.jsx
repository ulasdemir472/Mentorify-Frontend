import Image from "next/image";
import React from "react";

const Applications = () => {
  return (
    <div className="max-w-screen-lg px-4 mx-auto py-8">
      <h1 className="font-extrabold text-2xl m-4">Başvurular</h1>
      <div id="aplications" className="flex flex-row gap-y-6 w-full">
        <div
          id="application"
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
            <span className="font-medium text-base">Cenk Aydın</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            <button className="bg-green-600 rounded-lg text-white py-2 px-4">
              Onayla
            </button>
            <button className="bg-red-500 rounded-lg text-white py-2 px-4">
              Reddet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
