import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Divider, Stack, Avatar, Chip } from '@mui/material';
import useSWR from 'swr'
// routes
import Routes from '../../src/routes';
// utils
import { fDate } from '../../src/utils/formatTime';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, LoadingScreen,ErrorScreen } from '../../src/components';
import {
  ShareButton,
  Breadcrumbs,
  SocialsButton,
  FavoriteButton,
} from '../../src/components';
// sections
import { NewsletterCareer } from '../../src/sections/newsletter';
import { BlogAuthorInfo, BlogCareerLatestPosts } from '../../src/sections/blog';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

export default function CareerPostPage() {
  const router = useRouter()
  const {slug} = router.query
  const id = slug && slug?.split('&')[1]
  const {data: posts= []} = useSWR('/blogs')
  const {data: post= {}, error: error} = useSWR(() => id ? `/blogs/${id}` : '', {revalidateOnFocus: true, initialData: {}})

  const [favorite, setFavorite] = useState(post?.favorited || '');
  
  const handleChangeFavorite = (event) => {
    setFavorite(event.target.checked);
  };

  if (!post) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen />
  }

  return (
    <Page title={`${post?.title || ''} - Post | Career`}>
      <RootStyle>
        <Divider />

        <Container>
          <Breadcrumbs
            sx={{ my: 3 }}
            links={[
              { name: 'Home', href: '/' },
              { name: 'Blog', href: Routes.posts },
              { name: post?.title || '' },
            ]}
          />
        </Container>
        <Divider />

        <Container>
          <Grid container spacing={3} justifyContent={{ md: 'center' }}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h2"
                component="h1"
                sx={{
                  pb: 6,
                  pt: { xs: 6, md: 10 },
                }}
              >
                {post?.title || ''}
              </Typography>

              <Stack direction="row" justifyContent="space-between" spacing={1.5}>
                <Avatar src={post?.author?.picture || ''} alt= {post?.author?.name || ''} sx={{ width: 48, height: 48 }} />
                <Stack spacing={0.5} flexGrow={1}>
                  <Typography variant="subtitle2">{post?.author?.name || ''}</Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ typography: 'caption', color: 'text.disabled' }}
                  >
                    { post?.createdAt && fDate(post?.createdAt)}
                    <DotStyle />
                    {post?.duration}
                  </Stack>
                </Stack>

                <Stack direction="row" alignItems="center">
                  <ShareButton links= {post?.shareLink || {}} />
                  <FavoriteButton checked={post?.favorite || ''} onChange={handleChangeFavorite} />
                </Stack>
              </Stack>

              <Divider sx={{ my: 6 }} />

             <Typography variant="h5" sx={{ mb: 5 }}>
                {post?.description || ''}
              </Typography>
                <div
                  dangerouslySetInnerHTML={{__html: post?.content}}
                />

              <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Tags:
                </Typography>
                {post?.tags && post?.tags.map((tag) => (
                  <Chip key={tag} size="small" label={tag} sx={{ m: 0.5,textTransfrom: 'capitalize' }} onClick={() => {}} />
                ))}
              </Stack>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Share:
                </Typography>
                <SocialsButton initialColor links={post?.shareLink || {}} simple={false} />
              </Stack>

              <Divider sx={{ mt: 8 }} />

              <BlogAuthorInfo author={post?.author || ''} />
            </Grid>
          </Grid>
        </Container> 

        <Divider />

        {posts && <BlogCareerLatestPosts posts={ posts ? posts.slice(0, 5) : []} />}
        <NewsletterCareer />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CareerPostPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

