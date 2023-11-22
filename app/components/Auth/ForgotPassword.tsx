import { style } from '@/app/styles/style'
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { useForgotPasswordMutation } from '@/redux/features/user/userApi';
import { toast } from 'react-toastify';

type Props = {
    setRoute: (route: string) => void;
    setOpen: (open: boolean) => void;
}
const schema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email")
        .required("Please enter your email"),
})
const ForgotPassword = ({setRoute, setOpen}: Props) => {
    const [forgotPassword,{isSuccess, data, error}] = useForgotPasswordMutation();
     
    const formik = useFormik({
        initialValues: {email: ""},
        validationSchema: schema,
        onSubmit: async ({email}) => {
              await forgotPassword(email);
        }
    })

    useEffect(() => {
      if(isSuccess){
        const message:string = data?.message || `go to your email`;
        toast.success(message);
        setOpen(false);
      }
      if(error){
        if("data" in error){
            const errorData = error as any;
            toast.error(errorData?.data.message);
          }
      }
    },[data, isSuccess, error, setOpen])

   const {values, handleChange,errors, touched, handleSubmit } = formik;
   
  return (
    <div className="  w-full">
      <h1 className={style.title}>Recovery Email address</h1>
      <form onSubmit={handleSubmit}>
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
       
         
        <div className=" w-full my-5 pt-[10px]">
        <button type="submit" className={`${style.button}`}>Submit</button>

        </div>
        <h5 className=" text-center pt-4 font-Poppins text-[14px] font-[500] text-black dark:text-white">
      Back to LogIn 
      <span className=" text-[#2190ff] pl-1 cursor-pointer" onClick={() =>setRoute("Login")}>
        Sign In
      </span>
        </h5>
        <br />
      </form>
    </div>
  )
}

export default ForgotPassword