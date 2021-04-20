import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";
import { TextField, Box, Button } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./Styles.scss";
import ClaimDetailTable from "./ClaimDetailTable";

import searchImg from "../../assets/images/search.svg";

import imgone from "../../assets/images/new-design/claims-icon/1.svg";
import imgtwo from "../../assets/images/new-design/claims-icon/2.svg";
import imgthree from "../../assets/images/new-design/claims-icon/3.svg";
import imgfour from "../../assets/images/new-design/claims-icon/4.svg";

import payer1 from "../../assets/images/new-design/crd-icon/payer-1.svg";
import payer2 from "../../assets/images/new-design/crd-icon/payer-2.svg";
import payer4 from "../../assets/images/new-design/crd-icon/payer-4.svg";
import payer6 from "../../assets/images/new-design/crd-icon/payer-6.svg";
import sub1 from "../../assets/images/new-design/crd-icon/sub-1.svg";
import sub2 from "../../assets/images/new-design/crd-icon/sub-2.svg";
import sub3 from "../../assets/images/new-design/crd-icon/sub-3.svg";
import sub4 from "../../assets/images/new-design/crd-icon/sub-4.svg";
import sub5 from "../../assets/images/new-design/crd-icon/sub-5.svg";
import sub6 from "../../assets/images/new-design/crd-icon/sub-6.svg";

import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import { RootContext } from "../../context/RootContext";
import common from "./../../actions/common";
import Loading from "./../../components/common/ExpandableTable/Loading";
// import ClaimStatusStepper from "./ClaimStatusStepper";
import ClaimStatusStepper from "../Claim837Detail/ClaimStatusStepper";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
import Tooltip from "@material-ui/core/Tooltip";
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

const useStyles = makeStyles({
  table: {
    minWidth: 300,
    tableLayout: "fixed",
  },
});

function createData(name, calories, fat, carbs, protein, bit, pat, clp) {
  return { name, calories, fat, carbs, protein, bit, pat, clp };
}

const rows2 = [
  createData(
    "Total Charges",
    55931,
    "COVID CHGS",
    1111,
    "Payment AMT",
    11187,
    "PAT RESP",
    2891
  ),
  createData(
    "Coins",
    2891,
    "Copay",
    0,
    "NonCOVID CHGS",
    0,
    "Count Adjust",
    41853
  ),
  createData(
    "Total Charges",
    55931,
    "COVID CHGS",
    1111,
    "Payment AMT",
    11187,
    "PAT RESP",
    2891
  ),
  createData(
    "Coins",
    2891,
    "Copay",
    0,
    "NonCOVID CHGS",
    0,
    "Count Adjust",
    41853
  ),
];

