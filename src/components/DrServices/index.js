import React from "react";
import "./styles.scss";
import { Box, Grid, Typography, Link, TextField } from "@material-ui/core";

import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../FooterCopyright";
import SecurityIcon from "@material-ui/icons/Security";
import ReceiptOutlinedIcon from "@material-ui/icons/ReceiptOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import SupervisedUserCircleOutlinedIcon from "@material-ui/icons/SupervisedUserCircleOutlined";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

const Users = () => {
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
        <h2 className="page-heading">DR Services</h2>
        {/* Breadcrumbs */}
        <Box>
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="f-14" color="inherit" href="#">
              Home
            </Link>
            <Typography className="f-14" color="textPrimary"></Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <Box className="dr-service-main">
          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Box className="dr-service-inner">
                <Typography variant="h4" className="dr-service-heading">
                  <SupervisedUserCircleOutlinedIcon /> Management
                </Typography>
                <Typography className="dr-service-links ml-4">
                  <Link href="/customers">Subscriptions</Link>
                  <Link href="/lincense-management">License Management</Link>
                  <Link href="/send-notification">Send Notification</Link>
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Box className="dr-service-inner">
                <Typography variant="h4" className="dr-service-heading">
                  <SecurityIcon /> Security
                </Typography>
                <Typography className="dr-service-links ml-4">
                  <Link href="/reset-password">Reset Password</Link>
                  <Link href="#">MFA</Link>
                  <Link href="#">SSO</Link>
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Box className="dr-service-inner">
                <Typography variant="h4" className="dr-service-heading">
                  <SettingsOutlinedIcon /> Support
                </Typography>
                <Typography className="dr-service-links ml-4">
                  <Link href="#">Health</Link>
                  <Link href="#">API Status</Link>
                  <Link href="#">Incident Management</Link>
                </Typography>
              </Box>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Box className="dr-service-inner">
                <Typography variant="h4" className="dr-service-heading">
                  <ReceiptOutlinedIcon /> Master Data
                </Typography>
                <Typography className="dr-service-links ml-4">
                  {/* <Link href="#">Update Payment</Link> */}
                  <Link href="/code-management">JCode</Link>
                  <Link href="/rules">Claim Rules</Link>
                  <Link href="/biosimilars">Biosimilars</Link>
                  <Link href="#">Link 3</Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default Users;
