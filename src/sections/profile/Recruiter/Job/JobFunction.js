import PropTypes from 'prop-types';
import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useResponsive, useSettings } from '../../../../hooks';


// ----------------------------------------------------------------------


export default function JobSkills() {
    const {setAlert} = useSettings()
    const isDesktop = useResponsive('up', 'md');
    const [skills, setSkills] = useState(['javascripts'])
    const deleteSkill = (index) => setSkills(skills.filter((skill, i) => i !== index))
    const [skill, setSkill] = useState('')
    const addSkills = () => {
        if (skills.includes(skill)) {
            setAlert({type: 'error', message: 'This skill already exist'})
        }
        if (skill && !skills.includes(skill)) {
            setSkills([...skills, skill])
            setAlert({message: `${skill} successfully added`})
            setSkill('')
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Job Functions</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary', fontSize:'11px' }}>
            What are the specific tasks to be done?
          </Typography>
          <Stack spacing= {1} alignItems= 'flex-start' flexWrap='wrap'>
              {
                  skills?.length > 0 && skills.map((skill, index) => (
                    <Chip label= {skill} onDelete= {() => deleteSkill(index)} key= {index} sx= {{maxWidth: '100%' }} />
                  ))
              }
          </Stack>

          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Enter the job function"
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

    </Paper>
  );
}
