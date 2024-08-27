import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
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
      jobTitle: "",
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
  }, []);

  const handleSubmit = async (values) => {
    if (user.role === "Mentee") {
      delete values.price;
      delete values.jobTitle;
    }

    Object.keys(values).forEach((key) => {
      if (
        values[key] === "" ||
        values[key] === undefined ||
        values[key] === 0
      ) {
        values[key] = currentUser[key] ? currentUser[key] : values[key];
      }
    });

    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      if (key === "interests" && Array.isArray(values[key])) {
        if (values[key].length === 0) {
          formData.append("interests", ""); // Boş dizi için boş bir değer ekle
        } else {
          values[key].forEach((interest) => {
            formData.append("interests", interest);
          });
        }
      } else if (key !== "image") {
        formData.append(key, values[key]);
      }
    });

    if (values.image) {
      formData.append("image", values.image);
    }

    const role = (await user.role) === "Mentor" ? "mentors" : "mentees";

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
      <h1 className="font-bold text-2xl">Kullanıcı Bilgileri</h1>
      <div className="mt-4 border rounded-lg px-4 py-2">
        <h1 className="p-4 font-semibold">Kişisel Bilgiler</h1>
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
              <span className="font-semibold">İpuçları</span>
              <br />
              <div className="block mt-1">
                <ul className="list-disc ml-4 space-y-1">
                  <li>
                    Fotoğrafınızı ve sosyal medya profillerinizi eklemek,
                    mentorların sizin gerçek bir kişi olduğunuzdan (örneğin bir
                    bot olmadığınızdan) emin olmalarına yardımcı olur.
                  </li>
                  <li>
                    Profiliniz yalnızca başvuru gönderdiğiniz mentorlar
                    tarafından görülebilir. Google gibi arama motorlarında
                    indekslenmez.
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
              Profil Fotoğrafı
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
                src={currentUser?.image || "./avatar.png"}
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
              label="İsim*"
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
              label="Soyisim*"
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
          {user.role === "Mentor" && (
            <>
              <div>
                <TextInput
                  formik={formik}
                  value={currentUser?.jobTitle || ""}
                  name="jobTitle"
                  label="İş Unvanı ve Şirket Adı*"
                />
              </div>
              <div>
                <NumberInput
                  formik={formik}
                  name="price"
                  value={currentUser?.price || 0}
                  label="Price"
                />
              </div>
            </>
          )}
          <div>
            <TagsWithBadges
              name="interests"
              formik={formik}
              label="Interests*"
              placeholder="İlgi alanlarınızı giriniz..."
              initvalue={currentUser?.interests}
            />
          </div>
          <div className="col-span-2">
            <TextAreaInput
              formik={formik}
              name="desc"
              label="Hakkında"
              value={currentUser?.desc || ""}
              placeholder="Kendiniz hakkında kısa bir açıklama yapınız..."
            />
          </div>
          <GenericButton type="submit" className="w-full">
            Kaydet
          </GenericButton>
        </form>
      </div>
    </div>
  );
};

export default User;
