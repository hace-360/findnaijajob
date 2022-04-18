import {Stack, Divider,Button, Fab, Box, Tooltip} from '@mui/material'
import styles from './styles/footerAction.module.scss'
import ReactToPrint from 'react-to-print'
import FileOpenIcon from '@mui/icons-material/FileOpen';
import ClearIcon from '@mui/icons-material/Clear';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {IconButtonAnimate} from '../../components/animate'



export default function FooterAction ({componentRef, toggleSampleData, sampleData, getPdf, upload, setUpload, setHideResume, hideResume}) {
    

    return (
        <div className={styles.footerAction}>
            
            <Stack
                direction="row"
                alignItems= 'center'
                justifyContent= 'center'
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                >

                <Button variant= 'text' size= 'small' onClick= {toggleSampleData} >
                   {`${ sampleData ? 'clear' : 'load' } sample date`}
                </Button>

                <ReactToPrint
                trigger={() => <Button variant= 'contained' size= 'small'>
                                    save or print
                                </Button>}
                    content={() => componentRef.current}
                />

                <label htmlFor="cv-button-file">
                    <input 
                        style= {{display: 'none'}} 
                        accept="application/pdf,application/vnd.ms-excel"
                        id="cv-button-file"
                        onChange= {getPdf} type="file"
                    />
                    <Button 
                        startIcon= {<FileOpenIcon />}
                        variant="contained"
                        component="span"
                        size= 'small'
                        sx= {{ bgcolor: upload ? '#cc5500' : '#161C24', color: 'white' }}
                    >
                    { upload ? 'change file' : 'upload file' }
                    </Button>
                </label>

                {upload &&
                    <Button 
                        startIcon= {<ClearIcon />}
                        variant="contained"
                        component="span"
                        size= 'small'
                        color= 'error'
                        onClick= {() => {
                            setUpload('')
                            setHideResume()
                        }}
                    >
                    remove file
                    </Button>
                }

                {upload &&
                    <Tooltip title= {hideResume ? 'Show resume' : 'Hide Resume'}>
                    <IconButtonAnimate onClick= {() => setHideResume(!hideResume)}>
                        <Fab sx= {{width: '35px', height: '35px'}} color="primary" aria-label="add">
                            { hideResume ? <RemoveRedEyeIcon/> : <VisibilityOffIcon /> }
                        </Fab>
                    </IconButtonAnimate>
                    </Tooltip>
                }
            </Stack>
        </div>
    )
}