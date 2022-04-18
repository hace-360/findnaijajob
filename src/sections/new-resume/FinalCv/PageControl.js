import {Stack, Link, Typography, Menu, MenuItem, Divider,FilledInput, InputAdornment, Button} from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {useState} from 'react'
import CheckIcon from '@mui/icons-material/Check';
import { ResumeState } from '../../../contexts/ResumeContext';



export default function PageControl () {

    return (
        <Stack direction= 'row' justifyContent= 'space-between' alignItems= 'center' sx= {{py: 2}}>
            <FileName />
            <PageFormat />
        </Stack>
    )
}

function FileName () {

    const [closeFile, setCloseFile] = useState(false)
    const handleClose = () => setCloseFile(false)
    const handleOpen = () => setCloseFile(true)
    const {pageTitle, setPageTitle} = ResumeState()
    const [title, setTitle] = useState('')
    const handlePageTitle = () => {
        if (title) {
            setPageTitle(title)
            handleClose()
        }
    }

    return (
        <>
        {
            !closeFile ? 
            <Stack direction= 'row' alignItems= 'center' spacing= {1} onClick= {handleOpen} sx= {{cursor: 'pointer'}}>
                <BorderColorIcon fontSize= 'small' />

                <Typography variant= 'overline' color= 'secondary' sx= {{textTransform: 'lowercase'}}>
                   {
                       pageTitle ? `${pageTitle}.pdf` : '[ TITLE_CV ]'
                   } 
                </Typography>
            </Stack>
             : 
            <Stack spacing= {2} alignItems= 'center' direction= 'row'>
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
                    >
                        <CheckIcon />
                    </Button>
                </InputAdornment>
                }
                sx={{
                p: 0,
                width: 1,
                maxWidth: 300,
                '& .MuiFilledInput-input': {
                    py: '7px',
                    '&::placeholder': {
                    color: 'grey.500',
                    },
                },
                }}
            />

            <Button color= 'info' sx= {{fontSize: '12px'}} onClick= {handleClose}>
                cancel
            </Button>
        </Stack>}
        </>
    )
}

function PageFormat () {

    const [anchorEl, setAnchorEl] = useState(null);
    const {pageTitle, setPageSize, pageSize} = ResumeState()
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

    return (
        <>
        <Stack direction= 'row' alignItems= 'center' sx= {{cursor: 'pointer'}} onClick= {handleClick}>
            <Link sx= {{
                fontSize: '13px'
            }}>
                    Page size - 
            </Link>

            <Typography variant= 'overline' sx= {{fontWeight: 900}}>
                {pageSize}
            </Typography>
            <ArrowDropDownIcon />
        </Stack>

        <Menu
            anchorEl={anchorEl}
            id="pageControl"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                variant: 'outlined',
                sx: {
                    // padding: '10px 30px 10px 10px',
                    width: '250px',
                    px: 1,
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                    // width: 32,
                    // height: 32,
                    // ml: -0.5,
                    // mr: 1,
                    },
                    '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                    },
                },
                }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
        <MenuItem sx= {{width: '100%', py: 0.2, px: 1}} onClick= {() => setPageSize('a4')}>
            <Stack direction= 'row' alignItems= 'center' sx= {{cursor: 'pointer'}}>
                <Typography sx= {{fontWeight: 900, fontSize: '12px', paddingRight: 1}}>
                    A4
                </Typography>
                <Typography variant= 'body3' sx= {{fontSize: '13px'}}>
                    - 210mm - 265mm
                </Typography>
            </Stack>
        </MenuItem>
            <Divider flexItem />
        <MenuItem sx= {{width: '100%', py: 0.2, px: 1}} onClick= {() => setPageSize('letter')}>
            <Stack direction= 'row' alignItems= 'center' sx= {{cursor: 'pointer'}}>
                <Typography sx= {{fontWeight: 900, fontSize: '12px', paddingRight: 1}}>
                    Letter
                </Typography>
                <Typography variant= 'body3' sx= {{fontSize: '13px'}}>
                    - 215.9mm - 279.4mm
                </Typography>
            </Stack>
        </MenuItem>
      </Menu>
        </>
    )
}