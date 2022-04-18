import { Typography, Stack, MenuItem,TextField, Avatar, Paper } from "@mui/material"
import { FileUploader } from "react-drag-drop-files";
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {ResumeState} from '../../../contexts/ResumeContext'



export default function Contact () {

    const {contact: form, setContact: setForm} = ResumeState()

    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getSocial = (e) => setForm({...form, social: {...form.social, [e.target.name]: e.target.value}})
    const getAddress = (e) => setForm({...form, address: {...form.address, [e.target.name]: e.target.value}})
    const fileTypes = ["JPG", "PNG", "GIF"];
    const handleChange = (file) => {
        if (file) {
            setForm({...form, photoURL: file, previewImg: URL.createObjectURL(file)})
        }
    }

    return (
        <div>
            <Stack spacing= {2} sx= {{py: 2}}>
                <Typography variant= 'h3'>
                    What’s the best way for employers to contact you?
                </Typography>
                <Typography variant= 'body1'>
                    We suggest including an email and phone number.
                </Typography>
            </Stack>

            <Stack direction= 'row' spacing= {2} sx= {{py: 2}} alignItems= 'flex-start'>

                {/* Image section */}
                <MenuItem>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                        <Stack alignItems= 'center' sx= {{cursor: 'pointer'}}>
                            <Avatar
                                src= {form.previewImg || ''}
                                alt= {''}
                                variant='rounded'
                                sx={{ width: 150, height: 150 }}
                            />

                            <Stack spacing= {1} direction= 'row' alignItems= 'center'>
                                <AddAPhotoIcon fontSize= 'small' />
                                <Typography variant= 'body3' sx= {{py: 1, fontWeight: 600}}>
                                   {form.previewImg ? 'change image' : 'upload image'}
                                </Typography>
                            </Stack>
                        </Stack>
                    </FileUploader>
                </MenuItem>

                {/* form section */}

                <Stack spacing= {4} sx= {{width: '100%'}} >

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'firstName'
                            value= {form.firstName}
                            onChange= {getForm}
                            label="First Name"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            fullWidth
                            name= 'lastName'
                            value= {form.lastName}
                            onChange= {getForm}
                            label="Last Name"
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'title'
                            value= {form.title}
                            onChange= {getForm}
                            label="Professional Title"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            fullWidth
                            name= 'website'
                            value= {form.social.website}
                            onChange= {getSocial}
                            label="Website"
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>

                    <TextField
                        label= 'Street Address'
                        placeholder= '22, awolowo street'
                        fullWidth
                        type= 'text'
                        variant="outlined"
                        name= 'street'
                        value= {form.address.street}
                        onChange= {getAddress}
                    />
                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'city'
                            value= {form.address.city}
                            onChange= {getAddress}
                            label="City"
                            type= 'text'
                            variant="outlined"
                        />
                        <TextField
                            label= 'State'
                            fullWidth
                            name= 'state'
                            value= {form.address.state}
                            onChange= {getAddress}
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            label= 'Country'
                            fullWidth
                            name= 'country'
                            value= {form.address.country}
                            onChange= {getAddress}
                            variant="outlined"
                            type= 'text'
                        />
                    </Stack>
                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'phone'
                            value= {form.phone}
                            onChange= {getForm}
                            label="Phone number"
                            variant="outlined"
                            type= 'tel'
                        />
                        <TextField
                            label= 'Email address'
                            fullWidth
                            name= 'email'
                            variant="outlined"
                            value= {form.email}
                            onChange= {getForm}
                            type= 'email'
                        />
                    </Stack>

                    <Paper variant= 'outlined' sx= {{p: 2}}>

                    <Stack spacing= {1} >
                        <Typography variant= 'overline'>
                            Socials
                        </Typography>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'linkedin'
                            value= {form.social.linkedin}
                            onChange= {getSocial}
                            label="Linkedin"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            label= 'Twitter'
                            fullWidth
                            name= 'twitter'
                            variant="outlined"
                            value= {form.social.twitter}
                            onChange= {getSocial}
                            type= 'text'
                        />
                    </Stack>

                    <Stack direction='row' alignItems= 'center' spacing= {2}>
                        <TextField
                            fullWidth
                            name= 'facebook'
                            value= {form.social.facebook}
                            onChange= {getSocial}
                            label="Facebook"
                            variant="outlined"
                            type= 'text'
                        />
                        <TextField
                            label= 'Instagram'
                            fullWidth
                            name= 'instagram'
                            variant="outlined"
                            value= {form.social.instagram}
                            onChange= {getSocial}
                            type= 'text'
                        />
                    </Stack>
                    </Stack>
                    </Paper>

                </Stack>
            </Stack>

        </div>
    )
}