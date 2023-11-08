"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { style } from "@/app/styles/style";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
import {signIn} from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
};

const schema = Yup.object().shape({
    name:Yup.string().required("Please enter your name"),
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string().required("Please enter your password").min(6),
});

const SignUp: React.FC<Props> = ({setRoute}) => {
  const [show, setShow] = React.useState(false);
  const [register,{data,error,isSuccess}] = useRegisterMutation();

  useEffect(() => {
    if(isSuccess){
      const message = data?.message || "Registration successfull";
      toast.success(message);
      setRoute("Verification");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
    }
  },[isSuccess,error,data?.message,setRoute]);

  const formik = useFormik({
    initialValues: {name:"", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({name, email, password }) => {
      const data = {
        name, email, password
      };

     await register(data);
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="  w-full">
      <h1 className={style.title}>Sign-Up with ALASKA</h1>
      <form onSubmit={handleSubmit}>
        <div className=" mb-5">
        <label htmlFor="name" className={style.label}>
          Enter your Name
        </label>
        <input
          type="text"
          name=""
          id="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Jack smith"
          className={`${errors.name && touched.name && " border-red-500"} ${
            style.input
          }`}
        />
        {errors.name && touched.name && (
          <span className=" text-red-500 pt-2 block">{errors.name}</span>
        )}
        </div>
        <label htmlFor="email" className={style.label}>
          Enter your Email
        </label>
        <input
          type="email"
          name=""
          id="email"
          value={values.email}
          onChange={handleChange}
          placeholder="loginEmail@gmail.com"
          className={`${errors.email && touched.email && " border-red-500"} ${
            style.input
          }`}
        />
        {errors.email && touched.email && (
          <span className=" text-red-500 pt-2 block">{errors.email}</span>
        )}
        <div className="w-full mt-5 mb-1 relative">
          <label htmlFor="password" className={style.label}>
            Enter your Password
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
        <div className=" w-full my-5">
            <button type="submit" className={style.button}>Sign Up</button>
        </div>
        <h5 className=" text-center pt-4 font-Poppins font-[600] dark:font-[400] text-[14px] text-black dark:text-white">
           -- or join with --
        </h5>
        <div className=" flex items-center justify-center gap-7 my-3">
        <FcGoogle size={35} className=" cursor-pointer shadow-inner active:shadow-gray-600  rounded-full"
          onClick={() => signIn("google")}
          />
          <AiFillGithub size={35} className=" cursor-pointer shadow-inner active:shadow-gray-600 rounded-full text-black dark:text-white"
          onClick={() => signIn("github")}
          />
             </div>
        <h5 className=" text-center pt-4 font-Poppins text-[14px] font-[500] text-black dark:text-white">
      Already have an account?
      <span className=" text-[#2190ff] pl-1 cursor-pointer" onClick={() =>setRoute("Login")}>
        Sign In
      </span>
        </h5>
        <br />
      </form>
    </div>
  );
};

export default SignUp