import PropTypes from 'prop-types';
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { InputAdornment, FilledInput } from '@mui/material';
//
import Iconify from './Iconify';

// ----------------------------------------------------------------------

SearchInput.propTypes = {
  sx: PropTypes.object,
  onChange: PropTypes.func
};

export default function SearchInput({ sx, onChange, ...other }) {
  return (
    <FilledInput
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon={searchIcon} sx={{ width: 24, height: 24, color: 'text.disabled' }} />
        </InputAdornment>
      }
      placeholder="Search..."
      sx={{
        '& .MuiFilledInput-input': { py: '18px' },
        ...sx,
      }}
      {...other}
      onChange= {onChange}
    />
  );
}
