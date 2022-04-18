import * as React from 'react'
import {ListItemText, ListItemIcon, ListItem, Divider, List, Button, Drawer, Box} from '@mui/material'
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';



export default function TemporaryDrawer({open, setOpen}) {

  const handleClose = () => setOpen(false)

  return (
          <Drawer
            anchor='top'
            open={open}
            onClose={handleClose}
          >
            <TemplateContainer />
          </Drawer>
  );
}


export function TemplateContainer ({open}) {

    return (
        <Box
            role="presentation"
            sx= {{
                width: '200px',
                height: '500px',
            }}
        >
            hello there
        </Box>
    )
}