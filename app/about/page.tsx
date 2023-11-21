"use client"
import React, { useState } from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import About from "./About"
import Footer from '../components/Footer'

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const [activeItem, setActiveItem] = useState(2);
  return (
    <div>
        <Heading 
        title='About us - ALASKA E-Learning'
        description='ALASKA is a multipurpose modern e-Learning system'
        keyword='skills, learning'
        />
        <Header 
        open={open}
        setOpen={setOpen}
        route={route}
        setRoute={setRoute}
        activeItem={activeItem}
        />
        <About />
        <Footer />
    </div>
  )
}

export default Page