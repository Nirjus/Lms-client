"use client"
import React,{useState} from 'react'
import Heading from '../utils/Heading'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CreatersCard from "../components/Creaters/CreatersCard"

type Props = {}

const Page = (props: Props) => {
    const [open, setOpen] = useState(false);
    const [route, setRoute] = useState("Login");
    const [activeItem, setActiveItem] = useState(3);
  return (
    <div>
        <Heading 
        title='Creators List-ALASKA E-Learning'
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
        {/* <Policy /> */}
        
        <CreatersCard />

        <Footer />
    </div>
  )
}

export default Page