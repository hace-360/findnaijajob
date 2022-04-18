import { Checkbox, Stack, Button, Typography,Paper, Divider, Grid } from '@mui/material';
import DownloadingIcon from '@mui/icons-material/Downloading';
import ArticleIcon from '@mui/icons-material/Article';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { useResponsive, useSettings } from '../../../hooks';
import {useRouter} from 'next/router'
import {useState} from 'react'
import axios from 'axios'
import { LoadingButton } from '@mui/lab';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



// ----------------------------------------------------------------------

export default function PricingPlan01Card () {
  const isDesktop = useResponsive('up', 'md')

  const {user, setAlert} = useSettings()
  const [subscription, setSubScription] = useState('monthly')
  const toggleSub = () => {
    return subscription == 'yearly' ? setSubScription('monthly') : setSubScription('yearly')
  }
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const completePayment = async () => {
    try {
      if (!user) {
        return router.push('account/login')
      }
      setLoading(true)
      let res = await axios.post('/payment/init', {email: user?.email, subscription})
      if (!res.data.success) throw new Error(res.data.message)
      res = res.data.data
      setAlert({message: 'redirecting to paystack...'})
      setTimeout(() => router.push(res.authorization_url), 1000)
      setLoading(false)
    }
    catch(err) {
      setLoading(false)
      return setAlert({message: err.message, type: 'error'})
    }
  }

  return (
    <Grid container spacing= { !isDesktop && 3} alignItems= 'center'>
      <Grid item xs= {12} md= {3.75}><PricingPlanLeft toggleSub= {toggleSub} subscription= {subscription} /></Grid>
      <Grid item xs= {12} md= {4.5}><PricingPlan handlePay = {completePayment} loading= {loading} /></Grid>
      <Grid item xs= {12} md= {3.75}><PricingPlanRight toggleSub= {toggleSub} subscription= {subscription} /></Grid>
    </Grid>
  )
}

function PricingPlan ({handlePay,loading}) {

  return (
    <Stack spacing= {1.5} >
    <Paper variant= 'elevation' elevation= {20} sx= {{py: 3, px:4, height: 400}}>
        <Typography variant= 'h4' sx= {{paddingBottom: 1}}>
          All subscription features
        </Typography>
        <Divider />

        <Stack spacing= {3} sx= {{py: 3}}>
        
        <Stack direction= 'row' alignItems='center' spacing= {2}>
          <DownloadingIcon color= 'primary' />
          <Typography variant= 'body3' sx= {{lineHeight: 1.3}}>
            Download & save in multiple formats
            <br />
            (PDF, Word, TXT)
          </Typography>
        </Stack>

        <Stack direction= 'row' alignItems='center' spacing= {2}>
          <ArticleIcon color= 'primary' />
          <Typography variant= 'body3' sx= {{lineHeight: 1.3}}>
            <strong>Cover Letter Builder</strong> <br/>
            Download a cover letter in multiple formats
          </Typography>
        </Stack>

        <Stack direction= 'row' alignItems='center' spacing= {2}>
          <PhoneIphoneIcon color= 'primary' />
          <Typography variant= 'body3' sx= {{lineHeight: 1.3}}>
            If you are unhappy for any reason during the 
            <br/> first 14 days, just let us know 
            <strong>– we'll refund your money.</strong> 
          </Typography>
        </Stack>

        <LoadingButton 
          fullWidth 
          size="large"
          variant="contained"
          sx= {{borderRadius: '25px'}}
          onClick= {handlePay}
          loading = {loading}
          loadingPosition="start"
          startIcon={ <ChevronRightIcon />}
        >
       {loading ? 'processing...' : 'continue'} 
      </LoadingButton>

        </Stack>
    </Paper>

    <Typography variant= 'body3' sx= {{lineHeight: 1.3, textAlign: 'center'}}>
      You may cancel by email or by calling us on <strong>091 338 163 00</strong>
    </Typography>
    </Stack>
  )
}

function PricingPlanLeft({toggleSub, subscription}) {

  const isDesktop = useResponsive('up', 'md')

  return (
    <Paper variant= 'outlined' sx= {{py: 3, px:4, width: '100%', borderRadius: isDesktop ?'10px 0 0 10px': '10px', height: 300}}>
        <Stack direction= 'row' alignItems= 'flex-start' spacing= {5}>
            <Checkbox onChange= {toggleSub} checked= {subscription == 'monthly'} size="small" />
            <Stack>
              <Typography variant= 'body3'>
                30 days full access
              </Typography>

              <Stack direction= 'row' alignItems= 'flex-start'>
                <Typography variant= 'h6' color= 'primary'>
                  ₦
                </Typography>
                <Typography variant= 'h3'>
                  1000
                </Typography>
                <Typography variant= 'h6'>
                  .00
                </Typography>
              </Stack>
            </Stack>
        </Stack>
        <Divider />

        <Stack component= 'ul' spacing= {1} sx= {{py: 1}} >
          {
            starterList.map((list, index) => (
              <Typography key= {index} component= 'li' sx= {{fontSize: '12px'}}>
                  {list}
              </Typography>
            ))
          }
        </Stack>
    </Paper>

  )
}

function PricingPlanRight({toggleSub, subscription}) {

  const isDesktop = useResponsive('up', 'md')

  return (
    <Paper variant= 'outlined' sx= {{py: 3, px:4, width: '100%', borderRadius: isDesktop ?' 0 10px 10px 0': '10px', height: 300}}>
        <Stack direction= 'row' alignItems= 'flex-start' spacing= {6}>
            
            <Stack>
              <Typography variant= 'body3'>
                Yearly access
              </Typography>

              <Stack direction= 'row' alignItems= 'flex-start'>
                <Typography variant= 'h6' color= 'primary'>
                  ₦
                </Typography>
                <Typography variant= 'h3'>
                  10,000
                </Typography>
                <Typography variant= 'h6'>
                  .00
                </Typography>
              </Stack>
            </Stack>

            <Checkbox onChange= {toggleSub} checked= {subscription == 'yearly'} size="small" />
        </Stack>
        <Divider />

        <Stack component= 'ul' spacing= {1} sx= {{py: 1}} >
          {
            registerdList.map((list, index) => (
              <Typography key= {index} component= 'li' sx= {{fontSize: '12px'}}>
                  {list}
              </Typography>
            ))
          }
        </Stack>
    </Paper>

  )
}


const starterList = [
  'Unlimited printing and downloading for 30 days',
  'Create unlimited additional CVs and cover letters',
  'After 30 days, auto-renews at ₦1,000:00 billed every 30 days',
  'Cancel at any time'
]

const registerdList = [
  'Full access to all features including cover letters',
  'Automatically renews each year, cancel at any time',
  'Pay ₦10, 000:00 up front and save 16.667%',
  'Pay once, use all year long'
]