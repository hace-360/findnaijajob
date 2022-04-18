// import {user} from './data'
import styles from './template2.module.scss'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import { Stack, Divider, Container, Box, Stepper, Step, StepLabel, StepContent,Paper, Avatar } from '@mui/material';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import StarRateIcon from '@mui/icons-material/StarRate';
import * as React from 'react'


export const Template2  = React.forwardRef(({user}, ref)=> {

    const test= ''

    return (
        <div className= {styles.template2} id= 'handle' ref={ref}>
            <aside>
               <Box sx= {{ p: 8 }}>
                    <Avatar
                        src={user.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
                        alt={user.name || 'Guest'}
                        sx={{ width: 160, height: 160 }}
                    />
                   {/* <img src={user.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'} alt="user image"/> */}
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
                                {user.email && <p>{user.email}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider style= {{ background: 'grey' }} orientation="vertical" flexItem />}
                            >
                                <PhoneInTalkIcon fontSize='15px' />
                                {user.phone && <p>{user.phone}</p>}
                            </Stack>
                            <Stack
                                direction="row"
                                alignItems= 'center'
                                spacing= {1}
                                divider= {<Divider style= {{ background: 'grey' }} orientation="vertical" flexItem />}
                            >
                                <LocationOn fontSize='15px' />
                                {user.address && <p>{user.address}</p>}
                            </Stack>
                        </Stack>
                    </Stack>

                    <Stack
                        spacing= {1}
                    >
                        <h4>education</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            user.education &&
                            user.education.map((edu, index) => (
                                <Paper key= {index} variant= 'outlined' elevation= {0} sx= {{p: 1}}>
                                    <h5> institution: <p style= {{ marginLeft: '20px' }}>{edu.name}</p> </h5>
                                    <h5> major: <p style= {{ marginLeft: '20px' }}>{edu.major}</p> </h5>
                                    <h5> degree: <p style= {{ marginLeft: '20px' }}>{edu.degree}</p> </h5>
                                    <h5> start date: <p style= {{ marginLeft: '20px' }}>{edu.startDate}</p> </h5>
                                    <h5> end date: <p style= {{ marginLeft: '20px' }}>{edu.endDate}</p> </h5>
                                </Paper>
                            ))
                        }

                    </Stack>
                    
                    <Stack
                        spacing= {1}
                    >
                        <h4>skills</h4>
                        <Divider style= {{ background: 'white', marginTop: 0 }} flexItem />
                        {
                            user.skills &&
                            <ul>
                            {user.skills.map((skill, index) => (
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
                        <Divider style= {{ background: 'white', marginTop: 0 }} flexItem />
                        {
                            user.hobbies &&
                            <ul>
                            {user.hobbies.map((hobby, index) => (
                                <li key= {index}>{hobby}</li>
                            ))}
                            </ul>
                        }
                    </Stack>
                    <Stack
                        alignItems= 'flex-start'
                        justifyContent= 'center'
                        spacing= {1}
                    >
                        <h4 >languages</h4>
                        <Divider style= {{ background: 'white' }} flexItem />
                        {
                            user.language &&
                            <ul>
                            {user.language.map((lang, index) => (
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

                    <Stack
                        spacing= {1}
                    >
                        <h4>reference</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            user.reference &&
                            user.reference.map((ref, index) => (
                                <Paper key= {index} variant= 'outlined' elevation= {0} sx= {{p: 1}}>
                                    <h5> name: <p style= {{ marginLeft: '20px' }}>{ref.name}</p> </h5>
                                    <h5> position: <p style= {{ marginLeft: '20px' }}>{ref.position}</p> </h5>
                                    <h5> email: <p style= {{ marginLeft: '20px' }}>{ref.email}</p> </h5>
                                    <h5> phone: <p style= {{ marginLeft: '20px' }}>{ref.phone}</p> </h5>
                                    <h5> <DriveFileRenameOutlineIcon sx= {{ fontSize: '15px' }} />: 
                                        <p style= {{ marginLeft: '20px' }}>{ref.description}</p>
                                    </h5>
                                </Paper>
                            ))
                        }

                    </Stack>

                </Stack>
            </aside>

            <section>
                <header>
                        <h1 style= {{ display: 'flex', textTransform: 'uppercase' }}>{user.name.split(' ')[0] || ''} 
                            <span style= {{ marginLeft: '10px', fontWeight: '300' }}>{user.name.split(' ')[1] || ''}</span>  
                        </h1>
                        <h4 style= {{ marginTop: '10px', fontSize: '12px', fontWeight: '600', letterSpacing: '3px' }}>{user.title || ''}</h4>
                        {user.objective && user.objective.split(' ').length > 5 ? 
                            <p style= {{ margin: '25px 0 40px 0', fontWeight: 400 }}>
                            <strong> {user.objective.split(' ').slice(0, 5).join(' ') || ''}</strong>
                            { user.objective.replace(user.objective.split(' ').slice(0, 5).join(' '), '') }
                            </p> : 
                            <p style= {{ margin: '25px 0 40px 0', fontWeight: 400 }}>{user.objective || ''}</p>
                        }
                </header>
                <Stack
                    spacing= {2}
                    sx= {{ p: 2, width: '100%', bgcolor: 'white'}}
                >
                    <Stack
                        spacing= {1}
                    >
                        <h4>experience</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            user.experience &&
                            <Stepper orientation="vertical">
                            {user.experience.map((exp, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{exp.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> role: <p style= {{ marginLeft: '20px' }}>{exp.role}</p> </h5>
                                            <h5> start date: <p style= {{ marginLeft: '20px' }}>{exp.startDate}</p> </h5>
                                            <h5> end date: <p style= {{ marginLeft: '20px' }}>{exp.endDate}</p> </h5>
                                            <h5> details:
                                                <ul>
                                                {
                                                    exp.description.map((det, index) => (
                                                        <li style= {{ textTransform: 'none' }} key= {index}> {det} </li>
                                                    ))
                                                }
                                                </ul>
                                            </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack>

                    {/* certificate */}
                    <Stack
                        spacing= {1}
                    >
                        <h4>certifications</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            user.certificates &&
                            <Stepper orientation="vertical">
                            {user.certificates.map((cert, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{cert.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> name: <p style= {{ marginLeft: '20px' }}>{cert.name}</p> </h5>
                                            <h5> authority: <p style= {{ marginLeft: '20px' }}>{cert.authority}</p> </h5>
                                            <h5> date: <p style= {{ marginLeft: '20px' }}>{cert.year}</p> </h5>
                                            <h5> details: <p style= {{ marginLeft: '20px' }}>{cert.description}</p> </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack>
                    {/* honors */}
                    <Stack
                        spacing= {1}
                    >
                        <h4>honors & awards</h4>
                        <Divider style= {{ border: '1px solid', margin: 0 }} flexItem />
                        {
                            user.honors &&
                            <Stepper orientation="vertical">
                            {user.honors.map((hnr, index) => (
                                <Step key= {index} expanded active= {false}>
                                    <StepLabel> <h5>{hnr.name}</h5> </StepLabel>
                                    <StepContent>
                                        <Paper variant= 'outlined' elevation= {0} sx= {{p: 2}}>
                                            <h5> name: <p style= {{ marginLeft: '20px' }}>{hnr.name}</p> </h5>
                                            <h5> title: <p style= {{ marginLeft: '20px' }}>{hnr.subtitle}</p> </h5>
                                            <h5> date: <p style= {{ marginLeft: '20px' }}>{hnr.year}</p> </h5>
                                            <h5> details: <p style= {{ marginLeft: '20px' }}>{hnr.description}</p> </h5>
                                        </Paper>
                                    </StepContent>
                                </Step>
                            ))}
                            </Stepper>
                        }

                    </Stack>
                </Stack>
            </section>
        </div>
    )
})