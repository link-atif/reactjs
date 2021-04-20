import React from 'react';
import { useState, useContext, useRef } from "react";
import clsx from 'clsx';
import { Box } from "@material-ui/core";
import "./styles.scss"
import User from "../../actions/user";

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { NavLink } from "react-router-dom";
import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import Button from '@material-ui/core/Button';
import BotIcon from "../../assets/images/SVGIcons/BotIcon"
import ReBotIcon from "../../assets/images/robot.svg"
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Loading from "../../components/common/ExpandableTable/Loading";
import Preferences from "./Preference";
import { RootContext } from "../../context/RootContext";
import CloseIcon from "@material-ui/icons/Close";


const user = JSON.parse(localStorage.getItem("loginUserData"));
let username =
    typeof user !== "undefined" && user !== null
        ? user.displayName
            .split(/\s/)
            .reduce((response, word) => (response += word.slice(0, 1)), "")
        : "";

const useStyles = makeStyles({
    list: {
        width: 350,
    },
    fullList: {
        width: '400px',
    },
    botOuter: {
        width: '400px',
    },
});

export default function PrefrenOuter() {
    const anchorRef = React.useRef(null);
    const [preferenceFilterBar, setPreferenceFilterBar] = useState("");
    const [loadingClass, setLoadingClass] = useState("");
    const { setMessage, setUserPreferences } = useContext(RootContext);
    const classes = useStyles();
    const [state, setState] = React.useState({
        // top: false,
        // left: false,
        bottom: false,
        // right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const handleSavePreference = (preferences) => {
        // user.userId
        setLoadingClass("loading");
        User.savePreferences({ ...preferences, userId: user.userId })
            .then((res) => {
                setLoadingClass("");
                if (res.data && res.data.success) {
                    setMessage({
                        type: "success",
                        message: res.data.message,
                    });
                    setUserPreferences({
                        ...preferences,
                    });
                }
            })
            .catch((error) => {
                setLoadingClass("");
                setMessage({
                    type: "error",
                    message: error.message,
                });
            });
    };
    // const handlePreferenceFilterBar = () => {
    //     if (preferenceFilterBar === "open") {
    //         setPreferenceFilterBar("");
    //         setMessage({ type: "", message: "" });
    //     } else {
    //         setPreferenceFilterBar("open");
    //     }
    // };


    return (
        <div className="botMain">
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <MenuItem

                        onClick={toggleDrawer(anchor, true)}
                    >
                        <NavLink to="#">
                            <img src={SettingIcon} alt="Icon" /> Preferences
                      </NavLink>
                    </MenuItem>

                    <Drawer className="botouter" anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                        <div className="filter-sidebar" style={{ position: 'static', }}>

                            <h3>Preferences </h3>
                            <div className="actions" onClick={toggleDrawer(anchor, false)}>
                                {/* <AddIcon /> */}
                                <CloseIcon />
                            </div>
                            <div className="filtr-side-main">
                                <Preferences
                                    handleSavePreference={handleSavePreference}
                                    loadingClass={loadingClass}
                                // handlePreferenceFilterBar={handlePreferenceFilterBar}
                                />
                            </div>
                        </div>

                    </Drawer>

                </React.Fragment>
            ))
            }
        </div >
    );
}
