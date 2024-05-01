"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import TextInput from "@/components/inputs/text-input";
import TextAreaInput from "@/components/inputs/text-area-input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MenteeRegisterForm = ({ children }) => {
  const [passType, setPassType] = useState(true);
  const router = useRouter();

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Password must include at least one lowercase and one uppercase character"
      )
      .required("Password is required"),
    desc: Yup.string()
      .max(1500, "Description must be maximum 1500 characters")
      .required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      desc: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    try {
      const response = await fetch("/api/auth/register/mentee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        next: { revalidate: 0 },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        toast.success("Registration successful", { autoClose: 500 });
        router.push("/login");
      } else {
        console.log(data);
        toast.error("Registration failed", { autoClose: 500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <TextInput formik={formik} name="name" label="Name" />
            {formik.errors[`name`] && formik.touched[`name`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`name`])}
              </span>
            )}
            <TextInput formik={formik} name="surname" label="Surname" />
            {formik.errors[`surname`] && formik.touched[`surname`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`surname`])}
              </span>
            )}
            <TextInput formik={formik} name="email" label="Email" />
            {formik.errors[`email`] && formik.touched[`email`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`email`])}
              </span>
            )}
            <div className="relative">
              <TextInput
                formik={formik}
                name="password"
                label="Password"
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

            <TextAreaInput formik={formik} name="desc" label="Description" />
            {formik.errors[`desc`] && formik.touched[`desc`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`desc`])}
              </span>
            )}
            <GenericButton type="submit" className="w-full">
              Sign up
            </GenericButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MenteeRegisterForm;
