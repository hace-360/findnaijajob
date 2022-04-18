import {Stack, Typography, Divider, Chip, Rating, Paper, Avatar, Stepper, Step, StepLabel, StepContent,Box} from '@mui/material'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import { forwardRef } from 'react';
import moment from 'moment'


const Template17 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
            <Stack spacing= {2} sx= {{p: 3}} ref= {ref}>

                <Stack direction= 'row' alignItems= 'center' spacing= {3} >

                    <Stack spacing= {1} sx= {{width: '100%'}}>
                    <Typography variant= 'h3' sx= {{ textTransform: 'capitalize', color: color, fontWeight: 600 }}>
                        {contact?.firstName} {' '} {contact.lastName}
                    </Typography>

                    <Stack sx= {{bgcolor: color, width: '100%', p: 2, color: color && 'white'}} spacing= {1} direction= 'row' alignItems= 'center' divider= {<Divider orientation= 'vertical' flexItem />}> 
                       
                       
                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <LocationOn fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.address.street} {contact.address.city}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <Email fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.email}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <PhoneInTalkIcon  fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.phone}
                         </Typography>
                       </Stack>
                        
                   </Stack>

                    </Stack>
                </Stack>

                <Stack>

            <Stack spacing= {2} sx= {{py: 2}}>

            {/* Professional Summary */}
            {
                summary.length > 0 && 
            
            <Stack spacing= {1}>
                <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    PROFESSIONAL SUMMARY
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>

                <Box sx= {{paddingLeft: 4}}>
                <Typography component= 'p' sx= {{fontSize: '13px'}}>
                {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
               </Typography>
               </Box>
            </Stack>
            }
            {/* -------------------- */}

            {/* Work History */}
            {
                experience.length > 0 &&
            
            <Stack spacing= {1}>
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    work history
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>

                <Box sx= {{paddingLeft: 4}}>
               <Stack spacing= {2} alignItems= 'flex-start'>
                {
                    experience.map((exp, index) => (
                        <Box
                            key= {index}
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
                        </Box>
                    ))
                }
            </Stack>
            </Box>
            </Stack>
            }

            {/* ----------------------- */}

            {/* Education Summary */}
            {
                education.length > 0 &&
           
            <Stack spacing= {1} >
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    education
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>

                <Box sx= {{paddingLeft: 4}}>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                    education.map((edu, index) => (
                        <Box
                            key= {index}
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
                        </Box>
                    ))
                }
            </Stack>
            </Box>
            </Stack>
             }
            {/* -------------------- */}

            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            
            <Stack spacing= {1}>
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    certificates
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>

                <Box sx= {{paddingLeft: 4}}>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                   certificate.map((cert, index) => (
                        <Box
                            key= {index}
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
                        </Box>
                    ))
                }
            </Stack>
            </Box>
            </Stack> 
            }
            {/* -------------------- */}

            {/* Reference Summary */}
            {
                reference.length > 0 &&
           
            <Stack spacing= {1}>
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    reference
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>

                <Box sx= {{paddingLeft: 4}}>
               <Stack spacing= {2} sx= {{ width: '100%'}} alignItems= 'flex-start'>
                {
                    reference.map((ref, index) => (
                        <Box
                            key= {index}
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
                        </Box>
                    ))
                }
            </Stack>
            </Box>
            </Stack>
             }
            {/* -------------------- */}
                    

                {/* Skills section */}
                {
                    skills.length > 0 &&
                
            <Stack spacing= {1} >
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    skills
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>
               <Box sx= {{paddingLeft: 4}}>
               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        skills.map((skill, index) => (
                            <Typography key= {index} component= 'li' sx= {{fontSize: '11px'}}>
                                {skill}
                            </Typography>
                        ))
                    }
               </Stack>
               </Box>
            </Stack>
            }
            {/* ------------------------- */}

            {/* Hobbies section */}
            {
                hobbies.length > 0 &&
            
            <Stack spacing= {1} >
            <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    hobbies
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack>
               <Box sx= {{paddingLeft: 4}}>
               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        hobbies.map((hobby, index) => (
                            <Typography key= {index} component= 'li' sx= {{fontSize: '11px'}}>
                                {hobby}
                            </Typography>
                        ))
                    }
               </Stack>
               </Box>
            </Stack>
            }
            {/* ------------------------- */}

            
            
                {/* Languages section */}
                {
                    language.length > 0 &&
               
                <Stack spacing= {1} >
                <Stack spacing= {0.5}>
                <Typography sx= {{color}} variant= 'overline'>
                    language
                </Typography>
                <Divider flexItem sx= {{border: `1px solid`}} />
                </Stack> 
                <Box sx= {{paddingLeft: 4}}>
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
                </Box>
                </Stack>
                 }
                {/* ------------------------- */}
                </Stack>


                </Stack>

            </Stack>
    )
})

export default Template17