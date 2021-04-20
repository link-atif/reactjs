import { ResponsiveChoropleth } from "@nivo/geo";
import data from "./data";
import countries from "./world.json";
const GeoMapChart = () => (
  <div style={{ height: "410px", width: "100%", padding: "15px" }}>
    <ResponsiveChoropleth
      data={data}
      features={countries.features}
      margin={{ top: 15, right: 80, bottom: 15, left: 15 }}
      colors={[
        "#0AE2B3",
        "#F5BD41",
        "#FA600E",
        "#3251FC",
        "#56BA95",
        "#6FDAEA",
      ]}
      domain={[0, 1000000]}
      unknownColor="#666666"
      label="properties.name"
      valueFormat=".2s"
      projectionScale={80}
      projectionTranslation={[0.55, 0.5]}
      projectionRotation={[0, 0, 0]}
      enableGraticule={true}
      graticuleLineColor="#dddddd"
      borderColor="#152538"
      legends={[
        {
          anchor: "left",
          direction: "column",
          justify: false,
          translateX: -60,
          translateY: 0,
          itemWidth: 100,
          itemHeight: 20,
          itemsSpacing: 4,
          symbolSize: 20,
          itemDirection: "right-to-left",
          itemTextColor: "#777",
          effects: [
            {
              on: "hover",
              style: {
                itemTextColor: "#000",
                itemBackground: "#f7fafb",
              },
            },
          ],
        },
      ]}
    />
  </div>
);
export default GeoMapChart;
