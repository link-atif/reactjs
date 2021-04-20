import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import { Button, Paper, TableSortLabel, Grid } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import InfoIcon from "@material-ui/icons/Info";
import "./styles.scss";
import { NavLink, useHistory } from "react-router-dom";
import Loading from "../../components/common/ExpandableTable/Loading";
import CloseIcon from "@material-ui/icons/Close";

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
  Billed1,
  Billed2,
  claimId
) {
  return {
    HCPCS,
    REV,
    MOD,
    From,
    THRU,
    QTY,
    Billed,
    Billed1,
    Billed2,
    claimId,
  };
}

function Row(props) {
  const { row } = props;
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>{row.HCPCS}</TableCell>
        <TableCell>{row.REV}</TableCell>
        <TableCell>{row.MOD}</TableCell>
        <TableCell>{row.From}</TableCell>
        <TableCell>{row.THRU}</TableCell>
        <TableCell>{row.QTY}</TableCell>
        <TableCell>{row.Billed}</TableCell>
        <TableCell>{row.Billed1}</TableCell>
        <TableCell>{row.Billed2}</TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    calories: "",
    carbs: "",
    fat: "",
    name: PropTypes.string,
    price: PropTypes.number,
    protein: PropTypes.number,
  }).isRequired,
};

export default function QueueDetail({
  data,
  loadingClass,
  memberId,
  patientId,
  billingNpi,
  attendingNpi,
  dosOrder,
  claimTotal,
  PayerCcn,
  icnOrder,
  handleMemberId,
  handlePatientId,
  handleBillingNpi,
  handleAttendingNpi,
  handleDosOrder,
  handleClaimTotal,
  handlePayerCcn,
  handleIcnOrder,
}) {
  const [rows, setRows] = useState([]);
  const history = useHistory();
  const formatDate = (date) => {
    const dt = new Date(date);
    let year = dt.getFullYear();
    let mon = dt.getMonth();
    mon = mon < 10 ? "0" + mon : mon;
    let day = dt.getDay();
    day = day < 10 ? "0" + day : day;
    let res = `${day}-${mon}-${year}`;
    return res;
  };
  useEffect(() => {
    if (typeof data !== "undefined" && data !== "" && data !== null) {
      var rows = [];
      data.forEach((item) => {
        rows.push(
          createData(
            <NavLink to={`pre-adjudication-detail/${item.ClaimRequestId}`}>
              {item.MemberId}
            </NavLink>,
            <NavLink to={`/patient-details/${item.PatientControlNo}`}>
              {item.PatientControlNo}
            </NavLink>,
            item.BilingProviderId,
            item.From,
            `$${item.ClaimAmount}`,
            <React.Fragment>
              <Grid container>
                <Grid item sm={6}>
                  <div className="claim-request-btn">
                    {item.CAStatus277 === "Accepted" ? (
                      <CheckIcon
                        className="claim-request-btn-success"
                        style={{ color: "white" }}
                        onClick={() =>
                          history.push(
                            `/claim277/${item.ClaimAcknowledgementId}/${item.ClaimRequestId}`
                          )
                        }
                      >
                        <Button
                          className="claim-request-btn"
                          disabled={true}
                        ></Button>
                      </CheckIcon>
                    ) : (
                      <CloseIcon
                        className="claim-request-btn-partial"
                        style={{ color: "white" }}
                        onClick={() =>
                          history.push(
                            `/claim277/${item.ClaimAcknowledgementId}/${item.ClaimRequestId}`
                          )
                        }
                      >
                        <Button
                          className="claim-request-btn"
                          disabled={true}
                        ></Button>
                      </CloseIcon>
                    )}
                    {/* <p className="mt-1">277</p> */}
                  </div>
                </Grid>
                <Grid item sm={6}>
                  <div className="claim-request-btn">
                    {typeof item.ClaimAcknowledgementId !== "object" &&
                    item.ClaimPaymentStatus === "Paid" ? (
                      <CheckIcon
                        className="claim-request-btn-success"
                        style={{ color: "white" }}
                        onClick={() =>
                          history.push(
                            `/claim277/${item.ClaimAcknowledgementId}/${item.ClaimRequestId}`
                          )
                        }
                      >
                        <Button
                          className="claim-request-btn"
                          disabled={true}
                        ></Button>
                      </CheckIcon>
                    ) : (
                      [
                        typeof item.ClaimAcknowledgementId !== "object" &&
                        item.ClaimPaymentStatus === "Partial" ? (
                          <CheckIcon
                            className="claim-request-btn-partial"
                            style={{ color: "white" }}
                            onClick={() =>
                              history.push(
                                `/claim277/${item.ClaimAcknowledgementId}/${item.ClaimRequestId}`
                              )
                            }
                          >
                            <Button
                              className="claim-request-btn"
                              disabled={true}
                            ></Button>
                          </CheckIcon>
                        ) : (
                          <CloseIcon
                            className="claim-request-btn-disabled"
                            style={{ color: "white" }}
                            onClick={() =>
                              history.push(
                                `/claim277/${item.ClaimAcknowledgementId}/${item.ClaimRequestId}`
                              )
                            }
                          >
                            <Button
                              className="claim-request-btn"
                              disabled={true}
                            ></Button>
                          </CloseIcon>
                        ),
                      ]
                    )}
                    {/* <p className="mt-1">PYT</p> */}
                  </div>
                </Grid>
              </Grid>
            </React.Fragment>
          )
        );
      });
      setRows(rows);
    }
  }, [data]);
  return (
    <TableContainer component={Paper} className="detail-table-service-line-new">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={memberId}
                onClick={() =>
                  handleMemberId(memberId === "asc" ? "desc" : "asc")
                }
              >
                Member ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={patientId}
                onClick={() =>
                  handlePatientId(patientId === "asc" ? "desc" : "asc")
                }
              >
                PT CN
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={billingNpi}
                onClick={() =>
                  handleBillingNpi(billingNpi === "asc" ? "desc" : "asc")
                }
              >
                Billing NPI
              </TableSortLabel>
            </TableCell>

            <TableCell>
              <TableSortLabel
                active={true}
                direction={dosOrder}
                onClick={() =>
                  handleDosOrder(dosOrder === "asc" ? "desc" : "asc")
                }
              >
                DOS
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={claimTotal}
                onClick={() =>
                  handleClaimTotal(claimTotal === "asc" ? "desc" : "asc")
                }
              >
                Claim Total
              </TableSortLabel>
            </TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>

        {loadingClass !== "" ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={9} className="text-center">
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
            {rows.map((row, index) => (
              <Row key={index} row={row} />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
