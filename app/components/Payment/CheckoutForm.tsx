import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  LinkAuthenticationElement,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useCreateOrderMutation } from "@/redux/features/orders/orderApi";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { style } from "@/app/styles/style";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

type Props = {
  setOpen: any;
  data: any;
};

const CheckoutForm = ({ setOpen, data }: Props) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState<any>("");
  const [createOrder, { data: orderData, error }] = useCreateOrderMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery({ skip: loadUser ? false : true });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if(!stripe || !elements){
        return;
    }
    setIsLoading(true);

    const {error, paymentIntent} = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
    });

    if(error){
        setMessage(error.message);
        setIsLoading(false);
    }else if(paymentIntent && paymentIntent.status === "succeeded"){
        setIsLoading(false);
        createOrder({courseId: data._id, payment_info: paymentIntent})
    }
  };

  useEffect(() => {
    if(orderData){
        setLoadUser(true);
        redirect(`/course-access/${data._id}`);
    }
    if(error){
        if("data" in error){
            const errorMessage = error as any;
            toast.error(errorMessage.data.message);
        }
    }

  },[orderData, error, data])

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <LinkAuthenticationElement
        id="link-authentication-element"
      />
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text" className={`${style.button} `}>
          {isLoading ? "Paying.." : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && (
        <div id="payment-message" className=" text-[red] font-Poppins pt-2">
          {message}
        </div>
      )}
    </form>
  );
};

export default CheckoutForm;
