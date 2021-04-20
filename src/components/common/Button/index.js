import React from "react";
import PropTypes from "prop-types";
import MuiButton from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    textTransform: "capitalize",
    fontWeight: 400,
    "&:focus": {
      outline: "none"
    },
    "&.MuiButton-containedPrimary": {
      backgroundColor: "#00AEEF",
      "&:hover": {
        backgroundColor: "#049ed8"
      }
    },
    "&.MuiButton-outlined": {
      color: "#00AEEF",
      borderColor: "#dfe2eb"
    },
    "&  svg": {
      display: "inline-block",
      verticalAlign: "middle",
      marginRight: 5
    }
  }
}));

const Button = ({
  children,
  color = "",
  onClick,
  type = "button",
  value,
  variant = "contained",
  ...props
}) => {
  const classes = useStyles();

  return (
    <MuiButton
      {...props}
      type={type}
      color={color}
      onClick={onClick}
      value={value}
      variant={variant}
      className={classes.button}
      style={{ ...props.style }}
    >
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(["default", "inherit", "primary", "secondary"]),
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string,
  value: PropTypes.string,
  variant: PropTypes.oneOf(["contained", "outlined", "text"])
};

export default Button;
