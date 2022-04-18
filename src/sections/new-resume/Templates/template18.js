import {Stack, Typography, Divider, Chip, Rating, Paper, Box, Grid} from '@mui/material'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import { forwardRef } from 'react';
import moment from 'moment'


const Template18 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <Stack ref= {ref}>
            <Stack alignItems= 'center' justifyContent= 'center' sx= {{p:3}}>
                <Typography variant= 'h3' sx= {{textTransform: 'uppercase', color}}>
                    {contact.firstName} {contact.lastName}
                </Typography>
            </Stack>

            <Stack alignItems= 'center'>
                <Divider flexItem sx= {{border: `1px solid`, maxWidth: '85%', alignSelf: 'center', width: '100%'}} />
                <Stack direction= 'row' alignItems= 'flex-start' sx= {{bgcolor: '#D9F0F8', p: 2}} spacing= {3}>
                    {/* Contact section */}
                   <Stack spacing= {1}>

                   <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                        contact
                    </Typography>
                       
                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <LocationOn fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.address.street} {contact.address.city}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <Email fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.email}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <PhoneInTalkIcon  fontSize= 'small' />
                         <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {contact.phone}
                         </Typography>
                       </Stack>
                        
                   </Stack>
                    {/* -----------------------  */}
                    {/* Professinal section */}
                    {
                        summary.length > 0 &&
                   
                    <Stack spacing= {1}>
                            <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                                    <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                                        PROFESSIONAL SUMMARY
                                    </Typography>
                            </Stack>
                            
                            <Typography component= 'p' sx= {{fontSize: '12px'}}>
                            {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
                            </Typography>
                        </Stack>
                         }
                    {/* -----------------------  */}
                </Stack>
            </Stack>

            <Stack direction= 'row' alignItems= 'flex-start' sx= {{p: 2}} spacing= {3}>

                <Grid item xs= {12} md= {4}>
                    <Stack spacing= {2}>
                        {/* Skills section */}
                        {
                            skills.length > 0 &&
                        
                   <Stack spacing= {1}>
                        <Stack>
                            <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                                SKILLS
                            </Typography>
                           <Divider flexItem sx= {{color: color && 'white'}} />
                       </Stack>
                       
                        <ul style= {{fontSize: '12px'}}>
                            {
                                skills.map((skill, index) => (
                                    <li key= {index}>{skill}</li>
                                ))
                            }
                        </ul>
                   </Stack>
                   }
                    {/* -----------------------  */}

                    {/* Hobbies section */}
                    {
                        hobbies.length > 0 &&
                    
                   <Stack spacing= {1}>
                        <Stack>
                            <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                                HOBBIES
                            </Typography>
                           <Divider flexItem sx= {{color: color && 'white'}} />
                       </Stack>
                       
                        <ul style= {{fontSize: '12px'}}>
                            {
                                hobbies.map((bobby, index) => (
                                    <li key= {index}>{bobby}</li>
                                ))
                            }
                        </ul>
                   </Stack>
                   }
                    {/* -----------------------  */}

                {/* Languages section */}
                {
                    language.length > 0 &&
               
             <Stack >
                    <Stack>
                        <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                            LANGUAGE
                        </Typography>
                        <Divider flexItem sx= {{color: color && 'white'}} />
                    </Stack>

               <Stack direction= 'row' alignItems= 'center' spacing= {1} sx= {{flexWrap: 'wrap'}}>
                    {
                        language.map((lang, index) => (
                            <Chip 
                                key= {index}
                                sx= {{m: 1}} 
                                label= {
                                    <Typography sx= {{ fontSize: '12px', display: 'flex', alignItems: 'center', color: color && 'white' }} variant= 'button'>
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
                </Grid>

                <Grid item xs= {12} md= {8}>
                    <Stack spacing= {2}>
                         {/* Experiance section */}
                         {
                             experience.length > 0 &&
                         
                            <Stack spacing= {1}>
                            <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                                    <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                                        work experience
                                    </Typography>
                            </Stack>
                            
                            <Stack spacing= {2} alignItems= 'flex-start'>
                                {
                                    experience.map((exp, index) => (
                                        <Box
                                            key= {index}
                                            component= 'div'
                                            sx= {{ p: 1, width: '100%' }}
                                        >
                                        <Stack 
                                            direction="row"
                                            alignItems= 'center'
                                            spacing= {1}
                                            sx= {{width: '100%'}}
                                        >
                                            <Typography sx= {{ fontSize: '12px' }} color= {color} variant= 'button'>
                                                {exp.title} / {exp.employer}
                                            </Typography>
                                            {','}
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
                                
                        </Stack>
                        }
                    {/* -----------------------  */}

                    {/* Professinal section */}
                    {
                        education.length > 0 &&
                    
                    <Stack spacing= {1}>
                        <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                                <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                                    education
                                </Typography>
                        </Stack>
                            
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
                                                
                                            </Stack>
                                        </Paper>
                                    ))
                                }
                            </Stack>
                                
                        </Stack>
                        }
                    {/* -----------------------  */}

                    
            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            
            <Stack alignItems= 'center' sx= {{width: '100%'}} spacing= {1}>
                <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                            certificates
                        </Typography>
                </Stack>

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
                            spacing= {1.5}
                            justifyContent= 'space-between'
                            sx= {{width: '100%'}}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px', color: color }} variant= 'button'>
                               {cert.name} / {cert.authority} 
                            </Typography>
                            <Typography variant= 'body2' sx= {{color: 'text.secondary', fontSize: '12px'}}>{ cert.year && moment(cert.year).format('LL')}</Typography>
                            
                        </Stack>
                            <Typography key= {index} sx= {{ fontSize: '11px' }} component= 'p'>
                            <div dangerouslySetInnerHTML={{__html: cert.description}} />
                            </Typography>
                        </Box>
                    ))
                }
            </Stack>
            </Stack> 
            }
            {/* -------------------- */}

            {/* Reference Summary */}
            {
                reference.length > 0 &&
           
            <Stack alignItems= 'center' sx={{width: '100%'}} spacing= {1}>
            <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <Typography variant= 'overline' sx= {{fontSize: '14px'}}>
                            REFERENCE
                        </Typography>
                </Stack>

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
                            <Typography sx= {{ fontSize: '12px', color: color }} component= 'li'>
                                {ref.name}
                            </Typography>

                            <Typography sx= {{ fontSize: '12px', color: color }} component= 'li'>
                                {ref.phone}
                            </Typography>

                            <Typography sx= {{ fontSize: '12px', color: color }} component= 'li'>
                                {ref.email}
                            </Typography>
                            
                        </Stack>
                        <Divider flexItem />
                        <Typography key= {index} sx= {{ fontSize: '12px' }} variant= 'p'><div dangerouslySetInnerHTML={{__html: ref.description}} /></Typography>
                        </Box>
                    ))
                }
            </Stack>
            </Stack>
             }
            {/* -------------------- */}
                    </Stack>
                </Grid>

            </Stack>
        </Stack>
    )
})

export default Template18