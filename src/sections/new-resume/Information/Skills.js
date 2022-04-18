import { Typography, Stack, Grid, Divider,Paper, TextField } from "@mui/material" 
import {ResumeState} from '../../../contexts/ResumeContext'


export default function Skills () {

    const {skills, setSkills} = ResumeState()
    const getform = (e) => setSkills(e.target.value.split('\n'))
    

    return (
        <div>
            <Stack spacing= {2} sx= {{py: 2,paddingBottom: 4}}>
                <Typography variant= 'h3'>
                    Highlight relevant skills for the job you want
                </Typography>
                <Typography variant= 'body1'>
                    Start with our expert recommendations by job title or pull the skills required from the job description
                </Typography>
            </Stack>

            <Stack direction= 'row' divider= {<Divider orientation="vertical" flexItem />}>
                <Grid item xs= {12}>
                    <Paper variant= 'outlined' sx= {{p: 1}}>
                    <TextField
                        fullWidth
                        multiline
                        rows={13}
                        name= 'skills'
                        onChange= {getform}
                        label= 'SKILLS'
                        value= {skills.join('\n')}
                    />
                    </Paper>
                </Grid>

            </Stack>

        </div>
    )
}