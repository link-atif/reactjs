import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";
import { Link, useLocation } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import NotificationsNoneOutlinedIcon from "@material-ui/icons/NotificationsNoneOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import PaymentIcon from "@material-ui/icons/Payment";
import GraphicEqIcon from "@material-ui/icons/GraphicEq";
import RecentActorsIcon from "@material-ui/icons/RecentActors";
import CommentOutlinedIcon from "@material-ui/icons/CommentOutlined";
import SecurityIcon from "@material-ui/icons/Security";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ViewComfyIcon from "@material-ui/icons/ViewComfy";
import ReceiptIcon from "@material-ui/icons/Receipt";

const NestedList = () => {
  const [management, setManagement] = useState(false);
  const [support, setSupport] = useState(false);
  const [security, setSecurity] = useState(false);
  const [billings, setBillings] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  const handleManagement = () => {
    setManagement(!management);
    setSecurity(false);
    setSupport(false);
    setBillings(false);
  };

  const handleSupport = () => {
    setSupport(!support);
    setSecurity(false);
    setManagement(false);
    setBillings(false);
  };

  const handleSecurity = () => {
    setManagement(false);
    setSecurity(!security);
    setSupport(false);
    setBillings(false);
  };
  const handleBilling = () => {
    setManagement(false);
    setSecurity(false);
    setSupport(false);
    setBillings(!billings);
  };

  return (
    <>
      {/* MANAGEMENTS LINKS START */}
      <li className="p-0" onClick={handleManagement}>
        <Link to="#">
          <LinkIcon />
          <span className="link-one-text">Management</span>

          {management ? (
            <ExpandLess className="ml-auto" />
          ) : (
              <ExpandMore className="ml-auto" />
            )}
        </Link>
      </li>
      <Collapse in={management} timeout="auto" unmountOnExit>
        <ul component="div" className="side-bar-menu-drop" disablePadding>
          <li>
            <Link
              className={pathname === "/customers" ? "active" : ""}
              to="/customers"
            >
              <PersonOutlineOutlinedIcon />
              <span className="link-one-text">Subscriptions</span>
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/lincense-management" ? "active" : ""}
              to="/lincense-management"
            >
              <AssignmentIndIcon />
              <span className="link-one-text">License Management</span>
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/send-notification" ? "active " : ""}
              to="/send-notification"
            >
              <NotificationsNoneOutlinedIcon />
              <span className="link-one-text">Send Notifications</span>
            </Link>
          </li>
        </ul>
      </Collapse>
      {/* MANAGEMENTS LINKS END */}

      {/* SUPPORT LINKS START */}
      <li className="p-0" onClick={handleSupport}>
        <Link to="#">
          <LinkIcon />
          <span className="link-one-text">Support</span>

          {support ? (
            <ExpandLess className="ml-auto" />
          ) : (
              <ExpandMore className="ml-auto" />
            )}
        </Link>
      </li>
      <Collapse in={support} timeout="auto" unmountOnExit>
        <ul component="div" disablePadding className="side-bar-menu-drop">
          <li>
            <Link
              className={pathname === "/support" ? "active" : ""}
              to="/support"
            >
              <FavoriteBorderOutlinedIcon />
              <span className="link-one-text">Overview</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "#" ? "active" : ""} to="#">
              <GraphicEqIcon />
              <span className="link-one-text">Api Status</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "#" ? "active" : ""} to="#">
              <RecentActorsIcon />
              <span className="link-one-text">Incident Management</span>
            </Link>
          </li>
          <li>
            <Link
              className={pathname === "/message-center" ? "active" : ""}
              to="/message-center"
            >
              <CommentOutlinedIcon />
              <span className="link-one-text">Message Center</span>
            </Link>
          </li>
        </ul>
      </Collapse>
      {/* SUPPORT LINKS END */}

      {/* SECURITY LINKS START */}
      <li className="p-0" onClick={handleSecurity}>
        <Link to="#">
          <SecurityIcon />
          <span className="link-one-text">Security</span>
          {security ? (
            <ExpandLess className="ml-auto" />
          ) : (
              <ExpandMore className="ml-auto" />
            )}
        </Link>
      </li>
      <Collapse in={security} timeout="auto" unmountOnExit>
        <ul component="div" disablePadding className="side-bar-menu-drop">
          <li>
            <Link
              className={pathname === "/reset-password" ? " active" : ""}
              to="/reset-password"
            >
              <VpnKeyIcon />
              <span className="link-one-text">Reset Password</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "#" ? "active" : ""} to="#">
              <ViewComfyIcon />
              <span className="link-one-text">MFA</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "#" ? "active" : ""} to="#">
              <RecentActorsIcon />
              <span className="link-one-text">SSO</span>
            </Link>
          </li>
        </ul>
      </Collapse>
      {/* SECURITY LINKS END */}

      {/* BILLINGS LINKS START */}
      <li className="p-0" onClick={handleBilling}>
        <Link>
          <ReceiptIcon />
          <span className="link-one-text">Master Data</span>

          {billings ? (
            <ExpandLess className="ml-auto" />
          ) : (
              <ExpandMore className="ml-auto" />
            )}
        </Link>
      </li>
      <Collapse in={billings} timeout="auto" unmountOnExit>
        <ul component="div" disablePadding className="side-bar-menu-drop">
          {/* <li>
            <Link className={pathname === "#" ? "active " : ""} to="#">
              <PaymentIcon />
              <span className="link-one-text">Update Payment</span>
            </Link>
          </li> */}
          <li>
            <Link
              className={pathname === "/code-management" ? "active" : ""}
              to="/code-management"
            >
              <PaymentIcon />
              <span className="link-one-text">JCode</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "/rules" ? "active " : ""} to="/rules">
              <LinkIcon />
              <span className="link-one-text">Claim Rules</span>
            </Link>
          </li>
          <li>
            <Link className={pathname === "/biosimilars" ? "active " : ""} to="/biosimilars">
              <LinkIcon />
              <span className="link-one-text">Biosimilars</span>
            </Link>
          </li>
        </ul>
      </Collapse>
    </>
  );
};
export default NestedList;
