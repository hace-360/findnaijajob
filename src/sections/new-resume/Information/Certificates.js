import { Typography, Stack, Link,TextField, FormControlLabel,Checkbox, Button, Paper,Grid, Box,Menu,MenuItem, Tooltip } from "@mui/material"
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
    const {certificate: form, setCertificate: setForm, setAllCert, allCert, resetCert} = ResumeState()
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    
    const [showDescription, setShowDescription] = useState(form?.description || false)
    const handleSaveExp = () => {
        if (form.name && form.authority) {
            setShowDescription(false)
            resetCert()
            setAllCert([...allCert, form])
            return setAlert({message: 'New certificate added successfuly'})
        }
    }

    const [edit, setEdit] = useLocalStorage('editing-edu', { component: null, index: null, state: false })
    const resetEdit = () => setEdit({ component: null, index: null, state: false })

    const handleUpdate = () => {
        if (edit.state) {
           const list = allCert
            list[edit.index] = form
            setAllCert([...list])
            setShowDescription(false)
            setAlert({message: 'Certificate updated successfuly'})
            resetCert()
            resetEdit()
        }
    }

    const handleExitEdit = () => {
        resetEdit()
        setShowDescription(false)
        resetCert()
    }



    return (
        <Grid container spacing= {2} >
            <Grid item xs= {12} md= {12}>
            <Stack spacing= {2} sx= {{py: 2}}>
                <Typography variant= 'h3'>
                    Tell us about your Certificate
                </Typography>
            </Stack>

            {
                allCert?.length > 0 &&
                <Stack direction= 'row' sx= {{mb: 1}}>
                    <Box sx= {{flex: '1 1'}}>
                        {
                            edit.state &&
                            <Typography variant= 'overline' sx= {{fontSize: '11px'}}>
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
                            label="Name On Certificate"
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            label= 'Authority'
                            fullWidth
                            name= 'authority'
                            value= {form?.authority || ''}
                            onChange= {getForm}
                            variant="outlined"
                            type= 'text'
                        />
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Year"
                            value={form.startDate}
                            onChange={(newValue) => {
                            setForm({...form, year: newValue});
                            }}
                            renderInput={(params) => <TextField fullWidth variant= 'outlined' {...params} />}
                        />
                        </LocalizationProvider>
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
                        {
                            edit?.state &&
                            <Button onClick= {handleExitEdit} color= 'error' variant="contained">
                                quit editing
                            </Button>
                        }
                        <Button onClick= { edit.state ? handleUpdate : handleSaveExp} variant= {edit?.state ? 'contained' : 'outlined'}>
                           {edit.state ? 'Update Certificate' : 'Add Certificate'}
                        </Button>
                    </Stack>
            </Stack>
            </Grid>
            
        </Grid>
    )
}

function ListAllExperience ({exp, index, setEdit}) {

    const {setAllCert, allCert, setCertificate} = ResumeState()
    const {setAlert} = useSettings()

    const handleDelete = () => {
        const certName = allCert[index].authority
        const list = [...allCert]
        list.splice(index, 1)
        setAllCert([...list])
        return setAlert({message: `Certificate from ${certName} deleted successfuly`})

    }
    const handleEdit = () => {
        setCertificate(exp)
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
                    '#cert_setting': {
                        transform: 'translateX(0%)',
                        transition: '0.3s'
                    }
                }
            }}
        >
            <Stack sx= {{width: '100%'}}>
            <Stack direction= 'row' alignItems= 'center' justifyContent='flex-end' spacing= {4} id= 'cert_setting' sx= {{
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
                    Name:
                </Typography>
                <Typography variant= 'body3'>
                    {exp.name}
                </Typography>
            </Stack>

            <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                <Typography variant= 'overline'>
                    authority:
                </Typography>
                <Typography variant= 'body3'>
                    {exp.authority}
                </Typography>
            </Stack>

            {
                exp.year &&
                <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                    <Typography variant= 'overline'>
                        Year:
                    </Typography>
                    <Typography variant= 'body3' color= 'primary'>
                        {moment(exp.year).format("MMM Do YYYY")}
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

    const {allCert} = ResumeState()

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
            <Link color= 'inherit'>
                <Typography variant= 'overline' color= {open ? 'primary' : 'white'} sx= {{letterSpacing: '1px', wordSpacing: '10px'}}>
                   {allCert.length} - Certificates Listed
                </Typography>
            </Link>
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
            onClick={handleClose}
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
                allCert.length > 0 &&
                allCert.map((exp,index) => <ListAllExperience setEdit= {setEdit} key= {index} index= {index} exp= {exp} />)
            }
            </Stack>

      </Menu>
        </Paper>
    )
}