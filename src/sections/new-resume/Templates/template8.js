import {Stack, Typography, Divider, Paper} from '@mui/material'
import {forwardRef} from 'react'
import moment from 'moment'


const Template8 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <Stack alignItems= 'center' sx= {{p: 2}} spacing= {3} ref= {ref} >
            
            <Stack 
                alignItems= 'center'
                spacing= {1}
                sx= {{width: '100%'}}
            >
            <Typography variant= 'h3' sx= {{ textTransform: 'capitalize', color: color }}>
                {contact?.firstName} {' '} {contact.lastName}
            </Typography>

            <Stack spacing= {0.5} sx= {{width: '100%'}}>
            <Divider sx= {{border: `1px solid ${color}`}} flexItem />
            <Divider sx= {{border: `2px solid ${color}`}} flexItem />
            </Stack>
            <Stack direction= 'row' alignItems= 'center' spacing= {2}>

                <Typography component= 'li' sx= {{fontSize: '12px'}}>
                    {`${contact.address.street} ${contact.address.city}, ${contact.address.state}`}
                </Typography>

                <Typography component= 'li' sx= {{fontSize: '12px'}}>
                    {`${contact.phone}`}
                </Typography>

                <Typography component= 'li' sx= {{fontSize: '12px'}}>
                    {`${contact.email}`}
                </Typography>
            </Stack>
            </Stack>

            {/* Professional Summary */}
            {
                summary && 
            <Stack alignItems= 'flex-start' >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    PROFESSIONAL SUMMARY
                </Typography>

               <Typography component= 'p' sx= {{fontSize: '13px'}}>
               {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
               </Typography>
            </Stack>
            }
            {/* -------------------- */}

            {/* Work History */}
            {
                experience.length > 0 &&
            
            <Stack alignItems= 'flex-start' >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    WORK HISTORY
                </Typography> 

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
            <Stack alignItems= 'flex-start' sx= {{width: '100%'}} >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    EDUCATION
                </Typography>

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
            </Stack>
            }
            {/* -------------------- */}

            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            <Stack alignItems= 'flex-start' sx= {{width: '100%'}}>
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    CERTIFICATES
                </Typography>

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
            <Stack alignItems= 'flex-start' sx={{width: '100%'}}>
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    PROFESSIONAL SUMMARY
                </Typography> 

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
            <Stack alignItems= 'flex-start' >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    SKILLS
                </Typography> 

               <Stack direction= 'row' alignItems= 'flex-start' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        skills.map((skill, index) => (
                            <Typography key= {index} component= 'li' sx= {{fontSize: '12px'}}>
                                {skill}
                            </Typography>
                        ))
                    }
               </Stack>
            </Stack>
            }
            {/* ------------------------- */}

            {/* Hobbies section */}
            {
                hobbies.length > 0 &&
            <Stack alignItems= 'flex-start' >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    HOBBIES
                </Typography> 

               <Stack direction= 'row' alignItems= 'flex-start' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        hobbies.map((hobby, index) => (
                            <Typography key= {index} component= 'li' sx= {{fontSize: '12px'}}>
                                {hobby}
                            </Typography>
                        ))
                    }
               </Stack>
            </Stack>
            }
            {/* ------------------------- */}

            
            
             {/* Languages section */}
             {
                language.length > 0 &&
             <Stack alignItems= 'flex-start' >
                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                    LANGUAGE
                </Typography> 

               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}}>
                    {
                        language.map((lang, index) => (
                            <Typography key= {index} component= 'li' sx= {{fontSize: '12px'}}>
                                {lang.name}
                            </Typography>
                        ))
                    }
               </Stack>
            </Stack>
             }
            {/* ------------------------- */}
            
            

        </Stack>
    )
})

export default Template8