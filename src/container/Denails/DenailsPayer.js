import React, { useState, useEffect } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Tabs,
  Tab,
  Paper,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TableHead,
  IconButton,
  Collapse,
} from "@material-ui/core";
import PropTypes from "prop-types";
import searchImg from "../../assets/images/search.svg";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import JcodeLineChart from "./JcodeLineChart";
import BarChart from "./BarChart";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import LoadingImg from "./../../asstes/images/data-table-loading.gif";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";
import InsertChartOutlinedRoundedIcon from "@material-ui/icons/InsertChartOutlinedRounded";
import danialService from "../../actions/danialService";
import Loading from "../../components/common/ExpandableTable/Loading";
import claims from "../../actions/claims";
import PayerReasonCodeTable from "./PayerReasonCodeTable";
import PaginationNew from "../Claim835/PaginationNew";
import { addDays } from "date-fns";
import DatePicker from "../../components/common/dateRangePicker";

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

const DenailsPayer = () => {
  const [startDate, setStartDate] = useState("2021-03-02");
  const [endDate, setEndDate] = useState("2021-04-02");
  const [loadingClass, setLoadingClass] = useState("");
  const [nestedLoadingClass, setNestedLoadingClass] = useState("");
  const [step, setStep] = useState(0);
  const [value, setValue] = React.useState(0);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  // PAGINATION VARIABLES
  const [payertotalCount, setPayerTotalCount] = useState("0");
  const [payerStart, setPayerStart] = useState("0");
  const [payerLimit, setPayerLimit] = useState(10);
  const [payerNoOfRecord, setPayerNoOfRecord] = useState("10");
  const [payerPageRows, setPayerPageRows] = useState(0);
  const [payerPage, setPayerPage] = useState(1);

  // PAYERS LIST
  const [payersList, setPayersList] = useState([]);
  const [selectedPayer, setSelectedPayer] = useState([]);

  // CPT CODES LIST
  const [codesList, setCodesList] = useState([]);
  const [selectedCode, setSelectedCode] = useState("");
  const [codeStartDate, setCodeStartDate] = useState("2021-03-02");
  const [codeEndDate, setCodeEndDate] = useState("2021-04-02");

  // CPT PAYERS REASON CODE LIST
  const [reasonCodeList, setReasonCodeList] = useState([]);
  const [selectedReasonCode, setSelectedReasonCode] = useState("");
  const [reasonCodeStartDate, setReasonCodeStartDate] = useState("2021-03-02");
  const [reasonCodeEndDate, setReasonCodeEndDate] = useState("2021-04-02");

  // CPT PAYER REASONS LIST
  const [claimList, setClaimList] = useState([]);
  const [claimStartDate, setClaimStartDate] = useState("2021-03-02");
  const [claimEndDate, setClaimEndDate] = useState("2021-04-02");

  useEffect(() => {
    setLoadingClass("data-loading");
    danialService
      .getDenialsPayers(startDate, endDate)
      .then((response) => {
        setLoadingClass("");
        const { data: result } = response;
        if (typeof result.data !== "undefined" && result.data !== "") {
          setPayersList(result.data);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("Line Chart error is", error);
      });
  }, [startDate, endDate]);
  useEffect(() => {
    if (selectedPayer !== "") {
      setStep(1);
      setNestedLoadingClass("data-loading");
      danialService
        .getDenialsPayersCPTCode(codeStartDate, codeEndDate, selectedPayer)
        .then((response) => {
          setNestedLoadingClass("");
          const { data: result } = response;
          if (typeof result.data !== "undefined" && result.data !== "") {
            setCodesList(result.data);
          }
        })
        .catch((error) => {
          setNestedLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }
  }, [codeStartDate, codeEndDate, selectedPayer]);
  useEffect(() => {
    if (selectedCode !== "") {
      setStep(2);
      setNestedLoadingClass("data-loading");
      danialService
        .getDenialsPayersCPTCodeReasonCode(
          reasonCodeStartDate,
          reasonCodeEndDate,
          selectedPayer,
          selectedCode
        )
        .then((response) => {
          setNestedLoadingClass("");
          const { data: result } = response;
          if (typeof result.data !== "undefined" && result.data !== "") {
            setReasonCodeList(result.data);
          }
        })
        .catch((error) => {
          setNestedLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }
  }, [reasonCodeStartDate, reasonCodeEndDate, selectedCode]);
  useEffect(() => {
    if (selectedCode !== "") {
      setStep(3);
      setNestedLoadingClass("data-loading");
      claims
        .getJCodeRejectedDetailByJCodeDenialReasonCodePayer(
          selectedCode,
          selectedReasonCode,
          selectedPayer,
          claimStartDate,
          claimEndDate,
          payerStart,
          payerLimit
        )
        .then((response) => {
          setNestedLoadingClass("");
          const { data: result } = response;
          const { data } = result;
          setPayerTotalCount(data.totalCount);
          if (data.totalCount > 0) {
            setPayerPageRows(Math.round(data.totalCount / payerLimit));
          }
          if (
            typeof data.output !== "undefined" &&
            data.output !== "" &&
            data.output !== null
          ) {
            setClaimList(data.output);
          }
        })
        .catch((error) => {
          setNestedLoadingClass("");
          console.log("Line Chart error is", error);
        });
    }
  }, [claimStartDate, claimEndDate, selectedReasonCode]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handlePayerSelection = (e) => {
    setCodesList([]);
    setSelectedCode("");
    setSelectedPayer("");
    setStep(0);
    setReasonCodeList([]);
    setClaimList([]);
    setSelectedPayer(e);
  };
  const handleCodeSelection = (e) => {
    setSelectedReasonCode("");
    setSelectedCode("");
    setReasonCodeList([]);
    setClaimList([]);
    setSelectedCode(e);
  };
  const hanndleReasonCodeSelection = (e) => {
    setPayerPage(1);
    setPayerNoOfRecord(10);
    setPayerTotalCount(0);
    setPayerStart(0);
    setPayerLimit(10);
    setPayerPageRows(0);
    setClaimList([]);
    setSelectedReasonCode(e);
  };
  const handlePayerPageChange = (event, page) => {
    let offSet = (page - 1) * payerNoOfRecord;
    setPayerPage(page);
    setPayerStart(offSet);
  };
  const handlePayerRowPerPage = (val) => {
    setPayerLimit(val);
  };

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
    if (step === 0) {
      setStartDate(startDate);
      setEndDate(endDate);
    } else if (step === 1) {
      setCodeStartDate(startDate);
      setCodeEndDate(endDate);
    } else if (step === 2) {
      setReasonCodeStartDate(startDate);
      setReasonCodeEndDate(endDate);
    } else {
      claimStartDate(startDate);
      claimEndDate(endDate);
    }
  };

  const handleClear = () => {
    const start = "2021-03-02";
    const end = "2021-04-02";
    setStartDate(start);
    setEndDate(end);
    setCodeStartDate(start);
    setCodeEndDate(end);
    setReasonCodeStartDate(start);
    setReasonCodeEndDate(end);
    setClaimStartDate(start);
    setClaimEndDate(end);
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
                  <div className="pre-adj-tabs-all mb-0">
                    <ul>
                      <li>
                        <NavLink to="/denials">
                          {/* <img src={TabclaimiconGr} alt="icon" /> */}
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
                        <NavLink to="/denails-payer" className="pre-active">
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

        <Box>
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
        </Box>

        <TabPanel className="p-0 mt-3" value={value} index={0}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
            className="mt-4"
          >
            <Grid item sm={12}>
              <TableContainer
                component={Paper}
                className="detail-table-service-line-new denail-view-tb-row tb-scroll"
              >
                <Table aria-label="collapsible table">
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <span className="mr-5"></span> Payer Name
                      </TableCell>
                      <TableCell>Denied</TableCell>
                      <TableCell>Charge Amount</TableCell>
                    </TableRow>
                  </TableHead>
                  {loadingClass !== "" ? (
                    <TableBody>
                      <TableRow>
                        <TableCell colSpan={10} className="text-center">
                          <div style={{ position: "relative" }}>
                            <div className={loadingClass}>
                              <div className="cliam-ui-table-2">
                                <Loading compHeight="200"></Loading>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  ) : (
                    <TableBody>
                      {payersList.map((item) => {
                        return (
                          <React.Fragment>
                            <TableRow>
                              <TableCell>
                                <span className="mr-3">
                                  <IconButton
                                    className="tree-tb-ic-btn"
                                    aria-label="expand row"
                                    size="small"
                                  >
                                    {item.PayerName === selectedPayer ? (
                                      <ExpandLessIcon
                                        className="dr-gr-svg"
                                        onClick={() => handlePayerSelection("")}
                                      />
                                    ) : (
                                      <ExpandMoreIcon
                                        onClick={() =>
                                          handlePayerSelection(item.PayerName)
                                        }
                                      />
                                    )}
                                  </IconButton>
                                </span>
                                {item.PayerName}
                              </TableCell>
                              <TableCell>{item.NoOfDenied}</TableCell>
                              <TableCell>{item.ChargeAmount}</TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell
                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                colSpan={12}
                              >
                                <Collapse
                                  in={
                                    item.PayerName === selectedPayer
                                      ? true
                                      : false
                                  }
                                  timeout="auto"
                                  unmountOnExit
                                >
                                  <Box
                                    className="claim-detail-inner-tbl-tree pl-tb-denail-d"
                                    margin={1}
                                  >
                                    <span className="doted-line-tb-inner-denail">
                                      <span className="tb-line-dot"></span>
                                    </span>
                                    <Table size="small" aria-label="purchases">
                                      <TableHead>
                                        <TableRow>
                                          <TableCell>
                                            <span className="mr-5"></span>
                                            CPT CODE
                                          </TableCell>
                                          <TableCell>Denied</TableCell>
                                          <TableCell>Charge Amount</TableCell>
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {nestedLoadingClass !== "" &&
                                        step == 1 ? (
                                          <TableRow>
                                            <TableCell
                                              colSpan={8}
                                              className="text-center"
                                            >
                                              <div className="cliam-ui-table-2">
                                                <img src={LoadingImg} />
                                              </div>
                                            </TableCell>
                                          </TableRow>
                                        ) : null}
                                        {codesList.map((codeItem) => {
                                          return (
                                            <React.Fragment>
                                              <TableRow>
                                                <TableCell>
                                                  <span className="mr-3">
                                                    <IconButton
                                                      className="tree-tb-ic-btn"
                                                      aria-label="expand row"
                                                      size="small"
                                                    >
                                                      {codeItem.CPTCODE ===
                                                      selectedCode ? (
                                                        <ExpandLessIcon
                                                          className="dr-gr-svg"
                                                          onClick={() =>
                                                            handleCodeSelection(
                                                              ""
                                                            )
                                                          }
                                                        />
                                                      ) : (
                                                        <ExpandMoreIcon
                                                          onClick={() =>
                                                            handleCodeSelection(
                                                              codeItem.CPTCODE
                                                            )
                                                          }
                                                        />
                                                      )}
                                                    </IconButton>
                                                  </span>
                                                  {codeItem.CPTCODE}
                                                  {typeof codeItem.DESC !==
                                                  "object"
                                                    ? ` - ${codeItem.DESC}`
                                                    : ""}
                                                </TableCell>
                                                <TableCell>
                                                  {codeItem.NoOfDenied}
                                                </TableCell>
                                                <TableCell>
                                                  {codeItem.ChargeAmount}
                                                </TableCell>
                                              </TableRow>
                                              <TableRow>
                                                <TableCell
                                                  style={{
                                                    paddingBottom: 0,
                                                    paddingTop: 0,
                                                  }}
                                                  colSpan={12}
                                                >
                                                  <Collapse
                                                    in={
                                                      codeItem.CPTCODE ===
                                                      selectedCode
                                                        ? true
                                                        : false
                                                    }
                                                    timeout="auto"
                                                    unmountOnExit
                                                  >
                                                    <Box
                                                      className="claim-detail-inner-tbl-tree pl-tb-denail-d"
                                                      margin={1}
                                                    >
                                                      <span className="doted-line-tb-inner-denail">
                                                        <span className="tb-line-dot"></span>
                                                      </span>
                                                      <Table
                                                        size="small"
                                                        aria-label="purchases"
                                                      >
                                                        <TableHead>
                                                          <TableRow>
                                                            <TableCell>
                                                              <span className="mr-5"></span>
                                                              Reason Code
                                                            </TableCell>
                                                            <TableCell>
                                                              Denied
                                                            </TableCell>
                                                            <TableCell>
                                                              Charge Amount
                                                            </TableCell>
                                                          </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                          {nestedLoadingClass !==
                                                            "" && step == 2 ? (
                                                            <TableRow>
                                                              <TableCell
                                                                colSpan={8}
                                                                className="text-center"
                                                              >
                                                                <div className="cliam-ui-table-2">
                                                                  <img
                                                                    src={
                                                                      LoadingImg
                                                                    }
                                                                  />
                                                                </div>
                                                              </TableCell>
                                                            </TableRow>
                                                          ) : null}
                                                          {reasonCodeList.map(
                                                            (reasonItem) => {
                                                              return (
                                                                <React.Fragment>
                                                                  <TableRow>
                                                                    <TableCell>
                                                                      <span className="mr-3">
                                                                        <IconButton
                                                                          className="tree-tb-ic-btn"
                                                                          aria-label="expand row"
                                                                          size="small"
                                                                        >
                                                                          {reasonItem.ReasonCode ===
                                                                          selectedReasonCode ? (
                                                                            <ExpandLessIcon
                                                                              className="dr-gr-svg"
                                                                              onClick={() =>
                                                                                hanndleReasonCodeSelection(
                                                                                  ""
                                                                                )
                                                                              }
                                                                            />
                                                                          ) : (
                                                                            <ExpandMoreIcon
                                                                              onClick={() =>
                                                                                hanndleReasonCodeSelection(
                                                                                  reasonItem.ReasonCode
                                                                                )
                                                                              }
                                                                            />
                                                                          )}
                                                                        </IconButton>
                                                                      </span>
                                                                      {
                                                                        reasonItem.ReasonCode
                                                                      }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                      {
                                                                        reasonItem.NoOfDenied
                                                                      }
                                                                    </TableCell>
                                                                    <TableCell>
                                                                      {
                                                                        reasonItem.ChargeAmount
                                                                      }
                                                                    </TableCell>
                                                                  </TableRow>
                                                                  <TableRow>
                                                                    <TableCell
                                                                      style={{
                                                                        paddingBottom: 0,
                                                                        paddingTop: 0,
                                                                      }}
                                                                      colSpan={
                                                                        12
                                                                      }
                                                                    >
                                                                      <Collapse
                                                                        in={
                                                                          reasonItem.ReasonCode ===
                                                                          selectedReasonCode
                                                                            ? true
                                                                            : false
                                                                        }
                                                                        timeout="auto"
                                                                        unmountOnExit
                                                                      >
                                                                        <Box
                                                                          className="claim-detail-inner-tbl-tree pl-tb-denail-d"
                                                                          margin={
                                                                            1
                                                                          }
                                                                        >
                                                                          <span className="doted-line-tb-inner-denail">
                                                                            <span className="tb-line-dot"></span>
                                                                          </span>
                                                                          <PayerReasonCodeTable
                                                                            data={
                                                                              claimList
                                                                            }
                                                                            loadingClass={
                                                                              nestedLoadingClass
                                                                            }
                                                                          />
                                                                          {payertotalCount >
                                                                          0 ? (
                                                                            <div className="mb-3">
                                                                              <PaginationNew
                                                                                count={
                                                                                  payerPageRows
                                                                                }
                                                                                page={
                                                                                  payerPage
                                                                                }
                                                                                handlePageChange={
                                                                                  handlePayerPageChange
                                                                                }
                                                                                countPerPage={
                                                                                  payerLimit
                                                                                }
                                                                                totalCount={
                                                                                  payerLimit
                                                                                }
                                                                                totalRecords={
                                                                                  payertotalCount
                                                                                }
                                                                                handleRowPerPage={
                                                                                  handlePayerRowPerPage
                                                                                }
                                                                              />
                                                                            </div>
                                                                          ) : null}
                                                                        </Box>
                                                                      </Collapse>
                                                                    </TableCell>
                                                                  </TableRow>
                                                                </React.Fragment>
                                                              );
                                                            }
                                                          )}
                                                        </TableBody>
                                                      </Table>
                                                    </Box>
                                                  </Collapse>
                                                </TableCell>
                                              </TableRow>
                                            </React.Fragment>
                                          );
                                        })}
                                      </TableBody>
                                    </Table>
                                  </Box>
                                </Collapse>
                              </TableCell>
                            </TableRow>
                          </React.Fragment>
                        );
                      })}
                    </TableBody>
                  )}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel className="p-0 mt-3" value={value} index={1}>
          <Grid
            container
            spacing={3}
            direction="row"
            justify="center"
            alignItems="stretch"
            className="mt-4"
          >
            <Grid item sm={6}>
              <Box className="line-chart-outer-crd pb-4">
                <div className="dash-btn-main">
                  <div className="chart-title-main">
                    <Grid container>
                      <Grid item sm={12}>
                        <h3 className="chart-title">TBD</h3>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <Grid container>
                  <Grid item md={12} className="mt-2">
                    <JcodeLineChart />
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
                        <h3 className="chart-title">TBD</h3>
                      </Grid>
                    </Grid>
                  </div>
                </div>

                <Grid container>
                  <Grid item md={12} className="mt-2">
                    <BarChart />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <FooterCopyright />
      </div>
    </>
  );
};

export default DenailsPayer;
