import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Paper,Button,Divider, TextField, Box, FormGroup, Checkbox, FormControlLabel, Link} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useResponsive } from '../../../hooks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useRouter} from 'next/router'
import {useState} from 'react'
import { Iconify } from '../../../components';
import edit from '@iconify/icons-carbon/edit';
import deleteIcon from '@iconify/icons-carbon/delete';
import { IconButtonAnimate } from '../../../components/animate';
import {useSettings} from '../../../hooks'
import { LoadingButton } from '@mui/lab';
import moment from 'moment'


// ----------------------------------------------------------------------


export default function Certificates({id}) {

    const router = useRouter()
    const currentPath = router.asPath
    const goToPath = () => router.push(`${currentPath}/update/certificate`)
    const {certAction, setAlert, certificate, user} = useSettings()

    const deleteCert = async (id) => {
      if (certificate && certificate?.length > 0) {
        await certAction.deleteCert({id, setAlert})
      }
    }
    

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Certificates & Awards</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
           { !certificate || !certificate?.length > 0 && 'Received any certificates or awards? Show them off to help enrich your career profile.'}
          </Typography>
          <Divider />

          {
            certificate && certificate?.length > 0 &&
            certificate.map((cert, index) => (
              <>
              <Stack key= {index} direction= 'row' spacing= {1.5} alignItems= 'center'>

                <Link><Typography variant="overline" sx= {{ fontWeight: 900 }}> { cert?.authority || "" } </Typography></Link>
                <Typography variant="body3" sx= {{ fontWeight: 900 }}> { cert?.name || "" } </Typography>
                <Divider orientation="vertical" sx={{ height: 20 }} />
                <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>
                  { cert?.date && moment(new Date(cert.date)).format("MMMM Do YYYY") }
                </Typography>
              

              <Box flexGrow={1}>{''}</Box>

              <Box>
                <IconButtonAnimate color="inherit" onClick= {() => router.push(`/profile/update/certificate/${cert._id}`)}>
                    <Iconify icon={edit} sx={{ width: 17, height: 17 }} />
                </IconButtonAnimate>
              </Box>
              <Divider orientation="vertical" sx={{ height: 20 }} />
              <Box>
                <IconButtonAnimate color="inherit" onClick= {() => deleteCert(cert._id)}>
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
                  value= {cert?.details || ''}
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



export function EditCertificates ({cert}) {

    const isDesktop = useResponsive('up', 'md');
    const router = useRouter()
    const [form, setForm] = useState({
      name: cert?.name || '',
      date: cert?.date || '',
      authority: cert?.authority || '',
      details: cert?.details || '',
    })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const {certAction, setAlert} = useSettings()
    const [loading, setLoading] = useState(false)
    const close = () => router.back()

    const handleSubmit = async () => {
        setLoading(true)
        if (cert && cert._id) {
          await certAction.update({form, setAlert, id: cert._id, close})
        }
        else {
          await certAction.create({ form, setAlert, close})
        }
        setLoading(false)
    }
  

    return (
        <Paper variant="outlined" sx={{ p: 1, m: !isDesktop ? 1 : 0, borderRadius: 1, bgcolor: 'background.default' }}>

        <Stack spacing={0.5} sx= {{ p: 1 }} >
          <Typography variant="button">Certificates & Awards</Typography>
          <Divider />

          <Stack spacing={2} sx={{ pt: 1}} alignItems="flex-start">
            <TextField
                label= 'Name'
                fullWidth
                name= 'name'
                value= {form?.name || ''}
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
                value= {form?.authority || ''}
                onChange= {getForm}
                type= 'text'
            />

            <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label="Date"
                value={form?.date || ''}
                onChange={(newValue) => {
                setForm({...form, date: newValue});
                }}
                renderInput={(params) => <TextField {...params} />}
            />
            </LocalizationProvider>
            </Stack>
            <TextField
                label= 'Details'
                fullWidth
                name= 'details'
                rows={3}
                multiline
                value= {form?.details || ''}
                onChange= {getForm}
                type= 'text'
            />
          </Stack>

          {/* <Stack spacing={2.5} alignItems="flex-end"> */}
        {/* <Box 
          sx= {{
            width: '100%',
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            gap: '20px'
          }}
        >
        <TextField
              type= 'text'
              required
              fullWidth
              name= 'name'
              label="Title"
              onChange= {getForm}
              value= {form.name|| ''}
              sx= {{ marginBottom: !isDesktop && '20px' }}
            />

        <TextField
              type= 'text'
              required
              fullWidth
              name= 'type'
              label="Type"
              onChange= {getForm}
              value= {form.type || ''}
            />
        </Box>

        <Box 
          sx= {{
            width: '100%',
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            gap: '20px'
          }}
        >

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
              label="Year recieved"
              value={form.date}
              name= 'dateOfBirth'
              onChange={value => setForm({...form, start_date: value})}
              renderInput={(params) =>( 
              <TextField 
                  {...params}
                  required
                  sx= {{ marginBottom: !isDesktop && '20px' }}
              />
              )}
          />
          </LocalizationProvider>
        </Box> */}

      {/* </Stack> */}
              
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
                cert ? 
                loading ? 'saving changes...' : 'save changes' :
                loading ? 'adding...' : 'add'
              }
            
            </LoadingButton>
          </Stack>
        </Stack>

    </Paper>
    )
}