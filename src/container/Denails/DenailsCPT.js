import React, { useEffect, useState } from "react";
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
import PropTypes from "prop-types";
import searchImg from "../../assets/images/search.svg";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import BarChartHor from "./BarChartHor";
import JcodeLineChart from "./JcodeLineChart";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { addDays } from "date-fns";
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import InsertChartOutlinedRoundedIcon from "@material-ui/icons/InsertChartOutlinedRounded";
import DenailCPTReport from "../Report/DailyReport";
import DatePicker from "../../components/common/dateRangePicker";
import claims from "../../actions/claims";
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

const DenailsCPT = () => {
  const [value, setValue] = React.useState(0);
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-03-31");
  const [filterStatus, setFilterStatus] = useState(1);
  const [amountChart, setAmountChart] = useState([]);
  const [countChart, setCountChart] = useState([]);
  const [codes, setCodes] = useState([]);
  const [chartFilter, setChartFilter] = useState(false);
  const [loadingClass, setLoadingClass] = useState("");
  const [noOfRecord, setNoOfRecord] = useState("10");
  const [totalCount, setTotalCount] = useState("0");
  const [start, setStart] = useState("0");
  const [limit, setLimit] = useState("10");
  const [pageRows, setPageRows] = useState(0);
  const [page, setPage] = useState(1);

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setChartFilter(!chartFilter);
  };

  useEffect(() => {
    if (chartFilter === true) {
      setLoadingClass("data-loading");
      claims
        .getRejectedCodes(noOfRecord, start, limit, startDate, endDate)
        .then((response) => {
          setLoadingClass("");
          const { data: result } = response;
          let { data } = result;
          setTotalCount(data.totalCount);
          if (data.totalCount > 0) {
            setPageRows(Math.round(data.totalCount / limit));
          }
          let codes = [];
          let amountChart = [];
          let deniedChart = [];
          if (
            typeof data.output !== "undefined" &&
            data.output !== "" &&
            data.output !== null
          ) {
            console.table(data.output);
            data.output.forEach((item) => {
              const code = item.JCODE;
              // MAKE CODES ARRAY
              codes.push(code);

              // MAKE DENIED ARRAY
              const color = `${code}Color`;
              const colorValue = `hsl(${item.NoOfDenied}, 70%, 50%)`;
              let obj = {};
              obj["country"] = code;
              obj[code] = item.NoOfDenied;
              obj[color] = colorValue;
              deniedChart.push(obj);

              // MAKE AMOUNT ARRAYS
              const amountColor = `${code}Color`;
              const amountColorValue = `hsl(${item.ChargeAmount}, 70%, 50%)`;
              let newobj = {};
              newobj["country"] = code;
              newobj[code] = item.ChargeAmount;
              newobj[amountColor] = amountColorValue;
              amountChart.push(newobj);
            });
          }
          const uniquCodes = [...new Set(codes)];
          setCodes(uniquCodes);
          setAmountChart(amountChart);
          setCountChart(deniedChart);
        })
        .catch((error) => {
          console.log("errror is", error);
          setLoadingClass("");
          console.log("error messge is", error);
        });
    }
  }, [chartFilter]);

  const handleDateFilter = (date) => {
    const startobj = new Date(date.startDate);
    let startDate = startobj.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const endobj = new Date(date.endDate);
    let endDate = endobj.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    setState([date]);
    setStartDate(startDate);
    setEndDate(endDate);
    setFilterStatus(2);
  };

  const handleClear = () => {
    setStartDate("2021-01-01");
    setEndDate("2021-03-31");
  };
  console.log("chart filter is", countChart);
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
                <Grid item xs={12} md={8}>
                  <DatePicker
                    startDate={startDate}
                    endDate={endDate}
                    setState={setState}
                    state={state}
                    handleDateFilter={handleDateFilter}
                    handleClear={handleClear}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div className="pre-adj-tabs-all mt-0 mb-0">
                    <ul>
                      <li>
                        <NavLink to="/denials">
                          {/* <img src={TabclaimiconGr} alt="icon" /> */}
                          <label>Overview</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/denails-cpt" className="pre-active">
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

        <Tabs
          className="new-chart-tabs ch-vw-tbs pull-right"
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab
            label="Table"
            className="mr-2"
            icon={<TableChartOutlinedIcon className="mb-0 mr-2" />}
            {...a11yProps(0)}
          />
          <Tab
            label="Chart"
            icon={<InsertChartOutlinedRoundedIcon className="mb-0 mr-2" />}
            {...a11yProps(1)}
          />
        </Tabs>
        <TabPanel className="p-0" value={value} index={0}>
          <Box className="mt-4">
            {/* <TreeTable /> */}
            <DenailCPTReport
              filterStartDate={startDate}
              filterEndDate={endDate}
              filerStatus={filterStatus}
            />
          </Box>
        </TabPanel>
        <TabPanel className="p-0" value={value} index={1}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
            className="mt-3"
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
                <Grid item sm={6}>
                  <Box className="line-chart-outer-crd pb-4">
                    <div className="dash-btn-main">
                      <div className="chart-title-main">
                        <Grid container>
                          <Grid item sm={12}>
                            <h3 className="chart-title">
                              Danied CPT Codes - $ Amount
                            </h3>
                          </Grid>
                        </Grid>
                      </div>
                    </div>

                    <Grid container>
                      <Grid item md={12} className="mt-2">
                        <BarChartHor codes={codes} dataValues={amountChart} />
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
                            <h3 className="chart-title">
                              Denied CPT Codes - Count
                            </h3>
                          </Grid>
                        </Grid>
                      </div>
                    </div>

                    <Grid container>
                      <Grid item md={12} className="mt-2">
                        <BarChartHor codes={codes} dataValues={countChart} />
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </TabPanel>

        <FooterCopyright />
      </div>
    </>
  );
};

export default DenailsCPT;
