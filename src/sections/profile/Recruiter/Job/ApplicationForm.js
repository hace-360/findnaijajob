import {Stack, Typography, Grid, Paper, Divider, Box, Avatar, TextField, FilledInput, InputAdornment, Button, Container, Input} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import {useState} from 'react'
import { useSettings } from '../../../../hooks';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import {GetSinglePdf} from '../../../../hooks/getImages'
import {useRouter} from 'next/router'


export default function ApllicationForm ({jobId}) {


    const router = useRouter()
    const {user, applicationAction, setAlert} = useSettings()
    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        coverLetter: user?.about || '',
        name: user?.name || '',
        email: user?.email || '',
        title: user?.title || '',
        jobId: router?.query?.id || '',
        cv: ''
    })
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getPdf = async (e) => {
        const pdf = await GetSinglePdf(e)
        if (pdf.success && pdf.data) {
            setForm({...form, cv: pdf.data})
        }
    }

    const close = () => router.back()
    const handleSubmit = async (jobId) => {
        setLoading(true)
        await applicationAction.create({form, setAlert, close, jobId})
        setLoading(false)
    }


    return (

        <Stack
            spacing= {2}
            sx= {{width: '100%', py: 4, px: 1}}
        >
         <Typography variant= 'overline' color= 'primary' gutterBottom>
            Application Form
          </Typography>
          <Stack spacing= {2} direction= 'row' alignItems= 'center'>
            <TextField
                fullWidth
                value= {form?.name || ''}
                disabled
                name= 'name'
                label= 'Full Name'
            />

            <TextField
                fullWidth
                value= {form?.title || ''}
                disabled
                name= 'title'
                label= 'Professional Title'
            />
          </Stack>

          <Stack spacing= {2} direction= 'row' alignItems= 'center'>
            <TextField
                fullWidth
                value= {form?.email || ''}
                disabled
                name= 'email'
                label= 'Email'
            />

            <TextField
                fullWidth
                value= {`${user?.address?.state || ''}, ${user?.address?.country || ''}`}
                name= 'location'
                disabled
                label= 'location'
            />
          </Stack>

          {/* <Stack>
            <label htmlFor="cv-button-file">
                <input
                    style= {{display: 'none'}} 
                    accept="application/pdf,application/vnd.ms-excel"
                    id="cv-button-file"
                    onChange= {getPdf}
                    type="file"
                />
                <Button 
                    onChange={getPdf}
                    startIcon= {<AttachFileIcon />}
                    variant= {form?.cv ? 'contained' : "outlined"}
                    color= {form?.cv ? "secondary" : 'primary'} 
                    component="span"
                    sx= {{textTransform: 'none'}}
                >
                    <Typography variant= 'body3'>
                        { form?.cv && form?.cv?.name ? `${form?.cv?.name} - change cv` : 'Attach cv' }
                    </Typography>
                </Button>
            </label>
          </Stack> */}


            <TextField
                fullWidth
                multiline
                rows={6}
                value= {form?.coverLetter || ''}
                onChange= {getForm}
                name= 'coverLetter'
                label= 'Cover Letter'
            />

            <Stack onClick= {() => router.back()} spacing= {2} direction= 'row' alignItems='center' justifyContent='space-between'>
                <Button variant= 'outlined'>
                    Cancel
                </Button>

                <LoadingButton 
                    variant="contained"
                    loadingPosition="start"
                    loading= {loading}
                    onClick= {handleSubmit}
                >
                {loading ? 'sending application...' : 'send application'}
                </LoadingButton>
            </Stack>
        </Stack>
    )
}


