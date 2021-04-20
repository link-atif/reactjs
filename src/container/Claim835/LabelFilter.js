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
        selectedAdminCodes,
        selectedAncillaryCode,
        selectedJCodes,
        selectedPremedCode,
        handlePayerSelection,
        handleAdminCodeSelection,
        handleAncillarySelection,
        handleJCodeSelection,
        handlePremedSelection,
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
                    selectedPayers.length > 0 && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">payers</p>
                            {
                                selectedPayers.map((item) =>
                                    <label className="label-filter mr-1">{item}
                                        <CloseIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { handlePayerSelection(item) }}
                                        /></label>
                                )
                            }
                        </div>
                    )
                }

                {
                    selectedAdminCodes && selectedAdminCodes.length > 0 && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">Admin Code</p>
                            {
                                selectedAdminCodes.map((item) =>
                                    <label className="label-filter mr-1">{item}
                                        <CloseIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { handleAdminCodeSelection(item) }}
                                        /></label>
                                )
                            }
                        </div>
                    )
                }


                {
                    selectedAncillaryCode && selectedAncillaryCode.length > 0 && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">Ancillary Code</p>
                            {
                                selectedAncillaryCode.map((item) =>
                                    <label className="label-filter mr-1">{item}
                                        <CloseIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { handleAncillarySelection(item) }}
                                        /></label>
                                )
                            }
                        </div>
                    )
                }

                {
                    selectedJCodes && selectedJCodes.length > 0 && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">JCode</p>
                            {
                                selectedJCodes.map((item) =>
                                    <label className="label-filter mr-1">{item}
                                        <CloseIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { handleJCodeSelection(item) }}
                                        /></label>
                                )
                            }
                        </div>
                    )
                }

                {
                    selectedPremedCode && selectedPremedCode.length > 0 && (
                        <div className="label-filter-inner ml-3">
                            <p className="label-title">Premed Code</p>
                            {
                                selectedPremedCode.map((item) =>
                                    <label className="label-filter mr-1">{item}
                                        <CloseIcon
                                            style={{ cursor: "pointer" }}
                                            onClick={() => { handlePremedSelection(item) }}
                                        /></label>
                                )
                            }
                        </div>
                    )
                }

            </Box>
        </>
    );
};

export default LabelFilter;
