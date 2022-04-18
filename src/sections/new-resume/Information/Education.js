import { Typography, Stack, Link,TextField, FormControlLabel,Checkbox, Button, Paper,Grid, Box,Menu,MenuItem, Tooltip } from "@mui/material"
import {useState} from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {ResumeState} from '../../../contexts/ResumeContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextArea from './TextArea'
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
import {TextMaxLine} from '../../../components'
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import {useLocalStorage, useSettings} from '../../../hooks'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';



export default function WorkHistory () {

    const {setAlert} = useSettings()
    const {education: form, setEducation: setForm, setAllEdu, allEdu, resetEducation} = ResumeState()
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getAddress = (e) => setForm({...form, address: {...form.address, [e.target.name]: e.target.value}})
    const toggleActive = () => {
        setForm({...form, endDate: '', active: !form.active})
    }
    const [showDescription, setShowDescription] = useState(form?.description || false)
    const handleSaveExp = () => {
        if (form.name && form.major) {
            setShowDescription(false)
            resetEducation()
            setAllEdu([...allEdu, form])
            return setAlert({message: 'Education added successfuly'})
        }
    }

    const [edit, setEdit] = useLocalStorage('editing-edu', { component: null, index: null, state: false })
    const resetEdit = () => setEdit({ component: null, index: null, state: false })

    const handleUpdate = () => {
        if (edit.state) {
           const list = allEdu
            list[edit.index] = form
            setAllEdu([...list])
            setShowDescription(false)
            setAlert({message: 'Education updated successfuly'})
            resetEducation()
            resetEdit()
        }
    }

    const handleExitEdit = () => {
        resetEdit()
        setShowDescription(false)
        resetEducation()
    }



    return (
        <Grid container spacing= {2} >
            <Grid item xs= {12} md= {12}>
            <Stack spacing= {2} sx= {{py: 2}}>
                <Typography variant= 'h3'>
                    Tell us about your Education
                </Typography>
                <Typography variant= 'body1'>
                List universities, colleges or institutions where you studied. If you didn't attend further education, then list your school or any other place of training, particularly if it corresponds to the position sought.
                </Typography>
            </Stack>

            {
                allEdu?.length > 0 &&
                <Stack direction= 'row' sx= {{mb: 1}}>
                    <Box sx= {{flex: '1 1'}}>
                        {
                            edit.state &&
                            <Typography variant= 'overline' sx= {{fontSize: '10px'}}>
                                editing...
                            </Typography>
                        }
                    </Box>
                <PageFormat setEdit= {setEdit} /> 
                </Stack>
            }
            

                <Stack spacing= {4} sx= {{width: '100%'}} >

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'name'
                            value= {form.name || ''}
                            onChange= {getForm}
                            label="Institution Name"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            fullWidth
                            name= 'city'
                            value= {form?.address?.city || ''}
                            onChange= {getAddress}
                            label="City"
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            label= 'Field Of Study'
                            fullWidth
                            name= 'major'
                            value= {form?.major || ''}
                            onChange= {getForm}
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            label= 'Qualification'
                            fullWidth
                            name= 'qualification'
                            value= {form?.qualification || ''}
                            onChange= {getForm}
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>
                    <Stack
                        direction="row"
                        alignItems= 'center'
                        spacing= {2}
                    >
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Start Date"
                            value={form.startDate}
                            onChange={(newValue) => {
                            setForm({...form, startDate: newValue});
                            }}
                            renderInput={(params) => <TextField fullWidth variant= 'outlined' {...params} />}
                        />
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="End Date"
                            value={form.endDate}
                            disabled= {form.active}
                            onChange={(newValue) => {
                                setForm({...form, endDate: newValue});
                                }}
                            renderInput={(params) => <TextField fullWidth variant= 'outlined' {...params} />}
                        />
                        </LocalizationProvider>
                    </Stack>
                    <Stack direction='row' alignItems= 'center' justifyContent= 'flex-end'>
                        <FormControlLabel control={<Checkbox onChange={toggleActive} checked= {form.active} />} label="I still study here" />
                    </Stack>

                    <Link color= 'inherit' onClick= {() => setShowDescription(!showDescription)}>
                        <Stack direction="row" alignItems= 'center' spacing= {0.5}>
                        { showDescription ? <RemoveIcon fontSize= 'small' color= 'error' /> : <AddIcon fontSize= 'small' color= 'primary' /> }  
                            <Typography variant="overline">
                            {`${showDescription ? 'Remove' : 'Add'} description to this section`}
                            </Typography>
                        </Stack>
                    </Link>
                    {
                        showDescription &&
                        <TextArea setForm= {setForm} form= {form} label= 'description' height= {300} skin= 'bootstrap' />
                    }

                    <Stack direction= 'row' alignItems= 'center' justifyContent= 'flex-end' spacing= {3}>
                        {edit?.state &&
                            <Button onClick= {handleExitEdit} color= 'error' variant="contained" >
                                quit editing
                            </Button>
                        }
                        <Button onClick= { edit.state ? handleUpdate : handleSaveExp}  variant= {edit?.state ? 'contained' : 'outlined'}>
                           {edit.state ? 'Update Education' : 'Add Education'}
                        </Button>
                    </Stack>
            </Stack>
            </Grid>
            
        </Grid>
    )
}

