import React from "react";
import {
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import searchImg from "../../assets/images/search.svg";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Pagination from "@material-ui/lab/Pagination";
import ArrowBackIosOutlinedIcon from "@material-ui/icons/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import { Input } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const PaginationNew = ({
  count,
  page,
  totalCount,
  totalRecords,
  handlePageChange,
  handleRowPerPage,
  countPerPage,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [rowsNumber, setRowsNumber] = React.useState(10);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      event.currentTarget !== null &&
      typeof event.currentTarget.dataset !== "undefined"
    ) {
      const { myValue } = event.currentTarget.dataset;
      if (typeof myValue !== "undefined" && myValue !== rowsNumber) {
        handleRowPerPage(myValue);
        setRowsNumber(myValue);
      }
      if (anchorRef.current && anchorRef.current.contains(event.target)) {
        return;
      }
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
    <div className="new-pagi-outer mt-4">
      <Grid container>
        {/* <Grid item xs={12} md={4}> */}
        {/* <label className="pgi-out-t">Page Count:</label> */}


        {/* <strong>Page:</strong>
          <Input
            placeholder="Page Number"
            value={page}
            label="page"
            onChange={(e) => handlePageChange(parseInt(e.currentTarget.value))}
          /> */}
        {/* </Grid> */}
        <Grid item xs={12} md={12}>
          <label className="pagi-texcount">
            1-{totalCount} of {totalRecords} items
          </label>
          <div className="pagi-drop-main">
            <Link className="m-select" to="#">
              <span className="pagi-text" onClick={() => setOpen(true)}>
                {countPerPage}
              </span>
              <span
                ref={anchorRef}
                aria-controls={open ? "menu-list-grow" : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
              >
                <ExpandLessOutlinedIcon className="pull-right pagi-arrow" />
                <ExpandMoreIcon className="pull-right pagi-arrow" />
              </span>
            </Link>
            <Popper
              className="pagi-drop-list"
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
                        <MenuItem onClick={handleClose} data-my-value="10">
                          10
                        </MenuItem>
                        <MenuItem onClick={handleClose} data-my-value="15">
                          15
                        </MenuItem>
                        <MenuItem onClick={handleClose} data-my-value="20">
                          20
                        </MenuItem>
                        <MenuItem onClick={handleClose} data-my-value="25">
                          25
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </div>

          <div className="tb-page-count pull-right">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1 ? true : false}
            >
              <ArrowBackIosOutlinedIcon /> Previous
            </button>
            <Input
              placeholder="Page Number"
              value={page}
              label="page"
              onChange={(e) =>
                handlePageChange(parseInt(e.currentTarget.value))
              }
            />
            <label className="pgi-out-t mr-2">out of <span>10</span></label>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === count ? true : false}
            >
              {" "}
              Next <ArrowForwardIosOutlinedIcon />
            </button>
          </div>

          {/* <div className="diver-tb-pg" ></div> */}

          {/* <Pagination
            shape="rounded"
            showFirstButton
            showLastButton
            count={count}
            page={page}
            onChange={(e, value) => handlePageChange(value)}
            className="ui-table-prgination"
          /> */}
        </Grid>
      </Grid>
    </div>
  );
};

export default PaginationNew;
