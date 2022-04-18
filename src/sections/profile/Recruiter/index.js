import {useState, forwardRef} from 'react'
import { Divider, Stack, Card, Typography, Box, Slide, DialogActions, Dialog, DialogContent, Grid, DialogContentText, DialogTitle, Button, Link, Paper, CardContent } from '@mui/material';

import ProfileBanner from '../ProfileBanner'
import JobPost from './Job'
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import CareerJobItem from '../../@career/jobs/CareerJobItem';
import { useRequest, useSettings } from '../../../hooks';
import { JobItemSkeleton } from '../../../components/skeleton';
import {TextMaxLine} from '../../../components'
import PostedJob from './PostedJobs'
import useSWR from 'swr'



export default function Recruiter () {

 
  const {user} = useSettings()
  const { data: jobs = [], error } = useSWR(`/jobs`, {revalidateOnFocus: true});
  const [open, setOpen] = useState(false);
  const [jobId, setJobId] = useState('')

  const handleClickOpen = (id) => {
    setJobId(id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    
    return (
        <Stack
            spacing= {2}
        >
            <ProfileBanner />

          <Stack direction= 'row' spacing= {3}>
            <Grid item xs= {12} md= {4}>
              <Stack spacing= {3}>

              <Card variant= 'outlined'>
              <CardContent>
                <Stack 
                  spacing={2}
                  direction= 'row'
                  justifyContent= 'space-between'
                  divider= {<Divider flexItem orientation='vertical' />}
                >
                  <Stack alignItems= 'center'>
                    <Typography variant= 'h3'>
                      {jobs ? jobs.length : '0'}
                    </Typography>
                    <Typography variant= 'body3' color= 'text.grey'>
                      Jobs
                    </Typography>

                  </Stack>

                  <Stack alignItems= 'center'>
                    <Typography variant= 'h3'>
                      1,230
                    </Typography>
                    <Typography variant= 'body3' color= 'text.grey'>
                      Applicants
                    </Typography>

                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant= 'outlined'>
              <CardContent>
              <Stack spacing={3}>

                <Typography variant= 'button' sx={{ fontSize: 14 }} color="text.secondary" >
                  About
                </Typography>

                <TextMaxLine line= {10}>
                <Typography variant="body3">
                    { user?.about || 'These shows a little introduction about you...' }
                </Typography>
                </TextMaxLine>

                <Stack spacing={1}>
                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <EmailIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      { user?.email || '@' }
                    </Typography>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LocationOnIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      Lives at <Link> {user?.address?.street || ''}, {user?.address?.state || ''}, {user?.address?.country || ''} </Link>
                    </Typography>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <BusinessCenterIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                    {user?.title || ''} at <Link>{ user?.company?.industry || '' }</Link>
                    </Typography>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LocalPhoneIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                    <Link>{ user?.phone || '' }</Link>
                    </Typography>
                  </Stack>
                </Stack>

                </Stack>
              </CardContent>
            </Card>


            <Card variant= 'outlined'>
              <CardContent>
              <Stack spacing={2}>

                <Typography variant= 'button' sx={{ fontSize: 14 }} color="text.secondary" >
                  Social Links
                </Typography>

                <Stack spacing={1}>
                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <FacebookIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit' target= '_black'>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://facebook.com/${user?.social?.facebook || ''}`}
                    </Typography>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <TwitterIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://twitter.com/${user?.social?.twitter || ''}`}
                    </Typography>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LinkedInIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://linkedin.com/${user?.social?.linkedin || ''}`}
                    </Typography>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <InstagramIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://instagram.com/${user?.social?.instagram || ''}`}
                    </Typography>
                    </Link>
                  </Stack>
                </Stack>

                </Stack>
              </CardContent>
            </Card>
            
            </Stack>
            </Grid>


            {/* Job section */}
            <Grid item xs= {12} md= {8}>
              <Stack spacing= {2}>
                <Paper sx= {{p: 2}}>
                  <Stack spacing= {1}>

                    <Typography variant= 'h4'>
                      Jobs
                    </Typography>
                    <Divider />
                    {
                      !jobs || jobs.length == 0 ?
                      <Typography variant= 'body3'>
                        there are no jobs to display
                      </Typography> : 
                      jobs.map((job, index) => (
                        <Box key = {index} sx= {{width: '100%'}}>
                          <PostedJob key={job.id} job={job} deleteJob= {() => handleClickOpen(job.id)} />
                        </Box>
                      ))
                    }

                  </Stack>
                </Paper>
              </Stack>
            </Grid>
          </Stack>
            
          <DeleteJob handleClose={handleClose} open= {open} id= {jobId} />
        </Stack>
    )
}




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

// ------------------------
function DeleteJob({open, handleClose, id}) {

  const {data: job, error} = useSWR(`/jobs/${id}`)

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>
            <Typography variant= 'body2'>
                Are you sure you want to delete this Job ?
            </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {'  '}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx= {{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleClose}>Disagree</Button>
            <Button color= 'error' onClick={handleClose}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}