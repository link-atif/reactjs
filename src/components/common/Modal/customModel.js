import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import {
  Typography,
  Box,
  Grid,
  TextField,
  FormControl,
  Button,
  Input,
  InputAdornment,
} from "@material-ui/core";
import Messages from "../../../components/Messages";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import "./styles.scss";
import { RootContext } from "../../../context/RootContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

const ModalBoxCustom = ({
  modalData,
  size,
  action,
  handleClose,
  handleConfirm,
  open,
  loadingClass,
  nameInput,
  handleDeleteName,
  inputLabel,
  errors
}) => {
  const classes = useStyles();
  const { setMessage } = useContext(RootContext);
  useEffect(() => {
    setMessage({
      type: '',
      message: ''
    });
  }, []);

  // const [open, setOpen] = React.useState(false);

  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={size ? "custom-modal " + size : "custom-modal"}>
            <h2>{modalData.title}</h2>
            <Messages />
            <p>{modalData.description}</p>

            {
              nameInput && (
                <Grid item xs={12}>
                  <label className="new-input-lable">
                    {`Enter ${inputLabel} name`}
                  </label>
                  <Box className="input-new-design-icon">
                    <Input
                      type="text"
                      fullWidth
                      required
                      onChange={handleDeleteName}
                    // value={formData.subscriptionId}
                    // placeholder="Subscription ID"
                    />
                  </Box>
                  <div style={{ color: "red" }}>{errors.name === "delete_name" && errors.message}</div>
                </Grid>

              )
            }

            {action && (
              <div className="actions">
                <Button
                  variant="outlined"
                  color="default"
                  type="submit"
                  onClick={handleClose}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  type="submit"
                  style={{ backgroundColor: "#67D091", color: "#ffffff" }}
                  onClick={handleConfirm}
                  className={"custom-btn " + loadingClass}
                >
                  Confirm
                </Button>
              </div>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalBoxCustom;
