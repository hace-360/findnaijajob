import {useState} from 'react';
import Slider from '@mui/material/Slider';
import {Stack, Box, Typography} from '@mui/material'



export default function RangeSlider({form, setForm}) {

  const handleChange = (event, newValue) => {
    setForm({...form, experience: newValue});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack 
        spacing= {2}
        direction= 'row'
        sx= {{ marginBottom: '3px' }}
      >
        <Typography variant= 'button' color= 'inherit'>
          Work Experience
        </Typography>
        <Typography variant= 'body2' color= 'secondary'>
          {
            form?.experience[0] == 0 ?
            `${form?.experience[1] }yrs` : 

            `${form?.experience[0] || '0'}yrs - ${form?.experience[1]}yrs`
          }
        </Typography>
      </Stack>
      
      <Slider
        getAriaLabel={() => 'Temperature range'}
        value={form?.experience}
        min= {0}
        max= {20}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={(value) => `${value} experience` }
      />
    </Box>
  );
}
