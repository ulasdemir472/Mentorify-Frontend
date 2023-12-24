"use client";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={() => router.back()}
            className="rounded-md bg-primaryGreen px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go to Last Page
          </button>
          <a href="#" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
