import React from "react";
import { useState, useContext, useRef } from "react";
import {
  Button,
  List,
  ListItem,
  ListItemText,
  Drawer,
  Typography,
  Box,
  Select,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { notifications } from "../../actions";
import User from "../../actions/user";
import Grow from "@material-ui/core/Grow";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import { makeStyles } from "@material-ui/core/styles";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import Badge from "@material-ui/core/Badge";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import CloseIcon from "@material-ui/icons/Close";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles.scss";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "../Claim835/Styles.scss";
import LogoutIcon from "../../assets/images/new-design/logout-icon.svg";
import SettingIcon from "../../assets/images/new-design/claims-icon/setting-icon.svg";
import ProfileIcon from "../../assets/images/new-design/profile-icon.svg";
import NotifyIcon from "../../assets/images/new-design/notify-icon.svg";
import PrefrenOuter from "./PrefMain";

import { RootContext } from "../../context/RootContext";

import AddIcon from "@material-ui/icons/Add";
// import CloseIcon from "@material-ui/icons/Close";
import BotModel from "../ChatBot/BotModel";
import BellIcon from "../../assets/images/new-design/bell-icon.svg";
import Avatar from "@material-ui/core/Avatar";
import Preferences from "./Preference";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
const user = JSON.parse(localStorage.getItem("loginUserData"));
let username =
  typeof user !== "undefined" && user !== null
    ? user.displayName
      .split(/\s/)
      .reduce((response, word) => (response += word.slice(0, 1)), "")
    : "";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

export default function MenuListComposition() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [notify, setNotify] = React.useState(false);
  const [notificationsArr, setNotificationsArr] = React.useState([]);
  const [notificationCount, setNotificationCount] = React.useState(0);
  const [singleNotification, setSingleNotification] = React.useState({});
  const [preferenceFilterBar, setPreferenceFilterBar] = useState("");
  const [loadingClass, setLoadingClass] = useState("");
  const { setMessage, setUserPreferences } = useContext(RootContext);
  // let wrapperRef = useRef();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  let callNotification = true;

  const getNotification = () => {
    if (callNotification === true) {
      callNotification = false;
      notifications
        .getNotifications(user.userId)
        .then((response) => {
          let notificationcount = 0;
          callNotification = true;
          var obj = response.data.data.notifications;
          if (response.data.data.count > 0) {
            setNotificationsArr([]);
            for (let i = 0; i < obj.length; i++) {
              // let fname = obj[i].userName.split(" ")[0];
              // let lname = obj[i].userName.split(" ")[1];
              let notificationObj = {
                listItem: obj[i].title,
                date: obj[i].createdOn,
                message: obj[i].message,
                // fname,
                // lname
              };
              setNotificationsArr((notificationsArr) => [
                ...notificationsArr,
                notificationObj,
              ]);
            }
            setNotificationCount(response.data.data.count);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const readAllNotification = () => {
    let body = {
      userId: user.userId,
    };
    setNotify(true);
    notifications
      .readAllNotification(body)
      .then((response) => {
        setNotificationCount(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const markAllAsRead = () => {
    setSingleNotification({});
    setNotificationsArr([]);
    setNotificationCount(0);
    setNotify(false);
  };

  const handlePreferenceFilterBar = () => {
    if (preferenceFilterBar === "open") {
      setPreferenceFilterBar("");
      setMessage({ type: "", message: "" });
    } else {
      setPreferenceFilterBar("open");
    }
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

  // React.useEffect(() => {

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  // const handleClickOutside = (event) => {
  //   if (wrapperRef && wrapperRef.current.contains(event.target)) {
  //     return;
  //   } else {
  //     setPreferenceFilterBar("");
  //     setMessage({ type: "", message: "" });
  //   }
  // };

  React.useEffect(() => {
    setInterval(function () {
      if (typeof user.userId !== "undefined" && user.userId !== "") {
        getNotification();
      }
    }, 60000);
  }, []);

  return (
    <div className="DR-user-drop-topnav">
      <div className="notify-icons">
        <BotModel />
        <Button
          aria-label="show 11 new notifications"
          aria-haspopup="true"
          onClick={() => readAllNotification()}
        >
          <Badge badgeContent={notificationCount} color="secondary">
            <img src={BellIcon} alt="Icon" />
          </Badge>
        </Button>

        <Button
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          {/* <ListItemAvatar> */}
          {/* <span className="user-name">{user.displayName}</span>
            <span>
              <ExpandMoreIcon />
            </span> */}
          {/* </ListItemAvatar> */}
          <ListItemText>
            <Avatar className="role-avatar">{username}</Avatar>
            <span className="user-name">{user && user.displayName}</span>
            <span>
              <ExpandMoreIcon />
            </span>
          </ListItemText>
        </Button>
        <Popper
          className="dropdown-menu-ui"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    className="pb-0 pt-3"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem className="dropdown-menu-ui-name ui-drop-name-bold">
                      <NavLink to="/profile">{user.displayName}</NavLink>
                    </MenuItem>
                    <MenuItem className="dropdown-menu-ui-name">
                      <NavLink to="/profile">{user.email}</NavLink>
                    </MenuItem>
                    <span className="br-line"></span>
                    <MenuItem>
                      <NavLink to="/profile">
                        <img src={ProfileIcon} alt="Icon" />
                        My Profile
                      </NavLink>
                    </MenuItem>
                    <MenuItem
                      // className="dropdown-menu-ui-help"
                      onClick={() => handlePreferenceFilterBar()}
                    >
                      <NavLink to="#">
                        <img src={SettingIcon} alt="Icon" /> Preferences
                      </NavLink>
                    </MenuItem>
                    {/* <PrefrenOuter /> */}

                    <MenuItem
                      className="dropdown-menu-ui-logout"
                      onClick={handleClose}
                    >
                      <NavLink to="/logout">
                        <img src={LogoutIcon} alt="Icon" /> Logout
                      </NavLink>
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </>
            </Grow>
          )}
        </Popper>

        {/* <Preferences /> */}
        <div
          // ref={wrapperRef}
          className={"filter-sidebar " + preferenceFilterBar}
        >
          <h3>Preferences </h3>
          <div className="actions">
            <CloseIcon onClick={() => handlePreferenceFilterBar()} />
          </div>
          <div className="filtr-side-main">
            <Preferences
              handleSavePreference={handleSavePreference}
              loadingClass={loadingClass}
              handlePreferenceFilterBar={handlePreferenceFilterBar}
            />
          </div>
        </div>

        <Drawer anchor={"right"} open={notify}>
          <div className="natification-Bar-main-ui center" role="presentation">
            <div className="pl-3" style={{ borderBottom: "1px solid #F8FAFA" }}>
              <Typography variant="" className="noticication-bar-title-1 mb-3">
                <img src={NotifyIcon} className="mr-1" alt="icon" />{" "}
                Notifications
              </Typography>
              {typeof singleNotification !== "undefined" &&
                Object.entries(singleNotification).length > 0 ? (
                <ArrowBackIcon
                  className="close "
                  onClick={() => setSingleNotification({})}
                />
              ) : (
                <CloseIcon className="close" onClick={() => setNotify(false)} />
              )}
            </div>
            <List>
              {typeof singleNotification !== "undefined" &&
                Object.entries(singleNotification).length > 0 ? (
                <ListItem className="notication-bar-list-main" button>
                  <ListItemAvatar>
                    {/* <Avatar className="notfy-img">{`${(singleNotification.fname || "").charAt(0)}${(singleNotification.lname || "").charAt(0)}`}</Avatar> */}
                    <Avatar className="notfy-img">SK</Avatar>
                  </ListItemAvatar>
                  <ListItemText>
                    <Typography
                      className="noticication-bar-title"
                      variant="subtitle2"
                    >
                      {singleNotification.listItem}

                      <span className="noticication-bar-time">
                        {singleNotification.date}
                      </span>
                    </Typography>

                    <Typography
                      className="noticication-bar-text"
                      variant="body2"
                    >
                      {singleNotification.message}
                    </Typography>
                  </ListItemText>
                </ListItem>
              ) : notificationsArr.length > 0 ? (
                notificationsArr.map((item, index) => (
                  <ListItem
                    className="notication-bar-list-main"
                    button
                    key={item.id}
                    onClick={(e) => setSingleNotification(item)}
                  >
                    <ListItemAvatar>
                      <Avatar className="notfy-img">SK</Avatar>
                    </ListItemAvatar>
                    <ListItemText className="notication-bar-list">
                      <Typography
                        className="noticication-bar-title"
                        variant="h6"
                        gutterBottom
                      >
                        <Badge
                          className="notify-dot"
                          color="secondary"
                          variant="dot"
                        >
                          {item.listItem}
                        </Badge>
                        <span className="noticication-bar-time">
                          {item.date}
                        </span>
                        <p className="noticication-bar-text">{item.message}</p>
                      </Typography>
                    </ListItemText>
                  </ListItem>
                ))
              ) : (
                <ListItem className="notication-bar-list-main" button>
                  <ListItemText>
                    <Typography
                      className="noticication-bar-title"
                      variant="subtitle2"
                    >
                      No new Notification
                    </Typography>
                  </ListItemText>
                </ListItem>
              )}
              {Object.entries(singleNotification).length > 0 && (
                <button className="unread-btn" onClick={markAllAsRead}>
                  Mark all notifications as read
                </button>
              )}
            </List>
          </div>
        </Drawer>
      </div>
    </div>
  );
}
