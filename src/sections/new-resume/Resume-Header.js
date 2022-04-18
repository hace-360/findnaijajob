import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Link, Stack, AppBar, Divider, Container } from '@mui/material';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
// routes
import Routes from '../../routes';
// components
import { Logo } from '../../components';
//
import { ToolbarStyle, ToolbarShadowStyle } from '../../layouts/header/HeaderToolbarStyle';

// ----------------------------------------------------------------------

HeaderSimple.propTypes = {
  transparent: PropTypes.bool,
};

export default function HeaderSimple({ transparent }) {
  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

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

            <NextLink href={Routes.support} passHref>
              <Link
                color="primary"
                variant="body2"
                sx={{
                  fontWeight: 'fontWeightMedium',
                  ...(isScrolling && { color: 'text.primary' }),
                }}
              >
                Support
              </Link>
            </NextLink>
          </Stack>
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
