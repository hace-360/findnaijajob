const images = [
    "https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/modern-resume-template2%20(1).jpg?alt=media&token=55f20838-9189-4f01-bc23-c7e96008a5db",
    "https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/Image-Preview1%20(1).jpg?alt=media&token=6ac31456-7c95-4cb7-9b6d-a3a453b5e486",
    "https://www.resumonk.com/assets/template-thumbnails/elemental-9a290f22da422ad3ea13363a7b2daff2857371ee649115e5e28f4a4414c640a4.jpg",
    "https://www.freesumes.com/wp-content/uploads/2020/09/Limita-Google-docs-resume-template.png"
]

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButtonAnimate } from '../../components/animate';
import * as React from 'react';
import {Paper, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, Typography, Tooltip,Stack, Grid} from '@mui/material'


export default function ImageTemplate({ sx, setTemp, temp }) {

  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment>

        <Paper 
          sx= {{ px: 1, py: 0.1 }}
          variant= 'outlined'
          elevation= {0}
        >
          <Stack
            direction= 'row'
            alignItems= 'center'
            spacing= {2}
          >
            <Typography variant= 'button'>
              Templates
            </Typography>
            <IconButtonAnimate color="inherit" onClick={handleClick} sx={sx}>
              <KeyboardArrowDownIcon sx={{ width: 20, height: 20, transform: open && 'rotate(-180deg)', transition: '0.4s' }} />
            </IconButtonAnimate>
          </Stack>
        </Paper>

        <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        // onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'auto',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 'fit-content',
              height: 32,
              ml: -0.5,
              mr: 1,
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

    <Stack
        component='div'
        direction= 'row'
        divider= {<Divider flexItem orientation= 'vertical' />}
        sx= {{
            flexWrap: 'wrap',
            maxWidth: '500px'
        }}
    >
        {
            images.map((img, index) => (
                <MenuItem key= {index} sx= {{position: 'relative'}} onClick= {() => setTemp(index)}>
                    <Box
                        component="img"
                        alt={img}
                        src={img}
                        sx={{ borderRadius: '10px', width: '150px', height: '170px', objectFit: 'cover' }}
                    />
                    <Box 
                      sx= {{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        width:  'calc(100% - 15px)',
                        height: temp == index ? '75%' : '100%',
                        bgcolor: 'black',
                        opacity: temp == index ? '0.7' : 0,
                        borderRadius: '10px',
                        transition: '0.4s',
                        '&:hover': {
                          transition: '0.4s',
                          opacity: 0.7
                        }
                      }}
                    >
                    <Typography sx= {{ color: 'white' }} variant= 'body3'>
                      {temp == index ? 'Active template' : 'select template'}
                    </Typography>
                    </Box>
                </MenuItem>
                ))
        }
    </Stack>

    </Menu>
    </React.Fragment>
  );
}
