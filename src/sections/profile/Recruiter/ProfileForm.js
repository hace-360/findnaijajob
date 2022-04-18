import {Stack, Typography, Grid, Paper, Divider, Box, Avatar, TextField} from '@mui/material'
import { LoadingButton } from '@mui/lab';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import {GetSingleImage} from '../../../hooks/getImages'
import {useSettings} from '../../../hooks'
import {useState} from 'react'
import {IndustryFilter, CountryFilter, StatesFilter } from './Filter'


export default function ProfileForm () {

    const {user, userAction, setAlert} = useSettings()
    const [form, setForm] = useState({
        email: user?.email || '',
        name: user?.name || '',
        address: {
            state: user?.address?.state || '',
            street: user?.address?.street || '',
            country: user?.address?.country || '',
            city: user?.address?.city || '',
        },
        photoURL: user?.photoURL || '',
        phone: user?.phone || '',
        // title: user?.title || '',
        // position: user?.position || '',
        company: {
            industry: user?.company?.industry,
            name: user?.company?.name 
        },
        about: user?.about || '',
    })
    const [prevImg, setPrevImg] = useState(user?.photoURL || '')
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})
    const getCompany = (e) => setForm({...form, company: { [e.target.name]: e.target.value}})
    const getAddress = (e) => setForm({...form, address: { [e.target.name]: e.target.value}})
    const [loading, setLoading] = useState(false)

    const getPhoto = async (e) => {
        let img = await GetSingleImage(e)
        if (!img.success) setAlert({message: (await img).message, type: 'error'})
        setForm({...form, photoURL: img.data})
        setPrevImg(URL.createObjectURL(img.data))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        await userAction.updateUser({form, setAlert})

        return setLoading(false)
    }

    return (
        <Stack spacing= {2} direction= 'row' divider= {<Divider orientation= 'vertical' flexItem />}>
            <Grid
                item xs= {12} md= {4}>
                <Paper variant= 'outlined' sx= {{py: 10}}>
                    <Stack
                        alignItems='center'
                        
                    >
                        <Box
                            component='span'
                            sx= {{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                border: '1px dashed #808080',
                                borderRadius: '100%',
                                width: 155,
                                height: 155,
                                cursor: 'pointer',
                                marginBottom: 2
                            }}
                        >
                            <Avatar
                                src={prevImg || ''}
                                alt={ form?.firstName || 'Guest'}
                                sx={{ width: 130, height: 130}}
                            />
                            <Box
                                component= 'label'
                                htmlFor='user_image'
                                onChange= {getPhoto}
                                sx= {{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'absolute',
                                    width: 130,
                                    height: 130,
                                    borderRadius: '100%',
                                    backgroundColor: 'black',
                                    opacity: 0,
                                    cursor: 'pointer',
                                    '&:hover': {
                                        opacity: 0.5, 
                                    }
                                }}
                            >
                                <input 
                                    style= {{display: 'none'}}
                                    type="file" name="user_image" id="user_image"
                                    onChange= {getPhoto}
                                />
                                <AddAPhotoIcon sx= {{color: 'white'}} />
                                <Typography variant='button' sx= {{textAlign: 'center', color: 'white', fontSize: '11px'}}>
                                    Update photo
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant='body3' sx= {{textAlign: 'center', color: '#808080', fontSize: '11px'}}>
                        Allowed *.jpeg, *.jpg, *.png, *.gif
                        <br/>
                            max size of 3.1 MB
                        </Typography>
                    </Stack>
                </Paper>
            </Grid>

            <Grid
                item xs= {12} md= {8}>
                <Paper variant= 'outlined' sx= {{p: 2}}>
                    <Stack spacing= {2}>
                        <Stack spacing= {2} direction= 'row' alignItems='center'>
                            <TextField
                                label= 'Name'
                                fullWidth
                                value= {form.name}
                                placeholder='Full name'
                                name= 'name'
                                type= 'text'
                                onChange= {getForm}
                            />
                            <TextField
                                label= 'Email Address'
                                fullWidth
                                value= {form.email}
                                onChange= {getForm}
                                placeholder='Email address...'
                                name= 'email'
                                type= 'email'
                            />
                        </Stack>
                        <Stack spacing= {2} direction= 'row' alignItems='center'>
                            <TextField
                                label= 'Phone Number'
                                fullWidth
                                placeholder='234-0812345678'
                                name= 'phone'
                                type= 'phone'
                                onChange= {getForm}
                                value= {form?.phone || ''}
                            />
                            <TextField
                                label= 'Address'
                                fullWidth
                                placeholder='address...'
                                name= 'street'
                                type= 'address'
                                onChange= {getAddress}
                                value= {form?.address?.street || ""}
                            />
                        </Stack>
                        <Stack spacing= {2} direction= 'row' alignItems='center'>
                            <CountryFilter value= {form?.address?.country || ''} setForm= {setForm} form= {form} label= 'address' />
                            <StatesFilter value= {form?.address?.state || ''} setForm= {setForm} form= {form} label= 'address' />
                        </Stack>
                        <Stack spacing= {2} direction= 'row' alignItems='center'>
                            <TextField
                                label= 'Company Name'
                                fullWidth
                                placeholder='e.g. Google Nig LTD'
                                name= 'name'
                                type= 'text'
                                onChange= {getCompany}
                                value= {form?.company?.name || ''}
                            />
                            <IndustryFilter value= {form?.company?.industry} setForm= {setForm} form= {form} />
                        </Stack>
                        <TextField
                            name= 'about'
                            label= 'About'
                            fullWidth
                            multiline
                            rows={8}
                            onChange= {getForm}
                            value= {form?.about || ''}
                        />
                        <Stack spacing= {2} direction= 'row' alignItems='center' justifyContent='space-between'>
                            <span/>
                            <LoadingButton 
                                variant="contained"
                                sx={{ mt: 5, mb: 3, width: '200px' }}
                                loadingPosition="start"
                                loading= {loading}
                                onClick= {handleSubmit}
                            >
                            save changes
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
        </Stack>
    )
}