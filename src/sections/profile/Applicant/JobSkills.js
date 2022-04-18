import PropTypes from 'prop-types';
import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useResponsive, useSettings } from '../../../hooks';


// ----------------------------------------------------------------------


export default function JobSkills({id}) {

    const {user, userAction, setAlert} = useSettings()
    const isDesktop = useResponsive('up', 'md');

    const [skill, setSkill] = useState('')

    const addSkills = async () => {
      if (user && skill) {
        if (!user.skills.includes(skill)) {
          await userAction.updateOptions({form: {skills: [...user.skills, skill]}})
          setAlert({message: `${skill} added successfuly`})
          setSkill('')
        }
        else setAlert({type: 'error', message: `${skill} is already added`})
      }
    }

    const deleteSkill = async (index) => {
      if (user && user?.skills?.length > 0) {
        user.skills.splice(index, index + 1)
        await userAction.updateOptions({form: {skills: [...user.skills]}})
        setAlert({message: 'skill removed successfuly'})
      }
    } 


  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Job Skills</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                What are your areas of expertise?
          </Typography>
          
          <Stack spacing= {isDesktop ? 2 : 1}  direction="row" alignItems= 'center' flexWrap='wrap'>
              {
                  user && user?.skills?.length > 0 && user?.skills.map((skill, index) => (
                    <Chip label= {skill} onDelete= {() => deleteSkill(index)} key= {index} sx= {{ margin: '5px 0' }} />
                  ))
              }
          </Stack>


          {user && user.id == id && 
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Enter your skills..."
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
          </Stack>}
        </Stack>

    </Paper>
  );
}
