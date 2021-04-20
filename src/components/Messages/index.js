import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { RootContext } from "../../context/RootContext";
import { Box, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Message = () => {
  const { message, setMessage } = useContext(RootContext);

  useEffect(() => {
    if (
      message.type !== "" &&
      typeof message.interval !== "undefined" &&
      message.interval !== ""
    ) {
      setTimeout(() => {
        setMessage({ type: "", message: "" });
      }, message.interval);
    }
  }, [message]);

  if (
    message.type !== "" &&
    message.message !== "" &&
    message.type !== undefined
  ) {
    return (
      <Box className="w-100" >
        <div className={useStyles.root}>
          <Alert variant="filled" severity={message.type}>
            {message.message}
          </Alert>
        </div>
      </Box>
    );
  }

  return null;
};

export default Message;
