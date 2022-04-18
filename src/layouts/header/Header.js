import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import {makeStyles} from '@mui/styles'
import { Box, Stack, Button, AppBar, Divider, Container,Link,Typography } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive, useSettings } from '../../hooks';
// routes
import Routes from '../../routes';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// components
import { Logo } from '../../components';
//
import Searchbar from '../Searchbar';
import { NavMobile, navConfig } from '../nav';
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';
import UserMenu from '../UserMenu'
import {useRouter} from 'next/router'
import Notification from '../Notification'
import {useEffect, useState} from 'react'

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
  animatedItem: {
    animation: `$myEffect 2s ${theme.transitions.easing.easeInOut} infinite`
  },
  "@keyframes myEffect": {
    "50%": {
      opacity: 0
    }
  }
}))

export default function Header({ transparent }) {
  const theme = useTheme();
  const classes = useStyles()

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  const {user, setAlert} = useSettings()
  const router = useRouter()
  const [animate, setAnimate] = useState(true)
  useEffect(() => {
    if (router.asPath.includes('cover-letter')) {
      return router.push('/')
    }
    if (router.asPath.includes('profile') && !user) {
      return router.push('/')
    }
    if (router.asPath.includes('resume') && !user) {
      return router.push('/')
    }
    if (router.asPath.includes('resume') && user && user.accountType !== 'applicant') {
      setAlert({message: 'create an applicant account to continue'})
      return router.push('/')
    }
    if (router.asPath.includes('payment') && !user) {
      return router.push('/account/login')
    }
  }, [user, router])

  return (
    <AppBar sx={{ boxShadow: 2, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo onDark={transparent && !isScrolling} />
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {
            isDesktop &&
            <Stack spacing= {2} direction= 'row' alignItems= 'center'>
              <NextLink href={Routes.about} passHref>
              <Link
                color="inherit"
                variant="button"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  ...(isScrolling && { color: 'text.primary' }),
                }}
              >
                About
              </Link>
            </NextLink>

              <NextLink href={Routes.contact} passHref>
              <Link
                color="inherit"
                variant="button"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  ...(isScrolling && { color: 'text.primary' }),
                }}
              >
                Contact us
              </Link>
            </NextLink>

            <Button
              onClick= {() => user ? router.push('/resume') : router.push('/account/login')}
              className= {animate && classes.animatedItem}
              onMouseEnter= {() => setAnimate(false)}
              onMouseLeave= {() => setAnimate(true)}
              sx= {{
                fontWeight: 'fontWeightMedium',
                  ...(isScrolling && { color: 'text.primary' }),
                borderRadius: 0,
                px: 3,
                border: '1px dashed green'
              }}
            >
              <Typography variant= 'overline' sx= {{fontSize: '12px'}}>
                CV Builder
              </Typography>
            </Button>
            </Stack>
          }

            <Box sx={{ mx: 2 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            {/* <Searchbar
              sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
            /> */}
            {
              isDesktop && !user &&
              <Stack direction="row" spacing={1}>
                <NextLink href={Routes.login} prefetch={false}>
                  <Button
                    color="inherit"
                    variant="outlined"
                    sx={{
                      ...(transparent && {
                        color: 'common.white',
                      }),
                      ...(isScrolling && isLight && { color: 'text.primary' }),
                    }}
                  >
                    login
                  </Button>
                </NextLink>

                <Button variant="contained" color= 'secondary' href={Routes.signup}>
                  signup
                </Button>

              </Stack>
            }

            {
              isDesktop && user &&
              <Stack spacing= {3} direction= 'row'>
                {user && <Notification sx={{
                  fontWeight: 'fontWeightMedium',
                  ...(isScrolling && { color: 'text.primary' }),
                }} />}
              <UserMenu />
            </Stack>
            }
            {
              isDesktop && user && user?.accountType == 'recruiter' && !router.pathname.includes('/jobs/create') &&
              <Button variant="contained" color= 'primary' href={Routes.createJob}>
                  Post a Job
              </Button>
            }

          </Stack>

          {!isDesktop && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                color: 'text.primary',
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
