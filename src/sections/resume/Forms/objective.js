import {Stack, Typography, TextField, Divider} from '@mui/material'



export default function Objectives ({setForm, form}) {
  
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    return (
        <Stack spacing={2}  sx= {{ py: 1 }} >
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              Write a little about what your objectives are.
          </Typography>
          <Divider />
          <TextField
            name= 'objective'
            value= {form.objective || ''}
            onChange= {getForm}
            fullWidth
            multiline
            rows={8}
            placeholder='e.g - Looking for a challenging role in a reputable organization to utilize my technical skills.'
          />
        </Stack>
    )
}