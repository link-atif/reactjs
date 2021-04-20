import React, { useRef } from "react";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import LinkIcon from "@material-ui/icons/Link";
import { Link, useLocation } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import SettingsOutlinedIcon from "@material-ui/icons/SettingsOutlined";
import PersonOutlineOutlinedIcon from "@material-ui/icons/PersonOutlineOutlined";
import BackupOutlinedIcon from "@material-ui/icons/BackupOutlined";
import AssessmentIcon from "@material-ui/icons/Assessment";
import AssessmentOutlinedIcon from "@material-ui/icons/AssessmentOutlined";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import BlockIcon from "@material-ui/icons/Block";
import ReportIcon from "../../../../assets/images/SVGIcons/ReportIcon";
import DenailCodeIcon from "../../../../assets/images/SVGIcons/DenailCodeIcon";
import CodeExplorerIcon from "../../../../assets/images/SVGIcons/CodeExplorerIcon";
import PartailyPaidIcon from "../../../../assets/images/SVGIcons/PartailyPaidIcon";
import DrugRejectedIcon from "../../../../assets/images/SVGIcons/DrugRejectedIcon";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
const NestedList = () => {
  const ref = React.createRef();
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
              pathname === "/reports-main" ||
                url === "report" ||
                url === "denial-xplorer" ||
                url === "report-rejection" ||
                url === "drug-report"
                ? " DR-abc light-gr-bg" : "light-gr-bg"}
          //  className={pathname === "/reports-main" ? "light-gr-bg active" : "light-gr-bg"}
          >

            <Link className="link-inn-menu m-0 p-0" to="/reports-main">
              <ReportIcon />
              <span className="link-one-text">Reports</span>
            </Link>
            {open ? (
              <ExpandLess className="ml-auto" />
            ) : (
              <ExpandMore className="ml-auto" />
            )}
          </Link>
        </li>
      </ClickAwayListener>
      <Collapse
        className="top-nav-colaps"
        in={open}
        ref={ref}
        timeout="auto"
        unmountOnExit
        transition={"false"}
      >
        <ul className="side-bar-menu-drop" component="div">
          <li onClick={handleClick}>
            <Link
              className={pathname === "/report" ? " active" : ""}
              to="/report"
            >
              <DenailCodeIcon />
              <span className="link-one-text">Denial Codes</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              className={pathname === "/denial-xplorer" ? "active" : ""}
              to="/denial-xplorer"
            >
              <CodeExplorerIcon />
              <span className="link-one-text">Code Xplorer</span>
            </Link>
          </li>
          <li onClick={handleClick}>
            <Link
              className={pathname === "/report-rejection" ? "active" : ""}
              to="/report-rejection"
            >
              <PartailyPaidIcon />
              <span className="link-one-text">Partially Paid</span>
            </Link>
          </li>

          <li onClick={handleClick}>
            <Link
              className={pathname === "/drug-report" ? " active" : ""}
              to="/drug-report"
            >
              <DrugRejectedIcon />
              <span className="link-one-text">Drug Rejected</span>
            </Link>
          </li>
        </ul>
      </Collapse>
    </>
  );
};
export default NestedList;
