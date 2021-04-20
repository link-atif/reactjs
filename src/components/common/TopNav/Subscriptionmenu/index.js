import React from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";
import { Link, useLocation } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import ListIcon from "@material-ui/icons/List";
import SubscriptionIcon from "../../../../assets/images/SVGIcons/SubscriptionIcon";
import SupportIcon from "../../../../assets/images/SVGIcons/SupportIcon";
import UsersIcon from "../../../../assets/images/SVGIcons/UsersIcon";
import UploadIcon from "../../../../assets/images/SVGIcons/UploadIcon";
import DeleteIcon from "../../../../assets/images/SVGIcons/DeleteIcon";
import OverviewIcon from "../../../../assets/images/SVGIcons/OverviewIcon";
import SettingIcon from "../../../../assets/images/SVGIcons/SettingIcon";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const NestedList = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const handleClick = () => {
    setOpen(!open);
  };
  const url = pathname.split("/")[1];

  return (
    <>
      <ClickAwayListener onClickAway={() => { setOpen(false) }}>
        <li className={`colaps-mr p-0 ${open ? 'DR-abc-li' : ''}`} onClick={handleClick}>
          <Link to="#"
            className={
              pathname === "/subscription" ||
                url === "users" ||
                url === "data-sources" ||
                url === "uploads" ||
                url === "delete-claim" ||
                url === "support"
                ? " DR-abc light-gr-bg" : "light-gr-bg"}
          >
            <Link className="link-inn-menu m-0 p-0" to="#">
              <SettingIcon />
              <span className="link-one-text">Subscription</span>
            </Link>
            {open ? (
              <ExpandLess className="ml-auto" />
            ) : (
              <ExpandMore className="ml-auto" />
            )}
          </Link>
        </li>
      </ClickAwayListener>
      <Collapse className="top-nav-colaps" in={open} timeout="auto" unmountOnExit>
        <ul className="side-bar-menu-drop" component="div">
          <li onClick={handleClick}>
            <Link
              className={pathname === "/subscription" ? " active" : ""}
              to="/subscription"
            >
              <OverviewIcon />
              <span className="link-one-text">Overview</span>
            </Link>
          </li>

          <li onClick={handleClick}>
            <Link className={pathname === "/users" ? "active" : ""} to="/users">
              <UsersIcon />
              <span className="link-one-text">Users</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link className={pathname === "/data-sources" ? "active" : ""} to="/data-sources">
              <UploadIcon />
              <span className="link-one-text">Data Sources</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              className={pathname === "/uploads" ? "active" : ""}
              to="/uploads"
            >
              <UploadIcon />
              <span className="link-one-text">Uploads</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              className={pathname === "/delete-claim" ? "active" : ""}
              to="/delete-claim"
            >
              <DeleteIcon />
              <span className="link-one-text">Delete Claim</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              className={pathname === "/support" ? "active" : ""}
              to="/support"
            >
              <SupportIcon />
              <span className="link-one-text">Support</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              to="/nevo-charts"
              className={pathname === "/nevo-charts" ? "active" : ""}
            >
              <ListIcon />
              <span className="link-one-text">Nevo Charts</span>
            </Link>
          </li>

        </ul>
      </Collapse>
    </>
  );
};
export default NestedList;
