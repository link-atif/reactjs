import React, { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Fade,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
// import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
// import userImage from "../../assets/images/new-design/sub-user.svg";
import userImage from "../../assets/images/patient.jpg";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import UploadCam from "../../assets/images/new-design/camra-over.svg";

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

import SearchBox from "../../components/common/SearchBox";
import ClaimDetailTable from "./ClaimDetailTable";
import claims from "../../actions/claims";

const PatientDetail = () => {
  const params = useParams();
  const id = params.id;
  const [start, setStart] = useState(0);
  const [limit, setLimit] = useState(50);
  const [loadingClass, setLoadingClass] = useState("");
  const [servicePayments, setServicePayments] = useState([]);
  useEffect(() => {
    setLoadingClass("data-loading");
    claims
      .getPatientClaims(start, limit, id)
      .then((response) => {
        setLoadingClass("");
        const { data: result } = response;
        let resdata = result.data;
        setServicePayments(resdata.claimPayments);
      })
      .catch((error) => {
        setLoadingClass("");
        console.log("error messge is", error);
      });
  }, [id]);

  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <h2 className="page-heading">Patient Details</h2>

        <Link className="new-coman-btn pull-right" to={`/time-line/${id}`}>
          Timeline
        </Link>

        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/">
              Dashboard
            </Link>
            <Typography color="textPrimary">Patient Details</Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <Card className="add-data-wrapper new-style-shawdow py-2 mt-3">
          <CardContent>
            <Grid container>
              <Grid item md={2}>
                <Box style={{ position: "relative" }}>
                  <div
                    style={{
                      width: "100px",
                      height: "100px",
                      backgroundColor: "#F8FAFA",
                      borderRadius: "100px",
                      opacity: "1",
                      textAlign: "center",
                      margin: "0 auto",
                    }}
                  >
                    <img
                      style={{
                        boxShadow: "0px 1px 2px #1C9A7E14",
                        borderRadius: "50%",
                        // marginLeft: "-10px",
                        padding: "4px",
                      }}
                      src={userImage}
                      className="img-fluid"
                      alt="img missing"
                    />
                  </div>
                </Box>
                <Box className="text-center">
                  <strong> Jennie Regel</strong>
                  <p className="text-dr-blk fn-wet-5">01/02/1996</p>
                </Box>
              </Grid>
              <Grid item md={10} className="over-br-left">
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  mt={2}
                >
                  <Grid item xs={11}>
                    <Typography
                      variant="h4"
                      className="details-summary-heading-new pl-2"
                      gutterBottom
                    >
                      Patient Details
                    </Typography>
                    <Grid container className="">
                      <Grid item md={4} className="mb-2">
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub1} alt="Icon" />
                            <strong> Patient Name:</strong>
                          </p>
                          <p>jhon</p>
                        </Box>
                      </Grid>
                      <Grid item md={4} className="mb-2">
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub6} alt="Icon" />
                            <strong> DOB:</strong>
                          </p>
                          <p>TBD</p>
                        </Box>
                      </Grid>

                      <Grid item md={4} className="mb-2">
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub3} alt="Icon" />
                            <strong> Address: </strong>
                          </p>
                          <p>TBD</p>
                        </Box>
                      </Grid>
                      <Grid item md={4} className="mb-2">
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub2} alt="Icon" />
                            <strong> Contact Info:</strong>
                          </p>
                          <p>00000000000</p>
                        </Box>
                      </Grid>

                      <Grid item md={4} className="mb-2">
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub4} alt="Icon" />
                            <strong> Patient Controll No:</strong>
                          </p>
                          <p>TBD</p>
                        </Box>
                      </Grid>
                      <Grid item md={4}>
                        <Box className="claim-detail-crds">
                          <p>
                            <img src={sub4} alt="Icon" />
                            <strong> Insurance:</strong>
                          </p>
                          <p>Tbd</p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <Box>
          <Typography
            variant="h4"
            className="details-summary-heading-new mt-3 mb-3"
            gutterBottom
          >
            Patient Claims
          </Typography>
          <Grid container>
            <Grid item xs={12}>
              <ClaimDetailTable
                servicePayments={servicePayments}
                loadingClass={loadingClass}
              ></ClaimDetailTable>
            </Grid>
          </Grid>
        </Box>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default PatientDetail;
