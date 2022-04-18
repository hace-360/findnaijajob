import {Paper, Stack,TextField, Autocomplete, MenuItem, Checkbox, FormControlLabel, Divider, Button, Typography, Box, InputAdornment, Avatar} from '@mui/material'
import JobBenefit from './JobBenefit'
import Skills from './Skills'
import Language from './Language'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {useState} from 'react'
import { LoadingButton } from '@mui/lab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {GetSingleImage} from '../../../../hooks/getImages'
import {useSettings, useResponsive} from '../../../../hooks'
import {useRouter} from 'next/router'
import {useEffect, memo} from 'react'
import {StatesFilter, JobCatFilter, CountryFilter} from './filters'
import ExperienceSlider from './experienceSlider'
import SalarySlider from './salarySlider'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import JobDescription from './Description'



 const JobPost = ({job}) => {

    const isDesktop = useResponsive('up', 'md')
    const {user, jobAction, setAlert} = useSettings()
    const [form, setForm] = useState({...defaultValue})
    const [prevImg, setPrevImg] = useState(user?.photoURL || '')
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getAddress = (e) => setForm({...form, address: { ...form.address, [e.target.name]: e.target.value }})
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const getCompany = (e) => {
        setForm({
            ...form, company: { ...form?.company, [e.target.name]: e.target.value }
        })
    }

    // same address setting
    const [sameAdd, setSameAdd] = useState(false)
    const toggleSameAdd = () => setSameAdd(!sameAdd)

    // 
    const [showSalary, setShowSalary] = useState(true)
    const handleToggleShowSalary = () => {
        setForm({...form, salary: [0, 0]})
        setShowSalary(!showSalary)
    }


    const getPhoto = async (e) => {
        let img = await GetSingleImage(e)
        if (!img.success) setAlert({message: (await img).message, type: 'error'})
        setForm({...form, company: {...form.comapny, logo: img.data}})
        setPrevImg(URL.createObjectURL(img.data))
    }

    const close = () => router.push('/profile')
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        await jobAction.create({form, setAlert, close})
        return setLoading(false)
    }

    return (
            <Stack spacing= {2}>
                <Stack 
                    spacing= {2}
                >
                    <Typography variant= 'button' color= 'secondary'>
                        COMPANY DETAILS
                    </Typography>
                    <Divider flexItem />

                    <Stack direction= {isDesktop ? 'row' : 'column'} alignItems='center' spacing= {2}>
                   <Stack alignItems='center' >
                        <Box
                            component='span'
                            sx= {{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                border: '1px dashed #808080',
                                borderRadius: '10px',
                                width: 100,
                                height: 100,
                                cursor: 'pointer',
                                marginBottom: 1
                            }}
                        >
                            <Avatar
                                src={prevImg || ''}
                                alt={ form?.firstName || 'Guest'}
                                sx={{ width: 80, height: 80}}
                                variant="rounded"
                            />
                            <Box
                                component= 'label'
                                htmlFor='companyLogo'
                                onChange= {getPhoto}
                                sx= {{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    width: 80,
                                    height: 80,
                                    borderRadius: '10px',
                                    backgroundColor: 'black',
                                    opacity: 0,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.8, 
                                    }
                                }}
                            >
                                <input 
                                    style= {{display: 'none'}}
                                    type="file" name="companyLogo" id="companyLogo"
                                    onChange= {getPhoto}
                                />
                                <AddAPhotoIcon sx= {{color: 'white'}} />
                                <Typography variant='body3' sx= {{textAlign: 'center', color: 'white', fontSize: '10px'}}>
                                    company logo
                                </Typography>
                            </Box>
                        </Box>
                    </Stack>

                    <TextField 
                      label= 'Company Name'
                      fullWidth
                      value= {form?.company?.name || ''}
                      name= 'name'
                      onChange= {getCompany}
                    />
                    </Stack>

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <TextField 
                            label= 'company email'
                            fullWidth
                            value= {form?.company?.email || ''}
                            name= 'email'
                            onChange= {getCompany}
                        />
                        
                        <TextField
                            label="company website"
                            id="outlined-website-company"
                            fullWidth
                            value= {form?.company?.website || ''}
                            name= 'website'
                            onChange= {getCompany}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Typography variant= 'body3' color= 'primary'>
                                        https://www.
                                    </Typography>
                                </InputAdornment>
                            }}
                            />
                    </Stack>

                    <TextField 
                        label= 'Address'
                        fullWidth
                        value= {form?.company?.street || ''}
                        name= 'street'
                        onChange= {getCompany}
                    />

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <StatesFilter form= {form} setForm= {setForm} label= 'company' />

                        <CountryFilter setForm= {setForm} form= {form} label= 'company' />
                    </Stack>

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <TextField 
                        label= 'City'
                        fullWidth
                        value= {form?.company?.city}
                        name= 'city'
                        onChange= {getCompany}
                        />

                        <TextField 
                            label= 'Phone Number'
                            fullWidth
                            value= {form?.company?.phone || ''}
                            name= 'phone'
                            onChange= {getCompany}
                        />
                        
                    </Stack>
                    <Divider flexItem />

                    {/* ---------------- JOB DETAILS ---------------------- */}
                    <Stack
                        spacing= {2}
                    >
                        <Typography variant= 'button' color= 'secondary'>
                            JOB DETAILS
                        </Typography>
                    </Stack>

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <TextField 
                            label= 'Job Title'
                            fullWidth
                            value= {form?.title || ''}
                            name= 'title'
                            onChange= {getForm}
                        />
                        <JobCatFilter setForm= {setForm} form= {form} />
                    </Stack>

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <TextField 
                        label= 'Application Email'
                        fullWidth
                        value= {form?.email || ''}
                        name= 'email'
                        onChange= {getForm}
                        />
                    </Stack>

                    <Stack>
                    <FormControlLabel control={<Checkbox value= {showSalary} onChange= {handleToggleShowSalary} />} label="Hide salary" />
                    </Stack>

                        
                    {showSalary && 
                    <Stack
                        direction= 'row'
                        alignItems='center'
                        spacing= {2}
                    >
                        <SalarySlider form= {form} setForm= {setForm} />

                        <TextField
                            label= {form?.salary[0] ? "Salary Average" : "Salary"} 
                            id="outlined-start-currency"
                            value= {form?.salary[1] || ''}
                            name= 'Basic salary'
                            onChange= {(e) => setForm({...form, salary: [0, e.target.value]})}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">
                                    <Typography variant= 'button' color= 'primary'>
                                        ₦
                                    </Typography>
                                </InputAdornment>
                            }}
                            /> 
                    </Stack>}

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <Autocomplete
                            disablePortal
                            fullWidth
                            name= 'qualification'
                            value= {form?.qualification || ''}
                            isOptionEqualToValue= {(option, value) => option == value || option !== value}
                            onChange= {(event, value) => setForm({...form, qualification: value})}
                            id="combo-box-qualification"
                            options={qualification}
                            renderInput={(params) => <TextField fullWidth {...params} label="Minimun Qualification" />}
                        />
                        <ExperienceSlider form= {form} setForm= {setForm} />
                    </Stack>

                    <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                        <Autocomplete
                            disablePortal
                            fullWidth
                            name= 'mode'
                            value= {form?.mode || ''}
                            isOptionEqualToValue= {(option, value) => option == value || option !== value}
                            onChange= {(event, value) => setForm({...form, mode: value})}
                            id="combo-box-mode"
                            options={['remote', 'on site', 'others']}
                            renderInput={(params) => <TextField fullWidth {...params} label="Work Mode" />}
                        />

                        <Autocomplete
                            disablePortal
                            fullWidth
                            name= 'type'
                            value= {form?.type || ''}
                            isOptionEqualToValue= {(option, value) => option == value || option !== value}
                            onChange= {(event, value) => setForm({...form, type: value})}
                            id="combo-box-type"
                            options={['full time', 'part time', 'freelance']}
                            renderInput={(params) => <TextField fullWidth {...params} label="Job Type" />}
                        />
                    </Stack>

                    <FormControlLabel 
                        control={
                            <Checkbox value= {sameAdd}/>}
                        onChange= {toggleSameAdd}
                        label="Job address is the same with company address"
                    />

                    {
                        !sameAdd &&
                        <>
                        <TextField 
                            label= 'Address'
                            fullWidth
                            value= {form?.address?.street || ''}
                            name= 'street'
                            onChange= {getAddress}
                        />

                        <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                            <StatesFilter form= {form} setForm= {setForm} label= 'address' />
                            
                            <CountryFilter setForm= {setForm} form= {form} label= 'address' />
                        </Stack>

                        <Stack spacing= {2} direction= 'row' alignItems= 'center'>
                            <TextField 
                                label= 'City'
                                fullWidth
                                value= {form?.address?.city}
                                name= 'city'
                                onChange= {getAddress}
                            />

                            <TextField 
                                label= 'Phone Number'
                                fullWidth
                                value= {form?.phone || ''}
                                name= 'phone'
                                onChange= {getForm}
                            />
                            
                        </Stack>
                        </>
                    }

                    <Stack
                        direction="row"
                        alignItems= 'center'
                        justifyContent= 'space-between'
                        spacing= {5}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Application Deadline"
                            value={form?.deadline || ''}
                            onChange={(newValue) => {
                            setForm({...form, deadline: newValue});
                            }}
                            renderInput={(params) => <TextField  {...params} />}
                        />
                        </LocalizationProvider>

                        <FormControlLabel control={<Checkbox value= {form?.isUrgent ||''} />} label="Is urgent" />
                    </Stack>

                    <Skills form= {form} setForm= {setForm} />

                    <JobBenefit form= {form} setForm= {setForm} />

                    <Language form= {form} setForm= {setForm} />
                    <Stack spacing= {0.5}>
                        <Typography variant= 'overline'>
                            Job Description
                        </Typography>

                        <JobDescription setForm= {setForm} form= {form} />

                    </Stack>

                    {/* <TextField
                        label= 'Job Description'
                        name= 'content'
                        fullWidth
                        multiline
                        rows={8}
                        value= {form?.content}
                        onChange= {getForm}
                        placeholder='e.g - Whats the job description'
                    /> */}

                </Stack>
                

                <Stack spacing= {2} direction= 'row' alignItems='center' justifyContent='space-between'>
                    <Button
                        variant="outlined"
                        onClick= {() => router.back()}
                    >
                        Cancel
                    </Button>
                    <LoadingButton 
                        variant="contained"
                        loadingPosition="start"
                        loading= {loading}
                        onClick= {handleSubmit}
                        startIcon={ <WorkOutlineIcon />}
                    >
                        {loading ? 'Posting job...' : 'Post job'}
                    </LoadingButton>
                </Stack>
            </Stack>
    )
}

export default memo(JobPost)

const qualification= [
     'Phd',
     'MSc',
     'BSc',
     'HND',
     'OND',
     'SSCE',
     'Primary',
     'None',
  ]

  
const defaultValue = {
    company: {
        name: '',
        email: '',
        logo: '',
        website: '',
        city: '',
        state: '',
        country: '',
        street: '',
        phone: ''
    },
    category: '',
    deadline: '',
    experience: [0, 2],
    title: '',
    salary: [100000, 400000],
    type: '',
    mode: '',
    qualification: '',
    email: '',
    languages: [],
    isUrgent: '',
    skills: [],
    phone: '',
    address: {
        state: '',
        street: '',
        country: '',
        city: ''
    },
    benefits: [],
    content: 'This is the initial content'
  }