import { useGetOrdersAnalyticeQuery } from '@/redux/features/analytics/analyticsApi'
import React, { FC } from 'react'
import Loader from '../../Loader';
import {
    LineChart,
    Line,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
    XAxis,
    YAxis,
    Tooltip,
  } from "recharts";
import { style } from "@/app/styles/style";
  
type Props = {
    isDashboard?: boolean;
}

const OrderAnalytics:FC<Props> = ({isDashboard}) => {
    const {data, isLoading} = useGetOrdersAnalyticeQuery({});
   
  const analyticsData: any = [];

    data && data.orderAnalytic.last12Months.forEach((item: any) => {
        analyticsData.push({name: item.month, count:item.count})
    })
  return (
    <>
    {
        isLoading ? (
            <Loader />
        ) : (
            <div
            className={`${
              !isDashboard
                ? "mt-[50px]"
                : " dark:bg-[#111C43] shadow-sm pb-5 rounded-md"
            }`}
          >
            <div className={`${isDashboard ? "!ml-8 mb-5" : "pl-[100px]"} `}>
              <h1
                className={`${style.title} ${
                  isDashboard && "!text-[20px]"
                } px-5 !text-start`}
              >
                Orders Analytics
              </h1>
              {!isDashboard && (
                <p className={`${style.label} px-5`}>
                  Last 12 months analytics data{""}
                </p>
              )}
            </div>
            <div
              className={`w-full ${
                isDashboard ? "h-[30vh]" : "h-screen"
              } flex items-center justify-center`}
            >
              <ResponsiveContainer
                width={isDashboard ? "100%" : "90%"}
                height={!isDashboard ? "50%" : "100%"}
              >
                <LineChart
                  width={500}
                  height={300}
                  data={analyticsData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                 {!isDashboard && <Legend />}
                 <Line type={"monotone"} dataKey={"count"} stroke='#82ca9d'/>
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )
    }
    </>
  )
}

export default OrderAnalytics