// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Stack, Divider, Container, Typography } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest, useResponsive } from '../../../src/hooks';
// _data
import _mock from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen, SocialsButton } from '../../../src/components';
// sections
import { NewsletterCareer } from '../../../src/sections/newsletter';
import { Advertisement01 } from '../../../src/sections/advertisement';
import {
  CareerJobHero,
  CareerJobInfo,
  CareerJobDetails,
  CareerJobSimilar,
  CareerJobCompanyInfo,
  CareerJobCompanySimilar,
} from '../../../src/sections/@career';
import useSWR from 'swr'
import {useState, useEffect} from 'react'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function CareerJobPage({children, title}) {
  const router = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const { id } = router.query;

  const {data: jobs = []} = useSWR('/jobs')
   const { data: job, error: jobError } = useSWR(id ? `/jobs/${id}` : '');

   const [meta, setMeta] = useState({title: '', description: '', url: '', image: ''})
   useEffect(() => {
     if (job && Object.keys(job).length > 0) {
       setMeta({
         title: `${job.title || ''}/${job.category || ''}`,
         description: stripHtml(job.content) || '',
         url: `https://findnaijajob.com${router.asPath}`,
         image: job?.company?.logo || ''
        })
     }
   }, [job, router])


  if (jobError) {
    return <ErrorScreen />;
  }

  if (!job) {
    return <LoadingScreen />;
  }


  return (
    <Page 
      title={`${ title || job.title || ''}/${job.category || ''} - `}
      meta= {{...meta}}
    >
      <RootStyle>
        {job && <CareerJobHero job={job} />}

       <Container
          sx={{
            pt: { xs: 10, md: 8 },
            pb: { xs: 15, md: 8 },
          }}
        >
         <Grid container spacing={8}>
            {!isDesktop && (
              <Grid item xs={12} md={5} lg={4}>
                <CareerJobInfo job={job} />
              </Grid>
            )}

           <Grid item xs={12} md={7} lg={8}>
              <CareerJobDetails job={job} />
              <Divider sx={{ my: 5 }} />
              {/* <Stack spacing={2} direction="row">
                <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                  Share:
                </Typography>
                <SocialsButton initialColor simple={false} links={job.shareLinks} />
              </Stack> */}
            </Grid>

           <Grid item xs={12} md={5} lg={4}>
              <Stack spacing={5}>
                {isDesktop && job && <CareerJobInfo job={job} />}
                {job && <CareerJobCompanyInfo job={job} />}
                {jobs && <CareerJobCompanySimilar jobs={jobs} />}
                <Advertisement01
                  advertisement={{
                    title: 'Advertisement',
                    description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                    imageUrl: _mock.image.career(2),
                    path: '#',
                  }}
                />
              </Stack>
            </Grid>
          </Grid>

          {children}
        </Container>

        {/* <CareerJobSimilar jobs={jobs.slice(-3)} />  */}
        <NewsletterCareer />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerJobPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};


function stripHtml (html){
  let doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || ''
}