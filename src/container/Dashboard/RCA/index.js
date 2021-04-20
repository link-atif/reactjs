import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./styles.scss";
import { Fade, Box, Grid, Typography, TextField } from "@material-ui/core";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import imgOne from "../../../assets/images/new-design/sub-1.svg";
import imgOnegr from "../../../assets/images/new-design/sub-1gr.svg";
import searchImg from "../../../assets/images/search.svg";
import UserDropdown from "../../UserDropdown";
import FooterCopyright from "../../FooterCopyright";
import RCATabs from "./RCATabs";
import dashboardService from "../../../actions/dashboardService";
import Loading from "../../../components/common/ExpandableTable/Loading";
import SearchBox from "../../../components/common/SearchBox";
import CommonTable from "../../Common";
import Tabclaimsicon from "../../../assets/images/tabs-icons/claims.svg";
import TabclaimiconGr from "../../../assets/images/tabs-icons/claims-gr.svg";
import Tabcptcodeicon from "../../../assets/images/tabs-icons/cpt-code.svg";
import TabcptcodeiconGr from "../../../assets/images/tabs-icons/cpt-code-gr.svg";
import TabInsightsicon from "../../../assets/images/tabs-icons/insights.svg";
import TabInsightsiconGr from "../../../assets/images/tabs-icons/insights-gr.svg";
import DashboardIcongry from "../../../assets/images/tabs-icons/dash-tab-gry.svg";

const RCA = () => {
  const [tabMenu, setTabMenu] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [loadingClass, setLoadingClass] = useState("");
  const [componentLoadingClass, setComponentLoadingClass] = useState("");
  const [data, setData] = useState([
    { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
    { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
    { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
    { id: 4, name: "Asad", age: 25, email: "asad@email.com" },
  ]);

  useEffect(() => {
    setLoadingClass("data-loading");
    setComponentLoadingClass("data-loading");
    dashboardService
      .getRCAList()
      .then(({ data: response }) => {
        setLoadingClass("");
        setComponentLoadingClass("");
        const { data } = response;
        if (typeof data !== "undefined" && data !== "") {
          setTabMenu(data);
        }
      })
      .catch((error) => {
        setLoadingClass("");
        setComponentLoadingClass("");
        console.log("error is ", error);
      });
  }, []);
  return (
    <>
      <header className="dashboard-header header-new new-ui-bx-search">
        <div className="header-search-main">
          <Box className="breadcreams-new">
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="" color="inherit" href="/">
                Insights
                      </Link>
              <Typography color="textPrimary">
                Smart Insights
                      </Typography>
            </Breadcrumbs>
          </Box>
          <SearchBox />
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main tp-pd-0"
      >
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={4}>
                  {/* <h2 className="page-heading mb-0">RCA</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new bred-top-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">
                        Smart Insights
                      </Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
                <Grid item xs={12}>
                  <div className="pre-adj-tabs-all">
                    <ul>
                      <li>
                        <NavLink to="/">
                          <img src={DashboardIcongry} alt="icon" />
                          <label>Dashboard</label>
                        </NavLink>
                      </li>


                      <li>
                        <NavLink to="/rca" className="pre-active">
                          <img src={TabInsightsiconGr} alt="icon" />
                          <label>Smart Insights</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/biosimilar">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Biosimilars</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/codes">
                          <img src={Tabcptcodeicon} alt="icon" />
                          <label>CPT Codes</label>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <div
          className="mt-2"
          style={{
            backgroundColor: "#fff",
            boxShadow: "0px 1px 2px #1C9A7E33",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          {componentLoadingClass !== "" ? (
            <div className="mt-3" style={{ position: "relative" }}>
              <div className={componentLoadingClass}>
                <div className="cliam-ui-table-2">
                  <Loading></Loading>
                </div>
              </div>
            </div>
          ) : (
            <RCATabs tabMenu={tabMenu} loadingClass={loadingClass} />
          )}
        </div>

        <FooterCopyright />
      </Box>
    </>
  );
};

export default RCA;
