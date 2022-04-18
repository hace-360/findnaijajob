// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
import { styled } from '@mui/material/styles';
import Template from '../../src/sections/new-resume/ChoseTemplate'

// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    },
  }));


export default function ChoseTemplate() {

  return (
    <Page title="Chose a template">
        <RootStyle>
            <Template />
        </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ChoseTemplate.getLayout = function getLayout(page) {
  return <Layout disabledFooter >{page}</Layout>;
};