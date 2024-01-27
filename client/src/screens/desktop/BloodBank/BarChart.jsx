import React from "react";
import { Chart } from "react-google-charts";

// export const data = [
//     ["Blood Group", "Blood Bank", "Hospital"],
//     ["A+", 100, 25],
//     ["B+", 90, 20],
//     ["A-", 80, 80],
//     ["B-", 70, 20],
//     ["AB+", 30, 20],
//     ["AB-", 45, 60],
//     ["O+", 63, 40],
//     ["O-", 31, 10],
//   ];
  

export const options = {
  title: "Comparison of Blood Inventory with Hospital",
  chartArea: { width: "50%" },
  hAxis: {
    title: "Blood in Units",
    minValue: 0,
  },
  vAxis: {
    title: "Hospital Inventory Comparison",
  },
};

export function BarChart({data}) {
    data = [["Blood Group", "Blood Bank", "Hospital"],...data];
  return (
    <Chart
      chartType="BarChart"
      width="100%"
      height="700px"
      data={data}
      options={options}
    />
  );
}
