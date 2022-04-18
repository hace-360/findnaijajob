import PropTypes from 'prop-types';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Link, Typography, Box } from '@mui/material';
import useSWR from 'swr'

// ----------------------------------------------------------------------

export default function BlogSidebarCategories() {

  const {data: posts} = useSWR('/blogs')
  let categories = posts ? posts.map(post => post.category) : []
  categories = Array.from(new Set(categories))
  categories = categories.map(cat => ({name: cat, path: `/blog/category/${cat}`}))

  return (
    <Stack spacing={1}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      {categories && categories.map((category) => (
        <CategoryItem key={category.name} category={category} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

CategoryItem.propTypes = {
  category: PropTypes.shape({
    name: PropTypes.string,
    path: PropTypes.string,
  }),
};

function CategoryItem({ category }) {
  const { name, path } = category;

  return (
    <Stack key={name} direction="row" alignItems="center">
      <Box sx={{ width: 6, height: 6, mr: 2, bgcolor: 'primary.main', borderRadius: '50%' }} />
      <NextLink href={path} passHref>
        <Link variant="body2" color="inherit">
          {name}
        </Link>
      </NextLink>
    </Stack>
  );
}
