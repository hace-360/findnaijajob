// @mui
import { styled } from '@mui/material/styles';
import { Typography, TextField, Stack, Divider, Paper, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(5),
    paddingLeft: theme.spacing(4),
  },
}));

// ----------------------------------------------------------------------

export default function CheckoutBillingAddress({user, form, decreaseCredit, increaseCredit}) {

  
  return (
    <RootStyle>
      <Stack spacing={2.5}>
        <Typography variant="h5" sx={{ mb: 2.5 }}>
          Billing Information
        </Typography>
        <TextField fullWidth label="Name" value= {user?.name || ''} disabled />
        {user?.phone && <TextField fullWidth label="Phone number" value= {user?.phone || ''} disabled />}
        <TextField fullWidth label="Email" value= {user?.email || ''} disabled />

        {/* <ButtonGroup variant= 'outlined'  disableElevation aria-label="outlined button group"> */}
        <Paper variant= 'outlined' sx= {{width: 'fit-content'}} >
        <Stack
          direction= 'row'
          divider= {<Divider orientation= 'vertical' flexItem />}
        >
          <Button size= 'small' onClick= {decreaseCredit}  sx= {{border: 'none', '&:hover': {border: 'none'}}}>
            <RemoveIcon />
          </Button>
          <Button sx= {{border: 'none', '&:hover': {border: 'none'}}}>
            <Typography variant= 'h4' color= 'inherit'>
              {form.credit || ''}
            </Typography>
          </Button>
          <Button size= 'small' onClick= {increaseCredit} sx= {{border: 'none', '&:hover': {border: 'none'}}}>
            <AddIcon />
          </Button>
        {/* </ButtonGroup> */}
        </Stack>
        </Paper>
      </Stack>
    </RootStyle>
  );
}
