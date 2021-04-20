import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import claims from "../../actions/claims";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    background: "none",
    padding: "0px",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: "inline-block",
    color: "#222",
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  // return ['837', 'Status', '835'];
  return [
    {
      lable: "837",
      key: "claimrequestId",
      id: "f5f00d36-ebb0-4625-a10e-3cd304e72cd4",
      link: "/workers",
    },
    {
      lable: "status",
      id: "abce367f-dd07-4fec-acd7-e33be26c2f61",
      key: "capatientleveldetailId",
      link:
        "/claim277/abce367f-dd07-4fec-acd7-e33be26c2f61/f5f00d36-ebb0-4625-a10e-3cd304e72cd4",
    },
    {
      lable: "835",
      key: "claimpaymentId",
      id: "a92dfc9b-1913-43f0-b330-248273251399",
      link: "/claim",
    },
  ];
}

export default function ClaimStatusStepper({ id }) {
  const history = useHistory();
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [claimRequestId, setClaimRequestId] = useState("");
  const [capatientLevelDetailId, setCapatientLevelDetailId] = useState("");
  const [claimPaymentId, setClaimPaymentId] = useState("");
  const steps = getSteps();

  useEffect(() => {
    // const id = "5f9ca83a-6378-4e5c-b4bf-a0b229673fd4";
    if (typeof id !== "undefined" && id !== "") {
      claims
        .getClaimLinkage(id)
        .then(({ data: response }) => {
          const resdata = response.data;
          if (typeof resdata !== "undefined" && resdata !== "") {
            let request =
              typeof resdata.ClaimRequestId !== "undefined" &&
              resdata.ClaimRequestId !== null
                ? resdata.ClaimRequestId
                : "";

            let payment =
              typeof resdata.ClaimPaymentId !== "undefined" &&
              resdata.ClaimPaymentId !== null
                ? resdata.ClaimPaymentId
                : "";

            let capatientleveldetailId =
              typeof resdata.ClaimAcknowledgementId !== "undefined" &&
              resdata.ClaimAcknowledgementId !== null
                ? resdata.ClaimAcknowledgementId
                : "";

            setClaimRequestId(request);
            setCapatientLevelDetailId(capatientleveldetailId);
            setClaimPaymentId(payment);
          }
        })
        .catch((error) => {
          console.log("error is ", error);
        });
    }
  }, [id]);
  // console.log("claim request id ", claimRequestId);
  return (
    <div className="claim-status-proses">
      <div className={classes.root}>
        <Stepper nonLinear activeStep={4}>
          <Step>
            <StepButton
              onClick={() =>
                history.push(`/pre-adjudication-detail/${claimRequestId}`)
              }
              completed={claimRequestId !== "" ? true : false}
            >
              837
            </StepButton>
          </Step>
          <Step>
            <StepButton
              onClick={() =>
                history.push(
                  `/claim277/${capatientLevelDetailId}/${claimRequestId}`
                )
              }
              completed={capatientLevelDetailId !== "" ? true : false}
            >
              277
            </StepButton>
          </Step>
          <Step>
            <StepButton
              onClick={() => history.push(`/claim-detail/${claimPaymentId}`)}
              completed={claimPaymentId !== "" ? true : false}
            >
              835
            </StepButton>
          </Step>
        </Stepper>
      </div>
    </div>
  );
}
