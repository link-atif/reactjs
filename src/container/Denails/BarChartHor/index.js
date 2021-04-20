import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import data from "./data";

const BarChartHor = ({ codes, dataValues }) => (
  <div style={{ height: "400px" }}>
    <ResponsiveBar
      data={
        typeof dataValues !== "undefined" && dataValues !== ""
          ? dataValues
          : data
      }
      keys={
        typeof codes !== "undefined" && codes !== ""
          ? codes
          : ["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]
      }
      indexBy="country"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={0.3}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={[
        "#0AE2B3",
        "#F5BD41",
        "#FA600E",
        "#3251FC",
        "#56BA95",
        "#6FDAEA",
      ]}
      colorBy="index"
      layout="horizontal"
      label="false"
      defs={
        [
          // {
          //     id: 'dots',
          //     type: 'patternDots',
          //     background: 'inherit',
          //     color: '#38bcb2',
          //     size: 4,
          //     padding: 1,
          //     stagger: true
          // },
          // {
          //     id: 'lines',
          //     type: 'patternLines',
          //     background: 'inherit',
          //     color: '#eed312',
          //     rotation: -45,
          //     lineWidth: 6,
          //     spacing: 10
          // }
        ]
      }
      // fill={[
      //     {
      //         match: {
      //             id: 'fries'
      //         },
      //         id: 'dots'
      //     },
      //     {
      //         match: {
      //             id: 'sandwich'
      //         },
      //         id: 'lines'
      //     }
      // ]}
      borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "",
        legendPosition: "middle",
        legendOffset: 32,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Codes",
        legendPosition: "middle",
        legendOffset: -40,
      }}
      labelSkipWidth={12}
      labelSkipHeight={12}
      labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      animate={true}
      motionStiffness={90}
      motionDamping={15}
    />
  </div>
);

export default BarChartHor;
