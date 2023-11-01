"use client"
import React, { useState } from 'react'
import Protected from '../hooks/useProtected'
import Heading from '../utils/Heading'
import Header from '../components/Header'

type Props = {}

const Page: React.FC<Props> = () => {
  const [activeItem, setActiveItem] = useState(0);

  return (
    <div>
        <Protected>
        <Heading title="ALASKA" description="One stop e-learning platform" keyword="Programming,Science,Sanatan dharma" />
       <Header  activeItem={activeItem} />
        </Protected>
    </div>
  )
}

export default Page