import PropTypes from 'prop-types';
import Head from 'next/head';
import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, meta, title, ...other }, ref) => (
  <>
    <Head>
      <title>{`${title} | FindNaijaJob`}</title>
        {meta?.title && <meta property="og:title" content={`${meta?.title || ''}`} />}
        {meta?.type &&  <meta property="og:type" content="website" />}
        {meta?.url && <meta property="og:url" content={`${meta?.url}`} />}
        <meta property="og:image" content={`${meta?.image}` || 'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2017/06/20051037/Job-Interview-Etiquette-Everyone-Should-Know-and-Follow.jpg'} />
        {meta?.description && <meta property="og:description" content={`${meta?.description}`} />}
    </Head>

    <Box ref={ref} {...other}>
      {children}
    </Box>
  </>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  meta: PropTypes.node,
  title: PropTypes.string.isRequired,
};

export default Page;
