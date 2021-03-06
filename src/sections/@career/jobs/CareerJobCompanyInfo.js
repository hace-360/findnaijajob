import PropTypes from 'prop-types';
// @mui
import { Stack, Typography, Link, Paper } from '@mui/material';
// components
import { Image } from '../../../components';

// ----------------------------------------------------------------------

export default function CareerJobCompanyInfo({ job }) {
  const { company } = job;

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2, bgcolor: 'background.default' }}>
      <Stack spacing={2} direction="row" alignItems="center">
        <Image
          alt={company?.name || ''}
          src={company?.logo || ''}
          sx={{ width: 48, height: 48, borderRadius: 1 }}
        />

        <Stack spacing={0.5}>
          <Typography variant="overline" sx= {{textTransform: 'capitalize'}}>{company?.name || ''}</Typography>
          <Link variant="body3" sx={{ color: 'text.secondary' }}>
            View Company Profile
          </Link>
        </Stack>
      </Stack>
    </Paper>
  );
}
