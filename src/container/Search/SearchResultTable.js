import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, Button } from "@material-ui/core";
import Loading from "../../components/common/ExpandableTable/Loading";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function SearchResultTable({ data, dataloadingClass }) {
  const classes = useStyles();

  return (
    <TableContainer
      component={Paper}
      className="detail-table-service-line-new mt-3"
    >
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Claim No</TableCell>
            <TableCell>PT CN</TableCell>
            <TableCell>Total Amt</TableCell>
            <TableCell>PYT AMT</TableCell>
            <TableCell>PT Resp</TableCell>
            <TableCell>Coverage Amt</TableCell>
            <TableCell>Allowed Amt</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        {dataloadingClass !== "" ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={10} className="text-center">
                <div style={{ position: "relative" }}>
                  <div className={dataloadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading compHeight="200"></Loading>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow className="abc">
                  <TableCell component="" scope="row">
                    <NavLink to={`/claim-detail/${row.ClaimPaymentId}`}>
                      {row.PayerClaimControlNo}
                    </NavLink>
                  </TableCell>
                  <TableCell>
                    <NavLink to={`/patient-details/${row.PatientControlNo}`}>
                      {row.PatientControlNo}
                    </NavLink>
                  </TableCell>
                  <TableCell>{row.ChargeAmount}</TableCell>
                  <TableCell>{row.PaymentAmount}</TableCell>
                  <TableCell>{row.PatientRespAmount}</TableCell>
                  <TableCell>{row.CoverageAmount}</TableCell>
                  <TableCell>{row.AllowedAmount}</TableCell>
                  <TableCell>
                    {row.Status === "Paid" ? (
                      <Button variant="contained" className="cl-paid">
                        <CheckIcon /> {row.Status}
                      </Button>
                    ) : (
                      [
                        row.Status == "Partial" ? (
                          <Button variant="contained" className="cl-partial">
                            <InfoIcon /> {row.Status}
                          </Button>
                        ) : (
                          <Button variant="contained" className="cl-pending">
                            <CancelIcon /> {row.Status}
                          </Button>
                        ),
                      ]
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
