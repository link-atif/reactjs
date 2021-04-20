import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "../commonstyle/Styles.scss";
import Loading from "../../components/common/ExpandableTable/Loading";
import { common } from "../../actions";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(
  HCPCS,
  REV,
  MOD,
  From,
  THRU,
  QTY,
  Billed,
  Allowed,
  Paid,
  history
) {
  return {
    HCPCS,
    REV,
    MOD,
    From,
    THRU,
    QTY,
    Billed,
    Allowed,
    Paid,
    history: history,
  };
}

function Row(props) {
  const { row, servicePayments, isOpen } = props;
  const [open, setOpen] = React.useState(false);
  const [loadingClass, setLoadingClass] = useState("");
  const [claimAdjustments, setClaimAdjustments] = React.useState([]);
  const classes = useRowStyles();
  const handleClaimAdjustment = (id) => {
    setOpen(!open);
    setLoadingClass("data-loading");
    // common
    //   .getServiceAdjustments(id)
    //   .then(({ data: response }) => {
    //     setLoadingClass("");
    //     const resdata = response.data;
    //     setClaimAdjustments(resdata);
    //   })
    //   .catch((error) => {
    //     setLoadingClass("");
    //     console.log("error is ", error);
    //   });
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => setOpen(!open)}
            onClick={() => handleClaimAdjustment(row.history)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell scope="row">{row.HCPCS}</TableCell>
        <TableCell>{row.REV}</TableCell>
        <TableCell>{row.MOD}</TableCell>
        <TableCell>{row.From}</TableCell>
      </TableRow>
      <TableRow className="new-ui">
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="claim-detail-inner-tbl-new">
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>CAS</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell scope="row">{"T3AE0015110298"}</TableCell>
                    <TableCell>{"Rejected"}</TableCell>
                    <TableCell>200</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ClaimDetailTable = ({ servicePayments }) => {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (servicePayments !== "") {
      var rows = [];
      servicePayments.forEach((item) => {
        rows.push(
          createData(
            item.lineItemControlNo,
            item.statusAction,
            item.statusReason,
            item.statusMessage
          )
        );
      });
      setRows(rows);
    }
  }, [servicePayments]);
  return (
    <TableContainer
      component={Paper}
      className="detail-table-service-line-new tb-scroll"
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </TableCell>
            <TableCell>ControlNo</TableCell>
            <TableCell>status</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Message</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} isOpen={isOpen} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ClaimDetailTable;
