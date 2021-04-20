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
import { NavLink } from "react-router-dom";
import "./styles.scss";
import "../Register/styles.scss";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AddBillingMethod from "./AddBillingMethod";
import Messages from "../../components/Messages";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";
import gold from "../../assets/images/dollar.png";
import { RootContext } from "./../../context/RootContext/index";
import { users, common } from "../../actions";
import userImage from "../../assets/images/building.png";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";

const Subscription = () => {
  const { loginUserData, setMessage } = useContext(RootContext);
  const [steps, setSteps] = useState(1);
  const [holdername, setHolderName] = useState("");
  const [cardnumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  // const [displayName, setDisplayName] = useState('');
  /* COMPANY VARIABLES */
  const [organization, setOrganization] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [domainName, setDomainName] = useState("");
  const [userName, setUserName] = useState("");

  const [addPayment, setAddPayment] = useState(false);
  /* SUBSCRIPTION */
  const [subscription, setSubscription] = useState({});
  const [errors, setErrors] = useState({});
  let user = {};
  const getProfile = () => {
    user = JSON.parse(loginUserData);
    users.getUser(user.userId).then((response) => {
      const data = response.data.data;
      if (data !== "" && data !== null) {
        setUserName(data.customerName);
        setDomainName(data.domainName);
        setOrganization(
          typeof data.organization != "undefined" ? data.organization : ""
        );
        setUserEmail(data.email);
      }
    });
  };

  useEffect(() => {
    getProfile();
    common.getSingleSubscription(user.userId).then((response) => {
      const data = response.data.data;
      setSubscription(data);
    });
    setMessage({
      type: "",
      message: "",
    });
  }, []);
  const handleCompanyUpdate = () => {
    var error = null;
    if (userEmail === "") {
      error = { ...error, userEmail: "Email is required" };
      setErrors(error);
    }
    if (userName === "") {
      error = { ...error, userName: "Name is required" };
      setErrors(error);
    }
    if (organization === "") {
      error = { ...error, organization: "Organization is required" };
      setErrors(error);
    }
    if (domainName === "") {
      error = { ...error, domainName: "Domain Name is required" };
      setErrors(error);
    }
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
      <Box className="dashboard-main">
        <h2 className="page-heading">Subscription</h2>

        <Messages />
        <div className="dashboard-content">
          <Grid container>
            <Grid item xs={12} className="mt-2">
              <div className="pre-adj-tabs-all">


                <ul>
                  <li>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => setSteps(1)}
                      className="btn-default mt-4"
                      style={{
                        backgroundColor: steps === 1 ? "rgba(4, 18, 66, 0.4)" : "",
                        color: steps === 1 ? "#fff" : "",
                      }}
                    >
                      OverView
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => setSteps(2)}
                      className="mt-4 mx-2"
                      style={{
                        backgroundColor: steps === 2 ? "rgba(4, 18, 66, 0.4)" : "",
                        color: steps === 2 ? "#fff" : "",
                      }}
                    >
                      Plan
                    </Button>
                  </li>
                  <li>
                    <Button
                      variant="contained"
                      color="default"
                      onClick={() => setSteps(3)}
                      className="mt-4"
                      style={{
                        backgroundColor: steps === 3 ? "rgba(4, 18, 66, 0.4)" : "",
                        color: steps === 3 ? "#fff" : "",
                      }}
                    >
                      Billings
                    </Button>
                  </li>
                </ul>



                <Button
                  variant="contained"
                  className="add-user pull-right mt-4"
                  onClick={() => setAddPayment(true)}
                  style={{ display: steps !== 3 ? "none" : "" }}
                >
                  Add Payment Method
            </Button>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div className="mt-4">
                {steps === 1 ? (
                  <Box>
                    <Card className="add-data-wrapper card-wraper-new-ui ">
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
                                  value={
                                    typeof subscription.orgName != "undefined" &&
                                      subscription.orgName !== ""
                                      ? subscription.orgName
                                      : ""
                                  }
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
                                  value={
                                    typeof subscription.domainName != "undefined"
                                      ? subscription.domainName
                                      : ""
                                  }
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
                              {/* <Grid item xs={12} style={{ marginLeft: "80px" }}>
                              <Button
                                color="primary"
                                type="submit"
                                onClick={handleCompanyUpdate}
                                className={"add-user"}
                              >
                                Update
                              </Button>
                            </Grid> */}
                            </Grid>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>

                    <Card className="card-wraper-new-ui-1 mt-4 mb-5">
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
                                  new Date(subscription.createdOn).getFullYear()}
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
                              <strong>{subscription.subscriptionPlanName}</strong>
                            </Typography>
                          </Box>
                        </Grid>
                        {/* </Grid>
                    <Grid container spacing={1}> */}
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
                        {/* <Grid item md={4}>
                        <Box
                          className="mt-2 mb-2"
                          style={{ textDecoration: "underline" }}
                        >
                          <NavLink to="#">Download Usage Detail</NavLink>
                        </Box>
                      </Grid> */}
                        <Grid item md={6}>
                          <Box
                            className="mt-2 mb-2"
                            style={{ textDecoration: "underline" }}
                          >
                            <NavLink to="#">Partner Information</NavLink>
                          </Box>
                        </Grid>
                      </Grid>
                    </Card>
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
                        <Card>
                          <CardContent>
                            <Typography
                              className="color-07 f-18"
                              variant="h5"
                              component="h5"
                            >
                              John Robert
                            <Chip
                                label="default"
                                color="primary"
                                className="pull-right"
                                style={{
                                  height: "28px",
                                  borderRadius: "7px",
                                  backgroundColor: "#36DEED",
                                }}
                              />
                            </Typography>
                            <Typography
                              className="color-08 f-24"
                              varient="h4"
                              component="h4"
                            >
                              xxxx xxxx xxxx 3434
                          </Typography>
                            <Typography
                              className="color-04 f-18"
                              varient="h6"
                              component="span"
                            >
                              Expiry Date{" "}
                              <Typography
                                className="color-07 ml-2"
                                variant="subtitle1"
                              >
                                09/22
                            </Typography>
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                      <Grid item xs={6}>
                        <Card>
                          <CardContent>
                            <Typography
                              className="color-07 f-18"
                              variant="h5"
                              component="h5"
                            >
                              John Robert
                            <Chip
                                label="secondary"
                                className="pull-right"
                                style={{
                                  height: "28px",
                                  borderRadius: "7px",
                                  backgroundColor: "#02F1B8",
                                  color: "#fff",
                                }}
                              />
                            </Typography>
                            <Typography
                              className="color-08 f-24"
                              varient="h4"
                              component="h4"
                            >
                              xxxx xxxx xxxx 5675
                          </Typography>
                            <Typography
                              className="color-04 f-18"
                              varient="h6"
                              component="span"
                            >
                              Expiry Date{" "}
                              <Typography
                                className="color-07 ml-2"
                                variant="subtitle1"
                              >
                                12/22
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
            <Grid container spacing={2} mt={4}>
              <Grid item xs={12}>
                <div className="mb-5 dashboard-header">
                  <h2>Current Plan</h2>
                  <Card className="mt-4">
                    <CardContent className="p-4">
                      <Grid container>
                        <Grid item xs={4}>
                          <img className="gold-img ml-3" src={gold} alt="Gold" />
                          <Typography className="gold-text ml-3" variant="h4">
                            GOLD
                        </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="mt-4">
                            <Typography className="color-05" variant="subtitle1">
                              Seats:
                          </Typography>
                            <Typography variant="subtitle2">
                              <strong className="color-06 ml-2">
                                {" "}
                                {subscription.totalSeats} Seats
                            </strong>
                            </Typography>
                          </div>
                        </Grid>
                        <Grid item xs={4}>
                          <div className="mt-4">
                            <Typography className="color-05" variant="subtitle1">
                              Billing Period:
                          </Typography>
                            <Typography
                              className="color-05 ml-2"
                              variant="subtitle2"
                            >
                              <strong> 2</strong>
                            </Typography>
                          </div>
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
