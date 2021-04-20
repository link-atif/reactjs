import React, { useContext, useEffect, useState } from "react";
import { useHistory, NavLink, Link } from "react-router-dom";
import {
  Box,
  Grid,
  TextField,
  Breadcrumbs,
  Typography,
  Paper,
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import searchImg from "../../assets/images/search.svg";
import UserDropdown from "../../container/UserDropdown";
import FooterCopyright from "../../container/FooterCopyright";
import { RootContext } from "../../context/RootContext";
import { ResponsiveLine } from "@nivo/line";
const lineChart = [
  {
    id: "japan",
    color: "hsl(347, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 243,
      },
      {
        x: "helicopter",
        y: 270,
      },
      {
        x: "boat",
        y: 168,
      },
      {
        x: "train",
        y: 190,
      },
      {
        x: "subway",
        y: 212,
      },
      {
        x: "bus",
        y: 77,
      },
      {
        x: "car",
        y: 167,
      },
      {
        x: "moto",
        y: 268,
      },
      {
        x: "bicycle",
        y: 19,
      },
      {
        x: "horse",
        y: 175,
      },
      {
        x: "skateboard",
        y: 226,
      },
      {
        x: "others",
        y: 226,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(227, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 147,
      },
      {
        x: "helicopter",
        y: 17,
      },
      {
        x: "boat",
        y: 247,
      },
      {
        x: "train",
        y: 126,
      },
      {
        x: "subway",
        y: 283,
      },
      {
        x: "bus",
        y: 255,
      },
      {
        x: "car",
        y: 80,
      },
      {
        x: "moto",
        y: 36,
      },
      {
        x: "bicycle",
        y: 11,
      },
      {
        x: "horse",
        y: 2,
      },
      {
        x: "skateboard",
        y: 106,
      },
      {
        x: "others",
        y: 9,
      },
    ],
  },
];
const NevoCharts = () => {
  let history = useHistory();
  const { setMessage, permission } = useContext(RootContext);

  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField id="standard-search" type="search" className="mt-0" />
          </div>

          <UserDropdown />
        </div>
      </header>
      <div className="dashboard-main">
        <Grid container>
          <Grid item xs={12}>
            <div>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <h2 className="page-heading mb-0">Dashboard</h2>
                  {/* Breadcrumbs */}
                  <Box className="breadcreams-new">
                    <Breadcrumbs
                      separator={<NavigateNextIcon fontSize="small" />}
                      aria-label="breadcrumb"
                    >
                      <Link className="" color="inherit" href="/">
                        Insights
                      </Link>
                      <Typography color="textPrimary">Overview</Typography>
                    </Breadcrumbs>
                  </Box>
                  {/*End Breadcrumbs */}
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>
        <Box className="line-chart-first">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} className="nivo-line-chart">
              <React.Fragment>
                <ResponsiveLine
                  data={lineChart}
                  margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                  xScale={{ type: "point" }}
                  yScale={{
                    type: "linear",
                    min: "auto",
                    max: "auto",
                    stacked: true,
                    reverse: false,
                  }}
                  yFormat=" >-.2f"
                  axisTop={null}
                  axisRight={null}
                  axisBottom={{
                    orient: "bottom",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "transportation",
                    legendOffset: 36,
                    legendPosition: "middle",
                  }}
                  axisLeft={{
                    orient: "left",
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: "count",
                    legendOffset: -40,
                    legendPosition: "middle",
                  }}
                  pointSize={10}
                  pointColor={{ theme: "background" }}
                  pointBorderWidth={2}
                  pointBorderColor={{ from: "serieColor" }}
                  pointLabelYOffset={-12}
                  useMesh={true}
                  onClick={(e) => console.log("point is clicked", e)}
                  legends={[
                    {
                      anchor: "bottom-right",
                      direction: "column",
                      justify: false,
                      translateX: 100,
                      translateY: 0,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]}
                />
              </React.Fragment>
            </Grid>
          </Grid>
        </Box>

        <FooterCopyright />
      </div>
    </>
  );
};

export default NevoCharts;
