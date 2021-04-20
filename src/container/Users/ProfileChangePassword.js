import React, { useEffect, useState, useContext } from "react";
// import "./styles.scss";
import {
  Fade,
  Box,
  Grid,
  Input,
  TextField,
  Button,
  InputAdornment,
  Card,
  CardContent,
  InputLabel,
  Avatar,
  FormControl,
  makeStyles,
} from "@material-ui/core";
import PageHeader from "../../components/common/PageHeader";
import { RootContext } from "../../context/RootContext";
import Messages from "../../components/Messages";
import { users } from "../../actions";
import searchImg from "../../assets/images/search.svg";
import userImage from "../../assets/images/profile.png";
import UserDropdown from "../UserDropdown";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";

import { relativeLength } from "highcharts";
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));
const UsersProfileChangePassword = () => {
  const classes = useStyles();
  const { userToken, setUserToken, setMessage, loginUserData } = useContext(
    RootContext
  );

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [userimage, setUserimage] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [steps, setSteps] = useState(["Profile", "Change Password"]);
  const [active, setActive] = useState(0);
  const [userRow, setUserRow] = useState({});
  let user = {};
  const getProfile = () => {
    user = JSON.parse(loginUserData);
    setUserRow(user);
    users.getUser(user.userId).then((response) => {
      const data = response.data.data;
      setFirstName(data.firstName);
      setLastName(data.lastName);
      setUsername(data.displayName);
      setEmail(data.email);
      setUserRow(data);
      setUserimage(typeof data.img != "undefined" ? data.img : "");
    });
  };
  useEffect(() => {
    getProfile();
    setMessage({
      type: "",
      message: "",
    });
  }, []);
  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      if (active == 0) {
        updateUser();
      } else {
        handleChangePassowrd();
      }
    }
  };
  const handleChangePassowrd = () => {
    let user_id = userToken;
    var error = null;

    if (oldPassword == "") {
      error = { ...error, oldPassword: "Old Password is required" };
      setErrors(error);
    }
    if (newPassword == "") {
      error = { ...error, newPassword: "Password is required" };
      setErrors(error);
    }

    if (newPassword.length < 8) {
      error = { ...error, newPassword: "Password must be 8 characters" };
      setErrors(error);
    }

    if (newPassword.match(/\d+/g) == null) {
      error = { ...error, newPassword: "Password must have one digit" };
      setErrors(error);
    }

    if (newPassword.match(/[A-Z]/) == null) {
      error = {
        ...error,
        newPassword: "Password must have one Uppercase letter",
      };
      setErrors(error);
    }

    if (newPassword.match(/[^A-Z a-z0-9]/) == null) {
      error = {
        ...error,
        newPassword: "Password must contain speical character",
      };
      setErrors(error);
    }

    if (confirmPassword == "") {
      error = { ...error, confirmPassword: "Confirm Password is required" };
      setErrors(error);
    }

    if (newPassword != confirmPassword) {
      error = {
        ...error,
        confirmPassword: "Confirm Password must equal to New Password",
      };
      setErrors(error);
    }

    if (error == null) {
      setErrors({});
      setLoadingClass("loading");
      const body = { id: userToken, password: newPassword };
      users
        .changePassword(body)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success == true) {
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
          console.log(error.response.data);
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
          console.log(error.response.data.status);
        });
    }
  };

  const updateUser = () => {
    var error = null;
    if (firstname == "") {
      error = { ...error, firstname: "Firstname is required" };
      setErrors(error);
    }
    if (lastname == "") {
      error = { ...error, lastname: "Lastname is required" };
      setErrors(error);
    }

    if (username == "") {
      error = { ...error, username: "User Name is required" };
      setErrors(error);
    }

    if (email == "") {
      error = { ...error, email: "Email is required" };
      setErrors(error);
    }

    if (error == null) {
      user = JSON.parse(loginUserData);
      setUserRow(user);
      let userRoles = [];
      if (user.roles.length > 0) {
        for (var i = 0; i < user.roles.length; i++) {
          userRoles.push({ roleId: user.roles[i].roleId });
        }
      }

      // setLoadingClass("loading");
      // const body = new FormData();
      // body.append("userId", user.userId);
      // body.append("firstname", user.firstname);
      // body.append("lastname", user.lastname);
      // body.append("email", user.email);
      // body.append("displayname", user.username);
      // body.append("roles", user.userRoles);
      const body = {
        userId: user.userId,
        firstname: firstname,
        lastname: lastname,
        email: email,
        displayName: username,
        isActive: true,
        domainId: user.domainId,
      };
      // console.log('requested user body is',user);return false;
      users
        .updateUser(body)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success == true) {
            setMessage({
              type: "success",
              message: response.data.message,
            });
            getProfile();
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          setLoadingClass("");
          console.log(error.response.data);
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
          console.log(error.response.data.status);
        });
    }
  };

  return (
    <Fade in>
      <Box className="dashboard-main">
        <header className="dashboard-header">
          <h2>My Profile</h2>
          <div className="header-search-main">
            <div className="seach-form">
              <img src={searchImg} alt="Search" />
              <TextField
                id="standard-search"
                type="search"
                fullWidth
                className="mt-0"
              />
            </div>
            <UserDropdown />
          </div>
        </header>
        <div className="dashboard-content">
          <Grid container spacing={3}>
            <Grid item xs={12} className="subcription-tabs">
              {steps.map((item, index) => {
                return (
                  <Button
                    variant="contained"
                    color="default"
                    onClick={() => setActive(index)}
                    className="btn-default mt-4 ml-2"
                    style={{
                      backgroundColor:
                        index == active ? "rgba(4, 18, 66, 0.4)" : "",
                      color: index == active ? "#fff" : "",
                    }}
                  >
                    {item}
                  </Button>
                );
              })}
            </Grid>
          </Grid>
          <Card className="mt-4">
            <CardContent>
              <Messages />
              <div
                className="password-section add-data-wrapper mx-3"
                style={{ display: active !== 1 ? "none" : "" }}
              >
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Box pt={2} className="add-user-input-outer">
                      <Input
                        id="standard-adornment-amount"
                        value={oldPassword}
                        name="old_password"
                        autoComplete="off"
                        variant="standard"
                        type="password"
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Old Password"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                      />
                      <div className="text-danger">{errors.oldPassword}</div>
                    </Box>
                  </Grid>
                </Grid>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <Box pt={2} className="add-user-input-outer">
                      <Input
                        id="standard-adornment-amount"
                        value={newPassword}
                        name="password"
                        autoComplete="off"
                        variant="standard"
                        type="password"
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="New Password"
                        fullWidth
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                      />
                      <div className="text-danger">{errors.newPassword}</div>
                    </Box>
                  </Grid>
                  <Grid item md={6}>
                    <Box pt={2} className="add-user-input-outer">
                      <Input
                        id="standard-adornment-amount"
                        value={confirmPassword}
                        name="password"
                        autoComplete="off"
                        variant="standard"
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        fullWidth
                        onKeyPress={(e) => handleKeyPress(e)}
                        startAdornment={
                          <InputAdornment position="start">
                            <LockOutlinedIcon />
                          </InputAdornment>
                        }
                      />
                      <div className="text-danger">
                        {errors.confirmPassword}
                      </div>
                    </Box>
                  </Grid>
                </Grid>
                <Box pt={4}>
                  <Button
                    variant="contained"
                    type="submit"
                    color="succes"
                    style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                    className={"custom-btn " + loadingClass}
                    onClick={handleChangePassowrd}
                  >
                    Update
                  </Button>
                </Box>
              </div>
              <div
                className="password-section add-data-wrapper mx-3"
                style={{ display: active !== 0 ? "none" : "" }}
              >
                <Grid container spacing={3}>
                  <Grid item md={2}>
                    <Box pt={5} pt={5}>
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
                              border: "2px solid #cbe2ff",
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
                          onChange={(e) => setUserimage(e.target.files[0])}
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
                    </Box>
                  </Grid>
                  <Grid item md={10}>
                    <Grid container spacing={4} mt={5}>
                      <Grid item md={6}>
                        <Box>
                          <TextField
                            type="text"
                            label="First Name"
                            name=""
                            value={firstname}
                            onChange={(e) => setFirstName(e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                          <div className="error-message">
                            {errors.firstname}
                          </div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <TextField
                            type="text"
                            label="Last Name"
                            name=""
                            value={lastname}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                          <div className="error-message">{errors.lastname}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <TextField
                            type="text"
                            label="User Name"
                            name=""
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                          <div className="error-message">{errors.username}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box>
                          <TextField
                            type="text"
                            label="Email"
                            name=""
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            fullWidth
                          />
                          <div className="error-message">{errors.lastname}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box mt={2} className="add-user-input-outer">
                          <FormControl
                            className={classes.margin}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="input-with-icon-adornment">
                              First Name
                            </InputLabel>
                            <Input
                              id="input-with-icon-adornment"
                              className="mt-0"
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                              startAdornment={
                                <InputAdornment position="start">
                                  <PermIdentityIcon />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <div className="text-danger">{errors.firstname}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box mt={2} className="add-user-input-outer">
                          <FormControl
                            className={classes.margin}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="input-with-icon-adornment">
                              Last Name
                            </InputLabel>
                            <Input
                              id="input-with-icon-adornment"
                              className="mt-0"
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                              startAdornment={
                                <InputAdornment position="start">
                                  <PermIdentityIcon />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <div className="text-danger">{errors.lastname}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box className="add-user-input-outer">
                          <FormControl
                            className={classes.margin}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="input-with-icon-adornment">
                              User Name
                            </InputLabel>
                            <Input
                              id="input-with-icon-adornment"
                              className="mt-0"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              startAdornment={
                                <InputAdornment position="start">
                                  <PermIdentityIcon />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <div className="text-danger">{errors.username}</div>
                        </Box>
                      </Grid>
                      <Grid item md={6}>
                        <Box className="add-user-input-outer">
                          <FormControl
                            className={classes.margin}
                            style={{ width: "100%" }}
                          >
                            <InputLabel htmlFor="input-with-icon-adornment">
                              Email
                            </InputLabel>
                            <Input
                              id="input-with-icon-adornment"
                              className="mt-0"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              onKeyPress={(e) => handleKeyPress(e)}
                              startAdornment={
                                <InputAdornment position="start">
                                  <EmailOutlinedIcon />
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                        </Box>
                        <div className="text-danger">{errors.email}</div>
                      </Grid>
                    </Grid>
                    <Box pt={4}>
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                        className={"custom-btn " + loadingClass}
                        onClick={updateUser}
                      >
                        Update
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </div>
            </CardContent>
          </Card>
        </div>
      </Box>
    </Fade>
  );
};

export default UsersProfileChangePassword;
