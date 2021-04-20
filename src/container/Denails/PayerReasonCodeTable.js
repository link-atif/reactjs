import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";
import LoadingImg from "./../../asstes/images/data-table-loading.gif";
const PayerReasonCodeTable = ({ data, loadingClass }) => {
  return (
    <Table size="small" component={Box} aria-label="purchases">
      <TableHead>
        <TableRow>
          <TableCell>Claim No</TableCell>
          <TableCell>Charge Amount</TableCell>
          <TableCell>Allowed Amount</TableCell>
          <TableCell>Payment Amount</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <React.Fragment>
          {loadingClass !== "" ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                <div className="cliam-ui-table-2">
                  <img src={LoadingImg} />
                </div>
              </TableCell>
            </TableRow>
          ) : null}
          {data.map((row) => {
            return (
              <TableRow>
                <TableCell component="" scope="row">
                  <NavLink
                    to={`/claim-detail/${row.ClaimPaymentId}`}
                    target={"_blank"}
                  >
                    {row.PayerClaimControlNo}
                  </NavLink>
                </TableCell>
                <TableCell>{row.ChargeAmount}</TableCell>
                <TableCell>{row.AllowedAmount}</TableCell>
                <TableCell>{row.PaymentAmount}</TableCell>
              </TableRow>
            );
          })}
        </React.Fragment>
      </TableBody>
    </Table>
  );
};

export default PayerReasonCodeTable;
