import { useState, useEffect } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Box, Grid, Divider, Button, Avatar } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
import { fShortenNumber } from '../../../utils/formatNumber';
// utils
import { _brands } from '../../../../_data/mock';
// assets
import { CareerHeroIllustration } from '../../../assets';
// components
import { Iconify, SvgIconStyle, Image } from '../../../components';
//
import { CareerJobKeywordFilter, CareerJobLocationsFilter } from '../filters';
import {useSettings} from '../../../hooks'
import useSWR from 'swr'
import {useRouter} from 'next/router'
import axios from 'axios'

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  // ...cssStyles(theme).bgImage(),
  overflow: 'hidden',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(15),
  },
}));

const BarStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.common.white,
  '& .MuiAutocomplete-root': {
    '& .MuiFilledInput-root': {
      height: '48px !important',
      backgroundColor: 'transparent !important',
    },
  },
  '& .MuiAutocomplete-endAdornment': {
    display: 'none',
  },
  [theme.breakpoints.up('md')]: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
}));

// ----------------------------------------------------------------------

export default function CareerLandingHero() {

  const [bgImage, setBgImage] = useState('https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/18a4949fc9c8067172d3b96e302e7097.gif?alt=media&token=8826b18c-4f52-4ab3-8509-f666d72d627d')
  const [bgColor, setBgColor] = useState('#1E1842')

  // const getNewPhoto = async () => {
  //   const res = await axios.get('https://api.unsplash.com/photos/random?client_id=LmUrHRyGPrUds4Q2Y8JMIZOR9nxW9Dudu_zTNpYtlbU&query=job seeker', {headers: {
  //     authorization: 'Client-ID LmUrHRyGPrUds4Q2Y8JMIZOR9nxW9Dudu_zTNpYtlbU'
  //   }})
  //   if (res.data) {
  //     console.log(res.data)
  //   }
  // }
  const router = useRouter()
  const [filters, setFilters] = useState({
    title: null,
    location: null,
  });

  const handleChangeKeyword = (keyword) => {
    setFilters({
      ...filters,
      title: keyword,
    });
  };

  const handleChangeLocation = (keyword) => {
    setFilters({
      ...filters,
      location: keyword.label,
    });
  };

  const onSubmit = async () => {
    let query = []
    for (let [k, v] of Object.entries(filters)) {
      if (k && v) {
        query.push(`${k}=${v}`)
      }
    }
    query = query.join('&').toLowerCase()
    router.push(`/jobs?${query}`)
  };

  // useEffect( () => {
  //   getNewPhoto()
  // })

  return (
    <RootStyle sx= {{bgcolor: bgColor}}>
      <Container>
        <Grid container spacing={3} justifyContent="space-between">
          <Grid item xs={12} md={6} lg={5}>
            <Stack
              spacing={5}
              sx={{
                textAlign: { xs: 'center', md: 'unset' },
              }}
            >
              <Stack spacing={3}>
                <Typography variant="h1" sx={{ color: 'common.white' }}>
                  Get The{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    Job
                  </Box>{' '}
                  You Deserve
                </Typography>
                <Typography sx={{ color: 'grey.500' }}>
                Connecting the right job seeker to the right employer.
                </Typography>
              </Stack>

              <BarStyle spacing={{ xs: 1, md: 0 }}>
                <CareerJobKeywordFilter
                  filterKeyword={filters.title}
                  onChangeKeyword={handleChangeKeyword}
                />
                <Divider
                  orientation="vertical"
                  sx={{
                    height: 24,
                    display: { xs: 'none', md: 'block' },
                  }}
                />
                <CareerJobLocationsFilter
                  filterLocation={filters.location}
                  onChangeLocation={handleChangeLocation}
                />
                <Button
                  onClick= {onSubmit}
                  size="large"
                  variant="contained"
                  sx={{
                    px: 0,
                    minWidth: { xs: 1, md: 48 },
                  }}
                >
                  <Iconify icon={searchIcon} sx={{ width: 24, height: 24 }} />
                </Button>
              </BarStyle>

              {/* <BrandsSection /> */}
              <SummarySection />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ display: { xs: 'none', md: 'block' } }}>
            {/* <CareerHeroIllustration /> */}
            <img 
              src={bgImage}
              alt="background image"
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

const DividerStyle = <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />;

function BrandsSection() {

  const {data: brands, error} = useSWR('/job//companies/all')

  return (
    <Stack
      flexWrap="wrap"
      direction={{ md: 'row' }}
      alignItems={{ md: 'center' }}
      sx={{ pt: { md: 1 } }}
    >
      {brands && brands.length > 0 && 
      brands.slice(0, 3).map((brand, index) => (
        <Box
          key={index}
          sx={{
            lineHeight: 0,
            my: { xs: 1.5, md: 0.5 },
            mr: { md: 3 },
            width: { xs: 0.5, md: 'auto' },
            '&:last-of-type': {
              mr: 0,
            },
          }}
        >
          {/* <SvgIconStyle
            src={brand?.logo}
            sx={{
              width: 94,
              height: 28,
              opacity: 0.8,
              color: 'grey.500',
            }} */}
            <Image
              alt={brand?.name}
              src={brand?.logo}
              sx={{ width: 55, height: 55, borderRadius: 1 }}
            />
        </Box>
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

function SummarySection() {

  const {data: jobs= [], jobError} = useSWR('/jobs/all')
  const {data: applicants= [], error: applicantError} = useSWR('/profile/all/applicants')
  const {data: recruiters= [], error} = useSWR('/profile/all/recruiters')

  return (
    <Stack
      spacing={3}
      direction={{ xs: 'column', md: 'row' }}
      divider={DividerStyle}
      sx={{ pt: { md: 5 } }}
    >
      <Stack spacing={{ md: 3 }} direction="row" divider={DividerStyle}>
        {SummaryItem(jobs?.length || 0, 'Jobs')}
        {SummaryItem(applicants?.length || 0, 'Applicants')}
      </Stack>
      <Stack spacing={{ md: 3 }} direction="row" divider={DividerStyle}>
        {/* {SummaryItem(250000, 'Partners')} */}
        {SummaryItem(recruiters?.length || 0, 'Recruiters')}
      </Stack>
    </Stack>
  );
}

function SummaryItem(total, label) {
  return (
    <Stack spacing={0.5} alignItems= 'center' sx={{ color: 'common.white', width: { xs: 0.5, md: 'auto' } }}>
      <Typography variant="h4">{fShortenNumber(total)}+</Typography>
      <Typography variant="body2" sx={{ opacity: 0.48 }}>
        {label}
      </Typography>
    </Stack>
  );
}
