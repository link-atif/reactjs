import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
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
  Typography,
} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import searchImg from "../../assets/images/search.svg";
import arrowUp from "../../assets/images/new-design/dash-arrow-up.svg";
import arrowDown from "../../assets/images/new-design/dash-arrow-down.svg";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ChartBack from "../../assets/images/new-design/Back.svg";
import DashBox1 from "../../assets/images/new-design/box-1.svg";
import DashBox2 from "../../assets/images/new-design/box-2.svg";
import DashBox3 from "../../assets/images/new-design/box-3.svg";
import DashBox4 from "../../assets/images/new-design/box-4.svg";
import RefreshIcon from "../../assets/images/new-design/refresh.svg";
import backIcon from "../../assets/images/new-design/left-arrow.svg";
import CancelIcon from "@material-ui/icons/Cancel";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import ClockIcon from "../../assets/images/new-design/clock-g.svg";
import imgOne from "../../assets/images/new-design/sub-1.svg";
import imgOnegr from "../../assets/images/new-design/sub-1gr.svg";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highmaps";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "./../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";
require("highcharts/modules/exporting")(Highcharts);
require("highcharts/modules/variwide")(Highcharts);
require("highcharts/modules/heatmap")(Highcharts);
require("highcharts/modules/treemap")(Highcharts);

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

const HeatMapDashboard = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);
  // DENIED CODES
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-03-31");
  const [codeLoadingClass, setCodeLoadingClass] = useState("");
  const [codeNames, setCodeNames] = useState([]);
  const [codeAmount, setCodeAmount] = useState([]);
  const getPointCategoryName = (point, dimension) => {
    var series = point.series,
      isY = dimension === "y",
      axis = series[isY ? "yAxis" : "xAxis"];
    return axis.categories[point[isY ? "y" : "x"]];
  };
  const heatchart = {
    series: [
      {
        type: "treemap",
        layoutAlgorithm: "stripes",
        alternateStartingDirection: true,
        levels: [
          {
            level: 1,
            layoutAlgorithm: "sliceAndDice",
            dataLabels: {
              enabled: true,
              align: "left",
              verticalAlign: "top",
              style: {
                fontSize: "15px",
                fontWeight: "bold",
              },
            },
          },
        ],
        data: [
          {
            id: "A",
            name: "blogspot.com",
            color: "#ff9797",
          },
          {
            id: "B",
            name: "ns1.dundermifflin.com",
            color: "#4adab4",
          },
          {
            id: "O",
            name: "ntdata.otz",
            color: "#9e7df9",
          },
          {
            id: "Kiwi",
            name: "Archive-art.com",
            color: "#e16973",
          },
          {
            id: "Google",
            name: "google.com",
            color: "#f0b7bc",
          },
          {
            name: "156",
            parent: "A",
            value: 5,
          },
          {
            name: "136",
            parent: "A",
            value: 3,


          },
          {
            name: "125",
            parent: "A",
            value: 4,
            color: "#9e7df9",
          },
          {
            name: "635",
            parent: "B",
            value: 4,
            color: "#dacefd"
          },
          {
            name: "618",
            parent: "B",
            value: 10,
            color: "#1dd1a1",
          },
          {
            name: "119",
            parent: "O",
            value: 1,
          },
          {
            name: "118",
            parent: "O",
            value: 3,
          },
          {
            name: "120",
            parent: "O",
            value: 3,
          },
          {
            name: "90",
            parent: "Kiwi",
            value: 2,
          },
          {
            name: "30",
            parent: "Google",
            value: 2,
          },
        ],
        dataLabels: {
          enabled: true,
          formatter: function () {
            var key = this.key,
              point = this.point,
              value = point.value;

            return value && key;
          },
        },
      },
    ],
    title: {
      text: "Blocked Domain",
    },
  };
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    if (permission.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      history.push("/dr-services");
    }
    // GET CODES DATA
    setTimeout(() => {
      setCodeLoadingClass("data-loading");
      claims
        .getRejectedCodes(10, 0, 10, startDate, endDate)
        .then(({ data: response }) => {
          setCodeLoadingClass("");
          const { data } = response;
          if (
            typeof data.output !== "undefined" &&
            data.output !== "" &&
            data.output !== null
          ) {
            let codenames = [];
            let codeAmounts = [];
            data.output.forEach((item) => {
              codenames.push(item.JCODE);
              codeAmounts.push(Math.round(item.ChargeAmount));
            });
            setCodeNames(codenames);
            setCodeAmount(codeAmounts);
          }
        })
        .catch((error) => {
          setCodeLoadingClass("");
          console.log("error is ", error);
        });
    }, [1000]);
  }, []);

  // GET CODES DETAIL
  const getCodeDetails = (code) => {
    setCodeLoadingClass("data-loading");
    claims
      .getJCodeRejectedDetailByJCode(code, startDate, endDate)
      .then(({ data: response }) => {
        setCodeLoadingClass("");
        const resdata = response.data;
        if (
          typeof resdata !== "undefined" &&
          resdata !== "" &&
          resdata !== null
        ) {
          let codenames = [];
          let codeAmounts = [];
          resdata.forEach((item) => {
            codenames.push(item.PayerName);
            codeAmounts.push(Math.round(item.ChargeAmount));
          });
          setCodeNames(codenames);
          setCodeAmount(codeAmounts);
        }
      })
      .catch((error) => {
        setCodeLoadingClass("");
        console.log("error is ", error);
      });
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
  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <React.Fragment>
            <Grid container spacing={2}>
              <Grid item md={12} className="mt-2">
                {codeLoadingClass !== "" ? (
                  <div className="mt-3" style={{ position: "relative" }}>
                    <div className={codeLoadingClass}>
                      <div className="cliam-ui-table-2">
                        <Loading></Loading>
                      </div>
                    </div>
                  </div>
                ) : (
                    <HighchartsReact
                      highcharts={Highcharts}
                      options={heatchart}
                    />
                  )}
              </Grid>
            </Grid>
          </React.Fragment>
        </Grid>
      </Grid>
    </>
  );
};

export default HeatMapDashboard;
