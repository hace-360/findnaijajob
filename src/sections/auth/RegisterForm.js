import { useState, useEffect } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
// @mui
import { LoadingButton } from '@mui/lab';
import { Typography, Stack, Link, TextField, IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
// components
import { Iconify } from '../../components';
import {useSettings} from '../../hooks'

// ----------------------------------------------------------------------

export default function RegisterForm() {
  const [form, setForm] = useState({email: '', password: '', name: '', accountType: ''})
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const [showPassword, setShowPassword] = useState(false);
  const {userAction, setAlert} = useSettings()
  const [loading, setLoading] = useState(false)


  const handleShowPassword = () => setShowPassword(!showPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    await userAction.doSignup({data: form, setAlert})
    setLoading(false)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2.5}>
          <TextField
            name= 'name'
            value= {form.name}
            fullWidth
            label="Full Name"
            onChange= {getForm}
          />

          <TextField 
            name= 'email'
            value= {form.email}
            fullWidth
            label="Email address"
            onChange= {getForm}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value= {form.password}
            onChange= {getForm}
            name= 'password'
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Iconify icon={showPassword ? viewIcon : viewOff} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Account type</InputLabel>
            <Select
            name= 'accountType'
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Account type"
              value= {form.accountType}
              onChange= {getForm}
            >
              <MenuItem value= 'applicant'>applicant</MenuItem>
              <MenuItem value= 'recruiter'>recruiter</MenuItem>
            </Select>
          </FormControl>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={loading}
        >
          create account
        </LoadingButton>

        <Typography variant="caption" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
          I agree to
          <Link color="text.primary" href="#">
            {''} Terms of Service {''}
          </Link>
          and
          <Link color="text.primary" href="#">
            {''} Privacy Policy.
          </Link>
        </Typography>
      </Stack>
    </form>
  );
}
