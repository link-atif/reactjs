import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import userImage from "../../../assets/images/patient.jpg";
import { Paper, Box, Card } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import CircelProgress from "./CircelProgress"
import TreeViewData from "./TreeViewData";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
    },
    secondaryTail: {
        backgroundColor: theme.palette.secondary.main,
    },
    treeouter: {
        backgroundColor: '#f8fafa',
        padding: '15px',
        boxShadow: '0px 0px 2px #1c9a7e33',
        borderRadius: '10px',
    },

}));

function getLocalDate(timeStamp) {
    return moment(timeStamp).format('l');
}

export default function TimeLine(props) {

    const classes = useStyles();
    const { data } = props;
    return (
        <>
            <div>
                <div
                    style={{
                        width: "100px",
                        height: "100px",
                        backgroundColor: "#F8FAFA",
                        borderRadius: "100px",
                        opacity: "1",
                        textAlign: "center",
                        margin: "0 auto"
                    }}
                >
                    <img
                        style={{
                            boxShadow: "0px 1px 2px #1C9A7E14",
                            borderRadius: "50%",
                            // marginLeft: "-10px",
                            padding: "4px",
                        }}
                        src={userImage}
                        className="img-fluid"
                        alt="img missing"
                    />

                </div>
                <h3 className="text-center dr-time-heading">Jennie Regel</h3>
            </div>
            <Timeline className="timeline-main-outer" align="alternate">
                {
                    Object.keys(data).map((dateKey, index) => (
                        <TimelineItem key={index}>
                            <TimelineOppositeContent>
                                <Typography className="time-line-time" >{getLocalDate(dateKey)}</Typography>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <span className="dr-dot-outline"><TimelineDot /></span>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                {/* <Typography>{getLocalDate(dateKey)}</Typography> */}
                                <div className="mt-3">
                                    <div className={classes.treeouter}>
                                        <TreeViewData data={data[dateKey]} />
                                    </div>
                                </div>
                            </TimelineContent>
                        </TimelineItem>
                    ))
                }

            </Timeline>
        </>
    );
}
