import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Paper,Button,Divider, TextField, Box, FormGroup, Checkbox, FormControlLabel, Link, Autocomplete} from '@mui/material';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { useResponsive, useSettings } from '../../../hooks';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {useRouter} from 'next/router'
import {useState} from 'react'
import { Iconify, TextMaxLine } from '../../../components';
import edit from '@iconify/icons-carbon/edit';
import deleteIcon from '@iconify/icons-carbon/delete';
import { IconButtonAnimate } from '../../../components/animate';
import { LoadingButton } from '@mui/lab';
import moment from 'moment'


// ----------------------------------------------------------------------


export default function Education({id}) {


    const router = useRouter()
    const currentPath = router.asPath
    const goToPath = () => router.push(`${currentPath}/update/education`)
    const {educationAction, setAlert, education, user} = useSettings()

    const deleteEdu = async (id) => {
      if (education && education?.length > 0) {
        await educationAction.deleteEdu({id, setAlert})
      }
    }
    

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Education</Typography>
          {
            !education || !education?.length > 0 &&
            <>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              List your qualifications here.
            </Typography>
            </>

          }

          <Stack spacing= {2}>
            {
              education && education?.length > 0 && 
              education.map((edu, index) => (

              <Stack 
                key= {index} 
                direction= 'row' 
                spacing= {1.5} 
                alignItems= 'center'
                // divider= {<Divider orientation= 'vertical' flexItem />}
              >
                  <Link>
                  <TextMaxLine line= {1}>
                    <Typography variant="overline" sx= {{ fontWeight: 900 }}>
                        {edu.institution}
                    </Typography>
                    </TextMaxLine>
                  </Link>

                  <TextMaxLine line= {1}>
                    <Typography variant="body3" sx= {{ textTransform: 'lowercase' }}>
                        {edu.major}
                    </Typography>
                  </TextMaxLine>

                  <TextMaxLine line= {1}>
                    <Typography variant="body3" sx= {{ textTransform: 'uppercase' }}>
                        {edu.qualification}
                    </Typography>
                  </TextMaxLine>
                    
                  <TextMaxLine line= {1}>
                    <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>
                        { edu.startDate && moment(new Date(edu.startDate)).format("MMM Do YYYY") }
                        {' '} - {' '}
                        { edu.endDate ? moment(new Date(edu.startDate)).format("MMM Do YYYY") : 'current' }
                    </Typography>
                    </TextMaxLine>

                    <Box flexGrow={1}>{''}</Box>

                    <Box>
                      <IconButtonAnimate color="inherit" onClick= {() => router.push(`/profile/update/education/${edu._id}`)}>
                          <Iconify icon={edit} sx={{ width: 17, height: 17 }} />
                      </IconButtonAnimate>
                    </Box>
                    <Divider orientation="vertical" sx={{ height: 20 }} />
                    <Box>
                      <IconButtonAnimate color="inherit" onClick= {() => deleteEdu(edu._id)} >
                          <Iconify icon={deleteIcon} sx={{ color: 'red', width: 17, height: 17 }} />
                      </IconButtonAnimate>
                    </Box>
                    <Divider flexItem />
              </Stack>
              ))
            }

          </Stack>
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



export function EditEducation ({edu}) {

    const isDesktop = useResponsive('up', 'md');
    const router = useRouter()
    const [form, setForm] = useState({
      major: edu?.major || '',
      startDate: edu?.startDate,
      endDate: edu?.endDate,
      institution: edu?.institution,
      qualification: edu?.qualification,
      active: edu?.active
    })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const {educationAction, setAlert} = useSettings()
    const [loading, setLoading] = useState(false)
    const handleActive = () => {
      setForm({...form, active: !form.active, endDate: ''})
    }
    const close = () => router.back()

    const handleSubmit = async () => {
        setLoading(true)
        if (edu && edu._id) {
          await educationAction.update({form, setAlert, id: edu._id, close})
        }
        else {
          await educationAction.create({ form, setAlert, close})
        }
        setLoading(false)
    }

    return (
        <Paper variant="outlined" sx={{ p: 1, m: !isDesktop ? 1 : 0, borderRadius: 1, bgcolor: 'background.default' }}>

        <Stack spacing={0.5} minWidth={isDesktop ? '100%' : '100%'} sx= {{ p: 1 }} >
          <Typography variant="button">Education</Typography>
          <Divider />

          <Stack spacing={2.5} alignItems="flex-end">

          <TextField
              type= 'text'
              required
              fullWidth
              name= 'institution'
              label="Name of Educational Institution/School"
              onChange= {getForm}
              value= {form.institution|| ''}
              sx= {{ marginBottom: !isDesktop && '20px' }}
            />

        <Box 
          sx= {{
            width: '100%',
            display: 'flex',
            flexDirection: isDesktop ? 'row' : 'column',
            gap: '20px'
          }}
        >
        <TextField
              type= 'text'
              fullWidth
              name= 'major'
              label="Major"
              onChange= {getForm}
              value= {form.major|| ''}
              sx= {{ marginBottom: !isDesktop && '20px' }}
            />

            <Autocomplete
                disablePortal
                fullWidth
                id="combo-box-edu"
                name= 'qualification'
                onChange={(event, value) => setForm({...form, qualification: value})}
                options={qualification}
                value= {form?.qualification || ''}
                renderInput={(params) => 
                  <TextField 
                     fullWidth
                     {...params} 
                     label="Qualification"
                  />}
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
              label="Start date"
              value={form?.startDate || ''}
              name= 'startDate'
              onChange={value => setForm({...form, startDate: value})}
              renderInput={(params) =>( 
              <TextField 
                  {...params}
                  fullWidth
                  required
                  sx= {{ marginBottom: !isDesktop && '20px' }}
              />
              )}
          />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
              label="End date"
              value={form?.endDate || ''}
              name= 'endDate'
              disabled= {form.active}
              onChange={value => setForm({...form, endDate: value})}
              renderInput={(params) =>( 
              <TextField 
                  {...params}
                  fullWidth
                  required
                  sx= {{ marginBottom: !isDesktop && '20px' }}
              />
              )}
          />
          </LocalizationProvider>

        </Box>

        <FormGroup fullWidth sx= {{ paddingLeft: isDesktop && '20px' }}>
            <FormControlLabel control={<Checkbox checked= {form.active} value={form.active} onChange={handleActive} />} label="I still study here" />
        </FormGroup>

      </Stack>
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
            {loading ? 'saving changes...' : 'save changes'}
            </LoadingButton>
          </Stack>
        </Stack>

    </Paper>
    )
}

const qualification= [
  'Phd',
  'MSc',
  'BSc',
  'HND',
  'OND',
  'SSCE',
  'Primary',
  'None'
]