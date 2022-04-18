// next
import { useRouter } from 'next/router';
// @mui
import { Typography, Chip, Box } from '@mui/material';
import useSWR from 'swr'

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function BlogSidebarPopularTags() {

  const {data: posts} = useSWR('/blogs')
  let tags = posts ? posts.map(post => post.tags) : []
  tags = Array.from(new Set(tags.flat()))
  tags = tags.map(tag => ({label: tag, path: `/blog/category/${tag}`}))
  const router = useRouter();

  const onClick = (href) => {
    router.push(href);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Popular Tags
      </Typography>

      {tags && tags.slice(0, 10).map((tag) => (
        <Chip key={tag.label} label={tag.label} sx={{ m: 0.5 }} onClick={() => onClick(tag.path)} />
      ))}
    </Box>
  );
}
