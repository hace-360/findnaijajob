import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Paper,Button,Divider, TextField} from '@mui/material';
import { useResponsive } from '../../../hooks';
import {useRouter} from 'next/router'
import {useState} from 'react'
import {useSettings} from '../../../hooks'
import { LoadingButton } from '@mui/lab';


// ----------------------------------------------------------------------


export default function CoverLetter({id}) {

    const router = useRouter()
    const currentPath = router.asPath
    const goToPath = () => router.push(`${currentPath}/update/cover`)
    const {user} = useSettings()

    

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="h6">Cover Letter</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            {
              user?.coverLetter ? 
              user.coverLetter :
               'Highlight your experience, skills and areas of expertise, as well as what you could bring to the company and what makes you the best candidate for the job.'
            }
            
          </Typography>


          {user && user.id == id &&
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
            <Button
                sx= {{ maxWidth: '200px'}}
                variant="outlined"
                onClick= {goToPath}
                >
            Update
            </Button>
          </Stack>
          }
        </Stack>

    </Paper>
  );
}

export function EditCoverLetter () {

    const isDesktop = useResponsive('up', 'md');
    const router = useRouter()
    const {userAction, user, setAlert} = useSettings()
    const [form, setForm] = useState({coverLetter: user.coverLetter})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [loading, setLoading] = useState(false)
    const close = () => router.back()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await userAction.updateCover({form, setAlert, close})

        return setLoading(false)
    }
 

    return (
        <Paper variant="outlined" sx={{ p: 1, m: !isDesktop ? 1 : 0, borderRadius: 1, bgcolor: 'background.default' }}>

        <Stack spacing={0.5} maxWidth={isDesktop ? '700px' : '100%'} sx= {{ p: 1 }} >
          <Typography variant="button">Cover Letter</Typography>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            Highlight your experience, skills and areas of expertise, as well as what you could bring to the company and what makes you the best candidate for the job.
          </Typography>
          <Divider />

         </Stack>

          <TextField
            fullWidth
            multiline
            rows={4}
            value= {form?.coverLetter || ''}
            onChange= {getForm}
            name= 'coverLetter'
            label= 'Cover Letter'
          />
              
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
            {loading ? 'saving changes...' : 'save changes'}
            </LoadingButton>
          </Stack>

    </Paper>
    )
}