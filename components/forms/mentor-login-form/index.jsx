"use client";
import React, { useState } from "react";
import Image from "next/image";
import GenericButton from "@/components/generic-button";
import { useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/inputs/text-input";
import { authorize } from "@/lib/authorize";
import { useAuth } from "@/contexts/AuthContext";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = ({ children }) => {
  const { user, setIsAuthenticated, setUser, token, setToken } = useAuth();
  const router = useRouter();
  const [passType, setPassType] = useState(true);

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      login(values);
    },
  });

  const login = async (values) => {
    try {
      const response = await authorize(values);
      console.log(response);
      if (response.status) {
        setIsAuthenticated(true);
        setUser(response.user);
        setToken(response.token);
        await Cookies.set("session-user", JSON.stringify(response.user));
        await Cookies.set("token", JSON.stringify(response.token));
        toast.success("Login successful", { autoClose: 500 });
        router.push("/dashboard");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("USER ", user);
      console.log("TOKEN ", token);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div>
              <TextInput
                formik={formik}
                name="email"
                label="Email"
                id="email"
              />
              {formik.errors[`email`] && formik.touched[`email`] && (
                <span className="error-message text-xs text-red-500">
                  {String(formik.errors[`email`])}
                </span>
              )}
            </div>

            <div className="relative">
              <TextInput
                formik={formik}
                name="password"
                label="Şifre"
                type={passType ? "password" : "text"}
              />
              <div
                onClick={() => setPassType(!passType)}
                className="rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer absolute right-2 top-[1.9rem]"
                htmlFor="toggle"
              >
                {passType ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                )}
              </div>
              {formik.errors[`password`] && formik.touched[`password`] && (
                <span className="error-message text-xs text-red-500">
                  {String(formik.errors[`password`])}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  onChange={formik.handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-3 block text-sm leading-6 text-gray-700"
                >
                  Beni hatırla
                </label>
              </div>

              <div className="text-sm leading-6">
                <a
                  href="#"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                >
                  Şifreni mi unuttun?
                </a>
              </div>
            </div>
            <div>
              <GenericButton type="submit" className="w-full text-md">
                Giriş yap
              </GenericButton>
            </div>
          </form>

          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
