import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification"
import Image from "next/image";
import avatar from "../assets/images/4532503.png";
import {useSession} from "next-auth/react";
import { useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
type Props = {
  activeItem: number;
};

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/about",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const Navigation: React.FC<Props> = ({ activeItem }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const {user} = useSelector((state:any) => state.auth);
  const {data} = useSession();
  const [socialAuth,{isSuccess, error, data:userData}] = useSocialAuthMutation();

   useEffect(() => {
     if(!user){
      if(data){
        socialAuth({email: data?.user?.email, name:data?.user?.name, avatar: data?.user?.image})
      }
     }
     if(isSuccess){
      const message:string = userData?.message || "Login Successfully";
      toast.success(message);
     }
     if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
     }
   },[data,user,socialAuth,isSuccess,userData,error])
  
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
      setOpenSidebar(false);
    }
  };
 
  return (
    <div
      className={`navbar !w-[95%] mx-auto bg-opacity-90 dark:bg-opacity-95 bg-base-100 dark:bg-base-200 rounded-[20px] shadow-xl border-b border-b-gray-200 dark:border-b-gray-900`}
    >
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" href={"/"}>
          ALASKA
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="hidden 800px:flex">
          {navItemsData &&
            navItemsData.map((i, index) => (
              <Link
                href={i.url}
                key={index}
                passHref
                className=" btn btn-ghost btn-sm "
              >
                <span
                  className={`${
                    activeItem === index
                      ? " dark:text-[#37a39a] text-[crimson]"
                      : "dark:text-white text-black"
                  } text-[17px] px-3 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
        </div>

        <div className=" pt-1">
          <ThemeSwitcher />
        </div>
        <div className=" max-800px:hidden">
        {
              user ? (
                <Link href={"/profile"}>
                <Image src={user.avatar ? user.avatar : avatar} alt="Profile-Pic"  className=" w-10 h-10 rounded-full object-cover"/>
                </Link>
              ) : (
                <HiOutlineUserCircle className=" cursor-pointer" onClick={() => setOpen(true)} size={45} />
              )
             }
        </div>
        <div className=" 800px:hidden mx-1">
          <HiOutlineMenuAlt3
            size={42}
            className=" cursor-pointer hover:bg-[#dddddd] dark:hover:bg-[#161616] transition-all duration-300 hover:rounded-[6px] ease-in-out"
            onClick={() => setOpenSidebar(true)}
          />
        </div>
        {openSidebar && (
          <div
            className=" fixed w-full h-screen top-0 left-0 z-[9999] dark:bg-[unset] bg-[#00000027] "
            onClick={handleClose}
            id="screen"
          >
            
            <div className="w-[70%] fixed h-screen bg-white dark:bg-[#0f0f14] dark:bg-opacity-[0.97] transition-all duration-300  top-0 right-0">
            <div className=" flex justify-center items-center my-5">
        <Link className=" rounded-lg p-3 w-[80%] bg-[#1b1a33] text-center text-white font-[600] text-[18px] dark:bg-[#1a203d] " href={"/"}>
          ALASKA
        </Link>
      </div>
              {
                <div className="mt-5 800px:hidden">
                  <div className=" w-full text-center flex flex-col gap-5 py-6">
                    {navItemsData &&
                      navItemsData.map((i, index) => (
                        <Link
                          href={i.url}
                          key={index}
                          passHref
                          className=" w-fit m-auto btn btn-ghost btn-md"
                        >
                          <span
                            className={`${
                              activeItem === index
                                ? " dark:text-[#37a39a] text-[crimson]"
                                : "dark:text-white text-black"
                            } text-[18px] px-3 py-3 font-Poppins font-[400]`}
                          >
                            {i.name}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>
              }
              <br />
              <br />
              <div className="flex justify-center items-center">
             {
              user ? (
                <Link href={"/profile"}>
                <Image src={user.avatar ? user.avatar : avatar} alt="Profile-Pic"  className=" w-12 h-12 rounded-full object-cover"/>
                </Link>
              ) : (
                <HiOutlineUserCircle className=" cursor-pointer" onClick={() => setOpen(true)} size={45} />
              )
             }
             
        </div>
        <br />
              <p className=" text-[16px] text-center px-2 pl-5 text-black dark:text-white">
                Copyright © 2023 ALASKA E-learning
              </p>
            </div>
          </div>
        )}
      </div>
      {
         route === "Login" && (
          <>
            {
              open && (
                <CustomModal 
                 open={open}
                 setOpen={setOpen}
                 setRoute={setRoute}
                 activeItem={activeItem}
                 component={Login}
                />
              )
            }
          </>
         )
      }
      {
         route === "Sign-Up" && (
          <>
            {
              open && (
                <CustomModal 
                 open={open}
                 setOpen={setOpen}
                 setRoute={setRoute}
                 activeItem={activeItem}
                 component={SignUp}
                />
              )
            }
          </>
         )
      }
 {
         route === "Verification" && (
          <>
            {
              open && (
                <CustomModal 
                 open={open}
                 setOpen={setOpen}
                 setRoute={setRoute}
                 activeItem={activeItem}
                 component={Verification}
                />
              )
            }
          </>
         )
      }

    </div>
  );
};

export default Navigation;
