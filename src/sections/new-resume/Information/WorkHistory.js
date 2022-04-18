import { Typography, Stack, Link,TextField, FormControlLabel,Checkbox, Button, Paper,Grid, Box,Menu,MenuItem, Tooltip, Divider } from "@mui/material"
import {useState} from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import {ResumeState} from '../../../contexts/ResumeContext'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import TextArea from './TextArea'
import {IconButtonAnimate} from '../../../components'
import CloseIcon from '@mui/icons-material/Close';
import moment from 'moment'
import {TextMaxLine} from '../../../components'
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import {useLocalStorage, useSettings} from '../../../hooks'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


export default function WorkHistory () {

    const {setAlert} = useSettings()
    const {experience: form, setExperience: setForm, setAllExp, allExp, resetExperience} = ResumeState()
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getAddress = (e) => setForm({...form, address: {...form.address, [e.target.name]: e.target.value}})
    const toggleActive = () => {
        setForm({...form, endDate: '', active: !form.active})
    }
    const [showDescription, setShowDescription] = useState(form?.description || false)
    const handleSaveExp = () => {
        if (form.title && form.employer) {
            setShowDescription(false)
            resetExperience()
            setAllExp([...allExp, form])
            return setAlert({message: 'New work experience added successfuly'})
        }
    }
    const [edit, setEdit] = useLocalStorage('editing-exp', { component: null, index: null, state: false })
    const resetEdit = () => setEdit({ component: null, index: null, state: false })

    const handleUpdate = () => {
        if (edit.state) {
           const list = allExp
            list[edit.index] = form
            setAllExp([...list])
            setShowDescription(false)
            setAlert({message: 'Experience updated successfuly'})
            resetExperience()
            resetEdit()
        }
    }

    const handleExitEdit = () => {
        resetEdit()
        setShowDescription(false)
        resetExperience()
    }


    return (
        <Grid container spacing= {2} >
            <Grid item xs= {12} md= {12}>
            <Stack spacing= {2} sx= {{py: 2}}>
                <Typography variant= 'h3'>
                    Tell us about your work history
                </Typography>
                <Typography variant= 'body1'>
                    Start with your most recent job and work backwards.
                </Typography>
            </Stack>

            {
                allExp?.length > 0 &&
                <Stack direction= 'row' sx= {{mb: 1}}>
                    <Box sx= {{flex: '1 1'}}>
                        {
                            edit?.state &&
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
                            name= 'title'
                            value= {form.title || ''}
                            onChange= {getForm}
                            label="Job Title"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            fullWidth
                            name= 'employer'
                            value= {form.employer || ''}
                            onChange= {getForm}
                            label="Employer"
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            label= 'State'
                            fullWidth
                            name= 'state'
                            value= {form?.address?.state || ''}
                            onChange= {getAddress}
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            label= 'Country'
                            fullWidth
                            name= 'country'
                            value= {form?.address?.country || ''}
                            onChange= {getAddress}
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
                        <FormControlLabel control={<Checkbox onChange={toggleActive} checked= {form.active} />} label="I still work here" />
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

                    <Stack direction= 'row' spacing= {2} alignItems= 'center' justifyContent= 'flex-end'>
                        {
                            edit?.state &&
                            <Button onClick= {handleExitEdit} color= 'error' variant="contained" >
                                Quit editing
                            </Button>
                        }
                        <Button onClick= { edit.state ? handleUpdate : handleSaveExp} variant= {edit?.state ? 'contained' : 'outlined'}>
                           {edit.state ? 'Update Experience' : 'Add Experience'}
                        </Button>
                    </Stack>
            </Stack>
            </Grid>
            
        </Grid>
    )
}

function ListAllExperience ({exp, index, setEdit}) {

    const {setAllExp, allExp, setExperience} = ResumeState()
    const {setAlert} = useSettings()

    const handleDelete = () => {
        const employer = allExp[index].employer
        const list = [...allExp]
        list.splice(index, 1)
        setAllExp([...list])
        return setAlert({message: `Work experience with ${employer} deleted successfuly`})
    }
    const handleEdit = () => {
        setExperience(exp)
        setEdit({state: true, component: exp, index})
    }


    return (
        
        <Stack
            sx= {{
                border: '1px dashed #c1c1c1',
                borderRadius: '10px',
                p: 2,
                '&:hover': {
                    '#work_setting': {
                        transform: 'translateX(0%)',
                        transition: '0.3s'
                    }
                }
            }}
        >
            <Stack sx= {{width: '100%'}}>
            <Stack direction= 'row' alignItems= 'center' justifyContent='flex-end' spacing= {4} id= 'work_setting' sx= {{
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
                    role:
                </Typography>
                <Typography variant= 'body3'>
                    {exp.title} / {exp.employer}
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

    const {allExp} = ResumeState()

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
            <Typography variant= 'overline' color= {open ? 'primary' : 'white'} sx= {{letterSpacing: '1px', wordSpacing: '10px', cursor: 'pointer'}}>
                {allExp.length} - Experience Listed
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
                    p: 1,
                    overflowY: 'auto',
                    maxHeight: '80vh',
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
                allExp.length > 0 &&
                allExp.map((exp,index) => <ListAllExperience setEdit= {setEdit} key= {index} index= {index} exp= {exp} />)
            }
            </Stack>

      </Menu>
        </Paper>
    )
}