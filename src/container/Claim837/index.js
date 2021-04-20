import React, { useContext, useEffect, useState } from "react";
import {
  TextField,
  Box,
  Grid,
  Collapse,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@material-ui/core";
import { NavLink, useParams, useHistory } from "react-router-dom";
import { addDays } from "date-fns";
import "./styles.scss";
import QueueDetail from "./QueueDetail";
import Pagination from "@material-ui/lab/Pagination";
import LabelFilter from "./labelFilter";

import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

import AccessTimeIcon from "@material-ui/icons/AccessTime";
import RemoveIcon from "@material-ui/icons/Remove";

import searchImg from "../../assets/images/search.svg";
import FooterCopyright from "../FooterCopyright";
import { DateRangePicker } from "react-date-range";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Typography, Button, FormControl, FormLabel } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";

import PaginationNew from "./PaginationNew";

import UserDropdown from "../UserDropdown";
import { RootContext } from "./../../context/RootContext/index";
import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ListIcon from "../../assets/images/new-design/claims-icon/list-icon.svg";
import CustomerIcon from "../../assets/images/new-design/claims-icon/customer-icon.svg";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import CalendarIcon from "../../assets/images/new-design/claims-icon/calendar-icon.svg";
import FilterIcon from "../../assets/images/new-design/claims-icon/filter-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";
import RefreshIcon from "@material-ui/icons/Refresh";
import ClockIcon from "../../assets/images/new-design/clock-g.svg";
import ClockIconGr from "../../assets/images/new-design/clock-gr.svg";
import CircelProgress from "./claimcards/CircelProgress";
import Tooltip from "@material-ui/core/Tooltip";
import claims from "../../actions/claims";
import common from "../../actions/common";
import ReactExport from "react-data-export";
import ClaimCards from "./claimcards/claimcards";

import { Input } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import SearchBox from "../../components/common/SearchBox";

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

