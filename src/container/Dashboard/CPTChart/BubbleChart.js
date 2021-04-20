import React, { useEffect, useState } from "react";

import { ResponsiveBubble, ResponsiveBubbleHtml } from "@nivo/circle-packing";
import claims from "../../../actions/claims";
import Loading from ".././../../components/common/ExpandableTable/Loading";

import rawdata from "./data";

const BubbleChart = () => {
  const [dataList, setData] = useState([]);
  const [loading, setLoading] = useState("");
  useEffect(() => {
    setLoading("data-loading");
    claims
      .getDashboardAllCodeAmount()
      .then(({ data: response }) => {
        setLoading("");
        let responseData = response.data || [];
        let newData = rawdata.data.reduce(
          (acc, value) => {
            let codeObj = {};
            codeObj["name"] = value.codeType;
            codeObj["color"] = "hsl(321,70%, 50%)";
            let children = [];
            if (value.code.length) {
              value.code.forEach((item) => {
                children.push({
                  label: item.code,
                  name: item.code,
                  value: item.paidAmount,
                  color: "hsl(0, 100%, 50%)",
                });
              });
            }

            codeObj["children"] = children;

            acc["children"].push(codeObj);

            return acc;
          },
          {
            name: "CPT CODE",
            color: "hsl(321, 70%, 50%)",
            children: [],
          }
        );
        setData(newData);
      })
      .catch((error) => {
        setLoading("");
        console.log(error);
      });
  }, []);

  // const configdata = {
  //   name: "root",
  //   children: dataList,
  // };

  return (
    <div
      style={{
        width: "100%",
        height: "700px",
        fontSize: "12px",
        fontWeight: "400",
      }}
    >
      {loading == "" ? (
        <ResponsiveBubble
          root={dataList}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          identity="name"
          value="value"
          colors={['#C9F5EC', '#58bd62', '#df9dac', '#b5bfe0', '#c9546f']}
          // colors={{ scheme: "dark2" }}
          colorBy="name"
          // leavesOnly={true}
          isZoomable={true}
          // enableLabel={true}
          labelSkipRadius={15}
          labelTextColor={['#0C1015']}
          borderWidth={1}
          borderColor={{ from: "color", modifiers: [["darker", 0.3]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={12}
        />
      ) : (
        <div className="mt-3" style={{ position: "relative" }}>
          <div className={loading}>
            <div className="cliam-ui-table-2">
              <Loading></Loading>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BubbleChart;
