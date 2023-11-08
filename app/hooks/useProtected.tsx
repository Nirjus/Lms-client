import {redirect} from "next/navigation";
import UserAuth from "./userAuth";
import React from "react";
interface ProtectedProps{
    children: React.ReactNode;
}
export default function Protected({children}: ProtectedProps){
     const isLogin = UserAuth();

     return isLogin ? children : redirect("/");
}