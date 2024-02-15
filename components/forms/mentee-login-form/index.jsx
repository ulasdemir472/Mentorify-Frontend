import React from "react";
import Image from "next/image";
import GenericButton from "@/components/generic-button";

const LoginForm = ({ children }) => {
  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <form className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-700"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div>
              <GenericButton type="submit" className="w-full text-md">
                Login
              </GenericButton>
            </div>
          </form>
          <div className="relative my-4" x-show="tab === 'mentee'">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-solid border-0 border-t border-gray-300"></div>
            </div>

            <div className="relative flex justify-center text-gray-500">
              <span className="px-2 bg-white">Or</span>
            </div>
          </div>
          <a
            className="white-btn small w-full text-center"
            href="/auth/google/login/"
          >
            <div className="mx-auto border-2 px-3 py-1.5 rounded-md">
              <Image
                src="https://cdn.mentorcruise.com/img/logocloud/google-color.svg"
                className="align-middle inline h-4 mr-2"
                alt="Google"
                width={20}
                height={20}
              />
              <span className="text-gray-900 font-semibold">
                Log in with Google
              </span>
            </div>
          </a>
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
