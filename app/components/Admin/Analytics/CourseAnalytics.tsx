import { useGetCoursesAnalyticeQuery } from "@/redux/features/analytics/analyticsApi";
import React from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Label,
  LabelList,
} from "recharts";
import Loader from "../../Loader";
import { style } from "@/app/styles/style";
type Props = {};

const CourseAnalytics = (props: Props) => {
  const { data, isLoading, error } = useGetCoursesAnalyticeQuery({});
 
     const analyticsData:any = [];
     
     data && data.courseAnalytic.last12Months.forEach((item:any) => {
        analyticsData.push({name: item.month, uv:item.count})
     });
     
  const minValue = 0;
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px] pl-[100px]">
            <h1 className={`${style.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${style.label} px-5`}>
              Last 12 months analytics data{""}
            </p>
          </div>
          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAnalytics;
