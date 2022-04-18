// icons
import securityIcon from '@iconify/icons-carbon/security';
// @mui
import { styled } from '@mui/material/styles';
import { Switch, Divider, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import { Label, Iconify } from '../../components';
import { useSettings } from '../../hooks';
import { useRouter } from 'next/router';
import axios from 'axios'
import SaveIcon from '@mui/icons-material/Save';
import {useState} from 'react'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    height: '100%',
    padding: theme.spacing(5, 4),
    borderLeft: `dashed 1px ${theme.palette.divider}`,
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutSummary({form}) {

  const {user, setAlert} = useSettings()
  const [pay, setPay] = useState(false)
  const router = useRouter()
  const completePayment = async () => {
    try {
      setPay(true)
      let res = await axios.post('/payment/init', {email: user.email, amount: form.amount})
      if (!res.data.success) throw new Error(res.data.message)
      res = res.data.data
      setAlert({message: 'redirecting to paystack...'})
      setTimeout(() => router.push(res.authorization_url), 1000)
      setPay(false)
    }
    catch(err) {
      setPay(false)
      return setAlert({message: err.message, type: 'error'})
    }
  }


  return (
    <RootStyle>
      <Typography variant="h5" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>

        <Stack direction="row" justifyContent="space-between" alignItems= 'center'>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            credit
          </Typography>
          <Typography variant="body3">{form.credit || '0'} / fnc</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Total Billed</Typography>
          <Typography variant="h6">₦{form.amount || '0'}:00</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed', mb: 1 }} />
      </Stack>

      <Typography
        variant="caption"
        sx={{
          mt: 1,
          display: 'block',
          textAlign: 'right',
          color: 'text.secondary',
        }}
      >
        * Plus applicable taxes
      </Typography>

      <LoadingButton 
        fullWidth size="large"
        variant="contained"
        sx={{ mt: 5, mb: 3 }}
        onClick= {completePayment}
        loading = {pay}
        loadingPosition="start"
        startIcon={ pay && <SaveIcon />}
      >
       {pay ? 'processing...' : 'checkout'} 
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={securityIcon} sx={{ width: 24, height: 24, color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>
        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </RootStyle>
  );
}
