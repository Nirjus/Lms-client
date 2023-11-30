import { useGetAllCreatersQuery } from "@/redux/features/user/userApi";
import React, { useEffect, useState } from "react";
import Loader from "../Loader";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineMail } from "react-icons/ai";
import {  useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import avatarPng from "../../assets/images/4532503.png";
import PaginationComponent from "@/app/utils/PaginationComponent";

type Props = {};

const CreatersCard = (props: Props) => {
  const { data, isLoading } = useGetAllCreatersQuery({});
  const { data: courseData } = useGetUserAllCoursesQuery(undefined,{});
  const [creaters, setCreaters] = useState([]);
  const [course, setCourse] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const resultPerPage = 8;
  const [lastIndex, setLastIndex] = useState(resultPerPage);
 
  useEffect(() => {
    if (data) {
      setCreaters(data?.users);
    }
    if (courseData) {
      setCourse(courseData?.courses);
    }
  }, [data, courseData]);

  const creatorTotalPurchased =
    creaters &&
    creaters.map((creator: any) => ({
      creatorId: creator._id,
      creatorName: creator.name,
      totalPurchased: creator.createItems.reduce((total: number, item: any) => {
        const associatedCourse: any =
          course && course.find((course: any) => course._id === item.courseId);
        return total + (associatedCourse ? associatedCourse.purchased : 0);
      }, 0),
    }));

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className=" w-full min-h-[80vh]">
          {creaters && creaters.length === 0 && (
            <p>No creaters have still now</p>
          )}
          <div className=" 800px:w-[90%] w-[95%] pt-[40px] m-auto">
          <div className= {`w-full h-[300px] `}>
              <div className=" w-full h-[96%] m-auto bg-gradient-to-r from-[#ffffff00] to-[#9292d33b] rounded-br-[100px] flex justify-between items-center max-400px:items-end rounded">
                <h1
                  className={`text-[45px] pb-10 max-800px:pb-[150px] text-black dark:text-white font-Poppins font-[500]`}
                >
                  Popular
                  <br />
                  <span className="bg-clip-text text-[#0000] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]">
                    Creators
                  </span>
                </h1>
                <div className=" h-[220px] max-800px:h-[170px] object-contain">
                  <Image
                    src={require("../../assets/images/standing.png")}
                    width={1000}
                    height={1000}
                    className={`400px:w-[300px] 400px:h-[300px] dark:bg-[#0c101a] bg-white rounded-full object-contain`}
                    alt="books"
                  />
                </div>
              </div>
            </div>
            <div className=" flex max-800px:justify-center flex-wrap gap-[20px] md:gap-[25px] lg:gap-[25px] 1500px:gap-[35px]">
              {creaters &&
                creaters
                  .slice(startIndex, lastIndex)
                  .map((user: any, index: number) => (
                    <Link
                      href={`/creaters/${user?._id}`}
                      className=" m-2"
                      key={index}
                    >
                      <div className="dark:bg-[#2d31615d] shadow-lg shadow-3xl rounded-[12px] relative mx-auto flex h-full w-full max-w-[550px] min-w-[300px] flex-col items-center bg-[#f1f1f1] bg-cover bg-clip-border p-[16px] dark:text-white dark:shadow-none">
                        <div
                          className={`relative mt-1 flex h-32 w-full justify-center rounded-xl bg-cover ${
                            index % 2 === 0
                              ? " bg-gradient-to-br from-indigo-500 to-emerald-500"
                              : " bg-gradient-to-bl from-purple-600 to-yellow-400"
                          } `}
                        >
                          <div className="absolute -bottom-12 flex h-[88px] w-[88px] items-center justify-center rounded-full border-[4px] border-white bg-indigo-400">
                            <Image
                              className="h-full w-full rounded-full"
                              width={500}
                              height={500}
                              src={
                                user?.avatar
                                  ? user?.avatar?.url
                                  : user?.socialAvatar
                                  ? user?.socialAvatar
                                  : avatarPng
                              }
                              alt="avatar"
                            />
                          </div>
                        </div>
                        <div className="mt-16 flex flex-col w-full">
                          <h4 className="text-black dark:text-white text-xl font-bold">
                            {user?.name}
                          </h4>
                          <p className="text-black dark:text-white text-base font-normal">
                            {user?.role === "admin" ? "Instructor" : "creator"}
                          </p>
                          <div className="mt-[-30px] mb-2 w-full flex justify-end">
                            <button
                              className={` bg-[#ece812] text-white active:scale-95 duration-200 dark:bg-[#1d5ee9] rounded-[5px] !px-3 !py-1 `}
                            >
                              View
                            </button>
                          </div>
                        </div>
                        <div className=" mt-[20px] mb-3 flex gap-4 md:!gap-14">
                          <div className="flex flex-col items-center justify-center">
                            <h3 className="text-black dark:text-white text-2xl font-bold">
                              {creatorTotalPurchased[index].totalPurchased}
                            </h3>
                            <p className="text-black dark:text-white text-sm font-normal">
                              Sales
                            </p>
                          </div>
                          <div className="flex flex-col items-center justify-center">
                            <h3 className="text-black dark:text-white text-2xl font-bold">
                              {user?.createItems?.length}
                            </h3>
                            <p className="text-black dark:text-white text-sm font-normal">
                              Create
                            </p>
                          </div>
                          <div className="flex flex-col items-center gap-1 justify-center">
                            <h3 className="text-black dark:text-white text-2xl font-bold">
                              <Link href={`mailto:${user?.email}`}>
                                <AiOutlineMail
                                  className="dark:text-white text-black"
                                  size={25}
                                />
                              </Link>
                            </h3>
                            <p className="text-black dark:text-white text-sm font-normal">
                              Contact
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
          <PaginationComponent
            data={data?.users}
            itemArray={creaters}
            startIndex={startIndex}
            setStartIndex={setStartIndex}
            lastIndex={lastIndex}
            setLastIndex={setLastIndex}
            resultPerPage={resultPerPage}
          />
        </div>
      )}
    </>
  );
};

export default CreatersCard;
