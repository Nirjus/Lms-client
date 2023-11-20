import { useGetCoursesDetailsQuery } from "@/redux/features/courses/coursesApi";
import React, { useState, useEffect } from "react";
import Loader from "../Loader";
import Heading from "@/app/utils/Heading";
import Header from "../Header";
import Footer from "../Footer";
import CourseDetails from "./CourseDetails";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishKeyQuery,
} from "@/redux/features/payments/paymentApi";
import { loadStripe } from "@stripe/stripe-js";

type Props = {
  id: string;
};

const CourseDetailsPage = ({ id }: Props) => {
  const [activeItem, setActiveItem] = useState(1);
  const { data, isLoading } = useGetCoursesDetailsQuery(id);
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const { data: config } = useGetStripePublishKeyQuery({});
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();
  const [stripePromise, setStripePromise] = useState<any>(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishableKey;
      setStripePromise(loadStripe(publishablekey));
    }

    if (data) {
      const amount = Math.round(data?.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, createPaymentIntent]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.client_secret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Heading
            title={data?.course?.name + "- ELarning"}
            description="Elarning is a programing community which is developed by nirjus Karmakar for helping programmers"
            keyword={data?.course?.tags}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={activeItem}
          />
          {stripePromise && (
            <CourseDetails
              data={data.course}
              stripePromise={stripePromise}
              clientSecret={clientSecret}
              setOpen={setOpen}
              setRoute={setRoute}
            />
          )}
          <Footer />
        </div>
      )}
    </>
  );
};

export default CourseDetailsPage;
