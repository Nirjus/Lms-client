import { style } from "@/app/styles/style";
import React, { FC, useState } from "react";
import { AiOutlineDelete, AiOutlinePlusCircle } from "react-icons/ai";
import { BiSolidPencil } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { BsLink45Deg } from "react-icons/bs";
import { toast } from "react-toastify";
import { RxCross1 } from "react-icons/rx";

type Props = {
  active: number;
  setActive: (active: number) => void;
  courseContentData: any;
  setCourseContentData: (courseContentData: any) => void;
  handleSubmit: any;
};

const CourseContent: FC<Props> = ({
  active,
  setActive,
  courseContentData,
  setCourseContentData,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData.length).fill(false)
  );

  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };
  const handleCollapsedToggle = (index: number) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLinks = (index: number, linkIndex: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index: number) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item: any) => {
    if (
      item.title === "" ||
      item.description === "" ||
      item.videoUrl === "" ||
      item.videoLength === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      toast.error("Please fill all the fields!");
    } else {
      let newVideoSection = "";
      if (courseContentData.length > 0) {
        const lastVideoSection =
          courseContentData[courseContentData.length - 1].videoSection;

        //  use the last video section if available, else use input
        if (lastVideoSection) {
          newVideoSection = lastVideoSection;
        }
      }
      const newContent = {
        videoUrl: "",
        title: "",
        videoLength: "",
        description: "",
        videoSection: newVideoSection,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const addNewSection = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoLength === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Please fill all the fields first!");
    } else {
      setActiveSection(activeSection + 1);
      const newContent = {
        videoUrl: "",
        title: "",
        videoLength: "",
        description: "",
        videoSection: `Untitled Section ${activeSection}`,
        links: [{ title: "", url: "" }],
      };
      setCourseContentData([...courseContentData, newContent]);
    }
  };
  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      toast.error("Section can not be empty");
    } else {
      setActive(active + 1);
      handleCourseSubmit();
    }
  };
  const handleVideoUpload = (e: any, index: number) => {
   
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          const updateData = [...courseContentData];
          updateData[index].videoUrl = reader.result;
          setCourseContentData(updateData);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className=" w-[80%] m-auto mt-24  p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData.map((item: any, index: number) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;
          return (
            <>
              <div
                key={index}
                className={`w-full dark:bg-[#cdc8c817] bg-[#cdc8c831] shadow-md mb-1 rounded-[5px]  p-4 ${
                  showSectionInput ? "mt-10" : "mb-1"
                }`}
              >
                {showSectionInput && (
                  <>
                    <div className="flex w-full items-center">
                      <input
                        type="text"
                        className={`text-[20px] ${
                          item.videoSection === "Untitled Section"
                            ? "w-[170px]"
                            : "w-min"
                        } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                        value={item.videoSection}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].videoSection = e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <BiSolidPencil className=" cursor-pointer dark:text-white text-black" />
                    </div>
                    <br />
                  </>
                )}
                <div className="flex w-full items-center justify-between my-0">
                  {isCollapsed[index] ? (
                    <>
                      {item.title ? (
                        <p className=" font-Poppins dark:text-white text-black">
                          {index + 1}. {item.title}
                        </p>
                      ) : (
                        <></>
                      )}
                    </>
                  ) : (
                    <div></div>
                  )}
                  {/* {//  arrow button for collapsed video content} */}
                  <div className=" flex items-center ">
                    <AiOutlineDelete
                      className={` dark:text-white text-black text-[20px] mr-2 ${
                        index > 0 ? "cursor-pointer" : "cursor-no-drop"
                      }`}
                      onClick={() => {
                        if (index > 0) {
                          const updateData = [...courseContentData];
                          updateData.splice(index, 1);
                          setCourseContentData(updateData);
                        }
                      }}
                    />
                    <MdOutlineKeyboardArrowDown
                      size={25}
                      className=" dark:text-white text-black cursor-pointer"
                      style={{
                        transform: isCollapsed[index]
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                      }}
                      onClick={() => handleCollapsedToggle(index)}
                    />
                  </div>
                </div>
                {!isCollapsed[index] && (
                  <>
                    <div className=" my-3">
                      <label htmlFor="" className={style.label}>
                        Video Title
                      </label>
                      <input
                        type="text"
                        placeholder="project plan.."
                        className={style.input}
                        value={item.title}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].title = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className=" my-3">
                      <label
                        htmlFor={`video-input-${index}`}
                        className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center rounded-[5px] active:bg-blue-500 `}
                      >
                        <input
                          type="file"
                          id={`video-input-${index}`}
                          accept="video/*"
                          className=" hidden"
                          onChange={(e) => handleVideoUpload(e, index)} />
                        {item?.videoUrl ? (
                          <div className=" w-full">
                            <RxCross1
                              onClick={() => {
                                const updateData = [...courseContentData];
                                const updatedItem = { ...updateData[index], videoUrl: ""};
                                updateData[index] = updatedItem;
                                setCourseContentData(updateData);
                              }}
                              className=" mb-2 cursor-pointer"
                            />
                            <video
                              src={item?.videoUrl}
                              className="w-full aspect-video"
                              controls
                            ></video>
                          </div>
                        ) : (
                          <span className=" text-black dark:text-white">
                            Click here for browse the video for chapter video
                          </span>
                        )}
                      </label>
                    </div>
                    <div className=" my-3">
                      <label htmlFor="" className={style.label}>
                        Video Length (in minutes)
                      </label>
                      <input
                        type="number"
                        placeholder="24 min"
                        className={style.input}
                        value={item.videoLength}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].videoLength = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                    </div>
                    <div className=" my-3">
                      <label htmlFor="" className={style.label}>
                        Video Description
                      </label>
                      <textarea
                        rows={8}
                        cols={30}
                        placeholder="Its the description make it amazing"
                        className={`${style.input} h-min py-2`}
                        value={item.description}
                        onChange={(e) => {
                          const updateData = [...courseContentData];
                          updateData[index].description = e.target.value;
                          setCourseContentData(updateData);
                        }}
                      />
                      <br />
                    </div>
                    {item?.links.map((link: any, linkIndex: number) => (
                      <div key={index} className="mb-3 block">
                        <div className="w-full flex items-center justify-between">
                          <label htmlFor="" className={style.label}>
                            Link {linkIndex + 1}
                          </label>
                          <AiOutlineDelete
                            className={` dark:text-white text-black text-[20px] mr-2 ${
                              index === 0 ? " cursor-no-drop" : "cursor-pointer"
                            }`}
                            onClick={() => {
                              linkIndex === 0
                                ? null
                                : handleRemoveLinks(index, linkIndex);
                            }}
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Source Code.. (link title)"
                          className={`${style.input}`}
                          value={link.title}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].title =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                        <input
                          type="url"
                          placeholder="SourceCode Url..(Link Url)"
                          className={`${style.input} mt-6`}
                          value={link.url}
                          onChange={(e) => {
                            const updatedData = [...courseContentData];
                            updatedData[index].links[linkIndex].url =
                              e.target.value;
                            setCourseContentData(updatedData);
                          }}
                        />
                      </div>
                    ))}
                    <br />
                    <div className="inline-block mb-4">
                      <p
                        className=" flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                        onClick={() => handleAddLink(index)}
                      >
                        <BsLink45Deg className=" mr-2" /> Add Link
                      </p>
                    </div>
                  </>
                )}
                <br />
                {/* {add new content} */}
                {index === courseContentData.length - 1 && (
                  <div>
                    <p
                      className={` flex items-center w-fit text-[18px] dark:text-white text-black cursor-pointer`}
                      onClick={() => newContentHandler(item)}
                    >
                      <AiOutlinePlusCircle className=" mr-2" /> Add New Content
                    </p>
                  </div>
                )}
              </div>
            </>
          );
        })}
        <br />
        <div
          className="flex items-center text-[20px] w-fit dark:text-white text-black cursor-pointer"
          onClick={() => addNewSection()}
        >
          <AiOutlinePlusCircle className=" mr-2" /> Add new Section
        </div>
      </form>
      <br />
      <div className=" w-full flex items-center justify-between">
        <div
          className={`${style.button} !w-[250px]`}
          onClick={() => prevButton()}
        >
          Prev
        </div>
        <div
          className={`${style.button} !w-[250px]`}
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
      <br />
      <br />
    </div>
  );
};

export default CourseContent;
