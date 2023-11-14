import { style } from "@/app/styles/style";
import { useEditLAyoutMutation, useGetHeroDataQuery } from "@/redux/features/layout/layputApi";
import React, { FC, useEffect, useState } from "react";
import { AiOutlineCamera } from "react-icons/ai";
import {toast} from 'react-toastify';
type Props = {};

const EditHero: FC<Props> = ({}) => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const { data,refetch } = useGetHeroDataQuery("Banner",{refetchOnMountOrArgChange:true});
  const [editLAyout,{isLoading,isSuccess,error}] = useEditLAyoutMutation();

  useEffect(() => {
    if (data) {
      setTitle(data?.layout?.banner.title);
      setSubTitle(data?.layout?.banner.subtitle);
      setImage(data?.layout?.banner?.image?.url);
    }
    if(isSuccess){
      refetch();
      toast.success("Hero updated successfully");
    }
    if(error){
      if("data" in error){
        const errorData = error as any;
          toast.error(errorData?.data?.message);
      }
    }
  }, [data, isSuccess,error,refetch]);

  const handleUpdate = (e: any) => {
    const file = e.target.files?.[0];
    if(file){
      const reader = new FileReader();
      reader.onload = (e) => {
        if(reader.readyState === 2){
          setImage(e.target?.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleEdit = async() => {
     await editLAyout({
      type:"Banner",
      image,
       title,
      subtitle:subTitle
     })
  };
  return (
    <div className=" w-full 1000px:flex items-center">
      <div className=" absolute top-[100px] 1000px:top-[unset] 1500px:h-[600px] 1500px:w-[600px] 1100px:h-[500px] 1100px:w-[500px] 1000px:mr-[100px]  h-[50vh] w-[50vh] hero_animation rounded-full"></div>
      <div className=" 1000px:w-[40%] flex 1000px:min-h-screen items-center justify-end pt-[80px] 1000px:pt-[0] 1000px:mr-[100px] z-10">
        <div className="relative flex items-center justify-end">
          <img
            src={image}
            alt=""
            className=" object-contain 1100px:max-w-[90%] 1500px:max-w-[85%] h-auto z-10"
          />
          <input
            type="file"
            name=""
            id="banner"
            accept="image/*"
            onChange={handleUpdate}
            className=" hidden"
          />
          <label htmlFor="banner" className=" absolute bottom-0 right-0 z-20">
            <AiOutlineCamera className=" dark:text-white text-black text-[18px] cursor-pointer" />
          </label>
        </div>
      </div>
      <div className="1000px:w-[60%] flex flex-col items-center 1000px:mt-[0px] text-center 1000px:text-left mt-[150px]">
        <textarea
          className="dark:text-white text-[#000000c7] text-[30px] px-3 1000px:text-[60px] font-[600] text-center font-Josefin py-2 1000px:leading-[75px] outline-none bg-transparent"
          placeholder="Improve Your Online Learning Experience Better Instantly"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={4}
        />
        <br />
        <textarea
           rows={3}
          value={subTitle}
          onChange={(e) => setSubTitle(e.target.value)}
          placeholder="We have 40k+ Online courses & 500K+ Online registered student. Find your desired Courses from them."
          className="dark:text-[#edfff4] text-[#000000ac] outline-none font-Josefin font-[600] text-[18px] 1500px:!w-[55%] 1100px:!w-[74%] bg-transparent"
        ></textarea>
        <br />
        <br />
        <br />
        <div
          className={`${
            style.button
          } !w-[100px] !min-h-[40px] !h-[40px] dark:text-white text-black
${
  data?.layout?.banner?.title !== title ||
  data?.layout?.banner?.subtitle !== subTitle ||
  data?.layout?.banner?.image?.url !== image
    ? "!cursor-pointer !bg-[#42d383]"
    : "!cursor-not-allowed"
} !rounded absolute bottom-12 right-12`}
          onClick={
            data?.layout?.banner?.title !== title ||
            data?.layout?.banner?.subtitle !== subTitle ||
            data?.layout?.banner?.image?.url !== image
              ? handleEdit
              : () => null
          }
        >
          save
        </div>
      </div>
    </div>
  );
};

export default EditHero;
