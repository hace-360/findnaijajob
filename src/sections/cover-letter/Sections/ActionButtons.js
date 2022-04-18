import {Typography,Stack, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, LinearProgress, Box} from '@mui/material'
import MarkunreadIcon from '@mui/icons-material/Markunread';
import PrintIcon from '@mui/icons-material/Print';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { IconButtonAnimate } from '../../../components';
import { useSettings } from '../../../hooks';
import {useState } from 'react'
import { useReactToPrint } from 'react-to-print';
import {ResumeState} from '../../../contexts/ResumeContext'
import axios from 'axios'
import ConvertToFormData from '../../../hooks/convertToFormData'
import html2canvas from 'html2canvas';
import { LoadingButton } from '@mui/lab';
import CachedIcon from '@mui/icons-material/Cached';
import {useRouter} from 'next/router'
import jsPDF from 'jspdf'





export function PrintButton ({componentRef}) {

    
    const {pageTitle} = ResumeState()
    const router = useRouter()
    const {subscription, user, setAlert} = useSettings()
    // 
    const printDocuemnt = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: pageTitle
      })
    //   
    const handlePrint = () => {
        if (!subscription || !subscription.active) {
            return router.push('/payment')
        }
        if (!user) {
            return router.push('/account/login')
        }
        if (user.accountType !== 'applicant') {
            return setAlert({message: 'Create an applicant account to continue', type: 'error'})
        }
        else printDocuemnt()
    }
 

    return (
            <IconButtonAnimate sx= {{ p: 0, width: '100%'}}>
            <Paper
                variant= 'outlined' 
                // onClick= {handlePrint}
                sx= {{
                    borderRadius: 0,
                    width: '100%',
                    height: 42,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    transition: '0.4s',
                    cursor: 'pointer',
                    zIndex: 2,
                    bgcolor: 'black'
                }}
            >
                <Stack
                    direction= 'row'
                    alignItems= 'center'
                    spacing= {1}
                >
                    <PrintIcon color= 'primary' />
                    <Typography variant= 'overline' sx= {{fontSize: '11px', color: 'white'}}>
                            print
                    </Typography>
                </Stack>
                </Paper>
            </IconButtonAnimate>
    )
}



export function DownloadButton ({componentRef}) {
    
    const router = useRouter()
    const {pageTitle, pageSize} = ResumeState()
    const {user, subscription,setAlert} = useSettings()
    const [loading, setLoading] = useState(false)

    const handleDownload = async () => {
        setLoading(true)
        if (!subscription || !subscription.active) {
            setLoading(false)
            return router.push('/payment')
        }
        if (!user) {
            setLoading(false)
            return router.push('/account/login')
        }
        if (user.accountType !== 'applicant') {
            setLoading(false)
            return setAlert({message: 'Create an applicant account to continue', type: 'error'})
        }
        const canvas = await html2canvas(componentRef.current)
        const width = canvas.getAttribute('width')
        const height = canvas.getAttribute('height')

        const pdf = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [width, height/1.5],
            putOnlyUsedFonts:true,
            compress: true
        })
        pdf.addImage(canvas, 'PNG', width/5, 0);
        pdf.save(`${pageTitle}.pdf`)
        setLoading(false)
        
    }
 

    return (
        <IconButtonAnimate sx= {{ p: 0, width: '100%'}} >
        <Paper
            variant= 'outlined' 
            // onClick={handleDownload}
            sx= {{
                borderRadius: 0,
                height: 42,
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                display: 'flex',
                transition: '0.4s',
                cursor: 'pointer',
                zIndex: 2,
                bgcolor: 'black'
            }}
        >
            <Stack
                direction= 'row'
                alignItems= 'center'
                spacing= {1}
            >
                <UploadFileIcon color= 'primary' />
                <Typography variant= 'overline' sx= {{fontSize: '11px', color: 'white'}}>
                    {loading ? 'Downloading...' : 'download'}
                </Typography>
            </Stack>
            </Paper>
        </IconButtonAnimate>
    )
}



