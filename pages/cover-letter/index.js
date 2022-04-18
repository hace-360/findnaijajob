import Layout from '../../src/layouts';
import {Stack} from '@mui/material'
import { Page } from '../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
import { styled } from '@mui/material/styles';
import FinalCoverLetter from '../../src/sections/cover-letter/final'

// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    minHeight: '100vh',
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    }
  }));


export default function Index() {


  return (
      <Page title="Create your cover letter -">
          <RootStyle>
            <Stack spacing= {10} alignItems= 'center'>
              <FinalCoverLetter />
            </Stack>
          </RootStyle>
      </Page>
  );
}

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout simpleFooter >{page}</Layout>;
};

