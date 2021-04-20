import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { RootContext } from "../../context/RootContext";

const Logout = () => {
  window.localStorage.clear();
  window.localStorage.removeItem("rememberMe");
  const { setUserToken } = useContext(RootContext);
  const history = useHistory();
  setUserToken("");
  // window.location.href = "/";
  history.push("/");
  return null;
};

export default Logout;
