import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import logoDO from "../../assets/images/Logo.svg";
import aes from "crypto-js/aes";
import "../../assets/css/main-style.css";
import LoginForm from "./LoginForm";
import { RootContext } from "../../context/RootContext";
import axois from "axios";
const apiUrl = "https://roversmwdev.azurewebsites.net";
var applicationToken = localStorage.getItem("applicationToken");
var isRememberChecked = localStorage.getItem("rememberMe");

const Login = () => {
  const {
    userToken,
    setUserToken,
    setMessage,
    permission,
    setPermission,
    loginUserData,
    setLoginUserData,
    userName,
    setUserName,
    subscriptionID,
    setSubscriptionID,
    domainID,
    setDomainID,
    getApplicationToken,
  } = useContext(RootContext);
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [validEmail, setValidEmail] = useState(true);

  const [err, setErr] = useState(false);

  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
  }, []);
  const handleEmail = (e) => {
    setEmail(e.target.value.trim());
    // console.log("emal--->>", e.target.value.trim());;
    if (e.target.value.trim() === "") {
      setValidEmail(true);
    }
    // isEmail(email);
  };

  const handleBlur = () => {
    // isEmail(email);
  };

  const loginUser = () => {
    // isEmail(email);

    if (email === "" || password === "") {
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
    if (password == "") {
      error = { ...error, password: "Passowrd is required" };
      setErrors(error);
    }
    // if (!validEmail) {
    //   error = { ...error, errEmail: "Invalid email address" };
    //   setErrors(error);
    // }

    if (error == null) {
      //console.log("old password is ", password);
      let newpassword = aes.encrypt(password, "Datarovers786@2020").toString();
      setLoadingClass("loading");
      axois
        .post(
          `${apiUrl}/user/LoginUser`,
          { email: email, password: newpassword },
          {
            headers: {
              Authorization: "Bearer " + applicationToken,
              "X-Version": "1.0",
            },
          }
        )
        .then(({ data: response }) => {
          setLoadingClass("");
          if (response.success == true) {
            //setUserData(response.data);
            redirecttoVerificationPage(response.data);
          } else {
            setMessage({
              type: "error",
              message: response.message,
            });
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            axois
              .get(`${apiUrl}/token`)
              .then((resposne) => {
                applicationToken = resposne.data.data;
                localStorage.setItem("applicationToken", applicationToken);
                axois
                  .post(
                    `${apiUrl}/user/LoginUser`,
                    { email: email, password: newpassword },
                    {
                      headers: {
                        Authorization: "Bearer " + applicationToken,
                        "X-Version": "1.0",
                      },
                    }
                  )
                  .then(({ data: userResponse }) => {
                    setLoadingClass("");
                    if (userResponse.success == true) {
                      redirecttoVerificationPage(userResponse.data);
                    } else {
                      setMessage({
                        type: "error",
                        message: userResponse.message,
                      });
                    }
                  })
                  .catch((error) => {
                    setLoadingClass("");
                    setMessage({
                      type: "error",
                      message: error.response.data.message,
                    });
                  });
              })
              .catch((err) => {
                setLoadingClass("");
                setMessage({
                  type: "error",
                  message: err.response.message,
                });
              });
            return false;
          }
          setLoadingClass("");
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
        });
    }
  };
  const redirecttoVerificationPage = (id) => {
    localStorage.setItem("rememberMe", rememberMe);
    // history.push("/email-verification/" + email + "/" + id);
    window.location.href = `/email-verification/${email}/${id}`;
  };
  const setUserData = (data) => {
    let userRoles = data.roles.map((item, index) => {
      return item.name;
    });
    if (data.subscriptions != null) {
      setSubscriptionID(data.subscriptions[0].subscriptionId);
    }
    setDomainID(data.domainId);
    setLoginUserData(JSON.stringify(data));
    setUserName(data.firstName + " " + data.lastName);
    setUserToken(data.userId);
    window.localStorage.setItem("userRoles", userRoles);
    setPermission(userRoles);
    history.push("/email-verification/");
  };

  const handleKeyPress = (e) => {
    if (e.charCode == 13) {
      loginUser();
    }
  };

  // if (
  //   userToken &&
  //   typeof applicationToken !== "undefined" &&
  //   applicationToken !== ""
  // ) {
  //   // history.push("/");
  // }

  if (
    typeof isRememberChecked != "undefined" &&
    typeof isRememberChecked != "object" &&
    isRememberChecked !== "false" &&
    isRememberChecked != "null" &&
    userToken
  ) {
    getApplicationToken();
    setTimeout(() => {
      let roles = permission;
      let newroles =
        roles != "undefined" && roles != null && roles != ""
          ? roles.split(",")
          : [];
      if (typeof newroles != "undefined" && newroles.length > 0) {
        if (newroles.includes("Super Administrator")) {
          // history.push("/dr-services");
          window.location.href = "/dr-services";
        } else {
          // history.push("/");
          window.location.href = "/";
        }
      }
    }, [1000]);
  }

  return (
    <React.Fragment>
      <div className="login-logo-side">
        <a href="/login">
          <img src={logoDO} alt="DataRovers Logo" />
        </a>
      </div>

      <LoginForm
        errors={errors}
        email={email}
        password={password}
        handleEmail={handleEmail}
        validEmail={validEmail}
        handlePassword={(e) => setPassword(e.target.value.trim())}
        handleKeyPress={handleKeyPress}
        handleBlur={handleBlur}
        handleSubmit={loginUser}
        loadingClass={loadingClass}
        rememberMe={rememberMe}
        handleRememberMe={(e) => setRememberMe(!rememberMe)}
        err={err}
      />
    </React.Fragment>
  );
};

export default Login;
