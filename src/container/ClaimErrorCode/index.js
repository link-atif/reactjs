import React, { useContext, useEffect } from "react";
import { TextField, Box, Grid } from "@material-ui/core";
import { NavLink, useParams } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import FormatListBulletedOutlinedIcon from '@material-ui/icons/FormatListBulletedOutlined';
import AppsOutlinedIcon from '@material-ui/icons/AppsOutlined';

import "./styles.scss";

import searchImg from "../../assets/images/search.svg";
import FooterCopyright from "../FooterCopyright";
import UserDropdown from "../UserDropdown";




const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
    color: "#222",
    fontWeight: "600",
  },
  pos: {
    marginBottom: 12,
  },
  text: {
    color: "#222",
  },
  tabelist: {
    justifyContent: "center",
  },
  taberrore: {
    minWidth: 0,
    padding: "5px"
  }



});


const ErrorCode = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <header className="dashboard-header header-new">
        <div className="header-search-main">
          <div className="seach-form">
            <img src={searchImg} alt="Search" />
            <TextField
              id="standard-search"
              placeholder="Search"
              type="search"
              className="mt-0"
            />
          </div>
          <UserDropdown />
        </div>
      </header>
      <Box className="dashboard-main">
        <Box>
          <h2 className="page-heading">Acc-123123</h2>

          <NavLink
            to="/claim"
            activeClassName="active"
            style={{
              padding: "10px",
              borderRadius: "5px",
              float: "right",
              backgroundColor: "rgba(4, 18, 66, 0.4)",
              color: "#fff",
            }}
          >
            Back
                </NavLink>

          {/* Breadcrumbs */}
          <Box>
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              aria-label="breadcrumb"
            >
              <Link className="f-14" color="inherit" href="/workers">
                837
            </Link>
              <Typography className="f-14" color="textPrimary">
                Acc-123123
            </Typography>
            </Breadcrumbs>
          </Box>
          {/*End Breadcrumbs */}
        </Box>

        <div>
          <TabContext value={value}>
            <TabList className={classes.tabelist} onChange={handleChange} aria-label="simple tabs example">
              <Tab icon={<AppsOutlinedIcon />} className={classes.taberrore} value="1" />
              <Tab icon={<FormatListBulletedOutlinedIcon />} className={classes.taberrore} value="2" />
            </TabList>
            <TabPanel className="p-0 mt-3" value="1">
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} component="h4" gutterBottom>
                        Error 206
                    </Typography>
                      <Typography className={classes.text} variant="body2" component="p">
                        is simply dummy text of the printing and typesetting industry.
                      <br /><br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} component="h4" gutterBottom>
                        Error 206
                    </Typography>
                      <Typography className={classes.text} variant="body2" component="p">
                        is simply dummy text of the printing and typesetting industry.
                      <br /><br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} component="h4" gutterBottom>
                        Error 206
                    </Typography>
                      <Typography className={classes.text} variant="body2" component="p">
                        is simply dummy text of the printing and typesetting industry.
                      <br /><br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} component="h4" gutterBottom>
                        Error 206
                    </Typography>
                      <Typography className={classes.text} variant="body2" component="p">
                        is simply dummy text of the printing and typesetting industry.
                      <br /><br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Typography className={classes.title} component="h4" gutterBottom>
                        Error 206
                    </Typography>
                      <Typography className={classes.text} variant="body2" component="p">
                        is simply dummy text of the printing and typesetting industry.
                      <br /><br />
                        {'"a benevolent smile"'}
                      </Typography>
                    </CardContent>

                  </Card>
                </Grid>

              </Grid>
            </TabPanel>
            <TabPanel value="2" className="p-0 mt-3">
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} md={1}>
                          <Typography className={classes.title} component="h4" gutterBottom>
                            Error 206
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Typography className={classes.text} variant="body2" component="p">
                            is simply dummy text of the printing and typesetting industry.
                          <br /><br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} md={1}>
                          <Typography className={classes.title} component="h4" gutterBottom>
                            Error 206
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Typography className={classes.text} variant="body2" component="p">
                            is simply dummy text of the printing and typesetting industry.
                          <br /><br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} md={1}>
                          <Typography className={classes.title} component="h4" gutterBottom>
                            Error 206
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Typography className={classes.text} variant="body2" component="p">
                            is simply dummy text of the printing and typesetting industry.
                          <br /><br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card className={classes.root}>
                    <CardContent>
                      <Grid container>
                        <Grid item xs={12} md={1}>
                          <Typography className={classes.title} component="h4" gutterBottom>
                            Error 206
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={10}>
                          <Typography className={classes.text} variant="body2" component="p">
                            is simply dummy text of the printing and typesetting industry.
                          <br /><br />
                            {'"a benevolent smile"'}
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>


              </Grid>
            </TabPanel>

          </TabContext>
        </div>

        <Box>




        </Box>





        <FooterCopyright />
      </Box>
    </>
  );
};

export default ErrorCode;
