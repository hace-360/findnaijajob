import {ResumeHeader} from '../../layouts/header';
import styles from './styles/resume.module.scss'
import {Stack, Box, Divider, Paper, Avatar, Typography} from '@mui/material'
import {useSettings} from '../../hooks'
import ResumeSteps from './ResumeSteps';
import Forms from './Forms'
import {Page} from '../../components'
import Draggable from 'react-draggable';
import React, { useEffect, useState, useRef } from 'react';
import Templates from './Templates'
import FooterAction from './footerActions'
import ResumeDefaultValue from './ResumeDefaultValue'
import {data} from './Templates/data'
import Uploaded from './uploaded'
import {GetSinglePdf} from '../../hooks/getImages'
import {useRouter} from 'next/router'



// ----------------------------------------------------------------------


export default function Resume () {

    const {user, setAlert} = useSettings()
    const [form, setForm] = useState(ResumeDefaultValue())
    const [sampleData, setSampleData] = useState(true)
    const toggleSampleData = () => setSampleData(!sampleData)
    const router = useRouter()

    const restrictUser = () => {
        if (!user) {
            router.push('/')
        }
        if (user && user?.accountType == 'recruiter') {
            setAlert({message: 'create an applicant account to continue'})
            router.push('/')
        }
    }

    useEffect(() => {
        const updateForm = () => {
            return sampleData ? setForm({...form, ...data}) : setForm({...ResumeDefaultValue()})
        }
        restrictUser()
        updateForm()
        // 
    }, [sampleData, user])
    const [temp, setTemp] = useState(0)
    const componentRef = useRef();

    // uploade pdf section
    const [hideResume, setHideResume] = useState(false)
    const [upload, setUpload] = useState('')
    const getPdf = async (e) => {
        const pdf = await GetSinglePdf(e)
        if (pdf.success && pdf.data) {
            setUpload(URL.createObjectURL(pdf.data))
            setHideResume(true)
        }
    }

  return (
      <Page title= 'Build your resume'>

        <div className= {styles.resume}>

            <aside>
                <Stack
                    alignItems='center'
                    justifyContent='flex-start'
                    direction= 'row'
                    divider= {<Divider flexItem orientation= 'vertical' />}
                    spacing= {2}
                    sx= {{
                        p: 4,
                        bgcolor: '#161C24'
                    }}
                    minHeight= '150px'
                >
                    {user &&
                    <>
                    <Avatar
                        alt={form?.displayName || 'Guest'}
                        src={form?.photoURL || ''}
                        sx={{ width: 80, height: 80 }}
                    />
                    <Stack
                       divider= {<Divider flexItem orientation= 'vertical' />} 
                    >
                        <Typography variant= 'body3' color= 'secondary'>
                            <strong>Username</strong> :  {user?.email.split('@')[0] || ' '}
                        </Typography>
                        <Typography variant= 'body3' color= 'secondary'>
                        <strong>Email</strong> :  {user?.email || ''}
                        </Typography>
                        <Typography variant= 'body3' color= 'primary'>
                        <strong>credit</strong> : 5
                        </Typography>
                    </Stack>
                    </> 
                    }
                </Stack>
                <Divider flexItem />
                <div className= {styles.aside_main}>
                    <ResumeSteps form= {form} setForm= {setForm} steps={Forms({form, setForm})}  />
                </div>
            </aside>

            <section>
                <header> <ResumeHeader setTemp= {setTemp} temp= {temp} getPdf= {getPdf} upload= {upload} /> </header>

                <main>

                    { upload && <Uploaded upload= {upload} hideResume={hideResume} />}

                    {!hideResume &&
                    <Draggable
                        handle="#handle"
                        defaultPosition={{x: 50, y: 30}}
                    >
                        <Paper
                            variant= 'elevation'
                            elevation= {15}
                            sx= {{ 
                                width: '100%',
                                maxWidth: '800px'
                            }}
                        >
                            <div
                                style= {{
                                    position: hideResume &&  'absolute',
                                    width: hideResume &&  '800px'
                                }}
                            >
                            <Templates number= {temp} form= {form} componentRef= {componentRef} sampleData= {sampleData}/>
                            </div>
                        </Paper>
                    </Draggable>
                    }
                </main>
            </section>

            <FooterAction 
                componentRef= {componentRef}
                toggleSampleData= {toggleSampleData}
                sampleData= {sampleData}
                getPdf={getPdf}
                upload= {upload}
                setUpload= {setUpload}
                setHideResume= {setHideResume}
                hideResume= {hideResume}
            />

        </div>
       
    </Page>
  );
}
