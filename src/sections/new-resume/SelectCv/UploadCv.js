import {Typography, Paper, Stack, Button} from '@mui/material'
import {IconButtonAnimate} from '../../../components'
import ConvertToFormData from '../../../hooks/convertToFormData'
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios'
import {useState} from 'react'
import {ResumeState} from '../../../contexts/ResumeContext'
import { LoadingButton } from '@mui/lab';
import CachedIcon from '@mui/icons-material/Cached';
import {parseEducation, parseContact, parseExperience, parseRef} from './setDataFromCv'
import {useRouter} from 'next/router'
import {useSettings} from '../../../hooks'

export default function UploadCV ({animate, setAnimate}) {

    const handleUpload = () => !animate && setAnimate(true)

    return (
        <Paper variant= 'outlined' sx= {{width :'100%'}}>
            {
                animate ? 
                <UploadComponent /> :
                <IconButtonAnimate
                    fullWidth
                    sx= {{
                        borderRadius: '5px',
                        width: '100%',
                    }}
                    onClick= {handleUpload}
                >
                <Stack spacing= {2} alignItems= 'center' justifyContent='center' sx= {{height: 320}}>
                    <img 
                        src="https://imageupload.io/img/cloud-computing.png" 
                        alt="upload"
                        style= {{
                            width: '100%',
                            maxWidth: '100px',
                            objectFit: 'cover'
                        }}
                    />
                    <Typography variant= 'h5'>
                        I Already Have  A CV
                    </Typography>

                    <Stack alignItems= 'center'>
                        <Typography variant= 'body1'>
                            We'll reformat it and fill in your information 
                        </Typography>
                        <Typography variant= 'body2'>
                            so that you don't have to.
                        </Typography>
                    </Stack>
                </Stack>
                </IconButtonAnimate>
            }
            
        </Paper>
    )
}

function UploadComponent () {

    const {setContact, setSkills, setAllLang, setSummary, setAllExp, setAllRef, allRef, allEdu, setAllEdu, resetContact} = ResumeState()
    const [file, setFile] = useState('')
    const [loading, setLoading] = useState(false)
    const [parsed, setParsed] = useState(false)
    const [parsing, setParsing] = useState(false)
    const fileTypes = ["DOCX", "DOC", "PDF"]
    const {setAlert} = useSettings()
    const router = useRouter()
    // 
    const getPdfFile = (pdfFile) => {
        setLoading(true)
        setFile(pdfFile)
        setLoading(false)
    };


    // 
    const handleParseResume = async (file) => {

        try {
            // reset params
            setAllEdu([])
            setAllExp([])
            setSummary('')
            setAllLang([])
            setSkills([])
            resetContact()
            // 
            setParsing(true)
            const res = await axios.post('/resume', ConvertToFormData(file))
            if (res && res.data) {
                const data = res.data.data
                console.log(data)
                // Set Education
                parseEducation({allEdu, setAllEdu, payload: data?.education || ''})
                parseContact({setContact, payload: data})
                parseExperience({setAllExp, payload: data.workExperience})
                parseRef({setAllRef, allRef, payload: data.referees})
                // set skills
                const parsedSkills = data?.skills?.length > 0 ? data.skills.map(skill => skill.name) : []
                setSkills([...parsedSkills])
                setSummary(data?.objective || data?.summary || '')
                // set language
                const parsedLang = data?.languages?.length > 0 ? data?.languages.map(lang => (
                    {name: lang, level: 5}
                )) : []
                setAllLang([...parsedLang])

                setAlert({message: `${file?.name} successfuly parsed`})
            }
            
            setParsing(false)
            return setParsed(true)
        }
        catch(err) {
            setAlert({message: `an error occured`, type: 'error'})
            setParsing(false)
            console.log({
                success: false,
                message: err.message,
                data: null
            })
        }
    }
    





    return (
            <Stack spacing= {2} alignItems= 'center' justifyContent='center' sx= {{height: 320, cursor: 'pointer', border: '4px solid #00AB55', borderRadius: '5px'}}>

            {
                !parsed &&
                <>
                {
                    file && file.name &&
                    <Typography variant= 'body1' color= 'secondary'>
                        {file.name}
                    </Typography>
                }
                <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                    {
                    !parsing &&
                    <FileUploader handleChange={getPdfFile} name="file" types={fileTypes}>
                        <LoadingButton loading= {loading} variant="outlined">
                            {file ? 'Change CV' : 'select file'}
                        </LoadingButton>
                    </FileUploader>
                    }
                    {
                        file &&
                        <LoadingButton 
                            loadingPosition="start"
                            variant= 'outlined'
                            loading= {parsing}
                            onClick= { () => handleParseResume(file)}
                            startIcon={parsing && <CachedIcon />}
                        >
                            {parsing ? 'Parsing CV...' : 'Use CV'}
                        </LoadingButton>
                    }
                    
                </Stack>
                <Typography variant= 'body3' >
                    Acceptable file types:
                    DOCS, DOCX, PDF
                </Typography>
                </>
            }

            {
                parsed &&
                <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                    <img
                        src="https://c.tenor.com/CNm0_yEu2JYAAAAM/dance.gif" alt="smiley"
                        style= {{
                            display: 'flex',
                            width: '100%',
                            maxWidth: '200px',
                            objectFit: 'cover'
                        }}
                    />
                    <Stack>
                        <Typography color= 'primary'>
                            We've successfuly extracted useful information from <strong>{file?.name || 'your file'}</strong>
                        </Typography>
                        <Typography onClick= {() => router.push('/resume/section/contact')} variant= 'overline' color= 'inherit'>
                            click next to continue
                        </Typography>
                    </Stack>
                    
                </Stack>
            }
            </Stack>
    )
}

