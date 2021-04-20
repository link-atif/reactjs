import React, { useEffect, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Paper, Box } from '@material-ui/core';
import Loading from '../../../components/common/ExpandableTable/Loading';
import { biosimilar } from "../../../actions";
import { RootContext } from "../../../context/RootContext";
import PaginationNew from "./paginationView"

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function BiosimilarReferenceDetail(props) {

    const classes = useStyles();
    const { setMessage, subscriptionID, userPreferences } = useContext(
        RootContext
    );
    const [biosimilarRefData, setBiosimilarRefData] = useState([]);
    const [loading, setLoading] = useState("");
    const [countPerPage, setCountPerPage] = useState(
        (userPreferences.NoOfRecordInTable &&
            userPreferences.NoOfRecordInTable !== "undefined" &&
            userPreferences.NoOfRecordInTable !== "null") ? parseInt(userPreferences.NoOfRecordInTable) : 10
    );
    const [page, setPage] = useState(1);
    const [offSet, setOffSet] = useState(0);
    const [totalCount, setTotalCount] = useState(10);
    const [pageRows, setPageRows] = useState(0);
    const [totalRecords, setTotalRecords] = useState(0);

    const handlePageChange = (page) => {
        let offSet = (page - 1) * countPerPage;
        setPage(page);
        setOffSet(offSet);
    };
    const handleRowPerPage = (val) => {
        setTotalCount(val);
        setCountPerPage(val);
    };


    const getBiosimilarDrugUsedDetail = () => {
        if (page !== "") {

            setLoading("data-loading");
            biosimilar.getBiosimilarDrugUsedDetail(offSet, countPerPage, props.selectedCode).then(res => {
                if (res.data && res.data.data && res.data.data.output) {
                    const { data: { output, totalCount } } = res.data;
                    setBiosimilarRefData(output);
                    setTotalRecords(totalCount);
                    if (totalCount > 0) {
                        setPageRows(Math.round(totalCount / countPerPage));
                    }
                    setLoading("")
                }
            })
                .catch(error => {
                    setLoading("")
                })
        }
    }

    useEffect(() => {
        getBiosimilarDrugUsedDetail();
    }, [
        page,
        countPerPage
    ])

    return (
        <Box className="claim-detail-inner-tbl-tree tb-scroll pl-tb-denail-d">
            <span className="doted-line-tb-inner-denail"><span className="tb-line-dot"></span></span>
            {/* <TableContainer component={Box}> */}
            <Table className={classes.table} component={Box} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Claim No</TableCell>
                        <TableCell>Charge Amount</TableCell>
                        <TableCell>Allowed Amount</TableCell>
                        <TableCell>Payment Amount</TableCell>
                    </TableRow>
                </TableHead>
                {
                    loading !== "" ? (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={10} className="text-center">
                                    <div style={{ position: "relative" }}>
                                        <div className={loading}>
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
                                {biosimilarRefData.map((row) => (
                                    <TableRow >
                                        <TableCell style={{ color: "#3d7b77" }}>
                                            <Link to={`/claim-detail/${row.ClaimPaymentId}`}>
                                                {row.PayerClaimControlNo}
                                            </Link>
                                        </TableCell>
                                        <TableCell>${row.ChargeAmount}</TableCell>
                                        <TableCell>${row.AllowedAmount}</TableCell>
                                        <TableCell>${row.PaymentAmount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        )
                }
            </Table>
            {totalRecords > 0 ? (
                <PaginationNew
                    count={pageRows}
                    page={page}
                    handlePageChange={(e) => handlePageChange(e)}
                    countPerPage={countPerPage}
                    totalCount={totalCount}
                    totalRecords={totalRecords}
                    handleRowPerPage={handleRowPerPage}
                />
            ) : null}
            {/* </TableContainer> */}
        </Box>
    );
}
