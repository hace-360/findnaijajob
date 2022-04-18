import PropTypes from 'prop-types';
import { memo } from 'react';
import NextLink from 'next/link';
import { Box } from '@mui/material';
import {useResponsive} from '../hooks'

// ----------------------------------------------------------------------

Logo.propTypes = {
  isSimple: PropTypes.bool,
  onDark: PropTypes.bool,
  sx: PropTypes.object,
};

function Logo({ onDark = false, isSimple = false, sx }) {

  const isDesktop = useResponsive('up', 'md')

  return (
    <NextLink href="/">
      <Box
        sx={{
          lineHeight: 0,
          cursor: 'pointer',
          display: 'inline-flex',
          ...sx,
        }}
      >
        <img
          style= {{
            width: '100%',
            display: 'flex',
            objectFit: 'contain',
            maxWidth: isDesktop ? '200px' : '170px'
          }}
        src="https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/findnaijajob%20logo.png?alt=media&token=6a7d6144-b563-4691-8818-5e2611ffaedc" alt="Logo"/>
      </Box>
    </NextLink>
  );
}

export default memo(Logo);
