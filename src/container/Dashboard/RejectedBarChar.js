import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const RejectedCodeBar = ({ data }) => {

    return (
        <div
            style={{ width: "100%", height: "30em", float: "left", overflowY: "auto" }}
        >
            <ResponsiveBar
                data={data}
                keys={['value']}
                indexBy="JCODE"
                margin={{ top: 10, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'category10' }}
                colorBy="index"
                layout="horizontal"
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                // axisTop={null}
                axisRight={null}
                labelFormat={v => `${v}k`}
                tooltipFormat={v => `${v}k`}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'JCODE',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: (v) => `${v}k`
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    // legend: 'Rjected Code',
                    legendPosition: 'middle',
                    legendOffset: -40,
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    )
}



export default RejectedCodeBar;