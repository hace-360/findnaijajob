import {Fragment, useState} from 'react';
import { useTheme, styled } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import {Box, Divider, Paper, Typography, Button, Stack, Container} from '@mui/material'
import { CareerJobKeywordFilter, CareerJobLocationsFilter } from '../filters';
import { Iconify } from '../../../components';
import {useRouter} from 'next/router'
import searchIcon from '@iconify/icons-carbon/search';
import {useResponsive} from '../../../hooks'
import { fShortenNumber } from '../../../utils/formatNumber';
import useSWR from 'swr'



const RootStyle = styled(Stack)(({ theme }) => ({
    // ...cssStyles(theme).bgImage(),
    overflow: 'hidden',
    paddingTop: theme.spacing(12),
    // paddingBottom: theme.spacing(10),
    maxWidth: '1300px',
    position: 'relative',
    height: '95vh',
    width: '100%',
    margin: '0 auto'
  }));

  const BarStyle = styled(Stack)(({ theme }) => ({
    padding: theme.spacing(1),
    width: '100%',
    flexDirection: 'row',
    borderRadius: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    position: 'absolute',
    top: '100%',
    left: '50%',
    transform: 'translate(-50%, -100%)',
    minHeight: '100px',
    maxWidth: '1300px',
  }));

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
    {label: 'get the job you deserve', url: 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2017/06/20051037/Job-Interview-Etiquette-Everyone-Should-Know-and-Follow.jpg', color: 'white'},
    {label: '', url: 'https://www.theladders.com/wp-content/uploads/interview-191011.jpg', color: ''},
    {label: 'create your cv with our advance cv builder', url: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80', color: 'black'},
    {label: 'No job too small. We fix them all.', url: 'https://cms-assets.themuse.com/media/lead/_1200x630_crop_center-center_82_none/22762.jpg?mtime=1568748925', color: 'black'},
    {label: 'The clock"s job is to tick, your job is to beat it.', url: 'https://www.cellularsales.com/wp-content/uploads/2021/08/careers-header-new-CROPPED.jpeg', color: 'white'},
    {label: 'My job is done, Now it"s time to have some fun', url: 'https://imageio.forbes.com/specials-images/imageserve/5ef12bfa6867d4000608b58c/0x0.jpg?format=jpg&width=1200&fit=bounds', color: 'white'},
    {label: 'OK a monkey could do my job, but I was here first.', url: 'https://miro.medium.com/focal/1200/1200/39/4/1*K1r8mV6FDr2aNoP9os8GxA.jpeg', color: 'white'},
    {label: 'Small jobs done.', url: 'https://www.vivi.io/wp-content/uploads/2020/04/Remote-Learning.png', color: 'white'},
    {label: 'Safety is a full time job - don"t make it a part time practice', url: 'https://media-exp1.licdn.com/dms/image/D4D08AQFxYFomJRQHHA/croft-frontend-shrinkToFit1024/0/1636135333211?e=2147483647&v=beta&t=OwmhgX1tO0IK3Eqa0T1HnVTyTIVBZD5TftCQ3810dVc', color: 'white'},
    {label: '', url: 'https://cdn.searchenginejournal.com/wp-content/uploads/2018/04/become-better-digital-marketer-1.jpg', color: ''},
    {label: '', url: 'https://images.unsplash.com/photo-1507208773393-40d9fc670acf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', color: ''},
];

function CareerHomeSlider() {

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const isDesktop = useResponsive('up', 'md')

  const handleStepChange = (step) => {
    setActiveStep(step);
  };
  const router = useRouter()
  const [filters, setFilters] = useState({
    title: null,
    location: null,
  });

  const handleChangeKeyword = (keyword) => {
    setFilters({
      ...filters,
      title: keyword,
    });
  };

  const handleChangeLocation = (keyword) => {
    setFilters({
      ...filters,
      location: keyword.label,
    });
  };

  const onSubmit = async () => {
    let query = []
    for (let [k, v] of Object.entries(filters)) {
      if (k && v) {
        query.push(`${k}=${v}`)
      }
    }
    query = query.join('&').toLowerCase()
    router.push(`/jobs?${query}`)
  };

  return (
    <RootStyle>

      <SummarySection />

      <AutoPlaySwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        resistance
        interval= {7000}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        style= {{
            position: 'relative',
            width: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            height: '100%',
            overflow: 'hidden',
        }}
      >
        {images.map((step, index) => (
            <Slides color= {step.color} src= {step.url} key= {index} alt= {step.label} />
        ))}
      </AutoPlaySwipeableViews>

        <BarStyle>
        
            <Stack 
              direction= {isDesktop ? 'row' : 'column'} alignItems='center' spacing= {isDesktop ? 2 : 1} 
              sx= {{
                width: '100%', maxWidth: isDesktop ? '80%' : '100%',
                }}>

                <CareerJobKeywordFilter
                    filterKeyword={filters.title}
                    onChangeKeyword={handleChangeKeyword}
                    sx= {{bgcolor: 'white',borderRadius: isDesktop ? theme.shape.borderRadius : '5px'}}
                />

                <CareerJobLocationsFilter
                    filterLocation={filters.location}
                    onChangeLocation={handleChangeLocation}
                    sx= {{bgcolor: 'white',borderRadius: isDesktop ? theme.shape.borderRadius : '5px'}}
                />
                <Button
                    onClick= {onSubmit}
                    size="large"
                    variant="contained"
                    sx={{
                        px: 0,
                        minWidth: { xs: 1, md: 48 },
                    }}
                >
                    <Iconify icon={searchIcon} sx={{ width: 24, height: 24 }} />
                    { !isDesktop && 'search' }
                </Button>

            </Stack>
        </BarStyle>

        
    </RootStyle>
  );
}

export default CareerHomeSlider;


function Slides ({src, alt, color}) {

  const isDesktop = useResponsive('up', 'md')

    return (
        <div style= {{height: '95vh',position: 'relative'}}>
        {isDesktop &&
        <Box 
            spacing={3}
            sx= {{
                position: 'absolute',
                zIndex: 2,
                top: '50%',
                left: '20px',
                transform: 'translateY(-100%)',
                maxWidth: '45%',
            }}
        >
          <Typography variant="h1" color= {color || 'secondary'} sx= {{textTransform: 'capitalize'}}>
            {alt}
          </Typography>
        </Box>}
        <img
            src={src}
            alt={alt}
            style= {{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
                height: '100%'
            }}
        />
        </div>
    )
}



// ----------------------------------------------------------------------

const DividerStyle = <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />;

function SummarySection() {

  const {data: jobs= [], jobError} = useSWR('/jobs/all')
  const {data: applicants= [], error: applicantError} = useSWR('/profile/all/applicants')
  const {data: recruiters= [], error} = useSWR('/profile/all/recruiters')

  return (
    <Stack
      spacing={3}
      direction='row'
      divider={DividerStyle}
      sx={{ 
        position: 'absolute',
        maxWidth: '1300px',
        top: '15%',
        left: 0,
        zIndex: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        p: 2,
        borderRadius: '0 10px 10px 0'
      }}
    >
      <Stack spacing= {3} direction="row" divider={DividerStyle}>
        {SummaryItem(jobs?.length || 0, 'Jobs')}
        {SummaryItem(applicants?.length || 0, 'Applicants')}
      </Stack>
      <Stack spacing={{ md: 3 }} direction="row" divider={DividerStyle}>
        {/* {SummaryItem(250000, 'Partners')} */}
        {SummaryItem(recruiters?.length || 0, 'Recruiters')}
      </Stack>
    </Stack>
  );
}

function SummaryItem(total, label) {
  return (
    <Stack spacing={0.5} alignItems= 'center' sx={{ color: 'secondary', width: { xs: 0.5, md: 'auto' } }}>
      <Typography color= 'white' variant="h4">{fShortenNumber(total)}+</Typography>
      <Typography color= 'white' variant="body2" sx={{ opacity: 1 }}>
        {label}
      </Typography>
    </Stack>
  );
}
