import React,{useEffect, useRef} from 'react'
import { toast } from 'react-toastify';
import {VscWorkspaceTrusted} from "react-icons/vsc";
import { style } from '@/app/styles/style';
import {useSelector} from "react-redux";
import { useActivationMutation } from '@/redux/features/auth/authApi';
type Props = {
    setRoute: (route: string) => void;
}

type VerifyNumber = {
    "0": string;
    "1": string;
    "2": string;
    "3": string;
}

const Verification:React.FC<Props> = ({setRoute}) => {
    const {token} = useSelector((state:any) => state.auth);
    const [activation, {isSuccess,error,data}] = useActivationMutation();

    const [invalidError, setInvalidError] = React.useState(false);

   useEffect(() => {
       if(isSuccess){
      const message = data?.message || "Account account successfull";
        toast.success(message);
        setRoute("Login")
       }
       if(error){
        if("data" in error){
            const errorData = error as any;
            setInvalidError(true);
            toast.error(errorData.data.message);
        }else{
            console.log("An error occured", error);
        }
       }
   },[isSuccess,error,data,setRoute])

    const inputRefs = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];
    const [verifyNumber, setVerifyNumber] = React.useState<VerifyNumber>({
     0: "",
     1: "",
     2: "",
     3: "",
    })
    const verificationHandler = async () => {
      const verificationNumber = Object.values(verifyNumber).join("");
      if(verificationNumber.length !== 4){
        setInvalidError(true);
        return;
      }
      await activation({
        activation_token: token,
        activation_code: verificationNumber,
      });
    }

    const handleInputChange = (index:number, value: string) => {
        setInvalidError(false);
        const newVerifyNumber = {...verifyNumber, [index]: value};
        setVerifyNumber(newVerifyNumber);

        if(value === "" && index > 0){
            inputRefs[index - 1].current?.focus();
        }else if(value.length === 1 && index <3){
            inputRefs[index + 1].current?.focus();
        }
    }
  return (
    <div>
        <h1 className={style.title}>Verify your account</h1>
        <br />
        <div className="w-full flex items-center justify-center mt-2">
         <div className="w-[80px] h-[80px] rounded-full bg-[#3b75fb] flex items-center shadow-inner shadow-[#ffffff] justify-center">
            <VscWorkspaceTrusted size={42} color={"white"} className=" mt-[6px]"/>
         </div>
        </div>
        <br />
        <br />
        <div className=" m-auto flex items-center justify-center gap-6">
            {
                Object.keys(verifyNumber).map((key, index) => (
                    <input type="number" key={key} ref={inputRefs[index]} 
                    className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white justify-center text-[18px] font-Poppins outline-none text-center ${
                        invalidError
                        ? "shake border-red-500"
                        : "dark:border-white border-[#0000004a]"
                        }`}
                        placeholder=''
                        maxLength={1}
                    
                        value={verifyNumber[key as keyof VerifyNumber]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                    />
                ))
            }
        </div>
        <br />
        <br />
        <div className="w-full flex justify-center">
          <button className=' btn dark:btn-primary btn-success text-white rounded-full w-[80%]' onClick={verificationHandler}>
         Verify OTP
          </button>
        </div>
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] font-[500] dark:text-white text-black">
        Go back to sign in ? <span className=' text-[#2198ff] pl-1 cursor-pointer' onClick={() => setRoute("Login")}>Sign in</span>
        </h5>
    </div>
  )
}

export default Verification