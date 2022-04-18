import {Stack, Grid, Typography, Popper, Divider, Paper, MenuItem, MenuList, ClickAwayListener, Box } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {useState} from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import {LetterState} from '../../contexts/LetterContext'
import LetterType from './letter-type'
import Templates from './templates'



export function FormattingSettings({size}) {

    const {letterSize, setLetterSize} = LetterState()
    const handleStLetterSize = (label) => setLetterSize(label)

  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen((prev) => !prev)
  const handleClickAway = () => setOpen(false)

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Grid
                xs= {12}
                md= {size}
                sx= {{
                    bgcolor: 'rgb(64,84,100)',
                    position: 'relative',
                    cursor: 'pointer',
                    p: 1.5,
                    color: '#95A0A9'
                }}
            >
                <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between' onClick= {handleClick}
                    sx= {{
                        '&:hover': {
                        color: 'white'
                    },
                    }}
                >
                    <Typography variant= 'overline' sx= {{fontSize: '11px'}}>
                        formatting
                    </Typography>
    
                    <Stack direction= 'row' alignItems= 'center' spacing= {0.5}>
                        <Typography variant= 'button' sx= {{fontSize: '11px'}}>
                            {letterSize}
                        </Typography>
                        <KeyboardArrowDownIcon size= 'small' />
                    </Stack>
                </Stack>
                {
                    open &&
                        <Paper 
                            variant= 'outlined'
                            sx= {{
                                position: 'absolute',
                                top: -90,
                                left: '50%',
                                transform: 'translateX(-50%)',
                                borderRadius: 0
                            }}
                        >
                            <Stack
                                divider= {<Divider orientation= 'vertical' flexItem />}
                                direction= 'row'
                                justifyConetnt= 'space-around'
                                alignItems= 'center'
                            >
                                 {
                                    listSetting.map((list, index) => (
                                        <Stack
                                            key= {index}
                                            alignItems= 'center' 
                                            justifyContent= 'center'
                                            sx= {{
                                                width: 90,
                                                height: 80,
                                                color: letterSize == list.label && 'white',
                                                bgcolor: letterSize == list.label && '#405464',
                                                '&:hover': {
                                                    bgcolor: '#405464',
                                                    color: 'white'
                                                }
                                            }}
                                            onClick= {() => handleStLetterSize(list.label)}
                                        >
                                            <MenuIcon sx= {{fontSize: list.size}} />
                                            <Typography variant= 'button' sx= {{fontSize: '11px'}}>
                                                {list.label}
                                            </Typography>
                                        </Stack>
                                    ))
                                }
                            </Stack>
                        </Paper>
                }
            </Grid>
        </ClickAwayListener>
    )
  }
  
  const listSetting = [
      {label: 'small', size: '30px'},
      {label: 'normal', size: '40px'},
      {label: 'large', size: '50px'},
  ]


//   -------------------------Letter Type
export function LetterTypeSettings({size}) {

    const {letterType} = LetterState()
    const [open, setOpen] = useState(false);
  
    return (
        <>
        <Grid
            xs= {12}
            md= {size}
            sx= {{
                bgcolor: 'rgb(64,84,100)',
                cursor: 'pointer',
                '&:hover': {
                    color: 'white'
                },
                p: 1.5,
                color: '#95A0A9'
            }}
            onClick= {() => setOpen(true)}
        >
              <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between'>
                  <Typography variant= 'overline' sx= {{fontSize: '11px'}}>
                      letter type
                  </Typography>
  
                  <Stack direction= 'row' alignItems= 'center' spacing= {0.5}>
                      <Typography variant= 'button' sx= {{fontSize: '11px'}}>
                          {letterType}
                      </Typography>
                      <KeyboardArrowDownIcon size= 'small' />
                  </Stack>
              </Stack>

          </Grid>

          {open && <LetterType open= {open} setOpen= {setOpen} />}
          </>
    );
  }

//   Template setttings
export function TemplateSettings ({size}) {

    const [open, setOpen] = useState(false);

    return (
        <>
        <Grid
            xs= {12}
            md= {size}
            sx= {{
                bgcolor: 'rgb(64,84,100)',
                cursor: 'pointer',
                '&:hover': {
                    color: 'white'
                },
                p: 1.5,
                color: '#95A0A9'
            }}
            onClick= {() => setOpen(true)}
        >
              <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between'>
                  <Typography variant= 'overline' sx= {{fontSize: '11px'}}>
                      templates
                  </Typography>
  
                  <Stack direction= 'row' alignItems= 'center' spacing= {0.5}>
                      <Typography variant= 'button' sx= {{fontSize: '11px'}}>
                          {'letterType'}
                      </Typography>
                      <KeyboardArrowDownIcon size= 'small' />
                  </Stack>
              </Stack>

          </Grid>

          <Templates open= {open} setOpen= {setOpen} />
          </>
    )
}