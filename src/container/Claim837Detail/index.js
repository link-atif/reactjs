import React, { useEffect, useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useParams } from "react-router-dom";
import { TextField, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import "./Styles.scss";
import ClaimDetailTable from "./ClaimDetailTable";

import ServiceLineClaim from "./ServiceLineClaim";
import OtherClaims from "./OtherClaims";
import ClaimStatusStepper from "./ClaimStatusStepper";
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
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";

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

const ClaimDetail = () => {
  const { setMessage } = useContext(RootContext);
  const [servicePayments, setServicePayments] = useState([]);
  const [rows, setRows] = useState([]);
  const [summary, setSummary] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const param = useParams();
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    setLoadingClass("data-loading");
    common
      .getSingleClaimRequest(param.id)
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
    getServicePayments();
  }, []);

  const getServicePayments = () => {
    common
      .getClaimService(param.id)
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
              <h2 className="page-heading mb-0 text-center">
                {summary.patientControlNo !== ""
                  ? summary.patientControlNo
                  : "1234"}
              </h2>
            </Grid>
            <Grid item>
              <ClaimStatusStepper id={param.id} />
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
                      to="/workers"
                      activeClassName="active"
                      style={{
                        backgroundColor: "#E2E5ED",
                        color: "#0C1015",
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
                          typeof summary.claimAmount !== "undefined" &&
                          summary.claimAmount !== ""
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
            <Link className="" color="inherit" href="/workers">
              837
            </Link>
            <Typography color="textPrimary">
              {summary.patientControlNo !== ""
                ? summary.patientControlNo
                : "12345"}
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
                    {summary.claimAmount !== "" ? summary.claimAmount : "0"}
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
                          <img src={payer1} alt="Icon" />
                          <strong> Billing Provider</strong>
                        </p>
                        <p>{summary.bilingProviderName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer2} alt="Icon" />
                          <strong> Billing Provider NPI</strong>
                        </p>
                        <p>{summary.bilingProviderId}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer2} alt="Icon" />
                          <strong> Attending NPI</strong>
                        </p>
                        <p>{summary.attendingProviderId}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer4} alt="Icon" />
                          <strong> Tax ID (SSN or EIN)</strong>
                        </p>
                        <p>{summary.taxNo}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer1} alt="Icon" />
                          <strong> Provider Name</strong>
                        </p>
                        <p>{summary.attendingProviderName}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer1} alt="Icon" />
                          <strong> Provider MI</strong>
                        </p>
                        <p>-</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> Payer CCN</strong>
                        </p>
                        <p>{summary.payerClaimControlNo}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={payer6} alt="Icon" />
                          <strong> ICN</strong>
                        </p>
                        <p>{summary.interchangeControlNo}</p>
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
                          <img src={sub1} alt="Icon" />
                          <strong> Member ID </strong>
                        </p>
                        <p>{summary.subscriberId}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4} className="mb-2">
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub2} alt="Icon" />
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
                          <img src={sub3} alt="Icon" />
                          <strong> DOB</strong>
                        </p>
                        <p>{summary.subscriberBirthdayOn}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub2} alt="Icon" />
                          <strong> Gender</strong>
                        </p>
                        <p>{summary.subscriberGender}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub3} alt="Icon" />
                          <strong> Address</strong>
                        </p>
                        <p>{summary.subscriberAddress}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <strong> City / State /Zip</strong>
                        </p>
                        <p>{`${summary.subscriberCity}/${summary.subscriberZip}`}</p>
                      </Box>
                    </Grid>
                    <Grid item md={4}>
                      <Box className="claim-detail-crds">
                        <p>
                          <img src={sub6} alt="Icon" />
                          <strong> Date of Service</strong>
                        </p>
                        <p>
                          {summary.serviceFrom}-{summary.serviceTo}
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
                className="details-summary-heading-new mt-4 mb-3"
                gutterBottom
              >
                Claim Summary Information
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <ClaimDetailTable
                    servicePayments={servicePayments}
                  ></ClaimDetailTable>
                </Grid>
              </Grid>

              <Typography
                variant="h4"
                className="details-summary-heading-new mt-4 mb-3"
                gutterBottom
              >
                Service Line Detail
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <ServiceLineClaim
                    servicePayments={servicePayments}
                  ></ServiceLineClaim>
                </Grid>
              </Grid>

              {/* <Typography
                variant="h4"
                className="details-summary-heading-new mt-4 mb-3"
                gutterBottom
              >
                Other Claims
              </Typography>
              <Grid container>
                <Grid item xs={12}>
                  <OtherClaims servicePayments={[]}></OtherClaims>
                </Grid>
              </Grid> */}

              <FooterCopyright />
            </React.Fragment>
          </React.Fragment>
        )}
      </Box>
    </>
  );
};
export default ClaimDetail;
