import {Container,Typography, Grid, Stack, Paper} from '@mui/material'
import {SetUpSideBar} from './SideBar'
import {PrintButton, DownloadButton, EmailButton} from './ActionButtons'
import PageControl from './PageControl'
import GetTemplate from '../Templates'
import {ResumeState} from '../../../contexts/ResumeContext'
import {useRef} from 'react'



export default function Final () {

    const {activeTemplate, pageSize, contact, skills, allCert, allEdu, allExp, hobbies, allRef, allLang, summary} = ResumeState()
    const componentRef = useRef();
    const userData = {
        contact,
        education: allEdu,
        experience: allExp,
        summary: summary,
        skills: skills,
        hobbies: hobbies,
        reference: allRef,
        certificate: allCert,
        language: allLang
    }
    

    return (
        <div>
            <Typography color= 'secondary' variant= 'h4' sx= {{
                fontFamily: 'poppins'
            }}>
                Review your CV
            </Typography>
            <Typography paragraph variant= 'p' color= 'text.grey' sx= {{p: 2}}>
                Review and make any final changes to your CV. Then download or email yourself a copy and apply for jobs!
            </Typography>

            <Grid container spacing={2}>
                <Grid item md={0.8} xs= {12} >
                    <Stack sx= {{position: 'sticky', top: '120px', zIndex: 2}} spacing= {4}>
                        <PrintButton componentRef= {componentRef}/>
                        <DownloadButton componentRef= {componentRef}/>
                        <EmailButton componentRef= {componentRef}/>
                    </Stack>
                </Grid>
                <Grid item xs={12} md= {7}>
                    <PageControl />
                    <Paper
                        variant= 'elevation' 
                        elevation= {5}
                        sx= {{
                                p: 2, 
                                minHeight: '100vh', 
                                transform: pageSize == 'a4' ? 'scale(0.9, 0.9)' : 'scale(1, 1)',
                                transformOrigin: 'top center'
                            }}
                        >
                        { GetTemplate({name: activeTemplate, componentRef: componentRef, form: userData}) }
                    </Paper>
                </Grid>
                <Grid item xs={12} md= {4}>
                    <div style= {{position: 'sticky', top: '120px'}}>
                        <SetUpSideBar />
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}