import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GenericButton from "@/components/generic-button";
import TextInput from "@/components/inputs/text-input";
import NumberInput from "@/components/inputs/number-input";

const Billing = () => {
  const ValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    surname: Yup.string().required("Surname is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      cardNumber: "",
      month: "",
      year: "",
      cvv: 0,
    },
    validationSchema: ValidationSchema,
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });
  return (
    <div>
      <h1 className="font-bold text-2xl">Payment Info</h1>
      <div className="mt-4 border rounded-lg px-4 py-2">
        <form
          className="grid grid-cols-2 gap-4 mt-4 mr-40"
          onSubmit={formik.handleSubmit}
        >
          <TextInput
            formik={formik}
            name="name"
            label="Name*"
            placeholder="Ulaş Demir"
          />
          {formik.errors[`name`] && formik.touched[`name`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`name`])}
            </span>
          )}

          <NumberInput
            formik={formik}
            name="cardNumber"
            label="Card number*"
            placeholder="0000 0000 0000 0000"
          />
          {formik.errors[`cardNumber`] && formik.touched[`cardNumber`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`cardNumber`])}
            </span>
          )}

          <NumberInput formik={formik} name="month" label="Month*" />
          {formik.errors[`month`] && formik.touched[`month`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`month`])}
            </span>
          )}
          <NumberInput formik={formik} name="year" label="Year*" />
          {formik.errors[`year`] && formik.touched[`year`] && (
            <span className="error-message text-xs text-red-500">
              {String(formik.errors[`year`])}
            </span>
          )}

          <div className="grid grid-cols-2">
            <div className="col-span-2">
              <NumberInput
                formik={formik}
                name="cvv"
                label="CVV*"
                placeholder="000"
              />
              {formik.errors[`cvv`] && formik.touched[`cvv`] && (
                <span className="error-message text-xs text-red-500">
                  {String(formik.errors[`cvv`])}
                </span>
              )}
            </div>
          </div>
          <div className="col-span-2">
            <GenericButton type="submit" className="w-full">
              Add Card
            </GenericButton>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Billing;
