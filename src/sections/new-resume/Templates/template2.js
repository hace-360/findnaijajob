// import {user} from './data'
import styles from './template2.module.scss'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import { Stack, Divider, Box, Stepper, Step, StepLabel, StepContent,Paper, Avatar } from '@mui/material';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import * as React from 'react'
import moment from 'moment'


const Template2  = React.forwardRef(({user, color, sx}, ref)=> {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <div className= {styles.template2} id= 'handle' ref={ref} style= {{...sx}}>
            <aside style= {{background: color}}>
               <Box sx= {{ p: 8 }}>
                    <Avatar
                        src={contact.previewImg || contact.photoURL  || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
                        alt={contact.firstName || 'Guest'}
                        sx={{ width: 160, height: 160 }}
                    />
                   {/* <img src={contact.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'} alt="contact image"/> */}
                </Box>
               <Stack
                    spacing= {2}
                    sx= {{p: 2}}
                >
                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >contact</h4>
                        <Divider style= {{ background: 'white', marginTop: 0 }} flexItem />
                            <Stack
                                alignItems= 'flex-start'
                                spacing= {1}
                                sx= {{p: 1}}
                            >
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider style= {{ background: 'grey' }} orientation="vertical" flexItem />}
                            >
                                <Email fontSize='15px' />
                                {contact?.email && <p>{contact?.email}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider style= {{ background: 'grey' }} orientation="vertical" flexItem />}
                            >
                                <PhoneInTalkIcon fontSize='15px' />
                                {contact?.phone && <p>{contact?.phone}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider style= {{ background: 'grey' }} orientation="vertical" flexItem />}
                            >
                                <LocationOn fontSize='15px' />
                                <p> {`${contact?.address?.street || ''} ${contact?.address?.city || ''} ${contact?.address?.state || ''}`} </p>
                            </Stack>
                        </Stack>
                    </Stack>

                    {
                        education.length > 0 &&
                    <Stack
                        spacing= {1}
                    >
                        <h4>education</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            education &&
                            education.map((edu, index) => (
                                <Paper key= {index} variant= 'outlined' elevation= {0} sx= {{p: 1}}>
                                    <h5> institution: <p style= {{ marginLeft: '20px' }}>{edu.name}</p> </h5>
                                    <h5> major: <p style= {{ marginLeft: '20px' }}>{edu.major}</p> </h5>
                                    <h5> degree: <p style= {{ marginLeft: '20px' }}>{edu.degree}</p> </h5>
                                    <h5> start date: <p style= {{ marginLeft: '20px' }}>{edu.startDate && moment(edu.startDate).format('LL')}</p> </h5>
                                    <h5> end date: <p style= {{ marginLeft: '20px' }}>{edu.endDate && moment(edu.endDate).format('LL')}</p> </h5>
                                </Paper>
                            ))
                        }

                    </Stack>
                    }
                    {
                        skills.length > 0 &&
                    <Stack
                        spacing= {1}
                    >
                        <h4>skills</h4>
                        <Divider style= {{ background: 'white', marginTop: 0 }} flexItem />
                        {
                            skills &&
                            <ul>
                            {skills.map((skill, index) => (
                                <li key= {index}>{skill}</li>
                            ))}
                            </ul>
                        }

                    </Stack>
                    }
                    {
                        hobbies.length > 0 &&
                    
                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >hobbies</h4>
                        <Divider style= {{ background: 'white', marginTop: 0 }} flexItem />
                        {
                            hobbies &&
                            <ul>
                            {hobbies.map((hobby, index) => (
                                <li key= {index}>{hobby}</li>
                            ))}
                            </ul>
                        }
                    </Stack>
                    }
                    {
                        language.length > 0 &&
                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >languages</h4>
                        <Divider style= {{ background: 'white' }} flexItem />
                        {
                            language &&
                            <ul>
                            {language.map((lang, index) => (
                                <li key= {index} style= {{ 
                                    alignItems: 'center', display: 'flex'}}
                                    >
                                    {lang.name}
                                    <em style= {{ marginLeft: '10px' }}>
                                    {
                                       [...Array(lang.level || 0)].map((arr, index) => (
                                            <StarRateIcon fontSize= '3px' key= {index} />
                                        ))
                                    }
                                    </em>
                                </li>
                            ))}
                            </ul>
                        }
                    </Stack>
                    }
                        
                        {
                            reference.length > 0 &&
                        
                    <Stack
                        spacing= {1}
                    >
                        <h4>reference</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            reference &&
                            reference.map((ref, index) => (
                                <Paper key= {index} variant= 'outlined' elevation= {0} sx= {{p: 1}}>
                                    <h5> name: <p style= {{ marginLeft: '20px' }}>{ref.name}</p> </h5>
                                    <h5> position: <p style= {{ marginLeft: '20px' }}>{ref.position}</p> </h5>
                                    <h5> email: <p style= {{ marginLeft: '20px' }}>{ref.email}</p> </h5>
                                    <h5> phone: <p style= {{ marginLeft: '20px' }}>{ref.phone}</p> </h5>
                                    <h5> <DriveFileRenameOutlineIcon sx= {{ fontSize: '15px' }} />: 
                                        <p style= {{ marginLeft: '20px' }}><div dangerouslySetInnerHTML={{__html: ref.description}} /></p>
                                    </h5>
                                </Paper>
                            ))
                        }

                    </Stack>
                    }

                </Stack>
            </aside>

            <section>
                <header style= {{color}}>
                        <h1 style= {{ display: 'flex', textTransform: 'uppercase' }}>{contact?.firstName || ''} 
                            <span style= {{ marginLeft: '10px', fontWeight: '300' }}>{contact?.lastName || ''}</span>  
                        </h1>
                        <h4 style= {{ marginTop: '10px', fontSize: '12px', fontWeight: '600', letterSpacing: '3px' }}>{contact?.title || ''}</h4>
                        {summary && <div style= {{ margin: '25px 0 40px 0', fontWeight: 400 }} dangerouslySetInnerHTML={{__html: summary}} />}
                </header>
                <Stack
                    spacing= {2}
                    sx= {{ p: 2, width: '100%', bgcolor: 'white', color}}
                >
                    {
                        experience.length > 0 &&
                    <Stack
                        spacing= {1}
                    >
                        <h4>experience</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            experience &&
                            <Stepper orientation="vertical">
                            {experience.map((exp, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5 style= {{color}}>{exp.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> role: <p style= {{ marginLeft: '20px' }}>{exp.role}</p> </h5>
                                            <h5> start date: <p style= {{ marginLeft: '20px' }}>{exp.startDate && moment(exp.startDate).format('LL')}</p> </h5>
                                            <h5> end date: <p style= {{ marginLeft: '20px' }}>{exp.endDate && moment(exp.endDate).format('LL')}</p> </h5>
                                            <h5> details:
                                                <ul>
                                                    <li style= {{ textTransform: 'none' }} key= {index}> <div dangerouslySetInnerHTML={{__html: exp.description}} /> </li>
                                                </ul>
                                            </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack>
                    }

                    {/* certificate */}
                    {
                        certificate.length > 0 &&
                    
                    <Stack
                        spacing= {1}
                    >
                        <h4>certifications</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            certificate &&
                            <Stepper orientation="vertical">
                            {certificate.map((cert, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{cert.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> name: <p style= {{ marginLeft: '20px' }}>{cert.name}</p> </h5>
                                            <h5> authority: <p style= {{ marginLeft: '20px' }}>{cert.authority}</p> </h5>
                                            <h5> date: <p style= {{ marginLeft: '20px' }}>{cert.year && moment(cert.year).format('LL')}</p> </h5>
                                            <h5> details: <p style= {{ marginLeft: '20px' }}><div dangerouslySetInnerHTML={{__html: cert.description}} /></p> </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack>
                    }
                    {/* honors */}
                    {/* <Stack
                        spacing= {1}
                    >
                        <h4>honors & awards</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            honors &&
                            <Stepper orientation="vertical">
                            {honors.map((hnr, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{hnr.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> name: <p style= {{ marginLeft: '20px' }}>{hnr.name}</p> </h5>
                                            <h5> title: <p style= {{ marginLeft: '20px' }}>{hnr.subtitle}</p> </h5>
                                            <h5> date: <p style= {{ marginLeft: '20px' }}>{hnr.year}</p> </h5>
                                            <h5> details: <p style= {{ marginLeft: '20px' }}><div dangerouslySetInnerHTML={{__html: hnr.description}} /></p> </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack> */}
                </Stack>
            </section>
        </div>
    )
})

export default Template2