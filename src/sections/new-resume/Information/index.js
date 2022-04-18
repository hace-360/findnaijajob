import {Grid, Stack,Divider, Container} from '@mui/material'
import Preview from './Preview'
import FooterComponent from './FooterComponent'
import Contact from './Contact'
import WorkHistory from './WorkHistory'
import Skills from './Skills'
import Hobbies from './Hobbies'
import Certificates from './Certificates'
import Education from './Education'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import ProfessionalSummary from './ProfessionalSummary'
import Language from './language'
import {m} from 'framer-motion'



export default function Information ({current}) {

    const router = useRouter()
    const [hidePreview, setHidePreview] = useState(false)
    const [next, setNext] = useState()
    const goNext = () => {
        if (next == 'finalize cv') router.push('/resume/final-cv')
        else return next && Pages[next] && router.push(`/resume/section/${next}`)
    } 

    const getNextPage = () => {
        const nextPage = current && sections[sections.indexOf(current) + 1] ||  null
        setNext(nextPage)
    }

    const handleHidePreview = () => {
        if (!router.asPath.includes('contact')) setHidePreview(true)
        else setHidePreview(false)
    }

    useEffect(() => {
        getNextPage()
        handleHidePreview()
    }, [current])


    const Pages = {
        'contact': <Contact />,
        'work history' : <WorkHistory />,
        'education': <Education />,
        'skills': <Skills />,
        'professional summary': <ProfessionalSummary />,
        'language': <Language />,
        'hobbies': <Hobbies />,
        'certificates': <Certificates />
    }


    return (
        <m.div
        key= {next}
        initial= {{
            opacity: 0,
            translateX: -200
          }}
          animate= {{
            opacity: 1,
            translateX: 0,
          }}
          transition= {{
            duration: 0.3,
            delay: 0.2
          }}>
        <Container sx= {{py: 3, position: 'relative'}}>
            <Stack spacing= {3} divider= {<Divider flexItem />} sx= {{width: '100%'}}>

            <Grid container spacing= {1} >
                <Grid item xs={ hidePreview ? 12 : 9 }>
                    { Pages[current] }
                </Grid>
                <Grid 
                    item 
                    xs={3}
                    sx= {{
                            position: hidePreview && 'absolute',
                            right: hidePreview && 0
                        }}
                >
                   <Preview hide= {hidePreview} />
                </Grid>
            </Grid>

            <FooterComponent next= {next} goNext= {goNext} />
            </Stack>
        </Container>
        </m.div>
    )
}


const sections = [
    'contact',
    'work history',
    'education',
    'skills',
    'hobbies',
    'professional summary',
    'langauge',
    'certificates',
    'finalize cv'
  ]
