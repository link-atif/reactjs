import React, { useContext, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, Link } from "react-router-dom";
import { RootContext } from "./../../context/RootContext/index";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import ListItemIcon from "@material-ui/core/ListItemIcon";
const roles = localStorage.getItem("userRoles");

export default function NestedList() {
  const [open, setOpen] = React.useState(false);
  const [roles, setRoles] = React.useState([]);
  const handleClick = () => {
    setOpen(!open);
  };
  const openProfile = () => { };
  const { userName, permission } = useContext(RootContext);
  useEffect(() => {
    setRoles(permission);
  });
  return (
    <List component="nav" className="sidebar-role-ui">
      <ListItem onClick={handleClick}>
        <ListItemAvatar>
          <Avatar className="role-avatar">
            {typeof userName != "undefined" &&
              userName != null &&
              userName
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), "")}
          </Avatar>
        </ListItemAvatar>
        <ListItemText className="link-one-text">
          {typeof userName != "undefined" && userName != "" ? userName : ""}
        </ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            className="dr-menu-list"

            component={Link}
            to="/profile"
          >
            <ListItemIcon className="ml-2">
              <PersonOutlineOutlinedIcon />
            </ListItemIcon>
            <ListItemText className="dr-menu-list-link link-one-text">
              Account Settings
            </ListItemText>
          </ListItem>
          <ListItem
            className="dr-menu-list"

            component={Link}
            to="/logout"
          >
            <ListItemIcon className="ml-2">
              <ExitToAppOutlinedIcon />
            </ListItemIcon>
            <ListItemText className="dr-menu-list-link link-one-text">
              Logout
            </ListItemText>
          </ListItem>
        </List>
      </Collapse>
    </List>
  );
}
