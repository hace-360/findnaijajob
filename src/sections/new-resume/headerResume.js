import * as React from 'react';
import {Typography, StepLabel, Step, Box, Stepper, StepButton, Button} from '@mui/material'
import {useRouter} from 'next/router'
import {TextMaxLine} from '../../components'

const sections = [
  'contact',
  'work history',
  'education',
  'skills',
  'hobbies',
  'professional summary',
  'language',
  'certificates'
]


export default function HorizontalNonLinearStepper() {

  const router = useRouter()
  const [activeStep, setActiveStep] = React.useState(0);
  
  const handleStep = (label) => {
    setActiveStep(sections.indexOf(label) || 0)
    router.push(`/resume/section/${label}`)
  }


  return (
    <Box sx={{ width: '100%' }}>
      <Stepper nonLinear activeStep={activeStep}>
        {sections.map((label, index) => (
          <Step key={index}>
            <StepButton  color="inherit" onClick={ () => handleStep(label)} >
              <TextMaxLine line= {1}>
              <Typography variant= 'button' sx= {{fontSize: '9px'}}>
                {label}
              </Typography>
              </TextMaxLine>
            </StepButton>
          </Step>
        ))}

          <Step>
            <StepButton  color="inherit" onClick={ () => router.push('/resume/final-cv')} >
            <TextMaxLine line= {1}>
              <Typography variant= 'button' sx= {{fontSize: '9px'}}>
                Finalize Resume
              </Typography>
              </TextMaxLine>
            </StepButton>
          </Step>
      </Stepper>
    </Box>
  );
}
