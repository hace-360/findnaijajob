import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Paper, Stack, Button, Box, TextField,Typography, MenuItem } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// _data
import { useState, useEffect } from 'react';
// layouts
import Layout from '../../src/layouts';
// components
import { Page, SearchInput } from '../../src/components';
import CreateBlogForm from '../../src/sections/blog/CreateBlog'
import {useRouter} from 'next/router'
import {useSettings} from '../../src/hooks'
import { Breadcrumbs} from '../../src/components';
import axios from 'axios'
import { FileUploader } from "react-drag-drop-files";
import ConvertToFormData from '../../src/hooks/convertToFormData'
import { LoadingButton } from '@mui/lab';
import CachedIcon from '@mui/icons-material/Cached';


// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// -------------------------------------------------------------------

export default function CreateBlog() {

    const router = useRouter()
    const {user, setAlert} = useSettings()
    const [form, setForm] = useState({description: '', title: '', content: '', coverImg: '', tags: '', category: ''})
    const [loading, setLoading] = useState(false)
    const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

    const [file, setFile] = useState(null);
    const fileTypes = ["JPG", "PNG", "GIF"];
    const handleChange = (file) => {
        setFile(file);
        setForm({...form, coverImg: file})
    };

    const handleSubmit = async () => {
        try {
            setLoading(true)
            let res = await axios.post('/blogs', ConvertToFormData(form))
            if (res && !res.data.success) throw new Error(res.data.message)
            res = res.data
            setAlert({message: res.message})
            setLoading(false)
            return router.push('/')
        }
        catch(err) {
            setLoading(false)
           return setAlert({message: err.message, type: 'error'})
        }
    }

    const allowedEmail = ['claceey@gmail.com', 'greatawo@gmail.com']
    useEffect(() => {
        if (!user || !allowedEmail.includes(user.email)) {
            router.back()
        }
    }, [user])


  return (
    <Page title="Create New Blog -">
      <RootStyle>
        <SearchInput
          sx={{
            mx: 2.5,
            display: { xs: 'flex', md: 'none' },
            my: { xs: 4, md: 0 },
          }}
        />

        <Container
          sx={{
            mt: { xs: 4, md: 10 },
            mb: 4
          }}
        >
            <Typography variant= 'h4' sx= {{mb: 2}}>
                Create new blog
            </Typography>

            <Breadcrumbs
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'Blog', href: '/blog' },
                    { name: user?.firstName && user?.firstName },
                ]}
                sx={{
                    mb: { xs: 2, md: 4 },
                }}
            />
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
            <Paper variant= 'outlined' sx= {{p: 2}}>
            <Stack
                spacing= {2}
            >
            <TextField
                label= 'Blog Title'
                variant='outlined'
                name= 'title'
                fullWidth
                value= {form?.title }
                onChange= {getForm}
            />
            <TextField
                label= 'Description'
                name= 'description'
                variant='outlined'
                fullWidth
                multiline
                rows={3}
                value= {form?.description }
                onChange= {getForm}
            />
            <Stack spacing= {0.5} sx= {{mt: 2}}>
                <Typography variant= 'button' color= 'primary'>
                    Content
                </Typography>
                <CreateBlogForm setForm= {setForm} form= {form} />
            </Stack>

            <Stack spacing= {1}>
                <Typography variant= 'button' sx= {{color: 'grey'}}>
                    Cover Image
                </Typography>

                
                <Paper variant= 'outlined' >
                <MenuItem>
                    <FileUploader handleChange={handleChange} name="file" types={fileTypes}>
                        <Stack direction= 'row' alignItems= 'center' sx= {{cursor: 'pointer'}}>
                        <img 
                            style= {{
                                width: '100%',
                                maxWidth: file ? '100%' : '200px',
                                maxHeight: '300px',
                                objectFit: 'cover',
                                display: 'flex'
                            }} 
                            src= {file ? URL.createObjectURL(file) : "https://imageupload.io/img/cloud-computing.png"}
                            alt="upload-image"
                        />

                        {!file && 
                            <Stack spacing= {1} sx= {{ paddingLeft: 3 }}>
                                <Typography variant= 'h5'>
                                    Drag or Select file
                                </Typography>
                                <Typography variant= 'body2'>
                                    Drop file here or <span style= {{color: 'green'}}>click</span> browse through your machine
                                </Typography>
                            </Stack>
                        }
                        </Stack>
                    </FileUploader>
                    </MenuItem>
                </Paper>
                
            </Stack>
            
            </Stack>
            </Paper>
            </Grid>

            <Grid item xs={12} md={4}>
                <Paper 
                    variant= 'outlined'
                    sx= {{
                        p: 2,
                        position: 'sticky',
                        top: '150px'
                    }}
                >
                    <Stack spacing= {3} >
                        <TextField
                            variant='outlined'
                            label= 'Category'
                            name= 'category'
                            fullWidth
                            value= {form?.category }
                            onChange= {getForm}
                        />
                        <TextField
                        variant='outlined'
                            label= 'Tags'
                            name= 'tags'
                            placeholder='comma seperated'
                            fullWidth
                            value= {form?.tags }
                            onChange= {getForm}
                        />
                        <Stack direction= 'row' justifyContent= 'space-between' alignItems= 'center'>
                            <Button onClick= {() => router.back()}  color= 'error'>
                                cancel
                            </Button>

                            <LoadingButton 
                                loadingPosition="start"
                                loading= {loading}
                                onClick= {handleSubmit}
                                startIcon={loading && <CachedIcon />}
                            >
                                {loading ? 'Publishing blog...' : 'Publish blog'}
                            </LoadingButton>
                        </Stack>
                    </Stack>
                </Paper>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

CreateBlog.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------
