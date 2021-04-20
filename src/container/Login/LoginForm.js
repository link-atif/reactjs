import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Input,
  InputAdornment,
  TextField,
  IconButton,
} from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import Checkbox from "@material-ui/core/Checkbox";
import { NavLink } from "react-router-dom";
import "../../assets/css/main-style.css";
import Messages from "./../../components/Messages";
import EmailOutlinedIcon from "@material-ui/icons/EmailOutlined";
import ViewPassword from "../../assets/images/new-design/view-password.svg";

const LoginForm = ({
  errors,
  email,
  handleBlur,
  password,
  handleEmail,
  validEmail,
  handlePassword,
  rememberMe,
  handleRememberMe,
  handleSubmit,
  handleKeyPress,
  loadingClass,
  err,
}) => {
  // Add these variables to your component to track the state
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Box className="login-form-side">
      <Grid container className="login-form-side">
        <Box className="login-form-inner">
          <Typography variant="h2">Welcome to DataRovers</Typography>
          <div className="login-form">
            <Messages />
            <Box className="login-input-container" width={1}>
              <Grid container spacing={3} alignItems="flex-end">
                {/* <Grid item xs={1}>
                  <EmailOutlinedIcon />
                </Grid> */}
                <Grid item xs={12}>
                  <label className="new-input-lable">Email Address</label>
                  <Box className="input-new-design-icon">
                    <Input
                      autoComplete="off"
                      // onBlur={handleBlur}
                      id="input-with-icon-adornment"
                      className=""
                      placeholder="Email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmail}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="start">
                          <EmailOutlinedIcon />
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>

              {/* <div className="text-danger">{errors.email}</div> */}
              {err && email === "" ? (
                <div className="text-danger">Email is required</div>
              ) : null}

              {!validEmail ? (
                <div className="text-danger">Invalid email address</div>
              ) : null}
            </Box>
            <Box className="login-input-container">
              <Grid container spacing={3} alignItems="flex-end">
                {/* <Grid item xs={1}>
                  <LockOpenIcon />
                </Grid> */}
                <Grid item xs={12}>
                  <label className="new-input-lable">Password</label>
                  <Box className="input-new-design-icon">
                    <Input
                      id="input-with-icon-adornment"
                      className=""
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onKeyPress={handleKeyPress}
                      onChange={handlePassword}
                      fullWidth
                      endAdornment={
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </Box>
                </Grid>
              </Grid>
              {/* <div className="text-danger">{errors.password}</div> */}
              {err && password === "" ? (
                <div className="text-danger">Passowrd is required</div>
              ) : null}
            </Box>
            <Box className="login-input-container login-checkbox-outer">
              <FormControlLabel
                control={
                  <Checkbox
                    name="checkedC"
                    checked={rememberMe}
                    onChange={handleRememberMe}
                  />
                }
                label="Keep me Signed in"
              />
              <NavLink
                className="forgot-password"
                to="/forget-password"
                style={{ marginTop: "14px" }}
              >
                Reset Password?
              </NavLink>
            </Box>
            <Grid item xs={12}>
              <Button
                variant="contained"
                style={{
                  display: "block",
                  backgroundColor: "#0AE2B3",
                  padding: "12px 20px",

                  fontSize: "14px",
                  fontWeight: "600",
                  color: "#ffffff",
                  border: "none",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
                type="submit"
                fullWidth
                onClick={handleSubmit}
                className={"login-btn " + loadingClass}
              >
                Login
              </Button>
            </Grid>
          </div>
          <Box className="register-now-outer mb-0 mt-2">
            {/* <div className="border-line">
              <p>
                <span>or</span>
              </p>
            </div> */}
            <p className="sign-up-text mb-0">
              Don't have an account?{" "}
              <NavLink className="forgot-password register-btn" to="/register">
                Create an Account
              </NavLink>
            </p>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};

export default LoginForm;
