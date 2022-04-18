import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider , TextField, Box  } from '@mui/material';
import { useSettings } from '../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components/animate'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { format } from 'date-fns'


// ----------------------------------------------------------------------


export default function Certificates ({form, setForm}) {

    const {setAlert} = useSettings()

    const deleteCert = (index) => {
        if (form?.certificates) {
            setForm({...form, certificates: form.certificates.filter((cert, i) => i !== index)})
        }
    } 
    const [cert, setCert] = useState({name: '', authority: '', year: '', description: ''})
    const getForm= (e) => setCert({...cert, [e.target.name]: e.target.value})
    
    

    const addCert = () => {
        if (cert.name) {
            setForm({...form, certificates: [...form.certificates, {...cert, 
                year: cert.year ? format(new Date(cert.year), 'yyyy-MM-dd') : '',
            }]})
            setCert({name: '', authority: '', year: '', description: ''})
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          {
          form.certificates.length > 0 && 
          <>
            <Stack spacing= {2} sx= {{ minHeight: '40px', marginBottom: '30px'}} alignItems= 'flex-start'>
                {
                    form.certificates.length > 0 && form.certificates.map((cert, index) => (
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
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{cert.authority} </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{cert.name}</Typography>
                            
                            <IconButtonAnimate onClick= {() => deleteCert(index)}>
                                <CloseIcon sx= {{ fontSize: '15px' }} />
                            </IconButtonAnimate>
                        </Stack>
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px' }} variant= 'outline'>{cert.year}</Typography>
                        </Stack>
                        <Divider flexItem />
                        <Typography key= {index} sx= {{ fontSize: '11px' }} variant= 'p'>{cert.description}</Typography>
                        </Paper>
                    ))
                }
            </Stack>
          <Divider />
          </>
          }
          <Stack spacing={2} sx={{ pt: 1}} alignItems="flex-start">
            <TextField
                label= 'Name'
                fullWidth
                name= 'name'
                value= {cert.name || ''}
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
                label= 'Authority'
                fullWidth
                name= 'authority'
                value= {cert.authority || ''}
                onChange= {getForm}
                type= 'text'
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date"
                value={cert.year || ''}
                onChange={(newValue) => {
                setCert({...cert, year: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </Stack>
            <TextField
                label= 'Details'
                fullWidth
                name= 'description'
                rows={3}
                multiline
                value= {cert.description || ''}
                onChange= {getForm}
                type= 'text'
            />

            <Box>
                <Button disabled= {!cert.name} variant= 'outlined' onClick= {addCert}>
                    Add
                </Button>
            </Box>
          </Stack>
        </Stack>

    </Paper>
  );
}
