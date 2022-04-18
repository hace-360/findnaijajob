import styles from './template3.module.scss'
import {Stack, Divider, Avatar} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react'
import moment from 'moment'


const Template3  = React.forwardRef(({user, color, sx}, ref)=> {

    const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
        <div className={styles.template3} id= 'handle' ref={ref} style= {{...sx}}>

        <aside style= {{border: color && `3px solid ${color}`}}>
            <div>
            <Stack spacing= {1} alignItems='center'>
                <Avatar
                    src={contact.previewImg || contact?.photoURL  || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
                    alt={contact?.firstName || 'Guest'}
                    variant="rounded"
                    sx={{ width: 170, height: 200 }}
                />
            {/* <img 
                src={contact.photoURL || 'http://hickspartners.com/wp-content/uploads/2021/04/personPlaceholderImage.jpeg'} 
                alt="User Image"
            /> */}
            <h1>{contact.firstName || ''} {contact.lastName || ''}</h1>
            <h4>{contact.title || ''}</h4>
            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
                <PhoneIcon fontSize='18px' />
                <em>{contact.phone || ''}</em>
            </Stack>

            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
                <EmailIcon fontSize='18px' />
                <em>{contact.email || ''}</em>
            </Stack>

            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
                <HomeIcon fontSize='18px' />
                <em>{`${user?.address?.street || ''} ${user?.address?.city || ''} ${user?.address?.state || ''}`}</em>
            </Stack>
            
            </Stack>
            </div>

        </aside>

        <section>
        <Stack
            direction="column"
            alignItems= 'flex-start'
            divider={<Divider flexItem />}
            spacing={2}
        >
            {
                experience.length > 0 && 
            
            <div style= {{color}}>
                <h2 style= {{color}}>experience</h2>
                {
                    experience.map((work, i) => (
                        <span key= {i} style= {{border: color && `1px solid ${color}`}}>
                            <h3>{work.name} <em> {`${work.startDate && moment(work.startDate).format('LL')} - ${work.endDate && moment(work.endDate).format('LL')}`} </em> </h3>
                            <h3> role : <em>{work.role}</em> </h3>
                            <ul>
                            <h3> Details</h3>
                            <ul>
                                <li><div dangerouslySetInnerHTML={{__html: work.description}} /></li>
                            </ul>
                        </ul>
                        </span>
                    ))
                }
            </div>
            }
            {
                education.length > 0 &&
            <div style= {{color}}>
                <h2>education</h2>

                {
                    education.map((edu, i) => (
                        <span key= {i} style= {{border: color && `1px solid ${color}`}}>
                            <h3>{edu.name} <em> {`${edu.startDate && moment(edu.startDate).format('LL')} - ${edu.endDate && moment(edu.endDate).format('LL')}`} </em> </h3>
                            <h3> major : <em>{edu.major}</em> </h3>
                            <h3> degree : <em>{edu.degree}</em> </h3>
                            <ul>
                            <p>{edu.desription}</p>
                        </ul>
                        </span>
                    ))
                }
            </div>
            }

            {/* <div style= {{color}}>
                <h2>Honors & Awards</h2>

                {
                    honors.map((honor, i) => (
                        <span key= {i} style= {{border: color && `1px solid ${color}`}}>
                            <h3>{honor.name} <em> {honor.subtitle} </em> </h3>
                            <ul>
                            <p><div dangerouslySetInnerHTML={{__html: honor.description}} /></p>
                        </ul>
                        </span>
                    ))
                }
            </div> */}
            {
                reference.length > 0 &&
            <div style= {{color}}>
                <h2>reference</h2>
                <Stack direction= 'row' gap= {1} sx= {{py: 1}} flexWrap= 'wrap'>
                {
                    reference.map((ref, i) => (
                        <span key= {i} style= {{border: color && `1px solid ${color}`}}>
                            <h3>name: <em> {`${ref.name}`} </em> </h3>
                            <h3> position: <em>{ref.position}</em> </h3>
                            <h3> email: <em>{ref.email}</em> </h3>
                            <h3> phone: <em>{ref.phone}</em> </h3>
                            <p><div dangerouslySetInnerHTML={{__html: ref.description}} /></p>
                        </span>
                    ))
                }
                </Stack>
            </div>
            }


        </Stack>
        </section>

        </div>
    )
})

export default Template3