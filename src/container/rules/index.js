import React, { useState, useEffect, useContext, useRef } from "react";
import { RootContext } from "../../context/RootContext";
// import "./styles.scss";
import { Box, TextField, Grid } from "@material-ui/core";

import MaterialTable from "material-table";

import { forwardRef } from "react";

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

import FooterCopyright from "../FooterCopyright";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../UserDropdown";
// import UpdateLicense from "./updateLicense";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import UserEditIcon from "../../assets/images/new-design/user-edit.svg"

import { users, claims } from "../../actions";

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

const Rules = () => {
    const [rulesData, setRulesData] = useState(null);
    const [dataLoadingClass, setDataLoadingClass] = useState("");
    const { setMessage } = useContext(RootContext);
    const [showDialogBox, setShowDialogBox] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [seats, setSeats] = useState(null);
    const [error, setError] = useState(false);
    const columns = [
        { title: "Name", field: "Name" },
        { title: "277 CA", field: "Transaction_277CA_Code" },
        { title: "835", field: "Transaction_835_Code" },
        { field: "id", hidden: true },
        // {
        //     title: "Actions",
        //     render: (rowData) => (
        //         <>
        //             <Tooltip title="Edit" placement="top">
        //                 <IconButton
        //                     onClick={() => onEdit(rowData)}
        //                     className="user-from-ac-btn"
        //                 >
        //                     <img src={UserEditIcon} style={{ cursor: "pointer" }} alt="Icon" />
        //                 </IconButton>
        //             </Tooltip>
        //             {/* <Tooltip title="Delete" placement="top">
        //     <IconButton
        //     // onClick={() => openDeleteModal(rowData)}
        //     >
        //       <DeleteOutline />
        //     </IconButton>
        //   </Tooltip> */}
        //         </>
        //     ),
        // },
    ];



    useEffect(() => {
        getClaimRules();
    }, []);

    const tableRef = useRef(null);
    useEffect(() => {
        tableRef.current.dataManager.changePageSize(15);
    }, []);

    // useEffect(() => {
    //     if (!showDialogBox) {
    //         setSeats(null);
    //         setError(false);
    //         setSelectedRow(null);
    //     }
    // }, [showDialogBox])

    // const onEdit = (data) => {
    //     setMessage({
    //         type: "",
    //         message: "",
    //     });
    //     setSelectedRow(data);
    //     setSeats(data.totalSeats);
    //     setShowDialogBox(true);

    // };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     if (selectedRow.totalSeats && seats == "") {
    //         setError(true);
    //     }

    //     let body = {
    //         seats,
    //         subscriptionId: selectedRow.subscriptionId
    //     }

    //     users.updateLicense(body).then(result => {
    //         const licenseIndex = userListingData.findIndex(user => user.subscriptionId === selectedRow.subscriptionId)
    //         if (licenseIndex !== -1) {
    //             let newData = [...userListingData];
    //             newData[licenseIndex] = { ...selectedRow, totalSeats: seats };
    //             setUserListingData(newData);
    //             setShowDialogBox(false)
    //         }
    //     })
    //         .catch(err => {
    //             setSeats(null);
    //             setError(false);
    //             setSelectedRow(null);
    //             setShowDialogBox(false)
    //         })

    // }

    const getClaimRules = () => {
        setDataLoadingClass("data-loading");
        claims.getClaimRules().then((response) => {
            if (response.data.success === true) {
                setDataLoadingClass("");
                const data = response.data.data;
                setRulesData(data);
            } else {
                setDataLoadingClass("");
            }
        });

    };

    return (
        <>
            <header className="dashboard-header header-new">
                <div className="header-search-main">
                    <div className="seach-form">
                        <img src={searchImg} alt="Search" />
                        <TextField
                            id="standard-search"
                            placeholder="Search"
                            type="search"
                            className="mt-0"
                        />
                    </div>
                    <UserDropdown />
                </div>
            </header>
            <Box className="dashboard-main">
                <h2 className="page-heading">Claim Rules</h2>

                {/* Breadcrumbs */}
                <Box className="breadcreams-new">
                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link className="" color="inherit" href="/dr-services">
                            Dashboard
              </Link>
                        <Typography color="textPrimary">
                            Claim Rules
              </Typography>
                    </Breadcrumbs>
                </Box>
                {/*End Breadcrumbs */}


                <div className="dashboard-content">
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
                                                rulesData && rulesData.length > 0
                                                    ? rulesData
                                                    : []
                                            }
                                            options={{
                                                selection: true,
                                                actionsColumnIndex: -1,
                                                search: false,
                                                rowStyle: {},
                                            }}
                                        />
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    {/* {
            showDialogBox && (
              <UpdateLicense
                showDialogBox={showDialogBox}
                setShowDialogBox={setShowDialogBox}
                selectedRow={selectedRow}
                seats={seats}
                error={error}
                handleChangeSeats={(e) => { setSeats(e.target.value) }}
                handleSubmit={handleSubmit}
              />
            )
          } */}
                </div>
                <FooterCopyright />
            </Box>
        </>
    );
};

export default Rules;
