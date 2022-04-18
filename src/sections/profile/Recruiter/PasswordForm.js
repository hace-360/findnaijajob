import {Stack, Typography, Grid, Paper, Divider, Box, Avatar, TextField, FilledInput, InputAdornment} from '@mui/material'
import { LoadingButton } from '@mui/lab';




export default function PasswordForm () {

    return (
        <Paper variant= 'outlined' sx= {{p: 2}}>
        <Stack spacing= {2}>
            <TextField
                fullWidth
                label= 'Old Password'
            />

            <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                <TextField
                    fullWidth
                    label= 'New Password'
                />

                <TextField
                    fullWidth
                    label= 'Confirm Password'
                />
            </Stack>

            <Stack spacing= {2} direction= 'row' alignItems='center' justifyContent='space-between'>
                <span/>
                <LoadingButton 
                    variant="contained"
                    sx={{ mt: 5, mb: 3, width: '200px' }}
                    loadingPosition="start"
                >
                save changes
                </LoadingButton>
            </Stack>
        </Stack>
        </Paper>
    )
}