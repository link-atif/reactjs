import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Grid, Button } from "@material-ui/core";

import MaterialTable from "material-table";

import { forwardRef } from "react";
import CloseIcon from "@material-ui/icons/Close";

import { Tooltip, IconButton } from "@material-ui/core";
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

import { users } from "../../../actions";
import { Drawer } from "@material-ui/core";
import { RootContext } from "../../../context/RootContext";
import UpdateAdminCode from "./UpdateAdminCode/index";
import ModalBoxCustom from "../../../components/common/Modal/customModel";


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
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const AdminCode = () => {
  const [ListingAdminCode, setListingAdminCode] = useState({});
  const [loadingClass, setLoadingClass] = useState("");
  const [dataLoadingClass, setDataLoadingClass] = useState("");
  const { setMessage } = useContext(RootContext);
  const [showDrawer, setShowDrawer] = useState(false);
  const [update, setUpdate] = useState(false);

  const [formData, setFormData] = useState({
    CAdminCodeId: "",
    CPTCode: "",
    Category: "",
    Description: "",
  });

  // deleteData-------------
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const modalDataObj = {
    title: "Confirm Delete!",
    description: "Are you sure you want to delete this Item ?",
  };

  const columns = [
    { title: "CPTCode", field: "cptCode" },
    { title: "Category", field: "category" },
    { title: "Description", field: "description" },

    { field: "id", hidden: true },
    {
      title: "Actions",
      render: (rowData) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleUpdateAdminCode(rowData)}>
              <Edit style={{ cursor: "pointer", marginRight: "5px" }} />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" placement="top">
            <IconButton onClick={() => openDeleteModal(rowData)}>
              <DeleteOutline />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (update) {
      // call update api here
      setLoadingClass("loading");
      users.updateAdminCode(formData).then((response) => {
        if (response.data.success === true) {
          setLoadingClass("");
          setMessage({
            type: "success",
            message: response.data.message,
          });
          setShowDrawer(false);
          const index = ListingAdminCode.findIndex(
            (item) => item.cAdminCodeId === formData.CAdminCodeId
          );
          let tempAdminCode = [...ListingAdminCode];
          if (index !== -1) {
            tempAdminCode[index].cAdminCodeId = formData.CAdminCodeId;
            tempAdminCode[index].category = formData.Category;
            tempAdminCode[index].cptCode = formData.CPTCode;
            tempAdminCode[index].description = formData.Description;
          }
          setListingAdminCode(tempAdminCode);
        } else {
          setMessage({
            type: "error",
            message: response.data.message,
          });
          setLoadingClass("");
        }
      });
    } else {
      // call insert api here
      setLoadingClass("loading");
      users.addAdminCode(formData).then((response) => {
        if (response.data.success === true) {
          setLoadingClass("");
          setMessage({
            type: "success",
            message: response.data.message,
          });
          setShowDrawer(false);
          getAdminCodeData();
        } else {
          setMessage({
            type: "error",
            message: response.data.message,
          });
          setLoadingClass("");
        }
      });
    }
  };

  const handleUpdateAdminCode = (data) => {
    setMessage({
      type: "",
      message: "",
    });
    const index = ListingAdminCode.findIndex(
      (adminData) => adminData.cAdminCodeId === data.cAdminCodeId
    );
    if (index !== -1) {
      let adminCode = {
        CAdminCodeId: ListingAdminCode[index].cAdminCodeId,
        CPTCode: ListingAdminCode[index].cptCode,
        Category: ListingAdminCode[index].category,
        Description: ListingAdminCode[index].description,
      };

      setFormData(adminCode);
      setUpdate(true);
      setShowDrawer(true);
    }
  };
  const handleAddAdminCode = () => {
    setMessage({
      type: "",
      message: "",
    });
    setFormData({
      CAdminCodeId: "",
      CPTCode: "",
      Category: "",
      Description: "",
    });
    setUpdate(false);
    setShowDrawer(true);
  };

  const closeUser = () => {
    setShowDrawer(false);
  };

  const openDeleteModal = (data) => {
    setMessage({
      type: "",
      message: "",
    });
    setDeleteData(data);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onDelete = () => {
    let { cAdminCodeId } = deleteData;
    setLoadingClass("loading");
    users
      .deleteAdminCode({ cAdminCodeId })
      .then((response) => {
        if (response.data.success === true) {
          setLoadingClass("");
          setOpen(false);
          setMessage({
            type: "success",
            message: response.data.message,
          });
          const newData = ListingAdminCode.filter(
            (data) => data.cAdminCodeId !== cAdminCodeId
          );
          setListingAdminCode(newData);
        } else {
          setLoadingClass("");
          setMessage({
            type: "error",
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        setLoadingClass("");
        // setOpen(false);
        setMessage({
          type: "error",
          message: error.response.data.message,
        });
      });
  };

  useEffect(() => {
    getAdminCodeData();
  }, []);

  const tableRef = useRef(null);
  useEffect(() => {
    tableRef.current.dataManager.changePageSize(15);
  }, []);

  const getAdminCodeData = () => {
    setDataLoadingClass("data-loading");
    users
      .getAdminCode()
      .then((response) => {
        if (response.data.success === true) {
          setDataLoadingClass("");
          const data = response.data.data;
          setListingAdminCode(data);
        } else {
          setMessage({
            type: "error",
            message: response.data.message,
          });
          setLoadingClass("");
        }
      })
      .catch((error) => {
        // console.log("error--->>", error);
        setLoadingClass("");
        setMessage({
          type: "error",
          message: error.response && error.response.data.message,
        });
      });
  };

  return (
    <>
      <Box className="">
        <Grid container>
          <div style={{ width: "100%" }}>
            <Box display="flex">
              <Box flexGrow={1}>
                <h2 className="page-heading">Admin codes</h2>
              </Box>

              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  style={{
                    display: "inline-block",
                    backgroundColor: "#0AE2B3",
                    padding: "10px 30px",
                    fontSize: "14px",
                    fontWeight: "400",
                    color: "#ffffff",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    textDecoration: "none",
                    float: "right",
                    boxShadow: "none"
                  }}
                  onClick={() => handleAddAdminCode()}
                >
                  + Add New Item
                </Button>
              </Box>
            </Box>
          </div>
        </Grid>
        <div className="">
          <div className="">
            <Grid container>
              <Grid item xs={12}>
                <div className="detail-table-service-line-new bg-white custom-pd-tb show-non tb-scroll mt-3">
                  <div className={dataLoadingClass}>
                    <MaterialTable
                      tableRef={tableRef}
                      title=""
                      icons={tableIcons}
                      columns={columns}
                      data={
                        ListingAdminCode && ListingAdminCode.length > 0
                          ? ListingAdminCode
                          : []
                      }
                      options={{
                        selection: true,
                        actionsColumnIndex: -1,
                        search: true,
                        rowStyle: {},
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
        </div>
        <Drawer anchor={"right"} open={showDrawer}>
          <div className="add-user-overlay">
            <CloseIcon className="close" onClick={closeUser} />
            {
              <UpdateAdminCode
                handleSubmit={onSubmit}
                onChange={onChange}
                formData={formData}
                update={update}
                loadingClass={loadingClass}
              />
            }
          </div>
        </Drawer>
      </Box>
      <ModalBoxCustom
        modalData={modalDataObj}
        handleConfirm={onDelete}
        open={open}
        handleClose={handleClose}
        size="sm"
        action={true}
        loadingClass={loadingClass}
      />
    </>
  );
}

export default AdminCode;
