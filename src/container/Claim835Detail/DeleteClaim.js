import React, { useContext, useEffect } from "react";
import { RootContext } from "../../../context/RootContext";
import {
  Grid,
  Card,
  Box,
  TextField,
  Button,
  CardContent,
  Typography
} from "@material-ui/core";
import "./../styles.scss";

import DataTable from "./../Data-table";

import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import searchImg from "../../../assets/images/search.svg";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import UserDropdown from "../../UserDropdown";
import FooterCopyright from "../../FooterCopyright";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ModalBoxCustom from "../../../components/common/Modal/customModel";
import Message from "./../../../components/Messages";

const DeleteClaim = () => {
  const modalDataObj = {
    title: "Confirm Delete!",
    description: "Are you sure you want to delete the claims ?",
  };
  const { setMessage } = useContext(RootContext);
  const [startDate, setStartDate] = useState(
    new Date(new Date().toDateString())
  );
  const [endDate, setEndDate] = useState(new Date(new Date().toDateString()));
  const [open, setOpen] = useState(false);
  const [loadingClass, setLoadingClass] = useState("");
  useEffect(() => {
    setMessage({
      type: "",
      message: "",
    });
  }, []);

  const handleDelete = () => {
    setMessage({
      type: "success",
      message: "Deleted Successfully",
    });
    setOpen(false);
    setLoadingClass("");
  };
  const openDeleteModal = () => {
    setMessage({
      type: "",
      message: "",
    });
    setOpen(true);
  };
  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ]);
  // const handleDateFilter = (date) => {
  //   const startobj = new Date(date.startDate);
  //   let startDate = startobj.toLocaleDateString("sv-SE", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });

  //   const endobj = new Date(date.endDate);
  //   let endDate = endobj.toLocaleDateString("sv-SE", {
  //     year: "numeric",
  //     month: "2-digit",
  //     day: "2-digit",
  //   });
  //   setState([date]);
  //   setStartDate(startDate);
  //   setEndDate(endDate);
  // };
  return (
    <Box>
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
      <div className="dashboard-main dashboard-content">
        <h2 className="page-heading">Claims Filter</h2>
        {/* Breadcrumbs */}
        <Box className="breadcreams-new">
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Link className="" color="inherit" href="/">
              Dashboard
              </Link>
            <Typography color="textPrimary">
              Claims Filter
            </Typography>
          </Breadcrumbs>
        </Box>
        {/*End Breadcrumbs */}

        <Card className="mt-2">
          <CardContent>
            <Grid container>
              <Grid item md={12}>
                <div className="table-fluid claim-new-ui-main">
                  <h2 className="section-heading">Delete Claims</h2>
                </div>
              </Grid>
              <Message />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container spacing={3}>
                  <Grid item md={6}>
                    <KeyboardDatePicker
                      className="add-user-input-outer"
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="From Date"
                      fullWidth
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <KeyboardDatePicker
                      className="add-user-input-outer"
                      disableToolbar
                      variant="inline"
                      format="MM/dd/yyyy"
                      margin="normal"
                      id="date-picker-inline"
                      label="To Date"
                      value={endDate}
                      fullWidth
                      onChange={(date) => setEndDate(date)}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </Grid>
              </MuiPickersUtilsProvider>
              <Box mt={5} mb={5}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={openDeleteModal}
                  style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                  className={"custom-btn "}
                >
                  Delete
                </Button>
                <ModalBoxCustom
                  modalData={modalDataObj}
                  handleConfirm={handleDelete}
                  open={open}
                  handleClose={() => setOpen(false)}
                  size="sm"
                  action={true}
                  loadingClass={loadingClass}
                />
              </Box>
            </Grid>
          </CardContent>
        </Card>
        <FooterCopyright />
      </div>
    </Box>
  );
};
export default DeleteClaim;
