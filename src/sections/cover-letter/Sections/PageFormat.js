import {Stack, Typography, FilledInput, InputAdornment, Button} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import {useState} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { LetterState } from '../../../contexts/LetterContext';



export default function PageControl () {

    return (
        <Stack direction= 'row' justifyContent= 'space-between' alignItems= 'center' sx= {{py: 2}}>
            <FileName />
        </Stack>
    )
}

function FileName () {

    const [closeFile, setCloseFile] = useState(false)
    const handleClose = () => setCloseFile(false)
    const handleOpen = () => setCloseFile(true)
    const {letterTitle, setLetterTitle} = LetterState()
    const [title, setTitle] = useState('')
    const handlePageTitle = () => {
        if (title) {
            setLetterTitle(title)
            handleClose()
        }
    }

    return (
        <>
        {
            !closeFile ? 
            <Stack
                direction= 'row'
                alignItems= 'center'
                justifyContent= 'flex-end'
                spacing= {1}
                onClick= {handleOpen}
                sx= {{cursor: 'pointer', width: '100%'}}
            >
                <BorderColorIcon fontSize= 'small' />

                <Typography variant= 'overline' color= 'secondary' sx= {{textTransform: 'lowercase'}}>
                    {letterTitle || '[ TITLE_LETTER ]' }
                </Typography>
            </Stack>
             : 
            <Stack spacing= {2} alignItems= 'center' direction= 'row' >
             <FilledInput
                placeholder="file name"
                value= {title || ''}
                onChange= {(e) => setTitle(e.target.value)}
                endAdornment={
                <InputAdornment position="end">
                    <Button
                        size= 'small'
                        variant="contained"
                        onClick= {handlePageTitle}
                        sx= {{
                            borderRadius: 0
                        }}
                    >
                        <CheckIcon />
                    </Button>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                borderRadius: 0,
                maxWidth: 300,
                '& .MuiFilledInput-input': {
                    py: '7px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <Button color= 'error' sx= {{fontSize: '12px'}} onClick= {handleClose}>
                cancel
            </Button>
        </Stack>}
        </>
    )
}
