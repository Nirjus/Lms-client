'use client'
import React, { useEffect, useState } from 'react'
import CourseInformation from "./CourseInformation";
import CourseOption from "./CourseOption";
import CourseData from "./CourseData";
import CourseContent from './CourseContent'
import CoursePreview from "./CoursePreview"
import { useCreateCourseMutation } from '@/redux/features/courses/coursesApi';
import { toast } from 'react-toastify';
import { redirect } from 'next/navigation';

type Props = {}

const CreateCourse = (props: Props) => {
    const [createCourse,{isLoading,data,isSuccess,error}] = useCreateCourseMutation();

    useEffect(() => {
     if(isSuccess){
        const message = data?.message || "course created successfully";
        toast.success(message);
        redirect("/admin/courses");
     }
     if(error){
     if("data" in error){
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
     }
    }
    },[isLoading,isSuccess,error,data])

    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
        category:"",
        price:"",
        tags: "",
        level: "",
        estimatedPrice: "",
        demoUrl: "",
        thumbnail: "",
    });
    const [benefits, setBenefits] = useState([{title: ""}]);
    const [prerequisites, setPrerequisites] = useState([{title: ""}]);
    const [courseContent, setCourseContent] = useState([
        {
            videoUrl: "",
            title: "",
            description: "",
            videoSection: "Untitled Section",
            videoLength: "",
            links: [
                {
                    title: "",
                    url: "",
                },
            ],
            suggestion: "",
        },
    ]);
    
    const [courseData, setCourseData] = useState({});
    
    const handleSubmit = async () => {
          const formatedBenefites = benefits.map((benefit) => ({title:benefit.title}));
          const formatedPrerequisites = prerequisites.map((prerequisites) => ({title: prerequisites.title}));

          const formatedCourseContentData = courseContent.map((coursecontent) => ({
            videoUrl: coursecontent.videoUrl,
            title: coursecontent.title,
            description: coursecontent.description,
            videoLength: coursecontent.videoLength,
            videoSection: coursecontent.videoSection,
            links: coursecontent.links.map((link) => ({
                title: link.title,
                url: link.url,
            })),
            suggestion: coursecontent.suggestion
          })
          );

          //  prepare our data object
          const data = {
            name: courseInfo.name,
            description: courseInfo.description,
            category: courseInfo.category,
            price: courseInfo.price,
            estimatedPrice: courseInfo.estimatedPrice,
            tags: courseInfo.tags,
            thumbnail: courseInfo.thumbnail,
            level: courseInfo.level,
            demoUrl: courseInfo.demoUrl,
            totalVideos: courseContent.length,
            benefits: formatedBenefites,
            prerequisites: formatedPrerequisites,
            courseData: formatedCourseContentData,
          };

          setCourseData(data);
    }
   const handleCourseCreate = async (e:any) => {
       const data = courseData;
      if(!isLoading){
       await createCourse(data);
   }
   }
  return (
    <div className=' w-full min-h-screen'>
        <div className="w-[80%]">
            {
                active === 0 && (
                    <CourseInformation courseInfo={courseInfo} setCourseInfo={setCourseInfo} active={active} setActive={setActive}  />
                )
            }
            {
                active === 1 && (
                    <CourseData benefits={benefits} setBenefits={setBenefits} prerequisites={prerequisites} setPrerequisites={setPrerequisites} active={active} setActive={setActive}  />
                )
            }
             {
                active === 2 && (
                    <CourseContent courseContentData={courseContent} setCourseContentData={setCourseContent} active={active} setActive={setActive} handleSubmit={handleSubmit} />
                )
            }
             {
                active === 3 && (
                    <CoursePreview courseData={courseData} handleCourseCreate={handleCourseCreate} isEdite={false} active={active} setActive={setActive} />
                )
            }
        </div>
        <div className="w-[20%] mt-[100px] h-screen fixed z-[-1] top-0 right-0">
             <CourseOption active={active} setActive={setActive} />
        </div>
    </div>
  )
}

export default CreateCourse