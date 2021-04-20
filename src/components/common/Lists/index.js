import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ClearIcon from "@material-ui/icons/Clear";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import "./styles.scss";
import { Typography } from "@material-ui/core";
import watchimg from "../../../asstes/images/watch-svg-icon.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: "2px 2px 3px #e8e8e8",
  },
}));

const Lists = ({
  listTitle,
  listArray,
  closeNotificationSideBar,
  showDetail,
  detailNotification,
  closeDetail,
}) => {
  const classes = useStyles();
  return (
    <div className="notification-rightbar">
      <Typography variant="h2">{listTitle}</Typography>
      <div className="close-notification">
        {typeof detailNotification !== "undefined" &&
        Object.entries(detailNotification).length > 0 ? (
          <ArrowBackIcon onClick={closeDetail} />
        ) : (
          <ClearIcon onClick={closeNotificationSideBar} />
        )}
      </div>
      <div className="inner">
        <ul>
          {typeof detailNotification !== "undefined" &&
          Object.entries(detailNotification).length > 0 ? (
            <li>
              {detailNotification.icon}
              <div className="list-item">{detailNotification.listItem}</div>
              <div className="date">{detailNotification.date}</div>
              <div className="notificationDetails" id={detailNotification.id}>
                {detailNotification.message}
              </div>
            </li>
          ) : (
            listArray.map((item, i) => (
              <li key={i} onClick={() => showDetail(item)}>
                {item.icon}
                <div className="list-item">{item.listItem}</div>
                <div className="date">{item.date}</div>
                <div
                  className="notificationDetails"
                  id={item.id}
                  style={{ display: "none" }}
                >
                  Some text here{item.listItem}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
      {listArray.length == 0 ? (
        <div className="no-notifications">
          <img src={watchimg} alt="" />
          <Typography variant="h3">Nothing new right now</Typography>
          <Typography>Check again later for updates</Typography>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Lists;
