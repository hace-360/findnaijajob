// layouts
import Layout from '../../../src/layouts';
// components
import { Page } from '../../../src/components';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
import { styled } from '@mui/material/styles';
import Information from '../../../src/sections/new-resume/Information'
import { useRouter } from 'next/router';

// ---------------------------------------------------------------------
const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    },
  }));


export default function Index() {

  const router = useRouter()
  const {current} = router.query

  return (
    <Page title={`${current ? current : 'Loading...'} - `}>
        <RootStyle>
            <Information current= {current} />
        </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

Index.getLayout = function getLayout(page) {
  return <Layout simpleHeader disabledFooter >{page}</Layout>;
};