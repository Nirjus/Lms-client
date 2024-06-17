import { style } from "@/app/styles/style";
import { useGetHeroDataQuery } from "@/redux/features/layout/layputApi";
import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

type Props = {
  courseInfo: any;
  setCourseInfo: (courseInfo: any) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseInformation: FC<Props> = ({
  courseInfo,
  setCourseInfo,
  active,
  setActive,
}) => {
  const [dragging, setDragging] = useState(false);
  const { data } = useGetHeroDataQuery("Category");

  const [category, setCategory] = useState([]);
  useEffect(() => {
    if (data) {
      setCategory(data?.layout.category);
    }
  }, [data]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setActive(active + 1);
  };

  const handleImageUpload = (e: any) => {
    const file = e.target?.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, thumbnail: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleVideoUpload = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        if (reader.readyState === 2) {
          setCourseInfo({ ...courseInfo, demoUrl: reader.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: any) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        setCourseInfo({ ...courseInfo, thumbnail: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className=" w-[80%] m-auto mt-24">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={style.label}>
            Course Name
          </label>
          <input
            type="text"
            name=""
            required
            value={courseInfo.name}
            onChange={(e: any) =>
              setCourseInfo({ ...courseInfo, name: e.target.value })
            }
            id="name"
            placeholder="MERN stack lms with next 13"
            className={style.input}
          />
        </div>
        <br />
        <div className=" mb-5">
          <label htmlFor="" className={style.label}>
            Course Description
          </label>
          <textarea
            name=""
            id=""
            cols={30}
            rows={10}
            placeholder="Write something amazing"
            className={`${style.input} h-min py-2`}
            value={courseInfo.description}
            onChange={(e) =>
              setCourseInfo({ ...courseInfo, description: e.target.value })
            }
          ></textarea>
        </div>
        <br />
        <div className=" w-full flex justify-between ">
          <div className=" w-[45%]">
            <label htmlFor="price" className={style.label}>
              Course Price
            </label>
            <input
              type="number"
              name=""
              required
              id="price"
              placeholder="2024"
              className={style.input}
              value={courseInfo.price}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, price: e.target.value })
              }
            />
          </div>
          <div className=" w-[50%]">
            <label htmlFor="estimatedPrice" className={style.label}>
              Estimated Price (optional)
            </label>
            <input
              type="number"
              name=""
              id="estimatedPrice"
              placeholder="2023"
              className={style.input}
              value={courseInfo.estimatedPrice}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
              }
            />
          </div>
        </div>
        <br />
        <div className=" w-full flex justify-between">
          <div className=" w-[45%]">
            <label htmlFor="tags" className={style.label}>
              Course Tags
            </label>
            <input
              type="text"
              required
              id="tags"
              placeholder="MERN STACK Next 13 project"
              value={courseInfo.tags}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, tags: e.target.value })
              }
              className={style.input}
            />
          </div>
          <div className="w-[50%]">
            <label htmlFor="category" className={style.label}>
              Course Category
            </label>
            <select
              name=""
              id=""
              className={style.input}
              value={courseInfo.category}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, category: e.target.value })
              }
            >
              <option
                value=""
                className=" dark:bg-black bg-white  dark:text-white text-black"
              >
                Select Category
              </option>
              {category.map((item: any, index: number) => (
                <option
                  value={item.title}
                  key={index}
                  className=" dark:bg-black bg-white  dark:text-white text-black"
                >
                  {item.title}
                </option>
              ))}
            </select>
          </div>
        </div>
        <br />
        <div className=" w-full flex justify-between ">
          <div className=" w-[45%]">
            <label htmlFor="level" className={style.label}>
              Course Level
            </label>
            <input
              type="text"
              name=""
              required
              id="level"
              placeholder="Biginner/Intermediate/expart"
              className={style.input}
              value={courseInfo.level}
              onChange={(e) =>
                setCourseInfo({ ...courseInfo, level: e.target.value })
              }
            />
          </div>
        </div>
        <br />
        <div className=" w-full">
          <label
            htmlFor="video"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center rounded-[5px] active:bg-blue-500 `}
          >
            <input
              type="file"
              id="video"
              accept="video/*"
              className=" hidden"
              onChange={handleVideoUpload}
            />
            {courseInfo.demoUrl ? (
              <div className=" w-full">
                <RxCross1
                  onClick={() => {
                    setCourseInfo({ ...courseInfo, demoUrl: "" });
                  }}
                  className=" mb-2 cursor-pointer"
                />
                <video
                  src={courseInfo?.demoUrl}
                  className=" w-full aspect-video"
                  controls
                ></video>
              </div>
            ) : (
              <span className=" text-black dark:text-white">
                Click here for browse the video for demo Video
              </span>
            )}
          </label>
          <br />
          <input
            type="file"
            accept="image/*"
            id="file"
            className=" hidden"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="file"
            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center rounded-[5px] active:bg-blue-500 ${
              dragging ? "bg-blue-500" : "bg-transparent"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {courseInfo.thumbnail ? (
              <Image
                src={courseInfo.thumbnail}
                width={1000}
                height={1000}
                alt="courseThumbnail"
                className=" max-h-full w-full object-cover"
              />
            ) : (
              <span className=" text-black dark:text-white">
                Drag and drop your thumbnail here or click to browse
              </span>
            )}
          </label>
        </div>
        <br />
        <div className=" w-full flex justify-end">
          <input
            type="submit"
            value="Next"
            className={`${style.button} 800px:w-[180px]`}
          />
        </div>
        <br />
        <br />
      </form>
    </div>
  );
};

export default CourseInformation;
