import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  FormControlLabel,
  Input,
  InputAdornment,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import "../../assets/css/main-style.css";
import Messages from "./../../components/Messages";

const ForgotPasswordForm = ({
  errors,
  confirmPassword,
  password,
  handleConfirmPassword,
  handlePassword,
  handleSubmit,
  handleKeyPress,
  loadingClass,
}) => {
  return (
    <Box className="login-form-side">
      {/* <div className="login-form-inner mt-4"> */}
      <Grid container spacing={3} className="login-form-side">
        <Box className="login-form-inner">
          <h2>Reset Password</h2>
          <Box>
            <Messages />
          </Box>
          <div className="login-form">

            <Grid className="login-input-container" sizeWidth={1}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12}>
                  <label className="new-input-lable">New Password</label>
                  <Box className="input-new-design-icon">
                    <Input
                      id="input-with-icon-adornment"
                      // className="login-input-field"
                      placeholder="New Password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={handlePassword}
                      // variant="outlined"
                      fullWidth
                      endAdornment={
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <div className="text-danger">{errors.password}</div>
                </Grid>
              </Grid>
            </Grid>

            <Grid className="login-input-container" sizeWidth={1}>
              <Grid container spacing={3} alignItems="flex-end">
                <Grid item xs={12}>
                  <label className="new-input-lable">Confirm Password</label>
                  <Box className="input-new-design-icon">
                    <Input
                      id="input-with-icon-adornment"
                      // className="login-input-field"
                      placeholder="Confirm Password"
                      type="password"
                      value={confirmPassword}
                      onKeyPress={handleKeyPress}
                      onChange={handleConfirmPassword}
                      // variant="outlined"
                      fullWidth
                      endAdornment={
                        <InputAdornment position="start">
                          <LockOpenIcon />
                        </InputAdornment>
                      }
                    />
                  </Box>
                  <div className="text-danger">{errors.confirmPassword}</div>
                </Grid>
              </Grid>
            </Grid>



            <Grid item xs={12}>
              <Button
                style={{
                  display: "block",
                  backgroundColor: "#0AE2B3",
                  padding: "12px",
                  margin: "20px 0",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#ffffff",
                  border: "none",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  letterSpacing: "0.8px",
                  boxShadow: "none",
                }}
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleSubmit}
                className={"login-btn " + loadingClass}
              >
                Reset Password
                </Button>
            </Grid>
          </div>
          {/* <Typography className="register-now-outer">
              <div className="border-line">
                <p>
                  <span>or</span>
                </p>
              </div>
              <p>
                Dont have an account yet?{" "}
                <NavLink
                  className="forgot-password register-btn"
                  to="/register"
                >
                  Sign Up
                </NavLink>
              </p>
            </Typography> */}
        </Box>
      </Grid>
      {/* </div> */}
    </Box>
  );
};

export default ForgotPasswordForm;
