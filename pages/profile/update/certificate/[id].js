import {useState, forwardRef} from 'react';
import {Slide, Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'
import useSWR from 'swr';
import {LoadingScreen, ErrorScreen} from '../../../../src/components'
// 
import {EditCertificates} from '../../../../src/sections/profile/Applicant/Certificates'




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update() {

  const router = useRouter()
  const {id} = router.query
  const [open, setOpen] = useState(true);
  const {data: certificate, error} = useSWR(`/certificate/${id}`, {revalidateOnFocus: true, initialData: null})

  const handleClose = () => {
    router.back()
    setOpen(false);
  };


  if (!certificate) {
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
            <EditCertificates cert= {certificate} />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
