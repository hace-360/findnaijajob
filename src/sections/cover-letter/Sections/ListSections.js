import {Stack, Typography, Divider, Link, Button, Slide, Dialog, Checkbox, FormControlLabel} from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import {LetterSectionsList} from '../_data_cover_letter'
import AddIcon from '@mui/icons-material/Add';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import {useState, forwardRef} from 'react'
import {LetterState} from '../../../contexts/LetterContext'
import CloseIcon from '@mui/icons-material/Close';


export default function ListSection () {

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const {letterSection} = LetterState()
    const [openDelete, setOpenDelete] = useState(false)
    const [indexToDelete, setIndexToDelete] = useState('')
    const handleOpenDelete = (index) => {
        setOpenDelete(true)
        setIndexToDelete(index)
    }

    return (
        <Stack
            spacing= {1.5}
            divider= {<Divider flexItem />}
        >
            <Stack direction= 'row' alignItems= 'center' spacing= {1} justifyContent= 'space-between'>
                <Typography variant= 'overline' fontSize= '13px'>
                    letter sections
                </Typography>
                <KeyboardArrowDownIcon fontSize= 'small' />
            </Stack>

            {
                letterSection && letterSection.length > 0 &&
                <Stack spacing= {1} sx= {{pl: 2}}>
                    {
                        letterSection.map((list, index) => (
                            <Stack direction= 'row' alignItems= 'center' justifyContent= 'space-between' key= {index}
                                sx= {{
                                    '&:hover': {
                                        '.delete_letter_section': {
                                            display: 'flex'
                                        }
                                    }
                                }}
                            >
                                <Link color= 'inherit'>
                                    <Typography variant= 'body3' sx= {{fontSize: '12px', textTransform: 'capitalize'}}>
                                        {list}
                                    </Typography>
                                </Link>

                                <CloseIcon 
                                    color= 'error' 
                                    fontSize= 'small' 
                                    className= 'delete_letter_section' 
                                    sx= {{display: 'none', cursor: 'pointer'}}
                                    onClick= {(index) => handleOpenDelete(index)}
                                />

                                <ConfirmDeleteSection openDelete={openDelete} setOpenDelete= {setOpenDelete} index= {indexToDelete} />
                            </Stack>
                        ))
                    }
                </Stack>
            }

            <Stack
                direction='row'
                spacing= {1}
                sx= {{
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': {
                        color: '#00AB55'
                    }
                }}
            >
                <AddIcon fontSize= 'small' />
               <Typography variant= 'button' sx= {{fontSize: '12px'}} onClick= {handleOpen}>
                    Add section
                </Typography>

                <AddExtraSection open= {open} setOpen={setOpen} />
            </Stack>

            <Stack
                direction='row'
                spacing= {1}
                sx= {{
                    py: 1,
                    cursor: 'pointer',
                    '&:hover': {
                        color: '#00AB55'
                    }
                }}
            >
                <SpellcheckIcon fontSize= 'small' />
               <Typography variant= 'button' sx= {{fontSize: '12px'}}>
                    Spell Check
                </Typography>
            </Stack>
            
        </Stack>
    )
}



// section adding

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AddExtraSection ({open, setOpen}) {

    const [cannotAdd, setCannotAdd] = useState(true)
    const handleClose = () => setOpen(false)
    const {letterSection, setLetterSection} = LetterState()
    const [selection, setSelection] = useState([])

    const handleSetSelection = (sec) => {
        if (!selection.includes(sec)) {
            setSelection([...selection, sec])
        }
        if (selection.length > 0) {
            setCannotAdd(false)
        }
        if (selection.includes(sec)) {
            setSelection([...selection.filter(item => item !== sec)])
        }
    }

    // Add section to the list of all
    const handleAddSelection = () => {
        const addableList = new Set([...letterSection, ...selection])
        setLetterSection([...Array.from(addableList)])
    }
  

  return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        fullWidth
        maxWidth= 'sm'
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
          <Stack spacing= {1} sx= {{p: 4, maxHeight: '60vh'}} divider= {<Divider flexItem />}>

              <Stack sx= {{position: 'sticky', top: 0}}>
                <Typography variant= 'overline' sx= {{fontSize: '18px', fontWeight: 900}}>
                    Add Section
                </Typography>
                <Typography variant= 'body3'>
                    Add additional sections to your letter.
                </Typography>
              </Stack>

                <Stack spacing= {0.5} alignItems= 'flex-start' sx= {{overflowY: 'auto'}}>
                    {
                        LetterSectionsList.map((sec, index) => (
                            !letterSection.includes(sec) && 
                            <FormControlLabel
                                key= {index}
                                label= {sec}
                                control={
                                    <Checkbox
                                        // value= {sec}
                                        checked= {selection.includes(sec)}
                                        onChange={() => handleSetSelection(sec)}
                                    />
                                }
                                />
                        ))
                    }
                </Stack>

              <Stack direction= 'row' alignItems='center' justifyContent= 'space-between'>
                <Button
                    sx= {{
                        borderRadius: 0,
                        width: '100%',
                        maxWidth: '200px'
                    }}
                    variant= 'contained'
                    color= 'error'
                    onClick= {handleClose}
                >
                    cancel
                </Button>

                <Button
                    sx= {{
                        borderRadius: 0,
                        width: '100%',
                        maxWidth: '200px'
                    }}
                    variant= 'contained'
                    disabled= {cannotAdd}
                    onClick= {handleAddSelection}
                >
                    Add
                </Button>
              </Stack>

          </Stack>
      </Dialog>
  );
}

// Confirm Delete

function ConfirmDeleteSection ({openDelete, setOpenDelete, index}) {
    console.log(index)

    const handleClose = () => setOpenDelete(false)
    const {letterSection, setLetterSection} = LetterState()
    const handleDelete = () => {
        setLetterSection([...letterSection.filter((item, i) => i != index)])
    }

    return (
        <Dialog
        open={openDelete}
        TransitionComponent={Transition}
        fullWidth
        maxWidth= 'sm'
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-delete"
      >
          <Stack spacing= {1} sx= {{p: 4}} divider= {<Divider flexItem />}>

            <Typography variant= '' sx= {{fontSize: '18px', fontWeight: 900}}>
                Are you sure you want to delete this section
            </Typography>

              <Stack direction= 'row' alignItems='center' justifyContent= 'space-between'>
                <Button
                    sx= {{
                        borderRadius: 0,
                        width: '100%',
                        maxWidth: '150px'
                    }}
                    onClick= {handleClose}
                >
                    cancel
                </Button>

                <Button
                    sx= {{
                        borderRadius: 0,
                        width: '100%',
                        maxWidth: '150px'
                    }}
                    color= 'error'
                    onClick= {handleDelete}
                >
                    Delete
                </Button>
              </Stack>

          </Stack>
      </Dialog>
    )
}