import TextInput from "@/components/inputs/text-input";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import ApproveChange from "./approve-change";
import { useAuth } from "@/contexts/AuthContext";

const Password = () => {
  const [passType, setPassType] = useState(true);
  const [sendCode, setSendCode] = useState(false);

  const { user } = useAuth();

  const ValidationSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Şifre en az 8 karakter olmalıdır")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])/,
        "Şifreniz en az bir büyük harf ve bir küçük harf içermelidir"
      )
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      changePassword(values);
    },
  });

  const changePassword = async (values) => {
    if (values.password === "") return;
    console.log(values);

    const role = user.role === "Mentor" ? "mentors" : "mentees";

    try {
      const response = await fetch(
        "http://localhost:8800" +
          `/api/v1/${role}/${user.id}/request-password-update`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const res = await response.json();
      console.log(res);

      if (res) {
        setSendCode(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {sendCode ? (
        <ApproveChange
          password={formik.values["password"]}
          newPassword={formik.values["newPassword"]}
        />
      ) : (
        <div className="max-w-screen-md mx-auto pt-12">
          <div className="px-6 py-4 border rounded-lg border-slate-200 flex flex-col gap-5">
            <h1 className="font-bold text-4xl">Şifreni değiştir</h1>
            <form className="space-y-6 w-[70%]" onSubmit={formik.handleSubmit}>
              <div className="relative flex flex-col gap-5">
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

                <div className="flex flex-col gap-y-1">
                  <span>
                    *Şifreniz en az bir büyük harf ve bir küçük harf içermelidir
                  </span>
                  <span>*Şifreniz harf,sembol ve sayı içermelidir.</span>
                  <span>*Şifreniz en az 8 karakter olmalıdır.</span>
                </div>

                <TextInput
                  formik={formik}
                  name="newPassword"
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
                {formik.errors[`newPassword`] &&
                  formik.touched[`newPassword`] && (
                    <span className="error-message text-xs text-red-500">
                      {String(formik.errors[`newPassword`])}
                    </span>
                  )}
              </div>
              <GenericButton>Gönder</GenericButton>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Password;
