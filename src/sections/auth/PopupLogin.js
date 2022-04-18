import * as React from 'react';
import {Button, Paper, Typography, MenuItem, ListItemIcon, Box, Stack} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { Image, Iconify } from '../../components';
import { useSettings } from '../../hooks';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(true);
  const {user, userAction, setAlert} = useSettings()

  React.useEffect(() => {
    user ? setOpen(false) : setOpen(true)
  }, [user])

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={ user && handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <Paper
          variant= 'elevation'
          elevation= {0}
        >
          <Stack
            alignItems='center'
            justifyContent= 'center'
            component= 'div'
            sx= {{
              width: '100vw',
              maxWidth: '500px',
              height: '250px',
              display: 'flex',
            }}
          >
          <MenuItem onClick= {() => userAction.googleSignin({setAlert})} sx= {{bgcolor: 'grey.50024', '&:hover': { bgcolor: 'grey.50032' }}}>
            <ListItemIcon>
                <Image
                    alt="google icon"
                    src="https://zone-assets-api.vercel.app/assets/icons/ic_google.svg"
                    sx={{ width: 24, height: 24 }}
                />
            </ListItemIcon>
            <Typography variant= 'button' color= 'inherit'>
                    Continue with google
              </Typography>
          </MenuItem>
          </Stack>
        </Paper>
      </Dialog>
    </div>
  );
}
