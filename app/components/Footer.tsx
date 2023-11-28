import React from 'react'
import {
    AiFillGithub,
    AiFillInstagram,
    AiFillLinkedin,
  } from "react-icons/ai";
  import Link from "next/link";

type Props = {}

const Footer = (props: Props) => {
  return (
    <>
    <div className=" flex border-t bg-slate-50 dark:bg-slate-950 text-black dark:text-white  dark:border-t-[#282727] justify-evenly items-center h-auto min-h-[200px] max-800px:flex-col p-1">
      <div className="flex gap-4 flex-col items-center w-full border-r-4 border-black dark:border-white max-800px:w-[80%] max-800px:border-b-2 max-800px:border-r-0">
        <h1 className=" p-1 text-[21px] font-bold">Hey! This is ALASKA E-Learning</h1>
        <p className=' mt-[-20px]'>One stop learning platform for students</p>
        <div className=" p-1">
          <p>Follow Us on.</p>
          <div className=" flex gap-3 m-1">
            <a href={"https://github.com/Nirjus"} className=" hover:text-[#2ab5ff]" target="blank">
              <AiFillGithub size={35} />
            </a>
            <a href={"https://instagram.com/nirjuskarmakar"} className=" hover:text-[#2ab5ff]" target="blank">
              <AiFillInstagram size={35} />
            </a>
            <a
              href={"https://www.linkedin.com/in/nirjus-karmakar-b2bb0b26b/"}
              className=" hover:text-[#2ab5ff]"
              target="blank"
            >
              <AiFillLinkedin size={35} />
            </a>
          </div>
        </div>
      </div>
      <div className=" flex flex-col gap-3 items-center w-full border-r-4 border-black dark:border-white max-800px:w-[80%] max-800px:border-b-2 max-800px:border-r-0">
        <h1 className=" p-1 text-[21px] font-bold">
          Contact us throw your email
        </h1>
      <div className=" flex flex-col justify-start gap-3">
       <p>Call Us:1-4589-873-2589</p>
       <p>Address: India, West Bengal, 129</p>
       <p>Mail Us: karmakarnirjus4839@gmail.com</p>
      </div>
      </div>
      <div className=" flex flex-col gap-4 items-center w-full">
        <h1 className="p-1 text-[21px] font-bold">Read Our About </h1>
        <p>Blogs </p>
        <p>Carrier</p>
        <Link href={"/policis"}>Our Policy</Link>
       
      </div>
    </div>
    <p className='bg-slate-50 dark:bg-slate-950 text-center pt-3 pb-2 text-black dark:text-white'>Copyright © 2023 ALASKA ELearning | All Right Reserved</p>
    </>
  )
}

export default Footer