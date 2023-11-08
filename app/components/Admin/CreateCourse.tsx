'use client'
import React, { useState } from 'react'
import CourseInformation from "./CourseInformation";
type Props = {}

const CreateCourse = (props: Props) => {
    const [active, setActive] = useState(0);
    const [courseInfo, setCourseInfo] = useState({
        name: "",
        description: "",
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
  return (
    <div className=' w-full min-h-screen'>
        <div className="w-[80%]">
            {
                active === 0 && (
                    <CourseInformation />
                )
            }
        </div>
    </div>
  )
}

export default CreateCourse