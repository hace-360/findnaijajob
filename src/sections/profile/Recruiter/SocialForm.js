import {Stack, Typography, Grid, Paper, Divider, Box, Avatar, TextField, FilledInput, InputAdornment} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import logoFacebook from '@iconify/icons-carbon/logo-facebook';
import logoTwitter from '@iconify/icons-carbon/logo-twitter';
import logoLinkedin from '@iconify/icons-carbon/logo-linkedin';
import logoInstagram from '@iconify/icons-carbon/logo-instagram';
import { Iconify } from '../../../components';
import {useState} from 'react'
import { useSettings } from '../../../hooks';



export default function ProfileForm () {

    const {userAction, user, setAlert} = useSettings()
    const [form, setForm] = useState({...user.social})
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await userAction.updateSocial({form, setAlert})

        return setLoading(false)
    }


    return (
        <Paper variant= 'outlined' sx= {{p: 2}}>
            <Stack spacing= {2}>
            <FilledInput
                placeholder="username"
                name= 'facebook'
                value= {form?.facebook || ''}
                onChange= {getForm}
                startAdornment={
                <InputAdornment position="start">
                    <Iconify icon={logoFacebook} sx={{ color: '#1877F2', width: 45, height: 45 }} />
                    <Typography variant= 'body3'>
                        https://www.facebook.com/
                    </Typography>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                bgcolor: 'common.grey',
                '& .MuiFilledInput-input': {
                    py: '18px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <FilledInput
                placeholder="username"
                name= 'twitter'
                value= {form?.twitter || ''}
                onChange= {getForm}
                startAdornment={
                <InputAdornment position="start">
                    <Iconify icon={logoTwitter} sx={{ color: '#1877F2', width: 45, height: 45 }} />
                    <Typography variant= 'body3'>
                        https://www.twitter.com/
                    </Typography>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                bgcolor: 'common.grey',
                '& .MuiFilledInput-input': {
                    py: '18px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <FilledInput
                placeholder="username"
                name= 'linkedin'
                value= {form?.linkedin || ''}
                onChange= {getForm}
                startAdornment={
                <InputAdornment position="start">
                    <Iconify icon={logoLinkedin} sx={{ color: '#1877F2', width: 45, height: 45 }} />
                    <Typography variant= 'body3'>
                        https://www.linkedin.com/
                    </Typography>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                bgcolor: 'common.grey',
                '& .MuiFilledInput-input': {
                    py: '18px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <FilledInput
                placeholder="username"
                name= 'instagram'
                value= {form?.instagram || ''}
                onChange= {getForm}
                startAdornment={
                <InputAdornment position="start">
                     <Iconify icon={logoInstagram} sx={{ width: 45, height: 45 }} />
                    <Typography variant= 'body3'>
                        https://www.instagram.com/
                    </Typography>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                bgcolor: 'common.grey',
                '& .MuiFilledInput-input': {
                    py: '18px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <Stack spacing= {2} direction= 'row' alignItems='center' justifyContent='space-between'>
                <span/>
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