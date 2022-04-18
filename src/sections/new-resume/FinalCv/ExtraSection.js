import {Stack, Checkbox, FormControlLabel, Button,MenuItem, Typography } from '@mui/material'
import {useRouter} from 'next/router'



export default function ExtraSection () {

    const router = useRouter()

    return (
        <Stack>
            {
                sections.map((sec, index) => (
                    <MenuItem key= {index}>
                    {/* <FormControlLabel 
                        onClick= {() => router.push(`/resume/section/${sec}`)}
                        control={<Checkbox />} 
                        label= {sec} 
                    /> */}
                    <Stack direction= 'row' alignItems= 'center' spacing= {0.5}>
                    <Checkbox />
                    <Typography onClick= {() => router.push(`/resume/section/${sec}`)}>
                        {sec}
                    </Typography>
                    </Stack>

                    </MenuItem>
                ))
            }
        </Stack>
    )
}

const sections = [
    'contact',
    'work history',
    'education',
    'skills',
    'hobbies',
    'professional summary',
    'certificates',
    'finalize cv',
]