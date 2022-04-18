import {useState, forwardRef, useEffect} from 'react';
import {Slide,Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'

// 
import {EditCoverLetter} from '../../../../src/sections/profile/Applicant/CoverLetter'




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update() {

  const router = useRouter()
  const [open, setOpen] = useState(true);


  const handleClose = () => {
    router.back()
    setOpen(false);
  };

  return (
    <ProfileCover>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <EditCoverLetter />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