function ListAllExperience ({exp, index, setEdit}) {

    const {setAllEdu, allEdu, setEducation} = ResumeState()
    const {setAlert} = useSettings()

    const handleDelete = () => {
        const educationName = allEdu[index].name
        const list = [...allEdu]
        list.splice(index, 1)
        setAllEdu([...list])
        return setAlert({message: `Education from ${educationName} deleted successfuly`})
    }
    const handleEdit = () => {
        setEducation(exp)
        setEdit({state: true, component: exp, index})
    }


    return (
        
        <Stack
            variant= 'outlined'
            sx= {{
                border: '1px dashed #c1c1c1',
                borderRadius: '10px',
                p: 2,
                '&:hover': {
                    '#edu_setting': {
                        transform: 'translateX(0%)',
                        transition: '0.3s'
                    }
                }
            }}
        >
            <Stack sx= {{width: '100%'}}>
            <Stack direction= 'row' alignItems= 'center' justifyContent='flex-end' spacing= {4} id= 'edu_setting' sx= {{
                transform: 'translateX(-150%)',
                transition: '0.3s',
                bgcolor: 'black',
                borderRadius: '10px',
                p: 0.5
            }}>
            <Button
                onClick= {handleEdit}
                variant= 'outlined'
                startIcon= {<EditLocationAltIcon fontSize= 'small'/>}
                size= 'small'
            >
                update
            </Button>

            <Button
                onClick= {handleDelete}
                variant= 'outlined'
                color= 'error'
                startIcon= {<CloseIcon fontSize= 'small' />}
                size= 'small'
            >
                delete
            </Button>
            </Stack>

            <Stack spacing= {0.5} alignItems= 'flex-start' sx= {{width: '100%'}}>

            <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                <Typography variant= 'overline'>
                    institution:
                </Typography>
                <Typography variant= 'body3'>
                    {exp.name}
                </Typography>
            </Stack>

            <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                <Typography variant= 'overline'>
                    qualification:
                </Typography>
                <Typography variant= 'body3'>
                    {exp.qualification} / {exp.major}
                </Typography>
            </Stack>

            {
                exp.startDate &&
                <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                    <Typography variant= 'overline'>
                        start date:
                    </Typography>
                    <Typography variant= 'body3' color= 'primary'>
                        {moment(exp.startDate).format("MMM Do YYYY")}
                    </Typography>
                </Stack>
            }

            {
                exp.endDate &&
                <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                    <Typography variant= 'overline'>
                        end date:
                    </Typography>
                    <Typography variant= 'body3' color= 'secondary'>
                        {moment(exp.endDate).format("MMM Do YYYY")}
                    </Typography>
                </Stack>
            }
            <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                <Typography variant= 'overline'>
                    description:
                </Typography>
                <TextMaxLine line= {1} variant= 'body3'>
                    <Box component= 'div' dangerouslySetInnerHTML={{__html: exp.description}} />
                </TextMaxLine>
            </Stack>

            </Stack>
            </Stack>
        </Stack>
    )
}



function PageFormat ({setEdit}) {

    const {allEdu} = ResumeState()

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => setAnchorEl(event.currentTarget)
    const handleClose = () => setAnchorEl(null)

    return (
        <Paper
            variant= 'outlined'
            sx= {{
                px: 3,
                bgcolor: 'black'
            }}
        >
        <Stack direction= 'row' alignItems= 'center' sx= {{cursor: 'pointer', py: 1}} onClick= {handleClick}>
                <Typography variant= 'overline' color= {open ? 'primary' : 'white'} sx= {{letterSpacing: '1px', wordSpacing: '10px'}}>
                   {allEdu.length} - Education Listed
                </Typography>
            <ChevronRightIcon
                sx= {{
                    transform: open ? 'rotate(-90deg)' : 'rotate(90deg)',
                    transition: '0.4s',
                    color: open ? 'primary' : 'white'
                }} 
            />
        </Stack>

        <Menu
            anchorEl={anchorEl}
            id="pageControl"
            open={open}
            onClose={handleClose}
            PaperProps={{
                variant: 'outlined',
                sx: {
                    width: '100%',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    px: 1,
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <Stack spacing= {3} sx= {{overflowY: 'auto', p: 1}}>
            {
                allEdu.length > 0 &&
                allEdu.map((exp,index) => <ListAllExperience setEdit= {setEdit} key= {index} index= {index} exp= {exp} />)
            }
            </Stack>

      </Menu>
        </Paper>
    )
}