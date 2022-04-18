import PropTypes from 'prop-types';
// icons
import trophyIcon from '@iconify/icons-carbon/trophy';
import dataVis4 from '@iconify/icons-carbon/data-vis-4';
import increaseLevel from '@iconify/icons-carbon/increase-level';
import userCertification from '@iconify/icons-carbon/user-certification';
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Box, Container, Typography, Button } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import { Iconify, CountUpNumber, Image } from '../../../components';

// ----------------------------------------------------------------------

const SUMMARY = [
  { title: 'Years of experience', total: 2, icon: increaseLevel },
  // { title: 'Awards', total: 20, icon: trophyIcon },
  { title: 'Jobs Posted', total: 150, icon: dataVis4 },
  { title: 'Happy clients', total: 1000, icon: userCertification },
];

const COLORS = ['primary', 'secondary', 'warning', 'success'];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const IconStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== 'color',
})(({ color, theme }) => ({
  width: 160,
  height: 160,
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  position: 'relative',
  justifyContent: 'center',
  color: theme.palette[color].darker,
  border: `dashed 2px ${alpha(theme.palette[color].main, 0.24)}`,
  '&:before': {
    zIndex: 8,
    content: '""',
    borderRadius: '50%',
    position: 'absolute',
    width: 'calc(100% - 48px)',
    height: 'calc(100% - 48px)',
    background: `conic-gradient(from 0deg at 50% 50%, ${theme.palette[color].main} 0deg, ${theme.palette[color].light} 360deg)`,
  },
  '& svg': {
    zIndex: 9,
  },
}));

// ----------------------------------------------------------------------

export default function MarketingAbout() {
  return (
    <RootStyle>
      <Container>
        <Grid container spacing={3} justifyContent="space-between" alignItems="center">
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
              display: { xs: 'none', md: 'block' },
            }}
          >
            <Image
              alt="teams"
              src="https://zone-assets-api.vercel.app/assets/illustrations/illustration_teams.svg"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography variant="h2">Who We Are?</Typography>
            <Typography sx={{ mt: 3, mb: 5, color: 'text.secondary' }}>
              {/* Findnaijajob  Job Portal is an online job platform for experience job seekers, C-Suites and fresh  graduates seeking for job opportunities from top organizations in any industry in Nigeria . 
              <br />
              <br />
              We help you to achieve your goals through the optimum use of your talents and expose you to various opportunities in the country.
              <br />
              <br />
              We also have resources that will shape and guide your career which includes free CV builder, interview tips and practical step by steps to landing your dream job.
              <br />
              <br />
              All our jobs are direct from the recruiters/employers. We also offer a CV data base for employers and recruiters for quality and qualified candidates in Nigeria.
              <br />
              <br /> */}
              Findnaijajob is a job portal positioned to help millions of people find jobs in Nigeria and equip hundreds of thousands of employers with the talent they need.
              <br/><br/>

              We help you to achieve your goals through the optimum use of your talents and expose you to various opportunities in the country.
              <br/><br/>

              We also have resources that will shape and guide your career which includes free CV builder, interview tips and practical step by steps to landing your dream job.
              <br/><br/>

              All our jobs are direct from the recruiters/employers. We also offer a CV data base for employers and recruiters for quality and qualified candidates in Nigeria.
              <br/>
              <br/>
            </Typography>

            {/* <Button
              variant="outlined"
              color="inherit"
              size="large"
              endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
            >
              Check Our Work
            </Button> */}
          </Grid>
        </Grid>

        <Box
          sx={{
            my: { xs: 8, md: 15 },
          }}
        />

        <Box
          sx={{
            textAlign: 'center',
            display: 'grid',
            gap: { xs: 5, md: 8 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
            },
          }}
        >
          {SUMMARY.map((value, index) => (
            <BoxItem key={value.title} value={value} index={index} />
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

BoxItem.propTypes = {
  index: PropTypes.number,
  value: PropTypes.shape({
    icon: PropTypes.any,
    title: PropTypes.string,
    total: PropTypes.number,
  }),
};

function BoxItem({ value, index }) {
  return (
    <div>
      <IconStyle color={COLORS[index]}>
        <Iconify icon={value.icon} sx={{ width: 48, height: 48 }} />
      </IconStyle>
      <Typography variant="h2" sx={{ mt: 2, mb: 1 }}>
        <CountUpNumber
          start={value.total / 5}
          end={value.total}
          formattingFn={(value) => fShortenNumber(value)}
        />
      </Typography>
      <Typography sx={{ color: 'text.secondary' }}>{value.title}</Typography>
    </div>
  );
}
