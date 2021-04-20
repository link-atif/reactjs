import React, { useEffect, useState } from "react";
import axios from "axios";
import applicationAxios from "../../axios";
export const RootContext = React.createContext();

export default ({ children }) => {
  const preferences = JSON.parse(localStorage.getItem("preferences"));
  const prevApplicationToken = localStorage.getItem("applicationToken") || "";
  const prevApplicationTokenTime =
    localStorage.getItem("applicationTokenTime") || "";
  const prevUserToken = localStorage.getItem("userToken") || "";

  const [applicationToken, setApplicationToken] = useState(
    prevApplicationToken
  );
  const [applicationTokenTime, setApplicationTokenTime] = useState(
    prevApplicationTokenTime
  );
  const [userToken, setUserToken] = useState(prevUserToken);
  const prevLoginUserData = localStorage.getItem("loginUserData");
  const [loginUserData, setLoginUserData] = useState(prevLoginUserData);
  const [userRegister, setUserRegister] = useState({});

  const [notifications, setNotifications] = useState({});

  const previousLeftbar =
    JSON.parse(localStorage.getItem("drawerState")) || false;
  const [drawerState, setDrawerState] = useState(previousLeftbar);
  const prevUserRole = localStorage.getItem("userRoles") || ["admin", "user"];
  const [permission, setPermission] = useState(prevUserRole);
  const [message, setMessage] = useState({});
  const prevUserName = localStorage.getItem("userName") || "";
  const [userName, setUserName] = useState(prevUserName);

  const [userPreferences, setUserPreferences] = useState({
    NoOfRecordInTable: (preferences && preferences.NoOfRecordInTable) || 10,
    Theme: (preferences && preferences.Theme) || "Green",
    Navigation: (preferences && preferences.Navigation) || "left",
  });

  const prevSubLeftMenu = localStorage.getItem("subLeftMenu") || "";
  const [subLeftMenu, setSubLeftMenu] = useState(prevSubLeftMenu);

  const prevMenuStyle = localStorage.getItem("menuStyle") || "LeftMenu";
  const [menuStyle, setMenuStyle] = useState(prevMenuStyle);
  const prevSubscriptionID = localStorage.getItem("subscriptionID");
  const [subscriptionID, setSubscriptionID] = useState(prevSubscriptionID);
  const prevDomainID = localStorage.getItem("domainID");
  const [domainID, setDomainID] = useState(prevDomainID);

  const getApplicationToken = () => {
    axios.get(`https://roversmwdev.azurewebsites.net/token`).then((res) => {
      localStorage.setItem("applicationToken", res.data.data);
      applicationAxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${res.data.data}`;
    });
  };

  useEffect(() => {
    // localStorage.removeItem("preferences", JSON.stringify(userPreferences));

    // setTimeout(() => {
    localStorage.setItem("preferences", JSON.stringify(userPreferences));
    // }, 1000)
  }, [userPreferences]);

  useEffect(() => {
    if (!userToken) {
      window.localStorage.removeItem("userToken");
    } else {
      localStorage.setItem("userToken", userToken);
    }
  }, [userToken]);

  useEffect(() => {
    if (!subscriptionID) {
      //window.localStorage.removeItem("subscriptionID");
    } else {
      localStorage.setItem("subscriptionID", subscriptionID);
    }
  }, [subscriptionID]);

  useEffect(() => {
    if (!loginUserData) {
      window.localStorage.removeItem("loginUserData");
    } else {
      localStorage.setItem("loginUserData", loginUserData);
    }
  }, [loginUserData]);

  useEffect(() => {
    if (!userName) {
      window.localStorage.removeItem("userName");
    } else {
      localStorage.setItem("userName", userName);
    }
  }, [userName]);

  // useEffect(() => {
  //     const userRoles = localStorage.getItem("userRoles");
  //     alert(userRoles);
  //     setPermission(userRoles);
  // },[permission]);

  useEffect(() => {
    if (!domainID) {
      window.localStorage.removeItem("domainID");
    } else {
      localStorage.setItem("domainID", domainID);
    }
  }, [domainID]);

  useEffect(() => {
    localStorage.setItem("drawerState", drawerState);
  }, [drawerState]);

  useEffect(() => {
    localStorage.setItem("menuStyle", menuStyle);
  }, [menuStyle]);

  useEffect(() => {
    localStorage.setItem("subLeftMenu", menuStyle);
  }, [subLeftMenu]);

  useEffect(() => {
    if (!applicationToken) {
      getApplicationToken();
    } else {
      getApplicationToken();
    }
  }, [applicationToken]);
  const convertKeys = (obj) => {
    //Temporary object for storing traverse results
    var tmpObj = {};

    //Process array objects
    if (Array.isArray(obj)) {
      var arr = [];
      //traverse through array content
      for (let i in obj) {
        if (obj[i] !== null && typeof obj[i] == "object") {
          arr.push(convertKeys(obj[i]));
        } else {
          arr.push(obj[i]);
        }
      }
      tmpObj = arr;
    }
    // CONVERT OBJECT KEYS TO LOWER CASE
    else {
      for (let i in obj) {
        var j = i.toLowerCase();
        if (obj[i] !== null && typeof obj[i] == "object") {
          tmpObj[j] = convertKeys(obj[i]);
        } else {
          tmpObj[j] = obj[i];
        }
      }
    }
    return tmpObj;
  };

  const defaultContext = {
    applicationToken,
    setApplicationToken,
    userToken,
    setUserToken,
    userRegister,
    setUserRegister,
    drawerState,
    setDrawerState,
    permission,
    setPermission,
    message,
    setMessage,
    loginUserData,
    setLoginUserData,
    menuStyle,
    setMenuStyle,
    userName,
    setUserName,
    subLeftMenu,
    setSubLeftMenu,
    notifications,
    setNotifications,
    subscriptionID,
    setSubscriptionID,
    domainID,
    setDomainID,
    convertKeys,
    userPreferences,
    setUserPreferences,
    getApplicationToken,
  };
  return (
    <RootContext.Provider value={defaultContext}>
      {children}
    </RootContext.Provider>
  );
};
