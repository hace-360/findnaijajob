import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useSettings } from '../../../hooks';


// ----------------------------------------------------------------------


export default function JobSkills({form, setForm}) {

    const {setAlert} = useSettings()
    const deleteSkill = (index) => {
        if (form?.skills) {
            setForm({...form, skills: form.skills.filter((skill, i) => i !== index)})
        }
    } 

    const [skill, setSkill] = useState('')

    const addSkills = () => {
        if (form.skills.includes(skill)) {
            setAlert({type: 'error', message: 'This skill already exist'})
        }
        if (skill && !form.skills.includes(skill)) {
            setForm({...form, skills: [...form.skills, skill]})
            setAlert({message: `${skill} successfully added`})
            setSkill('')
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                What are your areas of expertise?
          </Typography>
          {
          form.skills.length > 0 && 
          <>
          <Divider />
            <Stack spacing= {2} sx= {{ minHeight: '40px'}} direction="row" alignItems= 'center' flexWrap='wrap'>
                {
                    form.skills.length > 0 && form.skills.map((skill, index) => (
                        <Chip 
                            label= {skill}
                            onDelete= {() => deleteSkill(index)}
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
          </Stack>
        </Stack>

    </Paper>
  );
}
