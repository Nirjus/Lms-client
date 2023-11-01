'use client'
import React,{FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
interface Props{}

const Page: FC<Props> = (props) =>{
  const [activeItem, setActiveItem] = useState(0);

  return (
      <div>
        <Heading title="ALASKA" description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma" />
       <Header  activeItem={activeItem} />
        <Hero />
      </div>
  )
};

export default Page;