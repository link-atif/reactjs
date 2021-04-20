import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Paper, Button, TableSortLabel } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import CancelIcon from "@material-ui/icons/Cancel";
import "../commonstyle/Styles.scss";
import { common } from "../../actions";
import Loading from "../../components/common/ExpandableTable/Loading";
import DeletIcon from "../../assets/images/new-design/claims-icon/delet-icon.svg";
import AdminIcon from "../../assets/images/admin.svg";
import jcodeIcon from "../../assets/images/jcode.svg";
import AncillaryIcon from "../../assets/images/medicine.svg";
import PreMedsIcon from "../../assets/images/Pre-Meds.svg";
import { NavLink } from "react-router-dom";
import InnerTable from "../../components/common/ExpandableTable/InnerTable";
import InfoIcon from "@material-ui/icons/Info";
import CheckIcon from "@material-ui/icons/Check";
import LinearProgress from "@material-ui/core/LinearProgress";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "red",
  },
});

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
    border: "1px solid white",
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === "light" ? 200 : 800],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: "#70e3b4",
  },
}))(LinearProgress);

function Row(props) {
  const { row, servicePayments, isOpen, handleDelete } = props;
  const [open, setOpen] = React.useState(false);
  const [adminBilled, setAdminBilled] = useState(0);
  const [adminPaid, setAdminPaid] = useState(0);
  const [jcodeBilled, setJcodeBilled] = useState(0);
  const [jcodePaid, setJcodePaid] = useState(0);
  const [ancillaryBilled, setAncillaryBilled] = useState(0);
  const [ancillaryPaid, setAncillaryPaid] = useState(0);
  const [premedBilled, setPremedBilled] = useState(0);
  const [premedPaid, setPremedPaid] = useState(0);
  const [loadingClass, setLoadingClass] = useState("");
  const [claimAdjustments, setClaimAdjustments] = React.useState([]);
  const classes = useRowStyles();
  const handleClaimServicePayments = async (id) => {
    setOpen(!open);
    setLoadingClass("data-loading");
    //GET CLIAM ADMIN AMOUNT DETAIL
    await common
      .getClaimAdminAmountDetail(id)
      .then((response) => {
        const { data: result } = response;
        if (result.data !== "") {
          setAdminBilled(result.data[0].claimed);
          setAdminPaid(result.data[0].paid);
        }
      })
      .catch((error) => {
        console.log("admin amount error is ", error);
      });

    // GET CLIAM JCODE AMOUNT DETAIL
    await common
      .getClaimJCodeAmountDetail(id)
      .then((response) => {
        const { data: result } = response;
        if (result.data !== "") {
          setJcodeBilled(result.data[0].claimed);
          setJcodePaid(result.data[0].paid);
        }
      })
      .catch((error) => {
        console.log("admin amount error is ", error);
      });

    // GET CLIAM Ancillary AMOUNT DETAIL
    await common
      .getClaimAncillaryAmountDetail(id)
      .then((response) => {
        const { data: result } = response;
        if (result.data !== "") {
          setAncillaryBilled(result.data[0].claimed);
          setAncillaryPaid(result.data[0].paid);
        }
      })
      .catch((error) => {
        console.log("admin amount error is ", error);
      });

    // GET CLIAM Premed AMOUNT DETAIL
    await common
      .getClaimPreMedAmountDetail(id)
      .then((response) => {
        const { data: result } = response;
        if (result.data !== "") {
          setPremedBilled(result.data[0].claimed);
          setPremedPaid(result.data[0].paid);
        }
      })
      .catch((error) => {
        console.log("admin amount error is ", error);
      });

    setLoadingClass("");
  };
  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);
  const innerTable1 = {
    data: [
      {
        totalAmount: (
          <div className="ex-td-style">
            <div className="d-inline pull-left mr-2">
              <img style={{ width: '24px', marginTop: '5px', }} src={AdminIcon} alt="icon" />
            </div>
            <div className="d-inline pull-left">
              <div className="ex-td-heading">

                Administration
              </div>
              <div>
                <span className="ex-td-text br-r pr-2">
                  ${adminBilled} <span className="ex-td-text-inner">Billed</span>
                </span>
                <span className="ex-td-text pl-2">
                  ${adminPaid} <span className="ex-td-text-inner">Paid</span>
                </span>
              </div>
            </div>
          </div>
        ),
        drugCharges: (
          <div className="ex-td-style">
            <div className="d-inline pull-left mr-2">
              <img style={{ width: '24px', marginTop: '5px', }} src={jcodeIcon} alt="icon" />
            </div>
            <div className="d-inline pull-left">
              <div className="ex-td-heading">Jcode</div>
              <div>
                <span className="ex-td-text br-r pr-2">
                  ${jcodeBilled} <span className="ex-td-text-inner">Billed</span>
                </span>
                <span className="ex-td-text pl-2">
                  ${jcodePaid} <span className="ex-td-text-inner">Paid</span>
                </span>
              </div>
            </div>
          </div>
        ),
        drugClaimed: (
          <div className="ex-td-style">
            <div className="d-inline pull-left mr-2">
              <img style={{ width: '24px', marginTop: '5px', }} src={PreMedsIcon} alt="icon" />
            </div>
            <div className="d-inline pull-left">
              <div className="ex-td-heading">Ancillary</div>
              <div>
                <span className="ex-td-text br-r pr-2">
                  ${ancillaryBilled}{" "}
                  <span className="ex-td-text-inner">Billed</span>
                </span>
                <span className="ex-td-text pl-2">
                  ${ancillaryPaid} <span className="ex-td-text-inner">Paid</span>
                </span>
              </div>
            </div>
          </div>
        ),
        ancillaryChares: (
          <div className="ex-td-style">
            <div className="d-inline pull-left mr-2">
              <img style={{ width: '24px', marginTop: '5px', }} src={AncillaryIcon} alt="icon" />
            </div>
            <div className="d-inline pull-left">
              <div className="ex-td-heading">Pre-Meds</div>
              <div>
                <span className="ex-td-text br-r pr-2">
                  ${premedBilled} <span className="ex-td-text-inner">Billed</span>
                </span>
                <span className="ex-td-text pl-2">
                  ${premedPaid} <span className="ex-td-text-inner">Paid</span>
                </span>
              </div>
            </div>
          </div>
        ),
      },
    ],
  };
  return (
    <React.Fragment>
      <TableRow className="abc">
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            // onClick={() => setOpen(!open)}
            onClick={() => handleClaimServicePayments(row.claimPaymentId)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="" scope="row">
          <NavLink to={`/claim-detail/${row.claimPaymentId}`}>
            {row.payerClaimControlNo}
          </NavLink>
        </TableCell>
        <TableCell>
          <NavLink to={`/patient-details/${row.patientControlNo}`}>
            {row.patientControlNo}
          </NavLink>
        </TableCell>
        <TableCell>{row.chargeAmount}</TableCell>
        <TableCell>{row.allowedAmount}</TableCell>
        <TableCell>{row.paymentAmount}</TableCell>
        <TableCell>{row.patientRespAmount}</TableCell>
        <TableCell>
          {row.diff}%<br></br>
          <BorderLinearProgress
            // className="red-diff"
            variant="determinate"
            value={row.diff}
            className={
              row.diff < 70
                ? "red-diff"
                : [
                  row.diff > 70 && row.diff < 100
                    ? "yellow-diff"
                    : "success-diff",
                ]
            }
          />
        </TableCell>

        <TableCell>
          {row.status === "Paid" ? (
            <Button variant="contained" className="cl-paid">
              <CheckIcon /> {row.status}
            </Button>
          ) : (
            [
              row.status == "Partial" ? (
                <Button variant="contained" className="cl-partial">
                  <InfoIcon /> {row.status}
                </Button>
              ) : (
                <Button variant="contained" className="cl-pending">
                  <CancelIcon /> {row.status}
                </Button>
              ),
            ]
          )}
          {/* <Button variant="contained" className="cl-pending">
            <CancelIcon /> {row.status}
          </Button> */}
        </TableCell>
        <TableCell>
          <NavLink
            className="claim-tb-btn-view"
            variant="contained"
            to="#"
            onClick={() => handleDelete(row.claimPaymentId)}
          >
            <img src={DeletIcon} alt="icon" />
          </NavLink>
        </TableCell>
      </TableRow>

      <TableRow className="new-ui">
        <TableCell style={{ padding: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="">
              {loadingClass !== "" ? (
                <div style={{ position: "relative" }}>
                  <div className={loadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading compHeight="200"></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="data-row-summary">
                  {<InnerTable innerTableData={innerTable1} />}
                </div>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const ClaimDetailTable = ({
  servicePayments,
  handleDelete,
  dataloadingClass,
  noOrder,
  handleNumOrder,
  totalAmountOrder,
  handleAmountOrder,
  paymentOrder,
  handlePaymentOrder,
  differenceOrder,
  handleDifferenceOrder,
  patientOrder,
  handlePatientOrder,
}) => {
  const [rows, setRows] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (servicePayments !== "") {
      var rows = [];
      servicePayments.forEach((item) => {
        rows.push(item);
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
            <TableCell>
              <TableSortLabel
                active={true}
                direction={noOrder}
                onClick={() =>
                  handleNumOrder(noOrder === "asc" ? "desc" : "asc")
                }
              >
                Claim No
              </TableSortLabel>
            </TableCell>
            <TableCell>PT CN</TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={totalAmountOrder}
                onClick={() =>
                  handleAmountOrder(totalAmountOrder === "asc" ? "desc" : "asc")
                }
              >
                Total Amt
              </TableSortLabel>
            </TableCell>
            <TableCell>Allowed Amt</TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={paymentOrder}
                onClick={() =>
                  handlePaymentOrder(paymentOrder === "asc" ? "desc" : "asc")
                }
              >
                PYT AMT
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={patientOrder}
                onClick={() =>
                  handlePatientOrder(patientOrder === "asc" ? "desc" : "asc")
                }
              >
                PT Resp
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={true}
                direction={differenceOrder}
                onClick={() =>
                  handleDifferenceOrder(
                    differenceOrder === "asc" ? "desc" : "asc"
                  )
                }
              >
                Diff(%)
              </TableSortLabel>
            </TableCell>


            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
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
            {rows.map((row, index) => (
              <Row
                key={index}
                row={row}
                isOpen={isOpen}
                handleDelete={handleDelete}
              />
            ))}
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
};

export default ClaimDetailTable;
