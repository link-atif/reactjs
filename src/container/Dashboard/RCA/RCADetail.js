import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import "./styles.scss";
import { Fade, Box, Grid, Typography, TextField } from "@material-ui/core";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import imgOne from "../../../assets/images/new-design/sub-1.svg";
import imgOnegr from "../../../assets/images/new-design/sub-1gr.svg";
import searchImg from "../../../assets/images/search.svg";
import UserDropdown from "../../UserDropdown";
import FooterCopyright from "../../FooterCopyright";
import RCATabs from "./RCATabs";
import dashboardService from "../../../actions/dashboardService";
import Loading from "../../../components/common/ExpandableTable/Loading";
import SearchBox from "../../../components/common/SearchBox";
import DenaidImg from "../../../assets/images/NewMiniCard/Denaid-img.svg";
import CountImg from "../../../assets/images/NewMiniCard/Count-img.svg";
import PaymentImg from "../../../assets/images/NewMiniCard/payment-img.svg";
import ChargeImg from "../../../assets/images/NewMiniCard/charge-img.svg";

import CommonTable from "../../Common";
import RCATable from "./RCATable";
import LineChart from "./LineChart/index";

const RCADetails = () => {
  const [summary, setSummary] = useState({});
  const [dataList, setDataList] = useState([]);
  const [loadingClass, setLoadingClass] = useState("");
  const [from, setFrom] = useState("1753-01-01");
  const [to, setTo] = useState("9999-12-31");
  const [start, setStart] = useState("0");
  const [end, setEnd] = useState("10");
  const params = useParams();
  let name = params.name.replace("-", " ");
  useEffect(() => {
    setLoadingClass("data-loading");
    // GET SUMMARY OF SELECTED LIST
    dashboardService
      .getRCAData(name, "summary", start, end, from, to)
      .then(({ data: response }) => {
        setLoadingClass("");
        const { data } = response;
        if (typeof data !== "undefined" && data !== "") {
          console.log("sumary data is", data);
          setSummary(data);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });

    // GET DETAIL LIST OF SELECTED ITEM
    dashboardService
      .getRCAData(name, "detail", start, end, from, to)
      .then(({ data: response }) => {
        setLoadingClass("");
        const { data } = response;
        let res = [];
        if (typeof data !== "undefined" && data !== "") {
          data.forEach((item) => {
            res.push({
              "PT CN": (
                <NavLink to={`/patient-details/${item.PatientControlNo}`}>
                  {item.PatientControlNo}
                </NavLink>
              ),
              "Claim No": (
                <NavLink to={`/claim-detail/${item.ClaimPaymentId}`}>
                  {item.PayerClaimControlNo}
                </NavLink>
              ),
              "Charge Amount": item.ChargeAmount,
              "Payment Amount": item.PaymentAmount,
            });
          });
        }
        setDataList(res);
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });
  }, []);
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {/* <h2 className="page-heading mb-0">Smart Insights Details</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Link className="" color="inherit" href="/rca">
                        Smart Insights
                      </Link>
                      <Typography color="textPrimary">
                        {typeof name !== "undefined" && name !== "" ? name : ""}
                      </Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item md={6}>
            <Box className="claim-details-card-main shadow-ui-new mt-4">
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <Typography
                    variant="h4"
                    className="smart-detail-crd-heading pl-2"
                  >
                    Code
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="DR-mini-card DR-mini-crd-green">
                    <div className="DR-mini-img-green">
                      <img
                        className="mini-crd-img"
                        src={DenaidImg}
                        alt="Icon"
                      />
                    </div>
                    <div className="DR-mini-crd-inner ml-3">
                      <p>Denied</p>
                      <h2>
                        {typeof summary[0] !== "undefined" &&
                        summary[0].DeniedAmount > 0
                          ? summary[0].DeniedAmount
                          : 0}
                      </h2>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="DR-mini-card DR-mini-crd-purpel">
                    <div className="DR-mini-img-purpel">
                      <img className="mini-crd-img" src={CountImg} alt="Icon" />
                    </div>
                    <div className="DR-mini-crd-inner ml-3">
                      <p>Count</p>
                      <h2>
                        {typeof summary[0] !== "undefined" &&
                        summary[0].ClaimCount > 0
                          ? summary[0].ClaimCount
                          : 0}
                      </h2>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="DR-mini-card DR-mini-crd-yellow">
                    <div className="DR-mini-img-yellow">
                      <img
                        className="mini-crd-img"
                        src={ChargeImg}
                        alt="Icon"
                      />
                    </div>
                    <div className="DR-mini-crd-inner ml-3">
                      <p>Charged</p>
                      <h2>129 $</h2>
                    </div>
                  </div>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <div className="DR-mini-card DR-mini-crd-red">
                    <div className="DR-mini-img-red">
                      <img
                        className="mini-crd-img"
                        src={PaymentImg}
                        alt="Icon"
                      />
                    </div>
                    <div className="DR-mini-crd-inner ml-3">
                      <p>Payment</p>
                      <h2>212 $</h2>
                    </div>
                  </div>
                </Grid>

                {/* 
                <Grid item md={6}>

                  <div className="progress-box-main mt-0">
                    <div className="dash-box-new w-100">
                      <div className="dash-inner-text">
                        <p>Denied</p>
                        <h2>
                          {typeof summary[0] !== "undefined" &&
                            summary[0].DeniedAmount > 0
                            ? summary[0].DeniedAmount
                            : 0}
                        </h2>
                        <ul>
                          <li className="box-arrow-li">
                           
                          </li>
                          <li className="box-pr-text"></li>
                        </ul>
                      </div>
                      <div className="dash-inner-img ic-2">
                        <img
                          className="box-icon-img"
                          src={DashBox2}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </Grid>
                <Grid item md={6}>
                  <div className="progress-box-main m-0">
                    <div className="dash-box-new w-100">
                      <div className="dash-inner-text">
                        <p>Count</p>
                        <h2>
                          {typeof summary[0] !== "undefined" &&
                            summary[0].ClaimCount > 0
                            ? summary[0].ClaimCount
                            : 0}
                        </h2>
                        <ul>
                          <li className="box-arrow-li">
                            
                          </li>
                          <li className="box-pr-text"></li>
                        </ul>
                      </div>
                      <div className="dash-inner-img ic-2">
                        <img
                          className="box-icon-img"
                          src={DashBox2}
                          alt="Icon"
                        />
                      </div>
                    </div>
                  </div>
                </Grid> */}
              </Grid>
              {/* <Grid item md={12}>
                <Typography
                  variant="h4"
                  className="details-summary-heading-new pl-2 mt-3"
                  gutterBottom
                >
                  Summary
                </Typography>
                <Grid container className="">
                  <Grid item md={6} className="mb-2">
                    <Box className="claim-detail-crds">
                      <p>
                        <img src={payer2} alt="Icon" />
                        <strong> Claim Count: </strong>
                        {typeof summary[0] !== "undefined" &&
                          summary[0].ClaimCount > 0
                          ? summary[0].ClaimCount
                          : 0}
                      </p>
                      <p></p>
                    </Box>
                  </Grid>
                  <Grid item md={6} className="mb-2">
                    <Box className="claim-detail-crds">
                      <p>
                        <img src={payer2} alt="Icon" />
                        <strong> Billed Amount: </strong>
                        {typeof summary[0] !== "undefined" &&
                          summary[0].BilledAmount > 0
                          ? summary[0].BilledAmount
                          : 0}
                      </p>
                      <p></p>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container className="">
                  <Grid item md={6} className="mb-2">
                    <Box className="claim-detail-crds">
                      <p>
                        <img src={payer2} alt="Icon" />
                        <strong> Paid Amount: </strong>
                        {typeof summary[0] !== "undefined" &&
                          summary[0].PaidAmount > 0
                          ? summary[0].PaidAmount
                          : 0}
                      </p>
                      <p></p>
                    </Box>
                  </Grid>
                  <Grid item md={6} className="mb-2">
                    <Box className="claim-detail-crds">
                      <p>
                        <img src={payer2} alt="Icon" />
                        <strong> Denied Amount: </strong>
                        {typeof summary[0] !== "undefined" &&
                          summary[0].DeniedAmount > 0
                          ? summary[0].DeniedAmount
                          : 0}
                      </p>
                      <p></p>
                    </Box>
                  </Grid>
                </Grid>
              </Grid> */}
              {/* <Grid container className="mt-2">
                <Grid item md={12}>
                  <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Code
                  </Typography>
                  <Grid container className="">
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong>
                            {" "}
                            Claim Count:{" "}
                            {typeof summary[0] !== "undefined" &&
                              summary[0] !== null
                              ? summary[0].ClaimCount
                              : 0}
                          </strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong>
                            {" "}
                            Billed Amount:{" "}
                            {typeof summary[0] !== "undefined" &&
                              summary[0] !== null
                              ? summary[0].BilledAmount
                              : 0}
                          </strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong>
                            {" "}
                            Paid Amount:{" "}
                            {typeof summary[0] !== "undefined" &&
                              summary[0] !== null
                              ? summary[0].PaidAmount
                              : 0}
                          </strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong>
                            {" "}
                            Denied Amount:{" "}
                            {typeof summary[0] !== "undefined" &&
                              summary[0] !== null
                              ? summary[0].DeniedAmount
                              : 0}
                          </strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> Code 5</strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                    <Grid item md={6}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> Code 6</strong>
                        </p>
                        <p></p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid> */}
            </Box>
          </Grid>
          <Grid item md={6}>
            <Box className="line-chart-outer-crd mt-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">Overview</h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                <Grid item md={12}>
                  <LineChart />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        <Grid className="mt-3" container spacing={2}>
          <Grid>
            <h3 className="smart-detail-crd-heading ml-2 mb-0">
              Service Payments
            </h3>
          </Grid>
          <Grid item xs={12}>
            {loadingClass !== "" ? (
              <div className="mt-3" style={{ position: "relative" }}>
                <div className={loadingClass}>
                  <div className="cliam-ui-table-2">
                    <Loading></Loading>
                  </div>
                </div>
              </div>
            ) : (
                <CommonTable data={dataList} />
              )}
          </Grid>
        </Grid>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default RCADetails;
