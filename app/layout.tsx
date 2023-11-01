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

const poppins = Poppins({ subsets: ['latin'], weight:["300","400","500","600","700"],variable:"--font-Poppins" });
const josefin = Josefin_Sans({ subsets: ['latin'], weight:["300","400","500","600","700"],variable:"--font-Josefin" });


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en" data-theme>
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`} >
        <Providers>
          <SessionProvider>
          <Custom>{children}</Custom>
         <ToastContainer 
          position="top-center"
          theme="dark"
         />
         </SessionProvider>
        </Providers>
      </body>
    </html>
  )
}

const Custom: React.FC<{children: React.ReactNode}> = ({children}) => {
 const {isLoading} = useLoadUserQuery({});
  return (
    <>
    {
      isLoading ? <Loader /> : <>{children}</>
    }
    </>
  )
}