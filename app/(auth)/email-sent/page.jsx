"use client";
import TextInput from "@/components/inputs/text-input";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import { toast } from "react-toastify";

const EmailSent = () => {
  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ValidationSchema,
    onSubmit: (values) => {
      sentEmail(values);
    },
  });

  const sentEmail = async (values) => {
    if (values.email === "") return;

    try {
      const response = await fetch(`/api/email-sent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const res = await response.json();
      if (res.message === "Email sent") {
        toast.success("Email gönderildi!", { autoClose: 500 });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      (
      <div className="max-w-screen-md mx-auto pt-12">
        <div className="px-6 py-4 border rounded-lg border-slate-200 flex flex-col gap-5">
          <h1 className="font-bold text-4xl">
            Şifrenin değişeceği email adresini gir
          </h1>
          <form className="space-y-6 w-[70%]" onSubmit={formik.handleSubmit}>
            <div className="relative flex flex-col gap-5">
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
            </div>
            <GenericButton>Gönder</GenericButton>
          </form>
        </div>
      </div>
      )
    </>
  );
};

export default EmailSent;
