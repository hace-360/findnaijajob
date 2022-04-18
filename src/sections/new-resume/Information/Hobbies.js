import { Typography, Stack, Grid, Divider,Paper, TextField } from "@mui/material" 
import {ResumeState} from '../../../contexts/ResumeContext'


export default function Hobbies () {

    const {hobbies, setHobbies} = ResumeState()
    const getform = (e) => setHobbies(e.target.value.split('\n'))
    

    return (
        <div>
            <Stack spacing= {2} sx= {{py: 2,paddingBottom: 4}}>
                <Typography variant= 'h3'>
                    Highlight relevant Hobbies for the life you live
                </Typography>
                {/* <Typography variant= 'body1'>
                    Start with our expert recommendations by job title or pull the skills required from the job description
                </Typography> */}
            </Stack>

            <Stack direction= 'row' divider= {<Divider orientation="vertical" flexItem />}>
                <Grid item xs= {12}>
                    <Paper variant= 'outlined' sx= {{p: 1}}>
                    <TextField
                        fullWidth
                        multiline
                        rows={13}
                        name= 'hobbies'
                        onChange= {getform}
                        label= 'HOBBIES'
                        value= {hobbies.join('\n')}
                    />
                    </Paper>
                </Grid>

            </Stack>

        </div>
    )
}