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
import PaginationComponent from "../utils/PaginationComponent";
import Image from "next/image";

type Props = {};

const Page = (props: Props) => {
  const searchParams = useSearchParams();
  const search = searchParams?.get("title");
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data, isLoading } = useGetUserAllCoursesQuery(undefined, {});
  const { data: categoryData } = useGetHeroDataQuery("Category");
  const [courses, setCourses] = useState([]);
  const [category, setCategory] = useState("All");
  const [startIndex, setStartIndex] = useState(0);
  const resultPerPage = 4;
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
          <div className="w-[95%] pt-[100px] 800px:w-[85%] m-auto min-h-screen h-auto">
            <div className= {`w-full h-[300px] `}>
              <div className=" w-full h-[96%] m-auto bg-gradient-to-r from-[#ffffff00] to-[#9292d33b] rounded-br-[100px] flex justify-between items-center max-400px:items-end rounded">
                <h1
                  className={`text-[45px] pb-10 max-800px:pb-[150px] text-black dark:text-white font-Poppins font-[500]`}
                >
                  Popular
                  <br />
                  <span className="bg-clip-text text-[#0000] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]">
                    courses
                  </span>
                </h1>
                <div className=" h-[220px] max-800px:h-[170px] object-contain">
                  <Image
                    src={require("../assets/images/miking.png")}
                    width={1000}
                    height={1000}
                    className={`400px:w-[300px] 400px:h-[300px] dark:bg-[#0c101a] bg-white rounded-full object-contain`}
                    alt="books"
                  />
                </div>
              </div>
            </div>
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

            <PaginationComponent
              itemArray={courses}
              startIndex={startIndex}
              lastIndex={lastIndex}
              setStartIndex={setStartIndex}
              setLastIndex={setLastIndex}
              resultPerPage={resultPerPage}
              data={data?.courses}
            />
          </div>

          <Footer />
        </>
      )}
    </div>
  );
};

export default Page;