export function EmailButton ({componentRef}) {
    
    const router = useRouter()
    const {pageTitle, pageSize} = ResumeState()
    const {user, setAlert, subscription} = useSettings()
    
    const [openEmail, setOpenEmail] = useState(false)
    const handleOpenEmailBox = () => {
        if (!subscription || !subscription.active) {
            return router.push('/payment')
        }
        if (!user) {
            return router.push('/account/login')
        }
        if (user.accountType !== 'applicant') {
            return setAlert({message: 'Create an applicant account to continue', type: 'error'})
        }
        setOpenEmail(true)
    } 
    const [form, setForm] = useState({
        email: '',
        name: '',
        subject: '',
        body: '',
        attachment: ''
    })
    const [loading, setLoading] = useState(false)

    const handleSendEmail = async () => {
        try {

            setLoading(true)
            const opt = {
                margin: 1,
                filename: `${pageTitle || user?.firstName || 'findnaijajob'}.pdf`,
                image:        { type: 'jpeg', quality: 0.98 },
                html2canvas:  { scale: 2 },
                jsPDF:        { unit: 'in', format: pageSize, orientation: 'portrait'}
            };
            const canvas = await html2canvas(componentRef.current)
            const src = await canvas.toDataURL('image/png')
            const res = await fetch(src);
            const buf = await res.arrayBuffer();
            const file = new File([buf], opt.filename, {type: 'image/png'});
            // 
            const payload = ConvertToFormData({...form, attachment: file})
            const sendEmail = await axios.post('/resume/email', payload)
            if (!sendEmail.data.success) throw new Error(sendEmail.data.message)
            setAlert({message: sendEmail.data.message})

            setOpenEmail(false)
            setForm({})
            setLoading(false)
        }
        catch(err) {
            setLoading(false)
            return setAlert({message: err.message, type: 'error'})
        }
    }

 

    return (
        <>
            <IconButtonAnimate sx= {{ p: 0, width: '100%'}} >
            <Paper
                variant= 'outlined' 
                // onClick= {handleOpenEmailBox}
                sx= {{
                    borderRadius: 0,
                    width: '100%',
                    height: 42,
                    alignItems: 'center',
                    justifyContent: 'center',
                    display: 'flex',
                    transition: '0.4s',
                    cursor: 'pointer',
                    zIndex: 2,
                    bgcolor: 'black'
                }}
            >
                <Stack
                    direction= 'row'
                    alignItems= 'center'
                    spacing= {1}
                >
                    <MarkunreadIcon color= 'primary' fontSize= 'small' />
                    <Typography variant= 'overline' sx= {{fontSize: '11px', color: 'white'}}>
                        email
                    </Typography>
                </Stack>
                </Paper>
            </IconButtonAnimate>

            { openEmail && 
                <EmailBox 
                    openEmail= {openEmail} 
                    setOpenEmail= {setOpenEmail} 
                    form= {form} 
                    setForm= {setForm} 
                    handleSendEmail= {handleSendEmail} 
                    loading= {loading} 
                /> }
            </>
    )
}




export function EmailBox ({openEmail, setOpenEmail, form, setForm, handleSendEmail, loading}) {
  
  const handleClose = () => {
     setOpenEmail(false)
     setForm({})
  } 
  const getForm = (e) => setForm({...form, [e.target.name]: e.target.value})

  return (
      <Dialog
        open={openEmail}
        fullWidth
        maxWidth= 'sm'
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography variant= 'overline'>
              send email
          </Typography>
        </DialogTitle>

        <DialogContent>
            <Stack spacing= {2} sx= {{py: 2}}>

          <Stack direction= 'row' alignItems= 'center' spacing= {2}>
            <TextField
                name= 'email'
                label= 'Reciever"s email'
                value= {form?.email}
                onChange= {getForm}
                variant= 'outlined'
                fullWidth
            />
            <TextField
                name= 'name'
                label= 'Reciever"s name'
                value= {form?.name}
                onChange= {getForm}
                variant= 'outlined'
                fullWidth
            />
          </Stack>

          <TextField
                name= 'subject'
                label= 'Subject'
                value= {form?.subject}
                onChange= {getForm}
                variant= 'outlined'
                fullWidth
            />

            <TextField
                name= 'body'
                label= 'Body'
                value= {form?.body}
                onChange= {getForm}
                rows= {5}
                multiline
                fullWidth
            />


          </Stack>
        </DialogContent>

        <DialogActions>
            <Stack spacing= {3} direction= 'row' alignItems= 'center'>
                <Button color= 'error' onClick={handleClose}>cancel</Button>

                <LoadingButton 
                    loadingPosition="start"
                    loading= {loading}
                    onClick={handleSendEmail}
                    startIcon={loading && <CachedIcon />}
                >
                    {loading ? 'sending email...' : 'send'}
                </LoadingButton>
          </Stack>
        </DialogActions>
      </Dialog>
  );
}



export function LoadingScreen ({loading, setLoading}) {
  
    return (
        <Dialog
          open={ loading ? true : false}
          fullWidth
          maxWidth= 'sm'
          onClose={() => setLoading(false)}
          aria-labelledby="alert-loading"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <Box sx={{ width: '100%' }}>
                <LinearProgress />
            </Box>
          </DialogContent>
        </Dialog>
    );
  }
  