const ClaimDetail = () => {
  const classes = useStyles();
  const { setMessage } = useContext(RootContext);
  const [servicePayments, setServicePayments] = useState([]);
  const [rows, setRows] = useState([]);
  const params = useParams();
  const [rows1, setRows1] = useState([]);
  const [summary, setSummary] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    setLoadingClass("data-loading");
    common
      .getClaimDetail(params.id)
      .then(({ data: response }) => {
        setLoadingClass("");
        const resdata = response.data;
        if (typeof resdata != "undefined" && resdata != "") {
          setSummary(resdata);
          // mapData(resdata);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });
    getServicePayments();
  }, []);

  const getServicePayments = () => {
    common
      .getServicePayments(params.id)
      .then(({ data: response }) => {
        setLoadingClass("");
        const resdata = response.data;
        if (resdata.length > 0) {
          setServicePayments(resdata);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error is ", error);
      });
  };
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
              <h2 className="page-heading mb-0">
                {summary.payerClaimNo != "" ? summary.payerClaimNo : "1234"}
              </h2>
            </Grid>
            <Grid item>
              {/* <ClaimStatusStepper id={summary.caPatientLevelDetailId} /> */}
              <ClaimStatusStepper id={summary.claimRequestId} />
              {/* <ClaimStatusStepper id={params.id} /> */}
            </Grid>
            <Grid item>
              <BootstrapTooltip title="PRINT">
                <div className="new-icon-btn pull-right ml-3">
                  <img src={PrintIcon} alt="icon" />
                </div>
              </BootstrapTooltip>
              <BootstrapTooltip title="EXPORT">
                <div className="new-icon-btn pull-right ml-3">
                  <img src={ExportIcon} alt="icon" />
                </div>
              </BootstrapTooltip>

              <div className="claim-new-lable">
                <ul className="navigation">
                  <li>
                    <NavLink
                      to="/claim"
                      activeClassName="active"
                      style={{
                        // backgroundColor: "#E2E5ED",
                        // color: "#0C1015"
                        backgroundColor: "#E2E5ED",
                        color: "#0C1015",
                      }}
                    >
                      Back
                    </NavLink>
                  </li>
                  <li>
                    {/* <NavLink
                  to="#"
                  activeClassName="active"
                  style={{
                    backgroundColor:
                      typeof summary.paidAmount != "undefined" &&
                      summary.paidAmount != ""
                        ? "#0AE2B3"
                        : "#EB5273",
                  }}
                >
                  <label>{summary.status}</label>
                </NavLink> */}
                    {summary.status === "Paid" ? (
                      <Button
                        variant="contained"
                        className="cl-paid payment-btn ml-2"
                      >
                        <CheckIcon /> {summary.status}
                      </Button>
                    ) : (
                      [
                        summary.status == "Partial" ? (
                          <Button
                            variant="contained"
                            className="cl-partial payment-btn ml-2"
                          >
                            <InfoIcon /> {summary.status}
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            className="cl-pending payment-btn ml-2"
                          >
                            <CancelIcon /> {summary.status}
                          </Button>
                        ),
                      ]
                    )}
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
            <Link className="" color="inherit" href="/claim">
              Claims Payments
            </Link>
            <Typography color="textPrimary">
              {summary.payerClaimNo != "" ? summary.payerClaimNo : "12345"}
            </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        {loadingClass != "" ? (
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
                    {summary.totalAmount != "" ? summary.totalAmount : "0"}
                  </h2>
                  <p>Total Billed</p>
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
                  <h2 className="mb-0">
                    {summary.allowedAmount != "" ? summary.allowedAmount : "0"}
                  </h2>
                  <p>Allowed</p>
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
                  <h2 className="mb-0">
                    {summary.paidAmount != "" ? summary.paidAmount : "0"}
                  </h2>
                  <p>Paid Amt</p>
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
                  <h2 className="mb-0">
                    {summary.patientRespAmount != ""
                      ? summary.patientRespAmount
                      : "0"}
                  </h2>
                  <p>Patient Res</p>
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
                    Payer
                  </Typography>
                  <Grid container className="br-right pr-2">
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer1} alt="Icon" />
                          <strong> Payer Name</strong>
                        </p>
                        <p>{summary.payerName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer2} alt="Icon" />
                          <strong> Primary Payer</strong>
                        </p>
                        <p>{summary.primaryPayer}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer2} alt="Icon" />
                          <strong> Payer Claim Number</strong>
                        </p>
                        <p>{summary.payerClaimNo}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer4} alt="Icon" />
                          <strong> Provider Name</strong>
                        </p>
                        <p>{summary.payerName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> Provider Address</strong>
                        </p>
                        <p>{summary.payerAddressLane1}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> Contd AdjAmount</strong>
                        </p>
                        <p>
                          {typeof summary.contdAdjAmount !== "undefined" &&
                          summary.contdAdjAmount !== ""
                            ? summary.contdAdjAmount
                            : "-"}
                        </p>
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
                    Provider
                  </Typography>
                  <Grid container className="pl-2">
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub1} alt="Icon" />
                          <strong> Provider Name</strong>
                        </p>
                        <p>{summary.payeeName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub2} alt="Icon" />
                          <strong> Patient</strong>
                        </p>
                        <p>{summary.patientName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
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
                          <img src={sub5} alt="Icon" />
                          <strong> Payee City</strong>
                        </p>
                        <p>{summary.payeeAddressCity}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub4} alt="Icon" />
                          <strong> Insurance Name</strong>
                        </p>
                        <p>{summary.insuredName}</p>
                      </Box>
                    </Grid>

                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub6} alt="Icon" />
                          <strong> Service Date</strong>
                        </p>
                        <p>{`${summary.serviceFrom} ${summary.serviceTo}`}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub4} alt="Icon" />
                          <strong> Diff(%)</strong>
                        </p>
                        <p>
                          {typeof summary.diff !== "undefined" &&
                          summary.diff !== ""
                            ? summary.diff
                            : "-"}
                        </p>
                      </Box>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Box>
            <React.Fragment>
              <Typography
                variant="h4"
                className="details-summary-heading-new mt-3 mb-3"
                gutterBottom
              >
                Service Payments
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <ClaimDetailTable
                    servicePayments={servicePayments}
                  ></ClaimDetailTable>
                </Grid>
              </Grid>

              <FooterCopyright />
            </React.Fragment>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};
export default ClaimDetail;
