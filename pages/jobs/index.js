// @mui
import { styled } from '@mui/material/styles';
import { Container,Typography } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// hooks
import { useRequest,useSettings } from '../../src/hooks';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, ErrorScreen } from '../../src/components';
// sections
import { NewsletterCareer } from '../../src/sections/newsletter';
import { CareerJobList, CareerJobBarFilters } from '../../src/sections/@career';
import useSWR from 'swr'
import {useRouter} from 'next/router'
import { useState, useEffect } from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function CareerJobsPage() {

  const router = useRouter()
  const { data: jobs, isValidating, error } = useSWR(() => router.asPath ? `${router.asPath.replace('/jobs', '/jobs/all')}` : '',{revalidateOnFocus: true, initialData: []})

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <Page 
      title="Jobs -"
      meta= {{
        title: 'Jobs on Find Naija Job',
        description: 'All the available jobs from all arround nigeria',
        url: 'https://findnaijajob.com/jobs'
      }}
    >
      <RootStyle>
        <Container sx= {{paddingBotton: 1}}>
          <CareerJobBarFilters />
         <CareerJobList jobs={jobs} loading={isValidating && !jobs && !error} />
        </Container>
        <NewsletterCareer />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerJobsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
