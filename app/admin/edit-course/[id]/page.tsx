'use client'
import React from 'react'
import AdminSidebar from "../../../components/Admin/sidebar/AdminSidebar";
import Heading from '@/app/utils/Heading';
import DashboardHeader from '@/app/components/Admin/DashbordHeader';
import EditCourse from "../../../components/Admin/Course/EditCourse"
import AdminProtected from '@/app/hooks/adminProtected';

type Props = {
 
}

const page = ({params}:any) => {
    const id = params.id;
    
  return (
    <div>
      <AdminProtected>
        <Heading 
          title='ALASKA E-learning-Admin'
          description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma"
        />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5 z-[99999]">
            <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHeader />
            {/* <CreateCourse /> */}
            <EditCourse id={id} />
        </div>
      </div>
      </AdminProtected>
    </div>
  )
}

export default page