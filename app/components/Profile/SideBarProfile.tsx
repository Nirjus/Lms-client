import React, { FC } from "react";
import Image from "next/image";
import avatarDefault from "../../assets/images/4532503.png";
import { RiLockPasswordLine } from "react-icons/ri";
import { SiCoursera } from "react-icons/si";
import { AiOutlineLogout } from "react-icons/ai";
import {MdOutlineAdminPanelSettings} from "react-icons/md";
import { useSession } from "next-auth/react";
import Link from "next/link";
type Props = {
  user: any;
  active: number;
  setActive: (active: number) => void;
  avatar: string | null;
  logoutHandler: any;
};

const SideBarProfile: FC<Props> = ({
  user,
  active,
  setActive,
  avatar,
  logoutHandler,
}) => {
  const {data} = useSession();
  return (
    <div className="w-full">
      <div
        className={`w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 1 ? " dark:bg-slate-800 bg-slate-100" : " bg-transparent"
        }`}
        onClick={() => setActive(1)}
      >
        {
          !user.avatar && data?.user ? (
          <Image
          src={data.user.image ? data.user.image : avatarDefault}
          alt="profile-Pic"
          width={20}
          height={20}
          className=" w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
          ) : (
           <Image
          src={user.avatar ? user.avatar.url : user?.socialAvatar ? user?.socialAvatar : avatarDefault}
          alt="profile-Pic"
          width={20}
          height={20}
          className=" w-[20px] h-[20px] 800px:w-[30px] 800px:h-[30px] cursor-pointer rounded-full"
        />
          )
        }
        <h5 className=" pl-2 800px:block hidden font-Poppins dark:text-white text-black">
          My Account
        </h5>
      </div>
      <div
        className={` w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 2 ? " dark:bg-slate-800 bg-slate-100" : " bg-transparent"
        }`}
        onClick={() => setActive(2)}
      >
        <RiLockPasswordLine size={20} className=" text-black dark:text-white"/>
        <h5 className=" pl-2 800px:block hidden font-Poppins dark:text-white text-black">Change Password</h5>
      </div>
      <div
        className={` w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 3 ? " dark:bg-slate-800 bg-slate-100" : " bg-transparent"
        }`}
        onClick={() => setActive(3)}
      >
        <SiCoursera size={20} className=" text-black dark:text-white"/>
        <h5 className=" pl-2 800px:block hidden font-Poppins dark:text-white text-black">Enrolled Courses</h5>
      </div>
     {
      user.role === "admin" && (
       
        <Link
        className={` w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 5 ? " dark:bg-slate-800 bg-slate-100" : " bg-transparent"
        }`}
       href={"/admin"}
      >
        <MdOutlineAdminPanelSettings size={22} className=" text-black dark:text-white"/>
        <h5 className=" pl-2 800px:block hidden font-Poppins dark:text-white text-black">Admin Dashboard</h5>
      </Link>
     
      )
     }
      <div
        className={` w-full flex items-center px-3 py-4 cursor-pointer rounded-[5px] ${
          active === 4 ? " dark:bg-slate-800 bg-slate-100" : " bg-transparent"
        }`}
        onClick={() => logoutHandler()}
      >
        <AiOutlineLogout size={22} className=" text-black dark:text-white"/>
        <h5 className=" pl-2 800px:block hidden font-Poppins dark:text-white text-black">Log Out</h5>
      </div>
    </div>
  );
};

export default SideBarProfile;
