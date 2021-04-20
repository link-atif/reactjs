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
import Messages from "../../components/Messages";

const SecondForm = ({
  errors,
  handleCode,
  handleSubmit,
  code,
  handleKeyPress,
  handleVerificationCode,
  loadingClass,
  verificationLoadingClass,
  codeLength,
}) => {
  const references = useRef([]);
  const [codeValue, setCodeValue] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const formRef = createRef();
  useEffect(() => {
    codeLength.map((item, index) => {
      references.current[index] = createRef();
    });
  }, []);

  useEffect(() => {
    const codeValue = code.split("");
    setCodeValue(codeValue);
    const selectedIndex =
      codeValue.length < codeLength.length
        ? codeValue.length
        : codeLength.length - 1;
    if (selectedIndex !== 0) {
      references.current[selectedIndex].current.focus();
      references.current[selectedIndex].current.value = "";
    }
    setSelectedIndex(selectedIndex);
  }, [code, selectedIndex]);
  return (
    <Box className="login-form-side">
      <Grid container spacing={3} className="login-form-side">
        <Box className="login-form-inner">
          <h2>Confirm your Identity</h2>
          <Messages />
          <div className="login-form">
            <Grid className="login-input-container input-new-design-icon">
              <Input
                id="input-with-icon-adornment"
                className=""
                placeholder="Verification Code"
                type="number"
                name="code"
                value={code}
                onKeyPress={handleKeyPress}
                onChange={handleCode}
                maxLength={6}
                autoFocus
                fullWidth
                endAdornment={
                  <InputAdornment position="start">
                    <VpnKeyIcon />
                  </InputAdornment>
                }
              />
              <div className="error-message" style={{ color: "red" }}>
                {errors.code}
              </div>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <form ref={formRef} className="code-single-digit">
                  {codeLength.map((item, index) => {
                    return (
                      <input
                        ref={references.current[index]}
                        key={index}
                        value={codeValue[index]}
                        autoFocus={selectedIndex === index ? true : false}
                        onChange={handleCode}
                        id={`num${index}`}
                        onFocus={(e) => (e.target.value = "")}
                        placeholder={++index}
                        onKeyDown={handleKeyUP}
                        type="text"
                        maxLength="1"
                        size="1"
                        min="0"
                        max="9"
                        pattern="[0-9]{1}"
                      />
                    );
                  })}
                </form>
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
                onClick={handleSubmit}
                className={"btn-primary " + loadingClass}
              >
                Verify
              </Button>
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
            {/* <div className="border-line">
                <p>
                  <span>or</span>
                </p>
              </div> */}
            <p className="sign-up-text mb-0">
              Dont have an account yet?{" "}
              <NavLink className="forgot-password register-btn" to="/register">
                Register your Organization
              </NavLink>
            </p>
          </div>
        </Box>
      </Grid>
      {/* </div> */}
    </Box>
  );
};

export default SecondForm;
