import React, { useEffect, useState, useContext } from "react";
import { RootContext } from "./../../context/RootContext";
import { Box } from "@material-ui/core";
import "../../assets/css/main-style.css";
import Sidebar from "./../../components/common/Leftbar/Sidebar";
function Layout({ children, withSubMenu, subMenu }) {
  const { setSubLeftMenu, userPreferences } = useContext(RootContext);
  const [view, setView] = useState(false);
  useEffect(() => {
    setSubLeftMenu("");
  }, [subMenu]);
  return (
    <Box
      className={
        view === true
          ? "main-outer bg-gary collapse-view"
          : `main-outer bg-gary ${
              userPreferences &&
              userPreferences.Navigation &&
              userPreferences.Navigation === "top"
                ? "DR-top-nav "
                : ""
            }`
      }
    >
      <Sidebar userView={view} handleView={() => setView(!view)} />
      <main>{children}</main>
    </Box>
  );
}

export default Layout;
