import React, { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import "./styles.scss";
import UserDropdown from "../UserDropdown";
import FooterCopyright from "../FooterCopyright";

import { TextField } from "@material-ui/core";
import searchImg from "../../assets/images/search.svg";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Link from "@material-ui/core/Link";
import JCodes from "./JCodes";
import AdminCode from "./AdminCode";

const CodeManagement = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };

  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField
              id="standard-search"
              placeholder="Search"
              type="search"
              className="mt-0"
            />
          </div>
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <h2 className="page-heading">Code Management</h2>


        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/dr-services">
              Dashboard
            </Link>
            <Typography color="textPrimary">
              JCode
            </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}
        <div>
          <div className="code-mange-tab mt-2">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Jcodes" {...a11yProps(0)} />
              <Tab label="Admin Codes" {...a11yProps(1)} />
            </Tabs>
          </div>

          <div className="tabs-data-container mt-3">
            <TabPanel value={value} index={0}>
              <JCodes />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <AdminCode />
            </TabPanel>
          </div>
        </div>
        <FooterCopyright />
      </Box>
    </>
  );
};

export default CodeManagement;
