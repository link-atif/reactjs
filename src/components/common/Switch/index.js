import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";

const useStyles = makeStyles(theme => ({
  primarySwitch: {
    "& > span": {
      "&.MuiSwitch-colorPrimary.Mui-checked": {
        color: "#00aeef"
      },
      "&.MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#00aeef"
      }
    }
  }
}));

const Switches = ({ name, value, ...props }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedB: true
  });
  const handleChange = name => event => {
    setState({ ...state, [name]: event.target.checked });
  };
  return (
    <Switch
      checked={state.checkedB}
      onChange={handleChange("checkedB")}
      name={name}
      value={value}
      className={classes.primarySwitch}
      color="primary"
      inputProps={{ "aria-label": "primary checkbox" }}
    />
  );
};

export default Switches;
