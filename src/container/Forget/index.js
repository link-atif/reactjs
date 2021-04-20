import React, { useContext, useState, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
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

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [validEmail, setValidEmail] = useState(true);
  const [loadingClass, setLoadingClass] = useState("");

  
const [err, setErr] = useState(false);

  
   const isEmail = (val) => {
     let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     if (!regEmail.test(val)) {
       setValidEmail(false);
     } else {
       setValidEmail(true);
     }
   };

   const handleEmail = (e) => {
     setEmail(e.target.value.trim());
      if (e.target.value.trim() === "") {
        setValidEmail(true);
      }
   };
  
  const handleBlur = () => {
    isEmail(email);
  };
  
  
  
  const forgotUser = () => {

 if (email === "") {
   setErr(true);
 } else {
   setErr(false);
 }

    var error = null;
    if (email == "") {
      error = { ...error, email: "Email is required" };
      setErrors(error);
    }
      if (email) {
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!regEmail.test(email)) {
          setValidEmail(false);
          error = { ...error, errEmail: "Invalid email address" };
          setErrors(error);
        } else {
          setValidEmail(true);
        }
      }
    if (error == null) {
      setLoadingClass("loading");
      users
        .forgotPassword({ email: email })
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
          setLoadingClass("");
          console.log(error.response.data);
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
      forgotUser();
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
      <div className="login-logo-side">
        <a href="/login">
          <img src={logoDO} alt="DataRovers Logo" />
        </a>
      </div>

      <ForgotPasswordForm
        errors={errors}
        err={err}
        email={email}
        password={password}
        handleEmail={handleEmail}
        handleBlur={handleBlur}
        validEmail={validEmail}
        handlePassword={(e) => setPassword(e.target.value.trim())}
        handleKeyPress={handleKeyPress}
        handleSubmit={forgotUser}
        loadingClass={loadingClass}
      />
    </React.Fragment>
  );
};
export default Forgotpassword;
