import styles from './template1.module.scss'
import {forwardRef} from 'react'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import { Stack, Divider, Box, Stepper, Step, StepLabel, StepContent,Paper, Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import moment from 'moment'



const Template1  = forwardRef(({user, color, sx}, ref)=> {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <div className= {styles.template1} id= 'handle' ref={ref} style= {{...sx}} >
            <header style= {{color}}>
                <div>
                    <h1>{contact.firstName || ''} {contact.lastName || ''}</h1>
                    <h4>{contact.title || ''}</h4>
                </div>

                <Stack
                    spacing= {1}
                >
                    <Stack
                        direction="row"
                        alignItems= 'center'
                        spacing= {1}
                        divider= {<Divider orientation="vertical" flexItem />}
                    >
                        <PhoneInTalkIcon fontSize='17px' />
                        {contact.phone && <p>{contact.phone}</p>}
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems= 'center'
                        spacing= {1}
                        divider= {<Divider orientation="vertical" flexItem />}
                    >
                        <Email fontSize='17px' />
                        {contact.email && <p>{contact.email}</p>}
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems= 'center'
                        spacing= {1}
                        divider= {<Divider orientation="vertical" flexItem />}
                    >
                        <LocationOn fontSize='17px' />
                        <p> {`${contact?.address?.street || ''} ${contact?.address?.city || ''} ${contact?.address?.state || ''}`} </p>
                    </Stack>
                </Stack>
            </header>
            <Box
                alignItems='center'
                style= {{backgroundColor: color || 'rgb(60, 59, 77)', paddingRight: '15px'}}
            >
                <Stack
                    spacing= {2}
                    direction= 'row'
                >
                    <Avatar
                        src={contact.previewImg || contact.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
                        alt={contact.firstname || 'Guest'}
                        variant="square"
                        sx={{ width: 200, height: 180 }}
                    />
                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                        divider= {<Divider style= {{ background: 'white' }} flexItem  />}
                    >
                        <h4 style= {{color: 'white'}}>Professional Summary</h4>
                        {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
                    </Stack>

                </Stack>
            </Box>

            <div
                style= {{
                    width: '100%)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    backgroundColor: color || '#D3D3D3',
                    color: color && 'white'
                }}
             >
                <Stack
                    spacing= {2}
                    maxWidth='200px'
                    minWidth='200px'
                    sx= {{ p: 2, height: '100%'}}
                >
                    
                    <Stack
                        spacing= {1}
                    >
                        <h4>skills</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            skills &&
                            <ul>
                            {skills.map((skill, index) => (
                                <li key= {index}>{skill}</li>
                            ))}
                            </ul>
                        }

                    </Stack>

                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >hobbies</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            hobbies &&
                            <ul>
                            {hobbies.map((hobby, index) => (
                                <li key= {index}>{hobby}</li>
                            ))}
                            </ul>
                        }
                    </Stack>
                    {
                        language.length > 0 &&
                        <Stack
                            alignItems= 'flex-start'
                            justifyContent= 'center'
                            spacing= {1}
                        >
                            <h4 >languages</h4>
                            <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
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
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >reference</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            reference &&
                            reference.map((ref, index) => (
                            <Stack
                                alignItems= 'flex-start'
                                key= {index}
                                spacing= {1}
                            >
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider orientation="vertical" flexItem />}
                            >
                                <DriveFileRenameOutlineIcon fontSize='15px' />
                                {ref.name && <p>{ref.name}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider orientation="vertical" flexItem />}
                            >
                                <Email fontSize='15px' />
                                {ref.email && <p>{ref.email}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider orientation="vertical" flexItem />}
                            >
                                <PhoneInTalkIcon fontSize='15px' />
                                {ref.phone && <p>{ref.phone}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider orientation="vertical" flexItem />}
                            >
                                <PersonSearchIcon fontSize='15px' />
                                {ref.position && <p>{ref.position}</p>}
                            </Stack>
                            <Divider flexItem />
                            </Stack>
                            ))
                        }
                    </Stack>
                    }

                    </Stack>

                {/* Seconde section */}

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
                            {
                            experience.map((exp, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5 style= {{color}}>{exp.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> role: <p style= {{ marginLeft: '20px' }}>{exp.title} / {exp.employer}</p> </h5>
                                            <h5> start date: <p style= {{ marginLeft: '20px' }}>{exp.startDate && moment(exp.startDate).format('LL')}</p> </h5>
                                            <h5> end date: <p style= {{ marginLeft: '20px' }}>{exp.endDate && moment(exp.endDate).format('LL')}</p> </h5>
                                            <h5> details:
                                                <ul>
                                                    <li style= {{ textTransform: 'none' }}>
                                                        <div dangerouslySetInnerHTML={{__html: exp.description}} />
                                                    </li>
                                                </ul>
                                            </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))
                            }
                            </Stepper>
                        }

                    </Stack>
                    }

                    {/* education */}
                    {
                        education.length > 0 && 
                    <Stack
                        spacing= {1}
                    >
                        <h4>education</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            education &&
                            <Stepper orientation="vertical">
                            {education.map((edu, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{edu.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> major: <p style= {{ marginLeft: '20px' }}>{edu.major}</p> </h5>
                                            <h5> degree: <p style= {{ marginLeft: '20px' }}>{edu.degree}</p> </h5>
                                            <h5> start date: <p style= {{ marginLeft: '20px' }}>{edu.startDate && moment(edu.startDate).format('LL')}</p> </h5>
                                            <h5> end date: <p style= {{ marginLeft: '20px' }}>{edu.endDate && moment(edu.endDate).format('LL')}</p> </h5>
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
            </div>
        </div>
    )
})

export default Template1