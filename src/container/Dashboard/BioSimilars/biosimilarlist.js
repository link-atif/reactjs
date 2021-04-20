import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { IconButton, Collapse } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Loading from '../../../components/common/ExpandableTable/Loading';
import { biosimilar } from "../../../actions";
import BiosimilarReferenceDetail from "./biosimilarReferenceDetail";
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});


export default function BiosimilarsTable(props) {

    const { biosimilarData, loading } = props;
    const [selectedCode, setSelectedCode] = useState(null);

    return (
        <div className="tb-scroll">
            <TableContainer className="detail-table-service-line-new tb-scroll" component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Reference Code</TableCell>
                            <TableCell>Reference Drug</TableCell>
                            <TableCell>Reference Count</TableCell>
                            <TableCell>Biosimilar</TableCell>
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
                                    {biosimilarData.map((row) => (
                                        <React.Fragment>
                                            <TableRow >
                                                <TableCell>
                                                    <span className="mr-3">
                                                        <IconButton className="tree-tb-ic-btn" aria-label="expand row" size="small">
                                                            {row.ReferenceCPTCode === selectedCode ? (
                                                                <ExpandLessIcon
                                                                    className="dr-gr-svg"
                                                                    onClick={() => setSelectedCode(null)}
                                                                />
                                                            ) : (
                                                                    <ExpandMoreIcon
                                                                        onClick={() => setSelectedCode(row.ReferenceCPTCode)}
                                                                    />
                                                                )}
                                                        </IconButton>
                                                    </span>
                                                </TableCell>
                                                <TableCell>
                                                    {row.ReferenceCPTCode}
                                                </TableCell>
                                                <TableCell>{row.ReferenceDrug}</TableCell>
                                                <TableCell>{row.ReferenceDrugCount}</TableCell>
                                                <TableCell className="DR-text-wrap">{row.BiosimilarDrug}</TableCell>
                                            </TableRow>
                                            <TableRow style={{ height: "0px" }}>
                                                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
                                                    <Collapse
                                                        in={row.ReferenceCPTCode === selectedCode ? true : false}
                                                        // in={false}
                                                        timeout="auto"
                                                        unmountOnExit
                                                    >
                                                        {
                                                            row.ReferenceCPTCode === selectedCode && (
                                                                <BiosimilarReferenceDetail selectedCode={selectedCode}></BiosimilarReferenceDetail>
                                                            )
                                                        }
                                                    </Collapse>
                                                </TableCell>
                                            </TableRow>
                                        </React.Fragment>
                                    ))}
                                </TableBody>
                            )
                    }
                </Table>
            </TableContainer>
        </div>
    );
}
