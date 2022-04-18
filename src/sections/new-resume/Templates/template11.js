import {Stack, Typography, Divider, Chip, Rating, Paper, Avatar, Stepper, Step, StepLabel, StepContent, Box} from '@mui/material'
import {forwardRef} from 'react'
import moment from 'moment'

const Template11 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
            <Stack spacing= {2} sx= {{p: 3}} ref= {ref}>

                <Stack direction= 'row' alignItems= 'center' spacing= {3} justifyContent= 'center' >

                    <Stack spacing= {1} alignItems= 'center'>
                    <Typography variant= 'h3' sx= {{ textTransform: 'uppercase', color: color, fontWeight: 900 }}>
                        {contact?.firstName} {' '} <span style= {{fontWeight: 100}}>{contact.lastName}</span> 
                    </Typography>

                    <Stack spacing= {4} direction= 'row' alignItems= 'center' divider= {<Divider flexItem orientation= 'vertical' />}>
                            <Typography component= 'p' sx= {{fontSize: '12px'}}>
                                {contact?.phone}
                            </Typography>
                            
                            <Typography component= 'p' sx= {{fontSize: '12px'}} >
                                {contact?.email}
                            </Typography>
                    </Stack>

                    <Typography component= 'p' sx= {{fontSize: '12px'}}>
                        {contact?.address?.street} {contact?.address?.city}, {contact?.address?.state} {contact?.address?.country}
                    </Typography>

                    </Stack>
                </Stack>

                <Stack>

                <Stack>

                {/* Professional Summary */}
                {
                    summary.length > 0 && 
                
                <Step expanded>
               <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        PROFESSIONAL SUMMARY
                    </Typography>
               </Box> 

                <StepContent>
               <Typography component= 'p' sx= {{fontSize: '13px'}}>
               {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
               </Typography>
               </StepContent>
            </Step>
            }
            {/* -------------------- */}

            {/* Work History */}
            {
                experience.length > 0 &&
            
            <Step expanded >
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        work history
                    </Typography>
               </Box> 

                <StepContent>
               <Stack spacing= {2} alignItems= 'flex-start'>
                {
                    experience.map((exp, index) => (
                        <Paper
                            key= {index}
                            variant= 'outlined'
                            elevation= {0}
                            sx= {{ p: 1, width: '100%' }}
                        >
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px' }} color= {color} variant= 'button'>
                                {exp.title} / {exp.employer}
                            </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{exp.startDate && moment(exp.startDate).format('LL')}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{exp.endDate && moment(exp.endDate).format('LL')}</Typography>

                        </Stack>
                        <Divider flexItem />
                        <Stack 
                            alignItems= 'flex-start'
                            sx= {{width: '100%', p: 1}}
                            spacing= {1}
                        >
                            <Typography sx= {{ fontSize: '11px' }} variant= 'button'>{exp.role}</Typography>
                            <Typography key= {index} sx= {{ fontSize: '11px', margin: 0 }} variant= 'p'><div dangerouslySetInnerHTML={{__html: exp.description}} /></Typography>
                        </Stack>
                        </Paper>
                    ))
                }
            </Stack>
            </StepContent>
            </Step>
            }

            {/* ----------------------- */}

            {/* Education Summary */}
            {
                education.length > 0 &&
            
            <Step expanded >
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        education
                    </Typography>
               </Box> 

                <StepContent>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                    education.map((edu, index) => (
                        <Paper
                            key= {index}
                            variant= 'outlined'
                            elevation= {0}
                            sx= {{ p: 1, width: '100%' }}
                        >
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px', color: color }} variant= 'button'>
                               {edu.qualification} / {edu.major} / {edu.name}
                            </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.startDate && moment(edu.startDate).format('LL')}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.endDate && moment(edu.endDate).format('LL')}</Typography>
                            
                        </Stack>
                        </Paper>
                    ))
                }
            </Stack>
            </StepContent>
            </Step>
            }
            {/* -------------------- */}

            {/* Certificates Summary */}
            {
                certificate.length> 0 &&
            
            <Step expanded>
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        certificates
                    </Typography>
               </Box> 

                <StepContent>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                   certificate.map((cert, index) => (
                        <Paper
                            key= {index}
                            variant= 'outlined'
                            elevation= {0}
                            sx= {{ p: 1, width: '100%' }}
                        >
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px', color: color }} variant= 'button'>
                               {cert.name} / {cert.authority} 
                            </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{ cert.year && moment(cert.year).format('LL')}</Typography>
                            
                        </Stack>
                            <Divider flexItem />
                            <Typography key= {index} sx= {{ fontSize: '11px' }} component= 'p'>
                            <div dangerouslySetInnerHTML={{__html: cert.description}} />
                            </Typography>
                        </Paper>
                    ))
                }
            </Stack>
            </StepContent>
            </Step>
            }
            {/* -------------------- */}

            {/* Reference Summary */}
            {
                reference.length > 0 &&
            
            <Step expanded>
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        reference
                    </Typography>
               </Box> 

                <StepContent>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                    reference.map((ref, index) => (
                        <Paper
                            key= {index}
                            variant= 'outlined'
                            elevation= {0}
                            sx= {{ p: 1, width: '100%' }}
                        >
                        <Stack 
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px', color: color }} variant= 'button'>
                                {ref.name} / {ref.position}
                            </Typography>

                            <Typography sx= {{ fontSize: '12px' }} variant= 'outline'>
                               {ref.phone} / {ref.email}
                            </Typography>
                            
                        </Stack>
                        <Divider flexItem />
                        <Typography key= {index} sx= {{ fontSize: '11px' }} variant= 'p'><div dangerouslySetInnerHTML={{__html: ref.description}} /></Typography>
                        </Paper>
                    ))
                }
            </Stack>
            </StepContent>
            </Step>
            }
            {/* -------------------- */}
                    

                {/* Skills section */}
                {
                    skills.length > 0 &&
                
            <Step expanded >
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        skills
                    </Typography>
               </Box> 
               <StepContent>
               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        skills.map((skill, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {skill} variant="outlined" />
                        ))
                    }
               </Stack>
               </StepContent>
            </Step>
            }
            {/* ------------------------- */}

            {/* Hobbies section */}
            {
                hobbies.length > 0 &&
            
            <Step expanded >
                <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        hobbies
                    </Typography>
               </Box> 

               <StepContent>
               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        hobbies.map((hobby, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {hobby} variant="outlined" />
                        ))
                    }
               </Stack>
               </StepContent>
            </Step>
            }
            {/* ------------------------- */}

            
            
                {/* Languages section */}
                {
                    language.length > 0 &&
                
                <Step expanded >
                    <Box sx= {{bgcolor: color, paddingLeft: 1, borderRadius: 1}}>
                    <Typography variant= 'overline' sx= {{color: color && 'white'}}>
                        language
                    </Typography>
                </Box>  
                <StepContent>
                <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}}>
                        {
                            language.map((lang, index) => (
                                <Chip 
                                    key= {index}
                                    sx= {{m: 1}} 
                                    label= {
                                        <Typography sx= {{ fontSize: '12px', display: 'flex', alignItems: 'center' }} variant= 'button'>
                                        {lang.name} {' '} <Rating sx= {{marginLeft: 1}} name="level"  size="small" value={lang.level} readOnly />
                                        </Typography>
                                    } 
                                    variant="outlined"
                                />
                            ))
                        }
                </Stack>
                </StepContent>
                </Step>
                }
                {/* ------------------------- */}
                </Stack>


                </Stack>

            </Stack>
    )
})

export default Template11