import PropTypes from 'prop-types';
// @mui
import { Pagination, Box, Grid, Stack, Divider, Typography } from '@mui/material';
// components
import { JobItemSkeleton } from '../../../components/skeleton';
//
import CareerJobItem from './CareerJobItem';
import { Advertisement01 } from '../../advertisement';
import _mock from '../../../../_data/mock';
import { useState, useEffect } from 'react';
import {useRouter} from 'next/router'
import {m} from 'framer-motion'


// ----------------------------------------------------------------------


export default function CareerJobList({ jobs, loading }) {


  const perPage = 8
  const router = useRouter()
  const [page, setPage] = useState({number: 1, from: 0, to: 8})
  const handleChange = (event, value) => {
    setPage({
      number: value,
      to: value*perPage,
      from: (value-1)*perPage
    })
    window.scrollTo(0, 0);
  } 
  
  const [totalPage, setTotalPage] = useState(1)

  const getTotalPage = () => (
    jobs && jobs.length > perPage ? setTotalPage(Math.ceil(jobs.length/perPage)) : setTotalPage(1)
  )
  useEffect(() => {
    getTotalPage()
  },[ jobs, router])

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} md={8} sx= {{pb: 3}}>
        <m.div
          key= {page.number}
          initial={{ opacity: 0, transform: 'translateX(-100%)' }}
          whileInView={{ opacity: 1, transform: 'translateX(0%)' }}
          viewport={{ once: true }}
        >

       <Stack
        spacing= {2}
        alignItems= 'flex-start'
        divider= {<Divider flexItem />}
       >
         {
           loading ? 
           [...Array(4)].map((job, index) => (
            <JobItemSkeleton key={index} />
           )) : 
           !loading && !jobs || jobs.length == 0 ? 
           <Typography sx= {{ p: 1, paddingBottom: 10 }}>
              There are no available jobs in this category
            </Typography> :
            jobs.slice(page.from, page.to).map((job, index) => <Box key={index} sx= {{width: '100%'}}> <CareerJobItem job={job} /> </Box>) 
         }
         
       </Stack>
       </m.div>

       <Pagination
        count={totalPage}
        page={page.number}
        onChange={handleChange}
        color="primary"
        size="large"
        sx={{
          pt: 10,
          pb: { xs: 10, md: 15 },
          '& .MuiPagination-ul': {
            justifyContent: 'center',
          },
        }}
      />
      </Grid>
      <Grid item xs={12} md={4}>
      <Stack spacing= {2}>
          <Advertisement01
            advertisement={{
              title: 'Advertisement',
              description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
              imageUrl: _mock.image.career(2),
              path: '#',
            }}
          />
          <Advertisement01
            advertisement={{
              title: 'Advertisement',
              description: 'Duis leo. Donec orci lectus, aliquam ut, faucibus non',
              imageUrl: _mock.image.career(2),
              path: '#',
            }}
          /> 
        </Stack>
      </Grid>
    </Grid>
     </>
  );
}
