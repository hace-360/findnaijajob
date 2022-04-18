import Slider from '@mui/material/Slider';
import {Stack, Box, Typography} from '@mui/material'
import CurrencyFormater from 'currency-formatter'


export default function RangeSlider({form, setForm}) {

  const handleChange = (event, newValue) => {
    setForm({...form, salary: newValue});
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack 
        spacing= {2}
        direction= 'row'
        sx= {{ marginBottom: '3px' }}
      >
        <Typography variant= 'button' color= 'inherit'>
          Salary Range
        </Typography>
        <Typography variant= 'body2' color= 'secondary'>
          {
            form?.salary[0] == 0 ?
            ` ${CurrencyFormater.format(form?.salary[1], {code: 'NGN'})}` : 

            `${CurrencyFormater.format(form?.salary[0], {code: 'NGN'})} - ${CurrencyFormater.format(form?.salary[1], {code: 'NGN'})}`
          }
        </Typography>
      </Stack>
      
      <Slider
        value={form?.salary}
        min= {0}
        max= {20000000}
        step= {10000}
        onChange={handleChange}
        valueLabelDisplay="off"
      />
    </Box>
  );
}

