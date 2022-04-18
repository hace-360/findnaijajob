import {Stack, Typography, Tab,Tabs, Box} from '@mui/material'
import { Breadcrumbs } from '../../../components'
import SwipeableViews from 'react-swipeable-views';
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'
import SocialForm from './SocialForm'
import {useRouter} from 'next/router'
import {useState} from 'react'
import { useTheme } from '@mui/material/styles';
import {useSettings} from '../../../hooks'



function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        style= {{
          padding: '2px'
        }}
      >
        {value === index && (
          <Box sx={{ padding: '20px 5px' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
  
  const SettingsProps = [
    {
        label: 'General Settings',
        component: <ProfileForm />,
        id: 0
    },
    {
        label: 'Social Links',
        component: <SocialForm />,
        id: 0
    },
    {
        label: 'Password reset',
        component: <PasswordForm />,
        id: 0
    }
  ]


export default function Recruiter () {

    const theme = useTheme();
    const isLight = theme.palette.mode === 'light';
    const [value, setValue] = useState(0);
    const router = useRouter()
    const {user} = useSettings()
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <Stack
            spacing= {2}
        >

            <Typography variant= "h5"  sx= {{ fontFamily: 'Poppins' }}>
                Account Settings
            </Typography>
            
            <Breadcrumbs
                links={[
                    { name: 'Home', href: '/' },
                    { name: 'settings', href: '/profile/settings' },
                    { name: user?.firstName || '' },
                ]}
                sx={{
                    mb: { xs: 5, md: 8 },
                }}
                />
            
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="secondary"
                textColor="primary"
                variant="scrollable"
                scrollButtons="auto"
                aria-label="full width tabs example"
                sx= {{ bgcolor: isLight && 'white' }}
                >
                {
                SettingsProps.map((tag, index) => (
                    <Tab label={tag.label} {...a11yProps(index)} key= {index} />
                ))
                }
            </Tabs>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                {
                SettingsProps.map((tag, index) => (
                    <TabPanel value={value} index={index} dir={theme.direction} key= {index}>
                        {tag.component}
                    </TabPanel>
                ))
                }
            </SwipeableViews>

        </Stack>
    )
}