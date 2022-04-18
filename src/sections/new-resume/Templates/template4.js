import styles from './template4.module.scss'
import {Stack,Avatar} from '@mui/material'
import * as React from 'react'
import moment from 'moment'


const Template4  = React.forwardRef(({user, color, sx}, ref)=> {

  const {contact, summary, experience, skills, hobbies, language, education, certificate, honors, reference} = user

    return (
      <div className= {styles.template4} id= 'handle' ref={ref} style= {{...sx}}>
        <header style= {{background: color}}>
          <Avatar
              src={contact.previewImg || contact.photoURL  || 'https://tieuniversity.org/wp-content/uploads/2021/11/blank-photo.jpg'}
              alt={contact.firstName || 'Guest'}
              variant="square"
              sx={{ width: 180, height: 180 }}
          />
          {/* <img src={contact.photoURL || 'http://hickspartners.com/wp-content/uploads/2021/04/personPlaceholderImage.jpeg'} alt="User Image"/> */}

          <div className= {styles.header_details}>
              <h1>{contact.firstName || ''} {contact.lastName || ''}</h1>
              <em>{contact.title || ''}</em>

              <p>
                <span>
                  phone:
                </span>
                {contact.phone}
              </p>
              <p>
                <span>
                  address:
                </span>
                {`${contact?.address?.street || ''} ${contact?.address?.city || ''} ${contact?.address?.state || ''}`}
              </p>

              <p>
                <span>
                  email:
                </span>
                {contact.email}
              </p>

          </div>
        </header>

        {/* section */}

        <div className= {styles.container}>
          <section style= {{color}}>
          {summary && <div dangerouslySetInnerHTML={{__html: summary}} />}

            {
              experience.length > 0 &&
            <div>
              <h2 style= {{background: color, color: color && 'white'}}>experience</h2>
              {
                    experience.map((work, i) => (
                      <span key= {i}>
                          <h3>{work.name} <em> {`${work.startDate && moment(work.startDate).format('LL')} - ${work.endDate && moment(work.endDate).format('LL')}`} </em> </h3>
                          <h3> role : <em>{work.role}</em> </h3>
                          <ul>
                          <h3> Details</h3>
                            <li key= {i}><div dangerouslySetInnerHTML={{__html: work.description}} /></li>
                        </ul>
                      </span>
                    ))
                }
            </div>
             }

             {
               education.length > 0 &&
            <div>
              <h2 style= {{background: color, color: color && 'white'}}>education</h2>

              {
                    education.map((edu, i) => (
                      <span key= {i} style= {{maxWidth: '500px'}}>
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

            {/* <div>
              <h2>Honors & Awards</h2>

              {
                    honors.map((honor, i) => (
                      <span key= {i} style= {{maxWidth: '500px'}}>
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
            <div>
              <h2 style= {{background: color, color: color && 'white'}}>reference</h2>
                <Stack direction= 'row' gap= {1} sx= {{py: 1}} flexWrap= 'wrap'>
              {
                    reference.map((ref, i) => (
                      <span key= {i} style={{ maxWidth: '49%', margin: 0 }}>
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

          </section>

          <aside>
            {
              skills.length > 0 &&
              <div>
                <h2 style= {{background: color, color: color && 'white'}}>skills</h2>
                <ul>
                  {
                    skills.map((skill, i) => (
                      <li key= {i}>{skill}</li>
                    ))
                  }
                </ul>
              </div>
              }
              {
                language.length > 0 &&
              <div>
                <h2 style= {{background: color, color: color && 'white'}}>language</h2>
                <span>
                  {
                    language.map((lang, i) => (
                      <h3 key= {i}>
                        {`${lang.name}`}
                      </h3>
                    ))
                  }
                </span>
              </div>
              }

              {
                certificate.length > 0 &&
              <div>
                <h2 style= {{background: color, color: color && 'white'}}>certification</h2>
                {
                    certificate.map((cert, i) => (
                      <span key= {i}>
                          <h3> name : <em>{cert.name}</em> </h3>
                          <h3> authority : <em>{cert.authority}</em> </h3>
                          <h3> Details: <em><div dangerouslySetInnerHTML={{__html: cert.description}} /></em> </h3>
                      </span>
                    ))
                }
                
              </div>
              }
          </aside>
        </div>
    </div>
    )
})

export default Template4