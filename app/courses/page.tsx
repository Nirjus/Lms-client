"use client";
import { useGetUserAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { useGetHeroDataQuery } from "@/redux/features/layout/layputApi";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Loader from "../components/Loader";
import Header from "../components/Header";
import Heading from "../utils/Heading";
import { style } from "../styles/style";
import CourseCard from "../components/Course/CourseCard";
import Footer from "../components/Footer";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [focus, setFocus] = useState(0);
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoryData } = useGetHeroDataQuery("Category");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [startIndex, setStartIndex] = useState(0);
  const resultPerPage = 4;
  let totlaPagination = Math.ceil(data?.courses?.length/resultPerPage)
  const [lastIndex, setLastIndex] = useState(resultPerPage);
  
  useEffect(() => {
    if (category === "All") {
      setCourses(data?.courses);
    }
    if (category !== "All") {
      setCourses(
        data?.courses.filter((item: any) => item.category === category)
      );
    }
    if (search) {
      setCourses(
        data?.courses.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLocaleLowerCase())
        )
      );
    }
  }, [data, category, search]);

  const categories = categoryData?.layout.category;
   if(courses && courses.length){
   totlaPagination = Math.ceil(courses.length/resultPerPage);
   }
  const pageChangeHandeler = (index: number) => {
    setStartIndex(resultPerPage * index);
    setLastIndex(resultPerPage * index + resultPerPage);
    setFocus(index);
  };

  const setPrev = () => {
    if(startIndex > 0){
    setStartIndex(startIndex-resultPerPage);
    setLastIndex(lastIndex - resultPerPage);
    setFocus(focus-1);
    }
  }
  const setNext = () => {
    
    if(courses && courses.length){
      if(lastIndex < courses.length){
        setStartIndex(startIndex+resultPerPage);
        setLastIndex(lastIndex+resultPerPage);
        setFocus(focus+1);
      }
    }
  }
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Heading
            title="All courses ALASKA E-Learning"
            description="ALASKA is programing comunity"
            keyword="NEW comunity, students, programing, skills, Engineering, Tech"
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          <div className="w-[95%] pt-[100px] 800px:w-[85%] m-auto min-h-screen h-auto relative">
            <div className=" w-full flex items-center flex-wrap ">
              <div
                className={`h-[35px] text-white ${
                  category === "All" ? "bg-[crimson]" : "bg-[#5050cb]"
                } m-3 px-3 rounded-[30px] flex items-center justify-center font-Josefin cursor-pointer`}
                onClick={() => setCategory("All")}
              >
                All
              </div>
              {categories &&
                categories.map((item: any, index: number) => (
                  <div key={index}>
                    <div
                      className={` h-[35px] text-white ${
                        category === item.title
                          ? "bg-[crimson]"
                          : "bg-[#5050cb]"
                      } m-3 px-3 rounded-[30px] flex items-center justify-center font-Josefin cursor-pointer`}
                      onClick={() => setCategory(item.title)}
                    >
                      {item?.title}
                    </div>
                  </div>
                ))}
            </div>
            {courses && courses.length === 0 && (
              <p
                className={`${style.label} justify-center min-h-[50vh] flex items-center`}
              >
                {search
                  ? "No courses found!"
                  : "No courses found in this category. Please try anahter one!"}
              </p>
            )}
            <br />
            <br />
            <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-3 lg:gap-[25px] 1500px:grid-cols-4 1500px:gap-[35px] mb-12 border-0">
              {courses &&
                courses
                  .slice(startIndex, lastIndex)
                  .map((item: any, index: number) => (
                    <CourseCard item={item} key={index} />
                  ))}
            </div>
           <div className="w-full 800px:mt-[100px] mb-1 flex justify-center items-center 800px:absolute bottom-8 left-0 ">
            <button className=" border active:bg-slate-400 rounded-md dark:active:bg-slate-800 p-1 bg-slate-200 dark:bg-transparent text-black dark:text-white m-2"
            onClick={() => setPrev()}
            >
              prev
            </button>
           <div className="scrollvarhidden w-[150px] overflow-x-scroll flex flex-row justify-start items-center ">
              {
                [...Array(totlaPagination)].map((item:any, index: number) => (
                  <button
                    className={`min-w-[40px] min-h-[35px] rounded-md text-center  active:bg-slate-400 dark:active:bg-slate-800 text-black dark:text-white m-1
                    ${focus === index ? " bg-blue-400" : "bg-slate-200 dark:bg-slate-700"}
                    `}
                    key={index}
                    onClick={() => pageChangeHandeler(index)}
                  >
                    {index + 1}
                  </button>
                ))}
            </div>
            <button className=" border p-1 active:bg-slate-400 rounded-md dark:active:bg-slate-800 bg-slate-200 dark:bg-transparent text-black dark:text-white m-2"
            onClick={() => setNext()}
            >
              next
            </button>
           </div>
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
