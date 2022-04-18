import PropTypes from 'prop-types';
import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useResponsive, useSettings } from '../../../../hooks';


// ----------------------------------------------------------------------


export default function Skills({form, setForm}) {
    const {setAlert} = useSettings()
    const isDesktop = useResponsive('up', 'md');

    const deleteSkill = (index) => setForm({...form, skills: form.skills.filter((skill, i) => i !== index)} )
    const [skill, setSkill] = useState('')
    const addSkills = () => {
        if (form?.skills?.includes(skill)) {
            setAlert({type: 'error', message: 'This skill already exist'})
        }
        if (skill && !form?.skills?.includes(skill)) {
            setForm({...form, skills: [...form.skills, skill]})
            setSkill('')
        }
    }

  return (

        <Stack spacing={0.5}>
          <Typography variant="button">Skills</Typography>

          <Stack spacing= {1} direction= 'row' alignItems= 'flex-start' flexWrap='wrap'>
              {
                  form?.skills?.length > 0 && form?.skills.map((skill, index) => (
                    <Chip label= {skill} onDelete= {() => deleteSkill(index)} key= {index} sx= {{maxWidth: '100%' }} />
                  ))
              }
          </Stack>


          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Required job skill"
            value= {skill}
            onChange= {(e) => setSkill(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    height: 45,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick= {addSkills}
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
