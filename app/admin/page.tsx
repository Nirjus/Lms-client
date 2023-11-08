"use client"
import React from 'react'
import Heading from '../utils/Heading'
import AdminSidebar from "../components/Admin/sidebar/AdminSidebar"
import AdminProtected from '../hooks/adminProtected'
import DashboardHero from "../components/Admin/DashboardHero"
type Props = {}

const page = (props: Props) => {
  return (
    <div>
       <AdminProtected>
       <Heading title="ALASKA - Admin" 
         description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma"
        />
       <div className="flex h-[200vh]">
                    <div className="w-1/5 1500px:w-[16%]">
                        <AdminSidebar />
                    </div>
                    <div className="w-[85%]">
                        <DashboardHero />
                    </div>
       </div>
       </AdminProtected>
    </div>
  )
}

export default page