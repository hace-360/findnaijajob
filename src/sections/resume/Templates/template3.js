import styles from './template3.module.scss'
import {Stack, Divider, Avatar} from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react'


export const Template3  = React.forwardRef(({user}, ref)=> {

    const test= ''

    return (
        <div className={styles.template3} id= 'handle' ref={ref}>

        <aside>
            <div>
            <Stack spacing= {1} alignItems='center'>
                <Avatar
                    src={user.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
                    alt={user.name || 'Guest'}
                    variant="rounded"
                    sx={{ width: 170, height: 200 }}
                />
            {/* <img 
                src={user.photoURL || 'http://hickspartners.com/wp-content/uploads/2021/04/personPlaceholderImage.jpeg'} 
                alt="User Image"
            /> */}
            <h1> {user.name || ''} </h1>
            <h4>{user.title || ''}</h4>
            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >
                <PhoneIcon fontSize='18px' />
                <em>{user.phone || ''}</em>
            </Stack>

            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
                <EmailIcon fontSize='18px' />
                <em>{user.email || ''}</em>
            </Stack>

            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={1}
                >
                <HomeIcon fontSize='18px' />
                <em>{user.address || ''}</em>
            </Stack>
            
            </Stack>
            </div>

        </aside>

        <section>
        <Stack
            direction="column"
            alignItems= 'flex-start'
            divider={<Divider />}
            spacing={2}
        >

            <div>
                <h2>experience</h2>
                {
                    user.experience.map((work, i) => (
                        <span key= {i}>
                            <h3>{work.name} <em> {`${work.startDate} - ${work.endDate}`} </em> </h3>
                            <h3> role : <em>{work.role}</em> </h3>
                            <ul>
                            <h3> Details</h3>
                            {
                            work.description.map((desc, i) => (
                                <li key= {i}>{desc}</li>
                            ))
                            }
                        </ul>
                        </span>
                    ))
                }
            </div>

            <div>
                <h2>education</h2>

                {
                    user.education.map((edu, i) => (
                        <span key= {i} style= {{maxWidth: '500px'}}>
                            <h3>{edu.name} <em> {`${edu.startDate} - ${edu.endDate}`} </em> </h3>
                            <h3> major : <em>{edu.major}</em> </h3>
                            <h3> degree : <em>{edu.degree}</em> </h3>
                            <ul>
                            <p>{edu.desription}</p>
                        </ul>
                        </span>
                    ))
                }
            </div>

            <div>
                <h2>Honors & Awards</h2>

                {
                    user.honors.map((honor, i) => (
                        <span key= {i} style= {{maxWidth: '500px'}}>
                            <h3>{honor.name} <em> {honor.subtitle} </em> </h3>
                            <ul>
                            <p>{honor.description}</p>
                        </ul>
                        </span>
                    ))
                }
            </div>

            <div>
                <h2>reference</h2>
                <Stack direction= 'row' gap= {1} sx= {{py: 1}} flexWrap= 'wrap'>
                {
                    user.reference.map((ref, i) => (
                        <span key= {i} style={{ maxWidth: '49%', margin: 0 }}>
                            <h3>name: <em> {`${ref.name}`} </em> </h3>
                            <h3> position: <em>{ref.position}</em> </h3>
                            <h3> email: <em>{ref.email}</em> </h3>
                            <h3> phone: <em>{ref.phone}</em> </h3>
                            <p>{ref.description}</p>
                        </span>
                    ))
                }
                </Stack>
            </div>


        </Stack>
        </section>

        </div>
    )
})