import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    background: 'none',
    padding: '0px'
  },
  button: {
    marginRight: theme.spacing(1),
  },
  completed: {
    display: 'inline-block',
    color: '#222'
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ['837', 'Status', '835'];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return 'Step 1: 837';
    case 1:
      return 'Step 2: Status';
    case 2:
      return 'Step 3: 835';
    default:
      return 'Unknown step';
  }
}

export default function ClaimStatusStepper() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(1);
  const [completed, setCompleted] = React.useState(0);
  const steps = getSteps();

  // const newwCompleted = completed;
  // newwCompleted[0] = true;
  // setCompleted(newwCompleted);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };




  return (
    <div className="claim-status-proses">
      <div className={classes.root}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton onClick={handleStep(index)} completed={index === 0 ? true : false}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
