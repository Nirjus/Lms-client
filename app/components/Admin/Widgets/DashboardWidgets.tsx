import React, { FC, useState, useEffect } from "react";
import UserAnalytics from "../Analytics/UserAnalytics";
import { BiBorderLeft } from "react-icons/bi";
import { PiUsersFourLight } from "react-icons/pi";
import { Box, CircularProgress } from "@mui/material";
import OrderAnalytics from "../Analytics/OrderAnalytics";
import AllInvoices from "../Order/AllInvoices";
import {
  useGetOrdersAnalyticeQuery,
  useGetUsersAnalyticeQuery,
} from "@/redux/features/analytics/analyticsApi";
type Props = {
  open?: boolean;
  value?: number;
};

const CircularProgressWithLabel: FC<Props> = ({ open, value }) => {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        size={45}
        color={value && value > 99 ? "info" : "error"}
        thickness={4}
        style={{ zIndex: open ? -1 : 1 }}
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
    </Box>
  );
};

const DashboardWidgets: FC<Props> = ({ open }) => {
  const [orderComparePercentage, setOrderComparePercentage] = useState<any>();
  const [userComparePercentage, setUserComaprePercentage] = useState<any>();

  const { data, isLoading } = useGetUsersAnalyticeQuery({});
  const { data: ordersData, isLoading: ordersLoading } =
    useGetOrdersAnalyticeQuery({});
  
  useEffect(() => {
    if (isLoading && ordersLoading) {
      return;
    } else {
      if (data && ordersData) {
        const userLast2month = data.userAnalytic.last12Months.slice(-2);
        const orderLast2month = ordersData.orderAnalytic.last12Months.slice(-2);

        if (userLast2month.length === 2 && orderLast2month.length === 2) {
          const userscurrentMonth = userLast2month[1].count;
          const userspreviousMonth = userLast2month[0].count;

          const orderscurrentMonth = orderLast2month[1].count;
          const orderspreviousMonth = orderLast2month[0].count;

          const userPercentChange = userspreviousMonth !== 0 ?
            ((userscurrentMonth - userspreviousMonth) / userspreviousMonth) *
            100 : 100;
          const orderPercentChange = orderspreviousMonth !== 0 ?
            ((orderscurrentMonth - orderspreviousMonth) / orderspreviousMonth) *
            100 : 100;

          setUserComaprePercentage({
            currentMonth: userscurrentMonth,
            previousMonth: userspreviousMonth,
            percentChange: userPercentChange,
          });

          setOrderComparePercentage({
            currentMonth: orderscurrentMonth,
            previousMonth: orderspreviousMonth,
            percentChange: orderPercentChange,
          });
        }
      }
    }
  }, [data, ordersData, isLoading, ordersLoading]);

  return (
    <div className="mt-[30px] min-h-screen">
      <div className="grid grid-cols-[75%,25%]">
        <div className="p-8">
          <UserAnalytics isDashboard={true} />
        </div>
        <div className="pt-[80px] pr-8">
          <div className="w-full bg-[#aff6c6] dark:bg-[#11431f] rounded-sm shadow">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <BiBorderLeft className="dark:text-[#45CBA0] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {orderComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#45CBA0] text-black text-[20px] font-[400]">
                  Sales Obtained
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={ orderComparePercentage?.percentChange > 100 ? 100 : orderComparePercentage?.percentChange && orderComparePercentage?.percentChange < -100 ? -100 : orderComparePercentage?.percentChange} open={open} />
                <h5 className="text-center pt-4">
                  {
                    orderComparePercentage?.percentChange > 0
                    ? "+" + orderComparePercentage?.percentChange.toFixed(2)
                    :  orderComparePercentage?.percentChange.toFixed(2)
                  } %
                </h5>
              </div>
            </div>
          </div>
          <div className="w-full bg-[#aec8ed] dark:bg-[#111C43] rounded-sm shadow my-8">
            <div className="flex items-center p-5 justify-between">
              <div className="">
                <PiUsersFourLight className="dark:text-[#6572d3] text-[#000] text-[30px]" />
                <h5 className="pt-2 font-Poppins dark:text-[#fff] text-black text-[20px]">
                  {userComparePercentage?.currentMonth}
                </h5>
                <h5 className="py-2 font-Poppins dark:text-[#6572d3] text-black text-[20px] font-[400]">
                  New Users
                </h5>
              </div>
              <div>
                <CircularProgressWithLabel value={userComparePercentage?.percentChange > 100 ? 100 : userComparePercentage?.percentChange && userComparePercentage?.percentChange < -100 ? -100 : userComparePercentage?.percentChange } open={open} />
                <h5 className="text-center pt-4">
                  {userComparePercentage?.percentChange > 0
                    ? "+" + userComparePercentage?.percentChange.toFixed(2)
                    :  userComparePercentage?.percentChange.toFixed(2)} %
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[65%,35%] ">
        <div className=" dark:bg-[#111c43] w-[94%] shadow-sm m-auto rounded-md ml-[35px] pr-2">
          <OrderAnalytics isDashboard={true} />
        </div>
        <div className="p-5">
          <h5 className=" dark:text-[#fff] text-black text-[20px] font-[400] font-Poppins pb-3">
            Recent Transaction
          </h5>
          <AllInvoices isDashboard={true} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWidgets;
