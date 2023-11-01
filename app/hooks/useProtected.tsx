import {redirect} from "next/navigation";
import userAuth from "./userAuth";
import React from "react";
interface ProtectedProps{
    children: React.ReactNode;
}
export default function Protected({children}: ProtectedProps){
     const isLogin = userAuth();

     return isLogin ? children : redirect("/");
}