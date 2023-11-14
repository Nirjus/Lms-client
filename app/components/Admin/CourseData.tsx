import { style } from "@/app/styles/style";
import React, { FC } from "react";
import { RiAddCircleFill } from "react-icons/ri";
import { toast } from "react-toastify";
type Props = {
  benefits: { title: string }[];
  setBenefits: (benefits: { title: string }[]) => void;
  prerequisites: { title: string }[];
  setPrerequisites: (prerequisites: { title: string }[]) => void;
  active: number;
  setActive: (active: number) => void;
};

const CourseData: FC<Props> = ({
  benefits,
  setBenefits,
  active,
  setActive,
  prerequisites,
  setPrerequisites,
}) => {
  const handleBenefitsChange = (index: number, value: any) => {
    const updatedBenefits = [...benefits];
    updatedBenefits[index].title = value;
    setBenefits(updatedBenefits);
  };
  const handleAddbenefits = () => {
    setBenefits([...benefits, { title: "" }]);
  };
  const handlePrerequisitesChange = (index: number, value: any) => {
    const updatedPrerequisites = [...prerequisites];
    updatedPrerequisites[index].title = value;
    setPrerequisites(updatedPrerequisites);
  };
  const handleAddPrerequisets = () => {
    setPrerequisites([...prerequisites, { title: "" }]);
  };

  const prevButton = () => {
    setActive(active - 1);
  };
  const handleOptions = () => {
    if (
      benefits[benefits.length - 1]?.title !== "" &&
      prerequisites[prerequisites.length - 1]?.title !== ""
    ) {
      setActive(active + 1);
    } else {
      toast.error("Please fill all the fields!");
    }
  };
  return (
    <div className=" w-[80%] m-auto mt-24 block">
      <div>
        <label className={`${style.label} text-[20px]`}>
          what are the benefits for students in this course?
        </label>
        <br />
        {benefits.map((benefits: any, index: number) => (
          <input
            type="text"
            key={index}
            name="benefits"
            placeholder=" You will be able to build a full stack LMS platform..."
            required
            value={benefits.title}
            onChange={(e) => handleBenefitsChange(index, e.target.value)}
            className={`${style.input} my-2`}
          />
        ))}
        <RiAddCircleFill
          size={40}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddbenefits}
        />
      </div>
      <div>
        <label className={`${style.label} text-[20px]`}>
          what are the prerequisites for students in this course?
        </label>
        <br />
        {prerequisites.map((prerequisets: any, index: number) => (
          <input
            type="text"
            key={index}
            name="prerequisets"
            placeholder=" You need just wiling to learn new things"
            required
            value={prerequisets.title}
            onChange={(e) => handlePrerequisitesChange(index, e.target.value)}
            className={`${style.input} my-2`}
          />
        ))}
        <RiAddCircleFill
          size={40}
          style={{ margin: "10px 0px", cursor: "pointer", width: "30px" }}
          onClick={handleAddPrerequisets}
        />
      </div>
      <div className=" w-full flex justify-between">
        <div className={`${style.button} !w-[250px]`} onClick={() => prevButton()}>
          Prev
        </div>
        <div
          className={`${style.button} !w-[250px] `}
          onClick={() => handleOptions()}
        >
          Next
        </div>
      </div>
    </div>
  );
};

export default CourseData;
