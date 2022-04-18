import {Stack, Typography, Divider, Chip, Rating, Paper, Box, Grid} from '@mui/material'
import {forwardRef} from 'react'
import moment from 'moment'


const Template15 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
            <Stack spacing= {2} ref= {ref}>

                <Stack sx= {{p: 2}} >
                    <Typography variant= 'h3' sx= {{ textTransform: 'uppercase'}}>
                        {contact?.firstName} {' '} {contact.lastName}
                    </Typography>

                    <Stack spacing= {1} direction= 'row' alignItems= 'center' divider= {<Divider flexItem orientation= 'vertical'/>}>
                       <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.email}
                         </Typography>
                         <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.phone}
                         </Typography>
                         <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.address.street}
                         </Typography>
                    </Stack>
                <Divider flexItem sx= {{border: `1px solid`, my: 1}} />
                </Stack>

                <Stack>

            <Stack spacing= {2} sx= {{py: 2, px: 1}}>

            {/* Professional Summary */}
            {
                summary.length > 0 &&
            
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
            <Grid item xs= {12} md= {4}>
                <Typography sx= {{color}} variant= 'overline'>
                    PROFESSIONAL SUMMARY
                </Typography>
                </Grid>

            <Box sx= {{width: '100%'}}>
                <Typography component= 'p' sx= {{fontSize: '13px', width: '100%'}}>
                {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
               </Typography>
               </Box>
            </Stack>
            }
            
            {/* -------------------- */}

            {/* Work History */}
            {
                experience.length > 0 && 
            
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
                <Grid item xs= {12} md= {3}>
                <Typography sx= {{color}} variant= 'overline'>
                    work history
                </Typography>
                </Grid>

                <Box sx= {{width: '100%'}}>
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
            
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
            <Grid item xs= {12} md= {4}>
                <Typography sx= {{color}} variant= 'overline'>
                    education
                </Typography>
              </Grid>

                <Box sx= {{width: '100%'}}>
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
            </Box>
            </Stack>
            }
            
            {/* -------------------- */}

            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
            <Grid item xs= {12} md= {3}>
                <Typography sx= {{color}} variant= 'overline'>
                    certificates
                </Typography>
              </Grid>

                <Box sx= {{width: '100%'}}>
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
            </Box>
            </Stack> 
            }
            {/* -------------------- */}

            {/* Reference Summary */}
            {
                reference.length > 0 &&
            
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
                <Grid item md= {3} xs= {12}>
                <Typography sx= {{color}} variant= 'overline'>
                    reference
                </Typography>
                </Grid>

                <Box sx= {{width: '100%'}}>
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
                                {ref.name}
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
                
            <Stack spacing= {1} direction= 'row' alignItems= 'flex-start'>
            <Grid item xs= {12} md= {3}>
                <Typography sx= {{color}} variant= 'overline'>
                    skills
                </Typography>
                
                </Grid>
               <Box sx= {{width: '100%'}}>
               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}} >
                    {
                        skills.map((skill, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {skill} variant="outlined" />
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
           
            <Stack spacing= {1} direction= 'row' alignItems= 'center' >
            <Grid item xs= {12} md={3}>
                <Typography sx= {{color}} variant= 'overline'>
                    hobbies
                </Typography>
                </Grid>
               <Box sx= {{width: '100%'}}>
               <Stack direction= 'row' alignItems= 'center' justifyContent= 'flex-start' spacing= {1} sx= {{flexWrap: 'wrap', width: '100%'}} >
                    {
                        hobbies.map((hobby, index) => (
                            <Chip sx= {{m: 1}} key= {index} label= {hobby} variant="outlined" />
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
                
                <Stack spacing= {1} direction= 'row' alignItems= 'center' >
                <Grid item xs= {12} md= {3}>
                <Typography sx= {{color}} variant= 'overline'>
                    language
                </Typography>
                </Grid> 
                <Box sx= {{width: '100%'}}>
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

export default Template15