import React, { useContext, useEffect } from "react";
import { TextField, Box, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";
import ErrorTable from "./ErrorTable";
import Pagination from "@material-ui/lab/Pagination";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import PaginationNew from "./PaginationNew";

import imgone from "../../assets/images/new-design/claims-icon/1.svg";
import imgtwo from "../../assets/images/new-design/Warning.svg";
import imgthree from "../../assets/images/new-design/claims-icon/3.svg";
import imgfour from "../../assets/images/new-design/claims-icon/4.svg";


import FilterListIcon from "@material-ui/icons/FilterList";

import AccessTimeIcon from "@material-ui/icons/AccessTime";

import searchImg from "../../assets/images/search.svg";
import FooterCopyright from "../FooterCopyright";

import UserDropdown from "../UserDropdown";
import { RootContext } from "./../../context/RootContext/index";
import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ListIcon from "../../assets/images/new-design/claims-icon/list-icon.svg";
import CustomerIcon from "../../assets/images/new-design/claims-icon/customer-icon.svg";
import ExportIcon from "../../assets/images/new-design/claims-icon/export-icon.svg";
import CalendarIcon from "../../assets/images/new-design/claims-icon/calendar-icon.svg";
import FilterIcon from "../../assets/images/new-design/claims-icon/filter-icon.svg";
import PrintIcon from "../../assets/images/new-design/claims-icon/print-icon.svg";

import ClockIcon from "../../assets/images/new-design/clock-g.svg";
import ClockIconGr from "../../assets/images/new-design/clock-gr.svg";

import Tooltip from "@material-ui/core/Tooltip";
import { withStyles, makeStyles } from "@material-ui/core/styles";

const useStylesBootstrap = makeStyles((theme) => ({
  arrow: {
    color: theme.palette.common.black,
  },
  tooltip: {
    backgroundColor: theme.palette.common.black,
  },
}));

function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();

  return <Tooltip arrow classes={classes} {...props} />;
}





const PreAdjudication = () => {
  const { setMessage } = useContext(RootContext);
  useEffect(() => {
    setMessage({
      type: "",
      Message: "",
    });
  }, []);

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
        <Box>
          <h2 className="page-heading">Errors</h2>



          <BootstrapTooltip title="SETTING">
            <div className="filter-hamburger pull-right">
              <img src={SettingIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="ITEMS">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ListIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="CUSTOMER">
            <div className="filter-hamburger pull-right mr-3">
              <img src={CustomerIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="PRINT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={PrintIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
          <BootstrapTooltip title="EXPORT">
            <div className="filter-hamburger pull-right mr-3">
              <img src={ExportIcon} alt="icon" />
            </div>
          </BootstrapTooltip>
        </Box>

        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="f-14" color="inherit" href="/workers">
              Pre-Adjudication
            </Link>
            <Typography className="f-14" color="textPrimary">
              277CA
              </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}



        <div className="pre-adj-tabs-all">
          <ul>
            <li>
              <NavLink to="/workers">
                {/* <AccessTimeIcon /> */}
                <img src={ClockIconGr} alt="icon" />
                <label> 837</label>
                <span>20</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/error" activeClassName="pre-active">
                <img src={ClockIcon} alt="icon" />
                <label>Claim Status</label>
              </NavLink>
            </li>
            <li>
              <NavLink to="/claim277">
                <img src={ClockIconGr} alt="icon" />
                <label>277</label>
              </NavLink>
            </li>
          </ul>
        </div>

        <div className="progress-box-main mt-4">
          <div className="pre-box">
            <div className="claim-box-inner">
              <span className="claim-box-icon ic-4">
                {/* <ReceiptOutlinedIcon /> */}
                <img src={imgone} alt="Icon" />
              </span>
            </div>
            <div className="claim-box-inner pl-3">
              <h2 className="mb-0">
                44
              </h2>
              <p>Total Calims Rejected</p>
            </div>
          </div>

          <div className="pre-box">
            <div className="claim-box-inner">
              <span className="claim-box-icon ic-3">
                {/* <LocalAtmOutlinedIcon /> */}
                <img src={imgtwo} alt="Icon" />
              </span>
            </div>
            <div className="claim-box-inner pl-3">
              <h2 className="mb-0">
                89
              </h2>
              <p>Total Calims Accepted with Error</p>
            </div>
          </div>

          <div className="pre-box">
            <div className="claim-box-inner">
              <span className="claim-box-icon ic-5">
                {/* <NewReleasesOutlinedIcon /> */}
                <img src={imgthree} alt="Icon" />
              </span>
            </div>
            <div className="claim-box-inner pl-3">
              <h2 className="mb-0">
                30
              </h2>
              <p>Total Calims Accepted</p>
            </div>
          </div>


        </div>



        <Grid container className="mt-4 mb-2">
          <Grid item xs={12}>
            <ErrorTable></ErrorTable>
          </Grid>
        </Grid>
        <PaginationNew />

        <FooterCopyright />
      </Box>
    </>
  );
};

export default PreAdjudication;
