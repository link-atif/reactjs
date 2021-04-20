import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  Button,
  Tooltip,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import arrowUp from "../../assets/images/new-design/dash-arrow-up.svg";
import arrowDown from "../../assets/images/new-design/dash-arrow-down.svg";
import ChartBack from "../../assets/images/new-design/Back.svg";
import DashBox1 from "../../assets/images/new-design/box-1.svg";
import DashBox2 from "../../assets/images/new-design/box-2.svg";
import DashBox3 from "../../assets/images/new-design/box-3.svg";
import DashBox4 from "../../assets/images/new-design/box-4.svg";
import imgOnegr from "../../assets/images/new-design/sub-1gr.svg";
import RefreshIcon from "../../assets/images/new-design/refresh.svg";
import Highcharts from "highcharts";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import imgOne from "../../assets/images/new-design/sub-1.svg";
import HighchartsReact from "highcharts-react-official";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "./../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";

import RevinueIcon from "../../assets/images/tabs-icons/revinue.svg";
import LossIcon from "../../assets/images/tabs-icons/loss.svg";
import paitentIcon from "../../assets/images/tabs-icons/paitent.svg";
import claimsbxIcon from "../../assets/images/tabs-icons/claimsbx.svg";


import Tabclaimsicon from "../../assets/images/tabs-icons/claims.svg";
import TabclaimiconGr from "../../assets/images/tabs-icons/claims-gr.svg";
import Tabcptcodeicon from "../../assets/images/tabs-icons/cpt-code.svg";
import TabcptcodeiconGr from "../../assets/images/tabs-icons/cpt-code-gr.svg";
import TabInsightsicon from "../../assets/images/tabs-icons/insights.svg";
import TabInsightsiconGr from "../../assets/images/tabs-icons/insights-gr.svg";
import DashboradIcon from "../../assets/images/tabs-icons/dash-tab.svg";

import Messages from "./../../components/Messages";
import CountPayerDropDown from "./CountPayerDropDown";
import ClaimPayerDropDown from "./ClaimPayerDropDown";
import SearchBox from "../../components/common/SearchBox";
import GeoMapChart from "./GeoMap";
import { ResponsiveLine } from "@nivo/line";
import JcodeLineChart from "./JcodeLineChart";

