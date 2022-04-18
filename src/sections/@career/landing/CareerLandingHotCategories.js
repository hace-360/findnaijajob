import PropTypes from 'prop-types';
// icons
import directionStraightRight from '@iconify/icons-carbon/direction-straight-right';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Typography, Stack, Container, Box, Paper, Button } from '@mui/material';
// utils
import cssStyles from '../../../utils/cssStyles';
// components
import { Iconify, TextMaxLine, SvgIconStyle } from '../../../components';
import useSWR from 'swr'
import { CategorySkeleton } from '../../../components';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  ...cssStyles(theme).bgGradient({
    direction: 'top',
    startColor: alpha(theme.palette.grey[500], 0),
    endColor: alpha(theme.palette.grey[500], 0.12),
  }),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------


export default function CareerLandingHotCategories() {

  const {data: categories = [], error} = useSWR('/jobs/categories/count')
  const router = useRouter()

  return (
    <RootStyle>
      <Container>
        {/* <CategorySkeleton /> */}
        <Typography variant="h2" sx={{ textAlign: 'center' }}>
          Hot Categories
        </Typography>

        <Box
          sx={{
            my: { xs: 8, md: 10 },
            display: 'grid',
            gap: 4,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {
            categories && categories.length > 0 ? 
            categories.map((category, index) => (
              <CategoryItem key={index} category={category} />
            )) :
            Array(4).map((el, index) => (
              <CategorySkeleton key= {index} />
            ))
          }
        </Box>

        <Stack alignItems="center">
          <Button
            onClick= {() => router.push('/jobs')}
            color="inherit"
            size="large"
            variant="outlined"
            endIcon={<Iconify icon={directionStraightRight} sx={{ width: 22, height: 22 }} />}
          >
            View All Categories
          </Button>
        </Stack>
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

CategoryItem.propTypes = {
  category: PropTypes.shape({
    icon: PropTypes.any,
    name: PropTypes.string,
    totalJobs: PropTypes.number,
  }),
};

function CategoryItem({ category }) {

  const router = useRouter()


  return (
    <Paper
    onClick= {() => router.push(`/jobs?category=${category.name}`)}
      variant="outlined"
      sx={{
        pt: '80%',
        borderRadius: 2,
        cursor: 'pointer',
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'transparent',
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': {
          bgcolor: 'background.paper',
          boxShadow: (theme) => theme.customShadows.z24,
          '& .icon': {
            bgcolor: 'primary.main',
            transition: (theme) => theme.transitions.create('all'),
            '& > span': {
              color: 'common.white',
            },
          },
        },
      }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 1,
          height: 1,
          top: 0,
          position: 'absolute',
        }}
      >
        {/* <Box
          className="icon"
          sx={{
            mb: 2.5,
            width: 72,
            height: 72,
            mx: 'auto',
            display: 'flex',
            borderRadius: '50%',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <SvgIconStyle src={category.name} sx={{ width: 48, height: 48 }} />
        </Box> */}

        <TextMaxLine variant="h5" line={1}>
          {category.name}
        </TextMaxLine>

        <Typography variant="body3" sx={{ color: 'text.disabled', mt: 0.5 }}>
          {category.count} jobs
        </Typography>
      </Stack>
    </Paper>
  );
}
