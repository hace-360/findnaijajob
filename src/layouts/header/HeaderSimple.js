import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, AppBar, Divider, Container } from '@mui/material';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
import { useSettings } from '../../hooks';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// routes
import Routes from '../../routes';
// components
import { Logo } from '../../components';
//
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';
import HeaderResume from '../../sections/new-resume/headerResume'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'

// ----------------------------------------------------------------------

HeaderSimple.propTypes = {
  transparent: PropTypes.bool,
};

export default function HeaderSimple({ transparent }) {

  const {user, setAlert} = useSettings()
  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);
  const router = useRouter()
  const [replace, setReplace] = useState(false)

  useEffect(() => {
    if (router.asPath.includes('resume/section')) {
      setReplace(true)
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
  },[router, user])

  return (
    <AppBar sx={{ boxShadow: 2, bgcolor: 'transparent', width: '100%' }}>
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling} sx={{ px: 2 }}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo onDark={transparent && !isScrolling} />

          <Stack
            direction="row"
            alignItems="center"
            divider={<Divider orientation="vertical" sx={{ height: 24 }} />}
            spacing={2.5}
          >
            {
              replace ? <HeaderResume /> :
              <NextLink href={Routes.support} passHref>
                <Link
                  color="inherit"
                  variant="body2"
                  sx={{
                    fontWeight: 'fontWeightMedium',
                    ...(isScrolling && { color: 'text.primary' }),
                  }}
                >
                  Support
                </Link>
              </NextLink>
            }

          </Stack>
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
