import React from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  makeStyles,
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import searchImg from "../../assets/images/search.svg";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(2),
  },
  checkbx: {
    color: "#0000001A",
  },
  body1Text: {
    fontSize: "2",
  },
}));

const CodesDropDown = ({ allCodes, selected, handleChange, SelectAll }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  return (
    <div className="payer-drop-list-main">
      <Link
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        className="payer-drop-list"
        to="#"
      >
        {selected.length > 0 ? "Custom" : "All"}{" "}
        <ExpandMoreIcon className="pull-right" />
      </Link>

      <Popper
        className="payer-iner-drop-list"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                >
                  <FormControl
                    component="fieldset"
                    className={classes.formControl}
                  >
                    <FormGroup className="">
                      <FormControlLabel
                        className={classes.checklab}
                        control={
                          <Checkbox
                            checked={selected.length === 0 ? true : false}
                            className={classes.checkbx}
                            name="gilad"
                          />
                        }
                        onChange={() => SelectAll()}
                        label="All"
                      />
                      {allCodes.map((item) => {
                        return (
                          <FormControlLabel
                            key={item.code}
                            className={classes.checklab}
                            control={
                              <Checkbox
                                className={classes.checkbx}
                                name="gilad"
                                checked={
                                  selected.includes(item.code) ? true : false
                                }
                              />
                            }
                            onChange={() => handleChange(item.code)}
                            label={item.drugName}
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

export default CodesDropDown;
