"use client";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import Loader from "@/app/components/Loader";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetAllCreatersQuery } from "@/redux/features/user/userApi";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import avatarPng from "../../assets/images/4532503.png";
import { format } from "timeago.js";
import Link from "next/link";
import { GoArrowUpRight } from "react-icons/go";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import CourseCard from "@/app/components/Course/CourseCard";
type Props = {};

const Page = ({ params }: any) => {
  const { data: courseData } = useGetUserAllCoursesQuery(undefined, {});
  const [route, setRoute] = useState("Login");
  const [open, setOpen] = useState(false);
  const { data, isLoading } = useGetAllCreatersQuery({});
  const [creator, setCreator] = useState<any>({});
  const [course, setCourse] = useState([]);
  const [popup, setPopup] = useState(false);
     const [active, setActive] = useState(1);
  const userData =
    data && data.users.find((user: any) => user._id === params.id);
  useEffect(() => {
    if (userData) {
      setCreator(userData);
      const filterdCourse = userData?.createItems
        .map((item: any) =>
          courseData?.courses.find(
            (course: any) => course._id === item.courseId
          )
        )
        .filter((course: any) => course !== undefined);
      setCourse(filterdCourse);
    }
  }, [userData, courseData]);

  const totalSales = creator?.createItems?.reduce(
    (total: number, item: any) => {
      const associatedCourse: any =
        course && course.find((course: any) => course._id === item.courseId);
      return total + (associatedCourse ? associatedCourse.purchased : 0);
    },
    0
  );

  return (
    <div className="">
      <Header
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={3}
      />

      <div className=" w-full pt-[100px] min-h-screen h-auto">
        {isLoading ? (
          <Loader />
        ) : (
          <>
          <div className=" w-[90%] flex relative 800px:flex-row flex-col gap-3 m-auto p-1 max-800px:w-[95%]">
            <div className=" 800px:w-[30%] top-[100px] left-0 800px:sticky w-full h-full font-Poppins">
              <div className=" w-full flex items-end p-2 rounded-md bg-gradient-to-br from-[#8c8b8b23] to-[#2f2f2f30] border border-[#00000037] dark:border-[#ffffff36]">
                <Image
                  src={
                    creator?.avatar
                      ? creator?.avatar?.url
                      : creator?.socialAvatar
                      ? creator?.socialAvatar
                      : avatarPng
                  }
                  width={500}
                  height={500}
                  className=" w-[200px] h-[200px] rounded-full dark:bg-violet-900 bg-violet-200  border-2 border-[#fff]"
                  alt="avatar"
                  onClick={() => setPopup(true)}
                />
                <p className=" text-black dark:text-white">
                  Role:{" "}
                  <span className=" font-[600] text-[18px]">
                    {creator?.role === "admin" ? "Instructor" : "user"}
                  </span>
                </p>
              </div>
              <br />
              <br />
              <h1 className=" 800px:text-[35px] text-[25px] font-[600] text-black dark:text-white">
                {creator?.name}
              </h1>
              <h2 className=" 800px:text-[20px] text-[15px] text-black dark:text-white">
                <a
                  href={`mailto:${creator?.email}`}
                  className=" flex items-center"
                >
                  {creator?.email} <GoArrowUpRight />
                </a>
              </h2>
              <br />
              <h2 className=" 800px:text-[20px] text-[16px] text-black dark:text-white">
                <span className=" font-[600]">Joined:</span>{" "}
                {format(creator?.createdAt)}
              </h2>
              <br />
              <div className=" flex bg-[#8c8b8b23] border border-[#00000037] dark:border-[#ffffff36]  flex-row gap-[20px] rounded-md p-2">
                <div className=" p-[2px] flex flex-col justify-center items-center ">
                  <h1 className=" text-[blue] 800px:text-[35px] text-[25px] font-[600] dark:text-white">
                    {creator?.createItems?.length}
                  </h1>
                  <p className=" text-black text-[12px] font-[600] dark:text-white">
                    Total No. Content
                  </p>
                </div>
                <div className=" p-[2px] flex flex-col justify-center items-center ">
                  <h1 className=" text-[blue] 800px:text-[35px] text-[25px] font-[600] dark:text-white">
                    {totalSales}
                  </h1>
                  <p className=" text-black text-[12px] font-[600] dark:text-white">
                    Total No. Sales
                  </p>
                </div>
              </div>
            </div>
           {
            active === 1 && (
              <div className=" 800px:w-[70%] px-5 pb-2 w-full h-full text-black dark:text-white">
              <h1 className=" text-[18px] px-10 font-Poppins font-[600] ">
                🌟 Meet Our Dedicated Educator: {creator?.name} 🌟
              </h1>

              <h3 className=" text-[16px] px-5 font-Poppins font-[500] ">
                👨‍🏫 About Me:
              </h3>

              <p className=" px-2 font-Josefin text-justify">
                Passionate and experienced educator at the forefront of ALASKA,
                a leading LMS company. Specializing in programming, mathematics,
                problem-solving, and a diverse range of science and
                computer-related subjects. With a decade of teaching expertise,
                Ive dedicated my career to shaping the minds of students and
                fostering a love for learning.
              </p>
              <h3 className="text-[16px] px-5 font-Poppins font-[500]">
                🚀 Teaching Philosophy:
              </h3>

              <p className=" px-2 font-Josefin text-justify">
                Embraces a dynamic and innovative approach to education.
                Champions project-based teaching methods, ensuring students
                engage deeply with the material. Believes in making learning a
                practical and enjoyable experience, preparing students for
                real-world challenges.
              </p>
              <h3 className="text-[16px] px-5 font-Poppins font-[500]">
                🌐 Subject Expertise:
              </h3>

              <p className=" px-2 font-Josefin text-justify">
                Proficient in a variety of science and computer-related
                subjects. Expertise spans programming languages, mathematical
                concepts, and problem-solving strategies. Committed to providing
                a well-rounded education that prepares students for success in
                their chosen fields.
              </p>
              <h3 className="text-[16px] px-5 font-Poppins font-[500]">
                🌈 Success Stories:
              </h3>

              <p className="px-2 font-Josefin  text-justify">
                Instrumental in guiding numerous students toward bright futures
                and successful life paths. A track record of fostering academic
                excellence and personal growth. Celebrates the achievements of
                students as they excel in their educational and professional
                journeys.
              </p>
              <h3 className="text-[16px] px-5 font-Poppins font-[500]">
                💼 Work Ethic:
              </h3>

              <p className="px-2 font-Josefin  text-justify">
                Dedicated to the cause of education, working tirelessly
                throughout the week. Strives to create a supportive and
                inspiring learning environment for students. Committed to
                staying at the forefront of educational advancements and
                incorporating them into teaching methodologies.
              </p>

              <p className="px-2 font-Josefin  text-justify ">
                🌟 Join me on this educational journey, where knowledge meets
                inspiration, and success is a shared achievement! 🚀
              </p>
            </div>
            )
           }
             {
              active === 2 && (
                <div className=" 800px:w-[70%] w-full h-full pb-2 px-5">
                  <h1 className=" pb-4 text-[18px] font-[600] font-Poppins text-black dark:text-white">Popular courses from our creater</h1>
                      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] 1500px:grid-cols-3 1500px:gap-[35px] mb-12 border-0">
                 {
                  course && course.map((item: any, index: number) => (
    
                    <CourseCard item={item} key={index} />
                  
                  ))
                 }
                 </div>
                </div>
              )
             }
            {popup && (
              <div className=" w-full h-screen fixed top-0 left-0 bg-[#00000034]">
                <div className=" cursor-pointer h-[80vh] w-auto absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#171717] rounded-[8px] shadow p-4 outline-none">
                  <Image
                    src={
                      creator?.avatar
                        ? creator?.avatar?.url
                        : creator?.socialAvatar
                        ? creator?.socialAvatar
                        : avatarPng
                    }
                    width={500}
                    height={500}
                    className=" w-full h-full rounded-[10px] border-2 border-[#9f9f9f51]"
                    alt="avatar"
                    onClick={() => setPopup(false)}
                  />
                </div>
              </div>
            )}
          </div>
              <div className=" w-full max-800px:mt-4 pl-[30%]">
              <div className=" flex gap-2">
               <button className=" border active:bg-slate-400 rounded-md dark:active:bg-slate-800 p-1 bg-slate-200 dark:bg-transparent text-black dark:text-white m-2"
            onClick={() => setActive(1)}
            >
             <IoIosArrowBack size={20} className=" text-black dark:text-white" />
            </button>
            <button className=" border p-1 active:bg-slate-400 rounded-md dark:active:bg-slate-800 bg-slate-200 dark:bg-transparent text-black dark:text-white m-2"
            onClick={() => setActive(2)}
            >
              <IoIosArrowForward size={20} className=" text-black dark:text-white" />
            </button>
               </div>
              </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Page;
