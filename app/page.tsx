'use client'
import React,{FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Courses from "./components/Route/Courses"
import Reviews from "./components/Route/Reviews"
import FAQ from "./components/FAQ/FAQ";
import Footer from "./components/Footer"
interface Props{}

const Page: FC<Props> = (props) =>{
  const [activeItem, setActiveItem] = useState(0);

  return (
      <div>
        <Heading title="ALASKA" description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma" />
       <Header  activeItem={activeItem} />
        <Hero />
        <Courses />
        <Reviews />
        <FAQ />
        <Footer />
      </div>
  )
};

export default Page;