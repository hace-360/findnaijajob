import {useState, forwardRef, useEffect} from 'react';
import {Slide, Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'
import useSWR from 'swr';
import {LoadingScreen, ErrorScreen} from '../../../../src/components'

// 
import {EditEducation} from '../../../../src/sections/profile/Applicant/Education'




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update() {

  const router = useRouter()
  const [open, setOpen] = useState(true);
  const {data: education, error} = useSWR(`/education/${router.query.id}`)

  const handleClose = () => {
    router.back()
    setOpen(false);
  };


  if (!education) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen />
  }

  return (
    <ProfileCover title={`editing... ${router.query.id}`}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <EditEducation edu= {education} />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
