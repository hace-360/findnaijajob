import { styled, alpha } from '@mui/material/styles';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../config';
import {Container, Stack, Typography, Toolbar, Button, Box, Paper,MenuItem,Card, Grid} from '@mui/material'
import ColorTemplate from './ColorTemplate'
import GetTemplate, {TemplateList} from './Templates'
import data from './Templates/userData'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {useState} from 'react'
import {SwipeTemplate} from './Templates/PreviewModal'
import {ResumeState} from '../../contexts/ResumeContext'
import {useRouter} from 'next/router'
import GppGoodIcon from '@mui/icons-material/GppGood';
import {m} from 'framer-motion'



 export const ToolbarStyle = styled(Toolbar, {
    shouldForwardProp: (prop) => prop !== 'transparent' && prop !== 'scrolling',
  })(({theme }) => ({
    height: HEADER_MOBILE_HEIGHT,
    position: "fixed",
    bottom: 0,
    left: 0,
    width: '100%',
    boxShadow: `-23px 16px 56px -8px ${alpha(
        theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.common.black,
        1
      )}`,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.background.default,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.short,
    }),
    [theme.breakpoints.up('md')]: {
      height: HEADER_DESKTOP_HEIGHT,
    }
  }));

export default function ChoseTemplate () {

  const router = useRouter()
  const {setActiveTemplate, activeTemplate, setActiveStep} = ResumeState()
  const [openPreview, setOpenPreview] = useState(false)
  const handlePreview = (index) => {
    setOpenPreview(true)
    setActiveStep(index)
  }

    return (
        <Container sx= {{py: 2, minHeight: `calc(100vh)`}} maxWidth= {false}>

              <Stack spacing={2} sx= {{width: '100%', py: 2 }} alignItems= 'center' >
                <Typography variant= 'h2' alignItems= 'center'>
                  What do you want your CV to look like?
                </Typography>
                <Typography variant= 'body1' sx= {{fontWeight: 500, fontSize: '17px'}}>
                  Scroll to view all styles and click to select a specific style.
                </Typography>

                <ColorTemplate />
              </Stack>

              <Container sx= {{paddingBottom: 12}}>
                <Grid container sx= {{p: 2}} spacing= {3}>
                  {
                    TemplateList.map((temp, index) => (
                        <Grid item xs= {12} md= {4} key= {index}>
                          <m.div
                            key= {index}
                            initial= {{
                              opacity: 0,
                              translateX: index%2 == 0 ? -150 : 150,
                              translateY: -150
                            }}
                            whileInView={{ opacity: 1,
                              translateX: 0,
                              translateY: 0 
                            }}
                            viewport={{ once: true }}
                            transition= {{
                              duration: 0.3,
                              delay: 0.2
                            }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                          <Stack spacing= {2} alignItems='center' sx= {{width: '100%'}}>
                            <SelectTemplate 
                              temp= {temp} 
                              handleSelect= {() => setActiveTemplate(temp)}
                              handlePreview= {() => handlePreview(index)}
                            />
                            <Typography variant= 'button'>
                            {temp}
                          </Typography>
                          </Stack>
                          </m.div>
                        </Grid>
                    ))
                  }
                </Grid>
              </Container>

              {openPreview && <SwipeTemplate onClose= {() => setOpenPreview(false)} />}
               
               <ToolbarStyle>
                   <Stack spacing= {3} alignItems= 'center' justifyContent='flex-end' direction= 'row' sx= {{width: '100%'}}>
                        <Button 
                          variant= 'outlined' 
                          size= 'large'
                          onClick= {() => router.push('/resume/select-cv')}
                          disabled= {activeTemplate}
                          sx= {{ borderRadius: 2, }}
                          >
                            Skip For Now
                        </Button>

                        <Button 
                          variant= 'contained'
                          size= 'large'
                          disabled= {!activeTemplate}
                          onClick= {() => router.push('/resume/select-cv')}
                          sx= {{ 
                              borderRadius: 2,
                              textTransform: 'none'
                            }}
                          >
                           Continue with {activeTemplate}
                        </Button>
                   </Stack>
               </ToolbarStyle>
           </Container>
    )
}

function SelectTemplate ({handleSelect, temp, handlePreview}) {

  const {activeTemplate} = ResumeState()
  const [hover, setHover] = useState(false)
  const handleMouseEnter = () => setHover(true)
  const handleMouseLeave = () => setHover(false)

  return (
    <Paper
        square
        onMouseEnter= {handleMouseEnter}
        onMouseLeave= {handleMouseLeave}
        elevation= {20}
        // variant= 'outlined'
        sx= {{
            width: '100%',
            maxHeight: '450px',
            overflow: 'hidden',
            display: 'flex',
            borderRadius: 2,
            justifyContent: 'center',
            cursor: 'pointer',
            border: activeTemplate == temp && '2px solid green',
            position: 'relative',
            '&:hover': {
              '.preview_template_carousel': {
                display: 'flex'
              },
              border:  activeTemplate !== temp && '1px solid orange'
            }
        }}
    >
      {
        activeTemplate == temp &&
          <GppGoodIcon 
            fontSize= 'large'
            color= 'primary'
            sx= {{
              position: 'absolute',
              top: '10px',
              right: '10px',
              zIndex: 2
            }}
          />
      }
      <div onClick= {handleSelect}>
        { 
        GetTemplate({
          name: temp,
          sx: {
            transform: 'scale(0.75, 0.75)',
            transformOrigin: 'top center'}
          }) 
        }
        </div>

        <div
          style= {{
            position: 'absolute',
            top: '100%',
            left: '50%',
            transform: 'translate(-50%, -100%)',
            width: '100%'
          }}
        >
          {hover && <PreviewBar handlePreview= {handlePreview} />}

        </div>
    </Paper>
  )
}




export function PreviewBar ({handlePreview}) {

  


  return (
      <MenuItem sx= {{
          p: 0,
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '5px 5px 20px 5px grey',
        }}
        onClick= {handlePreview}
        >
              <Stack
                  direction= 'row'
                  alignItems= 'center'
                  justifyContent= 'center'
                  spacing= {1}
                  bgcolor= 'white'
                  sx= {{width: '100%',p: 2}}
              >
                  <RemoveRedEyeIcon color= 'primary' />
                  <Typography color= 'primary' variant= 'button' sx= {{fontSize: '16px'}}>
                      Preview
                  </Typography>
              </Stack>
      </MenuItem>
  )
}