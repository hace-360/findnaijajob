// @mui
import { styled } from '@mui/material/styles';
import { Divider } from '@mui/material';
// utils
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// _data
import { _testimonials} from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { NewsletterMarketing } from '../src/sections/newsletter';
import { BlogCareerLatestPosts } from '../src/sections/blog';
import { TestimonialsCareer } from '../src/sections/testimonials';
import { MarketingAbout } from '../src/sections/@career';
import useSWR from 'swr'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------



export default function CareerAboutUsPage() {

  const {data: posts= []} = useSWR('/blogs')

  return (
    <Page title="About Us-">
      <RootStyle>
        <MarketingAbout />

        {/* <MarketingAboutOurVision /> */}

        <Divider orientation="vertical" sx={{ height: 40, width: 40, mx: 'auto' }} />

        {/* <TeamCareerAbout members={_members} /> */}

        <TestimonialsCareer testimonials={_testimonials} />

        {/* <OurClientsCareer brands={_brandsColor} /> */}

        {posts && posts.length > 0 && <BlogCareerLatestPosts posts={posts.slice(0, 5)} />}

        <NewsletterMarketing />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerAboutUsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