const PreAdjudication = (props) => {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
  const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
  const dataSet1 = [
    {
      name: "Johson",
      amount: 30000,
      sex: "M",
      is_married: true,
    },
    {
      name: "Monika",
      amount: 355000,
      sex: "F",
      is_married: false,
    },
    {
      name: "John",
      amount: 250000,
      sex: "M",
      is_married: false,
    },
    {
      name: "Josef",
      amount: 450500,
      sex: "M",
      is_married: true,
    },
  ];
  const { setMessage, userPreferences } = useContext(RootContext);
  const [claimFilterBar, setClaimFilterBar] = useState("");
  const [preferenceFilterBar, setPreferenceFilterBar] = useState("");
  const [startDate, setStartDate] = useState("0001-01-01");
  const [endDate, setEndDate] = useState("0001-01-01");
  const [data, setData] = useState([]);
  const [pickerClass, setPickerClass] = useState(false);
  const [loadingClass, setLoadingClass] = useState("");
  const [page, setPage] = useState(1);
  const [offSet, setOffSet] = useState(0);
  const [totalCount, setTotalCount] = useState(20);
  const [countPerPage, setCountPerPage] = useState(
    userPreferences.NoOfRecordInTable &&
      userPreferences.NoOfRecordInTable !== "undefined" &&
      userPreferences.NoOfRecordInTable !== "null"
      ? parseInt(userPreferences.NoOfRecordInTable)
      : 10
  );

  const history = useHistory();
  // const [countPerPage, setCountPerPage] = useState(20);
  const [pageRows, setPageRows] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [payerList, setPayerList] = useState([]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);
  const [statusOpen, setStatusOpen] = useState(false);
  const [payerOpen, setPayerOpen] = useState(false);
  // SORTING ORDER VARIABLES
  const [memberId, setMemberId] = useState("desc");
  const [patientId, setPatientId] = useState("asc");
  const [billingNpi, setBillingNpi] = useState("asc");
  const [attendingNpi, setAttendingNpi] = useState("asc");
  const [dosOrder, setDosOrder] = useState("asc");
  const [claimTotal, setClaimTotal] = useState("asc");
  const [PayerCcn, setPayerCcn] = useState("asc");
  const [icnOrder, setIcnOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("MemberId");
  const [order, setOrder] = useState("DESC");

  // FILTERS
  const [filter, setFilter] = useState("");
  const [selectedPayer, setSelectedPayer] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [applyFilter, setApplyFilter] = useState(false);

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
  };

  useEffect(() => {
    setLoadingClass("data-loading");
    common
      .getClaimRequest(
        offSet,
        countPerPage,
        startDate,
        endDate,
        orderBy,
        order,
        filter,
        selectedPayer,
        selectedStatus,
        1
      )
      .then(({ data: response }) => {
        const resdata = response.data;
        if (
          typeof resdata !== "undefined" &&
          resdata !== "" &&
          resdata !== null
        ) {
          setTotalRecords(resdata.count);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
    common
      .getClaimRequest(
        offSet,
        countPerPage,
        startDate,
        endDate,
        orderBy,
        order,
        filter,
        selectedPayer,
        selectedStatus,
        0
      )
      .then(({ data: response }) => {
        setLoadingClass("");
        const resdata = response.data;
        if (typeof resdata !== "undefined") {
          if (totalRecords > 0) {
            setPageRows(Math.round(totalRecords / countPerPage));
          }
          setData(resdata.output);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });
  }, [
    startDate,
    offSet,
    countPerPage,
    page,
    totalCount,
    endDate,
    orderBy,
    order,
    filter,
    selectedPayer,
    selectedStatus,
    applyFilter,
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
            setPayerList(payerlist);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }, 2000);
  }, []);
  const handlePageChange = (page) => {
    let offSet = (page - 1) * countPerPage;
    setPage(page);
    setOffSet(offSet);
  };
  const handleRowPerPage = (val) => {
    setTotalCount(val);
    setCountPerPage(val);
  };
  const handleClear = () => {
    setStartDate("0001-01-01");
    setEndDate("0001-01-01");
    setFilter("");
    setApplyFilter(false);
    setClaimFilterBar(false);
    setSelectedPayer("");
    setSelectedStatus("");
  };
  const handleMemberId = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("MemberId");
    setMemberId(e);
  };
  const handlePatientId = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("PatientControlNo");
    setPatientId(e);
  };
  const handleBillingNpi = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("BilingProviderId");
    setBillingNpi(e);
  };
  const handleAttendingNpi = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("AttendingProviderId");
    setAttendingNpi(e);
  };
  const handleClaimTotal = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("ClaimAmount");
    setClaimTotal(e);
  };
  const handleDosOrder = (e) => {
    resetOrder();
    setOrder(e);
    setOrderBy("From");
    setDosOrder(e);
  };
  const handlePayerCcn = (e) => {
    resetOrder();
    setPayerCcn(e);
  };
  const handleIcnOrder = (e) => {
    resetOrder();
    setIcnOrder(e);
  };
  const resetOrder = () => {
    setMemberId("asc");
    setPatientId("asc");
    setBillingNpi("asc");
    setAttendingNpi("asc");
    setClaimTotal("asc");
    setDosOrder("asc");
    setPayerCcn("asc");
    setIcnOrder("asc");
  };

  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const reload = () => {
    history.replace(`/reload`);
    setTimeout(() => {
      history.replace("/workers");
    })
  }

  const handleSearchEvent = (e) => {
    if (e.key === "Enter") {
      setFilter(e.currentTarget.value);
    }
  };

  const isFilterSelected =
    (selectedStatus !== "" && selectedStatus !== "All") ||
    (selectedPayer !== "" && selectedPayer !== "All");

  return (
    <>
      <Box onClick={closeFilterBar}>
        <header className="dashboard-header header-new">
          <div className="header-search-main">
            <SearchBox />
            <UserDropdown />
          </div>
        </header>
        <Box className="dashboard-main">
          <Box>
            <h2 className="page-heading">Claims Manager</h2>

            <BootstrapTooltip title="FILTER">
              <div className="filter-hamburger pull-right">
                <img src={FilterIcon} onClick={handleFilterBar} alt="icon" />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="PRINT">
              <div className="filter-hamburger pull-right mr-3">
                <img src={PrintIcon} alt="icon" />
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="EXPORT">
              <div className="filter-hamburger pull-right mr-3">
                <ExcelFile
                  element={<img src={ExportIcon} alt="icon" />}
                  filename="Claims Requests"
                >
                  <ExcelSheet data={data} name="Claims">
                    <ExcelColumn label="Member Id" value="MemberId" />
                    <ExcelColumn
                      label="Patient ControlNo "
                      value="PatientControlNo"
                    />
                    <ExcelColumn label="Billing NPI" value="BilingProviderId" />
                    <ExcelColumn label="DOS" value="From" />
                    <ExcelColumn label="Claim Total" value="ClaimAmount" />
                    <ExcelColumn
                      label="Payment Status"
                      value={(col) =>
                        typeof col.ClaimAcknowledgementId !== "object" &&
                        col.ClaimPaymentStatus !== "Partial"
                          ? "Paid"
                          : "Partial"
                      }
                    />
                    <ExcelColumn label="CAStatus277" value="CAStatus277" />
                  </ExcelSheet>
                </ExcelFile>
              </div>
            </BootstrapTooltip>
            <BootstrapTooltip title="REFRESH">
              <div className="filter-hamburger pull-right mr-3">
                <RefreshIcon onClick={reload} />
              </div>
            </BootstrapTooltip>

            <div className={"filter-sidebar " + preferenceFilterBar}>
              <h3>Preferences </h3>
              <div className="actions">
                <AddIcon />
                <CloseIcon onClick={() => handlePreferenceFilterBar()} />
              </div>
              <div className="filtr-side-main">
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel className={classes.checktitle}>
                    Page Number: {page}
                  </FormLabel>
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
                    : "This Month"}{" "}
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
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        // months={2}
                        ranges={state}
                        // direction="horizontal"
                      />
                    </div>
                    <div className="rdrDefinedRangesWrapper">
                      <Button
                        variant="contained"
                        className="cu-ad-btn date-applybtn"
                        fullWidth={true}
                        onClick={() => setPickerClass(false)}
                      >
                        Apply
                      </Button>
                      <Button
                        variant="contained"
                        className="cu-dis-btn mt-2 date-clearbtn"
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
          </Box>

          {/* Breadcrumbs */}
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/workers">
                Claims Manager
              </Link>
              <Typography color="textPrimary">837</Typography>
            </Breadcrumbs>
          </Box>
          {/*End Breadcrumbs */}

          <div className="pre-adj-tabs-all mt-0">
            <Grid container>
              <Grid item sm={9}>
                <ul>
                  <li>
                    <NavLink to="/workers" activeClassName="pre-active">
                      {/* <AccessTimeIcon /> */}
                      <img src={ClockIcon} alt="icon" />
                      <label> 837</label>
                      <span>20</span>
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

          <ClaimCards />

          {isFilterSelected && (
            <LabelFilter
              claimStatusName={selectedStatus}
              selectedPayers={selectedPayer}
              handlePayerSelection={setSelectedPayer}
              setClaimStatusName={setSelectedStatus}
              handleFilterBar={handleFilterBar}
            />
          )}

          <Grid container className="mt-2 mb-2">
            <Grid item xs={12}>
              <QueueDetail
                data={data}
                loadingClass={loadingClass}
                memberId={memberId}
                patientId={patientId}
                billingNpi={billingNpi}
                attendingNpi={attendingNpi}
                dosOrder={dosOrder}
                claimTotal={claimTotal}
                PayerCcn={PayerCcn}
                icnOrder={icnOrder}
                handleMemberId={(e) => handleMemberId(e)}
                handlePatientId={(e) => handlePatientId(e)}
                handleBillingNpi={(e) => handleBillingNpi(e)}
                handleAttendingNpi={(e) => handleAttendingNpi(e)}
                handleDosOrder={(e) => handleDosOrder(e)}
                handleClaimTotal={(e) => handleClaimTotal(e)}
                handlePayerCcn={(e) => handlePayerCcn(e)}
                handleIcnOrder={(e) => handleIcnOrder(e)}
              ></QueueDetail>
            </Grid>
          </Grid>
          {/* <Pagination count={10} className="ui-table-prgination" /> */}

          {totalRecords > 0 ? (
            <PaginationNew
              countPerPage={countPerPage}
              count={pageRows}
              page={page}
              handlePageChange={handlePageChange}
              totalCount={totalCount}
              totalRecords={totalRecords}
              handleRowPerPage={handleRowPerPage}
            />
          ) : null}

          <FooterCopyright />
        </Box>
      </Box>

      {/* Filter sidebar */}
      <div className={"filter-sidebar " + claimFilterBar}>
        <h3>Filters</h3>
        <div className="actions">
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
                aria-label="gender"
                name="gender1"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.currentTarget.value)}
              >
                <FormControlLabel value="" control={<Radio />} label="All" />
                <FormControlLabel
                  value="Open"
                  control={<Radio />}
                  label="Open"
                />
                <FormControlLabel
                  value="Accepted"
                  control={<Radio />}
                  label="Accepted"
                />
                <FormControlLabel
                  value="Rejected"
                  control={<Radio />}
                  label="Rejected"
                />
              </RadioGroup>
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
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={selectedPayer}
                onChange={(e) => setSelectedPayer(e.currentTarget.value)}
              >
                <FormControlLabel value="" control={<Radio />} label="All" />
                {payerList.map((item) => {
                  return (
                    <FormControlLabel
                      value={item}
                      control={<Radio />}
                      label={item}
                    />
                  );
                })}
              </RadioGroup>
            </Collapse>
          </FormControl>
        </div>
        <div className="mt-5">
          <Button
            variant="contained"
            className="dr-grey-btn "
            fullWidth={true}
            onClick={() => handleClear()}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            className="dr-success-btn mt-2"
            fullWidth={true}
            onClick={() => setApplyFilter(!applyFilter)}
          >
            Apply
          </Button>
        </div>
      </div>
      {/* End Filter sidebar */}
    </>
  );
};

export default PreAdjudication;
