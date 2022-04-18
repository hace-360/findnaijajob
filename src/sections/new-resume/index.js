import {Container, Stack, Typography, Button} from '@mui/material'
import {useRouter} from 'next/router'
import { useTheme } from '@mui/material/styles';

// ---------------------------------------------------------------------


export default function CvBuilder() {

  const theme = useTheme()
  const router = useRouter()
  const isLight = theme.palette.mode === 'light';

  return (
        <Container sx= {{py: 2, bgcolor: isLight && '#B9DEAA'}} maxWidth= {false}>
            <Stack spacing= {2} direction= 'row' alignItems='center' justifyContent= 'center'>
                <img
                    src= {isLight ? "https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/zoom_tool_gif_for_dribbble.gif?alt=media&token=372045e4-e411-4489-9ac6-980a3906a8b3"  : "https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/resume4.gif?alt=media&token=057272bd-008c-47e3-9b5e-ac5f11e0a060"}
                    alt="CV-check"
                    style= {{
                        width: '100%',
                        objectFit: 'cover',
                        maxWidth: '700px',
                        marginLeft: '-100px'
                    }}
                    />

                <Stack spacing= {3}>
                    <Typography variant= 'h1'>
                        Build your perfect CV
                    </Typography>
                    <Typography variant= 'h4'>
                        Get expert tips to guide you through every step of the process.
                    </Typography>
                    
                    <Button 
                        variant= 'contained'
                        sx ={{
                            color: 'white',
                            borderRadius: '50px',
                            maxWidth: '500px',
                            transition: '0.3s',
                            height: 60,
                            '&:hover': {
                                transform: 'translateY(-6px)',
                                color: 'white',
                                borderBottom: '6px solid white',
                                transition: '0.3s'
                            }
                        }}
                            size= 'large'
                            onClick= {() => router.push('/resume/choose-template')}
                        >
                           Start Now
                        </Button>

                </Stack>
            </Stack>
        </Container>
  );
}
