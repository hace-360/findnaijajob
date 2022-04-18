import PropTypes from 'prop-types';
import { useState } from 'react';
// icons
import contentDeliveryNetwork from '@iconify/icons-carbon/content-delivery-network';
// @mui
import { MenuItem, Box, Popover, Badge, Typography, Divider, Paper, Stack, Avatar } from '@mui/material';
// components
import { Iconify, TextMaxLine } from '../components';
import { IconButtonAnimate } from '../components/animate';
import NotificationsIcon from '@mui/icons-material/Notifications';
import {useSettings} from '../hooks'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import useSWR from 'swr'

// ----------------------------------------------------------------------


export default function LanguagePopover({ sx }) {
  const [currentLang, setCurrentLang] = useState('en');

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const {application, jobs} = useSettings()


  return (
    <>
      <IconButtonAnimate color="inherit" onClick={handleOpen} sx= {sx}>
        <Badge badgeContent={0} showZero color="primary">
          <NotificationsIcon color= 'inherit' sx={{ width: 25, height: 25 }} />
        </Badge>
      </IconButtonAnimate>
    

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { px: 1.5, width: 320 },
          variant: 'outlined'
        }}
      >
        <Stack spacing= {2} sx= {{py: 2}}>
        <Stack spacing= {1} >
          <Typography variant= 'body1' color= 'secondary'>
            Notification
          </Typography>

          <Typography variant= 'body3' >
            You have 0 undread messages
          </Typography>
        </Stack>
        <Divider flexItem />

        <Stack spacing= {1} direction= 'row' alignItems='center'>
          <Typography variant= 'overline' color= 'primary' >
            NEW
          </Typography>

          <Typography variant= 'body3' color= 'inherit' >
            message
          </Typography>
        </Stack>
        <Divider flexItem />

        {/* {
          jobs && jobs.length > 0 &&
          jobs.map((job, index) => (
            <ApplicantNotify key= {index} jobId= {job.id} userId= {app.user} />
          ))
        } */}

        </Stack>
      </Popover>
    </>
  );
}


const ApplicantNotify = ({jobId, userId}) => {

  const {data: user} = useSWR(() => userId ? `/profile/${userId}` : '', {initialData: null, revelidateOnFocus: true})
  const {data: job} = useSWR(() => jobId ? `/job/${jobId}` : '', {initialData: null, revelidateOnFocus: true})

  return (
    <>
    <MenuItem sx= {{width: '100%'}}>
          <Stack
          direction= 'row' alignItems= 'center'
          spacing= {2}
        >
          <Avatar
            src= {user?.photoURL || ''}
            alt= {user?.firstName || ''}
            size= {{ width: 30, height: 30 }}
          />

          <Stack spacing= {1}  direction= 'row' alignItems= 'center'>
            <Typography variant= 'button' color= 'inherit'>
             {user && user?.firstName || ''}
            </Typography>

            <ArrowForwardIosIcon sx= {{ fontSize: '13px' }}/>

            <Typography variant= 'body3' color= 'primary'>
             web developer
            </Typography>


        </Stack>
        </Stack>
        </MenuItem>
      </>
  )
}