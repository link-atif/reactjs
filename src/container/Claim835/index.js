import React, { useEffect, useContext } from "react";
import "./Styles.scss";
import AddIcon from "@material-ui/icons/Add";
import SearchForm from "./SeachForm";
import PaginationNew from "./PaginationNew";

import { TextField, Box, Grid } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";
import { CSVLink } from "react-csv";

import CloseIcon from "@material-ui/icons/Close";

import { DateRangePicker } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import searchImg from "../../assets/images/search.svg";

import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";

import { SearchOutlined } from "@ant-design/icons";

import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ListIcon from "../../assets/images/new-design/claims-icon/list-icon.svg";
import CustomerIcon from "../../assets/images/new-design/claims-icon/customer-icon.svg";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import CalendarIcon from "../../assets/images/new-design/claims-icon/calendar-icon.svg";
import FilterIcon from "../../assets/images/new-design/claims-icon/filter-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";
import RefreshIcon from "@material-ui/icons/Refresh";
import RemoveIcon from "@material-ui/icons/Remove";

import imgone from "../../assets/images/new-design/claims-icon/1.svg";
import imgtwo from "../../assets/images/new-design/claims-icon/2.svg";
import imgthree from "../../assets/images/new-design/claims-icon/3.svg";
import imgfour from "../../assets/images/new-design/claims-icon/4.svg";

import ClockIcon from "../../assets/images/new-design/clock-g.svg";
import ClockIconGr from "../../assets/images/new-design/clock-gr.svg";

import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import MenuItem from "@material-ui/core/MenuItem";
import CodesDropDown from "./CodesDropDown";

import LabelFilter from "./LabelFilter";
import SearchBox from "../../components/common/SearchBox";
import FilterIconGr from "../../assets/images/new-design/claims-icon/filter-icon-gr.svg";

import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Tooltip,
  Button,
  Typography,
  Collapse,
  Breadcrumbs,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

// import ClaimTableNew from "./ClaimTableNew";
import ClaimTable from "./ClaimDetailTable";
import { common } from "../../actions";
import claims from "../../actions/claims";
import { RootContext } from "../../context/RootContext";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Messages from "./../../components/Messages";
import CircelProgress from "./CircelProgress";
import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";

