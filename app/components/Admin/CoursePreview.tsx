import React, { FC, useState } from "react";
import CoursePlayer from "../../utils/CoursePlayer";
import { style } from "@/app/styles/style";
import Ratings from "@/app/utils/Ratings";
import {
  IoMdCheckboxOutline,
  IoMdCheckmarkCircleOutline,
} from "react-icons/io";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseData: any;
  handleCourseCreate: any;
  isEdite: boolean;
};

const CoursePreview: FC<Props> = ({
  active,
  setActive,
  courseData,
  handleCourseCreate,
  isEdite,
}) => {
  const discountParcentage =
    ((courseData?.estimatedPrice - courseData?.price) /
      courseData?.estimatedPrice) *
    100;

  const discountPercentPrice = discountParcentage.toFixed(0);

  const prevButton = () => {
    setActive(active - 1);
  };
  const createCourse = () => {
    handleCourseCreate();
  };
  return (
    <div className=" w-[90%] m-auto py-5 mb-0">
      <div className="w-full relative">
        <div className="w-full mt-10">
          <CoursePlayer
            videoUrl={courseData?.demoUrl}
            title={courseData?.title}
          />
        </div>
        <div className="flex items-center">
          <h1 className=" pt-5 text-[25px]">
            {courseData?.price === 0 ? "Free" : courseData?.price + "$"}
          </h1>
          <h5 className=" pl-3 text-[20px] mt-2 line-through opacity-80">
            {courseData?.estimatedPrice}$
          </h5>
          <h4 className=" pl-5 pt-4 text-[22px]">
            {discountPercentPrice}% Off
          </h4>
        </div>
        <div className="flex items-center">
          <div
            className={`${style.button} !w-[230px] !bg-[crimson] !cursor-not-allowed`}
          >
            Buy Now {courseData?.price}$
          </div>
        </div>
        <div className="flex items-center gap-3 w-full">
          <input
            type="text"
            name=""
            id=""
            placeholder="Discount code ..."
            className={`${style.input} !w-[70%] !mt-0`}
          />
          <div className={`${style.button} !w-[20%]`}>Apply</div>
        </div>
        <p>* Source code included</p>
        <p>* Full lifetime access</p>
        <p>* Certificate of completion</p>
        <p>* Premium Support</p>
      </div>
      <div className="w-full">
        <div className="w-full 800px:pr-5">
          <h1 className=" text-[25px] font-Poppins font-[600]">
            {courseData?.name}
          </h1>
          <div className="flex items-center justify-between pr-[50px] pt-3">
            <div className="flex items-center">
              <Ratings rating={0} />
              <h5>0 Reviews</h5>
            </div>
            <h5>0 Student</h5>
          </div>
          <br />
          <h1 className="text-[25px] font-Poppins font-[600]">
            What you will learn from this project?
          </h1>
        </div>
        {courseData?.benefits?.map((item: any, index: number) => (
          <div key={index} className="w-full flex items-center py-2">
            <div className=" w-[15px] mr-1">
              <IoMdCheckmarkCircleOutline size={20} color={"green"} />
            </div>
            <p className=" pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        <h1 className=" text-[25px] font-Poppins font-[600]">
          What are the prerequisites for strting this course ?
        </h1>
        {courseData?.prerequisites.map((item: any, index: number) => (
          <div className="w-full flex items-center py-2" key={index}>
            <div className=" w-[15px] mr-1">
              <IoMdCheckboxOutline size={20} color={"green"} />
            </div>
            <p className="pl-2">{item.title}</p>
          </div>
        ))}
        <br />
        <br />
        {/* course description */}
        <div className="w-full">
          <h1 className=" text-[25px] font-Poppins font-[600]">
            Course Details
          </h1>
          <p className=" text-[18px] text-justify  mt-[20px] pr-[50px]">
            {courseData?.description}
          </p>
        </div>
        <br />
        <br />
      </div>
      <div className=" w-full flex items-center justify-between pr-[100px] ">
        <div
          className={`${style.button} !w-[200px]`}
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className={`${style.button} !w-[200px]`}
          onClick={() => createCourse()}
        >
          {
            isEdite ? "Update" : "Create"
          }
        </div>
      </div>
    </div>
  );
};

export default CoursePreview;
