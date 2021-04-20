import React, { useEffect, useState, useContext } from "react";
import {
  Fade,
  Box,
  Grid,
  TextField,
  Button,
  InputAdornment,
  Card,
  Input,
  CardContent,
  FormControl,
  makeStyles,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
} from "@material-ui/core";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import UploadCam from "../../../assets/images/new-design/camra-over.svg";

import { RootContext } from "../../../context/RootContext";
import Messages from "../../../components/Messages";
import { users } from "../../../actions";
import searchImg from "../../../assets/images/search.svg";
import userImage from "../../../assets/images/profile-2.jpg";
import UserDropdown from "../../UserDropdown";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import IconButton from "@material-ui/core/IconButton";
import FooterCopyright from "../../FooterCopyright";
import SearchBox from "../../../components/common/SearchBox";

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
  const [contactNo, setContactNo] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mfaChoice, setMfaChoice] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [steps, setSteps] = useState([
    "Profile",
    "Change Password",
    "Security",
  ]);
  const [active, setActive] = useState(0);
  const [userRow, setUserRow] = useState({});
  const [userbtn, setUserBtn] = useState(false);
  const [pawbtn, setPawBtn] = useState(false);
  const getProfile = () => {
    let user = {};
    user = JSON.parse(loginUserData);
    setUserRow(user);
    users.getUser(user.email).then((response) => {
      const data = response.data.data;
      if (data != "" && data != null) {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setUsername(data.displayName);
        setEmail(data.email);
        setContactNo(
          typeof data.contactNo != "undefined" ? data.contactNo : ""
        );
        setMfaChoice(data.mfaDeliverChoice);
        setUserRow(data);
        setUserimage(typeof data.img != "undefined" ? data.img : "");
      }
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
      const body = {
        id: userToken,
        password: newPassword,
        email: userRow.email,
      };
      users
        .changePassword(body)
        .then((response) => {
          setLoadingClass("");
          if (response.data.success == true) {
            setMessage({
              type: "success",
              message: response.data.message,
            });
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
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

    if (contactNo == "") {
      error = { ...error, contactNo: "Contact Number is required" };
      setErrors(error);
    }

    if (email == "") {
      error = { ...error, email: "Email is required" };
      setErrors(error);
    }

    if (error == null) {
      let user = JSON.parse(loginUserData);
      setUserRow(user);
      const body = {
        UserId: user.userId,
        FirstName: firstname,
        LastName: lastname,
        ContactNo: contactNo,
        email: user.email,
      };
      // console.log('requested user body is',user);return false;
      users
        .updateProfile(body)
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstname":
        setFirstName(value);
        break;
      case "lastname":
        setLastName(value);
        break;
      case "contactNo":
        setContactNo(value);
        break;
      case "email":
        setEmail(value);
        break;
    }
    setUserBtn(true);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
    }
    setPawBtn(true);
  };
  const handleActiveTab = (index) => {
    setActive(index);
    setMessage({
      type: "",
      message: "",
    });
  };
  const handleMcfChoise = (e) => {
    let val = e.target.value;
    users
      .updateMcfChoise(email, val)
      .then((response) => {
        setLoadingClass("");
        if (response.data.success == true) {
          setMessage({
            type: "success",
            message: response.data.message,
          });
          setMfaChoice(val);
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
        <h2 className="page-heading">My Profile</h2>

        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/">
              Home
            </Link>
            <Typography color="textPrimary">My Profile</Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <Grid container className="mt-2">
          <Grid item xs={12} md={6}>
            <Messages />
          </Grid>
        </Grid>

        <Card className="add-data-wrapper new-style-shawdow py-2 mt-4">
          <CardContent>
            <Grid container>
              <Grid item md={2}>
                <h2 className="new-style-sec-heading">Profile</h2>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  <Box
                    style={{
                      position: "relative",
                      marginTop: "10px",
                      marginLeft: "-15px",
                    }}
                  >
                    <div
                      style={{
                        width: "100px",
                        height: "100px",
                        // backgroundColor: "#F8FAFA",
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
                        top: "0px",
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
                  spacing={2}
                  mt={2}
                >
                  <Grid item xs={5} mt={1}>
                    <label className="new-input-lable">First Name</label>
                    <Input
                      placeholder="Company Name"
                      className="input-new-design"
                      type="text"
                      name="firstname"
                      value={firstname}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      inputProps={{
                        style: { color: "rgba(4, 18, 66, 0.6)" },
                      }}
                    />

                    <div className="error-message">{errors.firstname}</div>
                  </Grid>
                  <Grid item xs={5}>
                    <label className="new-input-lable">Last Name</label>
                    <Input
                      placeholder="Last Name"
                      className="input-new-design"
                      type="text"
                      name="lastname"
                      value={lastname}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      inputProps={{
                        style: { color: "rgba(4, 18, 66, 0.6)" },
                      }}
                    />

                    <div className="error-message">{errors.lastname}</div>
                  </Grid>
                  <Grid item xs={5} mt={4}>
                    <label className="new-input-lable">Phone</label>
                    <Input
                      placeholder="Phone"
                      className="input-new-design"
                      fullWidth
                      type="text"
                      label="Phone"
                      name="contactNo"
                      value={contactNo}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                      inputProps={{
                        style: { color: "rgba(4, 18, 66, 0.6)" },
                      }}
                    />

                    <div className="error-message">{errors.phone}</div>
                  </Grid>
                  <Grid item xs={5}>
                    <label className="new-input-lable">Email</label>
                    <Input
                      placeholder="Email"
                      className="input-new-design"
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => handleChange(e)}
                      fullWidth
                    />

                    <div className="error-message">{errors.email}</div>
                  </Grid>
                  {/* <Grid item xs={12} style={{ marginLeft: "80px" }}>
                    <Button
                      color="primary"
                      type="submit"

                      className={"add-user"}
                    >
                      Update
                                </Button>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>

            <Box
              className="my-4"
              style={{ borderBottom: "1px solid #E2E5ED" }}
            ></Box>

            <h2 className="new-style-sec-heading">Change Password</h2>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} mt={1}>
                <label className="new-input-lable">Old Password</label>
                <Input
                  id="standard-adornment-amount"
                  placeholder="Enter Password"
                  className="input-new-design"
                  // label="Old Password"
                  value={oldPassword}
                  name="oldPassword"
                  autoComplete="off"
                  variant="standard"
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                  inputProps={{
                    style: { color: "rgba(4, 18, 66, 0.6)" },
                  }}
                  fullWidth
                />
                <div className="text-danger">{errors.oldPassword}</div>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <label className="new-input-lable">New Password</label>
                <Input
                  id="standard-adornment-amount"
                  placeholder="Enter Password"
                  className="input-new-design"
                  value={newPassword}
                  name="newPassword"
                  autoComplete="off"
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                  fullWidth
                />
                <div className="text-danger">{errors.newPassword}</div>
              </Grid>
              <Grid item xs={12} md={4} mt={1}>
                <label className="new-input-lable">Confirm Password</label>
                <Input
                  id="standard-adornment-amount"
                  placeholder="Enter Password"
                  className="input-new-design"
                  value={confirmPassword}
                  name="confirmPassword"
                  autoComplete="off"
                  type="password"
                  onChange={(e) => handlePasswordChange(e)}
                  fullWidth
                  onKeyPress={(e) => handleKeyPress(e)}
                />

                <div className="text-danger">{errors.confirmPassword}</div>
              </Grid>
            </Grid>

            <Box
              className="my-4"
              style={{ borderBottom: "1px solid #E2E5ED" }}
            ></Box>

            <h2 className="new-style-sec-heading">Security</h2>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} mt={1}>
                <FormControl component="fieldset">
                  <FormLabel component="legend"></FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="Email"
                    className="outer-profile-radio"
                    onChange={(e) => handleMcfChoise(e)}
                  >
                    <FormControlLabel
                      value="Email"
                      className="profile-radio"
                      control={
                        <Radio
                          color="primary"
                          checked={mfaChoice == "Email" ? true : false}
                        />
                      }
                      label="Email"
                    >
                      abc@gmail.com{" "}
                    </FormControlLabel>
                    <FormControlLabel
                      value="Phone"
                      className="profile-radio"
                      control={
                        <Radio
                          color="primary"
                          checked={mfaChoice == "Phone" ? true : false}
                        />
                      }
                      label="Phone "
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>

            <Box
              className="my-4"
              style={{ borderBottom: "1px solid #E2E5ED" }}
            ></Box>

            <Button
              variant="contained"
              color="primary"
              type="submit"
              className={
                "new-coman-btn pull-right mb-3 shadow-none" + loadingClass
              }
              onClick={updateUser}
            >
              Save
            </Button>
          </CardContent>
        </Card>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default UsersProfileChangePassword;
