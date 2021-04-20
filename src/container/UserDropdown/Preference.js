import React, { useEffect, useState, useContext } from 'react';
import {
    Box, Button
} from "@material-ui/core";
import { Select } from 'antd';
import Message from "../../components/Messages";
import { RootContext } from '../../context/RootContext'

const { Option } = Select;

export default function Preferences(props) {

    const { handleSavePreference, loadingClass, innerRef } = props;
    const { setMessage, userPreferences } = useContext(RootContext);
    const [disabled, setDisabled] = useState(true);

    const [preferences, setPreferences] = useState({
        NoOfRecordInTable: null,
        Theme: "",
        naNavigation: ""
    });

    useEffect(() => {
        const { NoOfRecordInTable, Navigation } = preferences;
        if (NoOfRecordInTable || Navigation) {
            setDisabled(false);
        }
    }, [preferences])


    useEffect(() => {
        setMessage({
            type: "",
            message: ""
        })
    }, [])

    const handleChangeNavigation = (value) => {

        setPreferences({
            ...preferences,
            Navigation: value
        })
    }

    const handleChangeNoOfRecords = (value) => {
        setPreferences({
            ...preferences,
            NoOfRecordInTable: value
        })
    }


    const handleSubmit = () => {

        const { NoOfRecordInTable, Navigation } = preferences;

        let UserPreferences = { ...userPreferences };

        if (NoOfRecordInTable) {
            UserPreferences['NoOfRecordInTable'] = NoOfRecordInTable;
        }
        if (Navigation) {
            UserPreferences['Navigation'] = Navigation;
        }

        handleSavePreference(UserPreferences);
    }


    let NoOfRecordInTable = (userPreferences.NoOfRecordInTable && userPreferences.NoOfRecordInTable !== "undefined" && userPreferences.NoOfRecordInTable !== "null") ? parseInt(userPreferences.NoOfRecordInTable) : 10;

    return (
        <div>
            <label className="new-input-lable">
                Default row count (Table)
            </label>
            <Box className="input-new-design-icon mb-4">
                <Select defaultValue={NoOfRecordInTable} name="NoOfRecordInTable" className="input-new-drop-st" style={{ width: '100%' }} onChange={handleChangeNoOfRecords}>
                    <Option value={10}>10</Option>
                    <Option value={15}>15</Option>
                    <Option value={20}>20</Option>
                    <Option value={25}>25</Option>
                </Select>
            </Box>
            <label className="new-input-lable">
                Navigation
            </label>
            <Box className="input-new-design-icon mb-4">
                <Select defaultValue={userPreferences.Navigation && userPreferences.Navigation !== "undefined" ? userPreferences.Navigation : "left"} className="input-new-drop-st" name="Theme" style={{ width: '100%' }} onChange={handleChangeNavigation}>
                    <Option value="top">Top</Option>
                    <Option value="left">Side</Option>
                </Select>
                {/* <select value={userPreferences.Navigation && userPreferences.Navigation !== "undefined" ? userPreferences.Navigation : "left"} className="input-new-drop-st" name="Theme" style={{ width: '100%' }} onChange={handleChangeNavigation}>
                    <option value="top">Top</option>
                    <option value="left">Side</option>
                </select> */}
            </Box>
            <Message />
            {/* <div style={{ color: "red" }}>
                
                    nullError && "please select field to update"
                }
            </div> */}
            <Box className="">
                <Button style={{ opacity: disabled ? '0.4' : '', height: '44px' }} onClick={handleSubmit} className={`new-coman-btn w-100 mt-4 ${loadingClass}`}>
                    Save
                </Button>
            </Box>
        </div>

    );

}