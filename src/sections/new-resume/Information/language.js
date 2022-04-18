import {useState, forwardRef} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider , FilledInput, InputAdornment, Rating, Chip, Dialog, DialogContent, DialogActions, DialogTitle, Slide  } from '@mui/material';
import { useSettings } from '../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components/animate'
import {ResumeState} from '../../../contexts/ResumeContext'


// ----------------------------------------------------------------------


export default function Language () {

    const {setAlert} = useSettings()
    const {allLang, language: form, setLanguage: setForm, resetLang, setAllLang} = ResumeState()

    const deleteLang = (index) => {
        const deletedLang = allLang[index]
        const newLangs = allLang.filter(lang => lang.name !== deletedLang.name)
        setAllLang([...newLangs])
        return setAlert({message: `${deletedLang.name} was deleted successfuly`})
    } 

    const [openForm, setOpenForm] = useState(false)
    const closeForm= () => setOpenForm(false)
    

    const addLang = () => {
        const currentLang = allLang.length > 0 ? allLang.map((lang => lang.name.toLowerCase())) : []
        if (form.name && !currentLang.includes(form.name.toLowerCase())) {
            setAllLang([...allLang, form])
            setAlert({message: `${form.name} added to language`})
            resetLang()
            return closeForm()
        }
        if (form.name && currentLang.includes(form.name.toLowerCase())) {
            return setAlert({message: `${form.name} is already added`, type: 'error'})
        }
        else setAlert({message: 'Enter a language name', type: 'error'})
    }

  return (
    <Stack spacing= {2}>
    <Stack spacing= {2} sx= {{py: 2,paddingBottom: 4}}>
        <Typography variant= 'h3'>
            How many languages can you speak?
        </Typography>
        <Typography variant= 'body1'>
            Start with your local language.
        </Typography>
    </Stack>

    {openForm && <LanguageForm openForm={openForm} closeForm= {closeForm} addLang= {addLang} />}

    <Paper variant= 'outlined' sx= {{
        p: 2,
        minHeight: '30vh'
    }}>
        {
            allLang.length > 0 &&
            <Stack direction="row" spacing={3} sx= {{fleWrap: 'wrap'}} alignItems= 'center'>
                {
                    allLang.map((lang, index) => (
                      <Chip 
                        key= {index}
                        sx= {{m: 1}}
                        onDelete= {() => deleteLang(index)}
                        label= {
                            <Stack direction= 'row' alignItems= 'center' spacing= {2}>
                                <Typography sx= {{ fontSize: '11px'}} variant= 'overline'>
                                    {lang.name}
                                </Typography>
                                <Rating
                                    name="level"
                                    value={lang.level}
                                    size="small"
                                    readOnly
                                />
                            </Stack>
                        } 
                        variant="outlined"
                    />  
                    ))
                }
                
            </Stack>
        }
        
    </Paper>
    <Stack direction= 'row' spacing= {2} alignItems= 'center' justifyContent= 'flex-end'>
        <Button onClick= {() => setOpenForm(true)} variant= {'outlined'} sx= {{textTransform: 'none'}}>
            Add a new language
        </Button>
    </Stack>


</Stack>
  )
}

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function LanguageForm ({openForm, closeForm, addLang}) {

    const {language, setLanguage} = ResumeState()

    return (
        <Dialog
        open={openForm}
        TransitionComponent={Transition}
        fullWidth
        maxWidth= 'sm'
        keepMounted
        onClose={closeForm}
        aria-describedby="alert-dialog-slide-description"
      >

        <DialogTitle>{"Enter your language and level"}</DialogTitle>
        <DialogContent>
        <Stack spacing={2} sx={{ py: 2, pt: 3}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Language..."
            value= {language.name}
            onChange= {(e) => setLanguage({...language, name: e.target.value})}
            startAdornment= {
            <InputAdornment position="start">
              <Button
                variant="contained"
                color= 'error'
                sx={{
                  height: 45,
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                }}
                onClick= {closeForm}
              >
                Cancel
              </Button>
            </InputAdornment>
            }
            endAdornment={
                <>
              <InputAdornment position="end">
              <Rating
                    name="level"
                    value={language.level && !isNaN(language.level) ? language.level : 0}
                    onChange={(event, newValue) => setLanguage({...language, level: newValue})}
                />
              </InputAdornment>
              <InputAdornment position="end">
              <Button
                variant="contained"
                sx={{
                  height: 45,
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                }}
                onClick= {addLang}
              >
                Add
              </Button>
            </InputAdornment>
            </>
            }
            sx={{
              p: 0,
              width: 1,
              '& .MuiFilledInput-input': {
                fontSize: '13px',
                py: '13px',
                '&::placeholder': {
                  color: 'grey.500'
                },
              },
            }}
          />
          </Stack>
        </DialogContent>
        
      </Dialog>
    )
}