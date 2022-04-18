import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { IconButtonAnimate } from '../components/animate';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import {useSettings,useResponsive} from '../hooks'
import { useTheme } from '@mui/material/styles';
import * as React from 'react';
import Logout from '@mui/icons-material/Logout';
import {Paper, Box, Avatar, Menu, MenuItem, ListItemIcon, Divider, IconButton, Typography, Tooltip,Stack, Button} from '@mui/material'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import NextLink from 'next/link'
import FileCopyIcon from '@mui/icons-material/FileCopy';
import {useRouter} from 'next/router'
import SettingsIcon from '@mui/icons-material/Settings';
import RssFeedIcon from '@mui/icons-material/RssFeed';



export default function UserMenu ({ sx }) {

  const theme = useTheme()
  const {onToggleMode, user, userAction} = useSettings()
  const isLight = theme.palette.mode === 'light';
  const isDesktop = useResponsive('up', 'sm')
  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => await userAction.logOut()

  const router = useRouter()


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
            <Avatar
              alt={user?.displayName || 'Guest'}
              src={user?.photoURL || ''}
              sx={{ width: 30, height: 30 }}
            />
            {
              isDesktop &&
              <Typography variant= 'button'>
                {user?.firstName || 'Guest'}
              </Typography>
            }
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
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            padding: '10px 30px 10px 10px',
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
        <NextLink href='/profile'>
          <MenuItem>
            <Avatar src= {user?.photoURL || ''} alt= {user?.name || ''} /> Profile
          </MenuItem>
        </NextLink>

        <MenuItem>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <NextLink href='/profile/settings'>
            <Typography variant= 'body2' color= 'secondary'>
            My account
            </Typography>
          </NextLink>
        </MenuItem>

        <Divider />
        {
          user && user?.email == 'greatawo@gmail.com' || user?.email == 'claceey@gmail.com' &&
          <MenuItem>
            <ListItemIcon>
              <RssFeedIcon fontSize="small" />
            </ListItemIcon>
            <NextLink href='/blog/create'>
              <Typography variant= 'body2' >
                Write Blog
              </Typography>
            </NextLink>
          </MenuItem>
        }

        <MenuItem onClick= {() => onToggleMode()}>
          <ListItemIcon>
            {
              isLight ? <ToggleOnIcon fontSize= 'small' /> : <ToggleOffIcon fontSize= 'small' />
            }
          </ListItemIcon>
            {
              isLight ? 'Dark mode' : 'Light mode'
            }
        </MenuItem>
          {
            user && user?.accountType !== 'recruiter' &&
            <MenuItem onClick= {() => router.push('/resume')} >
              <ListItemIcon>
                <FileCopyIcon fontSize="small" />
              </ListItemIcon>
              create resume
            </MenuItem>
          }
          {
            user &&
            <MenuItem onClick= {handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          }
        

      </Menu>
    </React.Fragment>
  );
}
