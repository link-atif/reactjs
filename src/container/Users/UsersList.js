import React, { useEffect, useRef } from "react";

import MaterialTable from "material-table";
import { forwardRef } from "react";
import { Tooltip, IconButton, Box } from "@material-ui/core";
import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import UserEditIcon from "../../assets/images/new-design/user-edit.svg"
import UserLockIcon from "../../assets/images/new-design/user-lock.svg"
import UserDeleteIcon from "../../assets/images/new-design/user-delete.svg"

const UsersList = ({
  userListing,
  handleEdit,
  onChangePassword,
  handleDelete,
  dataLoadingClass,
}) => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };

  const columns = [
    {
      title: "Display Name",
      field: "displayName",
      render: (rowData) => (
        <>
          <span
            onClick={() => handleEdit(rowData)}
            style={{ cursor: "pointer" }}
          >
            {rowData.displayName}
          </span>
        </>
      ),
    },
    { title: "Email", field: "email" },
    {
      title: "Roles",
      field: "roles",
      render: (rowdata) => (
        <>
          {rowdata.roles.map((item, index) => {
            return (
              <span
                key={index}
                className={
                  item.roleId === "c5a99825-8da0-4ebe-adbc-e15a775d5049"
                    ? "ml-1  u-admin-role"
                    : "ml-1  u-other-role"
                }
              >
                {item.name}
              </span>
            );
          })}
        </>
      ),
    },
    { field: "id", hidden: true },
    {
      title: "Actions",
      render: (rowData) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton className="user-from-ac-btn" onClick={() => handleEdit(rowData)}>
              <img src={UserEditIcon} alt="Icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reset Password" placement="top">
            <IconButton className="user-from-ac-btn" onClick={() => onChangePassword(rowData)}>
              <img src={UserLockIcon} alt="Icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton className="user-from-ac-btn" onClick={() => handleDelete(rowData)}>
              <img src={UserDeleteIcon} alt="Icon" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const tableRef = useRef(null);
  useEffect(() => {
    tableRef.current.dataManager.changePageSize(15);
  }, []);

  return (
    <Box>

      <div className={dataLoadingClass}>
        <div className="detail-table-service-line-new bg-white custom-pd-tb show-non tb-scroll">
          <MaterialTable
            tableRef={tableRef}
            icons={tableIcons}
            title=""
            columns={columns}
            data={userListing && userListing.length > 0 ? userListing : []}
            options={{
              selection: true,
              actionsColumnIndex: -1,
              search: false,
              rowStyle: {},
            }}
          />
        </div>
      </div>
    </Box>
  );
};
export default UsersList;
