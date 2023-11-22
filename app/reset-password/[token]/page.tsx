"use client";
import ResetPassword from "@/app/components/Auth/ResetPassword";
import Header from "@/app/components/Header";
import CustomModal from "@/app/utils/CustomModal";
import Heading from "@/app/utils/Heading";
import React, { useState } from "react";

type Props = {
    params: any;
};

const Page = ({ params }: Props) => {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [route, setRoute] = useState("Reset-Password");
  const token = params.token;
  
  return (
    <div className=" w-full min-h-screen">
      <Heading
        title="Reset password -ALASKA"
        description="Reset password description"
        keyword="Programing, token"
      />
      <Header
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
      />
      {
        route === "Reset-Password" && (
            <CustomModal 
             open={open}
             setOpen={setOpen}
             setRoute={setRoute}
             activeItem={activeItem}
             component={ResetPassword}
             token={token}
            />
        )
      }
      
    </div>
  );
};

export default Page;
