import React, { FC, useEffect, useState } from "react";

type Props = {
  videoUrl: any;
  title: string;
};

const CoursePlayer: FC<Props> = ({ videoUrl }) => {

  return (
    <div className=" pr-5">
      <video
        src={videoUrl}
         className=" w-full aspect-video rounded-xl"
       controls
      ></video>

    </div>
  );
};

export default CoursePlayer;