require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/variwide")(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});
const lineChart = [
  {
    id: "japan",
    color: "hsl(347, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 243,
      },
      {
        x: "helicopter",
        y: 270,
      },
      {
        x: "boat",
        y: 168,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 212,
      },
      {
        x: "bus",
        y: 77,
      },
      {
        x: "car",
        y: 167,
      },
      {
        x: "moto",
        y: 268,
      },
      {
        x: "bicycle",
        y: 19,
      },
      {
        x: "horse",
        y: 175,
      },
      {
        x: "skateboard",
        y: 226,
      },
      {
        x: "others",
        y: 226,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(227, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 147,
      },
      {
        x: "helicopter",
        y: 17,
      },
      {
        x: "boat",
        y: 247,
      },
      {
        x: "train",
        y: 126,
      },
      {
        x: "subway",
        y: 283,
      },
      {
        x: "bus",
        y: 255,
      },
      {
        x: "car",
        y: 80,
      },
      {
        x: "moto",
        y: 36,
      },
      {
        x: "bicycle",
        y: 11,
      },
      {
        x: "horse",
        y: 2,
      },
      {
        x: "skateboard",
        y: 106,
      },
      {
        x: "others",
        y: 9,
      },
    ],
  },
];
const Dashboard = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);
  const [yearChartTitle, setYearChartTitle] = useState("Claims");
  const [comparisonChartTitle, setComparisonChartTitle] = useState("Revenue");
  const [yearlyLoadingClass, setYearlyLoadingClass] = useState("");
  const [monthlyLoadingClass, setMonthlyLoadingClass] = useState("");
  const [yearAmount, setYearAmount] = useState(false);
  const [monthAmount, setMonthAmount] = useState(false);
  const [yearDataState, setYearDataState] = useState(0);
  const [monthState, setMonthState] = useState(0);
  const [yearChartCategories, setYearChartCategories] = useState([]);
  const [yearChartFirstPoins, setYearChartFirstPoints] = useState([]);
  const [yearChartLastPoins, setYearChartLastPoints] = useState([]);
  const [comparisonChartCategories, setComparisonChartCategories] = useState(
    []
  );
  const [comparisonChartFirstPoins, setComparisonChartFirstPoints] = useState(
    []
  );
  const [comparisonChartLastPoins, setComparisonChartLastPoints] = useState([]);
  const [countYear, setCountYear] = useState("");
  const [countMonth, setCountMonth] = useState("");
  const [sumYear, setSumYear] = useState("");
  const [sumMonth, setSumMonth] = useState("");
  const [sumAlert, setSumAlert] = useState(false);
  // COUNTE DATA CONSTATNS
  const [fiveYearCountCategories, setFiveYearCountCategories] = useState([]);
  const [fiveYearCountFirstPoints, setFiveYearCountFirstPoints] = useState([]);
  const [fiveYearCountLastPoints, setFiveYearCountLastPoints] = useState([]);
  const [yearCountCategories, setYearCountCategories] = useState([]);
  const [yearCountFirstPoints, setYearCountFirstPoints] = useState([]);
  const [yearCountLastPoints, setYearCountLastPoints] = useState([]);
  const [monthCountCategories, setMonthCountCategories] = useState([]);
  const [monthCountFirstPoints, setMonthCountFirstPoints] = useState([]);
  const [monthCountLastPoints, setMonthCountLastPoints] = useState([]);
  const [countAlert, setCountAlert] = useState(false);

  // SUM DATA CONSTATNS
  const [fiveYearSumCategories, setFiveYearSumCategories] = useState([]);
  const [fiveYearSumFirstPoints, setFiveYearSumFirstPoints] = useState([]);
  const [fiveYearSumLastPoints, setFiveYearSumLastPoints] = useState([]);
  const [yearSumCategories, setYearSumCategories] = useState([]);
  const [yearSumFirstPoints, setYearSumFirstPoints] = useState([]);
  const [yearSumLastPoints, setYearSumLastPoints] = useState([]);
  const [monthSumCategories, setMonthSumCategories] = useState([]);
  const [monthSumFirstPoints, setMonthSumFirstPoints] = useState([]);
  const [monthSumLastPoints, setMonthSumLastPoints] = useState([]);
  const [claimsCount, setClaimsCount] = useState(0);
  const [billed, setBilled] = useState(0);
  const [paid, setPaid] = useState(0);
  const [writeoff, setWriteOff] = useState(0);
  const [uniquePatients, setUniquePatients] = useState(0);
  const [stateLoadingClass, setStateLoadingClass] = useState("");
  const [countButton, setCountButton] = useState([]);
  const [dollarButton, setDollarButton] = useState([]);
  const [paymentsButton, setPaymentsButton] = useState([]);
  const [payersYears, setPayersYears] = useState([]);
  const [payerSeries, setPayerSeries] = useState([]);
  const [payerSeriesRefresh, setPayerSeriesRefresh] = useState(false);
  const [paymentChartLoadingClass, setPaymentChartLoadingClass] = useState("");
  const [payers, setPayers] = useState([]);
  const [areaTabs, setAreaTabs] = useState([
    comparisonChartTitle,
    yearChartTitle,
  ]);
  const [activeAreaTab, setActiveAreaTab] = useState(0);
  const [claimCountState, setClaimCountState] = useState(false);
  const [claimSumState, setClaimSumState] = useState(false);

  const [overviewButtons, setOverviewButtons] = useState([
    "Year",
    "Quarter",
    "Month",
  ]);
  const btngroups = ["Year", "Month", "Day"];
  const [selectedOverview, setSelectedOverview] = useState("Year");
  const [overviewRefresh, setOverviewRefresh] = useState(false);

  // OVERVIEW PERCENTAGE
  const [countPercentage, setCountPercentage] = useState(0);
  const [billedPercentage, setBilledPercentage] = useState(0);
  const [writeOffPercentage, setWriteOffPercentage] = useState(0);
  const [patientPercentage, setPatientPercentage] = useState(0);

  const calculatePercentage = (firstnum, secondnum) => {
    const diff = firstnum - secondnum;
    const denom = (firstnum + secondnum) / 2;
    const res = (diff / denom) * 100;
    return Math.round(res);
  };

  useEffect(() => {
    // async function fetchData() {
    /* SET DASHBOARD COUNTS */
    const date = new Date();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    setStateLoadingClass("data-loading");
    // GET CLAIM COUNTS
    // await
    common
      .getDashbaordKPIClaimCount(selectedOverview)
      .then(({ data: response }) => {
        const { data } = response;
        if (data !== null && data.length > 0) {
          setClaimsCount(data[0].count);
          let percentage = calculatePercentage(data[1].count, data[0].count);
          setCountPercentage(percentage);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    // DASHBOARD KPI BILLED PAID
    // await
    common
      .getDashbaordKPIClaimBilledAndPaid(selectedOverview)
      .then(({ data: response }) => {
        setStateLoadingClass("");
        const { data } = response;
        if (data !== null && data.length > 0) {
          setBilled(Math.round(data[0].billed));
          setPaid(Math.round(data[0].paid));
          let percentage = calculatePercentage(data[1].billed, data[0].billed);
          setBilledPercentage(percentage);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    // GET WRITE OFF
    // await
    common
      .getDashbaordKPIWriteoff(selectedOverview)
      .then(({ data: response }) => {
        const { data } = response;
        if (data !== null && data.length > 0) {
          setWriteOff(Math.round(data[0].writeOffAmount));
          let percentage = calculatePercentage(
            data[1].writeOffAmount,
            data[0].writeOffAmount
          );
          setWriteOffPercentage(percentage);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    // GET PATIENT COUNT
    // await
    common
      .getDashbaordKPIPatientCount(selectedOverview)
      .then(({ data: response }) => {
        const { data } = response;
        if (data !== null && data.length > 0) {
          setUniquePatients(data[0].patientCount);
          let percentage = calculatePercentage(
            data[1].patientCount,
            data[0].patientCount
          );
          setPatientPercentage(percentage);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    // }
    // fetchData();
  }, [selectedOverview, overviewRefresh]);
  // FILTER CLAIMS SUM
  useEffect(() => {
    setTimeout(() => {
      var dollarbtns = "";
      setSumAlert(false);
      if (dollarButton.length > 0) {
        var index;
        let newPayers = [...payers];
        for (var i = 0; i < dollarButton.length; i++) {
          index = newPayers.indexOf(dollarButton[i]);
          if (index > -1) {
            newPayers.splice(index, 1);
          }
        }
        dollarbtns = newPayers;
      } else {
        dollarbtns = payers;
      }
      let dollarbtnString = dollarbtns.toString();
      // SET COMPARISON CHART DATA
      setMonthlyLoadingClass("data-loading");
      claims
        .getClaimSumLastFiveYear(dollarbtnString)
        .then(({ data: response }) => {
          setMonthlyLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(item.chargeAmount);
              yearWiseDefualtLastPoints.push(item.paymentAmount);
            });
            setComparisonChartCategories(yearWiseCategories);
            setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
            setComparisonChartLastPoints(yearWiseDefualtLastPoints);
            setFiveYearSumCategories(yearWiseCategories);
            setFiveYearSumFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearSumLastPoints(yearWiseDefualtLastPoints);
          }
        })
        .catch((error) => {
          setMonthlyLoadingClass("");
          console.log("error is ", error);
        });
    }, [1000]);
  }, [dollarButton, claimSumState]);
  // FILTER CLAIMS COUNTS
  useEffect(() => {
    if (activeAreaTab === 1) {
      setTimeout(() => {
        var countbtns = "";
        setCountAlert(false);
        if (countButton.length > 0) {
          countbtns = countButton;
        } else {
          countbtns = payers;
        }
        let countbtnsString = countbtns.toString();
        // SET YEAR COUNT CHART DATA
        setYearlyLoadingClass("data-loading");
        claims
          .getClaimCountLastFiveYear(countbtnsString)
          .then(({ data: response }) => {
            setYearlyLoadingClass("");
            const resdata = response.data;
            if (
              typeof resdata !== "undefined" &&
              resdata !== "" &&
              resdata !== null
            ) {
              let yearWiseCategories = [];
              let yearWiseDefualtFirstPoints = [];
              resdata.forEach((item) => {
                yearWiseCategories.push(item.year);
                yearWiseDefualtFirstPoints.push(item.count);
              });
              setYearChartCategories(yearWiseCategories);
              setYearChartFirstPoints(yearWiseDefualtFirstPoints);
              setYearChartLastPoints([]);
              setFiveYearCountCategories(yearWiseCategories);
              setFiveYearCountFirstPoints(yearWiseDefualtFirstPoints);
              setFiveYearCountLastPoints([]);
            }
          })
          .catch((error) => {
            setYearlyLoadingClass("");
            console.log("error is ", error);
          });
      }, [1000]);
    }
  }, [countButton, claimCountState]);

  useEffect(() => {
    let time = payers.length > 0 ? 1000 : 2000;
    setTimeout(() => {
      // var selectedBtns = [];
      if (paymentsButton.length > 0) {
        var index;
        let newPayers = [...payers];
        for (var i = 0; i < paymentsButton.length; i++) {
          index = newPayers.indexOf(paymentsButton[i]);
          if (index > -1) {
            newPayers.splice(index, 1);
          }
        }
        var selectedBtns = paymentsButton;
      } else {
        var selectedBtns = payers;
      }
      let payerString = selectedBtns.toString();
      setPaymentChartLoadingClass("data-loading");
      claims
        .getDashboardClaimAmountByPayer(payerString)
        .then(({ data: response }) => {
          setPaymentChartLoadingClass("");
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            //  GET ALL UNIQUE YEARS FROM ARRAY
            let years = [];
            let uniquePayers = [];
            resdata.forEach((item) => {
              years.push(item.year);
              if (uniquePayers.includes(item.payer) !== true) {
                uniquePayers.push(item.payer);
              }
            });

            let uniqueYear = years.filter((v, i, a) => a.indexOf(v) === i);

            // GET OVER ARRAY TO MANAGE SERIES OF CHART
            var series = [];
            var colArray = [
              "#0AE2B3",
              "#F5BD41",
              "#FA600E",
              "#3251FC",
              "#56BA95",
              "#6FDAEA",
            ];
            for (let index = 0; index < uniquePayers.length; index++) {
              const element = uniquePayers[index];
              let elementfilter = resdata.filter(
                (item) => item.payer === element
              );
              if (elementfilter.length > 0) {
                var seriesdata = [];
                elementfilter.forEach((list) => {
                  seriesdata.push(Math.round(list.paidAmount));
                });

                const randomColor = Math.floor(
                  Math.random() * 16777215
                ).toString(16);
                let selcolor =
                  colArray[Math.floor(Math.random() * colArray.length)];
                series.push({
                  name: element,
                  data: seriesdata,
                  color: selcolor,
                });
              }
            }
            if (series.length > 0) {
              setPayersYears(uniqueYear);
              setPayerSeries(series);
            }
          }
        })
        .catch((error) => {
          setPaymentChartLoadingClass("data-loading");
          console.log("error is ", error);
        });
    }, [time]);
  }, [paymentsButton, payerSeriesRefresh]);
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    if (permission.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      history.push("/dr-services");
    }
    setTimeout(() => {
      claims
        .getPayerList()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            let payerlist = [];
            resdata.forEach((item) => {
              payerlist.push(item.payer);
            });
            setPayers(payerlist);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }, [7000]);
    // GET PAYERS LIST DATA
  }, []);
  // UPDATE MONTHLY CHARTS DATA ON POINT CLICK
  const updateChart = async (e) => {
    let cat = e.point.category;
    var dollarbtns = "";
    setSumAlert(false);
    if (dollarButton.length > 0) {
      var index;
      let newPayers = [...payers];
      for (var i = 0; i < dollarButton.length; i++) {
        index = newPayers.indexOf(dollarButton[i]);
        if (index > -1) {
          newPayers.splice(index, 1);
        }
      }
      dollarbtns = newPayers;
    } else {
      dollarbtns = payers;
    }
    let dollarbtnString = dollarbtns.toString();
    setMonthlyLoadingClass("data-loading");
    if (monthState === 0) {
      if (yearSumCategories.length > 0 && cat === sumYear) {
        setMonthlyLoadingClass("");
        setComparisonChartCategories(yearSumCategories);
        setComparisonChartFirstPoints(yearSumFirstPoints);
        setComparisonChartLastPoints(yearSumLastPoints);
        setMonthState(1);
        setComparisonChartTitle(`Claims YOY - Dollar(${cat})`);
      } else {
        claims
          .getClaimSumByYear(cat, dollarbtnString)
          .then(({ data: response }) => {
            setMonthlyLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.month);
                newFirstPoints.push(item.chargeAmount);
                newLastPoints.push(item.paymentAmount);
              });
              setComparisonChartCategories(newCategoies);
              setComparisonChartFirstPoints(newFirstPoints);
              setComparisonChartLastPoints(newLastPoints);
              setYearSumCategories(newCategoies);
              setYearSumFirstPoints(newFirstPoints);
              setYearSumLastPoints(newLastPoints);
              setComparisonChartTitle(`Claims YOY - Dollar(${cat})`);
              setSumYear(cat);
              setMonthState(1);
            }
          })
          .catch((error) => {
            setMonthlyLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthSumCategories.length > 0 && cat === sumMonth) {
        setMonthlyLoadingClass("");
        setComparisonChartCategories(monthSumCategories);
        setComparisonChartFirstPoints(monthSumFirstPoints);
        setComparisonChartLastPoints(monthSumLastPoints);
        setComparisonChartTitle(`Claims YOY - Dollar(${sumYear} - ${cat})`);
        setMonthState(2);
      } else {
        claims
          .getClaimSumByMonth(cat, sumYear, dollarbtnString)
          .then(({ data: response }) => {
            setMonthlyLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.chargeAmount);
                newLastPoints.push(item.paymentAmount);
              });
              setComparisonChartCategories(newCategoies);
              setComparisonChartFirstPoints(newFirstPoints);
              setComparisonChartLastPoints(newLastPoints);
              setMonthSumCategories(newCategoies);
              setMonthSumFirstPoints(newFirstPoints);
              setMonthSumLastPoints(newLastPoints);
              setComparisonChartTitle(
                `Claims YOY - Dollar(${sumYear} - ${cat})`
              );
              setSumMonth(cat);
              setMonthState(2);
            }
          })
          .catch((error) => {
            setMonthlyLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };

  const updateYearlyClaimData = async (cat) => {
    var countbtns = "";
    setCountAlert(false);
    if (countButton.length > 0) {
      var index;
      let newPayers = [...payers];
      for (var i = 0; i < countButton.length; i++) {
        index = newPayers.indexOf(countButton[i]);
        if (index > -1) {
          newPayers.splice(index, 1);
        }
      }
      countbtns = newPayers;
    } else {
      countbtns = payers;
    }
    let countbtnString = countbtns.toString();
    setYearlyLoadingClass("data-loading");
    if (yearDataState === 0) {
      if (
        typeof yearCountCategories != "undefined" &&
        yearCountCategories.length > 0 &&
        countYear === cat
      ) {
        setYearlyLoadingClass("");
        setYearChartCategories(yearCountCategories);
        setYearChartFirstPoints(yearCountFirstPoints);
        setYearChartLastPoints(yearCountLastPoints);
        setYearChartTitle(`Claims YOY - Count(${cat})`);
        setYearDataState(1);
      } else {
        claims
          .getClaimCountByYear(cat, countbtnString)
          .then(({ data: response }) => {
            setYearlyLoadingClass("");
            const resdata = response.data;
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            if (typeof resdata !== "undefined" && resdata !== "") {
              let prevYearCount = resdata.PreviousYearClaimCount;
              let CurrentYearClaimCount = resdata.CurrentYearClaimCount;
              CurrentYearClaimCount.forEach((item, index) => {
                newCategoies.push(item.month);
                newFirstPoints.push(item.count);
                newLastPoints.push(prevYearCount[index].count);
                // newLastPoints.push(Math.floor(Math.random() * 2000) / 2);
              });
            }
            setYearChartCategories(newCategoies);
            setYearChartFirstPoints(newFirstPoints);
            setYearChartLastPoints(newLastPoints);
            setYearCountCategories(newCategoies);
            setYearCountFirstPoints(newFirstPoints);
            setYearCountLastPoints(newLastPoints);
            setYearChartTitle(`Claims YOY - Count(${cat})`);
            setYearDataState(1);
            setCountYear(cat);
          })
          .catch((error) => {
            setYearlyLoadingClass("");
            setMessage({
              type: "error",
              message: error.message,
            });
          });
      }
    } else {
      if (monthCountCategories.length > 0 && cat === countMonth) {
        setYearlyLoadingClass("");
        setYearChartCategories(monthCountCategories);
        setYearChartFirstPoints(monthCountFirstPoints);
        setYearChartLastPoints(monthCountLastPoints);
        setYearChartTitle(`Claims YOY - Count(${countYear} - ${cat})`);
        setCountMonth(cat);
        setYearDataState(2);
      } else {
        claims
          .getClaimCountByMonth(cat, countYear, countbtnString)
          .then(({ data: response }) => {
            setYearlyLoadingClass("");
            const resdata = response.data;
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            if (typeof resdata !== "undefined" && resdata !== "") {
              let currentMonthCount = resdata.CurrentYearClaimCount;
              let preveMonthCount = resdata.PreviousYearClaimCount;
              currentMonthCount.forEach((item, index) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.count);
                newLastPoints.push(preveMonthCount[index].count);
                // newLastPoints.push(Math.floor(Math.random() * 2000) / 2);
              });
            }
            setYearChartCategories(newCategoies);
            setYearChartFirstPoints(newFirstPoints);
            setYearChartLastPoints(newLastPoints);
            setMonthCountCategories(newCategoies);
            setMonthCountFirstPoints(newFirstPoints);
            setMonthCountLastPoints(newLastPoints);
            setYearChartTitle(`Claims YOY - Count(${countYear} - ${cat})`);
            setCountMonth(cat);
            setYearDataState(2);
          })
          .catch((error) => {
            // setYearlyLoadingClass("");
            setMessage({
              type: "error",
              message: error.message,
            });
          });
      }
    }
  };
  // REVERT CLAIM COUNTS
  const revertYearCliam = async () => {
    setYearlyLoadingClass("data-loading");
    console.log("year state data is ", yearDataState);
    if (yearDataState === 1) {
      setYearlyLoadingClass("");
      setYearChartCategories(fiveYearCountCategories);
      setYearChartFirstPoints(fiveYearCountFirstPoints);
      setYearChartLastPoints(fiveYearCountLastPoints);
      setYearChartTitle("Claims YOY - Count");
      setYearDataState(0);
    } else {
      setYearlyLoadingClass("");
      setYearChartCategories(yearCountCategories);
      setYearChartFirstPoints(yearCountFirstPoints);
      setYearChartLastPoints(yearCountLastPoints);
      setYearChartTitle(`Claims YOY - Count(${countYear})`);
      setYearDataState(1);
    }
  };
  // REVERT POINTS COUNTS
  const revertMonthlyClaims = async () => {
    setMonthlyLoadingClass("data-loading");
    if (monthState === 1) {
      setMonthlyLoadingClass("");
      setComparisonChartCategories(fiveYearSumCategories);
      setComparisonChartFirstPoints(fiveYearSumFirstPoints);
      setComparisonChartLastPoints(fiveYearSumLastPoints);
      setComparisonChartTitle(`Claims YOY - Dollar`);
      setMonthState(0);
    } else {
      setMonthlyLoadingClass("");
      setComparisonChartCategories(yearSumCategories);
      setComparisonChartFirstPoints(yearSumFirstPoints);
      setComparisonChartLastPoints(yearSumLastPoints);
      setComparisonChartTitle(`Claims YOY - Dollar(${sumYear})`);
      setMonthState(1);
    }
  };

  // REFERESH CLIAMS COUNTS
  const refreshClaimCounts = () => {
    setYearlyLoadingClass("data-loading");
    if (yearDataState === 0) {
      claims
        .getClaimCountLastFiveYear()
        .then(({ data: response }) => {
          setYearlyLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(item.count);
            });
            setYearChartCategories(yearWiseCategories);
            setYearChartFirstPoints(yearWiseDefualtFirstPoints);
            setYearChartLastPoints(yearWiseDefualtLastPoints);
            setFiveYearCountCategories(yearWiseCategories);
            setFiveYearCountFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearCountLastPoints(yearWiseDefualtLastPoints);
          }
        })
        .catch((error) => {
          setYearlyLoadingClass("");
          console.log("error is ", error);
        });
    } else if (yearDataState === 1) {
      claims
        .getClaimCountByYear(countYear)
        .then(({ data: response }) => {
          setYearlyLoadingClass("");
          const resdata = response.data;
          let newCategoies = [];
          let newFirstPoints = [];
          let newLastPoints = [];
          if (typeof resdata !== "undefined" && resdata !== "") {
            resdata.forEach((item) => {
              newCategoies.push(item.month);
              newFirstPoints.push(item.count);
              newLastPoints.push(Math.floor(Math.random() * 2000) / 2);
            });
          }
          setYearChartCategories(newCategoies);
          setYearChartFirstPoints(newFirstPoints);
          setYearChartLastPoints(newLastPoints);
          setYearCountCategories(newCategoies);
          setYearCountFirstPoints(newFirstPoints);
          setYearCountLastPoints(newLastPoints);
        })
        .catch((error) => {
          setYearlyLoadingClass("");
          setMessage({
            type: "error",
            message: error.message,
          });
        });
    } else {
      claims
        .getClaimCountByMonth(countMonth, countYear)
        .then(({ data: response }) => {
          setYearlyLoadingClass("");
          const resdata = response.data;
          let newCategoies = [];
          let newFirstPoints = [];
          let newLastPoints = [];
          if (typeof resdata !== "undefined" && resdata !== "") {
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(item.count);
              newLastPoints.push(Math.floor(Math.random() * 2000) / 2);
            });
          }
          setYearChartCategories(newCategoies);
          setYearChartFirstPoints(newFirstPoints);
          setYearChartLastPoints(newLastPoints);
        })
        .catch((error) => {
          setYearlyLoadingClass("");
          setMessage({
            type: "error",
            message: error.message,
          });
        });
    }
  };

  // REFERESH CLAIMS SUM
  const refreshClaimSum = () => {
    setMonthlyLoadingClass("data-loading");
    if (monthState === 0) {
      claims
        .getClaimSumLastFiveYear()
        .then(({ data: response }) => {
          setMonthlyLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let yearWiseCategories = [];
            let yearWiseDefualtFirstPoints = [];
            let yearWiseDefualtLastPoints = [];
            resdata.forEach((item) => {
              yearWiseCategories.push(item.year);
              yearWiseDefualtFirstPoints.push(item.chargeAmount);
              yearWiseDefualtLastPoints.push(item.paymentAmount);
            });
            setComparisonChartCategories(yearWiseCategories);
            setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
            setComparisonChartLastPoints(yearWiseDefualtLastPoints);
            setFiveYearSumCategories(yearWiseCategories);
            setFiveYearSumFirstPoints(yearWiseDefualtFirstPoints);
            setFiveYearSumLastPoints(yearWiseDefualtLastPoints);
          }
        })
        .catch((error) => {
          setMonthlyLoadingClass("");
          console.log("error is ", error);
        });
    } else if (monthState === 1) {
      claims
        .getClaimSumByYear(sumYear)
        .then(({ data: response }) => {
          setMonthlyLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.month);
              newFirstPoints.push(item.chargeAmount);
              newLastPoints.push(item.paymentAmount);
            });
            setComparisonChartCategories(newCategoies);
            setComparisonChartFirstPoints(newFirstPoints);
            setComparisonChartLastPoints(newLastPoints);
            setYearSumCategories(newCategoies);
            setYearSumFirstPoints(newFirstPoints);
            setYearSumLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setMonthlyLoadingClass("");
          console.log("error is ", error);
        });
    } else {
      claims
        .getClaimSumByMonth(sumMonth, sumYear)
        .then(({ data: response }) => {
          setMonthlyLoadingClass("");
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let newCategoies = [];
            let newFirstPoints = [];
            let newLastPoints = [];
            resdata.forEach((item) => {
              newCategoies.push(item.day);
              newFirstPoints.push(item.chargeAmount);
              newLastPoints.push(item.paymentAmount);
            });
            setComparisonChartCategories(newCategoies);
            setComparisonChartFirstPoints(newFirstPoints);
            setComparisonChartLastPoints(newLastPoints);
          }
        })
        .catch((error) => {
          setMonthlyLoadingClass("");
          console.log("error is ", error);
        });
    }
  };
  // CHARTS CONFIGURATION
  const claimYearChart = {
    chart: {
      type: "area",
      spacingBottom: 20,
      spacingTop: 20,
      spacingLeft: 20,
      spacingRight: 20,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: yearChartCategories,
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: "#f7f7f7",
    },
    tooltip: {
      headerFormat:
        '<span><span style="font-size:12px;font-weight: 500; color:#fff;line-height:20px;">{point.key}</span><table class="tool-tip"><br>',
      pointFormat:
        '<tr><td style="color:#fff;padding:0; font-weight: 300; font-size:12px;">{series.name}: </td>' +
        '<td style="padding:0; color:#fff;font-weight: 300; font-size:12px;"><b>{point.y}</b></td></tr>',
      footerFormat: "</table></span>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (yearDataState !== 2) {
              updateYearlyClaimData(e.point.category);
            }
          },
        },
      },

      area: {
        marker: {
          enabled: false,
          symbol: "circle",
          radius: 2,
          states: {
            hover: {
              enabled: true,
            },
          },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          format: yearAmount ? "${y}" : null,
        },
        enableMouseTracking: true,
      },
    },

    series: [
      {
        name: "Claims",
        data: yearChartFirstPoins,
        lineColor: "#FA600E",
        color: "#FA600E",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(250, 96, 14, 0.5)"],
            [0, "rgba(250, 96, 14, 0.2)"],
            [1, "rgba(250, 96, 14, 0.0)"],
          ],
        },
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Previous Year",
        data: yearChartLastPoins,
        // lineColor: "#2974C4",
        // color: "#2974C4",
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
        zones: [
          {
            value: 8,
          },
          {
            dashStyle: "dot",
          },
        ],
      },
    ],
  };

  const comparisonChart = {
    chart: {
      type: "area",
      spacingBottom: 20,
      spacingTop: 20,
      spacingLeft: 20,
      spacingRight: 20,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      text: "",
      align: "left",
    },
    xAxis: {
      categories: comparisonChartCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      gridLineColor: "#f7f7f7",
      title: {
        text: "Claims Average",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:12px;font-weight: 500; color:#fff;line-height:20px;">{point.key}$</span><table>',
      pointFormat:
        monthAmount === true
          ? '<tr><td style="font-size:12px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
          '<td style="font-size:12px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>'
          : '<tr><td style="font-size:12px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
          '<td style="font-size:12px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.7)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
      pointPadding: 10,
    },
    series: [
      {
        name: "Previous Year",
        data: comparisonChartLastPoins,
        lineColor: "#e2e2e2",
        color: "#e2e2e2",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(189, 189, 189, 0.4)"],
            [0, "rgba(189, 189, 189, 0.2)"],
            [1, "rgba(189, 189, 189, 0.0)"],
          ],
        },
        dataLabels: {
          color: "#bdbdbd",
        },
      },
      {
        name: "Claims",
        data: comparisonChartFirstPoins,
        lineColor: "#FA600E",
        color: "#FA600E",
        fillColor: {
          linearGradient: [0, 0, 0, 250],
          stops: [
            [0, "rgba(250, 96, 14, 0.5)"],
            [0, "rgba(250, 96, 14, 0.2)"],
            [1, "rgba(250, 96, 14, 0.0)"],
          ],
        },
      },
    ],
    plotOptions: {
      series: {
        // point: {
        events: {
          click: (e) => {
            if (monthState !== 2) {
              updateChart(e);
            }
          },
          // },
        },
      },
      area: {
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },

        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
      // area: {
      //   marker: {
      //     enabled: false,
      //     symbol: 'circle',
      //     radius: 2,
      //     states: {
      //       hover: {
      //         enabled: true
      //       }
      //     }
      //   }
      // },
    },
  };

  // Claims Payment Chart
  const claimPaymentChart = {
    chart: {
      type: "column",
      spacingBottom: 20,
      spacingTop: 20,
      spacingLeft: 20,
      spacingRight: 20,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      text: "",
    },
    subtitle: {
      text: "",
    },
    xAxis: {
      categories: payersYears,
    },
    yAxis: {
      title: {
        text: "",
      },
      gridLineColor: "#f7f7f7",
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:12px;font-weight: 500; color:#fff;">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="font-size:12px;font-weight: 500; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:12px;font-weight: 500; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (yearDataState !== 2) {
              // updateYearlyClaimData(e.point.category);
            }
          },
        },
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        borderRadius: 5,
        dataLabels: {
          enabled: true,
          useHTML: true,
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
      },
    },
    series: payerSeries,
  };

  const handleAreaActiveTab = (index) => {
    // setAreaActiveTa(index);
    setActiveAreaTab(index);
    if (index === 1) {
      setClaimCountState(!claimCountState);
    } else {
      setClaimSumState(!claimSumState);
    }
  };
  const handleCountSelection = (e) => {
    const countbuttons = [...countButton];
    let index = countbuttons.filter((item) => item === e);
    if (index.length === 0) {
      countbuttons.push(e);
    } else {
      countbuttons.pop(e);
    }
    setCountButton(countbuttons);
  };

  const handleSumSelection = (e) => {
    const sumbtns = [...dollarButton];
    let index = sumbtns.filter((item) => item === e);
    if (index.length === 0) {
      sumbtns.push(e);
    } else {
      sumbtns.pop(e);
    }
    setDollarButton(sumbtns);
  };

  const handlePaymentSelection = (e) => {
    const paybuttons = [...paymentsButton];
    let index = paybuttons.filter((item) => item === e);
    if (index.length === 0) {
      paybuttons.push(e);
    } else {
      paybuttons.pop(e);
    }
    setPaymentsButton(paybuttons);
  };
  const numberFormat = (number) => {
    var SI_POSTFIXES = ["", "k", "M", "G", "T", "P", "E"];
    // what tier? (determines SI prefix)
    var tier = (Math.log10(Math.abs(number)) / 3) | 0;

    // if zero, we don't need a prefix
    if (tier === 0) return number;

    // get postfix and determine scale
    var postfix = SI_POSTFIXES[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add postfix as suffix
    var formatted = scaled.toFixed(1) + "";

    // remove '.0' case
    if (/\.0$/.test(formatted))
      formatted = formatted.substr(0, formatted.length - 2);

    return formatted + postfix;
  };

  // BUTTON CLICK FILTERS
  // CLIAM SUM BUTTON CLICK FILTER
  const handleClaimSum = (index) => {
    if (index !== "#") {
      if (index === 0) {
        setComparisonChartCategories(fiveYearSumCategories);
        setComparisonChartFirstPoints(fiveYearSumFirstPoints);
        setComparisonChartLastPoints(fiveYearSumLastPoints);
        setComparisonChartTitle(`Claims YOY - Dollar`);
      } else if (index === 1) {
        setComparisonChartCategories(yearSumCategories);
        setComparisonChartFirstPoints(yearSumFirstPoints);
        setComparisonChartLastPoints(yearSumLastPoints);
        setComparisonChartTitle(`Claims YOY - Dollar(${sumYear})`);
      } else {
        setComparisonChartCategories(monthSumCategories);
        setComparisonChartFirstPoints(monthSumFirstPoints);
        setComparisonChartLastPoints(monthSumLastPoints);
        setComparisonChartTitle(`Claims YOY - Dollar(${sumYear}-${sumMonth})`);
      }

      setMonthState(index);
    }
  };
  const handleClaimCount = (index) => {
    if (index === 0) {
      setYearChartCategories(fiveYearCountCategories);
      setYearChartFirstPoints(fiveYearCountFirstPoints);
      setYearChartLastPoints(fiveYearCountLastPoints);
      setYearChartTitle("Claims YOY - Count");
    } else if (index === 1) {
      setYearChartCategories(yearCountCategories);
      setYearChartFirstPoints(yearCountFirstPoints);
      setYearChartLastPoints(yearCountLastPoints);
      setYearChartTitle(`Claims YOY - Count(${countYear})`);
    } else {
      setYearChartCategories(monthCountCategories);
      setYearChartFirstPoints(monthCountFirstPoints);
      setYearChartLastPoints(monthCountLastPoints);
      setYearChartTitle(`Claims YOY - Count(${countYear} - ${countMonth})`);
    }
    setYearDataState(index);
    // revertYearCliam();
  };
  return (
    <>
      <header className="dashboard-header header-new new-ui-bx-search">
        <div className="header-search-main">
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/">
                Insights
                      </Link>
              <Typography color="textPrimary">Dashboard</Typography>
            </Breadcrumbs>
          </Box>
          <SearchBox />

          <UserDropdown />
        </div>
        {/* <div>
          <iframe
            src='https://webchat.botframework.com/embed/ChatBotDataRovers?s=CVjOylthTf0.lEZ2TXuXVp0x7bM8YZ3Hzm6zu5X7rcW9d8qNPQdSarI'
            style={{ minWidth: "400px", width: "100%", minHeight: "500px", }}
          >
          </iframe>
        </div> */}
      </header>

      <div className="dashboard-main tp-pd-0"
      >
        {/* new box */}

        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={12}>
                  {/* <h2 className="page-heading mb-0">Dashboard</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new bred-top-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">Dashboard</Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>

                <Grid item xs={12} md={7}>
                  <div className="pre-adj-tabs-all ">
                    <ul>
                      <li>
                        <NavLink to="/" className="pre-active">
                          <img src={DashboradIcon} alt="icon" />
                          <label>Dashboard</label>
                        </NavLink>
                      </li>


                      <li>
                        <NavLink to="/rca">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Smart Insights</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/biosimilar">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Biosimilars</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/codes">
                          <img src={Tabcptcodeicon} alt="icon" />
                          <label>CPT Codes</label>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Grid>

                <Grid item xs={12} md={5} className="text-right pt-3">
                  <button
                    style={{ backgroundColor: "#fff !important" }}
                    className="chart-refresh-btn-wt shadow-ui-new pull-right ml-2"
                    onClick={() => setOverviewRefresh(!overviewRefresh)}
                  >
                    <img src={RefreshIcon} alt="Icon" />
                  </button>
                  <ButtonGroup
                    className="pull-right shadow-ui-new"
                    variant="contained"
                  >
                    {overviewButtons.map((item, index) => {
                      return item === selectedOverview ? (
                        <Button
                          key={index}
                          variant="contained"
                          className="chart-ac-btn"
                          onClick={() => console.log(item)}
                        >
                          {item}{" "}
                        </Button>
                      ) : (
                        <Button
                          className="chart-dis-btn-wt"
                          variant="contained"
                          readOnly="readonly"
                          key={index}
                          onClick={() => setSelectedOverview(item)}
                        >
                          {item}
                        </Button>
                      );
                    })}
                  </ButtonGroup>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        {stateLoadingClass !== "" ? (
          <div className="" style={{ position: "relative" }}>
            <div className={stateLoadingClass}>
              <div className="cliam-ui-table-2">
                <Loading></Loading>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Grid container spacing={3}>
              <Grid item xs={12} md={3}>
                <div className="DR-mini-card cr-main-bx DR-mini-crd-green">
                  <div className="DR-mini-crd-inner">
                    <div className="dash-inner-text">
                      <p>Revenue</p>
                      <h2>
                        <Tooltip
                          title={
                            "$" +
                            billed.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          }
                        >
                          <span>${numberFormat(billed)}</span>
                        </Tooltip>
                      </h2>
                      <ul>
                        <li
                          className={
                            billedPercentage > 0
                              ? "box-arrow-li"
                              : "box-arrow-down-li"
                          }
                        >
                          <span>{Math.abs(billedPercentage)}%</span>
                          <img
                            src={billedPercentage > 0 ? arrowUp : arrowDown}
                            alt="Arrow"
                          />
                        </li>
                        <li className="box-pr-text">
                          {billedPercentage > 0 ? "Increase" : "Decrease"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="DR-mini-img-green">

                    <img
                      className="mini-crd-img"
                      src={RevinueIcon}
                      alt="Icon"
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} md={3}>
                <div className="DR-mini-card cr-main-bx DR-mini-crd-purpel">
                  <div className="DR-mini-crd-inner">
                    <div className="dash-inner-text">
                      <p>Loss</p>
                      <h2>
                        <Tooltip
                          title={
                            "$" +
                            writeoff.toLocaleString("en-US", {
                              maximumFractionDigits: 2,
                            })
                          }
                        >
                          <span>${numberFormat(writeoff)}</span>
                        </Tooltip>
                      </h2>
                      <ul>
                        <li
                          className={
                            writeOffPercentage > 0
                              ? "box-arrow-li"
                              : "box-arrow-down-li"
                          }
                        >
                          <span>{Math.abs(writeOffPercentage)}%</span>
                          <img
                            src={writeOffPercentage > 0 ? arrowUp : arrowDown}
                            alt="Arrow"
                          />
                        </li>
                        <li className="box-pr-text">
                          {writeOffPercentage > 0 ? "Increase" : "Decrease"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="DR-mini-img-purpel">
                    <img
                      className="mini-crd-img"
                      src={LossIcon}
                      alt="Icon"
                    />
                  </div>
                </div>

              </Grid>
              <Grid item xs={12} md={3}>
                <div className="DR-mini-card cr-main-bx DR-mini-crd-yellow">
                  <div className="DR-mini-crd-inner">
                    <div className="dash-inner-text">
                      <p>Patients</p>
                      <h2>{uniquePatients}</h2>
                      <ul>
                        <li
                          className={
                            patientPercentage > 0
                              ? "box-arrow-li"
                              : "box-arrow-down-li"
                          }
                        >
                          <span>{Math.abs(patientPercentage)}%</span>
                          <img
                            src={patientPercentage > 0 ? arrowUp : arrowDown}
                            alt="Arrow"
                          />
                        </li>
                        <li className="box-pr-text">
                          {patientPercentage > 0 ? "Increase" : "Decrease"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="DR-mini-img-yellow">
                    <img
                      className="mini-crd-img"
                      src={paitentIcon}
                      alt="Icon"
                    />
                  </div>
                </div>

              </Grid>
              <Grid item xs={12} md={3}>
                <div className="DR-mini-card cr-main-bx DR-mini-crd-red">
                  <div className="DR-mini-crd-inner">
                    <div className="dash-inner-text">
                      <p>Claims</p>
                      <h2>{claimsCount}</h2>
                      <ul>
                        <li
                          className={
                            countPercentage > 0 ? "box-arrow-li" : "box-arrow-down-li"
                          }
                        >
                          <span>{Math.abs(countPercentage)}%</span>
                          <img
                            src={countPercentage > 0 ? arrowUp : arrowDown}
                            alt="Arrow"
                          />
                        </li>
                        <li className="box-pr-text">
                          {countPercentage > 0 ? "Increase" : "Decrease"}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="DR-mini-img-red">
                    <img
                      className="mini-crd-img"
                      src={claimsbxIcon}
                      alt="Icon"
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            {/* <div className="progress-box-main">
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Revenue</p>
                  <h2>
                    <Tooltip
                      title={
                        "$" +
                        billed.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })
                      }
                    >
                      <span>${numberFormat(billed)}</span>
                    </Tooltip>
                  </h2>
                  <ul>
                    <li
                      className={
                        billedPercentage > 0
                          ? "box-arrow-li"
                          : "box-arrow-down-li"
                      }
                    >
                      <span>{Math.abs(billedPercentage)}%</span>
                      <img
                        src={billedPercentage > 0 ? arrowUp : arrowDown}
                        alt="Arrow"
                      />
                    </li>
                    <li className="box-pr-text">
                      {billedPercentage > 0 ? "Increase" : "Decrease"}
                    </li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-2">
                  <img className="box-icon-img" src={DashBox2} alt="Icon" />
                </div>
              </div>
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Loss</p>
                  <h2>
                    <Tooltip
                      title={
                        "$" +
                        writeoff.toLocaleString("en-US", {
                          maximumFractionDigits: 2,
                        })
                      }
                    >
                      <span>${numberFormat(writeoff)}</span>
                    </Tooltip>
                  </h2>
                  <ul>
                    <li
                      className={
                        writeOffPercentage > 0
                          ? "box-arrow-li"
                          : "box-arrow-down-li"
                      }
                    >
                      <span>{Math.abs(writeOffPercentage)}%</span>
                      <img
                        src={writeOffPercentage > 0 ? arrowUp : arrowDown}
                        alt="Arrow"
                      />
                    </li>
                    <li className="box-pr-text">
                      {writeOffPercentage > 0 ? "Increase" : "Decrease"}
                    </li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-3">
                  <img className="box-icon-img" src={DashBox3} alt="Icon" />
                </div>
              </div>
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Patients</p>
                  <h2>{uniquePatients}</h2>
                  <ul>
                    <li
                      className={
                        patientPercentage > 0
                          ? "box-arrow-li"
                          : "box-arrow-down-li"
                      }
                    >
                      <span>{Math.abs(patientPercentage)}%</span>
                      <img
                        src={patientPercentage > 0 ? arrowUp : arrowDown}
                        alt="Arrow"
                      />
                    </li>
                    <li className="box-pr-text">
                      {patientPercentage > 0 ? "Increase" : "Decrease"}
                    </li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-4">
                  <img className="box-icon-img" src={DashBox4} alt="Icon" />
                </div>
              </div>
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Claims</p>
                  <h2>{claimsCount}</h2>
                  <ul>
                    <li
                      className={
                        countPercentage > 0 ? "box-arrow-li" : "box-arrow-down-li"
                      }
                    >
                      <span>{Math.abs(countPercentage)}%</span>
                      <img
                        src={countPercentage > 0 ? arrowUp : arrowDown}
                        alt="Arrow"
                      />
                    </li>
                    <li className="box-pr-text">
                      {countPercentage > 0 ? "Increase" : "Decrease"}
                    </li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-4">
                  <img className="box-icon-img" src={DashBox1} alt="Icon" />
                </div>
              </div>
            </div> */}
          </>
        )}

        {/* end new box */}

        {/*first chart Box        */}

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            {/* GEO MAP CHART */}
            <Grid item xs={12} sm={12} >
              <Box className="line-chart-outer-crd  mt-3">
                <div className="dash-btn-main">
                  <div className="chart-title-main">
                    <Grid container>
                      <Grid item sm={12}>
                        <h3 className="chart-title">Geo Map</h3>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <Grid container>
                  <Grid item md={12} className="mt-2">
                    <GeoMapChart />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box className="line-chart-outer-crd mt-3">
              {/* button */}

              <div className="dash-btn-main">
                <div className="chart-title-main pb-0">
                  <Grid container>
                    <Grid item sm={5}>
                      <Tabs
                        value={activeAreaTab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={(e, index) => handleAreaActiveTab(index)}
                        aria-label="tabs example"
                        className="new-chart-tabs"
                      >
                        {areaTabs.map((tab) => {
                          return <Tab label={tab} key={tab} />;
                        })}
                      </Tabs>
                    </Grid>

                    <Grid item sm={7}>
                      {activeAreaTab === 0 ? (
                        <React.Fragment>
                          {monthState !== 0 ? (
                            <button
                              className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                              onClick={() => revertMonthlyClaims()}
                            >
                              <img src={ChartBack} alt="Icon" />
                            </button>
                          ) : null}
                          <button
                            className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                            onClick={() => refreshClaimSum()}
                          >
                            <img src={RefreshIcon} alt="Icon" />
                          </button>
                          <ButtonGroup
                            className="pull-right shadow-ui-new"
                            variant="contained"
                          >
                            {/* {btngroups.map((item, index) => {
                          return (
                            <Button
                              key={item}
                              className={
                                index === monthState
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                              onClick={() => handleClaimSum(index)}
                            >
                              {item}
                            </Button>
                          );
                        })} */}
                            <Button
                              onClick={() => handleClaimSum(0)}
                              className={
                                monthState === 0 ? "chart-ac-btn" : "chart-dis-btn"
                              }
                            >
                              Year
                        </Button>
                            <Button
                              onClick={
                                sumYear !== ""
                                  ? () => handleClaimSum(1)
                                  : handleClaimSum("#")
                              }
                              className={
                                monthState === 1 ? "chart-ac-btn" : "chart-dis-btn"
                              }
                            >
                              Month
                        </Button>
                            <Button
                              onClick={
                                sumMonth !== ""
                                  ? () => handleClaimSum(2)
                                  : handleClaimSum("#")
                              }
                              className={
                                monthState === 2 ? "chart-ac-btn" : "chart-dis-btn"
                              }
                            >
                              Day
                        </Button>
                          </ButtonGroup>
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {yearDataState !== 0 ? (
                            <button
                              className="chart-refresh-btn pull-right ml-2"
                              onClick={() => revertYearCliam()}
                            >
                              <img src={ChartBack} alt="Icon" />
                            </button>
                          ) : null}
                          <button
                            className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                            onClick={() => refreshClaimCounts()}
                          >
                            <img src={RefreshIcon} alt="Icon" />
                          </button>
                          <ButtonGroup
                            className="pull-right shadow-ui-new"
                            variant="contained"
                          >
                            {/* {btngroups.map((item, index) => {
                          return (
                            <Button
                              key={item}
                              onClick={() => handleClaimCount(index)}
                              className={
                                index === yearDataState
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              {item}
                            </Button>
                          );
                        })} */}
                            <Button
                              onClick={() => handleClaimCount(0)}
                              className={
                                yearDataState === 0
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Year
                        </Button>
                            <Button
                              onClick={
                                countYear !== "" ? () => handleClaimCount(1) : ""
                              }
                              className={
                                yearDataState === 1
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Month
                        </Button>
                            <Button
                              onClick={
                                countMonth !== "" ? () => handleClaimCount(2) : ""
                              }
                              className={
                                yearDataState === 2
                                  ? "chart-ac-btn"
                                  : "chart-dis-btn"
                              }
                            >
                              Day
                        </Button>
                          </ButtonGroup>
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container className="mb-2">
                {activeAreaTab === 0 ? (
                  <React.Fragment>
                    {sumAlert === true ? (
                      <Grid container>
                        <Grid item md={12}>
                          <Messages />
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container>
                      <Grid item md={12}>
                        {monthlyLoadingClass !== "" ? (
                          <div className="mt-1" style={{ position: "relative" }}>
                            <div className={monthlyLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1">
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={comparisonChart}
                            />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <Grid container>
                      <Grid item sm={12}>
                        <CountPayerDropDown
                          allPayers={payers}
                          selected={countButton}
                          handleChange={(e) => handleCountSelection(e)}
                          SelectAll={(e) => setCountButton([])}
                        />
                      </Grid>
                    </Grid>
                    {countAlert === true ? (
                      <Grid container>
                        <Grid item md={12}>
                          <Messages />
                        </Grid>
                      </Grid>
                    ) : null}
                    <Grid container>
                      <Grid item md={12}>
                        {yearlyLoadingClass !== "" ? (
                          <div className="mt-1" style={{ position: "relative" }}>
                            <div className={yearlyLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-1">
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={claimYearChart}
                            />
                          </div>
                        )}
                      </Grid>
                    </Grid>
                  </React.Fragment>
                )}
              </Grid>
            </Box>
          </Grid>
        </Grid>


        {/* End first chart Box */}

        <Box className="line-chart-outer-crd mt-4">
          <div className="chart-title-main">
            <Grid container>
              <Grid item sm={4}>
                <h3 className="chart-title">Revenue payers</h3>
              </Grid>

              <Grid item sm={8}>
                <button
                  className="chart-refresh-btn shadow-ui-new pull-right ml-2"
                  onClick={() => setPayerSeriesRefresh(!payerSeriesRefresh)}
                >
                  <img src={RefreshIcon} alt="Icon" />
                </button>
                <ButtonGroup
                  className="pull-right shadow-ui-new"
                  variant="contained"
                >
                  <Button className="chart-ac-btn">Year</Button>
                  <Button className="chart-dis-btn">Month</Button>
                  <Button className="chart-dis-btn">Day</Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </div>
          <Grid container>
            <Grid item sm={12}>
              <ClaimPayerDropDown
                allPayers={payers}
                selected={paymentsButton}
                SelectAll={(e) => setPaymentsButton([])}
                handleChange={(e) => handlePaymentSelection(e)}
              />
            </Grid>
          </Grid>
          {paymentChartLoadingClass !== "" ? (
            <div className="mt-3" style={{ position: "relative" }}>
              <div className={paymentChartLoadingClass}>
                <div className="cliam-ui-table-2">
                  <Loading></Loading>
                </div>
              </div>
            </div>
          ) : (
            <HighchartsReact
              highcharts={Highcharts}
              options={claimPaymentChart}
            />
          )}
        </Box>



        <FooterCopyright />
      </div>
    </>
  );
};

export default Dashboard;
