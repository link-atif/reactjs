import React, { useEffect, useState } from 'react';
import { DateRangePicker } from "react-date-range";
import CalendarIcon from "../../../assets/images/new-design/claims-icon/calendar-icon.svg";
import CloseIcon from "@material-ui/icons/Close";
import { Button } from "@material-ui/core";
const DatePicker = (props) => {
    const [pickerClass, setPickerClass] = useState(false);
    const { startDate, endDate, state, handleDateFilter, handleClear } = props;
    return (
        <div className="item pull-right">
            <div
                className="date-manager"
                onClick={() => setPickerClass(!pickerClass)}
            >
                <div className="progress-month">
                    {startDate !== "0001-01-01" || endDate !== "0001-01-01"
                        ? `${new Date(startDate).toLocaleDateString(
                            "en-US"
                        )} - ${new Date(endDate).toLocaleDateString("en-US")}`
                        : "This Month"}{" "}
                    <img src={CalendarIcon} className="ml-1" alt="icon" />
                    <div
                        className="date-picker"
                        style={{ display: pickerClass == true ? "block" : "none" }}
                    >
                        <span className="pull-right">
                            <CloseIcon onClick={() => setPickerClass(!pickerClass)} />
                        </span>
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <DateRangePicker
                                onChange={(item) => handleDateFilter(item.selection)}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                // months={2}
                                ranges={state}
                            // direction="horizontal"
                            />
                        </div>
                        <div className="rdrDefinedRangesWrapper">
                            <Button
                                variant="contained"
                                className="cu-ad-btn date-applybtn"
                                fullWidth={true}
                                onClick={() => setPickerClass(false)}
                            >
                                Apply
                </Button>
                            <Button
                                variant="contained"
                                className="cu-dis-btn mt-2 date-clearbtn"
                                fullWidth={true}
                                onClick={() => handleClear()}
                            >
                                Clear
                </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatePicker;
