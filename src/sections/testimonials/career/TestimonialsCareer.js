import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { useRef } from 'react';
// @mui
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Grid, Container, Stack, Rating } from '@mui/material';
// components
import { CarouselArrows } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

TestimonialsCareer.propTypes = {
  testimonials: PropTypes.array.isRequired,
};

export default function TestimonialsCareer({title, size}) {
  const theme = useTheme();
  const carouselRef = useRef(null);

  const carouselSettings = {
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Container>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Typography variant= {size || "h3"} sx={{ mb: 5, textAlign: 'center', textTransform: 'capitalize' }}>
              {title || 'What Our users Say'}
            </Typography>

            <Slider ref={carouselRef} {...carouselSettings}>
              {testimonials.map((testimonial) => (
                <TestimonialsItem key={testimonial.id} testimonial={testimonial} />
              ))}
            </Slider>
          </Grid>
        </Grid>

        <CarouselArrows
          onNext={handleNext}
          onPrevious={handlePrevious}
          sx={{
            mt: 10,
            justifyContent: 'center',
          }}
        />
      </Container>
    </RootStyle>
  );
}

// ----------------------------------------------------------------------

TestimonialsItem.propTypes = {
  testimonial: PropTypes.shape({
    name: PropTypes.string,
    rating: PropTypes.number,
    review: PropTypes.string,
    role: PropTypes.string,
  }),
};

function TestimonialsItem({ testimonial }) {
  const { name, review, role, rating } = testimonial;

  return (
    <Stack alignItems="center" sx={{ textAlign: 'center' }}>
      <Rating value={rating} readOnly />
      <Typography
        sx={{
          my: 3,
          lineHeight: 1.75,
          fontSize: { md: 20 },
        }}
      >
        {review}
      </Typography>
      <Typography variant="h6">{name}</Typography>
      <Typography variant="body3" sx={{ color: 'text.secondary' }}>
        {role}
      </Typography>
    </Stack>
  );
}


const testimonials = [
  {
    review: 'My experience with FindNaijaJob Resume Builder has been delightful. The development process was fast, easy, and professional. I really liked the templates, which allow you to build your resume section by section in a very logical way.',
    role: 'software developer',
    name: 'solomon elegbe',
    rating: 4
  },
  {
    review: 'The first thing I noticed when I started using The Resume Builder was the ease of use in creating and managing the resumes. Having the ability to go to various sections that form the document and create/update them along with the help available in compiling the bullet points to describe the work experience makes it a very good tool for building it. ',
    role: 'marketer/influencer',
    name: 'Justina arinze',
    rating: 4
  },
  {
    review: 'My husband and I are anxiously anticipating fulfilling a long-term dream; we’ll be moving to a new location following our child’s graduation from high school! After 24 years in the same job, I searched the web for a little help in navigating the best path to writing my resume. I happened upon your website and found exactly the help I was had been seeking.',
    role: 'Banker',
    name: 'mariam aramide',
    rating: 5
  },
  {
    review: 'I’m very impressed with this service. It seems they already anticipate my needs before I know what they are. Very helpful in today’s job market!',
    role: 'HR',
    name: 'chika francis',
    rating: 4
  },
]