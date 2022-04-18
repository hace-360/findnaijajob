// @mui
import { styled } from '@mui/material/styles';
import { Container,Divider } from '@mui/material';
import {useRouter} from 'next/router'
import { useEffect } from 'react';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// layouts
import Layout from '../../src/layouts';
import { Page, LoadingScreen, ErrorScreen } from '../../src/components';
import Recruiter from '../../src/sections/profile/Recruiter'
import Applicant from '../../src/sections/profile/Applicant'
import useSWR from 'swr'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function Profile({children, title}) {

  const router = useRouter()

  const {data: user, error} = useSWR('/profile')

  if (!user) return <LoadingScreen />

  if (error) return <ErrorScreen />


  return (
    <Page title= {title || "Profile - "}>
      <RootStyle>
        <Container sx= {{ paddingBottom: 3 ,padding: 0}}>
         { user && user?.accountType == 'recruiter' ? <Recruiter /> : <Applicant /> } 
         {children}
        </Container>

        <Divider />
      </RootStyle>
    </Page>
  );
}


// ----------------------------------------------------------------------

Profile.getLayout = function getLayout(page) {
  return <Layout simpleFooter >{page}</Layout>;
};
