"use client"
import React,{useState} from 'react'
import SideBarProfile from "./SideBarProfile";
import { useLogOutQuery } from '@/redux/features/auth/authApi';
import {signOut} from "next-auth/react";
import {toast} from "react-toastify";
import ProfileInfo from "./ProfileInfo";
import ChangePassword from "./ChangePassword";

type Props = {
    user: any;
}

const Profile:React.FC<Props> = ({user}) => {
    const [scroll, setScroll] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [active, setActive] = useState(1);
  const [logout, setLogout] = useState(false);
   const {} = useLogOutQuery(undefined, {
    skip: !logout ? true : false
   });
  const logoutHandler = async () => {
     await signOut();
        setLogout(true);
        toast.success("Logout Successfull");
    }

    if(typeof window !== "undefined"){
        window.addEventListener("scroll", () => {
            if(window.scrollY > 85){
                setScroll(true);
            }else{
                setScroll(false);
            }
        });
    }

  return (
    <div className=' w-[85%] flex mx-auto '>
        <div className={`w-[60px] 800px:w-[310px] h-[450px] dark:bg-slate-900 bg-slate-50 bg-opacity-90 border dark:border-[#ffffff1d] border-[#3939392e] dark:shadow-sm shadow-xl rounded-[5px] mt-[130px] mb-[80px] sticky
        ${scroll ? " top-[120px]" : " top-[30px]"} left-[30px]`}>
       <SideBarProfile 
       user={user}
       active={active}
       avatar={avatar}
       setActive={setActive}
       logoutHandler={logoutHandler}
       />
        </div>
        {
        active === 1 && (
            <div className=' w-full h-full bg-transparent mt-[130px]'>
            <ProfileInfo avatar={avatar} user={user} />
            </div>
        )
       }
       {
        active === 2 && (
            <div className=' w-full h-full bg-transparent mt-[130px]'>
            <ChangePassword  />
            </div>
        )
       }
    </div>
  )
}

export default Profile