import React, { useEffect, useState, useRef } from "react";
import {
  Fade,
  Typography,
  Box,
  Grid,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Button,
  InputAdornment,
  Input,
} from "@material-ui/core";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LockIcon from "@material-ui/icons/Lock";
// import './styles.scss'
import { NavLink } from "react-router-dom";
import { object } from "prop-types";
import Messages from "../../../components/Messages";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { RootContext } from "../../../context/RootContext";
import { Redirect, useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import CloseIcon from "@material-ui/icons/Close";

import AddUserIcon from "../../../assets/images/new-design/add-user-icon.svg"
import CardNameIcon from "../../../assets/images/new-design/add-p-u-icon.svg"
import CardPaymentIcon from "../../../assets/images/new-design/card-pay.svg"
import PaymentLockIcon from "../../../assets/images/new-design/sec-lock.svg"
import CalenderIcon from "../../../assets/images/new-design/claims-icon/calendar-icon.svg"

const AddBillingMethod = ({
  holdername,
  handleHolder,
  cardnumber,
  handleCard,
  expiry,
  handleExpiry,
  cvc,
  handleCvc,
  closeUser,
}) => {
  const history = useHistory();
  const [errors, setErrors] = useState({});
  const handlePayment = () => {
    var error = null;
    if (holdername == "") {
      error = { ...error, holdername: "Holder Name is required" };
      setErrors(error);
    }
    if (cardnumber == "") {
      error = { ...error, cardnumber: "Card Number is required" };
      setErrors(error);
    }

    if (expiry == "") {
      error = { ...error, expiry: "Expiry Date is required" };
      setErrors(error);
    }

    if (cvc == "") {
      error = { ...error, cvc: "Cvc Number is required" };
      setErrors(error);
    }
  };

  return (
    <div >
      <Box className="add-user-overlay b-b-l mt-3">
        <CloseIcon className="close" onClick={closeUser} />
        <Typography className="add-user-title" variant="h4"><img src={AddUserIcon} alt="icon" /> Add Payment Method</Typography>
      </Box>

      <Box className="add-user-overlay">
        <Grid container spacing={2}>
          <Grid item md={12}>
            <Box className="">
              <label className="new-input-lable">
                Card Holder Name
              </label>
              <Box className="input-new-design-icon">
                <Input
                  id="standard-adornment-amount"
                  value={holdername}
                  onChange={(e) => handleHolder(e.target.value)}
                  placeholder="Card Holder Name"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="end">
                      <img src={CardNameIcon} alt="icon" />
                      {/* <PermIdentityIcon /> */}
                    </InputAdornment>
                  }
                />
              </Box>
              <div className="text-danger">{errors.holdername}</div>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box className="">
              <label className="new-input-lable">
                Card Number
            </label>
              <Box className="input-new-design-icon">
                <Input
                  id="standard-adornment-amount"
                  value={cardnumber}
                  type="number"
                  onChange={(e) => handleCard(e.target.value)}
                  placeholder="Card Number"
                  inputProps={{ maxLength: 16 }}
                  fullWidth
                  startAdornment={
                    <InputAdornment position="end">
                      <img src={CardPaymentIcon} alt="icon" />
                      {/* <CreditCardIcon /> */}
                    </InputAdornment>
                  }
                />
              </Box>
              <div className="text-danger">{errors.cardnumber}</div>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box className="">
              <label className="new-input-lable">
                Expiry MM/YY
            </label>
              <Box className="input-new-design-icon">
                <Input
                  id="standard-adornment-amount"
                  value={expiry}
                  onChange={(e) => handleExpiry(e.target.value)}
                  placeholder="Expiry MM/YY"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="end">
                      <img src={CalenderIcon} alt="icon" />
                      {/* <DateRangeIcon /> */}
                    </InputAdornment>
                  }
                  onKeyUp={(e) => {
                    e.target.value = e.target.value
                      .replace(/^(\d\d)(\d)$/g, "$1/$2")
                      .replace(/^(\d\d\d\d)(\d+)$/g, "$1/$2")
                      .replace(/[^\d\/]/g, "");
                  }}
                />
              </Box>
              <div className="text-danger">{errors.expiry}</div>
            </Box>
          </Grid>
          <Grid item md={12}>
            <Box className="">
              <label className="new-input-lable">
                CVC
            </label>
              <Box className="input-new-design-icon">
                <Input
                  id="standard-adornment-amount"
                  value={cvc}
                  onChange={(e) => handleCvc(e.target.value)}
                  placeholder="CVC"
                  fullWidth
                  startAdornment={
                    <InputAdornment position="end">
                      <img src={PaymentLockIcon} alt="icon" />
                      {/* <LockIcon /> */}
                    </InputAdornment>
                  }
                />
              </Box>

              <div className="text-danger">{errors.cvc}</div>
            </Box>
          </Grid>
        </Grid>
        <Box mt={5} mb={5} className="text-center">
          <Button
            variant="contained"
            color="primary"
            type="submit"

            onClick={handlePayment}
            style={{
              display: "block",
              backgroundColor: "#0AE2B3",
              padding: "12px 20px",
              fontSize: "14px",
              fontWeight: "500",
              color: "#ffffff",
              border: "none",
              width: "100%",
              borderRadius: "10px",
              cursor: "pointer",
              textDecoration: "none",
              boxShadow: "none"
            }}
          >
            Add
        </Button>
        </Box>

      </Box>

    </div>
  );
};

export default AddBillingMethod;
