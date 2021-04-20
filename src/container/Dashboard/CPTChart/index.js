import React, { useEffect, useState } from 'react';
import { ResponsiveTreeMap } from "@nivo/treemap";
import claims from "../../../actions/claims";
import Loading from ".././../../components/common/ExpandableTable/Loading";
import rawdata from "./data";

const CPTTreeMap = () => {

    const [dataList, setData] = useState([]);
    const [loading, setLoading] = useState("");

    useEffect(() => {
        setLoading("data-loading")
        claims.getDashboardAllCodeAmount()
            .then((res) => {
                if (res.data && res.data.data) {
                    let newData = res.data.data.reduce((acc, value) => {
                        let codeObj = {}
                        codeObj["name"] = value.codeType;
                        codeObj["color"] = "hsl(321, 70%, 50%)";
                        let children = []
                        if (value.code.length) {
                            value.code.forEach(item => {
                                children.push({
                                    label: item.code,
                                    name: item.code,
                                    medicine_name: item.name,
                                    value: item.paidAmount,
                                    color: "hsl(321, 70%, 50%)",
                                })
                            })
                        }

                        codeObj["children"] = children;

                        acc['children'].push(codeObj);

                        return acc;

                    }, {
                        "name": "CPT CODE",
                        "color": "hsl(321, 70%, 50%)",
                        children: []
                    })
                    setLoading("")

                    setData(newData);
                } else {
                    setLoading("")
                }
            })
            .catch((error) => {
                setLoading("")
                console.log(error)
            })
    }, [])

    return (
        <div style={{ width: '100%', height: '700px', }}>
            {  loading == "" ? (
                <ResponsiveTreeMap
                    data={dataList}
                    identity="name"
                    label={(node) => `${node.id} ${node.formattedValue}`}
                    // tooltip={({ node: { data } }) => `${data.name}-${data.medicine_name} \n ${data.value}k`}
                    tooltip={({ node: { data } }) => <p>{data.name}-{data.medicine_name} <br /> {data.value}k</p>}
                    value="value"
                    valueFormat=".02s"
                    colors={['#F6D8DF', '#c8f5ec', '#cad0e8', '#f9f0c8', '#F6D8DF']}
                    margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
                    labelSkipSize={12}
                    nodeOpacity={1}
                    labelTextColor={{ from: 'color', modifiers: [['darker', 1.2]] }}
                    parentLabelTextColor={{ from: 'color', modifiers: [['darker', 2]] }}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.1]] }}
                />
            ) : (
                <div className="mt-3" style={{ position: "relative" }}>
                    <div className={loading}>
                        <div className="cliam-ui-table-2">
                            <Loading></Loading>
                        </div>
                    </div>
                </div>
            )
            }
        </div >
    )
}

export default CPTTreeMap;
