// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Grid, Paper, Box, TextField } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// hooks
import { useRequest, useSettings } from '../../../src/hooks';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, ErrorScreen, LoadingScreen } from '../../../src/components';
// sections
import _mock from '../../../_data/mock';
import { Advertisement01 } from '../../../src/sections/advertisement';
import CreateJob from '../../../src/sections/profile/Recruiter/Job'
import {useRouter} from 'next/router'
import { useState } from 'react';
import useSWR from 'swr';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function CreateJobsPage() {
  
    const router = useRouter()
    const {id} = router.query
    const [open, setOpen] = useState(true);
    const {data: job, error} = useSWR(`/jobs/${id}`)
  
    const handleClose = () => {
      router.back()
      setOpen(false);
    };
  
  
    if (!job) {
      return <LoadingScreen />
    }
  
    if (error) {
      return <ErrorScreen />
    }

  return (
    <Page title="Jobs - Career">
      <RootStyle>
        <Container>
            <Grid container sx= {{py: 4}} spacing= {2}>
                <Grid item xs= {12} md= {8}>
                    <Paper variant= 'outlined' sx= {{p: 2}}>
                    <Stack spacing= {2}>
                        <CreateJob job= {job} />
                    </Stack>
                    </Paper>
                </Grid>

                <Grid item xs= {12} md= {4}>
                    <Stack spacing= {3}>
                    <Advertisement01
                        advertisement={{
                            title: 'Advertisement',
                            description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                            imageUrl: _mock.image.career(2),
                            path: '#',
                        }}
                        />

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
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CreateJobsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
