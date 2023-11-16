import { useGetHeroDataQuery } from "@/redux/features/layout/layputApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSearch } from "react-icons/bi";
type Props = {};

const Hero = (props: Props) => {
  const { data } = useGetHeroDataQuery("Banner");
 
  return (
    <div className="w-full min-h-screen h-auto 1000px:flex items-center">
      <div className="hero_animation absolute 1000px:w-[600px] 1000px:h-[600px] top-[100px] max-800px:w-[300px] max-800px:h-[300px] max-800px:left-[0px] max-800px:top-[70px] left-[50px] "></div>
      <div className=" w-full 1000px:w-[50%] pl-10 flex justify-center items-center pt-[80px] ">
        <Image
          src={data?.layout?.banner?.image?.url}
          width={1000}
          height={1000}
          alt=""
          className="object-contain 1100px:max-w-[90%] w-[90%] 1500px:max-w-[85%] h-auto z-[5] "
        />
      </div>
      <div className="1000px:w-[50%] w-full flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[80px] 800px:pt-[100px]">
        <h2 className="dark:text-white text-[#000000c7] text-[30px] px-3 1000px:text-[60px] font-[600] text-center font-Josefin py-2 1000px:leading-[75px]">
         {data?.layout?.banner?.title}
        </h2>
        <br />
        <p className="dark:text-[#edfff4] text-[#000000ac] font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[78%]">
         {data?.layout?.banner?.subtitle}
        </p>
        <br />
        <br />
        <div className=" flex 1500px:w-[55%] 1100px:w-[78%] w-[90%] h-[50px]">
          <input
            type="search"
            placeholder="Search Courses..."
            className=" bg-[#bebebe] border dark:border-none dark:bg-[#575757] dark:placeholder:text-[#ffffffdd] placeholder:text-white rounded-l-[5px] p-2 w-full h-full outline-none text-[#00000094] dark:text-[#ffffffe6] text-[20px] font-[600] font-Josefin "
          />
          <div className=" flex items-center justify-center w-[50px] cursor-pointer h-[50px] right-0 top-0 bg-[#39c1f3] rounded-r-[5px]">
            <BiSearch className="text-white" size={30} />
          </div>
        </div>
        <br />
        <br />
        <div className="1500px:w-[55%] 1100px:w-[78%] w-[90%] flex items-center">
          <Image
            src={require("../../assets/images/client-1.jpg")}
            alt=""
            className="rounded-full"
          />
          <Image
            src={require("../../assets/images/client-2.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <Image
            src={require("../../assets/images/client-3.jpg")}
            alt=""
            className="rounded-full ml-[-20px]"
          />
          <p className="font-Josefin dark:text-[#edfff4] text-[#000000b3] 1000px:pl-3 text-[18px] font-[600]">
            500K+ People already trusted us.{""}
            <Link
              href="/courses"
              className="dark:text-[#46e256] text-[crimson]"
            >
              View Courses
            </Link>
            {""}
          </p>
        </div>
        <br />
      </div>
    </div>
  );
};

export default Hero;
