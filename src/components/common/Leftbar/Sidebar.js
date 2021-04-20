import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import "../../../assets/css/main-style.css";
import { Link, useLocation } from "react-router-dom";
import SpeedOutlinedIcon from "@material-ui/icons/SpeedOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import LogoImg from "../../../assets/images/datarovers-logo.png";
import LogoImgicon from "../../../assets/images/Logo.png";
import ListIcon from "@material-ui/icons/List";
import { RootContext } from "./../../../context/RootContext/index";
import Drsiderbar from "../../DrSiderbar";
import CloseIcon from "@material-ui/icons/Close";
import SubscriptionMenu from "../../Subscriptionmenu";
import Reportmenu from "../../Reportmenu";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import AssessmentIcon from "@material-ui/icons/Assessment";
import BlockIcon from "@material-ui/icons/Block";
import UserDropdown from "../../../container/UserDropdown"
import DashboardIcon from "../../../assets/images/SVGIcons/DashboardIcon";
import ClaimsIcon from "../../../assets/images/SVGIcons/ClaimsIcon";
import ClaimManagerIcon from "../../../assets/images/SVGIcons/ClaimManagerIcon";
import DenailsIcon from "../../../assets/images/SVGIcons/DenailsIcon";
import SearchIcon from "../../../assets/images/SVGIcons/SearchIcon";
import DenailCrossIcon from "../../../assets/images/SVGIcons/DenailCrossIcon";
import ClaimPymentDollorIcon from "../../../assets/images/SVGIcons/ClaimPymentDollorIcon";

const Sidebar = ({ userView, handleView }) => {
  const ref = React.createRef();
  const location = useLocation();
  const pathname = location.pathname;
  const userRole = "5a3c68a8-5035-4798-b209-d06f7f8aae24";
  const subscriptionRole = "c5a99825-8da0-4ebe-adbc-e15a775d5049";
  const administrationRole = "e005c454-f8a8-4329-a32a-2527142995a7";
  const managerRole = "c51eec55-3c3b-47d6-a13d-0fc6c263ac96";
  // 05062e6d-48df-4673-95f2-0858ef1a8e3a,c51eec55-3c3b-47d6-a13d-0fc6c263ac96
  const url = pathname.split("/")[1];
  // console.log("url is ", url);
  const { permission } = useContext(RootContext);
  return (
    <Box>
      <div className="side-bar-main side-bar-collapse bg-white" ref={ref}>
        <div className="dr-top-flex-outer">
          <div className="side-bar-logo">
            <Link to="/">
              <img className="logo-1" src={LogoImg} alt="Logo" />
              <img className="logo-2" src={LogoImgicon} alt="Logo" />
            </Link>
          </div>
          <IconButton
            className="menu-collps-btn"
            size="small"
            aria-label="delete"
            onClick={handleView}
          >
            {userView === true ? (
              <ArrowForwardIosIcon />
            ) : (
              <ArrowBackIosOutlinedIcon />
            )}
          </IconButton>

          <ul className="side-bar-menu">
            {permission.includes(administrationRole) === true ? (
              <li>
                <Link
                  to="/dr-services"
                  className={
                    pathname === "/" || pathname === "/dr-services"
                      ? "active"
                      : ""
                  }
                >
                  <DashboardIcon />
                  {/* <img src="{DashboardIcon}" /> */}
                  <span className="link-one-text">Dashboard</span>
                </Link>
              </li>
            ) : (
              <li>
                <Link
                  to="/"
                  className={
                    pathname === "/" || pathname === "/dr-services"
                      ? "active"
                      : ""
                  }
                >
                  <DashboardIcon />
                  {/* <img src={DashboardIcon} alt="icon" /> */}
                  <span className="link-one-text">Insights</span>
                </Link>
              </li>
            )}

            {permission.includes(userRole) === true ||
              permission.includes(subscriptionRole) === true ||
              permission.includes(managerRole) ? (
              <li>
                <Link
                  to="/workers"
                  className={
                    pathname === "/workers" ||
                      url === "pre-adjudication-detail" ||
                      url === "claim277"
                      ? "active"
                      : ""
                  }
                >
                  <ClaimManagerIcon />{" "}
                  <span className="link-one-text">Manager</span>
                </Link>
              </li>
            ) : (
              ""
            )}

            {permission.includes(userRole) === true ||
              permission.includes(subscriptionRole) === true ||
              permission.includes(managerRole) ? (
              <li>
                <Link
                  to="/claim"
                  className={
                    pathname === "/claim" || url === "claim-detail"
                      ? "active"
                      : ""
                  }
                >
                  <ClaimPymentDollorIcon />{" "}
                  <span className="link-one-text">Payments</span>
                </Link>
              </li>
            ) : (
              ""
            )}

            {/* {permission.includes(userRole) === true ||
            permission.includes(subscriptionRole) === true ||
            permission.includes(managerRole) ? (
            <li>
              <Link
                to="/searh-claims"
                className={
                  pathname === "/searh-claims" || url === "searh-claims-detail"
                    ? "active"
                    : ""
                }
              >
                <SearchIcon />{" "}
                <span className="link-one-text">Search</span>
              </Link>
            </li>
          ) : (
            ""
          )} */}

            {permission.includes(userRole) === true ||
              permission.includes(subscriptionRole) === true ||
              permission.includes(managerRole) ? (
              <li>
                <Link
                  to="/denials"
                  className={
                    pathname === "/denials" ||
                      url === "denials" ||
                      url === "denails-cpt" ||
                      url === "denails-payer" ||
                      url === "denails-reason-code"
                      ? "active"
                      : ""
                  }
                >
                  <DenailCrossIcon />
                  <span className="link-one-text">Denials</span>
                </Link>
              </li>
            ) : (
              ""
            )}

            {permission.includes(administrationRole) === true ? (
              <Drsiderbar />
            ) : (
              ""
            )}

            {permission.includes(userRole) === true ||
              permission.includes(subscriptionRole) === true ||
              permission.includes(managerRole) ? (
              <Reportmenu />
            ) : (
              ""
            )}

            {permission.includes(subscriptionRole) === true ? (
              <SubscriptionMenu />
            ) : (
              ""
            )}




          </ul>
        </div>

        <UserDropdown />
      </div>
    </Box>
  );
};

export default Sidebar;
