import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Box,
  TextField,
  Input,
  Grid,
  Drawer,
  Typography,
  Chip,
  Card,
  CardContent,
  InputAdornment,
} from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import "./styles.scss";
import "../Register/styles.scss";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AddBillingMethod from "./AddBillingMethod";
import Messages from "../../components/Messages";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import gold from "../../assets/images/new-design/dollor.svg";
import { RootContext } from "./../../context/RootContext/index";
import { users, common } from "../../actions";
import userImage from "../../assets/images/sub-img.jpg";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import imgOne from "../../assets/images/new-design/sub-1.svg";
import UploadCam from "../../assets/images/new-design/camra-over.svg";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";

import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ListIcon from "../../assets/images/new-design/claims-icon/list-icon.svg";
import CustomerIcon from "../../assets/images/new-design/claims-icon/customer-icon.svg";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import CalendarIcon from "../../assets/images/new-design/claims-icon/calendar-icon.svg";
import FilterIcon from "../../assets/images/new-design/claims-icon/filter-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import BillingChip from "../../assets/images/new-design/billing-crd.png";
import MasterCard from "../../assets/images/new-design/master-crd.png";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Autocomplete } from "@material-ui/lab";
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

const Subscription = () => {
  const { loginUserData, setMessage } = useContext(RootContext);
  const [steps, setSteps] = useState(1);
  const [holdername, setHolderName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const user = JSON.parse(loginUserData);
  // console.log("user is", user);
  // const [displayName, setDisplayName] = useState('');
  /* COMPANY VARIABLES */
  const [organization, setOrganization] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [domainName, setDomainName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loadingClass, setLoadingClass] = useState("");

  const [addPayment, setAddPayment] = useState(false);
  /* SUBSCRIPTION */
  const [subscription, setSubscription] = useState({});
  const [errors, setErrors] = useState({});
  // let user = {};
  // const getProfile = () => {
  //   user = JSON.parse(loginUserData);
  //   users.getUser(user.userId).then((response) => {
  //     const data = response.data.data;
  //     console.log("profile data is", response);
  //     if (data !== "" && data !== null) {
  //       // setUserName(data.customerName);
  //       // setDomainName(data.domainName);
  //       // setOrganization(
  //       //   typeof data.organization != "undefined" ? data.organization : ""
  //       // );
  //       // setUserEmail(data.email);
  //     }
  //   });
  // };

  useEffect(() => {
    // getProfile();
    common.getSingleSubscription().then((response) => {
      const data = response.data.data;
      if (typeof data !== "undefined" && data !== null) {
        let newdata = data[0];
        setSubscription(newdata);
        // setUserName(newdata.firstName + " " + newdata.lastName);
        setFirstName(newdata.firstName);
        setLastName(newdata.lastName);
        setUserEmail(newdata.email);
        setOrganization(newdata.organizationName);
        setDomainName(newdata.domainName);
      }
    });
    setMessage({
      type: "",
      message: "",
    });
  }, []);

  const handleUpdate = () => {
    var error = null;
    if (userEmail === "") {
      error = { ...error, userEmail: "Email is required" };
      setErrors(error);
    }
    if (firstName === "") {
      error = { ...error, firstName: "First Name is required" };
      setErrors(error);
    }
    if (lastName === "") {
      error = { ...error, lastName: "Last Name is required" };
      setErrors(error);
    }
    if (organization === "") {
      error = { ...error, organization: "Organization is required" };
      setErrors(error);
    }
    // if (domainName === "") {
    //   error = { ...error, domainName: "Domain Name is required" };
    //   setErrors(error);
    // }
    setLoadingClass("loading")
    common.updateCustomerInfo({ userEmail, firstName, lastName, organization, customerId: subscription.customerId })
      .then(response => {
        if (response.data && response.data.success) {
          setFirstName(firstName);
          setLastName(lastName);
          setUserEmail(userEmail);
          setOrganization(organization);
          setLoadingClass("");
          setMessage({
            type: "success",
            message: "asic Info updated successfully",
          });
        }
      })
      .catch(error => {
        setMessage({
          type: "error",
          message: error.message,
        });
        setLoadingClass("")
      })

  };

  const closeUser = () => {
    // this.props.closePayment();
    setAddPayment(false);
    setHolderName("");
    setCardNumber("");
    setExpiry("");
    setCvc("");
  };

  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <Box>
          <h2 className="page-heading">Subscription</h2>

          <BootstrapTooltip title="SETTING">
            <div className="filter-hamburger pull-right">
              <img src={SettingIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="ITEMS">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ListIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="CUSTOMER">
            <div className="filter-hamburger pull-right mr-3">
              <img src={CustomerIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="PRINT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={PrintIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="EXPORT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ExportIcon} alt="icon" />
            </div>
          </BootstrapTooltip>

          {/* Breadcrumbs */}
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" to="/">
                Insights
              </Link>
              <Typography color="textPrimary">Subscription</Typography>
            </Breadcrumbs>
          </Box>
          {/*End Breadcrumbs */}
        </Box>

        {/* <Messages /> */}
        <div className="dashboard-content">
          <Grid container>
            <Grid item xs={12} className="mt-2">
              <div className="pre-adj-tabs-all mt-0">
                <ul>
                  <li>
                    <button
                      onClick={() => setSteps(1)}
                      style={{
                        backgroundColor: steps === 1 ? "#FFFFFF" : "",
                        color: steps === 1 ? "#0C1015" : "",
                        fontWeight: steps === 1 ? "600" : "",
                        borderColor: steps === 1 ? "#0AE2B3" : "",
                        boxShadow: steps === 1 ? "5px 5px 10px #1C9A7E1A" : "",
                      }}
                    >
                      <img src={imgOne} alt="icon" />
                      OverView
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSteps(2)}
                      style={{
                        backgroundColor: steps === 2 ? "#FFFFFF" : "",
                        color: steps === 2 ? "#0C1015" : "",
                        fontWeight: steps === 2 ? "600" : "",
                        borderColor: steps === 2 ? "#0AE2B3" : "",
                        boxShadow: steps === 2 ? "5px 5px 10px #1C9A7E1A" : "",
                      }}
                    >
                      <StarBorderOutlinedIcon />
                      Plan
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => setSteps(3)}
                      style={{
                        backgroundColor: steps === 3 ? "#FFFFFF" : "",
                        color: steps === 3 ? "#0C1015" : "",
                        fontWeight: steps === 3 ? "600" : "",
                        borderColor: steps === 3 ? "#0AE2B3" : "",
                        boxShadow: steps === 3 ? "5px 5px 10px #1C9A7E1A" : "",
                      }}
                    >
                      <ReceiptOutlinedIcon />
                      Billings
                    </button>
                  </li>
                </ul>

                <Button
                  className="new-coman-btn pull-right"
                  onClick={() => setAddPayment(true)}
                  style={{ display: steps !== 3 ? "none" : "" }}
                >
                  Add Payment Method
                </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="">
                {steps === 1 ? (
                  <Box>
                    <Card className="add-data-wrapper new-style-shawdow py-2">
                      <Messages />
                      <CardContent>
                        <Grid container>
                          <Grid item md={2}>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <Box
                                style={{
                                  position: "relative",
                                  marginTop: "20px",
                                  marginLeft: "-15px",
                                }}
                              >
                                <div
                                  style={{
                                    width: "100px",
                                    height: "100px",
                                    backgroundColor: "#F8FAFA",
                                    borderRadius: "100px",
                                    opacity: "1",
                                    textAlign: "center",
                                  }}
                                >
                                  <img
                                    style={{
                                      boxShadow: "0px 1px 2px #1C9A7E14",
                                      borderRadius: "50%",
                                    }}
                                    src={userImage}
                                    className="img-fluid"
                                    alt="img missing"
                                  />
                                </div>

                                <input
                                  className="mt-3"
                                  accept="image/*"
                                  id="raised-button-file"
                                  type="file"
                                  style={{ display: "none" }}
                                />
                                <label
                                  htmlFor="raised-button-file"
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    left: "70px",
                                    backgroundColor: "#fff",
                                    boxShadow: "0px 5px 10px #1C9A7E1A",
                                    borderRadius: "50%",
                                  }}
                                >
                                  <IconButton
                                    color="primary"
                                    aria-label="upload picture"
                                    component="span"
                                    style={{
                                      padding: "6px",
                                    }}
                                  >
                                    {/* <AddAPhotoIcon style={{ color: "#7d859e" }} /> */}
                                    <img src={UploadCam} alt="icon" />
                                  </IconButton>
                                </label>
                              </Box>
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
                              <Grid item xs={10}>
                                <Grid container spacing={2}>
                                  <Grid item xs={6} mt={1}>
                                    <label className="new-input-lable">
                                      Company Name
                                    </label>
                                    <Input
                                      id="outlined-basic"
                                      value={organization}
                                      onChange={(e) =>
                                        setOrganization(e.target.value)
                                      }
                                      placeholder="Company Name"
                                      className="input-new-design"
                                      fullWidth
                                    />
                                    <div className="text-danger">
                                      {errors.organization}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <label className="new-input-lable">
                                      Company Domain
                                    </label>
                                    <Input
                                      id="outlined-basic"
                                      value={domainName}
                                      onChange={(e) =>
                                        setDomainName(e.target.value)
                                      }
                                      placeholder="Company Domain"
                                      className="input-new-design"
                                      fullWidth
                                      readOnly
                                    />

                                    <div className="text-danger">
                                      {errors.domainName}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6} mt={4}>
                                    <label className="new-input-lable">
                                      Account owner
                                    </label>
                                    <Grid item xs={6} mt={4}>
                                      <Input
                                        id="outlined-basic"
                                        value={firstName}
                                        onChange={(e) =>
                                          setFirstName(e.target.value)
                                        }
                                        placeholder="First Name"
                                        className="input-new-design"
                                        fullWidth
                                      />
                                    </Grid>
                                    <Grid item xs={6} mt={4}>
                                      <Input
                                        id="outlined-basic"
                                        value={lastName}
                                        onChange={(e) =>
                                          setLastName(e.target.value)
                                        }
                                        placeholder="Last Name"
                                        className="input-new-design"
                                        fullWidth
                                      />
                                    </Grid>
                                    <div className="text-danger">
                                      {errors.firstName || errors.lastName}
                                    </div>
                                  </Grid>
                                  <Grid item xs={6}>
                                    <label className="new-input-lable">
                                      Email
                                    </label>
                                    <Input
                                      id="outlined-basic"
                                      value={userEmail}
                                      onChange={(e) =>
                                        setUserEmail(e.target.value)
                                      }
                                      placeholder="Email"
                                      className="input-new-design"
                                      fullWidth
                                    />
                                    <div className="text-danger">
                                      {errors.email}
                                    </div>
                                  </Grid>
                                  <Grid item xs={12}>
                                    <Button
                                      color="primary"
                                      type="submit"
                                      onClick={handleUpdate}
                                      className={`new-coman-btn pull-right ${loadingClass}`}
                                    >
                                      Save
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    <Box className="claim-details-card-main mt-4 mb-5">
                      <Grid container className="mt-2">
                        <Grid item md={6}>
                          <Typography
                            variant="h4"
                            className="details-summary-heading-new pl-2"
                            gutterBottom
                          >
                            Subscription
                          </Typography>
                          <Grid container className="br-right pr-2">
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Subscription ID</strong>
                                </p>
                                <p>{subscription.subscriptionPlanId}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Subscription Plan</strong>
                                </p>
                                <p>{subscription.subscriptionPlanName}</p>
                              </Box>
                            </Grid>
                            {/* <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Domain Name</strong>
                                </p>
                                <p>{subscription.domainName}</p>
                              </Box>
                            </Grid> */}
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Seats </strong>
                                </p>
                                <p>{subscription.totalSeats}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Company Name</strong>
                                </p>
                                <p>{subscription.organizationName}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Domain</strong>
                                </p>
                                <p>{subscription.domainName}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Address</strong>
                                </p>
                                <p>{subscription.address}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6}>
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Status</strong>
                                </p>
                                <p>{subscription.status}</p>
                              </Box>
                            </Grid>
                            {/* <Grid item md={6}>
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong><NavLink className="over-link" to="#">Manage Payment Method</NavLink></strong>
                                </p>
                                <p></p>
                              </Box>
                            </Grid> */}
                          </Grid>
                        </Grid>

                        <Grid item md={6}>
                          <Typography
                            variant="h4"
                            className="details-summary-heading-new pl-2"
                            gutterBottom
                          >
                            Account Owner
                          </Typography>
                          <Grid container className="pl-2">
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Full Name</strong>
                                </p>
                                <p>{user.displayName}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Email Address</strong>
                                </p>
                                <p>{user.email}</p>
                              </Box>
                            </Grid>
                            <Grid item md={6} className="mb-2">
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Phone</strong>
                                </p>
                                <p>{user.contactNo}</p>
                              </Box>
                            </Grid>
                            {/* <Grid item md={6}>
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Subscription Plan</strong>
                                </p>
                                <p>FIRST A LAST</p>
                              </Box>
                            </Grid>
                            <Grid item md={6}>
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> Account Admin</strong>
                                </p>
                                <p>1111</p>
                              </Box>
                            </Grid>
                            <Grid item md={6}>
                              <Box className="claim-detail-crds">
                                <p>
                                  <strong> <NavLink className="over-link" to="#">Partner Information</NavLink></strong>
                                </p>
                                <p></p>
                              </Box>
                            </Grid> */}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>

                    {/* <Card className="card-wraper-new-ui-1 mt-4 mb-5">
                      <Grid container mt={2}>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Subscription ID:{" "}
                              <strong>{subscription.subscriptionId}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Order ID:{" "}
                              <strong>{subscription.subscriptionPlanId}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Date Purchased:{" "}
                              <strong>
                                {new Date(subscription.createdOn).getDate() +
                                  "," +
                                  new Date(
                                    subscription.createdOn
                                  ).toLocaleString("en", { month: "long" }) +
                                  "," +
                                  new Date(
                                    subscription.createdOn
                                  ).getFullYear()}
                              </strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Organization Name:{" "}
                              <strong>{subscription.orgName}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Domain Name:{" "}
                              <strong>{subscription.domainName}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Contact Name: <strong>{subscription.name}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Contact Email: <strong>{userEmail}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Subscription Plan:{" "}
                              <strong>
                                {subscription.subscriptionPlanName}
                              </strong>
                            </Typography>
                          </Box>
                        </Grid>

                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Currency: <strong>USD</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6}>
                          <Box className="mt-2 mb-2">
                            <Typography variant="subtitle1">
                              Account Admin: <strong>link@admin.com</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={4}></Grid>
                        <Grid item md={4}></Grid>
                      </Grid>
                      <Grid container spacing={1} className="mb-2">
                        <Grid item md={6}>
                          <Box
                            className="mt-2 mb-2"
                            style={{ textDecoration: "underline" }}
                          >
                            <NavLink to="#">Manage Payment Method</NavLink>
                          </Box>
                        </Grid>

                        <Grid item md={6}>
                          <Box
                            className="mt-2 mb-2"
                            style={{ textDecoration: "underline" }}
                          >
                            <NavLink to="#">Partner Information</NavLink>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card> */}
                  </Box>
                ) : null}
                {/* {steps == 2 ? (
                  <Card className="add-data-wrapper card-wraper-new-ui">
                    <Messages />
                    <CardContent>
                      <Grid container>
                        <Grid item md={2}>
                          <Box style={{ position: "relative" }}>
                            <div
                              style={{
                                width: "118px",
                                height: "118px",

                                borderRadius: "100px",
                                opacity: "1",
                                textAlign: "center",
                                marginTop: "13px",
                                marginLeft: "13px",
                              }}
                            >
                              <img
                                style={{
                                  border: "2px solid #f4c863",
                                  borderRadius: "50%",
                                  padding: "2px",
                                }}
                                src={userImage}
                                className="img-fluid"
                              />
                            </div>

                            <input
                              className="mt-3"
                              accept="image/*"
                              id="raised-button-file"
                              type="file"
                              style={{ display: "none" }}
                            />
                            <label
                              htmlFor="raised-button-file"
                              style={{
                                position: "absolute",
                                top: "-5px",
                                left: "3px",
                              }}
                            >
                              <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                              >
                                <AddAPhotoIcon style={{ color: "#7d859e" }} />
                              </IconButton>
                            </label>
                          </Box>
                        </Grid>
                        <Grid item md={10}>
                          <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                            spacing={2}
                            mt={2}
                          >
                            <Grid item xs={5} mt={1}>
                              <Input
                                id="standard-adornment-amount"
                                value={subscription.orgName}
                                onChange={(e) =>
                                  setOrganization(e.target.value)
                                }
                                placeholder="Company Name"
                                className="register-input-field"
                                fullWidth
                                startAdornment={
                                  <InputAdornment position="start">
                                    <PermIdentityIcon />
                                  </InputAdornment>
                                }
                              />
                              <div className="text-danger">
                                {errors.organization}
                              </div>
                            </Grid>
                            <Grid item xs={5}>
                              <Input
                                id="standard-adornment-amount"
                                value={subscription.domainName}
                                onChange={(e) => setDomainName(e.target.value)}
                                placeholder="Company Domain"
                                className="register-input-field"
                                fullWidth
                                startAdornment={
                                  <InputAdornment position="start">
                                    <PermIdentityIcon />
                                  </InputAdornment>
                                }
                              />

                              <div className="text-danger">
                                {errors.domainName}
                              </div>
                            </Grid>
                            <Grid item xs={5} mt={4}>
                              <Input
                                id="standard-adornment-amount"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="User Name"
                                className="register-input-field"
                                fullWidth
                                startAdornment={
                                  <InputAdornment position="start">
                                    <PermIdentityIcon />
                                  </InputAdornment>
                                }
                              />
                              <div className="text-danger">
                                {errors.userName}
                              </div>
                            </Grid>
                            <Grid item xs={5}>
                              <Input
                                id="standard-adornment-amount"
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                placeholder="Email"
                                className="register-input-field"
                                fullWidth
                                startAdornment={
                                  <InputAdornment position="start">
                                    <MailOutlineIcon />
                                  </InputAdornment>
                                }
                              />
                              <div className="text-danger">{errors.email}</div>
                            </Grid>
                            
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                ) : null} */}
                {steps === 3 ? (
                  <div className="add-data-wrapper">
                    <Grid
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                      mt={2}
                    >
                      <Grid item xs={6}>
                        <Card className="new-style-shawdow">
                          <CardContent>
                            <Typography
                              className="color-07 f-18"
                              variant="h5"
                              component="h5"
                            >
                              <img src={BillingChip} alt="icon" />

                              <Chip
                                label="default"
                                className="pull-right"
                                style={{
                                  height: "28px",
                                  color: "#0AE2B3",
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  borderRadius: "10px",
                                  backgroundColor: "rgba(10, 226, 179, 0.2)",
                                  textTransform: "uppercase",
                                }}
                              />
                            </Typography>
                            <Typography
                              className="bill-crd-num mb-4"
                              varient="h4"
                              component="h4"
                            >
                              <span>xxxx</span>
                              <span className="ml-4">xxxx</span>
                              <span className="ml-4">xxxx</span>
                              <span className="ml-4">3434</span>
                            </Typography>
                            <Typography
                              className="bill-crd-name"
                              variant="h5"
                              component="h5"
                            >
                              John Robert
                            </Typography>
                            <Typography
                              className="color-04 f-18"
                              varient="h6"
                              component="span"
                            >
                              <Typography
                                className="bill-crd-exp"
                                variant="subtitle1"
                              >
                                <span className="f-12"> Expiry Date </span>
                                <br></br>
                                <span className="f-14 fn-wet-5">09/22</span>

                                <img
                                  className="pull-right"
                                  src={MasterCard}
                                  alt="icon"
                                />
                              </Typography>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card className="new-style-shawdow">
                          <CardContent>
                            <Typography
                              className="color-07 f-18"
                              variant="h5"
                              component="h5"
                            >
                              <img src={BillingChip} alt="icon" />

                              <Chip
                                label="secondary"
                                className="pull-right"
                                style={{
                                  height: "28px",
                                  color: "#5F646B",
                                  fontSize: "10px",
                                  fontWeight: "600",
                                  borderRadius: "10px",
                                  backgroundColor: "rgba(157, 163, 176, 0.2)",
                                  textTransform: "uppercase",
                                }}
                              />
                            </Typography>
                            <Typography
                              className="bill-crd-num mb-4"
                              varient="h4"
                              component="h4"
                            >
                              <span>xxxx</span>
                              <span className="ml-4">xxxx</span>
                              <span className="ml-4">xxxx</span>
                              <span className="ml-4">5675</span>
                            </Typography>
                            <Typography
                              className="bill-crd-name"
                              variant="h5"
                              component="h5"
                            >
                              John Robert
                            </Typography>

                            <Typography
                              className="color-04 f-18"
                              varient="h6"
                              component="span"
                            >
                              <Typography
                                className="bill-crd-exp"
                                variant="subtitle1"
                              >
                                <span className="f-12"> Expiry Date </span>
                                <br></br>
                                <span className="f-14 fn-wet-5">12/22</span>

                                <img
                                  className="pull-right"
                                  src={MasterCard}
                                  alt="icon"
                                />
                              </Typography>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    </Grid>
                  </div>
                ) : null}
              </div>
            </Grid>
          </Grid>
          {steps === 2 ? (
            <Grid container>
              <Grid item xs={12}>
                <div className="mb-5 dashboard-header">
                  <h2 className="new-style-sec-heading">Current Plan</h2>
                  <Card className="mt-2 new-style-shawdow">
                    <CardContent className="px-3 py-4">
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="mb-3"
                      >
                        <Grid item xs={8}>
                          <div className="">
                            <Typography
                              className="plan-heading-crd pl-3"
                              variant="subtitle1"
                            >
                              Plan
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="">
                            <Typography
                              className="plan-heading-crd"
                              variant="subtitle1"
                            >
                              Seats
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={2}>
                          <div className="">
                            <Typography
                              className="plan-heading-crd"
                              variant="subtitle1"
                            >
                              Billing Period
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className="plan-page-elter py-2"
                      >
                        <Grid item xs={8}>
                          <span className="gold-img ml-3">
                            <img className="" src={gold} alt="Gold" />
                          </span>
                          <Typography className="gold-text ml-2" variant="h4">
                            {subscription.subscriptionPlanName || ""}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant="subtitle2" className="plan-text">
                            {" "}
                            {subscription.totalSeats || ""}
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography className="plan-text" variant="subtitle2">
                            2
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          ) : null}
        </div>
        <Drawer anchor={"right"} open={addPayment}>
          <AddBillingMethod
            holdername={holdername}
            handleHolder={(e) => setHolderName(e)}
            cardnumber={cardnumber}
            handleCard={(e) => setCardNumber(e)}
            expiry={expiry}
            handleExpiry={(e) => setExpiry(e)}
            cvc={cvc}
            handleCvc={(e) => setCvc(e)}
            closeUser={closeUser}
          />
        </Drawer>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default Subscription;
