import PropTypes from 'prop-types';
import { useState, forwardRef } from 'react';
// icons
import locationIcon from '@iconify/icons-carbon/location';
import timeIcon from '@iconify/icons-carbon/time';
import increaseLevel from '@iconify/icons-carbon/increase-level';
import moneyIcon from '@iconify/icons-carbon/money';
import userIcon from '@iconify/icons-carbon/user';
// next
import NextLink from 'next/link';
// @mui
import { Divider, Stack, Card, Typography, Box, Slide, DialogActions, Dialog, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
import { fDate } from '../../../utils/formatTime';
import { fCurrency } from '../../../utils/formatNumber';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Image,
  Label,
  Iconify,
  TextMaxLine,
  TextIconLabel,
  IconButtonAnimate,
} from '../../../components';
import {format} from 'currency-formatter'

// ----------------------------------------------------------------------

CareerJobItem.propTypes = {
  job: PropTypes.shape({
    companyLogo: PropTypes.string,
    companyName: PropTypes.string,
    createdAt: PropTypes.string,
    experience: PropTypes.number,
    favorited: PropTypes.bool,
    id: PropTypes.string,
    isUrgent: PropTypes.bool,
    level: PropTypes.string,
    location: PropTypes.string,
    salary: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    slug: PropTypes.string,
    type: PropTypes.string,
  }),
};

export default function CareerJobItem({ job, deleteJob }) {
  const {
    _id,
    slug,
    type,
    level,
    salary,
    location,
    title,
    category,
    mode,
    isUrgent,
    createdAt,
    address,
    experience,
    company
  } = job;

  console.log(isUrgent)


  return (
    <Card
      variant= 'outlined'
      sx={{
        boxShadow: (theme) => theme.customShadows.z8,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        }
      }}
    >
        {/* <Box spacing= {2} sx={{ position: 'absolute', right: 16, top: 16 }}>

        <IconButtonAnimate>
        <VisibilityIcon />
        </IconButtonAnimate>

        <IconButtonAnimate onClick= {deleteJob}>
           <DeleteSweepIcon sx= {{color: '#DA2427'}} /> 
        </IconButtonAnimate>

        </Box> */}

      <Stack sx={{ p: 3, pb: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2.5}>
          <Image
            alt={company?.name}
            src={company?.logo}
            sx={{ width: 55, height: 55, borderRadius: 1 }}
          />
          {isUrgent && <Label color="error">Urgent</Label>}
        </Stack>

        <Stack spacing={0.5} sx={{ mt: 2, mb: 2 }}>
          <NextLink href={`/jobs/${_id}`} passHref>
            <TextMaxLine variant="button" asLink line={1}>
              {`${title}/${category}`}
            </TextMaxLine>
          </NextLink>

          <Typography variant="body3" sx={{ color: 'secondary.main', textTransform: 'capitalize' }}>
            {company?.name}
          </Typography>

          <TextIconLabel
            icon={<Iconify icon={locationIcon} sx={{ mr: 0.5, width: 18, height: 18 }} />}
            value={`${address?.state || company?.state || ''}, ${address?.country || company?.country || ''}`}
            sx={{ typography: 'body3', color: 'text.secondary' }}
          />
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          Posted day: {fDate(createdAt)}
        </Typography>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed', y: 2 }} />

      <Stack
        spacing= {2}
        direction= 'row'
        divider= {<Divider flexItem orientation= 'vertical' />}
        sx= {{p: 2}}
      >
          <TextIconLabel
            icon={<Iconify icon={increaseLevel} sx={{ width: 20, height: 20, mr: 1 }} />}
            value= {
              <TextMaxLine line= {1}>
              {experience[0] > 0 ? `${experience[0]} to ${experience[1]} years exp` :
              `${experience[1]} years exp`}
              </TextMaxLine>
            }
          />

          <TextIconLabel
            icon={<Iconify icon={timeIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={<TextMaxLine line= {1}>{`${mode} - ${type}`}</TextMaxLine>}
          />

          <TextIconLabel
            icon={<Iconify icon={moneyIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value=  {
              <TextMaxLine line= {1}>
                {
                  salary[0] + salary[1] == 0 ? 
                    'N/A' :
                    salary[0] > 0 ? `${format(salary[0], {code: 'NGN'})} to ${format(salary[1], {code: 'NGN'})}` :
                `${format(salary[1], {code: 'NGN'})}`
                }
              </TextMaxLine>
            }
          />

          <TextIconLabel
            icon={<Iconify icon={userIcon} sx={{ width: 20, height: 20, mr: 1 }} />}
            value={level}
          />
      </Stack>
    </Card>
  );
}



