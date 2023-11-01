'use client'
import React from 'react'
import Navigation from "../components/Navigation";

type Props = {
   
    activeItem: number;
}

const Header:React.FC<Props> = ({activeItem }) => {
  
  return (
    <div className=' w-full relative z-10'>
      <div className={`fixed top-2 w-full bg-opacity-50`}>
      <Navigation activeItem={activeItem} />
      
      </div>
    </div>
  )
}

export default Header