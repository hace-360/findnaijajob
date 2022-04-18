import {useState, forwardRef, useEffect} from 'react';
import {Slide, Dialog, DialogContent, Container} from '@mui/material'
import ProfileCover from '../[id]' 
import {useRouter} from 'next/router'
import useSWR from 'swr';
import {LoadingScreen, ErrorScreen} from '../../../src/components'
// 
import ApplicatioForm from '../../../src/sections/profile/Recruiter/Job/ApplicationForm'
import {useSettings} from '../../../src/hooks' 




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Update() {

  const router = useRouter()
  const {user} = useSettings()
  const {id} = router.query
  const [open, setOpen] = useState(true);
//   const {data: association, error} = useSWR(`/association/${id}`, {revalidateOnFocus: true, initialData: null})

  const handleClose = () => {
    router.back()
    setOpen(false);
  };
  useEffect(() => {
    const securePage = () => {
      !user || user.accountType !== 'applicant' && router.back()
    }
    securePage()
  }, [user])


//   if (!association) {
//     return <LoadingScreen />
//   }

//   if (error) {
//     return <ErrorScreen />
//   }

  return (
    <ProfileCover title={`Applying`}>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Container maxWidth= {false} sx= {{width: '800px', maxWidth: '100%'}}>
            <ApplicatioForm jobId= {id} />
        </Container>
      </Dialog>
      </ProfileCover>
  );
}
