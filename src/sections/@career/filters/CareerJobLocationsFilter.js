import PropTypes from 'prop-types';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
// icons
import locationIcon from '@iconify/icons-carbon/location';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Autocomplete, InputAdornment, TextField } from '@mui/material';
import { createFilterOptions } from '@mui/material/Autocomplete';
// _data
import _mock from '../../../../_data/mock';
// components
import { Image, Iconify, SearchNotFound } from '../../../components';

// ----------------------------------------------------------------------
import {useState, memo} from 'react';
import { _countriesAndState, countries } from '../../../../_data/mock'
import { jobCategories } from '../../../../_data/mock/_job'



const StatesFilter = memo(({filterLocation, onChangeLocation, sx}) => {

  const allStates = _countriesAndState.map(val => val.states).reduce((a, b) => a.concat(b))
  let states = allStates.map((sts, index) => ({ code: JSON.stringify(index), label: sts.replace("'", "")}))
  states = states.map(option => {
    const firstLetter = option.label[0].toUpperCase();
    return {...option, firstLetter}
  })


  return (
    <Autocomplete
      id="State-select-State"

      autoHighlight
      options={states.sort((a, b) => -b.label[0].toUpperCase().localeCompare(a.label[0].toUpperCase()))}
      groupBy= {option => option.label[0].toUpperCase()}
      getOptionLabel={(option) => option.label}
      sx= {{width: '100%'}}
      isOptionEqualToValue= {(option, value) => option == value || option !== value}
      onChange= {(e, value) => onChangeLocation(value)}
      renderOption={(props, option) => (
        <Box component="li" {...props} key= {option.code}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          variant= 'filled'
          {...params}
          sx= {{...sx}}
          label="Location"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'search', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
})

export default StatesFilter

// const RootStyle = styled('div')(() => ({
//   width: '100%',
//   '& .MuiAutocomplete-root': {
//     '& .MuiInputAdornment-root': {
//       marginTop: '0 !important',
//     },
//     '& .MuiFilledInput-root': {
//       height: 56,
//       padding: '0 12px',
//     },
//   },
// }));

// // ----------------------------------------------------------------------

// CareerJobLocationsFilter.propTypes = {
//   filterLocation: PropTypes.object,
//   onChangeLocation: PropTypes.func,
// };

// export default function CareerJobLocationsFilter({ filterLocation, onChangeLocation }) {
//   return (
//     <RootStyle>
//       <Autocomplete
//         autoHighlight
//         options={_mock.countries}
//         getOptionLabel={(option) => option.label}
//         filterOptions={createFilterOptions({
//           stringify: (option) => option.label + option.code,
//         })}
//         value={filterLocation}
//         onChange={(event, value) => onChangeLocation(value)}
//         noOptionsText={<SearchNotFound keyword={filterLocation?.label} />}
//         renderInput={(params) => (
//           <TextField
//             {...params}
//             variant="filled"
//             placeholder="Locations"
//             InputProps={{
//               ...params.InputProps,
//               autoComplete: 'search',
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <Iconify
//                     icon={locationIcon}
//                     sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0, mr: 1 }}
//                   />
//                 </InputAdornment>
//               ),
//             }}
//           />
//         )}
//         renderOption={(props, option, { inputValue }) => {
//           const matches = match(option.label, inputValue);
//           const parts = parse(option.label, matches);
//           return (
//             <Box component="li" {...props}>
//               <Image
//                 alt="flag country"
//                 src={`https://flagcdn.com/${option.code.toLowerCase()}.svg`}
//                 sx={{
//                   mr: 1,
//                   width: 24,
//                   height: 24,
//                   flexShrink: 0,
//                   borderRadius: '50%',
//                 }}
//               />

//               {parts.map((part, index) => (
//                 <Box
//                   key={index}
//                   component="span"
//                   sx={{
//                     ...(part.highlight && {
//                       fontWeight: 'fontWeightBold',
//                     }),
//                   }}
//                 >
//                   {part.text}
//                 </Box>
//               ))}
//             </Box>
//           );
//         }}
//       />
//     </RootStyle>
//   );
// }
