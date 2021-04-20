import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Box,
    Typography,
    TextField,
    Card,
    CardContent,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import userImage from "../../assets/images/new-design/sub-user.svg";
import searchImg from "../../../assets/images/search.svg";
import UserDropdown from "../../UserDropdown";
import FooterCopyright from "../../FooterCopyright";
import Loading from ".././../../components/common/ExpandableTable/Loading";

// import UploadCam from "../../assets/images/new-design/camra-over.svg";

import Common from "../../../actions/common";

// import ClaimDetailTable from "./ClaimDetailTable";
import TimeLine from "./TimeLine";

// function groupBy(list, prop) {
//     return list.reduce((groupped, item) => {
//         var key = item[prop];
//         delete item[prop];
//         if (groupped.hasOwnProperty(key)) {
//             groupped[key].push(item);
//         } else {
//             groupped[key] = [item];
//         }
//         return groupped
//     }, {});
// }

const PatientDetail = () => {

    const [loading, setLoading] = useState("");
    const [timeLineData, setTimeLineData] = useState({});
    const params = useParams();

    const groupBy = (timeline) => {
        var output = timeline.reduce((result, item) => {

            // Get app object corresponding to current item from result (or insert if not present)
            var ClaimTo = result[item.ClaimTo] = result[item.ClaimTo] || {};

            // Get type array corresponding to current item from app object (or insert if not present)
            var PayerClaimControlNo = ClaimTo[item.PayerClaimControlNo] = ClaimTo[item.PayerClaimControlNo] || [];

            // Add current item to current type array
            PayerClaimControlNo.push(item);

            // Return the result object for this iteration
            return result;

        }, {});

        return output;
    }


    useEffect(() => {
        setLoading("data-loading");
        Common.getPatientClaimTimeLine(params.PCN)
            .then(res => {
                if (res.data && res.data.data) {
                    let groupData = groupBy(res.data.data);
                    setTimeLineData(groupData);
                    setLoading("");
                } else {
                    setLoading("")
                }

            })
            .catch(err => {
                setLoading("");
            })
    }, [])

    return (
        <>
            <header className="dashboard-header header-new">
                <div className="header-search-main">
                    <div className="seach-form">
                        <img src={searchImg} alt="Search" />
                        <TextField
                            id="standard-search"
                            placeholder="Search"
                            type="search"
                            className="mt-0"
                        />
                    </div>
                    <UserDropdown />
                </div>
            </header>
            <Box className="dashboard-main">
                <h2 className="page-heading">Timeline</h2>

                {/* Breadcrumbs */}
                <Box className="breadcreams-new">
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link className="" color="inherit" href="/">
                            Dashboard
                        </Link>
                        <Link className="" color="inherit" href="/patient-details">
                            Patient Details
                        </Link>
                        <Typography color="textPrimary">
                            Timeline
                        </Typography>
                    </Breadcrumbs>
                </Box>
                {/*End Breadcrumbs */}

                <Card className="add-data-wrapper new-style-shawdow py-2 mt-3">

                    <CardContent>
                        {
                            loading !== "" ? (
                                <div className="mt-3" style={{ position: "relative" }}>
                                    <div className={loading}>
                                        <div className="cliam-ui-table-2">
                                            <Loading></Loading>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                    <TimeLine
                                        data={timeLineData}
                                    />
                                )
                        }


                    </CardContent>
                </Card>

                <FooterCopyright />
            </Box>
        </>
    );
};

export default PatientDetail;
