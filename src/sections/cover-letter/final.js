import {Stack, Box, Container, Grid, Paper} from '@mui/material'
import {FormattingSettings, LetterTypeSettings, TemplateSettings} from './FooterSettings'
import {PrintButton, DownloadButton, EmailButton} from './Sections/ActionButtons'
import {useRef} from 'react'
import ListSection from './Sections/ListSections'
import PageFormat from './Sections/PageFormat'
import {LetterState} from '../../contexts/LetterContext'


export default function FinalLetter () {

    const componentRef = useRef();
    const {letterSize} = LetterState()

    return (
        <Container sx= {{py: 2}}>

            <Grid container spacing= {4}>

                <Grid item xs= {12} md= {2} sx= {{position: 'sticky', top: '120px'}}>
                    <div style= {{position: 'sticky', top: '130px', zIndex: 2}}>
                        <ListSection />
                    </div>
                </Grid>

                <Grid item xs= {12} md= {8}>
                    <PageFormat />
                    <Paper
                        variant= 'elevation' 
                        elevation= {5}
                        sx= {{
                                p: 2,
                                borderRadius: 0,
                                minHeight: '100vh', 
                                transform: letterSize == 'small' ? 'scale(0.85, 0.85)' :
                                           letterSize == 'normal' ? 'scale(0.9, 0.9)' : 'scale(1, 1)'
                                           ,
                                transformOrigin: 'top center'
                            }}
                        >
                        hello there
                    </Paper>
                </Grid>

                <Grid item xs= {12} md= {2}>
                    <Stack sx= {{position: 'sticky', top: '130px', zIndex: 2}} spacing= {4}>
                        <PrintButton componentRef= {componentRef}/>
                        <DownloadButton componentRef= {componentRef}/>
                        <EmailButton componentRef= {componentRef}/>
                    </Stack>
                </Grid>

            </Grid>

                <Box
                    component= 'div'
                    sx= {{
                        position: 'fixed',
                        bgcolor: 'rgb(75,99,119)',
                        width: '100%',
                        left: 0,
                        top: '100%',
                        transform: 'translateY(-100%)',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 2,
                        p:2
                    }}
                >
                    <Container>
                    <Stack direction= 'row' alignItems= 'center' justifyContent= 'center' spacing= {2}>
                        <TemplateSettings size= {3} />
                        <FormattingSettings size= {5} />
                        <LetterTypeSettings size= {3} />
                    </Stack>
                    </Container>
                </Box>

        </Container>
    )
}


