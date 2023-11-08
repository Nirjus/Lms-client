'use client'
import React from 'react'
import AdminSidebar from "../../components/Admin/sidebar/AdminSidebar";
import Heading from '@/app/utils/Heading';
import CreateCourse from "../../components/Admin/CreateCourse";
import DashboardHeader from '@/app/components/Admin/DashbordHeader';
type Props = {}

const page = (props: Props) => {
  return (
    <div>
        <Heading 
          title='ALASKA E-lear.. -Admin'
          description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma"
        />
      <div className="flex">
        <div className="1500px:w-[16%] w-1/5">
            <AdminSidebar />
        </div>
        <div className="w-[85%]">
            <DashboardHeader />
            <CreateCourse />
        </div>
      </div>
    </div>
  )
}

export default page