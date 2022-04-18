import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider , FilledInput, InputAdornment, Rating  } from '@mui/material';
import { useSettings } from '../../../hooks';
import CloseIcon from '@mui/icons-material/Close';
import {IconButtonAnimate} from '../../../components/animate'


// ----------------------------------------------------------------------


export default function Language ({form, setForm}) {

    const {setAlert} = useSettings()

    const deleteLang = (index) => {
        if (form?.language) {
            setForm({...form, language: form.language.filter((lang, i) => i !== index)})
        }
    } 

    const [lang, setLang] = useState({name: '', level: 0})
    

    const addLang = () => {
        const keys = form.language.length > 0 ? form.language.map(v => v.name) : []
        if (lang.name && !keys.includes(lang.name)) {
            setForm({...form, language: [...form.language, {...lang}]})
            setLang({name: '', level: 0})
        }
    }

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>

        <Stack spacing={0.5}>
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                How many languages can you speak?
          </Typography>
          {
          form.language.length > 0 && 
          <>
          <Divider />
            <Stack spacing= {2} sx= {{ minHeight: '40px'}} alignItems= 'flex-start'>
                {
                    form.language.length > 0 && form.language.map((lang, index) => (
                        <Stack 
                            key= {index}
                            direction="row"
                            alignItems= 'center'
                            spacing= {1}
                            divider= {<Divider orientation="vertical" flexItem />}
                        >
                            <Typography sx= {{ fontSize: '12px' }} variant= 'button'>{lang.name}</Typography>
                            <Rating
                                name="level"
                                value={lang.level}
                                readOnly
                            />
                            
                            <IconButtonAnimate onClick= {() => deleteLang(index)}>
                                <CloseIcon sx= {{ fontSize: '15px' }} />
                            </IconButtonAnimate>
                        </Stack>
                    ))
                }
            </Stack>
          <Divider />
          </>
          }
          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Enter your skills..."
            value= {lang.name}
            onChange= {(e) => setLang({...lang, name: e.target.value})}
            endAdornment={
                <>
              <InputAdornment position="end">
              <Rating
                    name="level"
                    value={lang.level}
                    onChange={(event, newValue) => {
                    setLang({...lang, level: newValue});
                    }}
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
        </Stack>

    </Paper>
  );
}
