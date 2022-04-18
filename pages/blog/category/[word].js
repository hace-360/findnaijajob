import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../src/config';
// _data
import _mock from '../../../_data/mock';
// layouts
import Layout from '../../../src/layouts';
// components
import { Page, SearchInput, LoadingScreen, ErrorScreen } from '../../../src/components';
// sections
import { NewsletterCareer } from '../../../src/sections/newsletter';
import { BlogCareerPostList, BlogSidebar } from '../../../src/sections/blog';
import useSWR from 'swr'
import {useRouter} from 'next/router'

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function BlogPage() {

    const router = useRouter()
    const {word} = router.query
  const {data: posts, error} = useSWR(() => word ? `/blogs/query/${word}` : '')

  if (!posts) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen />
  }


  return (
    <Page title="Blog/category -">
      <RootStyle>
        <SearchInput
          sx={{
            mx: 2.5,
            display: { xs: 'flex', md: 'none' },
            my: { xs: 4, md: 0 },
          }}
        />

        <Container
          sx={{
            mt: { xs: 4, md: 10 },
          }}
        >
          <Grid container spacing={{ md: 8 }}>
            <Grid item xs={12} md={8}>
              <BlogCareerPostList posts={posts} />
            </Grid>

            <Grid item xs={12} md={4}>
              <BlogSidebar
                recentPosts={{
                  list: posts.slice(-4),
                  path: '/blog',
                }}
                advertisement={{
                  title: 'Advertisement',
                  description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
                  imageUrl: _mock.image.career(10),
                  path: '#',
                }}
              />
            </Grid>
          </Grid>
        </Container>
        <NewsletterCareer />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

BlogPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
