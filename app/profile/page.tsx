"use client";
import React, { useState } from "react";
import Protected from "../hooks/useProtected";
import Heading from "../utils/Heading";
import Header from "../components/Header";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
type Props = {};

const Page: React.FC<Props> = () => {
  const [activeItem, setActiveItem] = useState(5);
  const { user } = useSelector((state: any) => state.auth);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  return (
    <div>
      <Protected>
        <Heading
          title={`${user?.name} profile - ALASKA`}
          description="One stop e-learning platform"
          keyword="Programming,Science,Sanatan dharma"
        />
        <Header
          open={open}
          setOpen={setOpen}
          route={route}
          setRoute={setRoute}
          activeItem={activeItem}
        />
        <Profile user={user} />
      </Protected>
    </div>
  );
};

export default Page;
