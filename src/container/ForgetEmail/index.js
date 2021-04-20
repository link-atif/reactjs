import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { Typography, Container, Fade } from "@material-ui/core";
import logoDO from "../../assets/images/Logo.svg";
import "../../assets/css/main-style.css";
import ForgotPasswordForm from "./ForgotPasswordForm";
import { users } from "../../actions/index";
import Messages from "./../../components/Messages";

import axios from "../../axios";
import { RootContext } from "../../context/RootContext";

const Forgotpassword = () => {
  const { userToken, setUserToken, setMessage } = useContext(RootContext);
  const history = useHistory();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  let { autCode } = useParams();

  const resetPassword = () => {
    var error = null;
    if (password == "") {
      error = { ...error, password: "Password is requried" };
      setErrors(error);
    }
    if (confirmPassword == "") {
      error = { ...error, confirmPassword: "Confirm Password is requried" };
      setErrors(error);
    }
    if (password != confirmPassword) {
      error = {
        ...error,
        confirmPassword: "Confirm Password don't match New Password",
      };
      setErrors(error);
    }
    if (error == null) {
      setLoadingClass("loading");
      users
        .resetPassword({ code: autCode, password: password })
        .then((response) => {
          if (response.data.success === true) {
            setLoadingClass("");
            setMessage({
              type: "success",
              message: response.data.message,
            });
            setTimeout(function () {
              history.push("/login");
            }, 5000);
           
          } else {
            setLoadingClass("");
            setMessage({
              type: "error",
              message: response.data.message,
            });
          }
        })
        .catch((error) => {
          console.log(error.response.data);
          setLoadingClass("");
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
          setErrors(error.response.data);
          console.log(error.response.data.status);
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      resetPassword();
    }
  };

  if (userToken) {
    history.push("/");
  }

  useEffect(() => {
    axios.get(`https://roversmwdev.azurewebsites.net/token`).then((res) => {
      console.log(res.data.data);
      localStorage.setItem("applicationToken", res.data.data);
    });
    setMessage({
      type: "",
      message: "",
    });
  }, []);

  return (
    <React.Fragment>
      {/* <div className="login-logo-side">
        <img src={logoDO} alt="DataRovers Logo" />
      </div> */}
      <div className="login-logo-side">
        <a href="/login">
          <img src={logoDO} alt="DataRovers Logo" />
        </a>
      </div>

      <ForgotPasswordForm
        errors={errors}
        confirmPassword={confirmPassword}
        password={password}
        handleConfirmPassword={(e) => setConfirmPassword(e.target.value)}
        handlePassword={(e) => setPassword(e.target.value)}
        handleKeyPress={handleKeyPress}
        handleSubmit={resetPassword}
        loadingClass={loadingClass}
      />
    </React.Fragment>
  );
};
export default Forgotpassword;
