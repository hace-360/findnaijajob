// @mui
import {
  Grid,
  Link,
  Stack,
  Button,
  Divider,
  Container,
  Typography,
  FilledInput,
  InputAdornment,
} from '@mui/material';
// components
import {AppStoreButton } from '../../components';
import {useState} from 'react'
import axios from 'axios'
import {useSettings} from '../../hooks'
import useSWR, {mutate} from 'swr'

// ----------------------------------------------------------------------

export default function Footer() {

  const {setAlert} = useSettings()
  const [form, setForm] = useState({email: ''})
  const {data: subscribed, error: subError} = useSWR('/subscribe', {revalidateOnFocus: true})


  const handleSub = async () => {
    const res = await axios.post('/subscribe', form)
    mutate('/subscribe')
    setAlert({message: res.data.message})
  }


  return (
    <>
      <Divider />
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid item xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>

              {
                subscribed == null &&
                <Stack spacing={2}>
                  <Stack spacing={1}>
                    <Typography variant="h6">Let’s stay in touch</Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Subscribe to our newsletter to receive latest articles to your inbox weekly.
                    </Typography>
                  </Stack>
                  <FilledInput
                  onChange= {(e) => setForm({email: e.target.value})}
                    placeholder="Email address"
                    endAdornment={
                      <InputAdornment position="end">
                        <Button onClick={handleSub} variant="contained" size="small" sx={{ py: '9px' }}>
                          Subscribe
                        </Button>
                      </InputAdornment>
                    }
                    sx={{
                      pr: 0.5,
                      '& .MuiFilledInput-input': { py: '14px' },
                    }}
                  />
              </Stack>
              }

              <Stack spacing={2}>
                <Typography variant="h6">Apps</Typography>
                <AppStoreButton />
              </Stack>
            </Stack>
          </Grid>

        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            © 2021. All rights reserved
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="body3" sx={{ color: 'text.secondary' }}>
              Help Center
            </Link>
            <Link variant="body3" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
