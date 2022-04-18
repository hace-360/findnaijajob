import {Stack, Typography, Button, Box} from '@mui/material'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CreateCv from './CreateNewCv'
import UploadCv from './UploadCv'
import {useState} from 'react'
import {useRouter} from 'next/router'
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components'



export default function SelectCV () {

    const [animate, setAnimate] = useState(false)
    const router = useRouter()

    return (
        <>
            <Stack alignItems= 'center' justifyContent='center' sx= {{width: '100%'}} spacing= {3}>
                <Typography variant= 'button' sx= {{fontSize: '30px', color: '#002D6B'}} >
                  {
                      animate ? 'Good! You already have a Resume, Lets make it even Better ' : 'How do you want to start?'
                  }
                </Typography>

                <Stack direction= 'row' alignItem= 'center' sx= {{width: '100%', py: 4}} spacing= {3} justifyContent= 'center'>
                    <Box
                        sx= {{
                            width: '100%',
                            transform:animate ? 'translateX(50%)' : 'translateX(0%)',
                            transition: '0.5s',
                            opacity: animate ? 0 : 1
                        }}
                    >
                       <CreateCv animate= {animate} /> 
                    </Box>
                    
                    <Box
                        sx= {{
                            width: '100%',
                            transform: animate ? 'translateX(-50%)' : 'translateX(0%)',
                            transition: '0.5s'
                        }}
                    >
                    {animate && 
                        <Box
                            sx= {{
                                position: 'absolute',
                                top: '10px',
                                right: '10px',
                                zIndex: 2,
                                cursor: 'pointer'
                            }}
                        >
                        <IconButtonAnimate onClick= {() => setAnimate(false)}>
                        <CloseIcon 
                            color= 'error'
                            fontSize= 'large'
                        />
                        </IconButtonAnimate>
                        </Box>
                        }

                        <UploadCv animate= {animate} setAnimate= {setAnimate} />
                    </Box>
                </Stack>
            </Stack>
            <Stack alignItems= 'center' justifyContent= 'space-between' direction= 'row'>
                <Button onClick= {() => router.back()} variant= 'outlined' size= 'large' startIcon= {<ArrowBackIosIcon />}>
                    Back
                </Button>

                <Button onClick= {() => router.push('/resume/section/contact')} variant= 'contained' size= 'large' endIcon= {<ArrowForwardIosIcon />}>
                    Next
                </Button>
            </Stack>
        </>
    )
}
