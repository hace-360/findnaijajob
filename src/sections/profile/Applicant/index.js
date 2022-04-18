import {Stack, Typography,Grid, Paper, TextField, Divider, Card, CardContent, Link,Box} from '@mui/material'
import ProfileBanner from '../ProfileBanner'
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import CoverLetter from './CoverLetter'
import Association from './Associations'
import JobSkills from './JobSkills'
import Education from './Education'
import Experience from './Experience'
import Certificate from './Certificates'
import {useSettings, useResponsive} from '../../../hooks'
import {TextMaxLine} from '../../../components'
import useSWR from 'swr'



export default function Applicant ({id}) {

  const {user: mainUser} = useSettings()
  const {data: user} = useSWR(() => id ? `/profile/${id}` : '/profile', { initialData: mainUser, revalidateOnFocus: true })
  const {data: allApplications} = useSWR(() => user ? `/application` : '', { initialData: [], revalidateOnFocus: true })

  const isDesktop = useResponsive("up", "md")
  
    return (
        <Stack
            spacing= {2}
        >
            <ProfileBanner id= {id} />

          <Stack direction={ isDesktop ? 'row' : 'column' } spacing= {3} sx= {{p: '5px'}}>
            <Grid item xs= {12} md= {4}>
              <Stack spacing= {3}>

              <Card variant= 'outlined'>
              <CardContent>
                <Stack 
                  spacing={2}
                  direction= 'row'
                  justifyContent= 'space-evenly'
                  divider= {<Divider flexItem orientation='vertical' />}
                >
                  <Stack alignItems= 'center'>
                    <Typography variant= 'h3'>
                      {allApplications ? allApplications?.length : 0}
                    </Typography>
                    <Typography variant= 'body3' color= 'text.grey'>
                      Applications
                    </Typography>

                  </Stack>

                  <Stack alignItems= 'center'>
                    <Typography variant= 'h3'>
                      0
                    </Typography>
                    <Typography variant= 'body3' color= 'text.grey'>
                      Hires
                    </Typography>

                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card variant= 'outlined'>
              <CardContent>
              <Stack spacing={3}>

                <Typography variant= 'button' sx={{ fontSize: 14 }} color="text.secondary" >
                  About
                </Typography>

                <TextMaxLine line= {10}>
                <Typography variant="body3" sx= {{fontSize: '12px'}}>
                    { user?.about || 'These shows a little introduction about you...' }
                </Typography>
                </TextMaxLine>

                <Stack spacing={1}>
                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <EmailIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      { user?.email || '@' }
                    </Typography>
                    </TextMaxLine>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LocationOnIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      Lives at <Link> {user?.address?.street || ''}, {user?.address?.state || ''}, {user?.address?.country || ''} </Link>
                    </Typography>
                    </TextMaxLine>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <BusinessCenterIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <TextMaxLine line= {1}>
                      <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      {user?.title || ''} at <Link>{ user?.industry || '' }</Link>
                      </Typography>
                    </TextMaxLine>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LocalPhoneIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <TextMaxLine line= {1}>
                      <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                      <Link>{ user?.phone || '' }</Link>
                      </Typography>
                    </TextMaxLine>
                  </Stack>
                </Stack>

                </Stack>
              </CardContent>
            </Card>


            <Card variant= 'outlined'>
              <CardContent>
              <Stack spacing={2}>

                <Typography variant= 'button' sx={{ fontSize: 14 }} color="text.secondary" >
                  Social Links
                </Typography>

                <Stack spacing={1}>
                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <FacebookIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://facebook.com/${user?.social?.facebook || ''}`}
                    </Typography>
                    </TextMaxLine>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <TwitterIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://twitter.com/${user?.social?.twitter || ''}`}
                    </Typography>
                    </TextMaxLine>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <LinkedInIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://linkedin.com/${user?.social?.linkedin || ''}`}
                    </Typography>
                    </TextMaxLine>
                    </Link>
                  </Stack>

                  <Stack direction= 'row' alignItems= 'center' justifyContent='flex-start'>
                    <InstagramIcon fontSize= 'small' sx= {{ marginRight: 2 }}  />
                    <Link color= 'inherit'>
                    <TextMaxLine line= {1}>
                    <Typography variant= 'body3' sx= {{fontSize: '11.5px', fontWeight: 500}}>
                       {`https://instagram.com/${user?.social?.instagram || ''}`}
                    </Typography>
                    </TextMaxLine>
                    </Link>
                  </Stack>
                </Stack>

                </Stack>
              </CardContent>
            </Card>
            
            </Stack>
            </Grid>


            {/* Job section */}
            <Grid item xs= {12} md= {8}>
              <Stack spacing= {2}>

                  <Stack spacing= {2}>
                    <Education id= {id} />
                    <Experience id= {id} />
                    <CoverLetter id= {id} />
                    <Certificate id= {id} />
                    <JobSkills id= {id} />
                    <Association id= {id} />
                  </Stack>
                  
              </Stack>
            </Grid>
          </Stack>
            

        </Stack>
    )
}