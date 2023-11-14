"use client"
import DashboardHero from '@/app/components/Admin/DashboardHero'
import AdminProtected from '@/app/hooks/adminProtected'
import Heading from '@/app/utils/Heading'
import AdminSidebar from "@/app/components/Admin/sidebar/AdminSidebar";
import React from 'react'
import CourseAnalytics from "../../components/Admin/Analytics/CourseAnalytics"

type Props = {}

const page = (props: Props) => {
  return (
    <div>
    <AdminProtected>
    <Heading title="ALASKA - Admin" 
      description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma"
     />
    <div className="flex min-h-screen h-auto">
                 <div className="w-1/5 1500px:w-[16%]">
                     <AdminSidebar />
                 </div>
                 <div className="w-[85%]">
                     <DashboardHero />
                    <CourseAnalytics />
                 </div>
    </div>
    </AdminProtected>
 </div>
  )
}

export default page