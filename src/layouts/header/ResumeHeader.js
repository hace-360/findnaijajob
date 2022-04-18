import PropTypes from 'prop-types';
import { Box, Stack, Divider, Container } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive } from '../../hooks';
// routes
import Routes from '../../routes';
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
// components
import { Logo, Label } from '../../components';
//
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';
import UserMenu from '../UserMenu'
import Share from '../Share'
import ImageTemplates from '../../sections/resume/ImageTemplates'

// ----------------------------------------------------------------------

Header.propTypes = {
  transparent: PropTypes.bool,
};

export default function Header({ transparent, temp, setTemp  }) {

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (

    <Box sx={{ boxShadow: 2, bgcolor: 'transparent', width: '100%' }}>
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

            {/* <Label
              color="info"
              sx={{
                ml: 0.5,
                px: 0.5,
                top: -8,
                left: 150,
                height: 20,
                fontSize: 11,
                position: 'absolute',
              }}
            >
              v1.0
            </Label> */}
          </Box>


          <Box sx={{ flexGrow: 1 }} />

              <Stack 
                  direction="row"
                  spacing={2}
                  divider= {<Divider flexItem orientation= 'vertical' />}
                  sx= {{
                    marginRight: 4
                  }}
                >
                    {/* <Share/> */}
              </Stack>

              <Stack 
                direction="row"
                spacing={2}
                divider= {<Divider flexItem orientation= 'vertical' />}
              >
                <UserMenu
                  sx={{
                    ...(isScrolling && { color: 'text.primary' }),
                  }}
                />

                <ImageTemplates setTemp= {setTemp} temp= {temp} />
              </Stack>

        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </Box>
  );
}
