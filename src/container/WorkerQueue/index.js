import React, { useContext, useEffect } from "react";
import { TextField, Box, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";
import QueueDetail from "./QueueDetail";
import Pagination from "@material-ui/lab/Pagination";

import FilterListIcon from "@material-ui/icons/FilterList";

import AccessTimeIcon from "@material-ui/icons/AccessTime";

import searchImg from "../../assets/images/search.svg";
import FooterCopyright from "../FooterCopyright";

import UserDropdown from "../UserDropdown";
import { RootContext } from "./../../context/RootContext/index";
const WorkerQueue = () => {
  const { setMessage } = useContext(RootContext);
  useEffect(() => {
    setMessage({
      type: "",
      Message: "",
    });
  }, []);
  return (
    <Box className="dashboard-main">
      <header className="dashboard-header">
        <h2>Worker Queue</h2>
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField id="standard-search" type="search" className="mt-0" />
          </div>
          <UserDropdown />
        </div>
      </header>

      <div className="worker-tabs">
        <ul className="navigation">
          <li>
            <NavLink to="/" activeClassName="active">
              <AccessTimeIcon />
              <label> Worker Queue</label>
              <span>20</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/abc" activeClassName="active">
              <AccessTimeIcon />
              <label>Link 2</label>
            </NavLink>
          </li>
          <li>
            <NavLink to="/cde" activeClassName="active">
              <AccessTimeIcon />
              <label>Link 3</label>
            </NavLink>
          </li>
          <li>
            <NavLink to="/efg" activeClassName="active">
              <AccessTimeIcon />
              <label>Link 4</label>
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="worker-search">
        <div className="seach-form">
          <img src={searchImg} alt="Search" />
          <TextField id="standard-search" type="search" className="mt-0" />
        </div>
        <span className="worker-filter">
          <FilterListIcon />
        </span>
      </div>

      <Grid container className="mt-4 mb-5">
        <Grid item xs={12}>
          <QueueDetail></QueueDetail>
        </Grid>
      </Grid>
      <Pagination count={10} className="worker-pag"  />

      <FooterCopyright />
    </Box>
  );
};

export default WorkerQueue;
