import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import InnerTable from "./InnerTable";
import { Button } from "@material-ui/core";
import "../../../container/Claim/styles.scss";
import Message from "./../../Messages";
import Loading from "./Loading";
import { NavLink } from "react-router-dom";
import CancelIcon from "@material-ui/icons/Cancel";
import DeletIcon from "../../../assets/images/new-design/claims-icon/delet-icon.svg";
import { common } from "../../../actions";

const ExpanableComponent = ({ data }) => (
  <div className="data-row-summary">{data.summary}</div>
);

const ExpandableTable = ({ dataLoading, claimdata, handleDelete }) => {
  const [data, setData] = useState([]);
  const [loadingClass, setLoadingClass] = useState("");
  const [dataLoadingClass, setDataLoadingClass] = useState("");
  const [adminBilled, setAdminBilled] = useState(0);
  const [adminPaid, setAdminPaid] = useState(0);
  const [jcodeBilled, setJcodeBilled] = useState(0);
  const [jcodePaid, setJcodePaid] = useState(0);
  const [claimId, setClaimId] = useState(
    useEffect(() => {
      setLoadingClass(dataLoading);
      if (claimdata !== "") {
        var data = [];
        // if (typeof claimdata !== "undefined" && claimdata.length > 0) {
        //   setClaimId(claimdata[0].claimPaymentId);
        // }
        claimdata.forEach((item, index) => {
          data.push({
            id: ++index,
            claimPaymentId: (
              <NavLink to={`/claim-detail/${item.claimPaymentId}`}>
                {item.payerClaimControlNo}
              </NavLink>
            ),
            chargeAmount: `${item.chargeAmount}`,
            paymentAmount: `${item.paymentAmount}`,
            patientRespAmount: `${item.patientRespAmount}`,
            difference: `${item.diff}`,
            status: (
              <Button variant="contained" className="cl-pending">
                <CancelIcon /> Pending
              </Button>
            ),
            summary: <InnerTable innerTableData={innerTable1} />,
            claimId: item.claimPaymentId,
          });
        });
        setData(data);
      }
    }, [claimdata, dataLoading])
  );

  const innerTable1 = {
    columns: [
      // {
      //   name: (
      //     <div>
      //       Total Amount<div>Amount Paid</div>
      //       <div>% of total claim amount </div>
      //     </div>
      //   ),
      //   selector: "totalAmount",
      // },
      // {
      //   name: (
      //     <div>
      //       Drug administration charges<div>Drug Admin Charges</div>
      //     </div>
      //   ),
      //   selector: "drugCharges",
      // },
      // {
      //   name: (
      //     <div>
      //       Drug Actual Charges Claimed <div>Drug Actual Charges Paid</div>
      //     </div>
      //   ),
      //   selector: "drugClaimed",
      // },
    ],
    data: [
      {
        totalAmount: (
          <div className="ex-td-style">
            <div className="ex-td-heading">Administration</div>
            <div>
              <span className="ex-td-text br-r pr-2">
                ${adminBilled} <span className="ex-td-text-inner">Billed</span>
              </span>
              <span className="ex-td-text pl-2">
                ${adminPaid} <span className="ex-td-text-inner">Paid</span>
              </span>
            </div>
          </div>
        ),
        drugCharges: (
          <div className="ex-td-style">
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
        ),
        drugClaimed: (
          <div className="ex-td-style">
            <div className="ex-td-heading">Ancillary</div>
            <div>
              <span className="ex-td-text br-r pr-2">
                $300 <span className="ex-td-text-inner">Billed</span>
              </span>
              <span className="ex-td-text pl-2">
                $100 <span className="ex-td-text-inner">Paid</span>
              </span>
            </div>
          </div>
        ),
        ancillaryChares: (
          <div className="ex-td-style">
            <div className="ex-td-heading">Pre-Meds</div>
            <div>
              <span className="ex-td-text br-r pr-2">
                $300 <span className="ex-td-text-inner">Billed</span>
              </span>
              <span className="ex-td-text pl-2">
                $100 <span className="ex-td-text-inner">Paid</span>
              </span>
            </div>
          </div>
        ),
      },
    ],
  };
  const columns = [
    {
      name: <div>Claim No</div>,
      selector: "claimPaymentId",
      sortable: true,
    },
    {
      name: <div>Total Amount</div>,
      selector: "chargeAmount",
      sortable: true,
    },
    {
      name: <div>Payment Amount</div>,
      selector: "paymentAmount",
      sortable: true,
    },
    {
      name: <div>Patient Resp</div>,
      selector: "patientRespAmount",
      sortable: true,
    },
    {
      name: <div>Difference(%)</div>,
      selector: "difference",
      sortable: true,
    },
    {
      name: <div style={{ marginLeft: "10px" }}>Status</div>,
      selector: "status",
      sortable: true,
      render: (rowData) => (
        <>
          <span className="u-admin-role">{rowData.status}</span>
        </>
      ),
    },
    {
      name: <div>Action</div>,
      cell: (rowData) => (
        <NavLink
          className="claim-tb-btn-view"
          variant="contained"
          to="#"
          onClick={() => handleDelete(rowData.claimId)}
        >
          {/* <DeleteOutlineIcon /> */}
          <img src={DeletIcon} alt="icon" />
        </NavLink>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];
  const handleRowExpand = async (row, data) => {
    if (row) {
      setDataLoadingClass("data-loading");
      const claimId = data.claimId;
      //GET CLIAM ADMIN AMOUNT DETAIL
      await common
        .getClaimAdminAmountDetail(claimId)
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
        .getClaimJCodeAmountDetail(claimId)
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
      setDataLoadingClass("");
    }
  };
  return (
    <React.Fragment>
      {loadingClass !== "" ? (
        <div style={{ position: "relative" }}>
          <div className={loadingClass}>
            <div className="cliam-ui-table-2">
              <Loading compHeight="200"></Loading>
            </div>
          </div>
        </div>
      ) : (
        <React.Fragment>
          <Message />
          <DataTable
            primaryKey={data.id}
            columns={columns}
            className="cliam-ui-table-2"
            data={data}
            striped={true}
            highlightOnHover={true}
            pointerOnHover={true}
            expandableRows={true}
            expandOnRowClicked={true}
            onRowExpandToggled={(row, data) => handleRowExpand(row, data)}
            expandableRowsComponent={
              dataLoadingClass !== "" ? (
                <div style={{ position: "relative" }}>
                  <div className={dataLoadingClass}>
                    <div className="cliam-ui-table-2">
                      <Loading compHeight="200"></Loading>
                    </div>
                  </div>
                </div>
              ) : (
                <ExpanableComponent />
              )
            }
            paginationComponentOptions={{
              noRowsPerPage: false,
            }}
            options={{
              actionsColumnIndex: -1,
            }}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ExpandableTable;
