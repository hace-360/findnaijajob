import PropTypes from 'prop-types';
import {useState} from 'react'
// @mui
import { Stack, Typography, Paper,Button,Divider, Chip , FilledInput, InputAdornment } from '@mui/material';
import { useResponsive, useSettings } from '../../../../hooks';


// ----------------------------------------------------------------------


export default function Language({form, setForm}) {
    const {setAlert} = useSettings()
    const isDesktop = useResponsive('up', 'md');

    const deletelanguage = (index) => setForm({...form, languages: form.languages.filter((language, i) => i !== index)} )
    const [language, setlanguage] = useState('')
    const addlanguages = () => {
        if (form?.languages?.includes(language)) {
            setAlert({type: 'error', message: 'This language already exist'})
        }
        if (language && !form?.languages?.includes(language)) {
            setForm({...form, languages: [...form.languages, language]})
            setlanguage('')
        }
    }

  return (
        <Stack spacing={0.5}>
          <Typography variant="button">Language</Typography>

          <Stack spacing= {1} alignItems= 'flex-start' flexWrap='wrap' direction= 'row'>
              {
                  form?.languages?.length > 0 && form?.languages?.map((language, index) => (
                    <Chip label= {language} onDelete= {() => deletelanguage(index)} key= {index} sx= {{maxWidth: '100%' }} />
                  ))
              }
          </Stack>


          <Stack spacing={2} sx={{ pt: 1}} direction="row" alignItems="center" justifyContent= 'flex-end'>
          <FilledInput
            placeholder="Required language"
            value= {language}
            onChange= {(e) => setlanguage(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  sx={{
                    height: 45,
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  onClick= {addlanguages}
                >
                  Add
                </Button>
              </InputAdornment>
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
  );
}
