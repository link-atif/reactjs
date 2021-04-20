import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Button } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Loading from "../../components/common/ExpandableTable/Loading";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import CancelIcon from "@material-ui/icons/Cancel";

export default function ClaimDetailTable({ servicePayments, loadingClass }) {
  return (
    <TableContainer
      className="detail-table-service-line-new tb-scroll"
      component={Paper}
    >
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>Claim No</TableCell>
            <TableCell>Charge Amount</TableCell>
            <TableCell>Allowed Amount</TableCell>
            <TableCell>Payment Amount</TableCell>
            <TableCell>patientResp Amount</TableCell>
            <TableCell>diff</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        {loadingClass !== "" ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div style={{ position: "relative" }}>
                  <div className={loadingClass}>
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
            {servicePayments.map((item, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>
                    <NavLink to={`/claim-detail/${item.claimPaymentId}`}>
                      {item.payerClaimControlNo}
                    </NavLink>
                  </TableCell>
                  <TableCell>{item.chargeAmount}</TableCell>
                  <TableCell>{item.allowedAmount}</TableCell>
                  <TableCell>{item.paymentAmount}</TableCell>
                  <TableCell>{item.patientRespAmount}</TableCell>
                  <TableCell>{item.diff}</TableCell>
                  <TableCell>
                    {item.status === "Paid" ? (
                      <Button variant="contained" className="cl-paid">
                        <CheckIcon /> {item.status}
                      </Button>
                    ) : (
                      [
                        item.status == "Partial" ? (
                          <Button variant="contained" className="cl-partial">
                            <InfoIcon /> {item.status}
                          </Button>
                        ) : (
                          <Button variant="contained" className="cl-pending">
                            <CancelIcon /> {item.status}
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
