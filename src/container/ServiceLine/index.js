import React, { useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink } from "react-router-dom";
import { TextField, Box, Grid } from "@material-ui/core";
import "./Styles.scss";
import ClaimDetailTable from "./ClaimDetailTable";

import searchImg from "../../assets/images/search.svg";

import UserDropdown from "../UserDropdown";
import { RootContext } from "../../context/RootContext";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    tableLayout: "fixed",
  },
});

function createData(name, calories, fat, carbs, protein, bit, pat, clp) {
  return { name, calories, fat, carbs, protein, bit, pat, clp };
}

const rows = [
  createData(
    "Provider Name:",
    "John Rash",
    "Secondory Payer:",
    1111,
    "Paid Date:",
    20,
    "Paid Date:",
    20
  ),
  createData(
    "Patient Type:",
    "Loreum Ipsum",
    "Patient Type:",
    1111,
    "SVC From",
    1111,
    "Paid Date:",
    20
  ),
  createData(
    "Claim Status:",
    "Active",
    "Patient ID#:",
    24,
    "Claim Status:",
    19,
    "HICHG:",
    "N"
  ),
  createData(
    "Patient Name:",
    0,
    "Insured ID#:",
    49,
    "Type of Bill:",
    1111,
    "Patient ID#:",
    24
  ),
  createData(
    "Patient Control:",
    0,
    "Payer Claim Number(ICN):",
    49,
    "NonCoverd Days:",
    19,
    "Patient ID#:",
    24
  ),
];
const rows1 = [
  createData(
    "Total Charges (CLP03):",
    55931,
    "COVID CHGS:",
    1111,
    "Payment AMT (CLP04):",
    11187,
    "PAT RESP (CLP05)",
    2891
  ),
  createData(
    "Coins:",
    2891,
    "Copay:",
    0,
    "NonCOVID CHGS",
    0,
    "Count Adjust",
    41853
  ),
];

const rows2 = [
  createData(
    "Total Charges (CLP03):",
    55931,
    "COVID CHGS:",
    1111,
    "Payment AMT (CLP04):",
    11187,
    "PAT RESP (CLP05)",
    2891
  ),
  createData(
    "Coins:",
    2891,
    "Copay:",
    0,
    "NonCOVID CHGS",
    0,
    "Count Adjust",
    41853
  ),
  createData(
    "Total Charges (CLP03):",
    55931,
    "COVID CHGS:",
    1111,
    "Payment AMT (CLP04):",
    11187,
    "PAT RESP (CLP05)",
    2891
  ),
  createData(
    "Coins:",
    2891,
    "Copay:",
    0,
    "NonCOVID CHGS",
    0,
    "Count Adjust",
    41853
  ),
];

export default function ClaimDetail() {
  const classes = useStyles();
  const { setMessage } = useContext(RootContext);
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
  }, []);

  return (
    <Box className="dashboard-main">
      <header className="dashboard-header">
        <h2>Acc-123123</h2>
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField id="standard-search" type="search" className="mt-0" />
          </div>
          <UserDropdown />
        </div>
      </header>

      <div className="item">
        <ul className="navigation">
          <li>
            <NavLink to="/claim" activeClassName="active">
              <label>Summary</label>
            </NavLink>
          </li>

          <li>
            <NavLink to="/service-line" activeClassName="active">
              <label>Service Line</label>
            </NavLink>
          </li>
        </ul>
      </div>

      <Grid container>
        <Grid item xs={12}>
          <ClaimDetailTable></ClaimDetailTable>
        </Grid>
      </Grid>
    </Box>
  );
}
