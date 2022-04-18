import Layout from '../../src/layouts';
import { Page } from '../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
import { styled } from '@mui/material/styles';
import {Container} from '@mui/material'
import FinalCV from '../../src/sections/new-resume/FinalCv'

// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    },
  }));


export default function final() {

  return (
    <Page title="Finalize CV -">
      <Container sx= {{py: 4}}>
        <RootStyle>
            <FinalCV />
        </RootStyle>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------

final.getLayout = function getLayout(page) {
  return <Layout simpleFooter >{page}</Layout>;
};

