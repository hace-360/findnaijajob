import { styled } from '@mui/material/styles';
import { Box, Container, Typography} from '@mui/material';
import Layout from '../../src/layouts';
import { Page } from '../../src/components'
import { PricingPlan01Card } from '../../src/sections/pricing';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function Pricing01Page() {

  return (
    <Page title="Payment - ">
      <RootStyle>
        <Container>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ mt: 2, mb: 3, mx: 'auto', maxWidth: 480 }}>
              {`Flexible Plans For Your Needs`}
            </Typography>

            <Typography sx={{ color: 'text.secondary' }}>
              Upgrade for Instant Access to All Features
            </Typography>
          </Box>

          <Box
            sx= {{
              py: 4
            }}
          >
            <PricingPlan01Card />
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

Pricing01Page.getLayout = function getLayout(page) {
  return (
    <Layout simpleHeader disabledFooter>
      {page}
    </Layout>
  );
};
