import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Paper,Button,Divider, TextField, Box, FormGroup, Checkbox, FormControlLabel, Link} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useResponsive } from '../../../hooks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useRouter} from 'next/router'
import {useState} from 'react'
import { Iconify,TextMaxLine } from '../../../components';
import edit from '@iconify/icons-carbon/edit';
import deleteIcon from '@iconify/icons-carbon/delete';
import { IconButtonAnimate } from '../../../components/animate';
import {useSettings} from '../../../hooks'
import { LoadingButton } from '@mui/lab';
import moment from 'moment'


// ----------------------------------------------------------------------


export default function Experience({id}) {

    const router = useRouter()
    const currentPath = router.asPath
    const goToPath = () => router.push(`${currentPath}/update/experience`)
    const {expAction, setAlert, experience, user} = useSettings()

    const deleteExp = async (id) => {
      if (experience && experience?.length > 0) {
        await expAction.deleteExp({id, setAlert})
      }
    }
    

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Experience</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           { !experience || !experience?.length > 0 && 'list out all your working experiance here.'}
          </Typography>
          <Divider />

          {
            experience && experience?.length > 0 &&
            experience.map((exp, index) => (
              <>
              <Stack key= {index} direction= 'row' spacing= {1.5} alignItems= 'center'>

                <Link>
                <TextMaxLine line= {1}>
                <Typography variant="overline" sx= {{ fontWeight: 900 }}> { exp?.employer || "" } </Typography>
                </TextMaxLine>
                </Link>
                <TextMaxLine line= {1}>
                <Typography variant="body3" sx= {{ fontWeight: 900 }}> { exp?.role || "" } </Typography>
                </TextMaxLine>
                <Divider orientation="vertical" sx={{ height: 20 }} />
                <TextMaxLine line= {1}>
                <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>
                    { exp.startDate && moment(new Date(exp.startDate)).format("MMM Do YYYY") }
                    {' '} - {' '}
                    { exp.endDate ? moment(new Date(exp.startDate)).format("MMM Do YYYY") : 'current' }
                </Typography>
                </TextMaxLine>
              

              <Box flexGrow={1}>{''}</Box>

              <Box>
                <IconButtonAnimate color="inherit" onClick= {() => router.push(`/profile/update/experience/${exp._id}`)}>
                    <Iconify icon={edit} sx={{ width: 17, height: 17 }} />
                </IconButtonAnimate>
              </Box>
              <Divider orientation="vertical" sx={{ height: 20 }} />
              <Box>
                <IconButtonAnimate color="inherit" onClick= {() => deleteExp(exp._id)}>
                    <Iconify icon={deleteIcon} sx={{ color: 'red', width: 17, height: 17 }} />
                </IconButtonAnimate>
              </Box>

              </Stack>
              <TextField
                  label= 'Details'
                  fullWidth
                  name= 'details'
                  rows={2}
                  multiline
                  value= {exp?.details || ''}
                  type= 'text'
              />
              </>
            ))
          }

          {
            user && user.id == id &&
              <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
                <Button
                    sx= {{ maxWidth: '200px'}}
                    variant="outlined"
                    onClick= {goToPath}
                    >
                Add
                </Button>
              </Stack>
          }
        </Stack>

    </Paper>
  );
}



export function EditExperience ({exp}) {

    const isDesktop = useResponsive('up', 'md');
    const router = useRouter()
    const [form, setForm] = useState({
      employer: exp?.employer || '',
      startDate: exp?.startDate || '',
      endDate: exp?.endDate || '',
      details: exp?.details || '',
      active: exp?.active || '',
      role: exp?.role || ''
    })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const {expAction, setAlert} = useSettings()
    const [loading, setLoading] = useState(false)
    const close = () => router.back()
    const handleActive = () => {
        setForm({...form, active: !form.active, endDate: ''})
    }

    const handleSubmit = async () => {
        setLoading(true)
        if (exp && exp._id) {
          await expAction.update({form, setAlert, id: exp._id, close})
        }
        else {
          await expAction.create({ form, setAlert, close})
        }
        setLoading(false)
    }
  

    return (
        <Paper variant="outlined" sx={{ p: 1, m: !isDesktop ? 1 : 0, borderRadius: 1, bgcolor: 'background.default' }}>

        <Stack spacing={0.5} sx= {{ p: 1 }} >
          <Typography variant="button">Experience</Typography>
          <Divider />

          <Stack spacing={2} sx={{ pt: 1}} alignItems="flex-start">
            <TextField
                label= 'Employer'
                fullWidth
                name= 'employer'
                value= {form?.employer || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Role'
                fullWidth
                name= 'role'
                value= {form?.role || ''}
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
                value={form?.startDate || ''}
                onChange={(newValue) => {
                setForm({...form, startDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="End Date"
                value={form?.endDate || ''}
                disabled= {form?.active}
                onChange={(newValue) => {
                setForm({...form, endDate: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </Stack>

            <FormControlLabel control={<Checkbox onChange={handleActive} checked= {form?.active || ''} />} label="I still work here" />

            <TextField
                placeholder='Details about your activities with your employer.'
                fullWidth
                name= 'details'
                multiline
                value= {form.details || ''}
                rows={3}
                onChange= {getForm}
                type= 'text'
            />
          </Stack>
              
          <Divider />
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'space-between'>
          <Button
                sx= {{ maxWidth: '200px'}}
                variant="outlined"
                onClick= {() => router.back()}
                >
            Close
            </Button>
            <LoadingButton 
                variant="contained"
                sx={{ mt: 5, mb: 3, width: '200px' }}
                loadingPosition="start"
                loading= {loading}
                onClick= {handleSubmit}
            >
              {
                exp ? 
                loading ? 'saving changes...' : 'save changes' :
                loading ? 'adding...' : 'add'
              }
            
            </LoadingButton>
          </Stack>
        </Stack>

    </Paper>
    )
}