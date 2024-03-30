import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import TextInput from "@/components/inputs/text-input";
import TextAreaInput from "@/components/inputs/text-area-input";
import {
  UserCircleIcon,
  PlusCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
import handleFileChange from "@/lib/handle-file-change";
import { useRouter } from "next/navigation";

const User = () => {
  const [profilePhotoView, setProfilePhotoView] = useState(null);

  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      interests: [],
      desc: "",
      job: "",
      linkedIn: "",
      github: "",
      photo: undefined,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">User Information</h1>
      <div className="mt-4 border rounded-lg px-4 py-2">
        <h1 className="p-4 font-semibold">Personal Information</h1>
        <div class="rounded-md bg-blue-100 p-4 my-2">
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <div class="ml-3 flex-1 text-sm text-blue-500">
              <span class="font-semibold">Tips</span>
              <br />
              <div class="block mt-1">
                <ul class="list-disc ml-4 space-y-1">
                  <li>
                    Adding your photo and social media profiles helps mentors
                    feel confident that you’re a real person (e.g. not a bot).
                  </li>
                  <li>
                    Your profile is only visible to mentors that you send
                    applications to. It is not indexed on search engines like
                    Google.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <form
          className="space-y-6 grid grid-cols-2 gap-4 mt-4 mr-40"
          onSubmit={formik.handleSubmit}
        >
          <label htmlFor="photo" className="col-span-2">
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
          <TextInput formik={formik} name="name" label="Name*" />
          {formik.errors[`name`] && formik.touched[`name`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`name`])}
            </span>
          )}
          <TextInput formik={formik} name="surname" label="Surname*" />
          {formik.errors[`surname`] && formik.touched[`surname`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`surname`])}
            </span>
          )}
          <TextInput formik={formik} name="email" label="Email*" />
          {formik.errors[`email`] && formik.touched[`email`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`email`])}
            </span>
          )}

          <TextInput formik={formik} name="job" label="Job Title" />

          <TextInput
            formik={formik}
            name="linkedIn"
            label="LinkedIn"
            placeholder="https://www.linkedin.com/..."
          />

          <TextInput
            formik={formik}
            name="github"
            label="Github"
            placeholder="https://twitter.com/"
          />

          <div className="col-span-2">
            <TextAreaInput
              formik={formik}
              name="desc"
              label="Description"
              placeholder="Talk about yourself..."
            />
          </div>
          <GenericButton type="submit" className="w-full">
            Save Changes
          </GenericButton>
        </form>
      </div>
    </div>
  );
};

export default User;
