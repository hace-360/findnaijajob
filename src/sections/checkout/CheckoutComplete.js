import PropTypes from 'prop-types';
// icons
import emailIcon from '@iconify/icons-carbon/email';
import userIcon from '@iconify/icons-carbon/user';
import packageIcon from '@iconify/icons-carbon/package';
import receiptIcon from '@iconify/icons-carbon/receipt';
import calendarIcon from '@iconify/icons-carbon/calendar';
import purchaseIcon from '@iconify/icons-carbon/purchase';
import chevronLeft from '@iconify/icons-carbon/chevron-left';
import moneyIcon from '@iconify/icons-carbon/money';
import invoiceIcon from '@iconify/icons-carbon/inventory-management';
// next
import NextLink from 'next/link';
// @mui
import { Typography, Stack, Avatar, Divider, Button } from '@mui/material';
// @utils
import { fDate } from '../../utils/formatTime';
import { fCurrency } from '../../utils/formatNumber';
// components
import { RatingLabel, TextIconLabel, Iconify, LoadingScreen, ErrorScreen } from '../../components';
import { useResponsive } from '../../hooks';
import {useRouter} from 'next/router'
import {useState, useEffect, useRef} from 'react'
import useSWR from 'swr'
import html2canvas from 'html2canvas'
import { LoadingButton } from '@mui/lab';
import {format} from 'currency-formatter'
import jsPDF from 'jspdf'




// ----------------------------------------------------------------------

TravelCheckOutCompleteInfo.propTypes = {
  tour: PropTypes.shape({
    price: PropTypes.number,
    ratings: PropTypes.number,
    reviews: PropTypes.number,
    slug: PropTypes.string,
    tourGuide: PropTypes.shape({
      name: PropTypes.string,
      picture: PropTypes.string,
    }),
  }),
};

export default function TravelCheckOutCompleteInfo({ user }) {

  const isDesktop = useResponsive('up', 'md')
  const router = useRouter()
  const componentRef = useRef();
  const invoiceNumber = router.asPath.split('=')[1]
  const {data: invoice, error} = useSWR(() => invoiceNumber ? `/subscription/${invoiceNumber}` : '', {revalidateOnFocus: true, initialData: null})
  const [loading, setLoading] = useState(false)
    const handleDownload = async () => {
        setLoading(true)

            const canvas = await html2canvas(componentRef.current)
            // const imageWidth = canvas.getAttribute('width')
            // const imageHeight = canvas.getAttribute('height')

            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'px',
                format: 'a4',
                putOnlyUsedFonts:true,
                compress: true
            })
            // const {pageContext: { mediaBox: {topRightX: width} }} = pdf.getCurrentPageInfo()
            // const x = Math.abs(( width - imageWidth)/2)
            // console.log(width, imageWidth, x)
            pdf.addImage(canvas, 'PNG', 26.5, 26.5);
            pdf.save(`${invoiceNumber}.pdf`)
          
            setLoading(false)
        
    }
  
    if (!invoice) {
      return <LoadingScreen />
    }
    if (error) {
      return <ErrorScreen />
    }

  return (
    <Stack spacing={5}>
      <Stack direction= 'row' alignItems= 'center' spacing= {2}>
          <Typography variant="h4">INVOICE- #{invoiceNumber}</Typography>
      </Stack>
      

      <Stack
        spacing={2}
        direction={{ xs: 'column', md: 'row' }}
        justifyContent={{ md: 'space-between' }}
      >

        <Stack direction="row" alignItems="center" spacing={1.5}>
          <Avatar src={user?.photoURL || ''} alt= {user?.firstName || ''} />
          <div>
            <Typography variant="body3" sx={{ color: 'text.disabled' }}>
                {user?.firstName || ''}
            </Typography>
          </div>
        </Stack>

      </Stack>

      <Stack
        spacing={3}
        maxWidth={700}
        alignSelf={'center'}
        component= 'div'
        width={'100%'}
        sx={{
          p: isDesktop ? 5 : 1,
          borderRadius: 2,
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
        ref={componentRef}
      >
        <Typography variant="h5">Transaction Details</Typography>

        <LineItem
          icon={<Iconify icon={calendarIcon} />}
          label="Date"
          value={fDate(new Date(invoice.createdAt))}
        />
        <LineItem icon={<Iconify icon={userIcon} />} label="user" value= {user?.firstName || user?.email || ''} />
        <LineItem icon={<Iconify icon={emailIcon} />} label="email" value= {user?.email|| ''} />
        <Divider sx={{ borderStyle: 'dashed' }} />
        <LineItem
          icon={<Iconify icon={moneyIcon} />}
          label="valid til"
          value={fDate(new Date(invoice.endDate))}
        />
        <LineItem icon={<Iconify icon={receiptIcon} />} label="Total" value={format(invoice.price, {code: 'NGN'})} />
        <LineItem icon={<Iconify icon={purchaseIcon} />} label="Payment method" value="Paystack" />
        <LineItem icon={<Iconify icon={invoiceIcon} />} label= {isDesktop && 'invoice'} value= {`#${invoice._id}`} />
      </Stack>

      <Stack spacing={ 2.5} direction={{ xs: 'column', md: 'row' }} justifyContent="center">
        <NextLink href="/" passHref>
          <Button
            variant="outlined"
            size= { isDesktop ? 'small' : 'large' }
            color="inherit"
            startIcon={<Iconify icon={chevronLeft} />}
          >
            Back Home
          </Button>
        </NextLink>

        <LoadingButton 
              loadingPosition="start"
              variant= 'contained'
              size= { isDesktop ? 'small' : 'large' }
              loading= {loading}
              onClick={handleDownload}
              startIcon={<Iconify icon={packageIcon} />}
          >
              {loading ? 'Downloading Invoice...' : 'Download Invoice'}
          </LoadingButton>
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

LineItem.propTypes = {
  icon: PropTypes.any,
  label: PropTypes.string,
  value: PropTypes.string,
};

function LineItem({ icon, label, value }) {
  return (
    <TextIconLabel
      icon={icon}
      value={
        <>
          {label}
          <Typography
            variant="subtitle2"
            sx={{ color: 'text.primary', flexGrow: 1, textAlign: 'right' }}
          >
            {value}
          </Typography>
        </>
      }
      sx={{
        color: 'text.disabled',
        '& svg': { mr: 1, width: 24, height: 24 },
      }}
    />
  );
}
