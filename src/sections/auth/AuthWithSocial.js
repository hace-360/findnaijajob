// icons
import logoFacebook from '@iconify/icons-carbon/logo-facebook';
// import logoGithub from '@iconify/icons-carbon/logo-github';
// @mui
import { Stack, Button } from '@mui/material';
// components
import { Image, Iconify } from '../../components';
import {useSettings} from '../../hooks'
import LinkedinLogin from './linkedinLogin'

// ----------------------------------------------------------------------

export default function AuthWithSocial() {

  const {userAction, setAlert} = useSettings()


  return (
    <Stack direction="row" spacing={2}>
      <Button
        fullWidth
        size="large"
        color="inherit"
        variant="contained"
        sx={{ bgcolor: 'grey.5008', '&:hover': { bgcolor: 'grey.50024' } }}
        onClick= {() => userAction.googleSignin({setAlert})}
      >
        <Image
          alt="google icon"
          src="https://zone-assets-api.vercel.app/assets/icons/ic_google.svg"
          sx={{ width: 24, height: 24 }}
        />
      </Button>

      <LinkedinLogin />

      {/* <Button
        fullWidth
        size="large"
        color="inherit"
        variant="contained"
        sx={{ bgcolor: 'grey.5008', '&:hover': { bgcolor: 'grey.50024' } }}
        onClick= {() => userAction.facebookSignin({setAlert})}
      >
        <Iconify icon={logoFacebook} sx={{ color: '#1877F2', width: 24, height: 24 }} />
      </Button> */}

      {/* <Button
        color="inherit"
        fullWidth
        variant="contained"
        size="large"
        sx={{ bgcolor: 'grey.5008', '&:hover': { bgcolor: 'grey.50024' } }}
      >
        <Iconify icon={logoGithub} sx={{ color: 'text.primary', width: 24, height: 24 }} />
      </Button> */}
    </Stack>
  );
}
