import {Typography, Paper, Stack} from '@mui/material'
import {IconButtonAnimate} from '../../../components'
import FilePresentIcon from '@mui/icons-material/FilePresent';
import {useRouter} from 'next/router'


export default function CvTemplate ({animate}) {

    const router = useRouter()

    return (
        <IconButtonAnimate
            fullWidth
            sx= {{
                borderRadius: '5px',
                width: '100%',
            }}
        >
        <Paper 
            variant= 'outlined' 
            sx= {{width :'100%', border: !animate && '4px solid #00AB55'}}
            onClick= {() => router.push('/resume/section/contact')}
        >
                <Stack spacing= {2} alignItems= 'center' justifyContent='center' sx= {{height: 320}}>
                    <FilePresentIcon sx= {{fontSize: '70px'}} />
                    <Typography variant= 'h5'>
                        Create A New CV
                    </Typography>

                    <Typography variant= 'body2' sx= {{textAlign: 'center'}}>
                        We will help you create a CV
                    </Typography>
                </Stack>
        </Paper>
        </IconButtonAnimate>
    )
}