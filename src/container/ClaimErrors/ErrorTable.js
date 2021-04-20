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
          {row.HCPCS}
        </TableCell>
        <TableCell>{row.REV}</TableCell>
        <TableCell>{row.MOD}</TableCell>
        {/* <TableCell>{row.From}</TableCell>
        <TableCell>{row.THRU}</TableCell>
        <TableCell>{row.QTY}</TableCell> */}
        
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
      <a href="" >
      "277CA: 198
    </a>
    </Typography>,
    <div> is simply dummy text of the printing and typesetting industry.</div>,
    <Typography variant="subtitle1" size={5}>
      <a href="/error-claims" >
      66
    </a>
    </Typography>,
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="" >
      "278CA: 198
    </a>
    </Typography>,
    <div> is simply dummy text of the printing and typesetting industry.</div>,
    <Typography variant="subtitle1" size={5}>
      <a href="/error-claims" >
      68
    </a>
    </Typography>,
   
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="" >
      "280CA: 198
    </a>
    </Typography>,
    <div> is simply dummy text of the printing and typesetting industry.</div>,
    <Typography variant="subtitle1" size={5}>
      <a href="/error-claims" >
      78
    </a>
    </Typography>,
    
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="" >
      "281CA: 198
    </a>
    </Typography>,
    <div> is simply dummy text of the printing and typesetting industry.</div>,
    <Typography variant="subtitle1" size={5}>
      <a href="/error-claims" >
      80
    </a>
    </Typography>,
    
  ),
  createData(
    <Typography variant="subtitle1" size={5}>
      <a href="" >
      "282CA: 198
    </a>
    </Typography>,
    <div> is simply dummy text of the printing and typesetting industry.</div>,
    <Typography variant="subtitle1" size={5}>
      <a href="/error-claims" >
      92
    </a>
    </Typography>,
    
  ),
];

export default function QueueDetail() {
  return (
    <TableContainer component={Paper} className="detail-table-service-line-new">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
           
            <TableCell>Error Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Number of Error for this code</TableCell>
            {/* <TableCell>Member ID</TableCell>
            <TableCell>Patient ID</TableCell>
            <TableCell>Error Code</TableCell> */}
            
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
