import {Stack, Typography, Divider, Chip, Rating, Paper, Box, Avatar, Grid} from '@mui/material'
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import Email from '@mui/icons-material/Email';
import LocationOn from '@mui/icons-material/LocationOn';
import {forwardRef} from 'react'
import moment from 'moment'


const Template7 = forwardRef(({color, user}, ref) => {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <div style= {{background: color, padding: '20px'}} ref= {ref} >
            <Stack bgcolor= 'white'>

                <Stack direction= 'row' spacing= {2} sx= {{p: 2}}>
                    <Stack spacing= {1}>
                        <Typography variant= 'h3' sx= {{textTransform: 'capitalize'}}>
                            {contact.firstName} {contact.lastName}
                        </Typography>

                        <Typography component= 'p' sx= {{fontSize: '13px'}}>
                        {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}
                        </Typography>
                    </Stack>

                    <Avatar
                        src= {contact.previewImg || contact.photoURL || ''}
                        alt= {contact.firstName.toUpperCase()}
                        variant= 'rounded'
                        sx= {{width: 140, height: 140}}
                    />
                </Stack>

                <Stack sx={{p: 2, bgcolor: color, width: '85%', border: !color && `1px solid grey`}} alignSelf= 'flex-end' spacing= {1}>
                    <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between'>
                        <Stack
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                        >
                            <PhoneInTalkIcon fontSize='17px' sx= {{color: color && 'white' }} />
                            <Typography component= 'p' sx= {{fontSize: '12px'}} color= {color && 'white'}>
                                {contact?.phone || ''}
                            </Typography>
                        </Stack>
                        <Stack
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                        >
                            <Email fontSize='17px' sx= {{color: color && 'white' }} />
                            <Typography component= 'p' sx= {{fontSize: '12px'}} color= {color && 'white'}>
                                {contact?.email}
                            </Typography>
                        </Stack>
                    </Stack>

                    <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between'>
                        <Stack
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                        >
                            <LocationOn fontSize='17px' sx= {{color: color && 'white' }} />
                            <Typography component= 'p' sx= {{fontSize: '12px'}} color= {color && 'white'}>
                                {contact.email}
                            </Typography>
                        </Stack>
                    </Stack>
                </Stack>

                <Stack spacing= {2} direction= 'row' sx= {{py: 3, px: 1}} divider= {<Divider flexItem orientation= 'vertical' />}>
                <Grid item xs= {12} md= {8}>

                    <Stack spacing= {3} >

                    {/* Experiance section */}
                    {
                        experience.length > 0 &&
                   
                    <Stack spacing= {1}>
                            <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '16px', bgcolor: color, opacity: 0.5 }} >
                                    <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                                        WORK EXPERIANCE
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
                                
                            <Divider sx= {{border: `1px solid ${color}`}} flexItem />
                        </Stack>
                         }
                    {/* -----------------------  */}

                    {/* Professinal section */}
                    {
                        education.length > 0 &&
                    <Stack spacing= {1}>
                            <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '16px', bgcolor: color, opacity: 0.5 }} >
                                    <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                                        EDUCATION
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
                                
                            <Divider sx= {{border: `1px solid ${color}`}} flexItem />
                        </Stack>
                        }
                    {/* -----------------------  */}

                    
            {/* Certificates Summary */}
            {
                certificate.length > 0 &&
            <Stack alignItems= 'center' sx= {{width: '100%'}} spacing= {1}>
                <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '16px', bgcolor: color, opacity: 0.5 }} >
                        <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                            CERTIFICATES
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
            <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '16px', bgcolor: color, opacity: 0.5 }} >
                        <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
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

                <Grid item xs= {12} md= {4}>

                <Stack spacing= {3}>

                     {/* Contact section */}
                   <Stack spacing= {1}>
                       <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '15px', bgcolor: color, opacity: 0.5 }} >
                            <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                                CONTACT
                            </Typography>
                       </Stack>
                       
                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <Typography variant= 'overline'>Address: </Typography>
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.address.street} {contact.address.city}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <Typography variant= 'overline'>Email: </Typography>
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.email}
                         </Typography>
                       </Stack>

                       <Stack direction='row' alignItems= 'center' spacing= {1}>
                         <Typography variant= 'overline'>Phone: </Typography>
                         <Typography component= 'p' sx= {{fontSize: '11px'}}>
                            {contact.phone}
                         </Typography>
                       </Stack>
                        
                        <Divider sx= {{border: `1px solid ${color}`}} flexItem />
                   </Stack>
                    {/* -----------------------  */}

                    {/* Skills section */}
                    {
                        skills.length > 0 &&
                    
                   <Stack spacing= {1}>
                       <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '15px', bgcolor: color, opacity: 0.5 }} >
                            <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                                SKILLS
                            </Typography>
                       </Stack>
                       
                        <ul style= {{fontSize: '12px'}}>
                            {
                                skills.map((skill, index) => (
                                    <li key= {index}>{skill}</li>
                                ))
                            }
                        </ul>
                        <Divider sx= {{border: `1px solid ${color}`}} flexItem />
                   </Stack>
                   }
                    {/* -----------------------  */}

                    {/* Hobbies section */}
                    {
                        hobbies.length > 0 &&
                   <Stack spacing= {1}>
                       <Stack spacing= {2} direction= 'row' alignItems= 'center' sx= {{width: '100%', height: '15px', bgcolor: color, opacity: 0.5 }} >
                            <Typography variant= 'button' sx= {{fontSize: '15px', bgcolor: 'white', paddingRight: 1}}>
                                HOBBIES
                            </Typography>
                       </Stack>
                       
                        <ul style= {{fontSize: '12px'}}>
                            {
                                hobbies.map((bobby, index) => (
                                    <li key= {index}>{bobby}</li>
                                ))
                            }
                        </ul>
                        <Divider sx= {{border: `1px solid ${color}`}} flexItem />
                   </Stack>
                   }
                    {/* -----------------------  */}

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

                </Grid>
            </Stack>
                
                
            </Stack>
        </div>
    )
})

export default Template7