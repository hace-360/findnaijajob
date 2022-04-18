import {Typography, Stack, Box, Container, Grid, Button} from '@mui/material' 
import {useRouter} from 'next/router'


const bgImage = 'https://www.pertemps.co.uk/media/1573/coveringletter-3.jpg'

export default function CoverLetter () {

    const router = useRouter()

    return (
        <Container
            sx= {{
                borderRadius: '100px 0 100px 0',
                bgcolor: '#639CC9',
            }}
        >
            <Grid container sx={{ p: 6 }} spacing= {3} alignItems= 'center'>
                <Grid item xs= {12} md= {6.5}>
                    <Stack sx= {{maxWidth: '80%'}} spacing= {4}>
                        <Typography variant= 'h2'>
                            Craft a compelling cover letter in just 15 minutes
                        </Typography>

                        <Typography variant= 'button' color= 'white'>
                        A strong cover letter is the one thing that will help you stand out from the crowd and beat the competition for the role you are applying for. We have created 100s of cover letter templates to help alleviate the pressure and ease overwhelm. In just 15 minutes, you can have a ready-to-go, job-winning cover letter to go with your CV.
                        </Typography>

                        <Button 
                           onClick= {() => router.push('/cover-letter')}
                           sx ={{
                            bgcolor: '#272B6B',
                            color: 'white',
                            borderRadius: '50px',
                            transition: '0.3s',
                            height: 60,
                            '&:hover': {
                                transform: 'translateY(-10px)',
                                bgcolor: '#272B6B',
                                color: 'white',
                                borderBottom: '10px solid white',
                                transition: '0.3s'
                            }
                        }}
                            size= 'large'
                        >
                            build my cover letter
                        </Button>

                    </Stack>
                </Grid>
                
                <Grid item xs= {12} md= {5.5}>
                  <Box component= 'img' src={bgImage} alt="BG-image" sx= {{
                      width: '100%',
                      objectFit: 'cover',
                      height: 500
                  }}/>  
                </Grid>
                
            </Grid>
        </Container>
    )
}
