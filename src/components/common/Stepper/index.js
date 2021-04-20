import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";
import Button from "../Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& .MuiStepIcon-root.MuiStepIcon-active": {
      color: "#00aeef"
    },
    "&.topNav": {
      "& .MuiStepIcon-root": {
        color: "#dfe2eb",
        fontSize: 10,
        border: "2px solid #FFF",
        borderRadius: "100%",
        "& > text": {
          fontSize: 0
        }
      },
      "& .MuiStepIcon-root.MuiStepIcon-active": {
        color: "#00aeef",
        fontSize: 24,
        "& > text": {
          fontSize: 12,
          fontWeight: 700
        }
      },
      "& .MuiStepIcon-root.MuiStepIcon-completed": {
        color: "#00aeef",
        background: "#00aeef",
        "& > text": {
          fontSize: 0
        }
      },
      "& > .MuiBox-root": {
        marginBottom: 50,
        boxShadow: "0px 6px 20px rgba(24,26,58,0.09)",
        height: 37,
        "& > div": {
          backgroundColor: "transparent"
        }
      },
      "& .MuiStepConnector-lineHorizontal": {
        borderTopWidth: 4,
        borderColor: "#dfe2eb"
      },
      "& .MuiStepLabel-labelContainer": {
        display: "none"
      },
      "& .MuiStepLabel-iconContainer, & .MuiStep-horizontal": {
        paddingRight: 0,
        paddingLeft: 0
      }
    }
  },
  button: {
    marginRight: theme.spacing(1)
  },
  completed: {
    display: "inline-block"
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  buttonControls: {
    textAlign: "right",
    margin: "10 0px",
    "& button": {
      margin: "0 5px"
    }
  }
}));

const StepBar = ({ stepArr, navType, ...props }) => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const steps = getSteps();

  function getSteps() {
    return stepArr.data.map((item, i) => {
      return item.label;
    });
  }

  function getStepContent(step) {
    return stepArr.data[step].content;
  }

  function totalSteps() {
    return steps.length;
  }

  function completedSteps() {
    return Object.keys(completed).length;
  }

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  }

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  }

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  }

  function handleBack() {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleStep = step => () => {
    setActiveStep(step);
  };

  function handleComplete() {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  }

  return (
    <div className={classes.root + " " + (navType ? navType : " ")}>
      <Box className={classes.stepsWraper}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton
                onClick={handleStep(index)}
                completed={completed[index]}
              >
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </Box>

      <div>
        {allStepsCompleted() ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(activeStep)}
            <div className={classes.buttonControls}>
              {stepArr.allowBack ? (
                <Button
                  size="large"
                  color="default"
                  variant="outlined"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  className={classes.button}
                  size="large"
                >
                  Back
                </Button>
              ) : (
                ""
              )}

              {stepArr.allowNext ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  className={classes.button}
                  size="large"
                >
                  Next
                </Button>
              ) : (
                ""
              )}

              {stepArr.allowCompleted ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleComplete}
                >
                  {completedSteps() === totalSteps() - 1 ? "Finish" : "Next"}
                </Button>
              ) : (
                ""
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StepBar;
