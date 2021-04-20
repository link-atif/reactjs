import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Tooltip,
  Tabs,
  Tab,
  Paper,
} from "@material-ui/core";
import searchImg from "../../assets/images/search.svg";
import arrowUp from "../../assets/images/new-design/dash-arrow-up.svg";
import iconBox1 from "../../assets/images/box-icon-1.svg";
import iconBox2 from "../../assets/images/box-icon-2.svg";
import iconBox3 from "../../assets/images/box-icon-3.svg";
import iconBox4 from "../../assets/images/box-icon-4.svg";
import DashBox1 from "../../assets/images/new-design/box-1.svg";
import DashBox2 from "../../assets/images/new-design/box-2.svg";
import DashBox3 from "../../assets/images/new-design/box-3.svg";
import DashBox4 from "../../assets/images/new-design/box-3.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "./../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";
import Messages from "./../../components/Messages";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/variwide")(Highcharts);

// var HighchartsReact = require("highcharts-react-official");

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});
const Dashboard = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);
  const [yearChartTitle, setYearChartTitle] = useState("Claims YOY - Count");
  const [adminChartTitle, setAdminChartTitle] = useState("Admin");
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

  // ADMIN BILLED DATA CONSTATNS
  const [billedCategories, setBilledCategories] = useState([]);
  const [billedFirstPoints, setBilledFirstPoints] = useState([]);
  const [billedLastPoints, setBilledLastPoints] = useState([]);
  const [fiveYearBilledCategories, setFiveYearBilledCategories] = useState([]);
  const [fiveYearBilledFirstPoints, setFiveYearBilledFirstPoints] = useState(
    []
  );
  const [fiveYearBilledLastPoints, setFiveYearBilledLastPoints] = useState([]);
  const [yearBilledCategories, setYearBilledCategories] = useState([]);
  const [yearBilledFirstPoints, setYearBilledFirstPoints] = useState([]);
  const [yearBilledLastPoints, setYearBilledLastPoints] = useState([]);
  const [monthBilledCategories, setMonthBilledCategories] = useState([]);
  const [monthBilledFirstPoints, setMonthBilledFirstPoints] = useState([]);
  const [monthBilledLastPoints, setMonthBilledLastPoints] = useState([]);
  const [billMonth, setBillMonth] = useState("");
  const [billYear, setBillYear] = useState("");

  // JCODE BILLED DATA CONSTATNS
  const [jcodeCategories, setJcodeCategories] = useState([]);
  const [jcodeFirstPoints, setJcodeFirstPoints] = useState([]);
  const [jcodeLastPoints, setJcodeLastPoints] = useState([]);
  const [fiveYearJcodeCategories, setFiveYearJcodeCategories] = useState([]);
  const [fiveYearJcodeFirstPoints, setFiveYearJcodeFirstPoints] = useState([]);
  const [fiveYearJcodeLastPoints, setFiveYearJcodeLastPoints] = useState([]);
  const [yearJcodeCategories, setYearJcodeCategories] = useState([]);
  const [yearJcodeFirstPoints, setYearJcodeFirstPoints] = useState([]);
  const [yearJcodeLastPoints, setYearJcodeLastPoints] = useState([]);
  const [monthJcodeCategories, setMonthJcodeCategories] = useState([]);
  const [monthJcodeFirstPoints, setMonthJcodeFirstPoints] = useState([]);
  const [monthJcodeLastPoints, setMonthJcodeLastPoints] = useState([]);
  const [jcodeMonth, setJcodeMonth] = useState("");
  const [jcodeYear, setJcodeYear] = useState("");
  const [jcodeStatus, setJcodeStatus] = useState(0);
  const [jcodeLoadingClass, setJcodeLoadingClass] = useState("");
  const [jcodeChartTitle, setJcodeChartTitle] = useState("JCode");

  // JCODE ANCILLARY DATA CONSTATNS
  const [ancillaryCategories, setAncillaryCategories] = useState([]);
  const [ancillaryFirstPoints, setAncillaryFirstPoints] = useState([]);
  const [ancillaryLastPoints, setAncillaryLastPoints] = useState([]);
  const [
    fiveYearAncillaryCategories,
    setFiveYearAncillaryCategories,
  ] = useState([]);
  const [
    fiveYearAncillaryFirstPoints,
    setFiveYearAncillaryFirstPoints,
  ] = useState([]);
  const [
    fiveYearAncillaryLastPoints,
    setFiveYearAncillaryLastPoints,
  ] = useState([]);
  const [yearAncillaryCategories, setYearAncillaryCategories] = useState([]);
  const [yearAncillaryFirstPoints, setYearAncillaryFirstPoints] = useState([]);
  const [yearAncillaryLastPoints, setYearAncillaryLastPoints] = useState([]);
  const [monthAncillaryCategories, setMonthAncillaryCategories] = useState([]);
  const [monthAncillaryFirstPoints, setMonthAncillaryFirstPoints] = useState(
    []
  );
  const [monthAncillaryLastPoints, setMonthAncillaryLastPoints] = useState([]);
  const [ancillaryMonth, setAncillaryMonth] = useState("");
  const [ancillaryYear, setAncillaryYear] = useState("");
  const [ancillaryStatus, setAncillaryStatus] = useState(0);
  const [ancillaryLoadingClass, setAncillaryLoadingClass] = useState("");
  const [ancillaryChartTitle, setAncillaryChartTitle] = useState("Ancillary");

  // PREMED DATA CONSTATNS
  const [premedCategories, setPremedCategories] = useState([]);
  const [premedFirstPoints, setPremedFirstPoints] = useState([]);
  const [premedLastPoints, setPremedLastPoints] = useState([]);
  const [fiveYearPremedCategories, setFiveYearPremedCategories] = useState([]);
  const [fiveYearPremedFirstPoints, setFiveYearPremedFirstPoints] = useState(
    []
  );
  const [fiveYearPremedLastPoints, setFiveYearPremedLastPoints] = useState([]);
  const [yearPremedCategories, setYearPremedCategories] = useState([]);
  const [yearPremedFirstPoints, setYearPremedFirstPoints] = useState([]);
  const [yearPremedLastPoints, setYearPremedLastPoints] = useState([]);
  const [monthPremedCategories, setMonthPremedCategories] = useState([]);
  const [monthPremedFirstPoints, setMonthPremedFirstPoints] = useState([]);
  const [monthPremedLastPoints, setMonthPremedLastPoints] = useState([]);
  const [premedMonth, setPremedMonth] = useState("");
  const [premedYear, setPremedYear] = useState("");
  const [premedStatus, setPremedStatus] = useState(0);
  const [premedLoadingClass, setPremedLoadingClass] = useState("");
  const [premedChartTitle, setPremedChartTitle] = useState("Pre-Med");

  // DONUT CHART DATA CONSTANTS
  const [donutChartLoadingClass, setDonutChartLoadingClass] = useState("");
  const [donutData, setDonutData] = useState([]);
  const [donutButtons, setDonutButtons] = useState([]);
  const [donutAlert, setDonutAlert] = useState(false);
  const [donutStatus, setDonutStatus] = useState(0);
  const [donutDefaultData, setDonutDefaultData] = useState([]);
  const [donutColors, setDonutColors] = useState([]);
  const defualtDonutColors = [
    "#196dc7",
    "#67d091",
    "#14d6cd",
    "#e83e7d",
    "#563690",
  ];

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
  const [claimSum, setClaimSum] = useState(0);
  const [reimbursements, setReimbursements] = useState(0);
  const [billed, setBilled] = useState(0);
  const [paid, setPaid] = useState(0);
  const [writeoff, setWriteOff] = useState(0);
  const [uniquePatients, setUniquePatients] = useState(0);
  const [stateLoadingClass, setStateLoadingClass] = useState("");
  const [adminLoadingClass, setAdminLoadingClass] = useState("");
  const [billedState, setBilledState] = useState(0);
  const [countButton, setCountButton] = useState([]);
  const [dollarButton, setDollarButton] = useState([]);
  const [paymentsButton, setPaymentsButton] = useState([]);
  const [payersYears, setPayersYears] = useState([]);
  const [payerSeries, setPayerSeries] = useState([]);
  const [paymentChartLoadingClass, setPaymentChartLoadingClass] = useState("");
  const [payers, setPayers] = useState([]);
  const yearWiseDefualtLastPoints = [1106, 970, 2187, 2940, 1500, 2490];
  const [tabs, setTabs] = useState(["Admin", "Jcode", "Ancillary", "Pre-med"]);
  const [activeTab, setActiveTab] = useState(0);
  const [adminChartState, setAdminChartState] = useState(false);
  const [jcodeChartState, setJcodeChartState] = useState(false);
  const [ancillaryChartState, setAncillaryChartState] = useState(false);
  const [premedChartState, setPremedChartState] = useState(false);
  const [overviewButtons, setOverviewButtons] = useState([
    "Year",
    "Month",
    "Quater",
  ]);
  const [selectedOverview, setSelectedOverview] = useState("Year");

  useEffect(() => {
    // var selectedBtns = [];
    if (payers.length > 0) {
      if (paymentsButton.length > 0) {
        var index;
        let newPayers = [...payers];
        for (var i = 0; i < paymentsButton.length; i++) {
          index = newPayers.indexOf(paymentsButton[i]);
          if (index > -1) {
            newPayers.splice(index, 1);
          }
        }
        var selectedBtns = newPayers;
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
            // GET ALL UNIQUE YEARS FROM ARRAY
            let years = [];
            resdata.forEach((item) => {
              years.push(item.year);
            });
            let uniqueYear = years.filter((v, i, a) => a.indexOf(v) === i);

            // GET OVER ARRAY TO MANAGE SERIES OF CHART
            var series = [];
            for (let index = 0; index < selectedBtns.length; index++) {
              const element = selectedBtns[index];
              let elementfilter = resdata.filter(
                (item) => item.payer === element
              );
              if (elementfilter.length > 0) {
                var seriesdata = [];
                elementfilter.forEach((list) => {
                  seriesdata.push(list.paidAmount);
                });
                const randomColor = Math.floor(
                  Math.random() * 16777215
                ).toString(16);
                series.push({
                  name: element,
                  data: seriesdata,
                  lineColor: "#" + randomColor,
                  color: "#" + randomColor,
                });
              }
            }
            setPayersYears(uniqueYear);
            setPayerSeries(series);
          }
        })
        .catch((error) => {
          setPaymentChartLoadingClass("data-loading");
          console.log("error is ", error);
        });
    }
  }, [payers, paymentsButton]);
  useEffect(() => {
    // SET ADMIN BILLED VS PAID
    setAdminLoadingClass("data-loading");
    claims
      .getDashboardAdminCodeLastFiveYear()
      .then(({ data: response }) => {
        setAdminLoadingClass("");
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
            yearWiseDefualtFirstPoints.push(item.billedAmount);
            yearWiseDefualtLastPoints.push(item.paidAmount);
          });
          setBilledCategories(yearWiseCategories);
          setBilledFirstPoints(yearWiseDefualtFirstPoints);
          setBilledLastPoints(yearWiseDefualtLastPoints);
          // setBilledLastPoints([]);
          setFiveYearBilledCategories(yearWiseCategories);
          setFiveYearBilledFirstPoints(yearWiseDefualtFirstPoints);
          setFiveYearBilledLastPoints(yearWiseDefualtLastPoints);
          // setFiveYearBilledLastPoints([]);
        }
      })
      .catch((error) => {
        setAdminLoadingClass("");
        console.log("error is ", error);
      });
  }, [adminChartState]);

  useEffect(() => {
    // SET JCode BILLED VS PAID
    setJcodeLoadingClass("data-loading");
    claims
      .getDashboardJCodeLastFiveYear()
      .then(({ data: response }) => {
        setJcodeLoadingClass("");
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
            yearWiseDefualtFirstPoints.push(item.billedAmount);
            yearWiseDefualtLastPoints.push(item.paidAmount);
          });
          setJcodeCategories(yearWiseCategories);
          setJcodeFirstPoints(yearWiseDefualtFirstPoints);
          setJcodeLastPoints(yearWiseDefualtLastPoints);
          // setBilledLastPoints([]);
          setFiveYearJcodeCategories(yearWiseCategories);
          setFiveYearJcodeFirstPoints(yearWiseDefualtFirstPoints);
          setFiveYearJcodeLastPoints(yearWiseDefualtLastPoints);
          // setFiveYearBilledLastPoints([]);
        }
      })
      .catch((error) => {
        setJcodeLoadingClass("");
        console.log("error is ", error);
      });
  }, [jcodeChartState]);

  useEffect(() => {
    // SET Ancillary BILLED VS PAID
    setAncillaryLoadingClass("data-loading");
    claims
      .getDashboardAncillaryLastFiveYear()
      .then(({ data: response }) => {
        setAncillaryLoadingClass("");
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
            yearWiseDefualtFirstPoints.push(item.billedAmount);
            yearWiseDefualtLastPoints.push(item.paidAmount);
          });
          setAncillaryCategories(yearWiseCategories);
          setAncillaryFirstPoints(yearWiseDefualtFirstPoints);
          setAncillaryLastPoints(yearWiseDefualtLastPoints);
          // setBilledLastPoints([]);
          setFiveYearAncillaryCategories(yearWiseCategories);
          setFiveYearAncillaryFirstPoints(yearWiseDefualtFirstPoints);
          setFiveYearAncillaryLastPoints(yearWiseDefualtLastPoints);
          // setFiveYearBilledLastPoints([]);
        }
      })
      .catch((error) => {
        setAncillaryLoadingClass("");
        console.log("error is ", error);
      });
  }, [ancillaryChartState]);

  useEffect(() => {
    // SET Premed BILLED VS PAID
    setPremedLoadingClass("data-loading");
    claims
      .getDashboardPreMedLastFiveYear()
      .then(({ data: response }) => {
        setPremedLoadingClass("");
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
            yearWiseDefualtFirstPoints.push(item.billedAmount);
            yearWiseDefualtLastPoints.push(item.paidAmount);
          });
          setPremedCategories(yearWiseCategories);
          setPremedFirstPoints(yearWiseDefualtFirstPoints);
          setPremedLastPoints(yearWiseDefualtLastPoints);
          // setBilledLastPoints([]);
          setFiveYearPremedCategories(yearWiseCategories);
          setFiveYearPremedFirstPoints(yearWiseDefualtFirstPoints);
          setFiveYearPremedLastPoints(yearWiseDefualtLastPoints);
          // setFiveYearBilledLastPoints([]);
        }
      })
      .catch((error) => {
        setPremedLoadingClass("");
        console.log("error is ", error);
      });
  }, [premedChartState]);
  useEffect(() => {
    async function fetchData() {
      /* SET DASHBOARD COUNTS */
      const date = new Date();
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      setStateLoadingClass("data-loading");

      // GET CLAIM COUNTS
      await common
        .getDashbaordKPIClaimCount(selectedOverview)
        .then(({ data: response }) => {
          const { data } = response;
          if (data !== null && data.length > 0) {
            setClaimsCount(data[0].count);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });

      // DASHBOARD KPI BILLED PAID
      await common
        .getDashbaordKPIClaimBilledAndPaid(selectedOverview)
        .then(({ data: response }) => {
          const { data } = response;
          if (data !== null && data.length > 0) {
            setBilled(data[0].billed);
            setPaid(data[0].paid);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });

      // GET WRITE OFF
      await common
        .getDashbaordKPIWriteoff(selectedOverview)
        .then(({ data: response }) => {
          const { data } = response;
          if (data !== null && data.length > 0) {
            setWriteOff(data[0].writeOffAmount);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });

      // GET PATIENT COUNT
      await common
        .getDashbaordKPIPatientCount(selectedOverview)
        .then(({ data: response }) => {
          const { data } = response;
          if (data !== null && data.length > 0) {
            setUniquePatients(data[0].patientCount);
          }
          setStateLoadingClass("");
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }
    fetchData();
  }, [selectedOverview]);
  useEffect(() => {
    const startTime = Date.now();
    setMessage({
      type: "",
      message: "",
    });
    if (permission.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      history.push("/dr-services");
    }

    // GET PAYERS LIST DATA
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
          // setPaymentButton(payerlist);
          let payerbtn = payerlist.filter((btn) => btn !== "BLUE CROSS");
          // setCountButton(payerbtn);
          // setDollarButton(payerbtn);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    setAdminChartState(true);
    setStateLoadingClass("");
    const msElapsed = Date.now() - startTime;

    console.log(`Async function took ${msElapsed / 1000} seconds to complete.`);
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

  // UPDATE ADMIN AMOUNTS
  const updateAdminChart = async (e) => {
    let cat = e.point.category;
    setAdminLoadingClass("data-loading");
    console.log("billed state ", billedState);
    if (billedState === 0) {
      if (yearSumCategories.length > 0 && cat === sumYear) {
        setAdminLoadingClass("");
        setBilledCategories(fiveYearBilledCategories);
        setBilledFirstPoints(fiveYearBilledFirstPoints);
        setBilledLastPoints(fiveYearBilledLastPoints);
        setBilledState(1);
        setAdminChartTitle(`Admin(${cat})`);
      } else {
        claims
          .getDashboardAdminCodeByYear(cat)
          .then(({ data: response }) => {
            setAdminLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setBilledCategories(newCategoies);
              setBilledFirstPoints(newFirstPoints);
              setBilledLastPoints(newLastPoints);
              setYearBilledCategories(newCategoies);
              setYearBilledFirstPoints(newFirstPoints);
              setYearBilledLastPoints(newLastPoints);
              setAdminChartTitle(`Admin(${cat})`);
              setBillYear(cat);
              setBilledState(1);
            }
          })
          .catch((error) => {
            setAdminLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthBilledCategories.length > 0 && cat === billMonth) {
        setAdminLoadingClass("");
        setBilledCategories(monthBilledCategories);
        setBilledFirstPoints(monthBilledFirstPoints);
        setBilledLastPoints(monthBilledLastPoints);
        setComparisonChartTitle(`Admin(${billYear} - ${cat})`);
        setBilledState(2);
      } else {
        claims
          .getDashboardAdminCodeByMonth(cat, billYear)
          .then(({ data: response }) => {
            setAdminLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setBilledCategories(newCategoies);
              setBilledFirstPoints(newFirstPoints);
              setBilledLastPoints(newLastPoints);
              setMonthSumCategories(newCategoies);
              setMonthBilledFirstPoints(newFirstPoints);
              setMonthBilledLastPoints(newLastPoints);
              setAdminChartTitle(`Admin(${billYear} - ${cat})`);
              setBillMonth(cat);
              setBilledState(2);
            }
          })
          .catch((error) => {
            setAdminLoadingClass("");
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
            console.log("response data is", resdata);
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

  // REVERT ADMIN CHARTS DATA
  const revertAdminChart = async () => {
    setAdminLoadingClass("data-loading");
    if (billedState === 1) {
      setAdminLoadingClass("");
      setBilledCategories(fiveYearBilledCategories);
      setBilledFirstPoints(fiveYearBilledFirstPoints);
      setBilledLastPoints(fiveYearBilledLastPoints);
      setAdminChartTitle(`Admin`);
      setBilledState(0);
    } else {
      setAdminLoadingClass("");
      setBilledCategories(yearBilledCategories);
      setBilledFirstPoints(yearBilledFirstPoints);
      setBilledLastPoints(yearBilledLastPoints);
      setAdminChartTitle(`Admin (${billYear})`);
      setBilledState(1);
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

  // JCODE UPDATE && REVERT FUNCTIONS
  const updateJcode = (e) => {
    let cat = e.point.category;
    setJcodeLoadingClass("data-loading");
    if (jcodeStatus === 0) {
      if (fiveYearJcodeCategories.length > 0 && cat === sumYear) {
        setJcodeLoadingClass("");
        setJcodeCategories(fiveYearJcodeCategories);
        setJcodeFirstPoints(fiveYearJcodeFirstPoints);
        setJcodeLastPoints(fiveYearJcodeLastPoints);
        setJcodeStatus(1);
        setJcodeChartTitle(`JCode (${cat})`);
      } else {
        claims
          .getDashboardJCodeByYear(cat)
          .then(({ data: response }) => {
            setJcodeLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setJcodeCategories(newCategoies);
              setJcodeFirstPoints(newFirstPoints);
              setJcodeLastPoints(newLastPoints);
              setYearJcodeCategories(newCategoies);
              setYearJcodeFirstPoints(newFirstPoints);
              setYearJcodeLastPoints(newLastPoints);
              setJcodeChartTitle(`JCode (${cat})`);
              setJcodeYear(cat);
              setJcodeStatus(1);
            }
          })
          .catch((error) => {
            setJcodeLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthJcodeCategories.length > 0 && cat === billMonth) {
        setJcodeLoadingClass("");
        setJcodeCategories(monthJcodeCategories);
        setJcodeFirstPoints(monthJcodeFirstPoints);
        setJcodeLastPoints(monthJcodeLastPoints);
        setJcodeChartTitle(`JCode (${jcodeYear} - ${cat})`);
        setJcodeStatus(2);
      } else {
        claims
          .getDashboardJCodeByMonth(cat, jcodeYear)
          .then(({ data: response }) => {
            setJcodeLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setJcodeCategories(newCategoies);
              setJcodeFirstPoints(newFirstPoints);
              setJcodeLastPoints(newLastPoints);
              setMonthJcodeCategories(newCategoies);
              setMonthJcodeFirstPoints(newFirstPoints);
              setMonthJcodeLastPoints(newLastPoints);
              setJcodeChartTitle(`JCode (${jcodeYear} - ${cat})`);
              setJcodeMonth(cat);
              setJcodeStatus(2);
            }
          })
          .catch((error) => {
            setJcodeLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertJcode = () => {
    setJcodeLoadingClass("data-loading");
    if (jcodeStatus === 1) {
      setJcodeLoadingClass("");
      setJcodeCategories(fiveYearJcodeCategories);
      setJcodeFirstPoints(fiveYearJcodeFirstPoints);
      setJcodeLastPoints(fiveYearJcodeLastPoints);
      setJcodeChartTitle(`JCode`);
      setJcodeStatus(0);
    } else {
      setJcodeLoadingClass("");
      setJcodeCategories(yearJcodeCategories);
      setJcodeFirstPoints(yearJcodeFirstPoints);
      setJcodeLastPoints(yearJcodeLastPoints);
      setJcodeChartTitle(`JCode (${jcodeYear})`);
      setJcodeStatus(1);
    }
  };

  // ANCILLARY UPDATE && REVERT FUNCTIONS
  const updateAncillary = (e) => {
    let cat = e.point.category;
    setAncillaryLoadingClass("data-loading");
    if (ancillaryStatus === 0) {
      if (yearAncillaryCategories.length > 0 && cat === ancillaryYear) {
        setAncillaryLoadingClass("");
        setAncillaryCategories(fiveYearAncillaryCategories);
        setAncillaryFirstPoints(fiveYearAncillaryFirstPoints);
        setAncillaryLastPoints(fiveYearAncillaryLastPoints);
        setAncillaryStatus(1);
        setAncillaryChartTitle(`Ancillary (${cat})`);
      } else {
        claims
          .getDashboardAncillaryByYear(cat)
          .then(({ data: response }) => {
            setAncillaryLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setAncillaryCategories(newCategoies);
              setAncillaryFirstPoints(newFirstPoints);
              setAncillaryLastPoints(newLastPoints);
              setYearAncillaryCategories(newCategoies);
              setYearAncillaryFirstPoints(newFirstPoints);
              setYearAncillaryLastPoints(newLastPoints);
              setAncillaryChartTitle(`Ancillary (${cat})`);
              setAncillaryYear(cat);
              setAncillaryStatus(1);
            }
          })
          .catch((error) => {
            setAncillaryLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthAncillaryCategories.length > 0 && cat === billMonth) {
        setAncillaryLoadingClass("");
        setAncillaryCategories(monthAncillaryCategories);
        setAncillaryFirstPoints(monthAncillaryFirstPoints);
        setAncillaryLastPoints(monthAncillaryLastPoints);
        setAncillaryChartTitle(`Ancillary (${ancillaryYear} - ${cat})`);
        setAncillaryStatus(2);
      } else {
        claims
          .getDashboardAncillaryByMonth(cat, ancillaryYear)
          .then(({ data: response }) => {
            setAncillaryLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setAncillaryCategories(newCategoies);
              setAncillaryFirstPoints(newFirstPoints);
              setAncillaryLastPoints(newLastPoints);
              setMonthAncillaryCategories(newCategoies);
              setMonthAncillaryFirstPoints(newFirstPoints);
              setMonthAncillaryLastPoints(newLastPoints);
              setAncillaryChartTitle(`Ancillary (${ancillaryYear} - ${cat})`);
              setAncillaryMonth(cat);
              setAncillaryStatus(2);
            }
          })
          .catch((error) => {
            setAncillaryLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertAncillary = () => {
    setAncillaryLoadingClass("data-loading");
    if (ancillaryStatus === 1) {
      setAncillaryLoadingClass("");
      setAncillaryCategories(fiveYearAncillaryCategories);
      setAncillaryFirstPoints(fiveYearAncillaryFirstPoints);
      setAncillaryLastPoints(fiveYearAncillaryLastPoints);
      setAncillaryChartTitle(`Ancillary`);
      setAncillaryStatus(0);
    } else {
      setAncillaryLoadingClass("");
      setAncillaryCategories(yearAncillaryCategories);
      setAncillaryFirstPoints(yearAncillaryFirstPoints);
      setAncillaryLastPoints(yearAncillaryLastPoints);
      setAncillaryChartTitle(`Ancillary (${ancillaryYear})`);
      setAncillaryStatus(1);
    }
  };

  // PRE-MED UPDATE && REVERT FUNCTIONS
  const updatePremed = (e) => {
    let cat = e.point.category;
    setPremedLoadingClass("data-loading");
    if (premedStatus === 0) {
      if (yearPremedCategories.length > 0 && cat === ancillaryYear) {
        setPremedLoadingClass("");
        setPremedCategories(fiveYearPremedCategories);
        setPremedFirstPoints(fiveYearPremedFirstPoints);
        setPremedLastPoints(fiveYearPremedLastPoints);
        setPremedStatus(1);
        setPremedChartTitle(`Pre-Med (${cat})`);
      } else {
        claims
          .getDashboardPreMedByYear(cat)
          .then(({ data: response }) => {
            setPremedLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.monthName);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setPremedCategories(newCategoies);
              setPremedFirstPoints(newFirstPoints);
              setPremedLastPoints(newLastPoints);
              setYearPremedCategories(newCategoies);
              setYearPremedFirstPoints(newFirstPoints);
              setYearPremedLastPoints(newLastPoints);
              setPremedChartTitle(`Pre-Med (${cat})`);
              setPremedYear(cat);
              setPremedStatus(1);
            }
          })
          .catch((error) => {
            setPremedLoadingClass("");
            console.log("error is ", error);
          });
      }
    } else {
      if (monthPremedCategories.length > 0 && cat === billMonth) {
        setPremedLoadingClass("");
        setPremedCategories(monthPremedCategories);
        setPremedFirstPoints(monthPremedFirstPoints);
        setPremedLastPoints(monthPremedLastPoints);
        setPremedChartTitle(`Pre-Med (${premedYear} - ${cat})`);
        setPremedStatus(2);
      } else {
        claims
          .getDashboardPreMedByMonth(cat, premedYear)
          .then(({ data: response }) => {
            setPremedLoadingClass("");
            const resdata = response.data;
            if (typeof resdata !== "undefined" && resdata !== "") {
              let newCategoies = [];
              let newFirstPoints = [];
              let newLastPoints = [];
              resdata.forEach((item) => {
                newCategoies.push(item.day);
                newFirstPoints.push(item.billedAmount);
                newLastPoints.push(item.paidAmount);
              });
              setPremedCategories(newCategoies);
              setPremedFirstPoints(newFirstPoints);
              setPremedLastPoints(newLastPoints);
              setMonthPremedCategories(newCategoies);
              setMonthPremedFirstPoints(newFirstPoints);
              setMonthPremedLastPoints(newLastPoints);
              setPremedChartTitle(`Pre-Med (${premedYear} - ${cat})`);
              setPremedMonth(cat);
              setPremedStatus(2);
            }
          })
          .catch((error) => {
            setPremedLoadingClass("");
            console.log("error is ", error);
          });
      }
    }
  };
  const revertPremed = () => {
    setPremedLoadingClass("data-loading");
    if (premedStatus === 1) {
      setPremedLoadingClass("");
      setPremedCategories(fiveYearPremedCategories);
      setPremedFirstPoints(fiveYearPremedFirstPoints);
      setPremedLastPoints(fiveYearPremedLastPoints);
      setPremedChartTitle(`Pre-Med`);
      setPremedStatus(0);
    } else {
      setPremedLoadingClass("");
      setPremedCategories(yearPremedCategories);
      setPremedFirstPoints(yearPremedFirstPoints);
      setPremedLastPoints(yearPremedLastPoints);
      setPremedChartTitle(`Pre-Med (${premedYear})`);
      setPremedStatus(1);
    }
  };

  // DONUT CHART UPDATE AND REVERT FUNCTIONS
  const updatedonutChart = (cat) => {
    var category = cat.split(" ")[0];
    setDonutChartLoadingClass("data-loading");
    claims
      .getDashboardCodesAmountByType("2020", category)
      .then(({ data: response }) => {
        setDonutChartLoadingClass("");
        const resdata = response.data;
        if (
          typeof resdata !== "undefined" &&
          resdata !== "" &&
          resdata !== null
        ) {
          let newdata = [];
          let colors = [];
          resdata.forEach((item) => {
            newdata.push({ name: item.code, y: item.paidAmount });
            colors.push(
              "#" +
              ((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")
            );
          });
          setDonutColors(colors);
          setDonutData(newdata);
          setDonutStatus(1);
        }
      })
      .catch((error) => {
        setDonutChartLoadingClass("");
        console.log("error is ", error);
      });
  };

  const revertDonutChart = () => {
    setDonutColors(defualtDonutColors);
    setDonutData(donutDefaultData);
    setDonutStatus(0);
  };

  // CHARTS CONFIGURATION
  const claimYearChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 50,
      spacingRight: 50,
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
        '<span style="font-size:10px">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
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
      line: {
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
        lineColor: "#FD586B",
        color: "#FD586B",
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Previous Year",
        data: yearChartLastPoins,
        lineColor: "#FEAA48",
        color: "#808080",
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
    exporting: {
      buttons: [
        {
          text: "\u27F3",
          onclick: function () {
            refreshClaimCounts();
          },
          theme: {
            "stroke-width": 1,
            stroke: "silver",
            r: 0,
            states: {
              hover: {
                fill: "#a4edba",
              },
              select: {
                stroke: "#039",
                fill: "#a4edba",
              },
            },
          },
        },
        yearDataState !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertYearCliam();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  const comparisonChart = {
    chart: {
      type: "column",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 50,
      spacingRight: 50,
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
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        monthAmount === true
          ? '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>${point.y:,.1f}</b></td></tr>'
          : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    series: [
      {
        name: "Claims",
        data: comparisonChartFirstPoins,
        color: "#02F1B8",
      },
      {
        name: "Previous Year",
        data: comparisonChartLastPoins,
        color: "#36DEED",
      },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            click: (e) => {
              if (monthState !== 2) {
                updateChart(e);
              }
            },
          },
        },
      },
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    exporting: {
      buttons: [
        {
          text: "\u27F3",
          onclick: function () {
            refreshClaimSum();
          },
          theme: {
            "stroke-width": 1,
            stroke: "silver",
            r: 0,
            states: {
              hover: {
                fill: "#a4edba",
              },
              select: {
                stroke: "#039",
                fill: "#a4edba",
              },
            },
          },
        },
        monthState !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertMonthlyClaims();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  const billedbarChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      text: adminChartTitle,
      align: "left",
    },
    xAxis: {
      categories: billedCategories,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      text: "Billed Vs Paid",
    },
    tooltip: {
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        monthAmount === true
          ? '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>${point.y:,.1f}</b></td></tr>'
          : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    dataLabels: {
      enabled: false,
      rotation: -90,
      color: "#FFFFFF",
      align: "right",
      format: "{point.y:.1f}", // one decimal
      y: 10, // 10 pixels down from the top
      style: {
        fontSize: "11px",
      },
    },
    series: [
      {
        name: "Billed",
        data: billedFirstPoints,
        lineColor: "#dc3554",
        color: "#dc3554",
      },
      {
        name: "Paid",
        data: billedLastPoints,
        lineColor: "#1f6fc5",
        color: "#1f6fc5",
      },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            click: (e) => {
              if (billedState !== 2) {
                updateAdminChart(e);
              }
            },
          },
        },
      },
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    exporting: {
      buttons: [
        // {
        //   text: "\u27F3",
        //   onclick: function () {
        //     refreshClaimSum();
        //   },
        //   theme: {
        //     "stroke-width": 1,
        //     stroke: "silver",
        //     r: 0,
        //     states: {
        //       hover: {
        //         fill: "#a4edba",
        //       },
        //       select: {
        //         stroke: "#039",
        //         fill: "#a4edba",
        //       },
        //     },
        //   },
        // },
        billedState !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertAdminChart();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  const jcodeChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 50,
      spacingRight: 50,
      borderRadius: 10,
      backgroundColor: "#ffffff",
    },
    title: {
      text: jcodeChartTitle,
      align: "left",
    },
    subtitle: {
      text: "",
    },
    legend: {
      enabled: true,
    },
    xAxis: {
      categories: jcodeCategories,
    },
    yAxis: {
      title: {
        text: "",
      },
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (jcodeStatus !== 2) {
              updateJcode(e);
            }
          },
        },
      },
      line: {
        dataLabels: {
          enabled: true,
          format: yearAmount ? "${y}" : null,
        },
        enableMouseTracking: true,
      },
    },

    series: [
      {
        name: "Billed",
        data: jcodeFirstPoints,
        lineColor: "#dc3554",
        color: "#dc3554",
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: jcodeLastPoints,
        lineColor: "#1f6fc5",
        color: "#1f6fc5",
        showInLegend: true,
      },
    ],
    exporting: {
      buttons: [
        jcodeStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertJcode();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // ANCILLARY CHART CONFIGUREATION
  const ancillaryChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
    },
    title: {
      text: ancillaryChartTitle,
    },

    xAxis: {
      categories: ancillaryCategories,
    },
    yAxis: {
      min: 0,
      labels: {
        format: "{value}$",
      },
      // lineWidth: 1,
      // opposite: false,
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (ancillaryStatus !== 2) {
              updateAncillary(e);
            }
          },
        },
      },
    },
    series: [
      {
        name: "Billed",
        data: ancillaryFirstPoints,
        lineColor: "#dc3554",
        color: "#dc3554",
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: ancillaryLastPoints,
        lineColor: "#1f6fc5",
        color: "#1f6fc5",
        showInLegend: true,
      },
    ],
    exporting: {
      buttons: [
        ancillaryStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertAncillary();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // PREMED CHART CONFIGURATION
  const premedChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
    },
    title: {
      text: premedChartTitle,
    },

    xAxis: {
      categories: premedCategories,
    },
    yAxis: {
      min: 0,
      labels: {
        format: "{value}$",
      },
      // lineWidth: 1,
      // opposite: true,
      title: {
        text: "",
      },
    },
    legend: {
      enabled: true,
    },
    tooltip: {
      headerFormat:
        '<span style="font-size:10px">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (premedStatus !== 2) {
              updatePremed(e);
            }
          },
        },
      },
    },
    series: [
      {
        name: "Billed",
        data: premedFirstPoints,
        lineColor: "#dc3554",
        color: "#dc3554",
        click: function () {
          alert("point clicke");
        },
      },
      {
        name: "Paid",
        data: premedLastPoints,
        lineColor: "#1f6fc5",
        color: "#1f6fc5",
        showInLegend: true,
      },
    ],
    exporting: {
      buttons: [
        premedStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertPremed();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // DONUT CHARTS
  const cpu = {
    chart: {
      renderTo: "container",
      type: "pie",
    },
    title: {
      text: "CPT Code",
      verticalAlign: "top",
      floating: true,
    },
    subtitle: {
      text: "84% <br /> used",
      verticalAlign: "middle",
      // y: -10,
      floating: true,
    },
    yAxis: {
      title: {
        text: "Total percent market share",
      },
    },
    plotOptions: {
      pie: {
        shadow: true,
        dataLabels: {
          enabled: true,
          format: "{y:.1f} $",
        },
      },
      series: {
        cursor: "pointer",
        events: {
          click: function (e) {
            if (donutStatus !== 1) {
              updatedonutChart(e.point.name);
            }
          },
        },
      },
      showInLegend: true,
    },
    tooltip: {
      formatter: function () {
        return "<b>" + this.point.name + "</b>: " + this.y + " $";
      },
      useHTML: true,
    },
    series: [
      {
        name: "Browsers",
        colors: donutColors,
        data: donutData,
        size: "90%",
        innerSize: "90%",
        showInLegend: true,
        dataLabels: {
          enabled: true,
        },
      },
    ],
    exporting: {
      buttons: [
        donutStatus !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertDonutChart();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // Claims Payment Chart
  const claimPaymentChart = {
    chart: {
      type: "line",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 50,
      spacingRight: 50,
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
        '<span style="font-size:10px">{point.key}</span><table><br>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:,.1f}</b></td></tr>',
      footerFormat: "</table>",
      // pointFormat: "<b>{point.x} :</b>" + "Count: <b>{point.y:,.0f}</b>",
      shared: true,
      useHTML: true,
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
      line: {
        dataLabels: {
          enabled: true,
          format: yearAmount ? "${y}" : null,
        },
        enableMouseTracking: true,
      },
    },

    series: payerSeries,
    exporting: {
      buttons: [
        // {
        //   text: "\u27F3",
        //   onclick: function () {
        //     refreshClaimCounts();
        //   },
        //   theme: {
        //     "stroke-width": 1,
        //     stroke: "silver",
        //     r: 0,
        //     states: {
        //       hover: {
        //         fill: "#a4edba",
        //       },
        //       select: {
        //         stroke: "#039",
        //         fill: "#a4edba",
        //       },
        //     },
        //   },
        // },
        yearDataState !== 0
          ? {
            text: "\u2B05",
            onclick: function () {
              revertYearCliam();
            },
            theme: {
              "stroke-width": 1,
              stroke: "silver",
              r: 0,
              states: {
                hover: {
                  fill: "#a4edba",
                },
                select: {
                  stroke: "#039",
                  fill: "#a4edba",
                },
              },
            },
          }
          : "",
      ],
    },
  };

  // FILTER CLAIMS COUNTS
  useEffect(() => {
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
  }, [payers, countButton]);

  const handleCountEnabled = (item) => {
    let buttons = countButton.filter((c) => c !== item);
    setCountButton(buttons);
  };
  const handleCountDisabled = (item) => {
    let newButtons = [...countButton];
    newButtons.push(item);
    if (newButtons.length === payers.length) {
      setMessage({
        type: "error",
        message: "You can not disable all Payers",
      });
      setCountAlert(true);
      return false;
    }
    setCountButton(newButtons);
  };

  // FILTER CLAIMS SUM
  useEffect(() => {
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
  }, [payers, dollarButton]);
  const handleDollarEnabled = (item) => {
    let buttons = dollarButton.filter((c) => c !== item);
    setDollarButton(buttons);
  };
  const handleDollarDisabled = (item) => {
    let newButtons = [...dollarButton];
    newButtons.push(item);
    if (newButtons.length === payers.length) {
      setMessage({
        type: "error",
        message: "You can not disable all Payers",
      });
      setSumAlert(true);
      return false;
    }
    setDollarButton(newButtons);
  };
  const handlePaymentsEnabled = (item) => {
    let buttons = payers.filter((c) => c !== item);
    setPaymentsButton(buttons);
  };
  const handlePaymentsDisabled = (item) => {
    let newButtons = [...paymentsButton];
    newButtons.push(item);
    setPaymentsButton(newButtons);
  };

  // FILTER DONUT CHARTS DATA
  useEffect(() => {
    setDonutAlert(false);
    // DONUT CHART DATA CONFIGURATION
    var donutbtns = "";
    if (donutButtons.length > 0) {
      var index;
      let newPayers = [...payers];
      for (var i = 0; i < donutButtons.length; i++) {
        index = newPayers.indexOf(donutButtons[i]);
        if (index > -1) {
          newPayers.splice(index, 1);
        }
      }
      donutbtns = newPayers;
    } else {
      donutbtns = payers;
    }
    let donutbtnstring = donutbtns.toString();
    setDonutChartLoadingClass("data-loading");
    claims
      .getDashboardCodesAmountByYear("2019", donutbtnstring)
      .then(({ data: response }) => {
        setDonutChartLoadingClass("");
        const resdata = response.data;
        if (
          typeof resdata !== "undefined" &&
          resdata !== "" &&
          resdata !== null
        ) {
          let newdata = [];
          resdata.forEach((item) => {
            newdata.push({ name: item.codeType, y: item.paidAmount });
          });
          setDonutData(newdata);
          setDonutColors(defualtDonutColors);
          setDonutDefaultData(newdata);
        }
      })
      .catch((error) => {
        setDonutChartLoadingClass("");
        console.log("error is ", error);
      });
  }, [payers, donutButtons]);
  const handleDonutEnabled = (item) => {
    let buttons = donutButtons.filter((c) => c !== item);
    setDonutButtons(buttons);
  };
  const handleDonutDisabled = (item) => {
    let newButtons = [...donutButtons];
    newButtons.push(item);
    if (newButtons.length === payers.length) {
      setMessage({
        type: "error",
        message: "You can not disable all payers",
      });
      setDonutAlert(true);
      return false;
    }
    setDonutButtons(newButtons);
  };

  const handleActiveTab = (index) => {
    setActiveTab(index);
    if (index === 0) {
      setAdminChartState(!adminChartState);
    } else if (index == 1) {
      setJcodeChartState(!jcodeChartState);
    } else if (index == 2) {
      setAncillaryChartState(!ancillaryChartState);
    } else {
      setPremedChartState(!premedChartState);
    }
  };
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField id="standard-search" type="search" className="mt-0" />
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
                <Grid item xs={4} md={6}>
                  <h2 className="page-heading">Overview</h2>
                </Grid>
                <Grid item xs={9} md={6} className="text-right">
                  {overviewButtons.map((item, index) => {
                    return item === selectedOverview ? (
                      <React.Fragment key={index}>
                        <Button
                          variant="contained"
                          className="cu-ad-btn"
                          onClick={() => console.log(item)}
                        >
                          {item}{" "}
                        </Button>
                      </React.Fragment>
                    ) : (
                        <Button
                          className="cu-dis-btn"
                          variant="contained"
                          readOnly="readonly"
                          key={index}
                          onClick={() => setSelectedOverview(item)}
                        >
                          {item}
                        </Button>
                      );
                  })}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        {stateLoadingClass !== "" ? (
          <div className="mt-3" style={{ position: "relative" }}>
            <div className={stateLoadingClass}>
              <div className="cliam-ui-table-2">
                <Loading></Loading>
              </div>
            </div>
          </div>
        ) : (
            <div className="progress-box-main">
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Claims Count</p>
                  <h2>{claimsCount}</h2>
                  <ul>
                    <li className="box-arrow-li">
                      <span>12%</span>
                      <img src={arrowUp} alt="Arrow up" />
                    </li>
                    <li className="box-pr-text">High Priority</li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-1">
                  <img className="box-icon-img" src={DashBox1} alt="Icon" />
                </div>
              </div>
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Paid</p>
                  <h2>
                    $
                      {paid.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  </h2>
                  <ul>
                    <li className="box-arrow-down-li ml-1">
                      <Tooltip
                        title={
                          "$" +
                          billed.toLocaleString("en-US", {
                            maximumFractionDigits: 2,
                          })
                        }
                      >
                        <span>20%</span>
                      </Tooltip>

                      {/* <img src={arrowUp} alt="Arrow Down" /> */}
                    </li>
                    <li className="box-pr-text">Billed</li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-2">
                  <img className="box-icon-img" src={DashBox2} alt="Icon" />
                </div>
              </div>
              <div className="dash-box-new">
                <div className="dash-inner-text">
                  <p>Write-offs</p>
                  <h2>
                    $
                      {writeoff.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                  })}
                  </h2>
                  <ul>
                    <li className="box-arrow-li">
                      <span>10%</span>
                      <img src={arrowUp} alt="Arrow up" />
                    </li>
                    <li className="box-pr-text">High Priority</li>
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
                    <li className="box-arrow-li">
                      <span>9%</span>
                      <img src={arrowUp} alt="Arrow up" />
                    </li>
                    <li className="box-pr-text">increase</li>
                  </ul>
                </div>
                <div className="dash-inner-img ic-4">
                  <img className="box-icon-img" src={DashBox4} alt="Icon" />
                </div>
              </div>
            </div>
          )}


        {/* <div className="progress-box-main">
          <div className="dash-box-new">
            <div className="dash-inner-text">
              <p>Revenue</p>
              <h2>
                TBD
                <span>$34</span>

              </h2>
              <ul>
                <li
                  className="box-arrow-li"
                >
                  <span>20%</span>
                  <img
                    src={arrowUp}
                    alt="Arrow"
                  />
                </li>
                <li className="box-pr-text">
                  Increase
                </li>
              </ul>
            </div>
            <div className="dash-inner-img ic-2">
              <img className="box-icon-img" src={DashBox2} alt="Icon" />
            </div>
          </div>
          <div className="dash-box-new">
            <div className="dash-inner-text">
              <p>Revenue</p>
              <h2>
                TBD
                <span>$34</span>

              </h2>
              <ul>
                <li
                  className="box-arrow-li"
                >
                  <span>20%</span>
                  <img
                    src={arrowUp}
                    alt="Arrow"
                  />
                </li>
                <li className="box-pr-text">
                  Increase
                </li>
              </ul>
            </div>
            <div className="dash-inner-img ic-3">
              <img className="box-icon-img" src={DashBox3} alt="Icon" />
            </div>
          </div>
          <div className="dash-box-new">
            <div className="dash-inner-text">
              <p>Revenue</p>
              <h2>
                TBD
                <span>$34</span>

              </h2>
              <ul>
                <li
                  className="box-arrow-li"
                >
                  <span>20%</span>
                  <img
                    src={arrowUp}
                    alt="Arrow"
                  />
                </li>
                <li className="box-pr-text">
                  Increase
                </li>
              </ul>
            </div>
            <div className="dash-inner-img ic-4">
              <img className="box-icon-img" src={DashBox4} alt="Icon" />
            </div>
          </div>
          <div className="dash-box-new">
            <div className="dash-inner-text">
              <p>Revenue</p>
              <h2>
                TBD
                <span>$34</span>

              </h2>
              <ul>
                <li
                  className="box-arrow-li"
                >
                  <span>20%</span>
                  <img
                    src={arrowUp}
                    alt="Arrow"
                  />
                </li>
                <li className="box-pr-text">
                  Increase
                </li>
              </ul>
            </div>
            <div className="dash-inner-img ic-4">
              <img className="box-icon-img" src={DashBox1} alt="Icon" />
            </div>
          </div>
        </div> */}
        {/* end new box */}


        <Box className="line-chart-first mb-5 mt-5">
          <Card className="">
            <CardContent>
              {/* button */}
              <div className="dash-btn-main ml-5">
                <Grid container spacing={3}>
                  <Grid item>
                    <h3 className="mb-3">{yearChartTitle}</h3>
                  </Grid>
                  <Grid item className="text-right">
                    {payers.map((item, index) => {
                      return countButton.includes(item) !== true ? (
                        <React.Fragment key={index}>
                          <Button
                            variant="contained"
                            className="cu-ad-btn"
                            onClick={() => handleCountDisabled(item)}
                          >
                            {item}{" "}
                            <CancelIcon
                              className="cu-cl-icon"
                              onClick={() => handleCountDisabled(item)}
                            />
                          </Button>
                        </React.Fragment>
                      ) : (
                          <Button
                            className="cu-dis-btn mx-2"
                            variant="contained"
                            readOnly="readonly"
                            key={index}
                            onClick={() => handleCountEnabled(item)}
                          >
                            {item}
                          </Button>
                        );
                    })}
                  </Grid>
                </Grid>
                {countAlert === true ? (
                  <Grid container>
                    <Grid item md={12}>
                      <Messages />
                    </Grid>
                  </Grid>
                ) : null}
              </div>
              {/* button */}
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
            </CardContent>
          </Card>
        </Box>
        <br />
        <br />
        <br />
        <Grid container className="mb-5">
          <Grid item x2={12} sm={12} md={12}>
            <Box
              className="line-chart-first mt-5 mb-5 my-5"
              style={{ marginTop: "95px !important" }}
            >
              <Card className="mt-5 mb-5">
                <CardContent>
                  {/* button */}
                  <div className="dash-btn-main ml-5">
                    <Grid container spacing={6}>
                      <Grid item>
                        <h3 className="mb-3">{comparisonChartTitle}</h3>
                      </Grid>
                      <Grid item>
                        {payers.map((item, index) => {
                          return dollarButton.includes(item) !== true ? (
                            <React.Fragment key={index}>
                              <Button
                                variant="contained"
                                className="cu-ad-btn"
                                onClick={() => handleDollarDisabled(item)}
                              >
                                {item}{" "}
                                <CancelIcon
                                  className="cu-cl-icon"
                                  onClick={() => handleDollarDisabled(item)}
                                />
                              </Button>
                            </React.Fragment>
                          ) : (
                              <Button
                                key={index}
                                className="cu-dis-btn mx-2"
                                variant="contained"
                                readOnly="readonly"
                                onClick={() => handleDollarEnabled(item)}
                              >
                                {item}
                              </Button>
                            );
                        })}
                      </Grid>
                    </Grid>
                    {sumAlert === true ? (
                      <Grid container>
                        <Grid item md={12}>
                          <Messages />
                        </Grid>
                      </Grid>
                    ) : null}
                  </div>
                  {/* button */}
                  {monthlyLoadingClass !== "" ? (
                    <div className="mt-1" style={{ position: "relative" }}>
                      <div className={monthlyLoadingClass}>
                        <div className="cliam-ui-table-2">
                          <Loading></Loading>
                        </div>
                      </div>
                    </div>
                  ) : (
                      <HighchartsReact
                        highcharts={Highcharts}
                        options={comparisonChart}
                      />
                    )}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Grid container className="mb-5">
          <Grid item x2={12} sm={12} md={12}>
            <Box
              className="line-chart-first mt-5 mb-5 my-5"
              style={{ marginTop: "95px !important" }}
            >
              <Card className="mt-5 mb-5">
                <CardContent>
                  {/* button */}
                  <div className="dash-btn-main ml-5">
                    <Grid container>
                      <Grid item>
                        <h3 className="mb-3">Dollar amount by payers</h3>
                      </Grid>
                      <Grid item>
                        {payers.map((item, index) => {
                          return paymentsButton.includes(item) !== true ? (
                            <React.Fragment key={index}>
                              <Button
                                variant="contained"
                                className="cu-ad-btn"
                                onClick={() => handlePaymentsDisabled(item)}
                              >
                                {item}{" "}
                                <CancelIcon
                                  className="cu-cl-icon"
                                  onClick={() => handlePaymentsDisabled(item)}
                                />
                              </Button>
                            </React.Fragment>
                          ) : (
                              <React.Fragment key={index}>
                                {/* {console.log("elese is runnidg")} */}
                                <Button
                                  className="cu-dis-btn mx-2"
                                  variant="contained"
                                  readOnly="readonly"
                                  onClick={() => handlePaymentsEnabled(item)}
                                >
                                  {item}
                                </Button>
                              </React.Fragment>
                            );
                        })}
                      </Grid>
                    </Grid>
                  </div>
                  {/* button */}
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
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
        <Box
          className="line-chart-first mb-5"
          style={{ marginTop: "100px !important" }}
        >
          <Paper square>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              onChange={(e, index) => handleActiveTab(index)}
              aria-label="disabled tabs example"
            >
              {tabs.map((tab) => {
                return <Tab label={tab} key={tab} />;
              })}
            </Tabs>
          </Paper>
          <Card className="mb-5">
            <CardContent>
              <Grid container>
                {/* ADMIN CHART */}
                {activeTab === 0 ? (
                  <Grid item xs={12} sm={12} md={12}>
                    {adminLoadingClass !== "" ? (
                      <div className="" style={{ position: "relative" }}>
                        <div className={adminLoadingClass}>
                          <div className="cliam-ui-table-2">
                            <Loading></Loading>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={billedbarChart}
                        />
                      )}
                  </Grid>
                ) : null}

                {/* JCODE CHART  */}

                {activeTab === 1 ? (
                  <Grid item xs={12} sm={12} md={12}>
                    {jcodeLoadingClass !== "" ? (
                      <div className="" style={{ position: "relative" }}>
                        <div className={jcodeLoadingClass}>
                          <div className="cliam-ui-table-2">
                            <Loading></Loading>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={jcodeChart}
                        />
                      )}
                  </Grid>
                ) : null}

                {/* ANCILLARY  CHART */}
                {activeTab === 2 ? (
                  <Grid item xs={12} sm={12} md={12}>
                    {ancillaryLoadingClass !== "" ? (
                      <div className="mt-3" style={{ position: "relative" }}>
                        <div className={ancillaryLoadingClass}>
                          <div className="cliam-ui-table-2">
                            <Loading></Loading>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={ancillaryChart}
                        />
                      )}
                  </Grid>
                ) : null}

                {/* PRE-MED CHART */}

                {activeTab === 3 ? (
                  <Grid item xs={12} sm={12} md={12}>
                    {premedLoadingClass !== "" ? (
                      <div className="mt-3" style={{ position: "relative" }}>
                        <div className={premedLoadingClass}>
                          <div className="cliam-ui-table-2">
                            <Loading></Loading>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={premedChart}
                        />
                      )}
                  </Grid>
                ) : null}
              </Grid>
            </CardContent>
          </Card>
        </Box>
        {/* <Box
          className="line-chart-first"
          style={{ marginTop: "100px !important" }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {adminLoadingClass !== "" ? (
                <div className="mt-3" style={{ position: "relative" }}>
                  <div className={adminLoadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={billedbarChart}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {jcodeLoadingClass !== "" ? (
                <div className="mt-3" style={{ position: "relative" }}>
                  <div className={jcodeLoadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <HighchartsReact highcharts={Highcharts} options={jcodeChart} />
              )}
            </Grid>
          </Grid>
        </Box> */}
        {/* <Box className="line-chart-first my-5">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              {ancillaryLoadingClass !== "" ? (
                <div className="mt-3" style={{ position: "relative" }}>
                  <div className={ancillaryLoadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={ancillaryChart}
                />
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              {premedLoadingClass !== "" ? (
                <div className="mt-3" style={{ position: "relative" }}>
                  <div className={premedLoadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <HighchartsReact
                  highcharts={Highcharts}
                  options={premedChart}
                />
              )}
            </Grid>
          </Grid>
        </Box> */}
        <Box className="line-chart-first mt-5">
          {donutAlert === true ? (
            <Grid container>
              <Grid item md={12}>
                <Messages />
              </Grid>
            </Grid>
          ) : null}
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12}>
              <React.Fragment>
                <Card>
                  <CardContent>
                    <Grid container>
                      <Grid item md={2} className="mt-5">
                        <div className="text-center">
                          {payers.map((item, index) => {
                            return donutButtons.includes(item) !== true ? (
                              <React.Fragment key={index}>
                                <Button
                                  variant="contained"
                                  className="cu-ad-btn mt-3"
                                  onClick={() => handleDonutDisabled(item)}
                                >
                                  {item}{" "}
                                  <CancelIcon
                                    className="cu-cl-icon"
                                    onClick={() => handleDonutDisabled(item)}
                                  />
                                </Button>
                              </React.Fragment>
                            ) : (
                                <React.Fragment key={index}>
                                  {/* {console.log("elese is runnidg")} */}
                                  <Button
                                    className="cu-dis-btn mx-2 mt-3"
                                    variant="contained"
                                    readOnly="readonly"
                                    onClick={() => handleDonutEnabled(item)}
                                  >
                                    {item}
                                  </Button>
                                </React.Fragment>
                              );
                          })}
                        </div>
                      </Grid>
                      <Grid item md={9}>
                        {donutChartLoadingClass !== "" ? (
                          <div
                            className="mt-3"
                            style={{ position: "relative" }}
                          >
                            <div className={donutChartLoadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading></Loading>
                              </div>
                            </div>
                          </div>
                        ) : (
                            <HighchartsReact
                              highcharts={Highcharts}
                              options={cpu}
                            />
                          )}
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </React.Fragment>
            </Grid>
          </Grid>
        </Box>

        <FooterCopyright />
      </div>
    </>
  );
};

export default Dashboard;
