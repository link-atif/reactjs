import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import './Styles.scss'

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',

    },
  },
});

function createData(HCPCS, REV, MOD, From, THRU, QTY, Billed, Allowed, Paid, APC) {
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
    APC,
    history: [
      { date: 'PR', customerId: '2', amount: '10.86', discription: 'Coinsurance Amount' },
      { date: 'PR', customerId: '2', amount: '10.86', discription: 'Sqesustration - reduction in fedral payment' },
      { date: 'PR', customerId: '2', amount: '10.86', discription: 'Charges exceeds fee schedule/maximum allowable or contracted/legislated fee arrangment. usage : this' },
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
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
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
        <TableCell>{row.Billed}</TableCell>
        <TableCell>{row.Allowed}</TableCell>
        <TableCell>{row.Paid}</TableCell>
        <TableCell>{row.APC}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography> */}
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>GRP code</TableCell>
                    <TableCell>Adj Reas</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map((historyRow) => (
                    <TableRow key={historyRow.date}>
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
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      }),
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData(96367, 2060, 'PO', '12-19-2019', '12-19-2019', 1, 155.00, 155.00, 42.69, 466),
  createData(96367, 2060, 'PO', '12-19-2019', '12-19-2019', 1, 155.00, 155.00, 42.69, 466),
  createData(96367, 2060, 'PO', '12-19-2019', '12-19-2019', 1, 155.00, 155.00, 42.69, 466),
  
];

export default function ClaimDetailTable() {
  return (
    <TableContainer component={Paper} className="detail-table-service-line">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>HCPCS</TableCell>
            <TableCell>REV code</TableCell>
            <TableCell>MOD</TableCell>
            <TableCell>From</TableCell>
            <TableCell>THRU</TableCell>
            <TableCell>QTY</TableCell>
            <TableCell>Billed</TableCell>
            <TableCell>Allowed</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>APC</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

