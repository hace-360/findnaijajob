import {useEffect, useState} from 'react';
import {Snackbar, Typography,Alert} from '@mui/material';
import { useSettings } from '../hooks';



export default function ShowAlert () {

  const {alert, setAlert} = useSettings()
  const [open, setOpen] = useState(false)
  const handleClose = (e, reason) => {
      if (reason === 'clickaway') {
          return
      }
      else {
        setOpen(false)
        setTimeout(() => setAlert({}), 200)
      }
  }

  useEffect(() => {
      const getAlert = () => alert && alert.message && setOpen(true)
      getAlert()
  }, [alert])

  return (
    <div style= {{
      maxWidth: '500px'
    }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        onClose={handleClose}
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
        <Alert onClose={handleClose} color= { alert && alert.type === 'error' ? 'error' : 'primary'} sx={{ width: '100%' }} variant="filled">
           <Typography variant= 'p' sx= {{color: 'inherit'}}>
                {alert && alert.message}
           </Typography> 
        </Alert>
      </Snackbar>
    </div>
  );
}