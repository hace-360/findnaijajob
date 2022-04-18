import {Stack, TextField,Button, FilledInput, InputAdornment, IconButton} from '@mui/material'
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';
import {GetSingleImage} from '../../../hooks/getImages'
import {useEffect, useState} from 'react'


const Input = styled('input')({
    display: 'none',
  });



export default function PersonalInfo ({setForm, form}) {

    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const [image, setImage] = useState('')
    const getPhotoURL = async (e) => {
        let img = await GetSingleImage(e)
        if (img.success && img.data) {
            setImage(URL.createObjectURL(img.data))
            
        }
    }

    useEffect(() => {
        if (image) {
            setForm({...form, photoURL: image})
        }
    }, [image])

    return (
        <Stack spacing= {2} sx= {{ py: 1 }} alignItems="flex-start">
            <TextField
                label= 'First & Last name'
                fullWidth
                name= 'name'
                value= {form.name || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Professional title'
                fullWidth
                placeholder='Full stack developer'
                name= 'title'
                value= {form.title || ''}
                onChange= {getForm}
                type= 'text'
            />
            <TextField
                label= 'Email address'
                fullWidth
                name= 'email'
                value= {form.email || ''}
                onChange= {getForm}
                type= 'email'
            />
            <TextField
              fullWidth
              name= 'phone'
              value= {form.phone || ''}
              onChange= {getForm}
              label="Phone number"
              type= 'phone'
            />
            <TextField
                label= 'Address'
                placeholder= '22, awolowo street, Ikeja, Lagos.'
                fullWidth
                type= 'text'
                name= 'address'
                value= {form.address || ''}
                onChange= {getForm}
            />

                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" onChange= {getPhotoURL} type="file" />
                    <Button 
                        startIcon= {<PhotoCamera />}
                        variant="outlined" component="span"
                    >
                    { form.photoURL ? 'change Photo' : 'upload' }
                    </Button>
                </label>
        </Stack>
    )
}