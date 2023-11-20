'use client'
import React from 'react'
import Navigation from "../components/Navigation";

type Props = {
   
    activeItem: number;
    open: boolean;
    setOpen: any;
    route: string;
    setRoute: (route:string) => void;
}

const Header:React.FC<Props> = ({activeItem, open, setOpen, route, setRoute }) => {
  
  return (
    <div className=' w-full relative z-10'>
      <div className={`fixed top-2 w-full bg-opacity-50`}>
      <Navigation activeItem={activeItem} open={open} setOpen={setOpen} route={route} setRoute={setRoute} />
      
      </div>
    </div>
  )
}

export default Header