import React from "react";
import { style } from "../styles/style";

type Props = {};

const About = (props: Props) => {
  return (
    <div className=" pt-[100px] w-[90%] h-auto m-auto">
      <h1 className={`${style.title} font-Josefin 800px:!text-[45px] !font-[600]`}>
        What is{" "}
        <span className=" bg-clip-text text-[#0000] bg-gradient-to-r from-[#0c39ff] to-[#17c7d7]">
          ALASKA ?
        </span>
      </h1>
      <br />
      <br />
      <div className="w-full 800px:w-[90%] m-auto text-justify">
        <p className=" text-[18px] font-Poppins">
          Welcome to ALASKA, your premier destination for cutting-edge online
          learning experiences. At ALASKA, we are committed to revolutionizing
          education by providing a dynamic and comprehensive Learning Management
          System (LMS) platform. Our mission is to empower individuals and
          organizations with the knowledge and skills needed to thrive in todays
          rapidly evolving world.
        </p>
        <br />
        <h2 className=" text-[20px] font-Poppins">About ALASKA</h2>
        <p className=" text-[18px] font-Poppins">
          At the heart of ALASKA is a dedication to delivering high-quality
          courses that cater to diverse learning needs. Whether you are an
          individual seeking personal enrichment or a professional aiming to
          upskill, our platform offers a curated selection of courses designed
          to meet the demands of the modern learner.
        </p>
        <br />
        <br />
        <h2 className=" text-[20px] font-Poppins"> Why Choose ALASKA?</h2>
        <ol>
          <li>
            <p className=" text-[18px] font-Poppins underline">
              Extensive Course Library:
            </p>
            <p className=" text-[18px] font-Josefin ">
              Explore a vast array of courses spanning various disciplines. From
              technical skills to soft skills, our library is meticulously
              curated to ensure relevance and excellence.
            </p>
          </li>
          <li>
            <p className=" text-[18px] font-Poppins underline">Expert Instructors:</p>
            <p className=" text-[18px] font-Josefin">
              Learn from industry experts and thought leaders who bring
              real-world experience to the virtual classroom. Our instructors
              are passionate about sharing their knowledge and committed to your
              success.
            </p>
          </li>
          <li>
            <p className=" text-[18px] font-Poppins underline">
              Interactive Learning Environment:
            </p>
            <p className=" text-[18px] font-Josefin">
              Immerse yourself in an engaging and interactive learning
              environment. Our LMS platform is designed to facilitate
              collaboration, discussion, and hands-on learning, ensuring that
              you get the most out of your educational journey.
            </p>
          </li>
          <li>
            <p className=" text-[18px] font-Poppins underline">Flexible Learning:</p>
            <p className=" text-[18px] font-Josefin">
              Life is busy, and we understand that. With [Your Company Name],
              you have the flexibility to learn at your own pace. Access courses
              anytime, anywhere, and on any device.
            </p>
          </li>
          <li>
            <p className=" text-[18px] font-Poppins underline">
              Certification and Recognition:
            </p>
            <p className=" text-[18px] font-Josefin">
              Earn certifications that are not just badges but symbols of your
              proficiency. Our courses are designed to equip you with tangible
              skills that set you apart in your field.
            </p>
          </li>
        </ol>
        <br />
        <br />
        <h2 className=" text-[20px] font-Poppins">
          Our Commitment to Excellence:
        </h2>
        <p className=" text-[18px] font-Josefin">
          ALASKA E-Learning is not just a platform; its a commitment to
          excellence in education. We believe that learning is a lifelong
          journey, and our platform is designed to accompany you every step of
          the way. Whether you are an individual learner or representing an
          organization, we invite you to explore the possibilities within our
          digital classrooms and unlock your full potential. 
        </p>
        <br />
         <p className=" text-[17px] font-Poppins">
         Thank you for
          choosing ALASKA. Founder OF ALASKA Nirjus Karmakar
         </p>
      </div>
      <br />
      <br />
    </div>
  );
};

export default About;
