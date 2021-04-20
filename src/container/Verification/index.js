import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import logoDO from "../../assets/images/Logo.svg";
import "../../assets/css/main-style.css";
import VerificationForm from "./VerificationForm";
import { users } from "../../actions/index";

import axios from "../../axios";
import { RootContext } from "../../context/RootContext";

const UserVerification = () => {
  const {
    userToken,
    setMessage,
    setPermission,
    setUserPreferences,
  } = useContext(RootContext);
  const history = useHistory();

  const [code, setCode] = useState("");
  const [errors, setErrors] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [verificationLoadingClass, setVerificationLoadingClass] = useState("");
  let { email, verificationCode } = useParams();
  const codeLength = [1, 2, 3, 4, 5, 6];

  const verifyUser = () => {
    var error = null;
    if (code === "") {
      error = { ...error, code: "Code is required" };
      setErrors(error);
    }
    if (error == null) {
      setLoadingClass("loading");
      setLoadingClass("loading");
      users
        .verifyUser({
          email: email,
          verificationCode: verificationCode,
          code: code,
        })
        .then((response) => {
          setLoadingClass("");
          const { data: result } = response;
          if (
            result.success === true &&
            result.data !== "" &&
            result.data !== null
          ) {
            setCode("");
            setUserData(response.data.data);
          } else {
            setLoadingClass("");
            setMessage({
              type: "error",
              message: result.message,
            });
          }
        })
        .catch((newerror) => {
          setLoadingClass("");
          return false;
        });
      return false;
    }
  };

  const setUserData = (data) => {
    let userRoles = data.roles.map((item, index) => {
      return item.roleId;
    });
    if (data.subscriptions != null) {
      localStorage.setItem(
        "subscriptionID",
        data.subscriptions[0].subscriptionId
      );
    }

    localStorage.setItem("domainID", data.domainId);
    localStorage.setItem("loginUserData", JSON.stringify(data));
    localStorage.setItem("userName", data.firstName + " " + data.lastName);
    localStorage.setItem("userToken", data.userId);
    localStorage.setItem("userRoles", userRoles);

    setUserPreferences({
      NoOfRecordInTable: data.NoOfRecordInTable,
      Theme: data.Theme,
      Navigation: data.Navigation,
    });

    setPermission(userRoles);

    if (userRoles.includes("e005c454-f8a8-4329-a32a-2527142995a7")) {
      window.location.href = "/dr-services";
    } else {
      window.location.href = "/";
    }
  };

  const handleKeyPress = (e) => {
    if (e.charCode === 13) {
      verifyUser();
    }
  };

  const handleCode = (e) => {
    setMessage({
      type: "",
      message: "",
    });
    setCode(e);
  };

  const handleKeyUP = (e) => {
    if (e.key === "Backspace") {
      let newcode = code.substring(0, code.length - 1);
      setCode(newcode);
    }
  };
  useEffect(() => {
    if (code.length === codeLength.length) {
      verifyUser();
    }
  }, [code]);

  const sendVerificationCode = () => {
    setVerificationLoadingClass("loading");
    users
      .sendVerificationCode(email)
      .then((response) => {
        let { data } = response;
        if (data.success === true) {
          setVerificationLoadingClass("");
          setMessage({
            type: "success",
            message: data.message,
          });
        } else {
          setVerificationLoadingClass("");
          setMessage({
            type: "error",
            message: data.message,
          });
        }
      })
      .catch((newerror) => {
        setVerificationLoadingClass("");
        setMessage({
          type: "error",
          message: newerror.response.data.message,
        });
        setErrors(newerror.response.data);
      });
    return false;
  };

  return (
    <React.Fragment>
      <div className="login-logo-side">
        <a href="/login">
          <img src={logoDO} alt="DataRovers Logo" />
        </a>
      </div>

      <VerificationForm
        errors={errors}
        code={code}
        handleCode={(e) => handleCode(e)}
        handleKeyPress={handleKeyPress}
        handleSubmit={verifyUser}
        handleVerificationCode={sendVerificationCode}
        loadingClass={loadingClass}
        verificationLoadingClass={verificationLoadingClass}
        codeLength={codeLength}
        handleKeyUP={(e) => handleKeyUP(e)}
      />
    </React.Fragment>
  );
};
export default UserVerification;
