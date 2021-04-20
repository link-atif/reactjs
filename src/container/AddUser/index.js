import React, { useEffect, useState, useContext } from "react";
import {
  Fade,
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Checkbox,
  Input,
  InputAdornment
} from "@material-ui/core";

import "./styles.scss";
import Messages from "../../components/Messages";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import LocalPhoneOutlinedIcon from "@material-ui/icons/LocalPhoneOutlined";
import { RootContext } from "./../../context/RootContext";

import AddUserHeading from "../../assets/images/new-design/add-user-io.svg";
import FirstIcon from "../../assets/images/new-design/first-name.svg";
import phoneIcon from "../../assets/images/new-design/reg-phone.svg";
import WorkEmail from "../../assets/images/new-design/work-Email.svg";
import LockIcon from "../../assets/images/new-design/sec-lock.svg";

const AddUser = ({
  selectdRoles,
  selectedUser,
  handleSave,
  handleFirstName,
  handleLastName,
  handleEmail,
  handleContact,
  handleDisplayName,
  handlePassword,
  handleAutoPassword,
  firstName,
  lastName,
  displayName,
  email,
  contactNo,
  password,
  updateDisplayName,
  allRoles,
  selectUserRoles,
  loadingClass,
  containsNumb,
  passLength,
  isUpperCase,
  btnStatus,
  passwordGenerator,
  randomPassword,
  speicalCharacter,
  handleKeyPress,
  errors,
  userStatus,
  setStatus,
  mfaChoice,
  handleMfaChoice,
}) => {
  const { setMessage } = useContext(RootContext);
  const handleReset = () => {
    console.log("Resetting");
  };

  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
  }, [selectedUser]);

  const handleSubmit = (values, actions) => {
    console.log("submitting", values, actions);
  };
  const [domain, setDomain] = React.useState("");

  const handleFormChange = (data) => { };

  const onDomainChange = (data) => {
    setDomain(data.target.value);
  };

  const checkRoleSelected = (role) => {
    if (selectdRoles && selectdRoles.length === 0) {
      return false;
    }
    if (selectdRoles.findIndex((item) => item === role) === -1) {
      return false;
    } else {
      return true;
    }
  };

  const [copySuccess, setCopySuccess] = useState("");
  const copyToClipboard = () => {
    let pass = randomPassword;
    navigator.clipboard.writeText(pass);
    setCopySuccess("Copied!");
  };
  return (
    <Box>
      <div className="add-user-layer">
        <Box >
          <Typography className="add-user-title" variant="h6"><img className="mr-2" src={AddUserHeading} alt="icon" />
            {Object.keys(selectedUser).length > 0
              ? "Update User"
              : "Add New User"}{" "}
          </Typography>
        </Box>
        {/* <Box className="sign-up-line"></Box> */}
        <Box>
          <Grid container spacing={3}>
            <Grid item md={12} className="mr-2">
              <Messages />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">

                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      First Name
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        type="text"
                        onChange={handleFirstName}
                        name="firstname"
                        fullWidth
                        value={firstName}
                        autoComplete="off"
                        placeholder="First Name"
                        InputProps={{}}
                        endAdornment={
                          <InputAdornment position="start">
                            <img src={FirstIcon} alt="icon" />
                            {/* <PersonOutlineIcon /> */}
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>

                <div className="text-danger">
                  {typeof errors != "undefined" && errors.firstName}
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">

                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      Last Name
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="Last Name"
                        onChange={handleLastName}
                        name="lastname"
                        autoComplete="off"
                        onBlur={updateDisplayName}
                        fullWidth
                        value={lastName}
                        autoComplete="off"
                        InputProps={{}}
                        endAdornment={
                          <InputAdornment position="start">
                            <img src={FirstIcon} alt="icon" />
                            {/* <PersonOutlineIcon /> */}
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>

                <div className="text-danger">
                  {typeof errors != "undefined" && errors.lastName}
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">

                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      Display Name
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="Display Name"
                        onChange={handleDisplayName}
                        name="displayName"
                        autoComplete="off"
                        value={displayName}
                        fullWidth
                        type="text"
                        InputProps={{}}
                        endAdornment={
                          <InputAdornment position="start">
                            <img src={FirstIcon} alt="icon" />
                            {/* <PersonOutlineIcon /> */}
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">
                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      Phone
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="Phone"
                        onChange={handleContact}
                        // defaultValue={selectedUser.contactNo || ""}
                        name="contactNo"
                        autoComplete="off"
                        fullWidth
                        type="text"
                        maxLength="5"
                        value={selectedUser.contactNo || contactNo}
                        onKeyUp={(e) => {
                          let x = e.target.value
                            .replace(/\D/g, "")
                            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
                          console.log("value of x is ", x);
                          e.target.value = !x[2]
                            ? x[1]
                            : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
                          // e.target.value = e.target.value
                          //   .replace(/\D+/g, "")
                          //   //   // .replace(/(\d{3})(\d{3})(\d{4})/, "+1($1) $2-$3");
                          //   .replace(/^(\d{3})(\d)/, "+1($1)-$2")
                          //   .replace(/^(\d{4}-\d{4})(\d)/, "$1-$2");
                        }}
                        InputProps={{
                          maxLength: 5,
                        }}
                        endAdornment={
                          <InputAdornment position="start">
                            <img src={phoneIcon} alt="icon" />
                            {/* <LocalPhoneOutlinedIcon /> */}
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>

                <div className="text-danger">
                  {typeof errors != "undefined" && errors.contactNo}
                </div>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Box className="">
                <Grid container spacing={3} alignItems="flex-end">

                  <Grid item xs={12}>
                    <label className="new-input-lable">
                      Email
                    </label>
                    <Box className="input-new-design-icon">
                      <Input
                        placeholder="Email"
                        onChange={handleEmail}
                        defaultValue={selectedUser.email || ""}
                        name="email"
                        autoComplete="off"
                        fullWidth
                        onKeyPress={handleKeyPress}
                        type="text"
                        value={email}
                        InputProps={{}}
                        endAdornment={
                          <InputAdornment position="start">
                            <img src={WorkEmail} alt="icon" />
                            {/* <LocalPhoneOutlinedIcon /> */}
                          </InputAdornment>
                        }
                      />
                    </Box>
                  </Grid>
                </Grid>

                <div className="text-danger">
                  {typeof errors != "undefined" && errors.email}
                </div>
              </Box>
            </Grid>
          </Grid>

          <Box className="sign-up-line"></Box>

          <Grid container spacing={3}>
            <Grid item md={12}>
              {Object.keys(selectedUser).length < 1 ? (
                <>
                  <Box mt={3} mb={3}>
                    <FormControl component="fieldset" className="w-100">
                      <label className="new-input-lable">
                        Password
                    </label>
                      {/* <FormLabel component="legend"></FormLabel> */}
                      <RadioGroup
                        aria-label="position"
                        name="passwordType"
                        defaultValue="manual"
                      >
                        <Grid container spacing={2}>
                          <Grid item md={6}>
                            <FormControlLabel
                              value="auto-generated"
                              control={<Radio color="primary" />}
                              label="Auto-generate"
                              name="passwordSetting"
                              className="mr-0"
                              value="auto"
                              onChange={handleAutoPassword}
                            />
                          </Grid>
                          <Grid item md={6}>
                            {passwordGenerator !== true && (
                              <div className="auto-generated-password mt-2">
                                <span>{randomPassword}</span>
                                <FileCopyOutlinedIcon
                                  className="color-05 ml-1"
                                  onClick={copyToClipboard}
                                />
                                {copySuccess}
                              </div>
                            )}
                          </Grid>
                        </Grid>

                        <FormControlLabel
                          value="manual"
                          control={<Radio color="primary" />}
                          label="Let me create"
                          name="passwordSetting"
                          value="manual"
                          onChange={handleAutoPassword}
                        />
                      </RadioGroup>
                    </FormControl>
                  </Box>
                  <Grid container spacing={3}>
                    <Grid item md={12}>
                      <Box className="">
                        <Grid container spacing={3} alignItems="flex-end">

                          <Grid item xs={12}>
                            <Box className="input-new-design-icon">
                              {passwordGenerator !== false && (
                                <Input
                                  placeholder="Password"
                                  onChange={handlePassword}
                                  defaultValue={selectedUser.password}
                                  name="password"
                                  autoComplete="off"
                                  onKeyPress={handleKeyPress}
                                  InputProps={{}}
                                  fullWidth
                                  type="password"
                                  disabled={passwordGenerator !== true}
                                  endAdornment={
                                    <InputAdornment position="start">
                                      <img src={LockIcon} alt="icon" />
                                      {/* <LockOutlinedIcon /> */}
                                    </InputAdornment>
                                  }
                                />
                              )}
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>

                      {passwordGenerator === true &&
                        password &&
                        password.length > 0 && (
                          <div className="password-instructions">
                            <ul>
                              <li
                                className={
                                  passLength
                                    ? "custom-messag-color"
                                    : "text-danger"
                                }
                              >
                                Contains more than 8 characters
                              </li>
                              <li
                                className={
                                  speicalCharacter
                                    ? "custom-messag-color"
                                    : "text-danger"
                                }
                              >
                                Password must contain speical character
                              </li>
                              <li
                                className={
                                  containsNumb
                                    ? "custom-messag-color"
                                    : "text-danger"
                                }
                              >
                                Contains numbers
                              </li>
                              <li
                                className={
                                  isUpperCase
                                    ? "custom-messag-color"
                                    : "text-danger"
                                }
                              >
                                Contains Uppercase
                              </li>
                            </ul>
                          </div>
                        )}
                      <div className="text-danger">
                        {typeof errors != "undefined" && errors.password}
                      </div>
                    </Grid>
                  </Grid>
                </>
              ) : null}
            </Grid>
          </Grid>
          {Object.keys(selectedUser).length > 0 ? (
            <Grid container spacing={3}>
              <Grid item md={12}>
                <h4>User Status</h4>
                <FormControlLabel
                  value="end"
                  name="roles"
                  onChange={() => setStatus()}
                  control={<Checkbox color="primary" checked={userStatus} />}
                  label="Is Active"
                />
              </Grid>
            </Grid>
          ) : null}

          <Box className="sign-up-line"></Box>

          <Grid container spacing={3}>
            <Grid item md={12} className="mt-3">
              <label className="new-input-lable">
                Roles
              </label>
              {/* <h4>Roles</h4> */}
              {allRoles &&
                allRoles.length > 0 &&
                allRoles.map((item, index) => (
                  <div key={index}>
                    <FormControlLabel
                      value="end"
                      name="roles"
                      key={item.roleId}
                      onChange={() => selectUserRoles(item.roleId)}
                      control={
                        <Checkbox
                          color="primary"
                          checked={checkRoleSelected(item.roleId)}
                        />
                      }
                      label={item.name}
                    />
                  </div>
                ))}
            </Grid>
          </Grid>
          {/* {console.log("defulat mfaChoise is ", mfaChoice)} */}

          <Box className="sign-up-line"></Box>
          <Grid container spacing={3}>
            <Grid item md={12} className="mt-1">
              <label className="new-input-lable">
                Mfa Choice
              </label>
              {/* <h4>Mfa Choice</h4> */}
              <Box mt={2} mb={2}>
                <FormControl component="fieldset" className="w-100">
                  <RadioGroup
                    aria-label="position"
                    name="passwordType"
                    defaultValue={mfaChoice}
                  >
                    <FormControlLabel
                      value="auto-generated"
                      control={<Radio color="primary" />}
                      label="Email"
                      name="passwordSetting"
                      className="mr-0"
                      value="email"
                      onChange={handleMfaChoice}
                    />

                    <FormControlLabel
                      control={<Radio color="primary" />}
                      label="Phone"
                      name="passwordSetting"
                      value="phone"
                      onChange={handleMfaChoice}
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          <Box mt={3} mb={3} className="text-center custom-add-btn mr-2">
            {passwordGenerator ? (
              <Button
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleSave}
                style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                className={"custom-btn " + loadingClass}
              >
                {Object.keys(selectedUser).length > 0 ? "Update User" : "Add"}
              </Button>
            ) : (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  fullWidth
                  onClick={handleSave}
                  style={{
                    display: "block",
                    backgroundColor: "#0AE2B3",
                    padding: "12px 20px",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#ffffff",
                    border: "none",
                    width: "100%",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    boxShadow: "none"
                  }}
                  className={"custom-btn" + loadingClass}
                >
                  {Object.keys(selectedUser).length > 0 ? "Update User" : "Add"}
                </Button>
              )}
          </Box>
        </Box>
      </div>
    </Box>
  );
};

export default AddUser;
