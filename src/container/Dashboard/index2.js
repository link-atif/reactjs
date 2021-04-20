import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import searchImg from "../../assets/images/search.svg";
import arrowUp from "../../assets/images/arrow-up.svg";
import iconBox1 from "../../assets/images/box-icon-1.svg";
import arrowDown from "../../assets/images/arrow-down.svg";
import iconBox2 from "../../assets/images/box-icon-2.svg";
import iconBox3 from "../../assets/images/box-icon-3.svg";
import iconBox4 from "../../assets/images/box-icon-4.svg";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "./../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
require("highcharts/modules/exporting")(Highcharts);
// var HighchartsReact = require("highcharts-react-official");

const ageChart = {
  title: {
    text: "User Age Group (2019-2020)",
  },

  subtitle: {
    text: "",
  },

  xAxis: {
    categories: ["5-11 yo", "12-25 yo", "26-45 yo", "46-65 yo"],
    labels: {
      rotation: 0,
      style: {
        fontSize: "10px",
      },
    },
  },
  yAxis: {
    title: {
      text: "",
    },
  },
  chart: {
    // Edit chart spacing
    spacingBottom: 30,
    spacingTop: 30,
    spacingLeft: 30,
    spacingRight: 30,
    borderRadius: 10,
  },
  plotOptions: {
    column: {
      pointPadding: 0.3,
      borderWidth: 0,
      borderRadius: 5,
    },
  },

  series: [
    {
      type: "column",
      colorByPoint: false,
      data: [1700, 1200, 2300, 1800],
      showInLegend: false,
      color: "#FEAA48",
    },
  ],
};

const barChart1 = {
  chart: {
    type: "column",
    spacingBottom: 30,
    spacingTop: 30,
    spacingLeft: 30,
    spacingRight: 30,
    borderRadius: 10,
  },
  title: {
    text: "Datarover Procedure 2020",
  },

  xAxis: {
    type: "category",
    labels: {
      rotation: 0,
      style: {
        fontSize: "10px",
      },
    },
  },
  yAxis: {
    min: 0,
    title: {
      text: "",
    },
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    pointFormat: "Procedure: <b>{point.y:.1f}K</b>",
  },
  plotOptions: {
    column: {
      pointPadding: 0.3,
      borderWidth: 0,
      borderRadius: 5,
    },
  },
  series: [
    {
      name: "",
      data: [
        ["Q1-17", 7.08],
        ["Q2-17", 10.09],
        ["Q3-17", 12.7],
        ["Q4-17", 13.91],
        ["Q5-18", 12.7],
        ["Q6-18", 13.6],
        ["Q7-18", 13.58],
        ["Q8-18", 14.57],
      ],
      color: "#02F1B8",
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
    },
  ],
};

