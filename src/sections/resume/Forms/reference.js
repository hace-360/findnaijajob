import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider , TextField, Box  } from '@mui/material';
import { useSettings } from '../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components/animate'


// ----------------------------------------------------------------------


export default function Reference ({form, setForm}) {

    const {setAlert} = useSettings()

    const deleteRef = (index) => {
        if (form?.reference) {
            setForm({...form, reference: form.reference.filter((ref, i) => i !== index)})
        }
    } 
    const [ref, setRef] = useState({name: '', position: '', email: '', phone: '', description: ''})
    const getForm= (e) => setRef({...ref, [e.target.name]: e.target.value})
    
    

    const addRef = () => {
        if (ref.name) {
            setForm({...form, reference: [...form.reference, {...ref}]})
            setRef({name: '', position: '', email: '', phone: '', description: ''})
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          {
          form.reference.length > 0 && 
          <>
            <Stack spacing= {2} sx= {{ minHeight: '40px', marginBottom: '30px'}} alignItems= 'flex-start'>
                {
                    form.reference.length > 0 && form.reference.map((ref, index) => (
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
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{ref.name} </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{ref.position}</Typography>
                            
                            <IconButtonAnimate onClick= {() => deleteRef(index)}>
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
                            <Typography sx= {{ fontSize: '12px' }} variant= 'outline'>{ref.email}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{ref.phone}</Typography>
                        </Stack>
                        <Divider flexItem />
                        <Typography key= {index} sx= {{ fontSize: '11px' }} variant= 'p'>{ref.description}</Typography>
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
                value= {ref.name || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Position'
                fullWidth
                name= 'position'
                value= {ref.position || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Email'
                fullWidth
                name= 'email'
                value= {ref.email || ''}
                onChange= {getForm}
                type= 'email'
            />
            <TextField
                label= 'Phone'
                fullWidth
                name= 'phone'
                value= {ref.phone || ''}
                onChange= {getForm}
                type= 'email'
            />
            <TextField
                label= 'Details'
                fullWidth
                name= 'description'
                rows={3}
                multiline
                value= {ref.description || ''}
                onChange= {getForm}
                type= 'text'
            />

            <Box>
                <Button disabled= {!ref.name} variant= 'outlined' onClick= {addRef}>
                    Add
                </Button>
            </Box>
          </Stack>
        </Stack>

    </Paper>
  );
}
