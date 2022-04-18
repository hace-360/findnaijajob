import styles from './template4.module.scss'
import {Stack,Avatar} from '@mui/material'
import * as React from 'react'


export const Template4  = React.forwardRef(({user}, ref)=> {

    const test= ''

    return (
<div className= {styles.template4} id= 'handle' ref={ref}>
        <header>
          <Avatar
              src={user.photoURL || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
              alt={user.name || 'Guest'}
              variant="square"
              sx={{ width: 180, height: 180 }}
          />
          {/* <img src={user.photoURL || 'http://hickspartners.com/wp-content/uploads/2021/04/personPlaceholderImage.jpeg'} alt="User Image"/> */}

          <div className= {styles.header_details}>
              <h1>{user.name || ''}</h1>
              <em>{user.title || ''}</em>

              <p>
                <span>
                  phone:
                </span>
                {user.phone}
              </p>
              <p>
                <span>
                  address:
                </span>
                {user.address}
              </p>

              <p>
                <span>
                  email:
                </span>
                {user.email}
              </p>

          </div>
        </header>

        {/* section */}

        <div className= {styles.container}>
          <section>
            <p style= {{padding: '10px 0'}}>{user.objective || 'Objectives goes here...'}</p>

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

          </section>

          <aside>
              <div>
                <h2>skills</h2>
                <ul>
                  {
                    user.skills.map((skill, i) => (
                      <li key= {i}>{skill}</li>
                    ))
                  }
                </ul>
              </div>

              <div>
                <h2>language</h2>
                <span>
                  {
                    user.language.map((lang, i) => (
                      <h3 key= {i}>
                        {`${lang.name}`}
                      </h3>
                    ))
                  }
                </span>
              </div>

              <div>
                <h2>certification</h2>
                {
                    user.certificates.map((cert, i) => (
                      <span key= {i}>
                          <h3> name : <em>{cert.name}</em> </h3>
                          <h3> authority : <em>{cert.authority}</em> </h3>
                          <h3> Details: <em>{cert.description}</em> </h3>
                      </span>
                    ))
                }
                
              </div>
          </aside>
        </div>
    </div>
    )
})