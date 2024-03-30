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
  const [profilePhotoView, setProfilePhotoView] = useState(null);
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
      photo: undefined,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    //values.photo = values.photo.name;
    try {
      const response = await fetch("/api/auth/register/mentor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store",
        },
        next: { revalidate: 0 },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.status === 200) {
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
            <label htmlFor="photo" className="">
              <p className="block text-sm font-medium leading-5 text-gray-700">
                Profile Photo
              </p>
              {profilePhotoView ? (
                <img
                  src={profilePhotoView}
                  alt="profile photo"
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
                key={profilePhotoView}
                onChange={async (e) => {
                  const readFile = await handleFileChange(e.target.files[0]);
                  readFile.file
                    ? toast.success("Profile Photo uploaded successfully", {
                        autoClose: 500,
                      })
                    : toast.error("Photo upload failed", { autoClose: 500 });

                  setProfilePhotoView(readFile.previewImage);

                  formik.setFieldValue("photo", readFile.file);
                }}
                accept="image/jpeg, image/png"
                className="sr-only"
                name="photo"
                id="photo"
              />
              {!profilePhotoView && (
                <PlusCircleIcon
                  className="h-8 w-8 text-green-400"
                  aria-hidden="true"
                />
              )}
              {profilePhotoView && (
                <XCircleIcon
                  onClick={(e) => {
                    e.preventDefault();

                    setProfilePhotoView(null);

                    formik.setFieldValue("photo", undefined);
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
            <TextInput formik={formik} name="password" label="Password" />
            {formik.errors[`password`] && formik.touched[`password`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`password`])}
              </span>
            )}
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
