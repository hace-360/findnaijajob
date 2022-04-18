import {forwardRef} from 'react';
import {Slide, Dialog, Stack, Button, Typography, Divider, Paper, Menu, MenuItem, Grid, Box} from '@mui/material'
import {LetterState} from '../../contexts/LetterContext'
import {m} from 'framer-motion'




const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props}/>;
});

export default function LetterType ({open, setOpen}) {
  
  const {letterCategory, setLetterCategory} = LetterState()
  const handleSetCategory = (label) => setLetterCategory(label)
  const handleClose = () => setOpen(false)

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        fullWidth
        maxWidth={'md'}
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
          <Stack sx= {{p: 2}} spacing= {2}>
            <Typography variant= 'button' sx= {{fontSize: '18px'}}>
                letter type
            </Typography>

            <Grid container direction= 'row' justifyContent='space-between'>
                <Grid xs= {12} md= {4}>
                <Typography variant= 'overline' sx= {{fontSize: '12px'}}>
                    category
                </Typography>
                <Paper variant= 'outlined' sx= {{borderRadius: 0, height: '100%', maxHeight: '55vh'}}>
                <Stack>
                    {
                        Object.keys(letterTypeList).map((cat, index) => (
                            <MenuItem 
                                key= {index} 
                                sx= {{width: '1', borderRadius: 0}}
                                selected= {cat == letterCategory}
                                onClick= {() => handleSetCategory(cat)}
                            >
                                <Typography variant= 'button' sx= {{fontSize: '12px'}}>
                                    {cat}
                                </Typography>
                            </MenuItem>
                        ))
                    }
                </Stack>
                </Paper>
                </Grid>

                <Grid xs= {12} md= {7} >
                <Typography variant= 'overline' sx= {{fontSize: '12px'}}>
                    letters
                </Typography>
                <Paper variant= 'outlined' sx= {{borderRadius: 0, p: 1.5, maxHeight: '55vh', overflowX: 'hidden', overlowY: 'auto'}}>
                <Stack spacing= {1.5} sx= {{wordWrap: 'break-word'}}>
                    {
                        letterTypeList[letterCategory].map((option, index) => (
                            <div key= {index}>
                            <m.div
                                key= {letterCategory}
                                initial={{ opacity: 0, transform: `translateX(${index*10}%)` }}
                                animate={{ opacity: 1, transform: 'translateX(0%)' }}
                                transition={{duration: index*0.15}}
                                viewport={{ once: true }}
                            >
                            <LetterLabelOption key= {index} title= {option.name} details= {option.details} />
                            </m.div>
                            </div>
                        ))
                    }
                </Stack>
                </Paper>
                </Grid>
            </Grid>

            <Divider flexItem />
            <Stack direction= 'row' justifyContent= 'space-between'>
                <Button color= 'error' variant= 'contained' sx= {{borderRadius: '0 0 0 10px'}} onClick= {handleClose}>
                    cancel
                </Button>

                <Button variant= 'contained' sx= {{borderRadius: '0 0 10px 0'}}>
                    apply
                </Button>
            </Stack>
          </Stack>
      </Dialog>
  )
}
// 
function LetterLabelOption ({title, details}) {

    const {letterType, setLetterType} = LetterState()

    return (
        <m.div
            whileHover={{ scale: 1.04}}
            whileTap={{ scale: 0.97 }}
        >
        <Paper 
            variant= 'outlined' 
            sx= {{
                bgcolor: letterType == title && 'black',
                color: letterType == title && 'white'
            }}
        >
        <MenuItem
            sx= {{
                p: 0,
                borderRadius: 0,
                '&:hover' : {
                    color: 'inherit'
                }
            }}
            selected= {letterType == title}
            onClick= {() => setLetterType(title)}
        >
            <Stack
                alignItems= 'flex-start'
                sx= {{
                    width: '100%',
                    p:2,
                    wordWrap: 'break-word'
                }} 
            >
                <Typography variant= 'button' sx= {{fontSize: '12px'}} color= 'primary'>
                    {title}
                </Typography>

                <Typography variant= 'body3' sx= {{fontSize: '11px'}}>
                    {details}
                </Typography>
            </Stack>
        </MenuItem>
        </Paper>
        </m.div>
    )
}

// 
const letterTypeList = {
    'entry level': [
      {name: 'organized', details: 'You bring structure and focus to streamline tasks.'},
      {name: 'enterprising', details: 'You"re accustomed to leading teams with empowering and decisive task delegation.'},
      {name: 'service oriented', details: 'You excel in collaborative situations and enjoy helping others.'},
      {name: 'artistic', details: 'You thrive in dynamic environments driven by innovation and creativity.'},
      {name: 'investigative', details: 'You bring a resourceful approach with a knack for problem solving.'},
      {name: 'practical', details: 'You go above and beyond to meet goals and ensure timely tasks completion.'},
      {name: 'early career', details: 'Ideal for job seekers starting their career or for people planning a career change.'},
    ],
    'experienced': [
      {name: 'corperate', details: 'You bring structure and focus to streamline tasks.'},
      {name: 'enterprising', details: 'You"re accustomed to leading teams with empowering and decisive task delegation.'},
      {name: 'service oriented', details: 'You excel in collaborative situations and enjoy helping others.'},
      {name: 'artistic', details: 'You thrive in dynamic environments driven by innovation and creativity.'},
      {name: 'investigative', details: 'You bring a resourceful approach with a knack for problem solving.'},
      {name: 'practical', details: 'You go above and beyond to meet goals and ensure timely tasks completion.'},
      {name: 'high performance', details: 'Highlight your professional accomplishments to be noticed by HR managers.'},
    ]
}