import { style } from "@/app/styles/style";
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-toastify";

type Props = {};

  const ChangePassword: FC<Props> = (props) => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updatePassword,{isSuccess,error}] = useUpdatePasswordMutation();
  const [see1, setSee1] = useState(false);
  const [see2, setSee2] = useState(false);
  const [see3, setSee3] = useState(false);

  const passwordChangeHandler = async (e: any) => {
    e.preventDefault();
      if(newPassword !== confirmPassword){
        toast.error("Password did not match");
      }else{
        await updatePassword({
          oldPassword, newPassword
        })
      }
  };
  useEffect(() => {
    if(isSuccess){
      toast.success("Password change successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  },[isSuccess, error])
  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#fff] pb-2">
        Change Password
      </h1>
      <div className="w-full">
        <form
          onSubmit={passwordChangeHandler}
          className="flex flex-col items-center"
        >
          <div className=" w-[100%] 800px:w-[60%] mt-5 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your old password
            </label>
            <input
              type={see1 ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-2  text-black dark:text-[#fff] `}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            {
              !see1 ? (
                <AiOutlineEyeInvisible size={25} onClick={() => setSee1(true)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              ) : (
                <AiOutlineEye size={25}  onClick={() => setSee1(false)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              )
            }
          </div>
          <div className=" w-[100%] 800px:w-[60%] mt-2 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your new password
            </label>
            <input
              type={see2 ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-2 text-black dark:text-[#fff] `}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            {
              !see2 ? (
                <AiOutlineEyeInvisible size={25} onClick={() => setSee2(true)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              ) : (
                <AiOutlineEye size={25}  onClick={() => setSee2(false)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              )
            }
          </div>
          <div className=" w-[100%] 800px:w-[60%] mt-2 relative">
            <label className="block pb-2 text-black dark:text-[#fff]">
              Enter your confirm password
            </label>
            <input
              type={see3 ? "text" : "password"}
              className={`${style.input} !w-[95%] mb-2  text-black dark:text-[#fff]`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {
              !see3 ? (
                <AiOutlineEyeInvisible size={25} onClick={() => setSee3(true)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              ) : (
                <AiOutlineEye size={25}  onClick={() => setSee3(false)} className=" cursor-pointer absolute bottom-4 right-7 800px:right-10 z-[2] text-black dark:text-white"/>
              )
            }
            </div>
            <div className=" w-full 800px:w-[60%]">
            <input
              className={`${style.button} !w-[95%]`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;
