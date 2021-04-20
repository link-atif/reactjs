import React from "react";
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
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import "./styles.scss";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});

function createData(HCPCS, REV, MOD, From, THRU, QTY, Billed) {
  return {
    HCPCS,
    REV,
    MOD,
    From,
    THRU,
    QTY,
    Billed,
    history: [
      {
        date: (
          <div>
            $500<div>$400</div>
            <div>$100</div>
          </div>
        ),
        customerId: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        amount: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        discription: (
          <div>
            $300<div>$100</div>
          </div>
        ),
      },
      {
        date: (
          <div>
            $500<div>$400</div>
            <div>$100</div>
          </div>
        ),
        customerId: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        amount: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        discription: (
          <div>
            $300<div>$100</div>
          </div>
        ),
      },
      {
        date: (
          <div>
            $500<div>$400</div>
            <div>$100</div>
          </div>
        ),
        customerId: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        amount: (
          <div>
            $300<div>$100</div>
          </div>
        ),
        discription: (
          <div>
            $300<div>$100</div>
          </div>
        ),
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.HCPCS}
        </TableCell>
        <TableCell>{row.REV}</TableCell>
        <TableCell>{row.MOD}</TableCell>
        <TableCell>{row.From}</TableCell>
        <TableCell>{row.THRU}</TableCell>
        <TableCell>{row.QTY}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            disableStrictModeCompat={true}
          >
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow className="text-white">
                    <TableCell>
                      <div>Total Amount</div>
                    </TableCell>
                    <TableCell>
                      <div>Drug administration charges</div>
                    </TableCell>
                    <TableCell>
                      <div>Drug Actual Charges Claimed </div>
                    </TableCell>
                    <TableCell>
                      <div>Ancillary Drug Charges Claimed </div>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell>{historyRow.amount}</TableCell>
                      <TableCell>{historyRow.discription}</TableCell>

                      {/* <TableCell>
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: "",
    carbs: "",
    fat: "",
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.object.isRequired,
        customerId: PropTypes.object.isRequired,
        date: PropTypes.object.isRequired,
      })
    ).isRequired,
    name: PropTypes.string,
    price: PropTypes.number,
    protein: PropTypes.number,
  }).isRequired,
};

const rows = [
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="Claim/ClaimDetail" target="_blank">
        Acc-123123
      </a>
    </Typography>,
    <div>01/01/2020</div>,
    "$200",
    "$100",
    "$50",
    "$50"
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="Claim/ClaimDetail" target="_blank">
        Acc-123123
      </a>
    </Typography>,
    <div>01/01/2020</div>,
    "$200",
    "$100",
    "$50",
    "$50"
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="Claim/ClaimDetail" target="_blank">
        Acc-123123
      </a>
    </Typography>,
    <div>01/01/2020</div>,
    "$200",
    "$100",
    "$50",
    "$50"
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="Claim/ClaimDetail" target="_blank">
        Acc-123123
      </a>
    </Typography>,
    <div>01/01/2020</div>,
    "$200",
    "$100",
    "$50",
    "$50"
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="Claim/ClaimDetail" target="_blank">
        Acc-123123
      </a>
    </Typography>,
    <div>01/01/2020</div>,
    "$200",
    "$100",
    "$50",
    "$50"
  ),
];

export default function QueueDetail() {
  return (
    <TableContainer component={Paper} className="detail-table-worker">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Claim ID</TableCell>
            <TableCell>Total Amount</TableCell>
            <TableCell>Payment Amount</TableCell>
            <TableCell>Patient Resp</TableCell>
            <TableCell>Difference (%)</TableCell>
            <TableCell>Payer</TableCell>
            <TableCell>Service Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <Row key={index} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
