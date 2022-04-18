import React, {useState} from 'react';
import { Button, StepContent, StepLabel, Step, Stepper,Box, Typography } from '@mui/material';



export default function ResumeSteps({steps}) {

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


// ------------------------


  return (
    <Box sx= {{ p: 2}}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              onClick={() => setActiveStep(index)}
              sx= {{cursor: 'pointer'}}
            >
              <Typography variant= 'button'>
                {step.label}
              </Typography>
              
            </StepLabel>
            <StepContent>
                {step.component}
              <Box sx={{ mb: 2 }}>
                <div>
                    {
                        index > 0 &&
                        <Button
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                        >
                            Back
                        </Button>
                    }

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === steps.length - 1 ? 'Done' : 'Continue'}
                  </Button>
                  
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>

    </Box>
  );
}
