import React from "react";
import {
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
    MenuList,
    MenuItem,
    makeStyles,
    Grid,
    Box,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import searchImg from "../../assets/images/search.svg";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { Input } from "antd";

import FilterLabelIcon from "../../assets/images/SVGIcons/FilterLabelIcon"
import CloseIcon from "@material-ui/icons/Close";

const LabelFilter = (props) => {
    const {
        claimStatusName,
        selectedPayers,
        handlePayerSelection,
        setClaimStatusName,
        handleFilterBar
    } = props;

    return (
        <>
            <Box className="mt-3">
                <label className="mr-2" onClick={handleFilterBar} style={{ cursor: 'pointer' }}><FilterLabelIcon /></label>
                {
                    claimStatusName !== "" && claimStatusName !== "All" && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">Claim Status</p>
                            <label className="label-filter mr-1">{claimStatusName}
                                <CloseIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { setClaimStatusName("All") }}
                                />
                            </label>
                        </div>
                    )
                }
                {
                    selectedPayers !== "" && selectedPayers !== "All" && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">payers</p>
                            <label className="label-filter mr-1">{selectedPayers}
                                <CloseIcon
                                    style={{ cursor: "pointer" }}
                                    onClick={() => { handlePayerSelection("") }}
                                /></label>
                        </div>
                    )
                }


            </Box>
        </>
    );
};

export default LabelFilter;
