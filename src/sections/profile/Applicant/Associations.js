import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Paper,Button,Divider, TextField, Box } from '@mui/material';
import {useRouter} from 'next/router'
import { Iconify } from '../../../components';
import edit from '@iconify/icons-carbon/edit';
import deleteIcon from '@iconify/icons-carbon/delete';
import { useResponsive, useSettings } from '../../../hooks';
import { IconButtonAnimate } from '../../../components/animate';
import {useState} from 'react'
import { LoadingButton } from '@mui/lab';




// ----------------------------------------------------------------------


export default function Associations({id}) {

    const router = useRouter()
    const currentPath = router.asPath
    const goToPath = () => router.push(`${currentPath}/update/association`)
    const {association, associationAction, setAlert, user} = useSettings()

    const deleteAss = async (id) => {
      if (association && association?.length > 0) {
        await associationAction.deleteAss({id, setAlert})
      }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Associations</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            Part of a professional association or organization? Add them to help enrich your professional profile.
          </Typography>

          {
            association && association?.length > 0 &&
                association.map((ass, index) => (
                  <Stack key= {index} direction= 'row' spacing= {1.5} alignItems= 'center'>

                <Typography variant="overline" sx= {{ fontWeight: 900 }}> {ass?.name || ''} </Typography>
                <Divider orientation="vertical" sx={{ height: 20 }} />
                <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}> {ass?.role || ''} </Typography>


                <Box flexGrow={1}>{''}</Box>

                <Box>
                  <IconButtonAnimate color="inherit" onClick= {() => router.push(`/profile/update/association/${ass._id}`)}>
                      <Iconify icon={edit} sx={{ width: 17, height: 17 }} />
                  </IconButtonAnimate>
                </Box>
                <Divider orientation="vertical" sx={{ height: 20 }} />
                <Box>
                  <IconButtonAnimate color="inherit" onClick= {() => deleteAss(ass._id)} >
                      <Iconify icon={deleteIcon} sx={{ color: 'red', width: 17, height: 17 }} />
                  </IconButtonAnimate>
                </Box>

                </Stack>
                ))
          }

          
          {user && user.id == id &&
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'space-between'>
            <span>{}</span>
            <Button
                sx= {{ maxWidth: '200px'}}
                variant="outlined"
                onClick= {goToPath}
                >
            Add
            </Button>
          </Stack>}
        </Stack>

    </Paper>
  );
}

export function EditAssociations ({ass}) {

    const isDesktop = useResponsive('up', 'md');
    const router = useRouter()
    const [form, setForm] = useState({
      role: ass?.role || '',
      name: ass?.name
    })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const {associationAction, setAlert} = useSettings()
    const [loading, setLoading] = useState(false)

    const close = () => router.back()

    const handleSubmit = async () => {
        setLoading(true)
        if (ass && ass._id) {
          await associationAction.update({form, setAlert, id: ass._id, close})
        }
        else {
          await associationAction.create({ form, setAlert, close})
        }
        setLoading(false)
    }

    return (
        <Paper variant="outlined" sx={{ p: 1, m: !isDesktop ? 1 : 0, borderRadius: 1, bgcolor: 'background.default' }}>

        <Stack spacing={0.5} minWidth={'100%'} sx= {{ p: 1 }} >
          <Typography variant="button">Association - </Typography>
          <Divider />

          <Stack spacing={1} direction={isDesktop ? 'row' : 'column'} >
            <TextField
                fullWidth
                label= 'Association'
                name= 'name'
                value= {form?.name || ''}
                onChange= {getForm}
                placeholder= 'e.g. CPA'
            />
            <TextField
                fullWidth
                label= 'Role'
                name= 'role'
                value= {form?.role || ''}
                onChange= {getForm}
                placeholder= 'e.g. Secretary'
            />
          </Stack>
              
          <Divider />
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'space-between'>
          <Button
                sx= {{ maxWidth: '200px'}}
                variant="outlined"
                onClick= {() => router.back()}
                >
            Cancel
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