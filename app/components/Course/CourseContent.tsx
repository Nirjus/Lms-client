import { useGetCourseContentQuery } from '@/redux/features/courses/coursesApi';
import React, { useState } from 'react'
import Loader from '../Loader';
import Heading from '@/app/utils/Heading';
import CourseContentMedia from "./CourseContentMedia"
import Header from '../Header';
import CourseContentlist from './CourseContentlist';

type Props = {
    id: string;
    user: any;
}

const CourseContent = ({id, user}: Props) => {
   
    const {data:contentData, isLoading, refetch} = useGetCourseContentQuery(id,{refetchOnMountOrArgChange:true});
    const data = contentData?.content;
    const [activeVideo, setActiveVideo] = useState(0);
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    
  return (
   <>
   {
    isLoading ? (
        <Loader />
    ) : (
        <>
         <Heading title={data[activeVideo]?.title}
            description="course access page information"
            keyword={data[activeVideo]?.tags}
           />
        <Header
        route={route}
        setRoute={setRoute}
        open={open}
        setOpen={setOpen}
        activeItem={1}/>
        <div className=' w-full pt-[100px] grid 800px:grid-cols-10'>
           
           <div className="col-span-7">
                <CourseContentMedia 
                data={data}
                id={id}
                 activeVideo={activeVideo}
                 setActiveVideo={setActiveVideo}
                 user={user}
                 refetch={refetch}
                />
           </div>
           <div className="hidden 800px:block 800px:col-span-3">
            <CourseContentlist 
              data={data}
              setActiveVideo={setActiveVideo}
              activeVideo={activeVideo}
            />
           </div>
        </div>
        </>
    )
   }
   </>
  )
}

export default CourseContent