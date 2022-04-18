import {Stack, Paper, TextField, IconButton, InputAdornment} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import {useSettings, useResponsive} from '../../../hooks'
import {useState} from 'react'
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
import { Iconify } from '../../../components';



export default function PasswordForm () {

    const isDesktop = useResponsive('up', "md")
    const {userAction, setAlert} = useSettings()
    const [form, setForm] = useState({})
    const [showPass, setShowPass] = useState(false)
    const handleShowPass = () => setShowPass(!showPass)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await userAction.updatePassword({form, setAlert, setForm})

        return setLoading(false)
    }

    return (
        <Paper variant= 'outlined' sx= {{p: 2}}>
        <Stack spacing= {2}>
            <TextField
                fullWidth
                label= 'Old Password'
                name= 'oldPassword'
                value= {form?.oldPassword || ''}
                onChange= {getForm}
                type={showPass ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={handleShowPass} edge="end">
                        <Iconify icon={showPass ? viewIcon : viewOff} />
                        </IconButton>
                    </InputAdornment>
                    ),
                }}
            />

            <Stack spacing= {2} direction= { isDesktop ? 'row' : 'column'} alignItems= 'center'>
                <TextField
                    fullWidth
                    label= 'New Password'
                    name= 'newPassword'
                    type={showPass ? 'text' : 'password'}
                    value= {form?.newPassword || ''}
                    onChange= {getForm}
                />

                <TextField
                    fullWidth
                    label= 'Confirm Password'
                    name= 'confirmPassword'
                    type={showPass ? 'text' : 'password'}
                    value= {form?.confirmPassword || ''}
                    onChange= {getForm}
                />
            </Stack>

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