import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider , TextField, Box, FormControlLabel, Checkbox  } from '@mui/material';
import { useSettings } from '../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components/animate'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns'


// ----------------------------------------------------------------------


export default function Experience ({form, setForm}) {

    const {setAlert} = useSettings()

    const deleteExp = (index) => {
        if (form?.experience) {
            setForm({...form, experience: form.experience.filter((lang, i) => i !== index)})
        }
    } 
    const [exp, setExp] = useState({name: '', role: '', startDate: '', endDate: '', detail: '', active: false})
    const getForm= (e) => setExp({...exp, [e.target.name]: e.target.value})
    const toggleActive = () => {
        setExp({...exp, endDate: '', active: !exp.active})
    }
    

    const addExp = () => {
        if (exp.name) {
            setForm({...form, experience: [...form.experience, {
                name: exp.name, 
                startDate: exp.startDate ? format(new Date(exp.startDate), 'yyyy-MM-dd') : '',
                endDate: exp.endDate ? format(new Date(exp.endDate), 'yyyy-MM-dd') : 'present',
                description: exp.detail.split('\n'),
                role: exp.role
            }]})
            setExp({name: '', role: '', startDate: '', endDate: '', detail: '', active: false})
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          {
          form.experience.length > 0 && 
          <>
            <Stack spacing= {2} sx= {{ minHeight: '40px', marginBottom: '30px'}} alignItems= 'flex-start'>
                {
                    form.experience.length > 0 && form.experience.map((exp, index) => (
                        <Paper
                            key= {index}
                            variant= 'outlined'
                            elevation= {0}
                            sx= {{ p: 1, width: '100%' }}
                        >
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{exp.name}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{exp.startDate}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{exp.endDate}</Typography>
                            
                            <IconButtonAnimate onClick= {() => deleteExp(index)}>
                                <CloseIcon sx= {{ fontSize: '15px' }} />
                            </IconButtonAnimate>
                        </Stack>
                        <Divider flexItem />
                        <Stack 
                            alignItems= 'flex-start'
                            sx= {{width: '100%', p: 1}}
                            spacing= {1}
                        >
                            <Typography sx= {{ fontSize: '11px' }} variant= 'button'>{exp.role}</Typography>
                            {
                                exp.description.length > 0 && exp.description.map((det, index) => (
                                    <Typography key= {index} sx= {{ fontSize: '11px', margin: 0 }} variant= 'p'>{det}</Typography> 
                                ))
                            }
                        </Stack>
                        </Paper>
                    ))
                }
            </Stack>
          <Divider />
          </>
          }
          <Stack spacing={2} sx={{ pt: 1}} alignItems="flex-start">
            <TextField
                label= 'Employer'
                fullWidth
                name= 'name'
                value= {exp.name || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Role'
                fullWidth
                name= 'role'
                value= {exp.role || ''}
                onChange= {getForm}
                type= 'text'
            />
            <Stack
                direction="row"
                alignItems= 'center'
                spacing= {2}
                divider= {<Divider orientation="vertical" flexItem />}
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Start Date"
                value={exp.startDate || ''}
                onChange={(newValue) => {
                setExp({...exp, startDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="End Date"
                value={exp.endDate || ''}
                disabled= {exp.active}
                onChange={(newValue) => {
                setExp({...exp, endDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </Stack>

            <FormControlLabel control={<Checkbox onChange={toggleActive} checked= {exp.active} />} label="I still work here" />

            <TextField
                placeholder='Details about your activities with your employer.'
                fullWidth
                name= 'detail'
                multiline
                value= {exp.detail || ''}
                rows={3}
                onChange= {getForm}
                type= 'text'
            />
            <Box>
                <Button disabled= {!exp.name} variant= 'outlined' onClick= {addExp}>
                    Add
                </Button>
            </Box>
          </Stack>
        </Stack>

    </Paper>
  );
}
