// @mui
import { styled } from '@mui/material/styles';
import { Container,Divider } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// layouts
import Layout from '../../src/layouts';
import { Page } from '../../src/components';
import RecruiterSettings from '../../src/sections/profile/Recruiter/Settings'
import ApplicantSettings from '../../src/sections/profile/Applicant/Settings'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));
import {useSettings} from '../../src/hooks'

// ----------------------------------------------------------------------

export default function Profile() {

  const {user} = useSettings()
  

  return (
    <Page title="Profile Settings - ">
      <RootStyle>
        <Container sx= {{ py: 3 ,px: 1}}>
          { user?.accountType == 'recruiter' ? <RecruiterSettings /> : <ApplicantSettings /> }
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
