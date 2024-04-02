"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import TextInput from "@/components/inputs/text-input";
import SelectCategory from "@/components/inputs/select-input";
import TagsWithBadges from "@/components/inputs/tags-w-badges";
import TextAreaInput from "@/components/inputs/text-area-input";
import {
  UserCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import handleFileChange from "@/lib/handle-file-change";
import { useRouter } from "next/navigation";

const MentorRegisterForm = ({ children }) => {
  const [profileimageView, setProfileimageView] = useState(null);
  const router = useRouter();
  const [passType, setPassType] = useState(true);

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
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      category: "",
      interests: [],
      desc: "",
      image: undefined,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      if (key !== "image") {
        formData.append(key, values[key]);
      }
    });
    formData.append("image", values.image);

    try {
      const response = await fetch("/api/auth/register/mentor", {
        method: "POST",
        headers: {
          "Cache-Control": "no-store",
        },
        next: { revalidate: 0 },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        toast.success("Registration successful", { autoClose: 500 });
        router.push("/");
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
            <label htmlFor="image" className="">
              <p className="block text-sm font-medium leading-5 text-gray-700">
                Profile image
              </p>
              {profileimageView ? (
                <img
                  src={profileimageView}
                  alt="profile image"
                  className="w-36 h-36 rounded-full object-cover"
                />
              ) : (
                <UserCircleIcon
                  className="h-36 w-36 text-gray-300"
                  aria-hidden="true"
                />
              )}
              <input
                type="file"
                key={profileimageView}
                onChange={async (e) => {
                  const readFile = await handleFileChange(e.target.files[0]);
                  readFile.file
                    ? toast.success("Profile image uploaded successfully", {
                        autoClose: 500,
                      })
                    : toast.error("image upload failed", { autoClose: 500 });

                  setProfileimageView(readFile.previewImage);

                  formik.setFieldValue("image", readFile.file);
                }}
                accept="image/jpeg, image/png"
                className="sr-only"
                name="image"
                id="image"
              />
              {!profileimageView && (
                <PlusCircleIcon
                  className="h-8 w-8 text-green-400"
                  aria-hidden="true"
                />
              )}
              {profileimageView && (
                <XCircleIcon
                  onClick={(e) => {
                    e.preventDefault();

                    setProfileimageView(null);

                    formik.setFieldValue("image", undefined);
                  }}
                  className="h-8 w-8 text-red-400"
                  aria-hidden="true"
                />
              )}
            </label>
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
            <SelectCategory formik={formik} label="Select Category" />
            <TagsWithBadges
              name="interests"
              formik={formik}
              label="Sub Category"
              placeholder="Select Sub Category"
            />
            <TextAreaInput
              formik={formik}
              name="desc"
              label="Description"
              placeholder="Talk about yourself..."
            />
            <GenericButton type="submit" className="w-full">
              Sign up
            </GenericButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MentorRegisterForm;
