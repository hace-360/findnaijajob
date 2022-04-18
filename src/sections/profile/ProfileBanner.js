// import styles from './styles/profileBanner.module.scss'
import {Avatar, Container, Button, Stack, Typography, Link, Box} from '@mui/material'
import { styled } from '@mui/material/styles';
import { fDate } from '../../utils/formatTime';
import { FavoriteButton , Breadcrumbs, TextIconLabel, Iconify } from '../../components';
import { useState } from 'react';
import cssStyles from '../../utils/cssStyles';
// icons
import viewIcon from '@iconify/icons-carbon/view';
import locationIcon from '@iconify/icons-carbon/location';
import baggageClaim from '@iconify/icons-carbon/baggage-claim';
import time from '@iconify/icons-carbon/time';
import { useResponsive,useSettings } from '../../hooks';
import useSWR from 'swr'


const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: theme.spacing(5),
    paddingBottom: theme.spacing(10),
    ...cssStyles(theme).bgImage(),
  }));


export default function Profilebanner ({id}) {

    const [favorite, setFavorite] = useState(false);
    // const {user} = useSettings()
    const {data: user} = useSWR(() => id ? `/profile/${id}` : '/profile', {revalidateOnFocus: true, initialData: null})

    const handleChangeFavorite = (event) => {
        setFavorite(event.target.checked);
    };
    const isDesktop = useResponsive('up', 'md');


    return (
        <RootStyle>
      <Container>
        <Breadcrumbs
          onDark
          links={[
            { name: 'Home', href: '/' },
            { name: 'Profile', href: '/profile' },
            { name: user?.firstName && user?.firstName},
          ]}
          sx={{
            mb: { xs: 5, md: 8 },
          }}
        />

        <Stack
          spacing={5}
          direction= { isDesktop ? { xs: 'column', md: 'row' } : 'column-reverse' } 
          justifyContent={{ md: 'space-between' }}
          alignItems={ isDesktop && 'center'}
        >
          <Stack spacing={{ xs: 3, md: 2 }} sx={{ color: 'common.white' }} alignItems={!isDesktop && 'center'}>
            <Typography variant="h3" component="h1" sx= {{ textTransform: 'capitalize' }}>
              { user?.name || '' }
            </Typography>

            <Stack spacing={3} direction={{ xs: 'row', md: 'row' }} sx={{ opacity: 0.48 }}>
              <TextIconLabel
                icon={<Iconify icon={baggageClaim} sx={{ width: 20, height: 20, mr: 1 }} />}
                value={
                  <Link color="inherit" underline="always">
                    { user?.title || 'professional title'}
                  </Link>
                }
              />

              <TextIconLabel
                icon={<Iconify icon={locationIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
                value= {`${user?.address?.state || user?.company?.state || ''}/${user?.address?.country || user?.company?.country || 'location'}`}
              />

              {/* <TextIconLabel
                icon={<Iconify icon={time} sx={{ width: 20, height: 20, mr: 1 }} />}
                value={ user?.experiance || 'experience'}
              /> */}
            </Stack>
          </Stack>

          <Stack
            spacing={2}
            direction="row"
            alignItems="flex-start"
            sx={{ width: 1, maxWidth: isDesktop ? 340 : '100%' }}
          >
            <Stack spacing={2} alignItems="center" sx={{ width: 1 }}>

                <Avatar
                    alt= {user?.firstName || 'Guest'}
                    src= {user?.photoURL || ''}
                    sx={{ width: 150, height: 150 }}
                />

            </Stack>

            {isDesktop && 
                <Box sx={{ pt: 0.75 }}>
                <FavoriteButton
                    checked={favorite}
                    onChange={handleChangeFavorite}
                    sx={{ '& svg': { width: 24, height: 24 } }}
                />
                </Box>}
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
    )
}