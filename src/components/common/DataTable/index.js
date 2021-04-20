import React, { useState, useEffect } from "react";
import Table from "react-responsive-data-table";
import CloseIcon from "@material-ui/icons/Close";
import AddUser from "./../../../container/AddUser/index";
// import Messages from "../../components/Messages";
import { Fade, Typography, Box, Grid, TextField } from "@material-ui/core";
import Message from "./../../Messages/index";

const DataTable = ({
  tableData,
  pages,
  pagination,
  page,
  search,
  size,
  sort,
  allMessages,
}) => {
  const [detailMessage, setDetailMessage] = useState(false);
  const [singleMessage, setSingleMessage] = useState({});
  const getRowData = (row) => {
    if (typeof allMessages !== "undefined" && allMessages != null) {
      const singleMessage = allMessages.filter(
        (item) => item.title == row[0]
      )[0];
      setSingleMessage(singleMessage);
      setDetailMessage(true);
    }
  };
  const closeMessage = () => {
    setSingleMessage({});
    setDetailMessage(false);
  };
  const formateDate = (date) => {
    const new_date = new Date(date);
    let day = new_date.getDate();
    day = day < 10 ? "0" + day : day;
    let month = new_date.getMonth();
    month = month < 10 ? "0" + month : month;
    let year = new_date.getFullYear();
    let time = new_date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    return month + "/" + day + "/" + year + " " + time;
  };
  return (
    <React.Fragment>
      <Table
        tableStyle="table table-hover table-striped table-bordered table-borderless"
        pages={pages}
        pagination={pagination}
        onRowClick={(row) => getRowData(row)} // if You Want Table Row Data OnClick then assign this {row => console.log(row)}
        page={page}
        errormsg="Error. . ."
        loadingmsg="Loading. . ."
        isLoading={false}
        sort={sort}
        search={search}
        size={size}
        data={tableData}
      />
      <div
        className={
          detailMessage === true ? "right-drawer opened" : "right-drawer"
        }
      >
        <CloseIcon className="close" onClick={closeMessage} />
        {
          <Fade in>
            <div className="add-data-wrapper">
              <Box>
                <Typography variant="h4">Message Detail</Typography>
                {typeof singleMessage != "undefined" ? (
                  <React.Fragment>
                    <Typography className="list-item">
                      {singleMessage.message}
                    </Typography>
                    <Typography className="date">
                      {formateDate(singleMessage.createdOn)}
                    </Typography>
                  </React.Fragment>
                ) : (
                  <Typography className="date">No message found!</Typography>
                )}
              </Box>
            </div>
          </Fade>
        }
      </div>
    </React.Fragment>
  );
};
export default DataTable;
