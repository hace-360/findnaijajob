// @mui
import { styled } from '@mui/material/styles';
import {Container} from '@mui/material';
// layouts
import Layout from '../../src/layouts';
// components
import { Page } from '../../src/components';
// sections
import { CheckoutComplete } from '../../src/sections/checkout';
import { useResponsive, useSettings } from '../../src/hooks';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function CheckoutPage() {

  const {user} = useSettings()

  return (
        <RootStyle title="invoice - ">
        <Container sx= {{p: 1}}>
            <CheckoutComplete user={user} />
        </Container>
        </RootStyle>
  );
}

// ----------------------------------------------------------------------

CheckoutPage.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
