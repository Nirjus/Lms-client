import React from 'react'
import Heading from '../utils/Heading'
import Footer from '../components/Footer'
import Policy from './Policy'

type Props = {}

const page = (props: Props) => {
  return (
    <div>
          <Heading 
        title='Policy -ALASKA E-Learning'
        description='ALASKA is a multipurpose modern e-Learning system'
        keyword='skills, learning'
        />
        <Policy />
        <Footer />
    </div>
  )
}

export default page