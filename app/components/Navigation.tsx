import Link from "next/link";
import React, { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import ThemeSwitcher from "../utils/ThemeSwitcher";
import { HiOutlineMenuAlt3, HiOutlineUserCircle } from "react-icons/hi";
import CustomModal from "../utils/CustomModal";
import Login from "../components/Auth/Login";
import ForgotPassword from "../components/Auth/ForgotPassword"
import SignUp from "../components/Auth/SignUp";
import Verification from "../components/Auth/Verification"
import Image from "next/image";
import avatar from "../assets/images/4532503.png";
import {useSession} from "next-auth/react";
import { useLogOutQuery, useSocialAuthMutation } from "@/redux/features/auth/authApi";
import { toast } from "react-toastify";
type Props = {
  activeItem: number;
  open: boolean;
    setOpen: any;
    route: string;
    setRoute: (route:string) => void;
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
    name: "Creators",
    url: "/creator",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

const Navigation: React.FC<Props> = ({ activeItem, open, setOpen, route, setRoute }) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  const {user} = useSelector((state:any) => state.auth);
  const {data} = useSession();
  const [reverse, setReverse] = useState(false);
  const [socialAuth,{isSuccess, error, data:userData}] = useSocialAuthMutation();
  // const [logout, setLogout] = useState(false);
  // const {} = useLogOutQuery(undefined, {
  //  skip: !logout ? true : false
  // });
   useEffect(() => {
     if(!user){
      if(data){
        socialAuth({email: data?.user?.email, name:data?.user?.name, avatar: data?.user?.image})
      }
     }
     if(data === null ){
      if(isSuccess){
      const message:string = userData?.message || "Login Successfully";
      toast.success(message);
     }
    }
     if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData?.data.message);
      }
     }
    //  if(data === null){
    //    setLogout(true);
    //  }
   },[data,user,socialAuth,isSuccess,userData,error])
  
  const handleClose = (e: any) => {
    if (e.target.id === "screen") {
       setReverse(true);
       setTimeout(function(){
        setOpenSidebar(false);
       },460)
    }
  };
 
  return (
    <>
    <div className=" my-auto mx-[70px] hidden 800px:block">
     
      <div className=" flex flex-row gap-7">
          {navItemsData.map((item: any, index: number) => (
            <div
              className={` p-1 font-Poppins ${
                activeItem === index
                  ? " text-red-500 dark:text-[cyan] underline "
                  : " text-black dark:text-white"
              }`}
              key={index}
            >
              <Link href={item.url}>{item.name}</Link>
            </div>
          ))}
        </div>
     </div>
        <div className=" mx-2">
         <ThemeSwitcher />
         </div>
        <div className=" ml-2 mr-4 max-800px:hidden">
        {
              user ? (
                <Link href={"/profile"}>
               
                {/* {
                 !user.avatar && data?.user ? (
                <Image src={data.user.image ? data?.user?.image : avatar} alt="Profile-Pic" width={50} height={50} style={{border: activeItem === 5 ? "2px solid cyan" : "none"}}  className=" w-10 h-10 rounded-full object-cover"/>
                  ) :( */}
                    <Image src={user.avatar ? user.avatar.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="Profile-Pic" width={50} height={50} style={{border: activeItem === 5 ? "2px solid cyan" : "none"}}  className=" w-10 h-10 rounded-full object-cover mt-1"/>
                {/* //   ) */}
                {/* // } */}
                </Link>
              ) : (
                <HiOutlineUserCircle className=" cursor-pointer text-black dark:text-white" onClick={() => setOpen(true)} size={45} />
              )
             }
        </div>
        <div className=" 800px:hidden block mx-5">
          <HiOutlineMenuAlt3
            size={42}
            className=" cursor-pointer text-black dark:text-white"
            onClick={() => {setOpenSidebar(true), setReverse(false)}}
          />
        
        {openSidebar && (
          <div
          className="fixed top-0 right-0 h-screen w-full bg-[#00000036]"
            onClick={handleClose}
            id="screen"
          >
            <div className={`sideBaranimationRightToleft ${reverse && "sideBaranimationLeftToRight"} w-[70%] z-[99999] fixed h-screen bg-white dark:bg-[#0f0f14] dark:bg-opacity-[0.97] transition-all duration-300  top-0 right-0`}>
            <div className=" flex justify-center items-center my-5">
        <Link className=" text-[30px] pl-3 hover:text-[#2a7fe0] dark:hover:text-[#2a7fe0] dark:text-white text-[#151515] font-[600]" href={"/"}>
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
                          className=" w-fit mx-auto px-2 py-2 dark:hover:bg-[#121212b9] hover:bg-[#12121222] rounded-[10px] duration-500"
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
                {/* {
                 !user.avatar && data?.user ? (
                <Image src={data.user.image ? data?.user?.image : avatar} alt="Profile-Pic" width={50} height={50} style={{border: activeItem === 5 ? "2px solid cyan" : "none"}}  className=" w-10 h-10 rounded-full object-cover"/>
                  ) :( */}
                    <Image src={user.avatar ? user.avatar.url : user?.socialAvatar ? user?.socialAvatar : avatar} alt="Profile-Pic" width={50} height={50} style={{border: activeItem === 5 ? "2px solid cyan" : "none"}}  className=" w-10 h-10 rounded-full object-cover"/>
                {/* //   ) */}
                {/* // } */}
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
         route === "Forgot-Password" && (
          <>
            {
              open && (
                <CustomModal 
                 open={open}
                 setOpen={setOpen}
                 setRoute={setRoute}
                 activeItem={activeItem}
                 component={ForgotPassword}
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

    </>
  );
};

export default Navigation;
