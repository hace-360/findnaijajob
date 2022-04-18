import Layout from '../../src/layouts';
import {Stack} from '@mui/material'
import { Page } from '../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
import { styled } from '@mui/material/styles';
import CVBuilder from '../../src/sections/new-resume'
import CoverLetter from '../../src/sections/cover-letter'
import { TestimonialsCareer } from '../../src/sections/testimonials';

// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    }
  }));


export default function Index() {


  return (
      <Page title="Build Your Resume -">
          <RootStyle>
            <Stack spacing= {10} alignItems= 'center' sx= {{pb: 4}}>
              <CVBuilder />
              {/* <CoverLetter />
              <TestimonialsCareer title= 'check out our latest reviews' size= 'h3' /> */}
            </Stack>
          </RootStyle>
      </Page>
  );
}

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout >{page}</Layout>;
};

