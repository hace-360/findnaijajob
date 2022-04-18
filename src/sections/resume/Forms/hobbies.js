import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useSettings } from '../../../hooks';
import PropTypes from 'prop-types'


// ----------------------------------------------------------------------
Hobbies.prototype = {
    form: {
        hobbies: PropTypes.array.isRequired
    },
    setForm: PropTypes.func
};


export default function Hobbies ({form, setForm}) {

    const {setAlert} = useSettings()
    const deleteHobby = (index) => {
        if (form?.hobbies) {
            setForm({...form, hobbies: form.hobbies.filter((hobby, i) => i !== index)})
        }
    } 

    const [hobby, setHobby] = useState('')

    const addHobbies = () => {
        if (form.hobbies.includes(hobby)) {
            setAlert({type: 'error', message: 'This hobby already exist'})
        }
        if (hobby && !form.hobbies.includes(hobby)) {
            setForm({...form, hobbies: [...form.hobbies, hobby]})
            setAlert({message: `${hobby} successfully added`})
            setHobby('')
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                What are your Hobbies?
          </Typography>
          {
          form.hobbies.length > 0 && 
          <>
          <Divider />
            <Stack spacing= {2} sx= {{ minHeight: '40px'}} direction="row" alignItems= 'center' flexWrap='wrap'>
                {
                    form.hobbies.length > 0 && form.hobbies.map((hobby, index) => (
                        <Chip 
                            label= {hobby}
                            onDelete= {() => deleteHobby(index)}
                            key= {index}
                            sx= {{ margin: '5px 0', fontSize: '12px', textTransform: 'capitalize', fontWeight: 500 }}
                        />
                    ))
                }
            </Stack>
          <Divider />
          </>
          }
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Enter your hobbies..."
            value= {hobby}
            onChange= {(e) => setHobby(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    height: 45,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick= {addHobbies}
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

    </Paper>
  );
}
