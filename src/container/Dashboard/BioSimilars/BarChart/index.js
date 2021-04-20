import React from "react";
import { ResponsiveBar } from '@nivo/bar';
// import data from "./data";


const BarChart = ({ data }) => (
  <div style={{ width: '100%', height: '256px', }}>
    { data.length > 0 && (
      <ResponsiveBar
        data={data}
        keys={['ReferenceDrugCount']}
        indexBy="ReferenceCPTCode"
        margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
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

        label="false"

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
        // legends={[
        //   {
        //     dataFrom: "keys",
        //     anchor: "bottom-right",
        //     direction: "column",
        //     justify: false,
        //     translateX: 120,
        //     translateY: 0,
        //     itemsSpacing: 2,
        //     itemWidth: 100,
        //     itemHeight: 20,
        //     itemDirection: "left-to-right",
        //     itemOpacity: 0.85,
        //     symbolSize: 20,
        //     effects: [
        //       {
        //         on: "hover",
        //         style: {
        //           itemOpacity: 1,
        //         },
        //       },
        //     ],
        //   },
        // ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    )}
  </div>
)
export default BarChart;
