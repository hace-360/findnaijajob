import {Typography,Stack, Paper, Box, Button, Accordion, AccordionDetails, AccordionSummary, MenuItem} from '@mui/material'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PrintIcon from '@mui/icons-material/Print';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButtonAnimate } from '../../../components';
import {useState} from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaletteIcon from '@mui/icons-material/Palette';
import ColorTemplate from '../ColorTemplate'
import ExtraSections from './ExtraSection'
import { useReactToPrint } from 'react-to-print';
import GetTemplate, {TemplateList} from '../Templates'
import {ResumeState} from '../../../contexts/ResumeContext'
import GppGoodIcon from '@mui/icons-material/GppGood';
import axios from 'axios'
import AddIcon from '@mui/icons-material/Add'
import {createRef} from 'react'
import ConvertToFormData from '../../../hooks/convertToFormData'



const tags = [
    {label: 'download', icon: <UploadFileIcon color= 'primary' fontSize= 'small' />},
    {label: 'print', icon: <PrintIcon color= 'primary' fontSize= 'small' />},
    {label: 'email', icon: <MarkunreadIcon color= 'primary' fontSize= 'small' />},
]


export function PrintSideBar ({componentRef}) {

    
    const {pageTitle} = ResumeState()
    const [hover, setHover] = useState({0: false, 1: false, 2: false})
    const handleMouseEnter = (index) => setHover({...hover, [index]: true})
    const handleMouseLeave = () => setHover({0: false, 1: false, 2: false})
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: pageTitle
      })

    const handleEmail = async () => {
        const res = await axios.post('/resume/email', )
    }
 

    return (
        <Stack spacing= {3}>
            {
                tags.map((tag, index) => (
                  <IconButtonAnimate sx= {{ p: 0}} key= {index}>
                    <Paper
                        onMouseEnter= {() => handleMouseEnter(index)}
                        onMouseLeave= {handleMouseLeave}
                        variant= 'outlined' 
                        onClick= {() => tag.label == 'print' ? handlePrint() : null}
                        sx= {{
                            borderRadius: !hover[index] ? '100%' : '20px',
                            width: hover[index] ? '150px' : 45,
                            height: 45,
                            alignItems: 'center',
                            justifyContent: 'center',
                            display: 'flex',
                            transition: '0.4s',
                            cursor: 'pointer',
                            zIndex: 2,
                            bgcolor: hover[index] && 'black'
                        }}
                    >
                        <Stack
                            direction= 'row'
                            alignItems= 'center'
                            spacing= {1}
                        >
                            {tag.icon}
                            {
                                hover[index] &&
                                <Typography variant= 'overline' sx= {{fontSize: '10px', color: 'white'}}>
                                    {tag.label}
                                </Typography>
                            }
                        </Stack>
                        </Paper>
                    </IconButtonAnimate>  
                ))
            }
            
        </Stack>
    )
}


export function SetUpSideBar() {
    
  const [expanded, setExpanded] = useState(null);

  const toggleExpanded = (index) => {
    index == expanded ? setExpanded(null) : setExpanded(index) 
  } 

  return (
      <Stack
        spacing= {5}
      >
{/* 
        <Button
            fullWidth
            size= 'large'
            variant= 'outlined'
            color= 'info'
        >
            save & continue
        </Button> */}

        <Paper
            variant= 'outlined'
        >
        <Stack>
            {
                SetupTemplate.map((temp, index) => (
                    <Accordion  key= {index} expanded={expanded == index} onChange={() => toggleExpanded(index)} sx= {{width: '100%'}}>
                        <MenuItem sx= {{borderRadius: 0}}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            sx= {{width: '100%',height: 15, px: 1}}
                        >
                            <Stack spacing= {2} direction= 'row' alignItems= 'center' >
                            {temp.icon}
                            <Typography variant= 'button' sx={{ textTransform: 'capitalize' }}> {temp.label} </Typography>
                            </Stack>
                        
                        </AccordionSummary>
                        </MenuItem>
                        <AccordionDetails sx= {{ p: 1, width: '100%'}}>
                        {temp.component}
                        </AccordionDetails>
                    </Accordion> 
                ))
            }
        </Stack>
    </Paper>
      </Stack>
  );
}


const SetupTemplate = [
    // {label: 'spell check', icon: <FormatColorTextIcon fontSize= 'small' />, component: 'hello world'},
    {label: 'templates', icon: <UploadFileIcon fontSize= 'small' />, component: <TemplateGrid />},
    {label: 'colour', icon: <PaletteIcon fontSize= 'small' />, component: <ColorTemplate small/>},
    // {label: 'formatting tools', icon: <FormatIndentIncreaseIcon fontSize= 'small' />, component: 'hello world'},
    {label: 'section', icon: <AddIcon fontSize= 'small' />, component: <ExtraSections />},
]

function TemplateGrid () {

    const {activeTemplate, setActiveTemplate} = ResumeState()

    return (
        <Box
          sx={{
            py: 1,
            display: 'grid',
            rowGap: 0.5,
            columnGap: 0.5,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(3, 1fr)',
            },
            overflowY: 'auto',
            maxHeight: 350
          }}
        >
         {
              TemplateList.map((temp, index) => (
                <Paper
                    key= {index}
                    onClick= {() => setActiveTemplate(temp)}
                    variant= 'outlined'
                    sx= {{
                        maxHeight: '150px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: temp == activeTemplate && `2px solid green`,
                        '&:hover': {
                            border: temp !== activeTemplate && `1px solid orange`,  
                        }
                    }}
                >
                    {
                        activeTemplate == temp &&
                        <GppGoodIcon 
                            fontSize= 'small'
                            color= 'primary'
                            sx= {{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            zIndex: 2
                            }}
                        />
                    }
                    <MenuItem  sx={{
                        p: 0
                    }}>
                    { GetTemplate({name: temp, sx: {
                        transform: 'scale(0.35, 0.35)',
                        transformOrigin: 'top left',
                    }}) }
                    </MenuItem>
                </Paper>
              ))
          }
        </Box>
    )
}