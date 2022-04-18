// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
import { styled } from '@mui/material/styles';
import {Container} from '@mui/material'
import SelectCvComponent from '../../src/sections/new-resume/SelectCv'
// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    },
  }));


export default function SelectCv() {

  return (
    <Page title="Select cv - ">
        <RootStyle>
            <Container sx= {{py: 2}}>
                <SelectCvComponent />
           </Container>
        </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

SelectCv.getLayout = function getLayout(page) {
  return <Layout disabledFooter >{page}</Layout>;
};