import React, { useContext, useEffect, useState } from "react";
import { TextField, Box, Grid } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import searchImg from "../../assets/images/search.svg";
import FooterCopyright from "../FooterCopyright";

import UserDropdown from "../UserDropdown";
import { RootContext } from "./../../context/RootContext/index";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";

import imgone from "../../assets/images/new-design/claims-icon/1.svg";
import imgtwo from "../../assets/images/new-design/claims-icon/2.svg";
import imgthree from "../../assets/images/new-design/claims-icon/3.svg";
import imgfour from "../../assets/images/new-design/claims-icon/4.svg";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import common from "../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
import ClaimDetailTable from "./ClaimDetailTable";
import ClaimStatusStepper from "../Claim837Detail/ClaimStatusStepper";
import SearchBox from "../../components/common/SearchBox";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}

const Claim277 = () => {
  const params = useParams();
  const [summary, setSummary] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [billingProviders, setBillingProviders] = useState([]);
  const [serviceLines, setServiceLines] = useState([]);
  const [receiver, setReceiver] = useState({});
  const [claims, setClaims] = useState({});
  const { setMessage } = useContext(RootContext);
  useEffect(() => {
    setMessage({
      type: "",
      Message: "",
    });
    setLoadingClass("data-loading");
    common
      .getClaimacknowledgment(params.id)
      .then(({ data: response }) => {
        setLoadingClass("");
        const resdata = response.data;
        if (typeof resdata !== "undefined" && resdata !== "") {
          setSummary(resdata);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });
    // PATIENTS DATA CALLS
    common
      .getPatientAcknowledgment(params.id)
      .then(({ data: response }) => {
        const resdata = response.data;
        if (typeof resdata !== "undefined" && resdata !== "") {
          setReceiver(resdata.Receiver);
          setClaims(resdata.Claim);
          setBillingProviders(resdata.BillingProviders);
          setServiceLines(resdata.ServiceLines);
        }
      })
      .catch((error) => {
        console.log("error is ", error);
      });
  }, []);

  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main" style={{ paddingTop: "10px" }}>
        <Box className="mt-2">
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <h2 className="page-heading">{summary.patientControlNo}</h2>
            </Grid>
            <Grid item>
              <ClaimStatusStepper id={params.requestId} />
            </Grid>
            <Grid item>
              <BootstrapTooltip title="PRINT">
                <div className="filter-hamburger pull-right">
                  <img src={PrintIcon} alt="icon" />
                </div>
              </BootstrapTooltip>
              <BootstrapTooltip title="EXPORT">
                <div className="filter-hamburger pull-right mr-3">
                  <img src={ExportIcon} alt="icon" />
                </div>
              </BootstrapTooltip>
              <div className="claim-new-lable mr-3">
                <ul className="navigation">
                  <li>
                    <NavLink
                      to="/workers"
                      activeClassName="active"
                      style={{
                        // backgroundColor: "#E2E5ED",
                        // color: "#0C1015"
                        backgroundColor: "rgba(4, 18, 66, 0.4)",
                        color: "#fff",
                      }}
                    >
                      Back
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      activeClassName="active"
                      style={{
                        backgroundColor:
                          typeof summary.acceptedAmount !== "undefined" &&
                          summary.acceptedAmount !== ""
                            ? "#0AE2B3"
                            : "#EB5273",
                      }}
                    >
                      Approved
                    </NavLink>
                  </li>
                </ul>
              </div>
            </Grid>
          </Grid>
        </Box>
        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="f-14" color="inherit" href="/workers">
              Claims Manager
            </Link>
            <Link
              className="f-14"
              color="inherit"
              href={`/pre-adjudication-detail/${params.requestId}`}
            >
              837
            </Link>
            <Typography className="f-14" color="textPrimary">
              277
            </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}
        {loadingClass !== "" ? (
          <div className="mt-3" style={{ position: "relative" }}>
            <div className={loadingClass}>
              <div className="cliam-ui-table-2">
                <Loading></Loading>
              </div>
            </div>
          </div>
        ) : (
          <React.Fragment>
            <div className="progress-box-main mt-4">
              <div className="progress-box cliam-box">
                <div className="claim-box-inner">
                  <span className="claim-box-icon ic-1">
                    {/* <ReceiptOutlinedIcon /> */}
                    <img src={imgone} alt="Icon" />
                  </span>
                </div>
                <div className="claim-box-inner pl-3">
                  <h2 className="mb-0">
                    {typeof summary !== "undefined" &&
                    summary.acceptedAmount !== ""
                      ? summary.acceptedAmount
                      : "0"}
                  </h2>
                  <p>Claim Total</p>
                </div>
              </div>

              <div className="progress-box cliam-box">
                <div className="claim-box-inner">
                  <span className="claim-box-icon ic-2">
                    {/* <LocalAtmOutlinedIcon /> */}
                    <img src={imgtwo} alt="Icon" />
                  </span>
                </div>
                <div className="claim-box-inner pl-3">
                  <h2 className="mb-0">TBD</h2>
                  <p>TBD</p>
                </div>
              </div>

              <div className="progress-box cliam-box">
                <div className="claim-box-inner">
                  <span className="claim-box-icon ic-3">
                    {/* <NewReleasesOutlinedIcon /> */}
                    <img src={imgthree} alt="Icon" />
                  </span>
                </div>
                <div className="claim-box-inner pl-3">
                  <h2 className="mb-0">TBD</h2>
                  <p>TBD</p>
                </div>
              </div>

              <div className="progress-box cliam-box">
                <div className="claim-box-inner">
                  <span className="claim-box-icon ic-4">
                    {/* <PanToolOutlinedIcon /> */}
                    <img src={imgfour} alt="Icon" />
                  </span>
                </div>
                <div className="claim-box-inner pl-3">
                  <h2 className="mb-0">200</h2>
                  <p>Errors</p>
                </div>
              </div>
            </div>
            <Box className="claim-details-card-main mt-4">
              <Grid container className="mt-2">
                <Grid item md={6}>
                  <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Provider
                  </Typography>
                  <Grid container className="br-right pr-2">
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Billing Provider</strong>
                        </p>
                        <p>{summary.billingProviderName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Source Name</strong>
                        </p>
                        <p>{summary.sourceName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Transaction TraceNo</strong>
                        </p>
                        <p>{summary.transactionTraceNo}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Accepted Amount</strong>
                        </p>
                        <p>{summary.acceptedAmount}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Accepted Quantity</strong>
                        </p>
                        <p>{summary.acceptedQuantity}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Additional NoCode1</strong>
                        </p>
                        <p>{summary.additionalNoCode1}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mt-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Process On</strong>
                        </p>
                        <p>{summary.processOn}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mt-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Service</strong>
                        </p>
                        <p>{`${summary.serviceFrom}-${summary.serviceTo}`}</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item md={6}>
                  <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Member
                  </Typography>
                  <Grid container className="pl-2">
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Patient Name </strong>
                        </p>
                        <p>{summary.patientName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Receiver Name </strong>
                        </p>
                        <p>{summary.receiverName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Patient ControlNo</strong>
                        </p>
                        <NavLink
                          to={`/patient-details/${summary.patientControlNo}`}
                          className="text-decoration-none"
                        >
                          <p>{summary.patientControlNo}</p>
                        </NavLink>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Transaction BatchNo</strong>
                        </p>
                        <p>{summary.transactionBatchNo}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Rejected Amount</strong>
                        </p>
                        <p>{summary.rejectedAmount}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Rejected Quantity</strong>
                        </p>
                        <p>{summary.rejectedQuantity}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Additional No1</strong>
                        </p>
                        <p>{summary.additionalNo1}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Received On</strong>
                        </p>
                        <p>{summary.receivedOn}</p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <Box className="claim-details-card-main mt-4">
              <Grid container className="mt-2">
                <Grid item md={12}>
                  {/* <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Receiver
                  </Typography>
                  <Grid container className="br-right pr-2">
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Receiver Name</strong>
                        </p>
                        <p>
                          {typeof receiver !== "undefined"
                            ? receiver.ReceiverName
                            : ""}
                        </p>
                      </Box>
                    </Grid>
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Status Action</strong>
                        </p>
                        <p>
                          {typeof receiver !== "undefined"
                            ? receiver.StatusAction
                            : ""}
                        </p>
                      </Box>
                    </Grid>
                  </Grid> */}
                  <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Claim
                  </Typography>
                  <Grid container className="pl-2">
                    <Grid item md={12} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Status Reason </strong>
                        </p>
                        <p>
                          {typeof claims !== "undefined"
                            ? claims.StatusReason
                            : ""}
                        </p>
                      </Box>
                    </Grid>
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Status Action </strong>
                        </p>
                        <p>
                          {typeof claims !== "undefined"
                            ? claims.StatusAction
                            : ""}
                        </p>
                      </Box>
                    </Grid>
                    <Grid item md={6} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> Status Message</strong>
                        </p>
                        <p>
                          {typeof claims !== "undefined"
                            ? claims.StatusMessage
                            : ""}
                        </p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            {typeof serviceLines !== "undefined" &&
            serviceLines !== null &&
            serviceLines.length > 0 ? (
              <Grid container className="mt-4 mb-2" spacing={3}>
                <Grid item xs={12}>
                  <Typography
                    variant="h4"
                    className="details-summary-heading-new pl-2"
                    gutterBottom
                  >
                    Service Lines
                  </Typography>
                  <ClaimDetailTable
                    servicePayments={serviceLines !== null ? serviceLines : []}
                  ></ClaimDetailTable>
                </Grid>
              </Grid>
            ) : null}

            {/* <PaginationNew /> */}

            <FooterCopyright />
          </React.Fragment>
        )}
      </Box>
    </>
  );
};

export default Claim277;
