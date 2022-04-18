import { useState, useEffect,useRef } from 'react';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography,Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// _data
import { _faqsSupport } from '../_data/mock';
// layouts
import Layout from '../src/layouts';
// components
import { Iconify, Page } from '../src/components';
import cssStyles from '../src/utils/cssStyles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const RootStyle = styled('div')(({ theme }) => ({
    ...cssStyles(theme).bgBlur({
      opacity: 0.24,
    }),
    top: 0,
    zIndex: 9999,
    position: 'fixed',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

// ----------------------------------------------------------------------

export default function SupportPage({sx}) {

    const [open, setOpen] = useState(true);
    const [scroll, setScroll] = useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = useRef(null);
    useEffect(() => {
        if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
        }
    }, [open]);
  

  return (
    <Page title="Support">
      <RootStyle sx={sx}>
      <Container>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll='paper'
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            {[...new Array(50)]
              .map(
                () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
              )
              .join('\n')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Container>
      </RootStyle>

      <Box sx={{ width: '100%', height: '100vh' }} />
    </Page>
  );
}

// ----------------------------------------------------------------------

SupportPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
