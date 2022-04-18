import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import locationIcon from '@iconify/icons-carbon/location';
import baggageClaim from '@iconify/icons-carbon/baggage-claim';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Box, Link, Button, Container } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
import cssStyles from '../../../utils/cssStyles';
// components
import { FavoriteButton, Breadcrumbs, TextIconLabel, Iconify } from '../../../components';
import {useSettings} from '../../../hooks'
import {useRouter} from 'next/router'
import {useEffect} from 'react'
import useSWR from 'swr'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  ...cssStyles(theme).bgImage(),
}));

// ----------------------------------------------------------------------

export default function CareerJobHero({ job }) {

  const {data: application, error} = useSWR(() => job && job._id ? `/application/${job._id}` : '', {revalidateOnFocus: true})
  const { slug, category, address, views, deadline, favorited, title, mode, type, company, _id } = job;
  const {user} = useSettings()
  const router = useRouter()


  return (
    <RootStyle>
      <Container>
        <Breadcrumbs
          onDark
          links={[
            { name: 'Home', href: '/' },
            { name: 'Jobs', href: Routes.jobs },
            { name: job.slug },
          ]}
          sx={{
            mb: { xs: 5, md: 8 },
          }}
        />

        <Stack
          spacing={5}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.white' }}>
            <Typography variant="h3" component="h1">
              {`${title}/${category}`}
            </Typography>

            <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ opacity: 0.48 }}>
              <TextIconLabel
                icon={<Iconify icon={baggageClaim} sx={{ width: 20, height: 20, mr: 1 }} />}
                value={
                  <Link color="inherit" underline="always">
                    {category}
                  </Link>
                }
              />
              {/* <TextIconLabel
                icon={<Iconify icon={viewIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
                value={`${views || 0} views`}
              /> */}
              <TextIconLabel
                icon={<Iconify icon={locationIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
                value= {`${address?.state || company?.state || ''}/${address?.country || company?.country || 'location'}`}
              />
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            sx={{ width: 1, maxWidth: 340 }}
          >
            <Stack spacing={2} alignItems="center" sx={{ width: 1 }}>
              {
                !user || user?.accountType === 'applicant' ?
                <Button
                  disabled= {application}
                  onClick= {() => user ? router.push(`/jobs/${_id}/apply`) : router.push('/account/login')} 
                  color= {application ? 'error' : 'primary'} fullWidth 
                  variant="contained" size="large"
                  >
                  { application ? 'Already Applied' : 'Apply Now'}
                </Button> : ''
              }
              
              <Typography variant="body3" sx={{ color: 'common.white' }}>
                Expiration date:{' '}
                <Box component="span" sx={{ color: 'primary.main' }}>
                  {deadline ? fDate(deadline) : ''}
                </Box>
              </Typography>
            </Stack>

            {/* <Box sx={{ pt: 0.75 }}>
              <FavoriteButton
                checked={favorite}
                onChange={handleChangeFavorite}
                sx={{ '& svg': { width: 24, height: 24 } }}
              />
            </Box> */}
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
