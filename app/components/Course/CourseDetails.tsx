import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import React, { useState } from "react";
import {
  IoMdCheckboxOutline,
  IoMdCheckmarkCircleOutline,
  IoMdClose,
} from "react-icons/io";
import { useSelector } from "react-redux";
import { format } from "timeago.js";
import Link from "next/link";
import { style } from "@/app/styles/style";
import CourseContentlist from "../Course/CourseContentlist";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Payment/CheckoutForm"
import Image from "next/image";
import defaultAvatar from "../../assets/images/4532503.png";
import { VscVerifiedFilled } from "react-icons/vsc";

type Props = {
  data: any;
  clientSecret: string;
  stripePromise: any;
  setRoute: any;
  setOpen:any;
};

const CourseDetails = ({ data, clientSecret, stripePromise, setRoute, setOpen:openAuthModal }: Props) => {
  const {user} = useSelector((state:any) => state.auth);
  const [open, setOpen] = useState(false);
   const avatarPng = defaultAvatar;
  const discountPercentage =
    ((data?.estimatedPrice - data?.price) / data?.estimatedPrice) * 100;

  const discountPercentagePrice = discountPercentage.toFixed(0);
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data?._id);

  const handleOrder = (e: any) => {
    if(user){
      setOpen(true);
    }else{
      setRoute("Login");
      openAuthModal(true);
    }
  };


  return (
    <div className=" w-[90%] 800px:w-[90%] m-auto pt-[100px] pb-5">
      <div className="w-full flex flex-col-reverse 800px:flex-row">
        <div className="w-full 800px:w-[65%] 800px:pr-5">
          <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white ">
            {data?.name}
          </h1>
          <div className="flex items-center justify-between pt-3">
            <div className="flex items-center">
              <Ratings rating={data?.ratings} />
              <h5 className=" text-black dark:text-white">
                {data?.reviews?.length} Reviews
              </h5>
            </div>
            <h5 className=" text-black dark:text-white">
              {data?.purchased} Students
            </h5>
          </div>
          <br />
          <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white ">
            What you will learn from this course?
          </h1>
          <div>
            {data?.benefits?.map((item: any, index: number) => (
              <div className=" w-full flex items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoMdCheckmarkCircleOutline
                    size={20}
                    color="green"
                    className=" text-black dark:text-white"
                  />
                </div>
                <p className=" pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>
          <br />
          <br />
          <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white ">
            What are the prerequisites for starting this courses?
          </h1>
          <div>
            {data?.prerequisites?.map((item: any, index: number) => (
              <div className=" w-full flex items-center py-2" key={index}>
                <div className="w-[15px] mr-1">
                  <IoMdCheckboxOutline
                    size={20}
                    color="green"
                    className=" text-black dark:text-white"
                  />
                </div>
                <p className=" pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
          </div>
          <br />
          <br />
          <div>
            <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white">
              Course Overview
            </h1>
            <CourseContentlist data={data?.courseData} isDemo={true} />
          </div>
          <br />
          <br />
          <div className="w-full">
            <h1 className=" text-[25px] font-Poppins font-[600] text-black dark:text-white ">
              Course Details
            </h1>
            <p className=" text-[18px] mt-[20px] whitespace-pre-line overflow-hidden text-black dark:text-white">
              {data?.description}
            </p>
          </div>
          <br />
          <br />
          <div className="w-full">
            <div className=" 800px:flex items-center">
              <Ratings rating={data?.ratings} />
              <div className=" mb-2 800px:mb-[unset]" />
              <h5 className=" text-[25px] font-Poppins text-black dark:text-white">
                {Number.isInteger(data?.ratings)
                  ? data?.ratings.toFixed(1)
                  : data?.ratings.toFixed(2)}{" "}
                Course Rating * {data?.reviews?.length} Reviews
              </h5>
            </div>
            <br />
            {data?.reviews &&
              [...data.reviews].reverse().map((item: any, index: number) => (
                <div className=" w-full pb-4" key={index}>
                  <div className="flex">
                    <div className=" w-[50px] h-[50px]">
                    <div>
                        <Image
                          src={
                            item?.user?.avatar
                              ? item?.user?.avatar?.url
                              : item?.user?.socialAvatar ? item?.user?.socialAvatar : defaultAvatar
                          }
                          width={50}
                          height={50}
                          className=" rounded-full w-[50px] h-[50px] object-cover"
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="hidden 800px:block pl-2">
                      <div className="flex items-center">
                        <h5 className=" text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                      <p className=" text-black dark:text-white">
                        {item.comment}
                      </p>
                      <small className=" text-[#000000d1] dark:text-[#ffffff83]">
                        {format(item?.createdAt)}
                      </small>
                    </div>
                    <div className=" pl-2 flex 800px:hidden items-center">
                      <h5 className=" text-[18px] pr-2 text-black dark:text-white">
                        {item.user.name}
                      </h5>
                      <Ratings rating={item.rating} />
                    </div>
                  </div>
                  {
                      item.commentReplies.map((i:any, index:number) => (
                        <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div>
                          <Image
                            src={
                              i?.user?.avatar
                                ? i?.user?.avatar?.url
                                : i?.user?.socialAvatar ? i?.user?.socialAvatar : avatarPng
                            }
                            width={50}
                            height={50}
                            className=" rounded-full w-[50px] h-[50px] object-cover"
                            alt="avatar"
                          />
                        </div>
                        <div className="pl-3">
                         <div className="flex items-center gap-1">
                         <h1 className=" text-[18px]">{i?.user?.name}</h1>
                          {i?.user.role === "admin" && (
                      <VscVerifiedFilled
                        size={20}
                        className=" text-[#4d83e6]"
                      />
                    )}
                         </div>
                          <p>{i.comment}</p>
                          <small className=" text-[#373636dd] dark:text-[#d6d3d397]">
                            {format(i.createdAt)}
                          </small>
                        </div>
                      </div>
                      ))
                    }
                </div>
              ))}
          </div>
        </div>
        <div className="w-full 800px:w-[35%] relative">
          <div className=" sticky top-[100px] left-0 w-full ">
            <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />
            <div className="flex items-center">
              <h1 className=" pt-5 text-[25px] text-black dark:text-white">
                {data.price === 0 ? "Free" : data.price + "$"}
              </h1>
              <h5 className=" pl-3 text-[20px] mt-2 line-through opacity-80 text-black dark:text-white">
                {data.estimatedPrice}$
              </h5>
              <h4 className=" pl-5 pt-4 text-[22px] text-black dark:text-white">
                {discountPercentagePrice}% Off
              </h4>
            </div>
            {isPurchased ? (
              <Link
                href={`/course-access/${data?._id}`}
                className={`${style.button} !w-[180px] !bg-[crimson]`}
              >
                Enter to Course
              </Link>
            ) : (
              <div
                className={`${style.button} !w-[180px] !bg-[crimson] hover:!bg-[#c01414]`}
                onClick={handleOrder}
              >
                Buy Now {data.price}$
              </div>
            )}
            <br />
            <p>* Source code included</p>
            <p>* Full lifetime access</p>
            <p>* Certificate of completion</p>
            <p>* Premium Support</p>
            <br />
          </div>
        </div>
      </div>
      <>
        {open && (
          <div className=" w-full h-screen bg-[#00000036] fixed top-0 left-0 z-0 flex items-center justify-center">
            <div className="w-[500px] h-fit bg-white rounded-xl shadow p-3">
               <div className="w-full flex justify-end">
               <IoMdClose size={40} className=" text-black cursor-pointer" onClick={() => setOpen(false)}/>
               </div>
               <div className="w-full">
                {
                    stripePromise && clientSecret && (
                      <Elements stripe={stripePromise} options={{clientSecret}}>
                      <CheckoutForm setOpen={setOpen} data={data} user={user} />
                      </Elements>
                    )
                }
               </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default CourseDetails;
