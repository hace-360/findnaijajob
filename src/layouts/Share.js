import { IconButtonAnimate } from '../components/animate';
import {useSettings} from '../hooks'
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import {Paper, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip,Stack} from '@mui/material'
import ShareIcon from '@mui/icons-material/Share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';



export default function AccountMenu({ sx }) {

  const theme = useTheme()
  const {onToggleMode, user} = useSettings()
  const isLight = theme.palette.mode === 'light';
  
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
        <Tooltip title= 'Share resume'>
        <IconButtonAnimate color="inherit" onClick= {handleClick} sx={sx}>
            <ShareIcon />
        </IconButtonAnimate>
        </Tooltip>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            p: 1,
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
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
        <MenuItem>
          <FacebookIcon />
          <Typography sx= {{ marginLeft: 2 }} variant= 'body2'>
              facebook
          </Typography>
        </MenuItem>

        <MenuItem>
          <TwitterIcon />
          <Typography sx= {{ marginLeft: 2 }} variant= 'body2'>
              twitter
          </Typography>
        </MenuItem>

        <MenuItem>
          <LinkedInIcon />
          <Typography sx= {{ marginLeft: 2 }} variant= 'body2'>
              linkedin
          </Typography>
        </MenuItem>

      </Menu>
    </React.Fragment>
  );
}
