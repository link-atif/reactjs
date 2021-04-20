import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Grid } from "@material-ui/core";

import MaterialTable from "material-table";

import CloseIcon from "@material-ui/icons/Close";
import { forwardRef } from "react";

import { Tooltip, IconButton, Button } from "@material-ui/core";
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
import PaginationNew from "./PaginationNew";

import { Drawer } from "@material-ui/core";
import { users } from "../../../actions";
import { RootContext } from "../../../context/RootContext";
import UpdateJCode from "./UpdateJCodes/index";
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

const JCodes = () => {
  const { setMessage } = useContext(RootContext);
  const [loadingClass, setLoadingClass] = useState("");
  const [ListingJCode, setListingJCode] = useState([]);
  const [dataLoadingClass, setDataLoadingClass] = useState("");
  const [showDrawer, setShowDrawer] = useState(false);
  const [update, setUpdate] = useState(false);

  // pagination states

  const [page, setPage] = useState(1);
  const [offSet, setOffSet] = useState(0);
  const [totalCount, setTotalCount] = useState(10);
  const [countPerPage, setCountPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);

  const [formData, setFormData] = useState({
    JCodeId: "",
    DrugName: "",
    Code: "",
    isAncillary: false,
    isPreMed: false,
    isHormonal: false,
    isImmuno: false,
    isBiologics: false,
    isChemo: false
  });

  // deleteData-------------
  const [open, setOpen] = useState(false);
  const [deleteData, setDeleteData] = useState({});
  const modalDataObj = {
    title: "Confirm Delete!",
    description: "Are you sure you want to delete this Item ?",
  };

  const columns = [
    { title: "Code", field: "code" },
    { title: "DrugName", field: "drugName" },
    { title: "IsAncillary", field: "isAncillary" },
    { title: "IsPreMed", field: "isPreMed" },
    { title: "Chemo", field: "isChemo" },
    { title: "Hormonal", field: "isHormonal" },
    { title: "Immuno", field: "isImmuno" },
    { title: "isBiologics", field: "isBiologics" },
    { field: "id", hidden: true },
    {
      title: "Actions",
      render: (rowData) => (
        <>
          <Tooltip title="Edit" placement="top">
            <IconButton onClick={() => handleUpdateJCode(rowData)}>
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
    if (formData.isAncillary === "true") {
      formData.isAncillary = true;
    } else {
      formData.isAncillary = false;
    }
    if (formData.isPreMed === "true") {
      formData.isPreMed = true;
    } else {
      formData.isPreMed = false;
    }
    if (formData.isBiologics == "true") {
      formData.isBiologics = true
    } else {
      formData.isBiologics = false
    }
    if (formData.isChemo == "true") {
      formData.isChemo = true
    } else {
      formData.isChemo = false
    }
    if (formData.isHormonal == "true") {
      formData.isHormonal = true
    } else {
      formData.isHormonal = false
    }
    if (formData.isImmuno == "true") {
      formData.isImmuno = true
    } else {
      formData.isImmuno = false
    }

    if (update) {
      // call update api here
      setLoadingClass("loading");
      users
        .updateJCode(formData)
        .then((response) => {
          if (response.data.success === true) {
            setLoadingClass("");
            setMessage({
              type: "success",
              message: response.data.message,
            });
            setShowDrawer(false);
            const index = ListingJCode.findIndex(
              (jcodedata) => jcodedata.jCodeId === formData.JCodeId
            );
            let tempJCode = [...ListingJCode];
            if (index !== -1) {
              tempJCode[index].code = formData.Code;
              tempJCode[index].drugName = formData.DrugName;
              tempJCode[index].isAncillary = formData.isAncillary;
              tempJCode[index].isPreMed = formData.isPreMed;
              tempJCode[index].isImmuno = formData.isImmuno;
              tempJCode[index].isBiologics = formData.isBiologics;
              tempJCode[index].isChemo = formData.isChemo;
              tempJCode[index].isHormonal = formData.isHormonal;
              tempJCode[index].jCodeId = formData.JCodeId;
            }
            setListingJCode(tempJCode);
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
            });
            setLoadingClass("");
          }
        })
        .catch((error) => {
          //  console.log("error--->>", error);
          setLoadingClass("");
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
        });

    } else {
      // call insert api here
      setLoadingClass("loading");
      users
        .AddJCode(formData)
        .then((response) => {
          if (response.data.success === true) {
            setLoadingClass("");
            setMessage({
              type: "success",
              message: response.data.message,
            });
            setShowDrawer(false);
            getJCodeData();
          } else {
            setMessage({
              type: "error",
              message: response.data.message,
            });
            setLoadingClass("");
          }
        })
        .catch((error) => {
          //  console.log("error--->>", error);
          setLoadingClass("");
          setMessage({
            type: "error",
            message: error.response.data.message,
          });
        });
    }
  };

  const handlePageChange = (page) => {
    let offSet = (page - 1) * countPerPage;
    setPage(page);
    setOffSet(offSet);
  };

  const handleRowPerPage = (val) => {
    setTotalCount(val);
    setCountPerPage(val);
  };


  useEffect(() => {
    getJCodeData();
  }, []);

  const tableRef = useRef(null);
  useEffect(() => {
    tableRef.current.dataManager.changePageSize(15);
  }, []);



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
    let { jCodeId } = deleteData;
    setLoadingClass("loading");
    users
      .deleteJCode({ jCodeId })
      .then((response) => {
        if (response.data.success === true) {
          setLoadingClass("");
          setOpen(false);
          setMessage({
            type: "success",
            message: response.data.message,
          });
          const newData = ListingJCode.filter((data) => data.jCodeId !== jCodeId);
          setListingJCode(newData);
        } else {
          setLoadingClass("");
          setMessage({
            type: "error",
            message: response.data.message,
          });
        }
      })
      .catch((error) => {
        //  console.log("error--->>", error);
        setLoadingClass("");
        setMessage({
          type: "error",
          message: error.response.data.message,
        });
      });
  };

  const handleUpdateJCode = (data) => {

    setMessage({
      type: "",
      message: "",
    });

    let JCodeData = {
      JCodeId: data.jCodeId,
      DrugName: data.drugName,
      Code: data.code,
      isAncillary: data.isAncillary === true ? "true" : "false",
      isPreMed: data.isPreMed === true ? "true" : "false",
      isHormonal: data.isHormonal === true ? "true" : "false",
      isImmuno: data.isImmuno === true ? "true" : "false",
      isBiologics: data.isBiologics === true ? "true" : "false",
      isChemo: data.isChemo === true ? "true" : "false",
    };
    setFormData(JCodeData);
    setUpdate(true);
    setShowDrawer(true);
  };

  const handleAddJCode = () => {
    setMessage({
      type: "",
      message: "",
    });
    setFormData({
      JCodeId: "",
      DrugName: "",
      Code: "",
      isAncillary: false,
      isPreMed: false,
      isHormonal: false,
      isImmuno: false,
      isBiologics: false,
      isChemo: false
    });
    setUpdate(false);
    setShowDrawer(true);
  };

  const closeUser = () => {
    setShowDrawer(false);
  };

  const getJCodeData = () => {
    setDataLoadingClass("data-loading");

    users
      .getJCode()
      .then((response) => {
        if (response.data.success === true) {
          setDataLoadingClass("");
          const data = response.data.data;
          setListingJCode(data);
        } else {
          setMessage({
            type: "error",
            message: response.data.message,
          });
          setLoadingClass("");
        }
      })
      .catch((error) => {
        setLoadingClass("");
        setMessage({
          type: "error",
          message: error.response && error.response.data.message,
        });
      });
  };


  const data = ListingJCode && ListingJCode.length > 0 ? ListingJCode : [];

  return (
    <>
      <Box className="">
        <Grid container>
          <div style={{ width: "100%" }}>
            <Box display="flex">
              <Box flexGrow={1}>
                <h2 className="page-heading">JCodes</h2>
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
                  onClick={() => handleAddJCode()}
                >
                  + Add New Item
                </Button>
              </Box>
            </Box>
          </div>
        </Grid>

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
                    data={data.slice(page * countPerPage, page * countPerPage + countPerPage)}
                    options={{
                      selection: true,
                      actionsColumnIndex: -1,
                      search: true,
                      rowStyle: {},
                    }}
                  />
                </div>
              </div>
              <PaginationNew
                count={Math.round(data.length / countPerPage)}
                page={page}
                handlePageChange={(e) => handlePageChange(e)}
                countPerPage={countPerPage}
                totalCount={totalCount}
                totalRecords={data.length}
                handleRowPerPage={handleRowPerPage}
              />
            </Grid>
          </Grid>
        </div>
        <Drawer anchor={"right"} open={showDrawer}>
          <div className="add-user-overlay">
            <CloseIcon className="close" onClick={closeUser} />
            {
              <UpdateJCode
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

export default JCodes;
