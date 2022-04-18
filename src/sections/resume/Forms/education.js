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


export default function Education ({form, setForm}) {

    const {setAlert} = useSettings()

    const deleteEdu = (index) => {
        if (form?.education) {
            setForm({...form, education: form.education.filter((lang, i) => i !== index)})
        }
    } 
    const [edu, setEdu] = useState({name: '', major: '', startDate: '', endDate: '', degree: '', active: false})
    const getForm= (e) => setEdu({...edu, [e.target.name]: e.target.value})
    const toggleActive = () => {
        setEdu({...edu, endDate: '', active: !edu.active})
    }
    

    const addEdu = () => {
        if (edu.name) {
            setForm({...form, education: [...form.education, {
                name: edu.name, 
                startDate: edu.startDate ? format(new Date(edu.startDate), 'yyyy-MM-dd') : '',
                endDate: edu.endDate ? format(new Date(edu.endDate), 'yyyy-MM-dd') : 'present',
                degree: edu.degree,
                major: edu.major
            }]})
            setEdu({name: '', major: '', startDate: '', endDate: '', degree: '', active: false})
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          {
          form.education.length > 0 && 
          <>
            <Stack spacing= {2} sx= {{ minHeight: '40px', marginBottom: '30px'}} alignItems= 'flex-start'>
                {
                    form.education.length > 0 && form.education.map((edu, index) => (
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
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{edu.name}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.startDate}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.endDate}</Typography>
                            
                            <IconButtonAnimate onClick= {() => deleteEdu(index)}>
                                <CloseIcon sx= {{ fontSize: '15px' }} />
                            </IconButtonAnimate>
                        </Stack>
                        <Divider flexItem />
                        <Stack 
                            direction= 'row'
                            alignItems= 'center'
                            sx= {{width: '100%', p: 1}}
                            spacing= {1}
                        >
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{edu.major} / </Typography>
                            <Typography key= {index} sx= {{ fontSize: '11px', margin: 0, textTransform: 'uppercase' }} variant= 'p'>{edu.degree}</Typography> 
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
                label= 'Institution'
                fullWidth
                name= 'name'
                value= {edu.name || ''}
                onChange= {getForm}
                type= 'text'
            />
            <Stack
                direction="row"
                alignItems= 'center'
                spacing= {2}
                divider= {<Divider orientation="vertical" flexItem />}
            >
            <TextField
                label= 'Major'
                fullWidth
                name= 'major'
                value= {edu.major || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Degree'
                fullWidth
                name= 'degree'
                value= {edu.degree || ''}
                onChange= {getForm}
                type= 'text'
            />
            </Stack>
            <Stack
                direction="row"
                alignItems= 'center'
                spacing= {2}
                divider= {<Divider orientation="vertical" flexItem />}
            >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Start Date"
                value={edu.startDate || ''}
                onChange={(newValue) => {
                setEdu({...edu, startDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="End Date"
                value={edu.endDate || ''}
                disabled= {edu.active}
                onChange={(newValue) => {
                setEdu({...edu, endDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </Stack>

            <FormControlLabel control={<Checkbox onChange={toggleActive} checked= {edu.active} />} label="I still study here" />

            <Box>
                <Button disabled= {!edu.name} variant= 'outlined' onClick= {addEdu}>
                    Add
                </Button>
            </Box>
          </Stack>
        </Stack>

    </Paper>
  );
}
