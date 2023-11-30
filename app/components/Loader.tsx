import React from 'react'
import Lottie from 'lottie-react'
import animation from "../assets/animation/Animation - 1699998893498.json";
type Props = {}

const Loader = (props: Props) => {
  return (
    <div className=' w-full h-screen flex justify-center items-center'>
           <Lottie animationData={animation} loop={true} className='w-[400px] h-[400px] mx-auto'/>
    </div>
  )
}

export default Loader