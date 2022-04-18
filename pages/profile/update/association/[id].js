import {useState, forwardRef, useEffect} from 'react';
import {Slide, Dialog, DialogContent} from '@mui/material'
import ProfileCover from '../../index' 
import {useRouter} from 'next/router'
import useSWR from 'swr';
import {LoadingScreen, ErrorScreen} from '../../../../src/components'
// 
import {EditAssociations} from '../../../../src/sections/profile/Applicant/Associations'




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update() {

  const router = useRouter()
  const {id} = router.query
  const [open, setOpen] = useState(true);
  const {data: association, error} = useSWR(`/association/${id}`, {revalidateOnFocus: true, initialData: null})

  const handleClose = () => {
    router.back()
    setOpen(false);
  };


  if (!association) {
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
            <EditAssociations ass= {association} />
        </DialogContent>
      </Dialog>
      </ProfileCover>
  );
}