const Dashboard = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);
  const [pieChartHeading, setPieChartHeading] = useState("");
  const [yearChartTitle, setYearChartTitle] = useState("Year Wise - Count");
  const [comparisonChartTitle, setComparisonChartTitle] = useState(
    "Year Wise - Count"
  );
  const [pieChartData, setPieChartData] = useState([]);
  const [pieChartColors, setPieChartColors] = useState([]);
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
  const yearWiseCategories = [
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
  ];
  const yearWiseDefualtFirstPoints = [
    10,
    8,
    22,
    129.2,
    144.0,
    176.0,
    135.6,
    24,
    20,
    34,
  ];
  const yearWiseDefualtLastPoints = [
    20,
    10,
    19,
    106.0,
    84.5,
    105.0,
    104.3,
    33,
    42,
    18,
  ];

  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    if (permission.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      history.push("/dr-services");
    }
    // PIE CHART DATA CONFIGURATION
    const text = "2019 - 2020";
    setPieChartHeading(text);
    const pieChartData = [
      {
        name: "Women: 44%",
        y: 20,
        z: 20,
      },
      {
        name: "Men: 66%",
        y: 90,
        z: 90,
      },
    ];
    setPieChartData(pieChartData);
    var colors = ["#FEAA48", "#36DEED"];
    setPieChartColors(colors);

    // SET YEAR CHART DATA
    setYearChartCategories(yearWiseCategories);
    setYearChartFirstPoints(yearWiseDefualtFirstPoints);
    setYearChartLastPoints(yearWiseDefualtLastPoints);
    setYearChartTitle("Year Wise - count");

    // SET COMPARISON CHART DATA

    setComparisonChartCategories(yearWiseCategories);
    setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
    setComparisonChartLastPoints(yearWiseDefualtLastPoints);
    setYearChartTitle("Year Wise - count");
  }, []);

  // UPDATE MONTHLY CHARTS DATA ON POINT CLICK
  const updateChart = async () => {
    setMonthlyLoadingClass("data-loading");
    let type = monthAmount === true ? "Amount" : "Count";
    if (monthState == 0) {
      const response = await updateDataMonthWise();
      const { data: result } = response;
      if (result.success) {
        setMonthlyLoadingClass("");
        var yearmonths = [];
        var monthFirstPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.month);
          monthFirstPoints.push(item.count);
        });
        setComparisonChartCategories(yearmonths);
        setComparisonChartFirstPoints(monthFirstPoints);
        setComparisonChartLastPoints(yearWiseDefualtLastPoints);
        setMonthState(1);
        setComparisonChartTitle(`Month Wise - ${type}`);
      } else {
        setMonthlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    } else {
      const response = await updateDataDayWise();
      const { data: result } = response;
      if (result.success) {
        setMonthlyLoadingClass("");
        var yearmonths = [];
        var firstPoints = [];
        var secondPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.day.substr(0, 2));
          firstPoints.push(item.count);
          secondPoints.push(Math.floor(Math.random() * 200) / 2);
        });
        setComparisonChartCategories(yearmonths);
        setComparisonChartFirstPoints(firstPoints);
        setComparisonChartLastPoints(secondPoints);
        setMonthState(2);
        setComparisonChartTitle(`Day Wise - ${type}`);
      } else {
        setMonthlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    }
  };
  const updateDataMonthWise = () => {
    return common
      .getClaimCounts()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };

  const updateDataDayWise = () => {
    return common
      .getMonthlyClaimCounts()
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  };
  const updateYearlyClaimData = async () => {
    setYearlyLoadingClass("data-loading");
    let type = yearAmount === true ? "Amount" : "Count";
    if (yearDataState == 0) {
      const response = await updateDataMonthWise();
      const { data: result } = response;
      if (result.success) {
        setYearlyLoadingClass("");
        var yearmonths = [];
        var monthFirstPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.month);
          monthFirstPoints.push(item.count);
        });
        setYearChartCategories(yearmonths);
        setYearChartFirstPoints(monthFirstPoints);
        setYearChartLastPoints(yearWiseDefualtLastPoints);
        setYearDataState(1);
        setYearChartTitle(`Month Wise - ${type}`);
      } else {
        setYearlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    } else {
      const response = await updateDataDayWise();
      const { data: result } = response;
      if (result.success) {
        setYearlyLoadingClass("");
        var yearmonths = [];
        var firstPoints = [];
        var secondPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.day.substr(0, 2));
          firstPoints.push(item.count);
          secondPoints.push(Math.floor(Math.random() * 200) / 2);
        });
        setYearChartCategories(yearmonths);
        setYearChartFirstPoints(firstPoints);
        setYearChartLastPoints(secondPoints);
        setYearDataState(2);
        setYearChartTitle(`Day Wise - ${type}`);
      } else {
        setYearlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    }
  };
  const handleGenderData = () => {
    setPieChartHeading("Jan - May");
    const genderArray = ["Women", "Men"];
    var pieData = [];
    for (let index = 1; index <= 5; index++) {
      let num = Math.floor(Math.random() * 10) + index;
      let type = genderArray[Math.floor(Math.random() * genderArray.length)];
      pieData.push({
        name: `${type}: ${num}%`,
        y: num,
        z: num,
      });
    }
    setPieChartData(pieData);
    var pieColors = ["#02F1B8", "#FEAA48", "#36DEED", "#02f1b8", "#20c997"];
    setPieChartColors(pieColors);
  };

  // YEARLY CLIAM COUNTS AND AMOUNT FILTER
  const changeYearlyClaimtoAmount = () => {
    setYearDataState(0);
    setYearAmount(true);
    setYearChartFirstPoints(yearWiseCategories);
    setYearChartFirstPoints(yearWiseDefualtFirstPoints);
    setYearChartLastPoints(yearWiseDefualtLastPoints);
    setYearChartTitle("Year Wise - Amount");
  };
  const changeYearlyClaimtoDefault = () => {
    setYearDataState(0);
    setYearAmount(false);
    setYearChartFirstPoints(yearWiseCategories);
    setYearChartFirstPoints(yearWiseDefualtFirstPoints);
    setYearChartLastPoints(yearWiseDefualtLastPoints);
    setYearChartTitle("Year Wise - Count");
  };

  // MONTHLY CLIAM COUNTS AND AMOUNT FILTER
  const changeMonthlyClaimtoAmount = () => {
    setMonthAmount(true);
    setMonthState(0);
    setComparisonChartCategories(yearWiseCategories);
    setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
    setComparisonChartLastPoints(yearWiseDefualtLastPoints);
    setComparisonChartTitle("Year Wise - Amount");
  };
  const changeMonthlyClaimtoDefault = () => {
    setMonthAmount(false);
    setMonthState(0);
    setComparisonChartCategories(yearWiseCategories);
    setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
    setComparisonChartLastPoints(yearWiseDefualtLastPoints);
    setComparisonChartTitle("Year Wise - Count");
  };

  const revertYearCliam = async () => {
    setYearlyLoadingClass("data-loading");
    let type = yearAmount === true ? "Amount" : "Count";
    if (yearDataState == 1) {
      setYearlyLoadingClass("");
      setYearChartCategories(yearWiseCategories);
      setYearChartFirstPoints(yearWiseDefualtFirstPoints);
      setYearChartLastPoints(yearWiseDefualtLastPoints);
      setYearDataState(0);
      setYearChartTitle(`Year Wise - ${type}`);
    } else {
      const response = await updateDataMonthWise();
      const { data: result } = response;
      if (result.success) {
        setYearlyLoadingClass("");
        var yearmonths = [];
        var monthFirstPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.month);
          monthFirstPoints.push(item.count);
        });
        setYearChartCategories(yearmonths);
        setYearChartFirstPoints(monthFirstPoints);
        setYearChartLastPoints(yearWiseDefualtLastPoints);
        setYearDataState(1);
        setYearChartTitle(`Month Wise - ${type}`);
      } else {
        setYearlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    }
  };
  const revertMonthlyClaims = async () => {
    setMonthlyLoadingClass("data-loading");
    let type = monthAmount === true ? "Amount" : "Count";
    if (monthState == 1) {
      setMonthlyLoadingClass("");
      setComparisonChartCategories(yearWiseCategories);
      setComparisonChartFirstPoints(yearWiseDefualtFirstPoints);
      setComparisonChartLastPoints(yearWiseDefualtLastPoints);
      setMonthState(0);
      setComparisonChartTitle(`Year Wise - ${type}`);
    } else {
      const response = await updateDataMonthWise();
      const { data: result } = response;
      if (result.success) {
        setMonthlyLoadingClass("");
        var yearmonths = [];
        var monthFirstPoints = [];
        result.data.forEach((item) => {
          yearmonths.push(item.month);
          monthFirstPoints.push(item.count);
        });
        setComparisonChartCategories(yearmonths);
        setComparisonChartFirstPoints(monthFirstPoints);
        setComparisonChartLastPoints(yearWiseDefualtLastPoints);
        setMonthState(1);
        setComparisonChartTitle(`Month Wise - ${type}`);
      } else {
        setMonthlyLoadingClass("");
        setMessage({
          type: "error",
          message: result.message,
        });
      }
    }
  };
  const chartGender = {
    chart: {
      type: "pie",
      spacingBottom: 30,
      spacingTop: 30,
      spacingLeft: 30,
      spacingRight: 30,
      borderRadius: 10,
    },
    title: {
      text: pieChartHeading,
    },
    tooltip: {
      headerFormat: "",
      pointFormat:
        '<span style="color:{point.color}">\u25CF</span> <b> {point.name}</b><br/>' +
        "Area (square km): <b>{point.y}</b><br/>" +
        "Population density (people per square km): <b>{point.z}</b><br/>",
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (event) {
            handleGenderData();
          },
        },
      },
      pie: {
        shadow: false,
        center: ["50%", "50%"],
      },
    },
    series: [
      {
        minPointSize: 10,
        innerSize: "80%",
        zMin: 0,
        name: "gender",
        data: pieChartData,
        colors: pieChartColors,
      },
    ],
  };
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
      text: yearChartTitle,
      align: "left",
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
      headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
      pointFormat:
        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:$.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      series: {
        cursor: "pointer",
        events: {
          click: function (event) {
            if (yearDataState !== 2) {
              updateYearlyClaimData();
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
        name: "London",
        data: yearChartLastPoins,
        lineColor: "#FEAA48",
        color: "#FEAA48",
      },
    ],
    exporting: {
      buttons: [
        {
          text: "\u0024",
          onclick: function () {
            changeYearlyClaimtoAmount();
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
        {
          text: "\uD83D\uDDA9",
          onclick: function () {
            changeYearlyClaimtoDefault();
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
        yearDataState != 0
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
      text: comparisonChartTitle,
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
        monthAmount == true
          ? '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>'
          : '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
      footerFormat: "</table>",
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      column: {
        pointPadding: 0.3,
        borderWidth: 0,
        borderRadius: 5,
      },
    },
    series: [
      {
        name: "Claims",
        data: comparisonChartFirstPoins,
        color: "#02F1B8",
      },
      {
        name: "New York",
        data: comparisonChartLastPoins,
        color: "#36DEED",
      },
    ],
    plotOptions: {
      series: {
        point: {
          events: {
            click: () => {
              if (monthState !== 2) {
                updateChart();
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
          text: "\u0024",
          onclick: function () {
            changeMonthlyClaimtoAmount();
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
        {
          text: "\uD83D\uDDA9",
          onclick: function () {
            changeMonthlyClaimtoDefault();
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
        monthState != 0
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
        <div className="page-heading">
          <h2 className="page-heading">Overview</h2>
        </div>
        <div className="progress-box-main">
          <div className="progress-box">
            <p>Product Sold</p>
            <h2>75</h2>
            <ul>
              <li className="box-arrow-li">
                <span>12%</span>
                <img src={arrowUp} alt="Arrow up" />
              </li>
              <li className="box-pr-text">High Priority</li>
            </ul>
            <img className="box-icon-img" src={iconBox1} alt="Icon" />
          </div>
          <div className="progress-box">
            <p>Total Profit</p>
            <h2>$1000</h2>
            <ul>
              <li className="box-arrow-down-li">
                <span>13%</span>
                <img src={arrowDown} alt="Arrow up" />
              </li>
              <li className="box-pr-text">Waiting</li>
            </ul>
            <img className="box-icon-img" src={iconBox2} alt="Icon" />
          </div>
          <div className="progress-box">
            <p>Total No. of Claims</p>
            <h2>2000</h2>
            <ul>
              <li className="box-arrow-li">
                <span>10%</span>
                <img src={arrowUp} alt="Arrow up" />
              </li>
              <li className="box-pr-text">Monthly Average</li>
            </ul>
            <img className="box-icon-img" src={iconBox3} alt="Icon" />
          </div>
          <div className="progress-box">
            <p>New Customers</p>
            <h2>220</h2>
            <ul>
              <li className="box-arrow-li">
                <span>9%</span>
                <img src={arrowUp} alt="Arrow up" />
              </li>
              <li className="box-pr-text">Increase</li>
            </ul>
            <img className="box-icon-img" src={iconBox4} alt="Icon" />
          </div>
        </div>

        <Box className="line-chart-first">
          {yearlyLoadingClass != "" ? (
            <div className="mt-3" style={{ position: "relative" }}>
              <div className={yearlyLoadingClass}>
                <div className="cliam-ui-table-2">
                  <Loading></Loading>
                </div>
              </div>
            </div>
          ) : (
            <React.Fragment>
              {/* <Grid container>
                <Grid item={12}>
                  <AttachMoneyIcon></AttachMoneyIcon>
                </Grid>
                <Grid item={12}> */}
              <HighchartsReact
                highcharts={Highcharts}
                options={claimYearChart}
              />
              {/* </Grid>
              </Grid> */}
            </React.Fragment>
          )}
        </Box>

        <Box className="line-chart-first">
          {monthlyLoadingClass != "" ? (
            <div className="mt-3" style={{ position: "relative" }}>
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
        </Box>

        <Box className="line-chart-first">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <HighchartsReact highcharts={Highcharts} options={ageChart} />
            </Grid>
            <Grid item xs={12} sm={3}>
              <HighchartsReact highcharts={Highcharts} options={chartGender} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <HighchartsReact highcharts={Highcharts} options={barChart1} />
            </Grid>
          </Grid>
        </Box>

        <Box className="line-chart-first">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={7}>
              <HighchartsReact highcharts={Highcharts} options={ageChart} />
            </Grid>

            <Grid item xs={12} sm={5}>
              <HighchartsReact highcharts={Highcharts} options={barChart1} />
            </Grid>
          </Grid>
        </Box>

        <FooterCopyright />
      </div>
    </>
  );
};

export default Dashboard;
