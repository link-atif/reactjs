import React, { useEffect, useState } from "react";
import { useHistory, NavLink } from "react-router-dom";
import {
  Box,
  Grid,
  Typography,
} from "@material-ui/core";
import { addDays } from "date-fns";
import Tabclaimsicon from "../../../assets/images/tabs-icons/claims.svg";
import Tabcptcodeicon from "../../../assets/images/tabs-icons/cpt-code.svg";
import TabInsightsicon from "../../../assets/images/tabs-icons/insights.svg";
import TabInsightsiconGr from "../../../assets/images/tabs-icons/insights-gr.svg";
import DashboardIcongry from "../../../assets/images/tabs-icons/dash-tab-gry.svg";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NewTable from "./biosimilarlist";
import UserDropdown from "../../../container/UserDropdown";
import FooterCopyright from "../../../container/FooterCopyright";
import SearchBox from "../../../components/common/SearchBox";
import BioSimilarCards from "./biosimilarCard";
import DateRangePicker from "../../../components/common/dateRangePicker";
import Loading from '../../../components/common/ExpandableTable/Loading';
import BarChart from "./BarChart/index";
import { biosimilar } from "../../../actions";


const BioSimilar = () => {
  const [biosimilarData, setBiosimilarData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState("");

  const [startDate, setStartDate] = useState("0001-01-01");
  const [endDate, setEndDate] = useState("0001-01-01");
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);



  const handleClear = () => {
    setStartDate("0001-01-01");
    setEndDate("0001-01-01");
  };

  const handleDateFilter = (date) => {
    const startobj = new Date(date.startDate);
    let startDate = startobj.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const endobj = new Date(date.endDate);
    let endDate = endobj.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    setState([date]);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const getBiosimilarDrugs = () => {
    setLoading("data-loading");
    biosimilar.getBiosimilarDrugsUsed().then(res => {
      if (res.data && res.data.data && res.data.data.output) {
        const { data: { output } } = res.data;
        let chartData = [];
        output.forEach(referenceCode => {
          chartData.push({ ...referenceCode, color: "hsl(48, 70%, 50%)" });
        })

        setBiosimilarData(output);
        setChartData(chartData);
        setLoading("")
      }
    })
      .catch(error => {
        setLoading("")
      })
  }

  useEffect(() => {
    getBiosimilarDrugs();
  }, [startDate, endDate])

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
              <Typography color="textPrimary">Biosimilars</Typography>

            </Breadcrumbs>
          </Box>
          <SearchBox />

          <UserDropdown />
        </div>
      </header>
      <div className="dashboard-main tp-pd-0"

      >
        {/* new box */}

        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={5}>
                  {/* <h2 className="page-heading mb-0">Dashboard</h2> */}
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new bred-top-nav">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">Biosimilars</Typography>

                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>

                <Grid item xs={9}>
                  <div className="pre-adj-tabs-all mb-0">
                    <ul>
                      <li>
                        <NavLink to="/">
                          <img src={DashboardIcongry} alt="icon" />
                          <label>Dashboard</label>
                        </NavLink>
                      </li>


                      <li>
                        <NavLink to="/rca">
                          <img src={TabInsightsicon} alt="icon" />
                          <label>Smart Insights</label>
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/biosimilar" className="pre-active">
                          <img src={TabInsightsiconGr} alt="icon" />
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
                <Grid item xs={12} md={3}>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    state={state}
                    handleDateFilter={handleDateFilter}
                    handleClear={handleClear}
                  />

                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>


        <Grid container spacing={3}>
          <BioSimilarCards></BioSimilarCards>
          <Grid item md={6} >
            <Box className="line-chart-outer-crd mt-4">
              <div className="dash-btn-main">
                <div className="chart-title-main">
                  <Grid container>
                    <Grid item sm={12}>
                      <h3 className="chart-title">Overview</h3>
                    </Grid>
                  </Grid>
                </div>
              </div>

              <Grid container>
                <Grid item md={12} >
                  {
                    loading !== "" ? (
                      <div style={{ position: "relative" }}>
                        <div className={loading}>
                          <div className="cliam-ui-table-2">
                            <Loading compHeight="200"></Loading>
                          </div>
                        </div>
                      </div>
                    ) : (
                        <BarChart data={chartData} />
                      )

                  }

                </Grid>

              </Grid>
            </Box>


          </Grid>
        </Grid>



        <Grid
          container
          spacing={3}
          direction="row"
          justify="center"
          alignItems="stretch"
          className="mt-3"
        >
          <Grid item sm={12}>
            <NewTable
              biosimilarData={biosimilarData}
              loading={loading}
            />
          </Grid>
        </Grid>

        <FooterCopyright />
      </div>
    </>
  );
};

export default BioSimilar;
