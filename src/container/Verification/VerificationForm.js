import React, { useEffect, useState, createRef } from "react";
import {
  Box,
  Typography,
  Grid,
  Button,
  Input,
  InputAdornment,
} from "@material-ui/core";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import logoDO from "../../assets/images/data-rovers-logo.png";
import "../../assets/css/main-style.css";
import Messages from "./../../components/Messages";
import { useRef } from "react";
import ReactCodeInput from "react-verification-code-input";

const VerificationForm = ({
  errors,
  handleCode,
  handleSubmit,
  code,
  handleKeyPress,
  handleVerificationCode,
  loadingClass,
  verificationLoadingClass,
  codeLength,
  handleKeyUP,
}) => {
  const references = useRef([]);
  const [codeValues, setCodeValues] = useState([]);
  useEffect(() => {
    let newcode = code.split("");
    setCodeValues(newcode);
  }, [code]);
  return (
    <Box className="login-form-side">
      <Grid container spacing={3} className="login-form-side">
        <Box className="login-form-inner">
          <h2>Confirm your Identity</h2>
          <Messages />
          <div className="login-form mt-3">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <ReactCodeInput
                  type="number"
                  values={codeValues}
                  placeholder={codeLength}
                  onChange={handleCode}
                  loading={loadingClass !== "" ? true : false}
                />
                <div className="error-message" style={{ color: "red" }}>
                  {errors.code}
                </div>
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
                  letterSpacing: "0.8px",
                  color: "#ffffff",
                  border: "none",
                  width: "100%",
                  borderRadius: "10px",
                  cursor: "pointer",
                  textDecoration: "none",
                  boxShadow: "none",
                }}
                variant="contained"
                type="submit"
                fullWidth
                onClick={handleVerificationCode}
                className={"btn-primary " + verificationLoadingClass}
              >
                Send Code Again
              </Button>
            </Grid>
          </div>
          <div className="register-now-outer mb-0 mt-2">
            <p className="sign-up-text mb-0">
              Dont have an account yet?{" "}
              <NavLink className="forgot-password register-btn" to="/register">
                Create an Account
              </NavLink>
            </p>
          </div>
        </Box>
      </Grid>
      {/* </div> */}
    </Box>
  );
};

export default VerificationForm;
