import React, { useEffect, useState } from "react";
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
import { useUserStore } from "@/zustand/userStore";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import TagsWithBadges from "@/components/inputs/tags-w-badges";
import NumberInput from "@/components/inputs/number-input";

const User = () => {
  const [profilePhotoView, setProfilePhotoView] = useState(null);
  const { user } = useAuth();
  const { currentUser, fetchUserInfo } = useUserStore();

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      email: "",
      interests: [],
      desc: "",
      job: "",
      price: 0,
      image: undefined,
    },
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  useEffect(() => {
    if (user?.id) {
      fetchUserInfo(user.id, user.role);
    }
  }, [fetchUserInfo, user]);

  const handleSubmit = async (values) => {
    Object.keys(values).forEach((key) => {
      if (values[key] === "" || values[key] === undefined) {
        values[key] = currentUser[key] ? currentUser[key] : values[key];
      }
    });
    console.log(values);

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key !== "image") {
        formData.append(key, values[key]);
      }
    });
    formData.append("image", values.image);

    const role = user.role === "Mentor" ? "mentors" : "mentees";

    try {
      const response = await fetch(`/api/${role}?id=${user.id}&role=${role}`, {
        method: "PATCH",
        headers: {
          "Cache-Control": "no-store",
        },
        next: { revalidate: 0 },
        body: formData,
      });

      const res = await response.json();
      if (res.success) {
        toast.success("User information updated successfully", {
          autoClose: 500,
        });
      } else {
        toast.error("User information update failed", { autoClose: 500 });
      }
    } catch (err) {
      console.log(err);
      toast.error("User information update failed", { autoClose: 500 });
    }
  };

  return (
    <div>
      <h1 className="font-bold text-2xl">User Information</h1>
      <div className="mt-4 border rounded-lg px-4 py-2">
        <h1 className="p-4 font-semibold">Personal Information</h1>
        <div className="rounded-md bg-blue-100 p-4 my-2">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <div className="ml-3 flex-1 text-sm text-blue-500">
              <span className="font-semibold">Tips</span>
              <br />
              <div className="block mt-1">
                <ul className="list-disc ml-4 space-y-1">
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
          <label htmlFor="image" className="col-span-2">
            <p className="block text-sm font-medium leading-5 text-gray-700">
              Profile Photo
            </p>
            {profilePhotoView ? (
              <Image
                src={profilePhotoView}
                width={144}
                height={144}
                alt="profile photo"
                className="rounded-full object-cover"
              />
            ) : currentUser ? (
              <Image
                src={currentUser?.image}
                width={144}
                height={144}
                alt="profile photo"
                className="rounded-full object-cover"
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

                formik.setFieldValue("image", readFile.file);
              }}
              accept="image/jpeg, image/png"
              className="sr-only"
              name="image"
              id="image"
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

                  formik.setFieldValue("image", undefined);
                }}
                className="h-8 w-8 text-red-400"
                aria-hidden="true"
              />
            )}
          </label>
          <div>
            <TextInput
              formik={formik}
              name="name"
              value={currentUser?.name || ""}
              label="Name*"
            />
            {formik.errors[`name`] && formik.touched[`name`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`name`])}
              </span>
            )}
          </div>
          <div>
            <TextInput
              formik={formik}
              value={currentUser?.surname || ""}
              name="surname"
              label="Surname*"
            />
            {formik.errors[`surname`] && formik.touched[`surname`] && (
              <span className="error-message text-xs text-red-500">
                {String(formik.errors[`surname`])}
              </span>
            )}
          </div>
          <div>
            <TextInput
              formik={formik}
              value={currentUser?.email || ""}
              name="email"
              label="Email*"
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
              value={currentUser?.job || ""}
              name="job"
              label="Job Title"
            />
          </div>
          <div>
            <TagsWithBadges
              name="interests"
              formik={formik}
              label="Sub Category"
              placeholder="Select Sub Category"
              initvalue={currentUser?.interests}
            />
          </div>
          <div>
            <NumberInput formik={formik} name="price" label="Price" />
          </div>
          <div className="col-span-2">
            <TextAreaInput
              formik={formik}
              name="desc"
              label="Description"
              value={currentUser?.desc || ""}
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