const { Search } = Input;

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
  checkbx: {
    color: "#0000001A",
  },
  checktitle: {
    color: "#0C1015",
    fontSize: "14px",
    fontWeight: "700",
  },
  checklab: {
    marginBottom: "0px",
  },
  statusClass: {
    width: "195px",
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const Claim = () => {
  const { setMessage, subscriptionID, userPreferences } = useContext(
    RootContext
  );
  const [claimFilterBar, setClaimFilterBar] = useState("");
  const [preferenceFilterBar, setPreferenceFilterBar] = useState("");
  const [startDate, setStartDate] = useState("0001-01-01");
  const [endDate, setEndDate] = useState("0001-01-01");
  const [page, setPage] = useState(1);
  const [offSet, setOffSet] = useState(0);
  const [totalCount, setTotalCount] = useState(10);
  const [countPerPage, setCountPerPage] = useState(
    (userPreferences.NoOfRecordInTable &&
      userPreferences.NoOfRecordInTable !== "undefined" &&
      userPreferences.NoOfRecordInTable !== "null") ? parseInt(userPreferences.NoOfRecordInTable) : 10
  );
  const [pageRows, setPageRows] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loadingClass, setLoadingClass] = useState("");
  const [data, setData] = useState([]);
  const [pickerClass, setPickerClass] = useState(false);
  const [csvData, setCsvData] = useState([]);
  const [open, setOpen] = useState(false);
  const [applyFilters, setApplyFilters] = useState(false);

  // CODES PAYMENTS
  const [codesPayments, setCodesPayments] = useState([]);
  const [adminPercentage, setAdminPercentage] = useState(0);
  const [jcodePercentage, setJcodePercentage] = useState(0);
  const [ancillaryPercentage, setAncillaryPercentage] = useState(0);
  const [premedPercentage, setPremedPercentage] = useState(0);

  // PAYERS
  const [totalPayers, SetTotalPayers] = useState([]);
  const [selectedPayers, SetSelectedPayers] = useState([]);
  const [payerOpen, setPayerOpen] = useState(false);
  // Admin Codes
  const [adminCodes, SetAdminCodes] = useState([]);
  const [selectedAdminCodes, SetSelectedAdminCodes] = useState([]);
  const [adminCodeOpen, setAdminCodeOpen] = useState(false);
  // JCODES
  const [jcodeCodes, SetJcodeCodes] = useState([]);
  const [selectedJCodes, SetSelectedJCodes] = useState([]);
  const [jCodeOpen, setJCodeOpen] = useState(false);
  // ANCILLARY CODES
  const [ancillaryCodes, SetAncillaryCodes] = useState([]);
  const [selectedAncillaryCode, setSelectedAncillaryCode] = useState([]);
  const [ancillaryCodeOpen, setAncillaryCodeOpen] = useState(false);
  // PREMED CODES
  const [premedCodes, SetPremedCodes] = useState([]);
  const [selectedPremedCode, setSelectedPremedCode] = useState([]);
  const [premedCodeOpen, setPremedCodeOpen] = useState(false);

  // SORTING ORDER VARIABLES
  const [order, setOrder] = useState("asc");
  const [noOrder, setNoOrder] = useState("asc");
  const [totalAmountOrder, setTotalAmountOrder] = useState("asc");
  const [paymentOrder, setPaymentOrder] = useState("asc");
  const [differenceOrder, setDifferenceOrder] = useState("asc");
  const [patientOrder, setPatientOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("PayerClaimControlNo");

  // CLAIM STATUS
  const [claimStatusName, setClaimStatusName] = useState("All");
  const [statusOpen, setStatusOpen] = useState(false);
  const [claimStatus, setClaimStatus] = useState([
    "All",
    "Fully Paid",
    "Partially Paid",
    "Denied",
  ]);
  const statusButtons = ["All", "Paid", "Partial", "Denied"];

  // FILTERS
  const [filter, setFilter] = useState("");

  const [msgAlert, setMsgAlert] = useState(false);
  const headers = [
    { label: "CLAIM NO", key: "claimno" },
    { label: "TOTAL AMOUNT", key: "totalamount" },
    { label: "Payment Amount", key: "paymentamount" },
    { label: "PATIENT RESP", key: "patientresp" },
    { label: "DIFFERENCE(%)", key: "difference" },
  ];
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
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

  const calculatePercentage = (firstNumber, lastNumber) => {
    let res = (firstNumber / lastNumber) * 100;
    return res;
  };
  const handleClear = () => {
    setStartDate("0001-01-01");
    setEndDate("0001-01-01");
    setFilter("");
  };
  const classes = useStyles();

  const handleFilterBar = () => {
    if (claimFilterBar === "open") {
      setClaimFilterBar("");
    } else {
      setClaimFilterBar("open");
    }
  };
  const closeFilterBar = () => {
    if (claimFilterBar === "open") {
      setClaimFilterBar("");
    }
  };

  const handlePreferenceFilterBar = () => {
    if (preferenceFilterBar === "open") {
      setPreferenceFilterBar("");
    } else {
      setPreferenceFilterBar("open");
    }
  };
  useEffect(() => {
    setMsgAlert(false);
    getPayments();
    getClaimCptCodes();
  }, [
    startDate,
    offSet,
    countPerPage,
    page,
    totalCount,
    endDate,
    selectedPayers,
    selectedAdminCodes,
    selectedJCodes,
    selectedAncillaryCode,
    selectedPremedCode,
    applyFilters,
    order,
    orderBy,
    claimStatusName,
    filter,
  ]);

  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    setTimeout(() => {
      // GET PAYERS LIST DATA
      claims
        .getServicePayers()
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
            SetTotalPayers(payerlist);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }, 2000);
    setTimeout(() => {
      // GET ADMIN CPT CODES
      claims
        .getCptAdminCode()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            SetAdminCodes(resdata);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
      // GET JCODE CPT CODES
      claims
        .getCptJcode()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            SetJcodeCodes(resdata);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
      // GET ANCILLARY CODES
      claims
        .getAncillaryCode()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            SetAncillaryCodes(resdata);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
      // GET PREMED CODES
      claims
        .getPremedCode()
        .then(({ data: response }) => {
          const resdata = response.data;
          if (
            typeof resdata !== "undefined" &&
            resdata !== "" &&
            resdata !== null
          ) {
            SetPremedCodes(resdata);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }, 4000);
  }, []);
  const handleDateFilter = (date) => {
    setPickerClass(true);
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
  };

  const handlePageChange = (page) => {
    let offSet = (page - 1) * countPerPage;
    setPage(page);
    setOffSet(offSet);
  };
  const handleRowPerPage = (val) => {
    setTotalCount(val);
    setCountPerPage(val);
  };
  const getPayments = () => {
    if (selectedPayers.length > 0) {
      var index;
      var payersbtns = "";
      payersbtns = selectedPayers;
    } else {
      payersbtns = totalPayers;
    }
    let btnsString = payersbtns.toString();
    const selectedCodes = [
      ...selectedAdminCodes,
      ...selectedJCodes,
      ...selectedAncillaryCode,
      ...selectedPremedCode,
    ];
    const uniquecodes = [...new Set(selectedCodes)];
    let codesString = uniquecodes.toString();
    let statusString = "";
    if (claimStatusName == "All") {
      statusString = statusButtons.toString();
    } else {
      const index = claimStatus.indexOf(claimStatusName);
      const selStatus = statusButtons[index];
      statusString = selStatus;
    }
    setLoadingClass("data-loading");
    common
      .getClaimsPayments(
        startDate,
        endDate,
        offSet,
        countPerPage,
        subscriptionID,
        btnsString,
        codesString,
        statusString,
        order,
        orderBy,
        filter
      )
      .then((response) => {
        setLoadingClass("");
        const { data: result } = response;
        if (result.data !== "") {
          var data = [];
          setTotalRecords(result.data.count);
          if (result.data.count > 0) {
            setPageRows(Math.round(result.data.count / countPerPage));
          }
          setData(result.data.claimPayments);
          if (
            typeof result.data.claimPayments !== "undefined" &&
            result.data.claimPayments !== null
          ) {
            let csvdata = [];
            result.data.claimPayments.forEach((item) => {
              csvdata.push({
                claimno: item.payerClaimControlNo,
                totalamount: item.chargeAmount,
                paymentamount: item.paymentAmount,
                patientresp: item.patientRespAmount,
                difference: item.diff,
              });
            });
            setCsvData(csvdata);
          }
          setApplyFilters(false);
        } else if (result.data.length === 0) {
          setLoadingClass("");
          setData(result.data);
        }
      })
      .catch((error) => {
        console.log("errror is", error);
        setLoadingClass("");
        let msg =
          typeof error.response !== "undefined" && error.response !== null
            ? error.response.data.message
            : "";
        setMessage({
          type: "error",
          message: msg,
        });
      });
  };
  const getClaimCptCodes = () => {
    if (selectedPayers.length > 0) {
      var index;
      var payersbtns = "";
      payersbtns = selectedPayers;
    } else {
      payersbtns = totalPayers;
    }
    let btnsString = payersbtns.toString();
    let statusString = "";
    if (claimStatusName == "All") {
      statusString = statusButtons.toString();
    } else {
      const index = claimStatus.indexOf(claimStatusName);
      const selStatus = statusButtons[index];
      statusString = selStatus;
    }
    claims
      .getClaimsCPTCodes(startDate, endDate, btnsString, statusString)
      .then((response) => {
        const { data: result } = response;
        let resdata = result.data;
        if (resdata !== "") {
          setCodesPayments(resdata);
          //ADMIN CODE PERCENTAGE
          setAdminPercentage(
            calculatePercentage(resdata[0].PaidAmount, resdata[0].BilledAmount)
          );

          // JCODE PERCENTAGE
          setJcodePercentage(
            calculatePercentage(resdata[1].PaidAmount, resdata[1].BilledAmount)
          );
          // ANCILLARY PERCENTAGE
          setAncillaryPercentage(
            calculatePercentage(resdata[2].PaidAmount, resdata[2].BilledAmount)
          );
          //PREMEDS PERCENTAGE
          setPremedPercentage(
            calculatePercentage(resdata[3].PaidAmount, resdata[3].BilledAmount)
          );
        }
      })
      .catch((error) => {
        console.log("errror is", error);
        let msg =
          typeof error.response !== "undefined" && error.response !== null
            ? error.response.data.message
            : "";
        setMessage({
          type: "error",
          message: msg,
        });
      });
  };
  const handleDelete = (id) => {
    // console.log("dlete eid is ", id);
    // return false;
    common
      .deleteClaim(id)
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setMessage({
            type: "success",
            message: data.message,
          });
          getPayments();
        } else {
          setMessage({
            type: "error",
            message: data.message,
          });
        }
      })
      .catch((error) => {
        setMessage({
          type: "error",
          message: error.response.data.message,
        });
      });
  };
  const refreshClaims = () => {
    setStartDate("0001-01-01");
    setEndDate("0001-01-01");
    setPage(1);
    setOffSet(0);
    setTotalCount(10);
    setCountPerPage(10);
    setTotalRecords(0);
    SetSelectedJCodes([]);
    SetSelectedAdminCodes([]);
    setSelectedAncillaryCode([]);
    setSelectedPremedCode([]);
    setOrder("asc");
    setTotalAmountOrder("asc");
    setPaymentOrder("asc");
    setPatientOrder("asc");
    setDifferenceOrder("asc");
    setOrderBy("PayerClaimControlNo");
    setClaimFilterBar("");
    setClaimStatusName("All");
    setFilter("");
  };
  const csvReport = {
    data: csvData,
    headers: headers,
    filename: "claims.csv",
  };
  const handlePayerSelection = (e) => {
    const payerbtns = [...selectedPayers];
    let index = payerbtns.filter((item) => item === e);
    if (index.length === 0) {
      payerbtns.push(e);
    } else {
      payerbtns.pop(e);
    }
    SetSelectedPayers(payerbtns);
  };
  const handleAdminCodeSelection = (e) => {
    const codes = [...selectedAdminCodes];
    let index = codes.filter((item) => item === e);
    if (index.length === 0) {
      codes.push(e);
    } else {
      codes.pop(e);
    }
    SetSelectedAdminCodes(codes);
  };
  const handleJCodeSelection = (e) => {
    const codes = [...selectedJCodes];
    let index = codes.filter((item) => item === e);
    if (index.length === 0) {
      codes.push(e);
    } else {
      codes.pop(e);
    }
    SetSelectedJCodes(codes);
  };
  const handleAncillarySelection = (e) => {
    const codes = [...selectedAncillaryCode];
    let index = codes.filter((item) => item === e);
    if (index.length === 0) {
      codes.push(e);
    } else {
      codes.pop(e);
    }
    setSelectedAncillaryCode(codes);
  };
  const handlePremedSelection = (e) => {
    const codes = [...selectedPremedCode];
    let index = codes.filter((item) => item === e);
    if (index.length === 0) {
      codes.push(e);
    } else {
      codes.pop(e);
    }
    setSelectedPremedCode(codes);
  };
  const handleApplyFilters = () => {
    setApplyFilters(true);
    setClaimFilterBar("");
  };
  const handleNumberOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("PayerClaimControlNo");
    setNoOrder(e);
  };
  const handleAmountOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("ChargeAmount");
    setTotalAmountOrder(e);
  };
  const handlePaymentOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("PaymentAmount");
    setPaymentOrder(e);
  };
  const handleDifferencOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("Difference");
    setDifferenceOrder(e);
  };
  const handlePatientOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("PatientRespAmount");
    setPatientOrder(e);
  };
  const resetOrder = () => {
    setNoOrder("asc");
    setTotalAmountOrder("asc");
    setPaymentOrder("asc");
    setDifferenceOrder("asc");
    setPatientOrder("asc");
  };

  const handleSearchEvent = (e) => {
    if (e.key === "Enter") {
      setFilter(e.currentTarget.value);
    }
  };

  const isFilterSelected = (claimStatusName !== "" && claimStatusName !== "All") || selectedPayers.length > 0 || selectedAdminCodes.length > 0 || selectedAncillaryCode.length > 0 || selectedJCodes.length > 0 || selectedPremedCode.length > 0;

  return (
    <>
      <Box className="main-cotent" onClick={closeFilterBar}>
        <header className="dashboard-header header-new">
          <div className="header-search-main">
            <SearchBox />
            <UserDropdown />
          </div>
        </header>
        <div className="dashboard-main dashboard-content">
          <div className="">
            <h2 className="page-heading">Claims Payments</h2>

            <BootstrapTooltip title="FILTER">
              <div className="filter-hamburger pull-right" onClick={handleFilterBar} >
                <img src={FilterIcon} alt="icon" />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="PRINT">
              <div className="filter-hamburger pull-right mr-3">
                <img src={PrintIcon} alt="icon" />
              </div>
            </BootstrapTooltip>
            <CSVLink {...csvReport}>
              <BootstrapTooltip title="EXPORT">
                <div className="filter-hamburger pull-right mr-3">
                  <img src={ExportIcon} alt="icon" />
                </div>
              </BootstrapTooltip>
            </CSVLink>
            <BootstrapTooltip title="REFRESH">
              <div className="filter-hamburger pull-right mr-3">
                <RefreshIcon onClick={() => refreshClaims()} />
              </div>
            </BootstrapTooltip>
            <div className={"filter-sidebar " + preferenceFilterBar}>
              <h3>Preferences </h3>
              <div className="actions">
                <AddIcon />
                <CloseIcon onClick={() => handlePreferenceFilterBar()} />
              </div>
              <div className="filtr-side-main">
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel className={classes.checktitle}>
                    Page Number:
                </FormLabel>
                  <TextField
                    id="outlined-basic"
                    // label="Outlined"
                    variant="outlined"
                    size="small"
                    value={page}
                  />
                </FormControl>
              </div>
            </div>

            <div className="item pull-right">
              <div
                className="date-manager"
                onClick={() => setPickerClass(!pickerClass)}
              >
                <div className="progress-month">
                  {startDate !== "0001-01-01" || endDate !== "0001-01-01"
                    ? `${new Date(startDate).toLocaleDateString(
                      "en-US"
                    )} - ${new Date(endDate).toLocaleDateString("en-US")}`
                    : "This Month"}
                  <img src={CalendarIcon} className="ml-1" alt="icon" />
                  <div
                    className="date-picker"
                    style={{ display: pickerClass == true ? "block" : "none" }}
                  >
                    <span className="pull-right">
                      <CloseIcon onClick={() => setPickerClass(!pickerClass)} />
                    </span>
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <DateRangePicker
                        onChange={(item) => handleDateFilter(item.selection)}
                        moveRangeOnFirstSelection={false}
                        // months={2}
                        color="#3d91ff"
                        ranges={state}
                      // dateDisplayFormat="MM/dd/yyyy"
                      // direction="horizontal"
                      />
                    </div>
                    <div className="rdrDefinedRangesWrapper">
                      <Button
                        variant="contained"
                        className="cu-ad-btn"
                        fullWidth={true}
                        onClick={() => setPickerClass(false)}
                      >
                        Apply
                    </Button>
                      <Button
                        variant="contained"
                        className="cu-dis-btn"
                        fullWidth={true}
                        onClick={() => handleClear()}
                      >
                        Clear
                    </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {msgAlert === true ? <Messages /> : null}

          {/* Breadcrumbs */}
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/claim">
                Claims Payments
            </Link>
              <Typography className="" color="textPrimary">
                835
            </Typography>
            </Breadcrumbs>
          </Box>
          {/*End Breadcrumbs */}

          <div className="pre-adj-tabs-all mt-0">
            <Grid container>
              <Grid item sm={9}>
                <ul>
                  <li>
                    <NavLink
                      activeClassName={
                        claimStatusName == "All" ? "pre-active" : ""
                      }
                      onClick={() => setClaimStatusName("All")}
                      to="#"
                    >
                      {/* <AccessTimeIcon /> */}
                      <img src={ClockIcon} alt="icon" />
                      <label> All</label>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      activeClassName={
                        claimStatusName == "Fully Paid" ? "pre-active" : ""
                      }
                      onClick={() => setClaimStatusName("Fully Paid")}
                      to="#"
                    >
                      {/* <AccessTimeIcon /> */}
                      <img src={ClockIconGr} alt="icon" />
                      <label> Paid</label>
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      activeClassName={
                        claimStatusName == "Denied" ? "pre-active" : ""
                      }
                      onClick={() => setClaimStatusName("Denied")}
                      to="#"
                    >
                      <img src={ClockIconGr} alt="icon" />
                      <label>Denied</label>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      activeClassName={
                        claimStatusName == "Partially Paid" ? "pre-active" : ""
                      }
                      onClick={() => setClaimStatusName("Partially Paid")}
                      to="#"
                    >
                      <img src={ClockIconGr} alt="icon" />
                      <label>Partially Paid</label>
                    </NavLink>
                  </li>
                </ul>
              </Grid>
              <Grid item sm={3}>
                <div className="text-right">
                  <div className="tb-search-outr">
                    <Input
                      type="search"
                      className="tb-search-st"
                      placeholder="Search"
                      allowClear={filter !== "" ? true : false}
                      defaultValue={filter}
                      onSearch={(e) => setFilter(e)}
                      onChange={(e) =>
                        e.currentTarget.value === ""
                          ? setFilter(e.currentTarget.value)
                          : ""
                      }
                      onKeyPress={(e) => handleSearchEvent(e)}
                      prefix={<img src={searchImg} alt="Search" />}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="progress-box-main mt-4">
            <div className="progress-box cliam-box">
              <div className="claim-box-inner">
                <span className="box-cod-c1">
                  <CircelProgress percentage={adminPercentage} />
                </span>
              </div>
              <div className="claim-box-inner pl-2">
                <h2 className="mb-0 box-title-835">Admin</h2>
                <p className="box-text-835">
                  <span>Paid:</span>$
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[0].PaidAmount)
                    : "0"}
                </p>
                <p className="box-text-835">
                  <span>Denied:</span>$
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[0].BilledAmount)
                    : "0"}
                </p>
              </div>
            </div>

            <div className="progress-box cliam-box">
              <div className="claim-box-inner">
                <span className="box-cod-c2">
                  <CircelProgress percentage={jcodePercentage} />
                </span>
              </div>
              <div className="claim-box-inner pl-2">
                <h2 className="mb-0 box-title-835">Jcode</h2>
                <p className="box-text-835">
                  <span>Paid:</span>$
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[1].PaidAmount)
                    : "0"}
                </p>
                <p className="box-text-835">
                  <span>Denied:</span> $
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[1].BilledAmount)
                    : "0"}
                </p>
              </div>
            </div>

            <div className="progress-box cliam-box">
              <div className="claim-box-inner">
                <span className="box-cod-c3">
                  <CircelProgress percentage={ancillaryPercentage} />
                </span>
              </div>
              <div className="claim-box-inner pl-2">
                <h2 className="mb-0 box-title-835">Ancillary</h2>
                <p className="box-text-835">
                  <span>Paid:</span>$
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[2].PaidAmount)
                    : "0"}
                </p>
                <p className="box-text-835">
                  <span>Denied:</span> $
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[2].BilledAmount)
                    : "0"}
                </p>
              </div>
            </div>

            <div className="progress-box cliam-box">
              <div className="claim-box-inner">
                <span className="box-cod-c4">
                  <CircelProgress percentage={premedPercentage} />
                </span>
              </div>
              <div className="claim-box-inner pl-2">
                <h2 className="mb-0 box-title-835">Pre-Meds</h2>
                <p className="box-text-835">
                  <span>Paid:</span>$
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[3].PaidAmount)
                    : "0"}
                </p>
                <p className="box-text-835">
                  <span>Denied:</span> $
                {typeof codesPayments !== "undefined" &&
                    codesPayments.length > 0
                    ? numberFormat(codesPayments[3].BilledAmount)
                    : "0"}
                </p>
              </div>
            </div>
          </div>

          {/* <SearchForm /> */}

          {
            isFilterSelected && (
              <LabelFilter
                claimStatusName={claimStatusName}
                selectedPayers={selectedPayers}
                selectedAdminCodes={selectedAdminCodes}
                selectedAncillaryCode={selectedAncillaryCode}
                selectedJCodes={selectedJCodes}
                selectedPremedCode={selectedPremedCode}
                handlePayerSelection={handlePayerSelection}
                handleAdminCodeSelection={handleAdminCodeSelection}
                handleAncillarySelection={handleAncillarySelection}
                handleJCodeSelection={handleJCodeSelection}
                handlePremedSelection={handlePremedSelection}
                setClaimStatusName={setClaimStatusName}
                handleFilterBar={handleFilterBar}
              />
            )
          }

          <div className="table-fluid claim-new-ui-main mt-2">
            <ClaimTable
              servicePayments={data}
              handleDelete={handleDelete}
              dataloadingClass={loadingClass}
              noOrder={noOrder}
              handleNumOrder={(e) => handleNumberOrder(e)}
              totalAmountOrder={totalAmountOrder}
              handleAmountOrder={(e) => handleAmountOrder(e)}
              paymentOrder={paymentOrder}
              handlePaymentOrder={(e) => handlePaymentOrder(e)}
              differenceOrder={differenceOrder}
              handleDifferenceOrder={(e) => handleDifferencOrder(e)}
              patientOrder={patientOrder}
              handlePatientOrder={(e) => handlePatientOrder(e)}
            ></ClaimTable>
          </div>

          {totalRecords > 0 ? (
            <PaginationNew
              count={pageRows}
              page={page}
              handlePageChange={(e) => handlePageChange(e)}
              countPerPage={countPerPage}
              totalCount={totalCount}
              totalRecords={totalRecords}
              handleRowPerPage={handleRowPerPage}
            />
          ) : null}

          <FooterCopyright />
        </div>
      </Box>

      {/*filter side bar */}

      <div className={"filter-sidebar " + claimFilterBar}>
        <h3>
          {" "}
          <img src={FilterIconGr} alt="icon" /> Filters
              </h3>
        <div className="actions">
          {/* <AddIcon /> */}
          <CloseIcon onClick={handleFilterBar} />
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {statusOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setStatusOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setStatusOpen(false)}
                  />
                )}
                  Claim Status
                </FormLabel>
            <Collapse in={statusOpen}>
              <RadioGroup
                aria-label="status"
                name="status"
                value={claimStatusName}
                onChange={(e) => setClaimStatusName(e.target.value)}
              >
                {claimStatus.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio className="text-success" />}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
              {/* <FormGroup>
                    {claimStatus.map((item, index) => {
                      return (
                        <FormControlLabel
                          key={item}
                          className={classes.checklab}
                          control={
                            <Checkbox
                              className={classes.checkbx}
                              name={item}
                              checked={claimStatusName.includes(item)}
                              onChange={() => handleStatusSelection(index)}
                            />
                          }
                          label={item}
                        />
                      );
                    })}
                  </FormGroup> */}
            </Collapse>
          </FormControl>
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {payerOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setPayerOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setPayerOpen(false)}
                  />
                )}
                  Payers
                </FormLabel>
            <Collapse in={payerOpen}>
              <FormGroup>
                <FormControlLabel
                  className={classes.checklab}
                  control={
                    <Checkbox
                      className={classes.checkbx}
                      name="gilad"
                      checked={selectedPayers.length === 0 ? true : false}
                    />
                  }
                  onChange={() => SetSelectedPayers([])}
                  label="All"
                />
                {totalPayers.map((item) => {
                  return (
                    <FormControlLabel
                      key={item}
                      className={classes.checklab}
                      control={
                        <Checkbox
                          className={classes.checkbx}
                          name={item}
                          checked={selectedPayers.includes(item)}
                          onChange={() => handlePayerSelection(item)}
                        />
                      }
                      label={item}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {adminCodeOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setAdminCodeOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setAdminCodeOpen(false)}
                  />
                )}
                  Admin Codes
                </FormLabel>
            <Collapse in={adminCodeOpen}>
              <FormGroup>
                <FormControlLabel
                  className={classes.checklab}
                  control={
                    <Checkbox
                      className={classes.checkbx}
                      name="gilad"
                      checked={
                        selectedAdminCodes.length === 0 ? true : false
                      }
                    />
                  }
                  onChange={() => SetSelectedAdminCodes([])}
                  label="All"
                />
                {adminCodes.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.cAdminCodeId}
                      className={classes.checklab}
                      control={
                        <Checkbox
                          className={classes.checkbx}
                          name={item.cptCode}
                          checked={selectedAdminCodes.includes(
                            item.cptCode
                          )}
                          onChange={() =>
                            handleAdminCodeSelection(item.cptCode)
                          }
                        />
                      }
                      label={item.cptCode}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {ancillaryCodeOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setAncillaryCodeOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setAncillaryCodeOpen(false)}
                  />
                )}
                  Ancillary Codes
                </FormLabel>
            <Collapse in={ancillaryCodeOpen}>
              <FormGroup>
                <FormControlLabel
                  className={classes.checklab}
                  control={
                    <Checkbox
                      className={classes.checkbx}
                      name="gilad"
                      checked={
                        selectedAncillaryCode.length === 0 ? true : false
                      }
                    />
                  }
                  onChange={() => setSelectedAncillaryCode([])}
                  label="All"
                />
                {ancillaryCodes.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.jCodeId}
                      className={classes.checklab}
                      control={
                        <Checkbox
                          className={classes.checkbx}
                          name={item.code}
                          checked={selectedAncillaryCode.includes(
                            item.code
                          )}
                          onChange={() =>
                            handleAncillarySelection(item.code)
                          }
                        />
                      }
                      label={`${item.code} - ${item.drugName}`}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {jCodeOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setJCodeOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setJCodeOpen(false)}
                  />
                )}
                  Jcode Codes
                </FormLabel>
            <Collapse in={jCodeOpen}>
              <FormGroup>
                <FormControlLabel
                  className={classes.checklab}
                  control={
                    <Checkbox
                      className={classes.checkbx}
                      name="gilad"
                      checked={selectedJCodes.length === 0 ? true : false}
                    />
                  }
                  onChange={() => SetSelectedJCodes([])}
                  label="All"
                />
                {jcodeCodes.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.code}
                      className={classes.checklab}
                      control={
                        <Checkbox
                          className={classes.checkbx}
                          name={item.drugName}
                          checked={selectedJCodes.includes(item.code)}
                          onChange={() => handleJCodeSelection(item.code)}
                        />
                      }
                      label={`${item.code} - ${item.drugName}`}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="filtr-side-main">
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel className={classes.checktitle}>
              {premedCodeOpen === false ? (
                <AddIcon
                  className="text-success mr-1"
                  role="button"
                  onClick={() => setPremedCodeOpen(true)}
                />
              ) : (
                  <RemoveIcon
                    className="text-success mr-1"
                    role="button"
                    onClick={() => setPremedCodeOpen(false)}
                  />
                )}
                  Premed Codes
                </FormLabel>
            <Collapse in={premedCodeOpen}>
              <FormGroup>
                <FormControlLabel
                  className={classes.checklab}
                  control={
                    <Checkbox
                      className={classes.checkbx}
                      name="gilad"
                      checked={selectedJCodes.length === 0 ? true : false}
                    />
                  }
                  onChange={() => setSelectedPremedCode([])}
                  label="All"
                />
                {premedCodes.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.code}
                      className={classes.checklab}
                      control={
                        <Checkbox
                          className={classes.checkbx}
                          name={item.drugName}
                          checked={selectedPremedCode.includes(item.code)}
                          onChange={() => handlePremedSelection(item.code)}
                        />
                      }
                      label={`${item.code} - ${item.drugName}`}
                    />
                  );
                })}
              </FormGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="mt-5">
          <Button
            variant="contained"
            className="dr-grey-btn"
            fullWidth={true}
            onClick={() => refreshClaims()}
          >
            Clear
              </Button>
          <Button
            fullWidth={true}
            variant="contained"
            className="dr-success-btn mt-2"
            onClick={() => handleApplyFilters()}
          >
            Apply
              </Button>
        </div>
      </div>

      {/* End filter side bar */}

    </>
  );
};
export default Claim;
