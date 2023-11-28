import Image from "next/image";
import { style } from "@/app/styles/style";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import avatarIcon from "../../assets/images/4532503.png";
import { useUpdateUserMutation } from "@/redux/features/user/userApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
type Props = {
  avatar: string | null;
  user: any;
};
const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const [updateUser,{isSuccess,error}] = useUpdateUserMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {data} = useSession();
 
const {} = useLoadUserQuery(undefined, {skip:loadUser ? false : true });

  const imageHandler = async (e: any) => {
    
   const fileReader = new FileReader();
   fileReader.onload = () => {
    if(fileReader.readyState === 2){
      const avatars = fileReader.result;
       updateUser({
        avatar: avatars
       })
    }
   }
   fileReader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
   if(isSuccess){
        setLoadUser(true);
        toast.success("user updated successfully");
   }
   if(error){
    console.log(error);
   }
  },[isSuccess, error])
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(name !== ""){
    await updateUser({
      name: name,
    })
  }
  };
  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative">
          
            <Image
            src={user?.avatar ? user?.avatar?.url : user?.socialAvatar ? user?.socialAvatar : avatarIcon}
            alt="profile-pic"
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[3px] border-[#37a39a] rounded-full"
          />
        
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png, image/jpg, image/jpeg, image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] dark:bg-slate-900 bg-slate-200 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className=" text-black dark:text-white" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto block pb-4">
            <div className="w-[100%]">
              <label className="block pb-2 text-black dark:text-white">Full Name</label>
              <input
                type="text"
                className={`${style.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] pt-2">
              <label className="block pb-2 text-black dark:text-white">Email Address</label>
              <input
                type="text"
                readOnly
                className={`${style.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`w-[95%] 800px:w-[250px] ${style.button} `}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};
export default ProfileInfo;
