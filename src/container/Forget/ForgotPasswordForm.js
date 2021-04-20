import React from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Input,
  InputAdornment,
  TextField,
} from "@material-ui/core";
import EmailIcon from "@material-ui/icons/Email";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import "../../assets/css/main-style.css";
import Messages from "./../../components/Messages";
import EmailOutlinedIcon from '@material-ui/icons/EmailOutlined';

const ForgotPasswordForm = ({
  errors,
  err,
  email,
  password,
  handleBlur,
  handleEmail,
  validEmail,
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
          <Messages />
          <div className="login-form">
            <Grid className="login-input-container" sizeWidth={1}>
              <Grid container spacing={3} alignItems="flex-end">
                {/* <Grid item xs={1}>
                    <EmailOutlinedIcon />
                  </Grid> */}
                <Grid item xs={12}>
                  <label className="new-input-lable">Registered Email</label>
                  <Box className="input-new-design-icon">
                    <Input
                      name="email"
                      fullWidth
                      placeholder="Email"
                      // onBlur={handleBlur}
                      type="email"
                      value={email}
                      id="input-with-icon-adornment"
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
              {/* <div className="error-message" style={{ color: "red" }}>
                {errors.email}
              </div> */}
              {err && email === "" ? (
                <div className="text-danger">Email is required</div>
              ) : null}
              {validEmail === false ? (
                <div className="text-danger">Invalid email address</div>
              ) : null}
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
                className={"btn-primary " + loadingClass}
              >
                Reset Password
              </Button>
            </Grid>
          </div>
          <Typography className="register-now-outer">
            {/* <div className="border-line">
                <p>
                  <span>or</span>
                </p>
              </div> */}
            <p className="sign-up-text mb-0">
              Already have an account?{" "}
              <NavLink className="forgot-password register-btn" to="/login">
                Login
              </NavLink>
            </p>
          </Typography>
        </Box>
      </Grid>
      {/* </div> */}
    </Box>
  );
};

export default ForgotPasswordForm;
