import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Tooltip,
  Tabs,
  Tab,
  Typography,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import searchImg from "../../assets/images/search.svg";
import arrowUp from "../../assets/images/new-design/dash-arrow-up.svg";
import arrowDown from "../../assets/images/new-design/dash-arrow-down.svg";
import ChartBack from "../../assets/images/new-design/Back.svg";
import DashBox1 from "../../assets/images/new-design/box-1.svg";
import DashBox2 from "../../assets/images/new-design/box-2.svg";
import DashBox3 from "../../assets/images/new-design/box-3.svg";
import DashBox4 from "../../assets/images/new-design/box-4.svg";
import RefreshIcon from "../../assets/images/new-design/refresh.svg";
import Highcharts from "highcharts";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import imgOne from "../../assets/images/new-design/sub-1.svg";
import imgOnegr from "../../assets/images/new-design/sub-1gr.svg";
import HighchartsReact from "highcharts-react-official";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "../../actions/common";
import Loading from "../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";
import Messages from "../../components/Messages";
import CountPayerDropDown from "./CountPayerDropDown";
import ClaimPayerDropDown from "./ClaimPayerDropDown";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/variwide")(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});
const DashboardAnalysis = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);
  const [yearChartTitle, setYearChartTitle] = useState("Claims YOY - Count");
  const [comparisonChartTitle, setComparisonChartTitle] = useState(
    "Claims YOY - Dollar"
  );
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
    yearChartTitle,
    comparisonChartTitle,
  ]);
  const [activeAreaTab, setActiveAreaTab] = useState(0);
  const [claimCountState, setClaimCountState] = useState(false);
  const [claimSumState, setClaimSumState] = useState(false);

  const [overviewButtons, setOverviewButtons] = useState([
    "Year",
    "Quater",
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

  // FILTER CLAIMS COUNTS
  useEffect(() => {
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
  }, [countButton, claimCountState]);

  // FILTER CLAIMS SUM
  useEffect(() => {
    if (payers.length > 0) {
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
      if (activeAreaTab === 1) {
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
      }
    }
  }, [dollarButton, claimSumState]);
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
    },
    tooltip: {
      headerFormat:
        '<span><span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table class="tool-tip"><br>',
      pointFormat:
        '<tr><td style="color:#fff;padding:0; font-weight: 300; font-size:10px;">{series.name}: </td>' +
        '<td style="padding:0; color:#fff;font-weight: 300; font-size:10px;"><b>{point.y}</b></td></tr>',
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
          linearGradient: [0, 0, 0, 200],
          stops: [
            [0, Highcharts.getOptions().colors[3]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[0])
                .setOpacity(0.1)
                .get("rgba"),
            ],
          ],
        },
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Previous Year",
        data: yearChartLastPoins,
        lineColor: "#2974C4",
        color: "#2974C4",
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
      title: {
        text: "Claims Average",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}$</span><table>',
      pointFormat:
        monthAmount === true
          ? '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
            '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>'
          : '<tr><td style="font-size:10px;font-weight: 300; color:#fff;padding:0">{series.name}: </td>' +
            '<td style="font-size:10px;font-weight: 300; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
      backgroundColor: "rgb(12, 16, 21, 0.6)",
      borderWidth: 0,
      shadow: false,
      color: "#fff",
      borderRadius: 10,
    },
    series: [
      {
        name: "Previous Year",
        data: comparisonChartLastPoins,
        lineColor: "#3251FC",
        color: "#3251fc54",
      },
      {
        name: "Claims",
        data: comparisonChartFirstPoins,
        lineColor: "#FA600E",
        color: "#fb6c1d5e",
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
          // format: "${y}",
          formatter: function () {
            return "$" + numberFormat(this.point.y);
          },
        },
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
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
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px;font-weight: 500; color:#fff;">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="font-size:10px;font-weight: 500; color:#fff;padding:0">{series.name}: </td>' +
        '<td style="font-size:10px;font-weight: 500; color:#fff;padding:0"><b>${point.y}</b></td></tr>',
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
    if (index === 0) {
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
    if (tier == 0) return number;

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
    setMonthState(index);
    revertMonthlyClaims();
  };
  const handleClaimCount = (index) => {
    setYearDataState(index);
    revertYearCliam();
  };
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
      <div className="dashboard-main">
        {/* new box */}

        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={4}>
                  <h2 className="page-heading mb-0">Dashboard</h2>
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Dashboard
                      </Link>
                      <Typography color="textPrimary">Overview</Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
                <Grid item xs={12}>
                  <div className="pre-adj-tabs-all">
                    <ul>
                      <li>
                        <NavLink to="/">
                          <img src={imgOnegr} alt="icon" />
                          <label>Overview</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/codes">
                          <img src={imgOnegr} alt="icon" />
                          <label>Code</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/analysis" className="pre-active">
                          <img src={imgOne} alt="icon" />
                          <label>Analysis</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/rca">
                          <img src={imgOnegr} alt="icon" />
                          <label>RCA</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/heat-map">
                          <img src={imgOnegr} alt="icon" />
                          <label>Heat Map</label>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        {/* <FooterCopyright /> */}
      </div>
    </>
  );
};

export default DashboardAnalysis;
