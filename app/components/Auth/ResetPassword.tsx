"use client";
import { style } from "@/app/styles/style";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useResetPasswordMutation } from "@/redux/features/user/userApi";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
  token?: any;
};
const schema = Yup.object().shape({
  password: Yup.string().required("Please enter your password").min(6),
});

const ResetPassword = ({ setRoute, token }: Props) => {
    
  const [show, setShow] = useState(false);
   const [resetPassword, {isSuccess, error, data}] = useResetPasswordMutation();

  const formik = useFormik({
    initialValues: { password: "" },
    validationSchema: schema,
    onSubmit: async ({ password }) => {
      await resetPassword({token,newPassword:password});
    },
  });

  useEffect(() => {
    if(isSuccess){
        const message:string = data?.message || "Password updated successfully";
        toast.success(message);
        setRoute("Login");
        redirect("/");
      }
      if(error){
      if("data" in error){
      const errorData = error as any;
      toast.error(errorData?.data.message);
    }
  }
  }, [isSuccess,error, setRoute,data]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="  w-full">
      <h1 className={style.title}>Recovery Password</h1>
      <form onSubmit={handleSubmit}>
        <div className="w-full relative mt-5 mb-1">
          <label htmlFor="password" className={style.label}>
            Enter a new Password
          </label>

          <input
            type={!show ? "password" : "text"}
            name=""
            id="password"
            value={values.password}
            onChange={handleChange}
            placeholder="password%$#"
            className={`${
              errors.password && touched.password && " border-red-500"
            } ${style.input}`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-2 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={25}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-2 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={25}
              onClick={() => setShow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className=" text-red-500 pt-2 block">{errors.password}</span>
        )}

        <div className=" w-full my-5 pt-[10px]">
          <button type="submit" className={`${style.button}`}>
            Submit
          </button>
        </div>

        <br />
      </form>
    </div>
  );
};

export default ResetPassword;
