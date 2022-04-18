import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Stack, Typography, Link, Paper, Dialog, Divider, DialogContent, MenuItem, DialogTitle, Slide, Box, Container,Button, AppBar, Toolbar, Grid} from '@mui/material'
import {useState, forwardRef} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types'
import data from '../Templates/userData'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {IconButtonAnimate} from '../../../components'
import GetTemplate, {TemplateList} from './index'
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../../config';
import { styled } from '@mui/material/styles';
import ColorTemplate from '../ColorTemplate'
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import {ResumeState} from '../../../contexts/ResumeContext'


PreviewModal.prototype = {
    hide: PropTypes.bool
}


export default function PreviewModal ({hide}) {

    const [open, setOpen] = useState(false);
    const closePrev = () => setOpen(false)
    const openPrev = () => setOpen(true)

    return (
        <Stack spacing= {1} sx= {{pt: 4, pl: 4}}>
        <Stack 
            direction= 'row' 
            spacing= {1} 
            alignItems= 'center' 
            justifyContent= 'flex-end' 
            sx= {{cursor: 'pointer', width: '100%'}}
            onClick= {openPrev}
        >
            <RemoveRedEyeIcon />
            <Link color= 'inherit'>
                <Typography variant= 'button' color= 'info'>
                    preview
                </Typography>
            </Link>
        </Stack>
        {!hide && <PrevComponent onClick= {openPrev} />}

        { open && <PreviewModal open= {open} closePrev= {closePrev} /> }
        </Stack>
    )
}

function PrevComponent ({onClick}) {

  const {activeTemplate} = ResumeState()

    return (
        <Paper
          onClick= {onClick}
          variant= 'outlined'
          sx= {{
            maxHeight: 350,
            height: 350,
            overflow: 'hidden',
            position: 'relative',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            "&:hover": {
              border: '2px solid #297A18'
            }
          }}
          >
            <MenuItem sx= {{p: 0}}>
              { GetTemplate({name: activeTemplate, form: data, sx: {
                  transform: 'scale(0.5, 0.5)',
                  transformOrigin: 'top left',
                  cursor: 'pointer',
              }}) }
            </MenuItem>
        </Paper>
    )
}



const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export function Modal ({open, closePrev}) {

  return (
    <>
      <Dialog
        fullWidth={true}
        maxWidth='md'
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={closePrev}
        sx= {{borderRadius: '5px'}}
      >
        <DialogTitle>
            <Stack direction= 'row' alignItems= 'center' justifyContent='flex-end'>
                <CloseIcon sx= {{fontWeight: 900, cursor: 'pointer'}} onClick= {closePrev} />
            </Stack>
        </DialogTitle>

        <DialogContent 
            sx= {{
                position: 'relative',
                overfow: 'hidden',
                height: '100vh'
            }}
        >
            <SwipeTemplate />
        </DialogContent>

      </Dialog>
    </>
  );
}





const RootStyle = styled('div')(({ theme }) => ({
    paddingTop: HEADER_MOBILE_HEIGHT,
    [theme.breakpoints.up('md')]: {
      paddingTop: HEADER_DESKTOP_HEIGHT,
    },
  }));

export function TemplateSlider ({activeStep, setActiveStep}) {

  const theme = useTheme();

  return (
      <RootStyle>
      <Paper variant= 'outlined' sx= {{p: 2, height: '100%', maxHeight: '100vh'}}>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={activeStep}
        enableMouseEvents
      >
          {
              TemplateList.map((temp, index) => (
                <Paper
                    key= {index}
                    elevation= {20}
                    sx= {{
                        transform: 'scale(0.92,0.92)',
                        transformOrigin: 'top center',
                        marginTop: 1
                    }}
                >
                    { GetTemplate({name: temp, form: data}) }
                </Paper>
              ))
          }
          
          </SwipeableViews>
      </Paper>
      </RootStyle>
  );
}


export function SwipeTemplate ({onClose}) {

  const {setActiveTemplate,activeStep, setActiveStep} = ResumeState()
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    onClose()
    setOpen(false)
  } 

  const maxSteps = Object.keys(TemplateList).length - 1

  const handleNext = () => activeStep < maxSteps && setActiveStep(ps => ps + 1) 

  const handleBack = () => activeStep > 0 && setActiveStep(ps => ps - 1)

  return (
    <div>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx= {{overflow: 'hidden'}}
      >
          {/* Header section */}
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Button color="inherit" startIcon= {<CloseIcon />} variant= 'outlined' onClick={handleClose}>
              close
            </Button>
            <Box sx= {{flex: 1}} />
            <Button color="inherit" variant= 'contained' onClick={() => setActiveTemplate(TemplateList[activeStep])}>
              select: {TemplateList[activeStep]}
            </Button>
          </Toolbar>
        </AppBar>

        {/* Body section */}
        <Container 
            sx= {{
                position: 'relative',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
            }}
        >
            <Stack
                direction= 'row'
                alignItems= 'center'
                spacing= {2}
                justifyContent= 'space-around'
                sx= {{
                    width: '100%', 
                    height: '100%',
                    px: 3
                }}
            >
                <Grid item xs= {8}>
                    <TemplateSlider activeStep= {activeStep} setActiveStep= {setActiveStep} />
                </Grid>

                <Grid item xs= {4} sx= {{ }}>
                 <ColorControl />
                </Grid>
                
            </Stack>
            <Arrows handleNext= {handleNext} handleBack= {handleBack} />
        </Container>
      </Dialog>
    </div>
  );
}


// color controll
export function ColorControl () {

    const {activeTemplate} = ResumeState()

    return (
        <Paper variant= 'outlined' sx= {{py: 3, px: 2}}>
            <Stack divider= {<Divider flexItem />} spacing= {2}>
                <Typography variant= 'body1' color= 'primary' sx= {{textTransform: 'capitalize'}}>
                  <span style= {{fontSize: '14px', color: 'grey'}}>active template :</span>  {activeTemplate}
                </Typography>
                <>
                <ColorTemplate small />
                </>
            </Stack>
        </Paper>
    )
}


export function Arrows ({handleNext, handleBack}) {

    return (
    <div style= {{
        position: 'absolute',
        width: '100%',
        display: 'flex',alignItems: 'center',
        justifyContent: 'space-between',
        top: '60%',
        translate: 'transformY(-50%)'
    }}>
            <IconButtonAnimate onClick= {handleBack}>
                <Paper
                    variant= 'outlined'
                    sx= {{
                        p: 1,
                        borderRadius: '100%',
                        display: 'flex'
                    }}
                >
                <ArrowBackIosNewIcon />
                </Paper>
            </IconButtonAnimate>

            <IconButtonAnimate onClick= {handleNext}>
                <Paper
                    variant= 'outlined'
                    sx= {{
                        p: 1,
                        borderRadius: '100%',
                        display: 'flex'
                    }}
                >
                <ArrowForwardIosIcon />
                </Paper>
            </IconButtonAnimate>

    </div>
    )
}