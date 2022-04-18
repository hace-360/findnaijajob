import {useState, forwardRef } from 'react';
import {Slide, Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'

// 
import {EditEducation} from '../../../../src/sections/profile/Applicant/Education'




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
            <EditEducation />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
