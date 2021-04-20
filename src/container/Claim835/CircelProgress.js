import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const useStylesFacebook = makeStyles((theme) => ({
  root: {
    position: "relative",
    marginTop: "25px",
  },
  bottom: {
    color: theme.palette.grey[theme.palette.type === "light" ? 300 : 700],
  },
  top: {
    // color: '#1a90ff',
    animationDuration: "550ms",
    position: "absolute",
    left: 0,
  },
  // circle: {
  //     strokeLinecap: 'round',
  // },
}));

function CircularProgressWithLabel(props) {
  const classes = useStylesFacebook();
  return (
    <Box position="relative" display="inline-flex">
      <CircularProgress
        variant="determinate"
        className={classes.bottom}
        size={65}
        thickness={2}
        {...props}
        value={100}
      />
      <div className="pro-custom-color">
        <CircularProgress
          variant="indeterminate"
          //   disableShrink
          className={classes.top}
          size={65}
          thickness={2}
          {...props}
        />
      </div>

      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="caption"
          component="div"
          color="textSecondary"
        >{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate variant.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};

export default function CircelProgress({ percentage }) {
  return <CircularProgressWithLabel variant="static" value={percentage} />;
}
