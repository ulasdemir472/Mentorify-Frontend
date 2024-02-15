"use client";
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import TextInput from "@/components/inputs/text-input";
import SelectCategory from "@/components/inputs/select-input";
import TagsWithBadges from "@/components/inputs/tags-w-badges";
import TextAreaInput from "@/components/inputs/text-area-input";

const MentorRegisterForm = ({ children }) => {
  const ValidationSchema = Yup.object().shape({
    username: Yup.string().required("Name is required"),
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
      username: "",
      surname: "",
      email: "",
      password: "",
      category: "",
      subCategory: [],
      desc: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (data.status === 200) {
        console.log(data);
      } else {
        console.log(data);
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
            <TextInput formik={formik} name="username" label="Name" />
            {formik.errors[`username`] && formik.touched[`username`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`username`])}
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
              name="subCategory"
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
