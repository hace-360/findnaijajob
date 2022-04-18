import {Stack, Typography, Divider, Chip, Rating, Paper, Box} from '@mui/material'
import {forwardRef} from 'react'
import moment from 'moment'


const Template5 = forwardRef(({color, user, sx}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <Stack alignItems= 'center' sx= {{p: 2, ...sx}} spacing= {3} ref= {ref}>
            <Divider flexItem />
            
            <Stack 
                alignItems= 'center'
                spacing= {1}
                sx= {{width: '100%'}}
            >
            <Typography variant= 'h3' sx= {{ textTransform: 'capitalize', color: color }}>
                {contact?.firstName} {' '} {contact.lastName}
            </Typography>

            <Stack spacing= {0.5} sx= {{width: '100%'}}>
            <Divider sx= {{border: `3px solid ${color}`}} flexItem />
            <Divider sx= {{border: `1px solid ${color}`}} flexItem />
            </Stack>
            <Stack direction= 'row' alignItems= 'center' spacing= {2} divider= {<Divider flexItem orientation= 'vertical' />}>

                <Typography component= 'p' sx= {{fontSize: '13px'}}>
                    {`${contact.address.street} ${contact.address.city}, ${contact.address.state}`}
                </Typography>

                <Typography component= 'p' sx= {{fontSize: '13px'}}>
                    {`${contact.phone}`}
                </Typography>

                <Typography component= 'p' sx= {{fontSize: '13px'}}>
                    {`${contact.email}`}
                </Typography>
            </Stack>
            </Stack>

            {/* Professional Summary */}
            <Stack alignItems= 'center' >
               <Divider flexItem sx= {{color: color}} >
                        PROFESSIONAL SUMMARY
               </Divider> 

               {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
            </Stack>
            {/* -------------------- */}

            {/* Work History */}
            {
                experience.length > 0 &&
            <Stack alignItems= 'center' >
               <Divider flexItem sx= {{color: color}} >
                        WORK HISTORY
               </Divider> 

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
            </Stack>
            }

            {/* ----------------------- */}

            {/* Education Summary */}
            {
                education.length > 0 &&
            <Stack alignItems= 'center' sx= {{width: '100%'}} >
               <Divider flexItem sx= {{color: color}} >
                        EDUCATION
               </Divider> 

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
                               {edu.qualification && <span>{edu.qualification} / </span>}
                               {edu.major && <span>{edu.major} / </span>}
                               {edu.name && <span>{edu.name}</span>}
                            </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.startDate && moment(edu.startDate).format('LL')}</Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{edu.endDate && moment(edu.endDate).format('LL')}</Typography>
                            
                        </Stack>
                        </Paper>
                    ))
                }
            </Stack>
            </Stack>
            }
            {/* -------------------- */}

            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            
            <Stack alignItems= 'center' sx= {{width: '100%'}}>
               <Divider flexItem sx= {{color: color}} >
                        CERTFICATIONS
               </Divider> 

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
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{cert.year && moment(cert.year).format('LL')}</Typography>
                            
                        </Stack>
                            <Divider flexItem />
                            <Typography key= {index} sx= {{ fontSize: '11px' }} component= 'p'>
                            <div dangerouslySetInnerHTML={{__html: cert.description}} />
                            </Typography>
                        </Paper>
                    ))
                }
            </Stack>
            </Stack> 
            }
            {/* -------------------- */}

            {/* Reference Summary */}
            {
                reference.length > 0 &&
            <Stack alignItems= 'center' sx={{width: '100%'}}>
               <Divider flexItem sx= {{color: color}} >
                        REFERENCE
               </Divider> 

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
            </Stack>
            }
            {/* -------------------- */}

            {/* Skills section */}
            {
                skills.length > 0 &&
            <Stack alignItems= 'center' >
               <Divider flexItem sx= {{color: color}} >
                        SKILLS
               </Divider> 

               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                       skills.map((skill, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {skill} variant="outlined" />
                        ))
                    }
               </Stack>
            </Stack>
            }
            {/* ------------------------- */}

            {/* Hobbies section */}
            {
                hobbies.length > 0 &&
            <Stack alignItems= 'center' >
               <Divider flexItem sx= {{color: color}} >
                        HOBBIES
               </Divider> 

               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        hobbies.map((hobby, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {hobby} variant="outlined" />
                        ))
                    }
               </Stack>
            </Stack>
            }
            {/* ------------------------- */}

            
            
             {/* Languages section */}
             {
                 language.length > 0 &&
             <Stack alignItems= 'center' >
               <Divider flexItem sx= {{color: color}} >
                        LANGUAGES
               </Divider> 

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
            </Stack>
             }
            {/* ------------------------- */}
            
            

        </Stack>
    )
})

export default Template5