import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import { Box, Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import searchImg from "../../assets/images/search.svg";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import JcodeLineChart from "./JcodeLineChart";
import BarChart from "./BarChart";
import BarChartHor from "./BarChartHor";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import TreeTable from "./TreeTable";
import Tabclaimsicon from "../../assets/images/tabs-icons/claims.svg";
import TabclaimiconGr from "../../assets/images/tabs-icons/claims-gr.svg";
import Tabcptcodeicon from "../../assets/images/tabs-icons/cpt-code.svg";
import TabcptcodeiconGr from "../../assets/images/tabs-icons/cpt-code-gr.svg";
import TabInsightsicon from "../../assets/images/tabs-icons/insights.svg";
import TabInsightsiconGr from "../../assets/images/tabs-icons/insights-gr.svg";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import InsertChartOutlinedRoundedIcon from "@material-ui/icons/InsertChartOutlinedRounded";
import SearchBox from "../../components/common/SearchBox";
import danialService from "../../actions/danialService";
import moment from "moment";
import Loading from "../../components/common/ExpandableTable/Loading";

// tabs content

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
//end tabs content

const Denails = () => {
  const [value, setValue] = useState(0);
  // COMMON VARIABLES
  const [startDate, setStartDate] = useState("2021-02-02");
  const [endDate, setEndDate] = useState("2021-04-02");
  const [monthStartDate, setMonthStartDate] = useState("2021-03-02");
  const [monthEndDate, setMonthEndDate] = useState("2021-04-02");
  const [firstApiCall, setFirstApiCall] = useState(false);

  // GET WEEKS DATA
  const weekStart = moment().subtract(7, "d").format("YYYY-MM-DD");
  const weekEnd = moment().format("YYYY-MM-DD");

  // CARD VARIABLES
  const [weekData, setWeekData] = useState("");
  const [currentMonthData, setCurrentMonthData] = useState("");
  const [previousMonthData, setPreviousMonthData] = useState("");
  const [danialRate, setDanialRate] = useState("");
  const [loadingClass, setLoadingClass] = useState("");

  // LINE CHART VARIABLES
  const [lineChartData, setLineChartData] = useState([]);
  const [lineChartLoadingClass, setLineChartLoadingClass] = useState("");
  const [lineLegend, setLineLegend] = useState("");

  // LINE CHART VARIABLES
  const [stackChartData, setStackChartData] = useState([]);
  const [stackChartLoadingClass, setStackChartLoadingClass] = useState("");
  const [stackChartPayers, setStackChartPayers] = useState([]);

  // CPT CODES BY MONTH CHART VARIABLES
  const [cptMonthData, setCptMonthData] = useState([]);
  const [cptMonthLoadingClass, setCptMonthLoadingClass] = useState("");
  const [cptMonthCodes, setCptMonthCodes] = useState([]);

  // CPT CODES BY WEEKS DATE CHART VARIABLES
  const [cptWeekData, setCptWeekData] = useState([]);
  const [cptWeekLoadingClass, setCptWeekLoadingClass] = useState("");
  const [cptWeekCodes, setCptWeekCodes] = useState([]);

  // REASON CODES BY MONTH CHART VARIABLES
  const [reasonMonthData, setReasonMonthData] = useState([]);
  const [reasonMonthLoadingClass, setReasonMonthLoadingClass] = useState("");
  const [reasonMonthCodes, setReasonMonthCodes] = useState([]);

  // REASON CODES BY WEEK DATES CHART VARIABLES
  const [reasonWeekData, setReasonWeekData] = useState([]);
  const [reasonWeekLoadingClass, setReasonWeekLoadingClass] = useState("");
  const [reasonWeekCodes, setReasonWeekCodes] = useState([]);

  useEffect(() => {
    setLoadingClass("data-loading");
    danialService
      .getServiceLineAmountAndSumByDates(weekStart, weekEnd)
      .then((response) => {
        setLoadingClass("");
        const { data: result } = response;
        if (typeof result.data !== "undefined") {
          setWeekData(result.data[0]);
        }
      })
      .catch((error) => {
        console.log("Week error is", error);
        setLoadingClass("");
      });

    // GET CURRENT MONTH DATA
    setTimeout(() => {
      const startOfMonth = moment()
        .clone()
        .startOf("month")
        .format("YYYY-MM-DD");
      const endOfMonth = moment().clone().endOf("month").format("YYYY-MM-DD");

      danialService
        .getServiceLineAmountAndSumByDates(startOfMonth, endOfMonth)
        .then((response) => {
          const { data: result } = response;
          if (typeof result.data !== "undefined") {
            setCurrentMonthData(result.data[0]);
          }
        })
        .catch((error) => {
          console.log("Month error is", error);
        });
    }, [2000]);

    // GET PREVIOUS MONTH DATA
    setTimeout(() => {
      const prevMonthStart = moment()
        .subtract(1, "months")
        .startOf("month")
        .format("YYYY-MM-DD");
      const prevMonthEnd = moment()
        .subtract(1, "months")
        .endOf("month")
        .format("YYYY-MM-DD");

      danialService
        .getServiceLineAmountAndSumByDates(prevMonthStart, prevMonthEnd)
        .then((response) => {
          const { data: result } = response;
          if (typeof result.data !== "undefined") {
            setPreviousMonthData(result.data[0]);
          }
        })
        .catch((error) => {
          console.log("Month error is", error);
        });
    }, [3000]);

    setTimeout(() => {
      danialService
        .getDenialsRatePerByDates(monthStartDate, monthEndDate)
        .then((response) => {
          const { data: result } = response;
          if (typeof result.data !== "undefined") {
            setDanialRate(result.data[0]);
          }
        })
        .catch((error) => {
          console.log("Danial Rate error is", error);
        });
    }, [3000]);
  }, []);
  useEffect(() => {
    setLineChartLoadingClass("data-loading");
    const time = firstApiCall === false ? 4000 : 1000;
    setTimeout(() => {
      danialService
        .getMonthWiseDenialsByDates(startDate, endDate)
        .then((response) => {
          setLineChartLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let year = "";
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              chartData.push({
                x: item.MONTHNAME,
                y: item.DeniedServiceLineCount,
              });
              year = item.YEAR;
            });
          }
          setLineChartData(chartData);
          setLineLegend(`Year - ${year}`);
        })
        .catch((error) => {
          setLineChartLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [startDate, endDate]);

  useEffect(() => {
    setStackChartLoadingClass("data-loading");
    const time = firstApiCall === false ? 6000 : 1000;
    setTimeout(() => {
      danialService
        .getPayersAndMonthWiseDenialsByDates(startDate, endDate)
        .then((response) => {
          setStackChartLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let chartPayers = [];
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              const payerName = item.PayerName;
              const color = `${payerName}Color`;
              const colorValue = `hsl(${item.DeniedServiceLineCount}, 70%, 50%)`;
              chartPayers.push(payerName);
              let obj = {};
              obj["country"] = item.MONTHNAME;
              obj[payerName] = item.DeniedServiceLineCount;
              obj[color] = colorValue;
              chartData.push(obj);
            });
          }
          const uniquPayers = [...new Set(chartPayers)];
          setStackChartPayers(uniquPayers);

          // MERGING OBJECT THAT HAVE UNIQUE MONTH NAME
          if (typeof chartData !== "undefined" && chartData !== "") {
            chartData.forEach((item, i) => {
              const key = i + 1;
              const nextobj = chartData[key];
              if (
                typeof nextobj !== "undefined" &&
                nextobj.country === item.country
              ) {
                const newobj = { ...item, ...nextobj };
                chartData[i] = newobj;
                chartData.splice(key, 1);
              }
            });
          }
          setStackChartData(chartData);
        })
        .catch((error) => {
          setStackChartLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [startDate, endDate]);

  // CPT CODES MONTH API CALL
  useEffect(() => {
    const time = firstApiCall === false ? 7000 : 1000;
    setTimeout(() => {
      setCptMonthLoadingClass("data-loading");
      danialService
        .getDenialsCPTCodes(monthStartDate, monthEndDate)
        .then((response) => {
          setCptMonthLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let codes = [];
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              const code = item.CPTCode;
              const color = `${code}Color`;
              const colorValue = `hsl(${item.DeniedServiceLineCount}, 70%, 50%)`;
              codes.push(code);
              let obj = {};
              obj["country"] = code;
              obj[code] = item.DeniedServiceLineCount;
              obj[color] = colorValue;
              chartData.push(obj);
            });
          }
          const uniqueCodes = [...new Set(codes)];
          setCptMonthCodes(uniqueCodes);
          setCptMonthData(chartData);
        })
        .catch((error) => {
          setCptMonthLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [monthStartDate, monthEndDate]);

  // CPT CODES WEEK API CALL
  useEffect(() => {
    const time = firstApiCall === false ? 7000 : 1000;
    setTimeout(() => {
      setCptWeekLoadingClass("data-loading");
      danialService
        .getDenialsCPTCodes(weekStart, weekEnd)
        .then((response) => {
          setCptWeekLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let codes = [];
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              const code = item.CPTCode;
              const color = `${code}Color`;
              const colorValue = `hsl(${item.DeniedServiceLineCount}, 70%, 50%)`;
              codes.push(code);
              let obj = {};
              obj["country"] = code;
              obj[code] = item.DeniedServiceLineCount;
              obj[color] = colorValue;
              chartData.push(obj);
            });
          }
          const uniqueCodes = [...new Set(codes)];
          setCptWeekCodes(uniqueCodes);
          setCptWeekData(chartData);
        })
        .catch((error) => {
          setCptWeekLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [weekStart, weekEnd]);

  // REASON CODES WEEK API CALL
  useEffect(() => {
    const time = firstApiCall === false ? 9000 : 1000;
    setTimeout(() => {
      setReasonWeekLoadingClass("data-loading");
      danialService
        .getDenialsReasonsCodes(weekStart, weekEnd)
        .then((response) => {
          setReasonWeekLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let codes = [];
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              const code = item.ReasonCode;
              const color = `${code}Color`;
              const colorValue = `hsl(${item.DeniedServiceLineCount}, 70%, 50%)`;
              codes.push(code);
              let obj = {};
              obj["country"] = code;
              obj[code] = item.DeniedServiceLineCount;
              obj[color] = colorValue;
              chartData.push(obj);
            });
          }
          const uniqueCodes = [...new Set(codes)];
          setReasonWeekCodes(uniqueCodes);
          setReasonWeekData(chartData);
        })
        .catch((error) => {
          setReasonWeekLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [weekStart, weekEnd]);

  // REASON CODES MONTH API CALL
  useEffect(() => {
    const time = firstApiCall === false ? 9000 : 1000;
    setTimeout(() => {
      setReasonMonthLoadingClass("data-loading");
      danialService
        .getDenialsReasonsCodes(monthStartDate, monthEndDate)
        .then((response) => {
          setReasonMonthLoadingClass("");
          const { data: result } = response;
          let chartData = [];
          let codes = [];
          if (typeof result.data !== "undefined" && result.data !== "") {
            result.data.forEach((item) => {
              const code = item.ReasonCode;
              const color = `${code}Color`;
              const colorValue = `hsl(${item.DeniedServiceLineCount}, 70%, 50%)`;
              codes.push(code);
              let obj = {};
              obj["country"] = code;
              obj[code] = item.DeniedServiceLineCount;
              obj[color] = colorValue;
              chartData.push(obj);
            });
          }
          const uniqueCodes = [...new Set(codes)];
          setReasonMonthCodes(uniqueCodes);
          setReasonMonthData(chartData);
          setFirstApiCall(true);
        })
        .catch((error) => {
          setReasonMonthLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }, [time]);
  }, [monthStartDate, monthEndDate]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />

          <UserDropdown />
        </div>
      </header>
      <div className="dashboard-main">
        {/* new box */}

        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={4}>
                  {/* <h2 className="page-heading mb-0">Dashboard</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">Denials</Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
                <Grid item xs={12}>
                  <div className="pre-adj-tabs-all mb-0">
                    <ul>
                      <li>
                        <NavLink to="/denials" className="pre-active">
                          <label>Overview</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/denails-cpt">
                          {/* <img src={Tabcptcodeicon} alt="icon" /> */}
                          <label>CPT</label>
                        </NavLink>
                      </li>

                      <li>
                        <NavLink to="/denails-payer">
                          {/* <img src={TabInsightsicon} alt="icon" /> */}
                          <label>Payer</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/denails-reason-code">
                          {/* <img src={TabInsightsicon} alt="icon" /> */}
                          <label>Reason Code</label>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <Grid
          className="mt-3"
          container
          spacing={2}
          direction="row"
          alignItems="stretch"
        >
          {loadingClass !== "" ? (
            <Grid item xs={12} md={12}>
              <div style={{ position: "relative" }}>
                <div className={loadingClass}>
                  <div className="cliam-ui-table-2">
                    <Loading compHeight="200"></Loading>
                  </div>
                </div>
              </div>
            </Grid>
          ) : (
            <React.Fragment>
              <Grid item xs={12} md={3}>
                <div className="progress-box-main-code m-0">
                  <div className="progress-box cliam-box-code m-0">
                    <div className="claim-box-inner pull-right">
                      <span className="claim-box-icon ic-1">
                        {/* <img src={imgone} alt="Icon" /> */}
                      </span>
                    </div>
                    <div className="claim-box-inner">
                      <h2 className="mb-0 box-title-835">Week</h2>
                      <p className="box-text-code">
                        <span>
                          $
                          {typeof weekData.DeniedServiceLineAmount !==
                            "undefined" &&
                          typeof weekData.DeniedServiceLineAmount !==
                            "object" &&
                          weekData.DeniedServiceLineAmount !== ""
                            ? weekData.DeniedServiceLineAmount
                            : 0}
                        </span>
                      </p>
                      <p className="box-text-code">
                        <span>Count:</span>{" "}
                        {typeof weekData.DeniedServiceLineCount !==
                          "undefined" &&
                        typeof weekData.DeniedServiceLineCount !== "object" &&
                        weekData.DeniedServiceLineCount !== ""
                          ? weekData.DeniedServiceLineCount
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="progress-box-main-code m-0">
                  <div className="progress-box cliam-box-code m-0">
                    <div className="claim-box-inner pull-right">
                      <span className="claim-box-icon ic-2">
                        {/* <LocalAtmOutlinedIcon /> */}
                        {/* <img src={imgtwo} alt="Icon" /> */}
                      </span>
                    </div>
                    <div className="claim-box-inner">
                      <h2 className="mb-0 box-title-835">Month</h2>
                      <p className="box-text-code">
                        <span>
                          $
                          {typeof currentMonthData.DeniedServiceLineAmount !==
                            "undefined" &&
                          typeof currentMonthData.DeniedServiceLineAmount !==
                            "object" &&
                          currentMonthData.DeniedServiceLineAmount !== ""
                            ? currentMonthData.DeniedServiceLineAmount
                            : 0}
                        </span>
                      </p>
                      <p className="box-text-code">
                        <span>Count:</span>{" "}
                        {typeof currentMonthData.DeniedServiceLineAmount !==
                          "undefined" &&
                        typeof currentMonthData.DeniedServiceLineAmount !==
                          "object" &&
                        currentMonthData.DeniedServiceLineCount !== ""
                          ? currentMonthData.DeniedServiceLineCount
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="progress-box-main-code m-0">
                  <div className="progress-box cliam-box-code m-0">
                    <div className="claim-box-inner pull-right">
                      <span className="claim-box-icon ic-3">
                        {/* <NewReleasesOutlinedIcon /> */}
                        {/* <img src={imgthree} alt="Icon" /> */}
                      </span>
                    </div>
                    <div className="claim-box-inner">
                      <h2 className="mb-0 box-title-835">Last Month</h2>
                      <p className="box-text-code">
                        <span>
                          $
                          {typeof previousMonthData.DeniedServiceLineAmount !==
                            "undefined" &&
                          typeof previousMonthData.DeniedServiceLineAmount !==
                            "object" &&
                          previousMonthData.DeniedServiceLineAmount !== ""
                            ? previousMonthData.DeniedServiceLineAmount
                            : 0}
                        </span>
                      </p>
                      <p className="box-text-code">
                        <span>Count:</span>{" "}
                        {typeof previousMonthData.DeniedServiceLineCount !==
                          "undefined" &&
                        typeof previousMonthData.DeniedServiceLineCount !==
                          "object" &&
                        previousMonthData.DeniedServiceLineCount !== ""
                          ? previousMonthData.DeniedServiceLineCount
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="progress-box-main-code m-0">
                  <div className="progress-box cliam-box-code m-0">
                    <div className="claim-box-inner pull-right">
                      <span className="claim-box-icon ic-4">
                        {/* <PanToolOutlinedIcon /> */}
                        {/* <img src={imgfour} alt="Icon" /> */}
                      </span>
                    </div>
                    <div className="claim-box-inner">
                      <h2 className="mb-0 box-title-835">Open</h2>
                      <p className="box-text-code">
                        <span>
                          $
                          {typeof danialRate.DeniedServiceLineAmount !==
                            "undefined" &&
                          typeof danialRate.DeniedServiceLineAmount !==
                            "object" &&
                          danialRate.DeniedServiceLineAmount !== ""
                            ? danialRate.DeniedServiceLineAmount
                            : 0}
                        </span>
                      </p>
                      <p className="box-text-code">
                        <span>Count:</span>{" "}
                        {typeof danialRate.DenialRatePer !== "undefined" &&
                        typeof danialRate.DenialRatePer !== "object" &&
                        danialRate.DenialRatePer !== ""
                          ? danialRate.DenialRatePer
                          : 0}
                      </p>
                    </div>
                  </div>
                </div>
              </Grid>
            </React.Fragment>
          )}
        </Grid>

        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          className="mt-3"
        >
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">Denials Count</h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                {lineChartLoadingClass !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div style={{ position: "relative" }}>
                      <div className={lineChartLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading compHeight="200"></Loading>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item md={12} className="mt-2">
                    <JcodeLineChart
                      chartdata={lineChartData}
                      lineLegend={lineLegend}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">Denials by Payer</h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                {stackChartLoadingClass !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div style={{ position: "relative" }}>
                      <div className={stackChartLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading compHeight="200"></Loading>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item md={12} className="mt-2">
                    <BarChart
                      payers={stackChartPayers}
                      chartValues={stackChartData}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    {cptWeekLoadingClass !== "" ? (
                      <Grid item xs={12} md={12}>
                        <div style={{ position: "relative" }}>
                          <div className={cptWeekLoadingClass}>
                            <div className="cliam-ui-table-2">
                              <Loading compHeight="200"></Loading>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    ) : (
                      <Grid item sm={12}>
                        <h3 className="chart-title">
                          Denials by CPT this Week
                        </h3>
                      </Grid>
                    )}
                  </Grid>
                </div>
              </div>

              <Grid container>
                <Grid item md={12} className="mt-2">
                  <BarChartHor codes={cptWeekCodes} dataValues={cptWeekData} />
                </Grid>
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">Denials by CPT this Month</h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                {cptMonthLoadingClass !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div style={{ position: "relative" }}>
                      <div className={cptMonthLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading compHeight="200"></Loading>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item md={12} className="mt-2">
                    <BarChartHor
                      codes={cptMonthCodes}
                      dataValues={cptMonthData}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">
                        Denials by Reason this Week
                      </h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                {reasonWeekLoadingClass !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div style={{ position: "relative" }}>
                      <div className={reasonWeekLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading compHeight="200"></Loading>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item md={12} className="mt-2">
                    <BarChartHor
                      codes={reasonWeekCodes}
                      dataValues={reasonWeekData}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
          <Grid item sm={6}>
            <Box className="line-chart-outer-crd pb-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">
                        Denials by Reason this Month
                      </h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                {reasonMonthLoadingClass !== "" ? (
                  <Grid item xs={12} md={12}>
                    <div style={{ position: "relative" }}>
                      <div className={reasonMonthLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading compHeight="200"></Loading>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ) : (
                  <Grid item md={12} className="mt-2">
                    <BarChartHor
                      codes={reasonMonthCodes}
                      dataValues={reasonMonthData}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>

        <FooterCopyright />
      </div>
    </>
  );
};

export default Denails;
