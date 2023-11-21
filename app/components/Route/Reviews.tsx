import { style } from '@/app/styles/style'
import Image from 'next/image'
import React from 'react'
import ReviewCard from "../Review/ReviewCard"

type Props = {}

 export const reviews = [
    {
        name: "Gene Bates",
        avatar: "https://randomuser.me/api/portraits/men/1.jpg",
        profession: "Student | Cambridge university",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus",
         ratings:5,
    },
    {
        name: "Veren Santos",
        avatar: "https://randomuser.me/api/portraits/women/1.jpg",
        profession: "Jonier Web developer | Canada",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus earum commodi eum molestias illo odio suscipit assumenda atque voluptatem voluptatibus. Libero quis provident animi fugiat.",
        ratings:4,
    },
    {
        name: "Jay Gibbs",
        avatar: "https://randomuser.me/api/portraits/men/7.jpg",
        profession: "Full Stack Webdeveloper | Algeria",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus earum commodi eum molestias illo odio suscipit assumenda atque voluptatem voluptatibus. Libero quis provident animi fugiat.  eum molestias illo odio suscipit assumenda atque voluptatem voluptatibus. Libero quis provident animi fugiat. Libero quis provident animi fugiat.  eum molestias illo odio suscipit assumenda atque voluptatem voluptatibus. Libero quis provident animi fugiat.",
        ratings:5,
        
    },
    {
        name: "Mina Davisson",
        avatar: "https://randomuser.me/api/portraits/women/2.jpg",
        profession: "Havard University | MERN Developer",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus earum commodi eum molestia.",
        ratings:5,
    },
    {
        name: "Rosemary Smith",
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
        profession: "Student | California university",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus earum",
        ratings:4,
    },
    {
        name: "Laura Mckenzie",
        avatar: "https://randomuser.me/api/portraits/women/13.jpg",
        profession: "Jonior Web Developer | Indonesia",
        comment: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aperiam eligendi iusto, dolorem maiores doloribus earum commodi eum molestias illo odio suscipit assumenda atque voluptatem voluptatibus.  ",
        ratings:5,
    },
 ]

const Reviews = (props: Props) => {
  return (
    <div className=' w-[90%] 800px:w-[85%] m-auto'>
        <div className="w-full 800px:flex items-center">
             <div className="w-full 800px:w-[50%] bg-gradient-radial from-[#1b2fe7ad] via-[#00000000] to-[#00000000]">
                <Image src={require("../../assets/images/boy sitting2.png")} alt='reviewImage' width={600} height={600} objectFit='contain'  />
             </div>
             <div className=' 800px:w-[50%] w-full'>
                  <h3 className={`${style.title} 800px:!text-[40px]`}>
                    Our students Are <span className=' bg-clip-text text-[#0000] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]'>Our Strength</span>
                    <br /> See What They Say About Us
                  </h3>
                  <br />
                  <p className={style.label}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum molestias, itaque quisquam esse quos pariatur quaerat, dolorem facilis dolor odit consequuntur? Obcaecati ipsum incidunt culpa voluptas dignissimos suscipit distinctio veritatis?
                  </p>
                  <br />
                  <br />
             </div>
             <br />
             <br />
        </div>
        <div className="grid grid-cols-1 gap-[25px] md:grid-cols-2 md:gap-[25px] lg:gap-[25px] xl:gap-[35px] xl:grid-cols-2 mb-12 border-0 md:[&>*:nth-child(3)]:!mt-[-60px] md:[&>*:nth-child(6)]:!mt-[-40px]">
                {
                    reviews && reviews.map((i, index) => <ReviewCard item={i} key={index}/>)
                }
             </div>
    </div>
  )
}

export default Reviews