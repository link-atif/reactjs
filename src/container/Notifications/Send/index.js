import React, { useContext, useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Box,
  Input,
  TextareaAutosize,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import {
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Fade,
  Card,
  CardContent,
  CardHeader,
} from "@material-ui/core";




import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import { RootContext } from "../../../context/RootContext";
import { Redirect, useHistory } from "react-router-dom";
import { common, users, notifications } from "../../../actions";
import Messages from "../../../components/Messages";
import searchImg from "../../../assets/images/search.svg";
import UserDropdown from "../../UserDropdown";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



const SendNotifications = () => {

  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [dateTime, setDateTime] = useState(
    new Date().toISOString().substring(0, 16)
  );

  const [errors, setErrors] = useState({});
  const { userToken, setMessage } = useContext(RootContext);
  const [loadingClass, setLoadingClass] = useState("");

  const [subscriptionPlan, setSubscriptionPlan] = useState([]);
  const [subscriptionPlanText, setSubscriptionPlanText] = useState("");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  const [subscriptionRole, setSubscriptionRole] = useState([]);
  const [subscriptionRoleText, setSubscriptionRoleText] = useState("");
  const [subscriptionsRoles, setSubscriptionsRoles] = useState([]);

  let user = {};

  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      sendMessage();
    }
  };

  const sendMessage = () => {
    var error = null;
    if (title == "") {
      error = { ...error, title: "Title is required" };
      setErrors(error);
    }

    if (body == "") {
      error = { ...error, body: "Message is required" };
      setErrors(error);
    }
    if (!subscriptionPlan.length > 0) {
      error = { ...error, subscriptionPlan: "Subscription Plan is required" };
      setErrors(error);
    }
    if (!subscriptionRole.length > 0) {
      error = { ...error, subscriptionRole: "Subscription Role is required" };
      setErrors(error);
    }

    if (error == null) {
      setLoadingClass("loading");
      const requestBody = {
        title: title,
        message: body,
        userId:
          userToken != "" ? userToken : "63067B71-C4B2-48A2-B518-93341C8DDBDA",
        subscriptionWithDomainIds:
          subscriptionPlan.length > 0 ? subscriptionPlan.reduce((acc, val, index) => {
            acc += `${val.subscriptionId}^${val.domainId}`;
            acc += (index + 1) < subscriptionPlan.length ? "," : "";
            return acc;
          }, "") : "",
        roleIds: subscriptionRole.length > 0 ? subscriptionRole.map(item => item.id).toString() : "",
      };
      // console.log('request body is ',requestBody);return false;
      notifications
        .sendNotification(requestBody)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success == true) {
            setTitle("");
            setBody("");
            setErrors("");
            setSubscriptionRole([]);
            setSubscriptionPlan([]);
            setMessage({
              type: "success",
              message: response.data.message,
            });
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          setLoadingClass("");
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
          console.log(error.response.data.status);
        });
    }
  };

  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
    common.getSubscriptionsRoles().then((response) => {
      setSubscriptionsRoles(response.data.data);
    });
    common.getActiveSubscription().then((response) => {
      setSubscriptionPlans(response.data.data);
    });
  }, []);

  const handleRole = (role) => {
    // setSubscriptionRole(e.roleId);
    let subscriptionRole = [];
    if (role.length > 0) {
      role.forEach((item) => {
        subscriptionRole.push({ id: item.roleId, name: item.name });
      });
    }
    setSubscriptionRole(subscriptionRole);
  };

  const handlePlan = (e) => {
    // setSubscriptionPlan(e.subscriptionId);
    console.log(e)
    let subscriptionPlan = [];
    if (e.length > 0) {
      e.forEach((item) => {
        subscriptionPlan.push({ subscriptionId: item.subscriptionId, domainId: item.domainId, name: item.name });
      });
    }
    setSubscriptionPlan(subscriptionPlan);
    // if (e.subscriptionId != "") {
    //   const subscriptionPlanText = subscriptionPlans.findIndex(
    //     (item) => item.subscriptionId === e.subscriptionId
    //   );
    //   setSubscriptionPlanText(
    //     subscriptionPlans[subscriptionPlanText].customerName
    //   );
    // }
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
              type="search "
              className="mt-0"
            />
          </div>
          <UserDropdown />
        </div>
      </header>

      <Box className="dashboard-main">
        <h2 className="page-heading">Notifications</h2>


        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/dr-services">
              Dashboard
            </Link>
            <Typography color="textPrimary">
              Notifications
            </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <div className="dashboard-content mt-3">
          <Card className="mt-3 crd-style-ui">
            <CardContent className="m-4">
              <Grid>
                <Messages />
                <Grid item md={12}>
                  <Box className="">
                    <Grid container spacing={3} alignItems="flex-end">
                      {/* <Grid item xs={1}>
                      <PersonOutlineIcon />
                    </Grid> */}
                      <Grid item xs={12}>
                        <label className="new-input-lable">
                          Select Subscription
                        </label>
                        <FormControl variant="standard" fullWidth>
                          <Box className="input-new-design-icon">
                            {/* <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined-country"
                      placeholder="Subscription Plan"
                      name="subscriptionPlan"
                      onChange={handlePlan}
                      variant="standard"
                    >
                      <MenuItem value="">
                        <em>Select Subscription Plan</em>
                      </MenuItem>
                      {typeof subscriptionPlans != "undefined" &&
                        subscriptionPlans.length > 0 &&
                        subscriptionPlans.map((item, index) => (
                          <MenuItem
                            key={item.subscriptionId}
                            value={item.subscriptionId}
                          >
                            {item.customerName}
                          </MenuItem>
                        ))}
                    </Select> */}
                            <Autocomplete
                              id="country-select-demo"
                              style={{ width: "100%" }}
                              options={subscriptionPlans}
                              value={subscriptionPlan}
                              autoHighlight
                              getOptionLabel={(subscriptionPlans) =>
                                subscriptionPlans.name
                              }
                              multiple
                              onChange={(event, value) => handlePlan(value)}
                              renderInput={(subscriptionPlans) => (
                                <TextField
                                  {...subscriptionPlans}
                                  placeholder="Select Subscription"
                                  variant="standard"
                                  className="input-new-drop-st"
                                />
                              )}
                            />
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  {errors.subscriptionPlan ? (
                    <div className="error-message text-danger">
                      {errors.subscriptionPlan}
                    </div>
                  ) : null}
                </Grid>

                <Grid item md={12}>
                  <Box mt={2} className="">
                    <Grid container spacing={3} alignItems="flex-end">
                      {/* <Grid item xs={1}>
                      <PersonOutlineIcon />
                    </Grid> */}
                      <Grid item xs={12}>
                        <label className="new-input-lable">
                          Select Subscription Role
                        </label>
                        <FormControl variant="standard" fullWidth>
                          <Box className="input-new-design-icon">
                            <Autocomplete
                              id="country-select-demo"
                              style={{ width: "100%" }}
                              options={subscriptionsRoles}
                              value={subscriptionRole}
                              autoHighlight
                              getOptionLabel={(subscriptionsRoles) =>
                                subscriptionsRoles.name
                              }
                              multiple
                              onChange={(event, value) => handleRole(value)}
                              renderInput={(subscriptionsRoles) => (
                                <TextField
                                  {...subscriptionsRoles}
                                  placeholder="Select Subscription Role"
                                  variant="standard"
                                  className="input-new-drop-st"
                                />
                              )}
                            />
                          </Box>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Box>
                  {errors.subscriptionRole ? (
                    <div className="error-message text-danger"> {errors.subscriptionRole}</div>
                  ) : null}
                </Grid>

                <Grid item md={12}>
                  <Box mt={2} className="">
                    <Grid container spacing={3} alignItems="flex-end">
                      {/* <Grid item xs={1}>
                      <PersonOutlineIcon />
                    </Grid> */}
                      <Grid item xs={12}>
                        <label className="new-input-lable">
                          Title
                        </label>
                        <Box className="input-new-design-icon">
                          <Input
                            type="text"
                            placeholder="Title"
                            name="title"
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                            value={title}
                            variant="standard"
                            fullWidth
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>

                  {errors.title ? (
                    <div className="error-message text-danger">{errors.title}</div>
                  ) : null}
                </Grid>
                <Grid item md={12}>
                  <Box mt={2} className="">
                    <Grid container spacing={3} alignItems="flex-end">
                      {/* <Grid item xs={1}>
                      <PersonOutlineIcon />
                    </Grid> */}
                      <Grid item xs={12}>
                        <label className="new-input-lable">
                          Date
                        </label>
                        <Box className="input-new-design-icon">
                          <Input
                            id="datetime-local"
                            placeholder="Date"
                            type="datetime-local"
                            name="dateTime"
                            onChange={(e) => {
                              setDateTime(e.target.value);
                            }}
                            // value={dateTime}
                            defaultValue={dateTime}
                            variant="standard"
                            fullWidth
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
                <Grid item md={12}>
                  <Box mt={2} className="">
                    <Grid container spacing={3} alignItems="flex-end">
                      {/* <Grid item xs={1}>
                      <PersonOutlineIcon />
                    </Grid> */}
                      <Grid item xs={12}>
                        <label className="new-input-lable">
                          Message
                        </label>
                        <Box className="input-new-design-icon">
                          <Input
                            type="text"
                            placeholder="Message"
                            multiline
                            rows={4}
                            rowsMax={4}
                            name="body"
                            onChange={(e) => {
                              setBody(e.target.value);
                            }}
                            value={body}
                            variant="standard"
                            fullWidth
                            onKeyPress={(e) => handleKeyPress(e)}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  {errors.body ? (
                    <div className="error-message text-danger">{errors.body}</div>
                  ) : null}
                </Grid>
                <Grid item md={12}>
                  <Box
                    style={{ float: 'left', }}
                    mt={5} mb={5}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      onClick={sendMessage}
                      style={{
                        display: "inline-block",
                        backgroundColor: "#0AE2B3",
                        padding: "10px 30px",
                        fontSize: "14px",
                        fontWeight: "400",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        textDecoration: "none",
                        float: "right",
                        boxShadow: "none"
                      }}
                      className={"custom-btn " + loadingClass}
                    >
                      Send Notification
                </Button>
                  </Box>
                </Grid>
              </Grid>


            </CardContent>
          </Card>
        </div>
      </Box>
    </>
  );
};

export default SendNotifications;
