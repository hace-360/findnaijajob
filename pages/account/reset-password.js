import { useState } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Link, TextField, Stack, InputAdornment, IconButton } from '@mui/material';
// routes
import Routes from '../../src/routes';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Image, Iconify } from '../../src/components';
import viewIcon from '@iconify/icons-carbon/view';
import viewOff from '@iconify/icons-carbon/view-off';
import axios from 'axios'
import {useSettings} from '../../src/hooks'
import chevronLeft from '@iconify/icons-carbon/chevron-left';
import { LoadingButton } from '@mui/lab';
import {useRouter} from 'next/router'
import PropTypes from 'prop-types'


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: theme.spacing(15, 2.5),
  [theme.breakpoints.up('sm')]: {
    height: '100vh',
  },
}));

// ----------------------------------------------------------------------

export default function ResetPasswordPage() {

  const router = useRouter()
  const {setAlert} = useSettings()
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({token: '', email: '', password: ''})
  const [loading, setLoading] = useState(false)
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
  const restForm = () => {
    setForm({token: '', email: '', password: ''})
    setSent(false)
  }

  const getToken = async () => {
    try {
      setLoading(true)
      const token = await axios.post('/account/reset-password', {email: form.email})
      if (token && !token.data.success) throw new Error(token.data.message)
      setAlert({message: token.data.message})
      setLoading(false)
      return setSent(true)
    }
    catch(err) {
      setLoading(false)
      return setAlert({message: err.message, type: 'error'})
    }
  }

  const resetPassword = async () => {
    try {
      setLoading(true)
      // validate token
      const res = await axios.post('/account/reset-password/verify', form)
      if (res && !res.data.success) throw new Error(res.data.message)
      setAlert({message: res.data.message})
      setLoading(false)
      return router.push('/account/login')
    }
    catch(err) {
      setLoading(false)
      return setAlert({message: err.message, type: 'error'})
    }
  }

  return (
    <Page title="Reset Password">
      <RootStyle>
        <Box sx={{ maxWidth: 480 }}>
          {
            sent ? 
            <VerifyCode setForm= {setForm} form= {form} loading= {loading} getForm= {getForm} resetPassword= {resetPassword} restForm= {restForm} /> :
            <ResetForm form= {form} setForm= {setForm} getForm= {getForm} getToken= {getToken} loading= {loading} />
          }
        </Box>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------


ResetPasswordPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};


// Reset form
function ResetForm ({loading, form, getForm, getToken}) {

  return (
    <>
        <Image
          alt="reset password"
          src="https://zone-assets-api.vercel.app/assets/icons/ic_lock_password.svg"
          sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
        />

        <Typography variant="h3" paragraph>
          Forgot Your Password?
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 5 }}>
          Please enter the email address associated with your account and We will email you a
          link to reset your password.
        </Typography>

        <Stack spacing= {2}>

        <TextField
            fullWidth
            label="Email address"
            name= 'email'
            value= {form?.email}
            onChange= {getForm}
          />

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          onClick= {getToken}
          variant="contained"
          loading={loading}
        >
          Reset Password
        </LoadingButton>

        </Stack>

      </>
  )
}

// verify Password
function VerifyCode ({setForm, form, getForm, restForm, resetPassword, loading}) {

  const [showPass, setShowPass] = useState(false)
  const handleShowPass = () => setShowPass( v => !v)
  const [token, setToken] = useState([])
  const getTokenForm = (e) => setForm({...form, token: [...form?.token, e.target.value]})

  return (
    <>
      <NextLink href={Routes.login}>
          <Button
            color="inherit"
            startIcon={<Iconify icon={chevronLeft} sx={{ width: 16, height: 16 }} />}
            sx={{
              zIndex: 9,
              position: 'absolute',
              top: { xs: 80, sm: 120 },
              left: { xs: 8, sm: 24 },
            }}
          >
            Back
          </Button>
        </NextLink>

        <Box sx={{ maxWidth: 480 }}>
          <Image
            alt="email inbox"
            src="https://zone-assets-api.vercel.app/assets/icons/ic_email_inbox.svg"
            sx={{ mb: 5, width: 96, height: 96, mx: 'auto' }}
          />

          <Typography variant="h3" paragraph>
            Check Your Email
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} paragraph>
            We have emailed a 6-digit confirmation code to { form.email }, please enter the code in
            below box and your new Password to reset your Password.
          </Typography>

      <Stack spacing= {2}>
      <Stack direction= 'row' alignItems= 'center' spacing= {2}>
            <TextField
            label= 'TOKEN'
              name= 'token'
              placeholder="1 2 3 4 5 6"
              value= {form?.token}
              onChange= {getForm}
              sx= {{
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            />

            <TextField
                fullWidth
                label= 'New Password'
                name= 'password'
                value= {form?.password || ''}
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
      </Stack>
          

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              onClick= {resetPassword}
              variant="contained"
              loading={loading}
            >
              Verify
            </LoadingButton>
          </Stack>

          <Typography variant="body2" align="center" sx= {{my: 2}}>
            Don’t have a code? {''}
            <Link variant="subtitle2" underline="none" onClick={restForm}>
              Resend code
            </Link>
          </Typography>
        </Box>
    </>
  )
}