import PropTypes from 'prop-types';
// @mui
import { Stack } from '@mui/material';
// hooks
import { useResponsive } from '../../hooks';
// components
import { SearchInput } from '../../components';
//
import { Advertisement01 } from '../advertisement';
import BlogSidebarAuthor from './BlogSidebarAuthor';
import BlogSidebarCategories from './BlogSidebarCategories';
import BlogSidebarPopularTags from './BlogSidebarPopularTags';
import BlogSidebarRecentPosts from './BlogSidebarRecentPosts';
import {useState} from 'react'
import {useRouter} from 'next/router'

// ----------------------------------------------------------------------

BlogSidebar.propTypes = {
  advertisement: PropTypes.object,
  author: PropTypes.object,
  recentPosts: PropTypes.object,
  sx: PropTypes.object,
};

export default function BlogSidebar({ author, recentPosts, advertisement, sx, ...other }) {

  const router = useRouter()
  const isDesktop = useResponsive('up', 'md');
  const [word, setWord] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    router.push(`/blog/category/${word}`)
    setWord('')
  }

  return (
    <>
      {author && isDesktop && <BlogSidebarAuthor author={author} />}

      {isDesktop && 
      <form onSubmit={handleSubmit}>
      <SearchInput 
        onChange= {(e) => setWord(e.target.value)}
      />
      </form>
      }

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 0 },
          ...sx,
        }}
        {...other}
      >
        <BlogSidebarCategories />
        <BlogSidebarRecentPosts recentPosts={recentPosts} />
        <BlogSidebarPopularTags />
        <Advertisement01 advertisement={advertisement} />
      </Stack>
    </>
  );
}
