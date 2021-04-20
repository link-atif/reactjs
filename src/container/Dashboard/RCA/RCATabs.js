import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Button, Grid } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ChartImage from "../../../assets/images/policey.svg";
import SmartTabCheck from "../../../assets/images/SVGIcons/SmartTabCheck";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  cutabpanel: {
    width: "65%",
  },
  tabs: {
    width: "35%",
    marginTop: "20px",
  },
}));

export default function RCATabs({ tabMenu, loadingClass }) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [name, setName] = useState("");
  const [selecteItem, setSelectedItem] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let item = tabMenu[value];
    if (typeof item !== "undefined" && item !== null) {
      setSelectedItem(item.Name.replace(" ", "-"));
      setName(item.Name);
    }
  }, [value, tabMenu]);
  return (
    <div className="rca-tabs-main">
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {tabMenu.map((item, index) => {
            return (
              <Tab
                key={index}
                icon={<SmartTabCheck />}
                label={item.Name}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
        <div className={classes.cutabpanel}>
          {tabMenu.map((item, index) => {
            return (
              <TabPanel className="p-0" value={value} index={index}>
                <Box className="rca-crd-st">
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={5}>
                      <img
                        style={{
                          width: "100%",
                          borderRadius: "10px",
                          marginTop: "50px",
                        }}
                        src={ChartImage}
                        alt="image"
                      />
                    </Grid>
                    <Grid item xs={12} md={7}>
                      <h5 className="smart-title mb-3">{name}</h5>
                      <p className="smart-text">
                        lipsum as it is sometimes known, is dummy text used in
                        laying out print, graphic or web designs. The passage is
                        attributed to an unknown typesetter in the 15th century
                        who is thought to have scrambled parts of Cicero's De
                        Finibus Bonorum et Malorum for use in a type specimen
                        book.
                      </p>
                    </Grid>
                  </Grid>
                </Box>

                <Grid container spacing={3}>
                  <Grid item xs={12}>
                    <NavLink
                      to={`/rca-details/${selecteItem}`}
                      className="dr-success-btn mt-5"
                    >
                      Next
                    </NavLink>
                  </Grid>
                </Grid>
              </TabPanel>
            );
          })}
        </div>
      </div>
    </div>
  );
}
