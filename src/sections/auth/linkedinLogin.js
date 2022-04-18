import { Button } from '@mui/material';
import { Iconify,Image } from '../../components';


export default function LinkedInPage () {

  const linkedinLogin = () => {
    const url = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.linkedin_client_id}&redirect_uri=${process.env.NODE_ENV == 'development' ? 'http://localhost:5050/api/account/linkedin' : 'https://api.findnaijajob.com/api/account/linkedin'}&scope=r_emailaddress&state=FCtS6qAHMGiiByX4S5WJ`
    window.location.href = url
  }

  return (
    <Button
        color="inherit"
        fullWidth
        variant= 'contained'
        size="large"
        onClick={linkedinLogin}
        sx={{ bgcolor: 'grey.5008', '&:hover': { bgcolor: 'grey.50024' }, p: 0 }}
      >
        <Image
          alt="google icon"
          src="https://www.freeiconspng.com/thumbs/linkedin-logo-png/linkedin-logo-3.png"
          sx={{ width: 24, height: 24 }}
        />
      </Button>
  );
}