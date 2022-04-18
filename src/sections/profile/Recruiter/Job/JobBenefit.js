import PropTypes from 'prop-types';
import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useResponsive, useSettings } from '../../../../hooks';


// ----------------------------------------------------------------------


export default function JobBenefit({form, setForm}) {
    const {setAlert} = useSettings()
    const isDesktop = useResponsive('up', 'md');

    const deletebenefit = (index) => setForm({...form, benefits: form.benefits.filter((benefit, i) => i !== index)} )
    const [benefit, setbenefit] = useState('')
    const addbenefits = () => {
        if (form?.benefits?.includes(benefit)) {
            setAlert({type: 'error', message: 'This benefit already exist'})
        }
        if (benefit && !form?.benefits?.includes(benefit)) {
            setForm({...form, benefits: [...form.benefits, benefit]})
            setbenefit('')
        }
    }

  return (
        <Stack spacing={0.5}>
          <Typography variant="button">Job Benefits</Typography>

          <Stack spacing= {1} alignItems= 'flex-start' flexWrap='wrap' direction= 'row'>
              {
                  form?.benefits?.length > 0 && form?.benefits?.map((benefit, index) => (
                    <Chip label= {benefit} onDelete= {() => deletebenefit(index)} key= {index} sx= {{maxWidth: '100%' }} />
                  ))
              }
          </Stack>


          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Available job benefit"
            value= {benefit}
            onChange= {(e) => setbenefit(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    height: 45,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick= {addbenefits}
                >
                  Add
                </Button>
              </InputAdornment>
            }
            sx={{
              p: 0,
              width: 1,
              '& .MuiFilledInput-input': {
                fontSize: '13px',
                py: '13px',
                '&::placeholder': {
                  color: 'grey.500'
                },
              },
            }}
          />
          </Stack>
        </Stack>
  );
}
