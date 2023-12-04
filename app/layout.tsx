'use client'
import { Poppins } from 'next/font/google';
import { Josefin_Sans } from 'next/font/google';
import './globals.css'
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Providers} from "./Provider"
import {SessionProvider} from "next-auth/react"
import { useLoadUserQuery } from '@/redux/features/api/apiSlice';
import Loader from  "./components/Loader";
import { ThemeProvider } from 'next-themes';
import socketIO from "socket.io-client";
import { useEffect } from 'react';
import CrispProvider from './components/crisp/crisp-provider';
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
const socketId = socketIO(ENDPOINT, {transports: ["websocket"]});

const poppins = Poppins({ subsets: ['latin'], weight:["300","400","500","600","700"],variable:"--font-Poppins" });
const josefin = Josefin_Sans({ subsets: ['latin'], weight:["300","400","500","600","700"],variable:"--font-Josefin" });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <CrispProvider />
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`} >
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Providers>
          <SessionProvider>
          <Custom>{children}</Custom>
         <ToastContainer 
          position="top-center"
          theme="colored"
         />
         </SessionProvider>
        </Providers>
      </ThemeProvider>
      </body>
    </html>
  )
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
 const {isLoading} = useLoadUserQuery({});

 useEffect(() => {
    socketId.on("connection", () => {});
 },[])
  return (
    <>
    {
      isLoading ? <Loader /> : <>{children}</>
    }
    </>
  )
}