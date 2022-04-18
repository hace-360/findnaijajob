import {useState, forwardRef} from 'react';
import {Slide, Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'

// 
import {EditCertificates} from '../../../../src/sections/profile/Applicant/Certificates'




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
    <ProfileCover title= 'Certificate - '>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
            <EditCertificates />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
