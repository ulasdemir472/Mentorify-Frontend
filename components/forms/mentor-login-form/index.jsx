"use client";
import React from "react";
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

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
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

            <div>
              <TextInput
                formik={formik}
                name="password"
                label="Password"
                id="password"
                type="password"
              />
              {formik.errors[`password`] && formik.touched[`password`] && (
                <span className="error-message text-xs text-red-500">
                  {String(formik.errors[`password`])}
                </span>
              )}
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

          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
