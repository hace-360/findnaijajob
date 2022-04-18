import {useState,memo} from 'react';
import {Box, Autocomplete, TextField} from '@mui/material'
import { _countriesAndState, countries } from '../../../../../_data/mock'
import { jobCategories } from '../../../../../_data/mock/_job'



export const StatesFilter = memo(({setForm, form,label}) => {

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
      onChange= {(e, value) => {
        setForm({...form, [label]: { ...form[label], state: value.label }})}
      }
      renderOption={(props, option) => (
        <Box component="li" {...props} key= {option.code}>
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a State"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
})




export const JobCatFilter = memo(({setForm, form}) => {
 
  // const jobs = jobCategories.map(job => ({ name: job }))
  // const categories = jobs.map(option => {
  //   const firstLetter = option.name[0].toUpperCase();
  //   return {...option, firstLetter}
  // })
  let test;

  return (
    <Autocomplete
      id="grouped-category"
      options={jobCategories.sort((a, b) => -b[0].toUpperCase().localeCompare(a[0].toUpperCase()))}
      groupBy={(option) => option[0].toUpperCase()}
      isOptionEqualToValue= {(option, value) => option == value || option !== value}
      getOptionLabel={(option) => option}
      onChange= {(e, value) => setForm({...form, category: value})}
      sx= {{width: '100%'}}
      renderInput={(params) => 
        <TextField 
          fullWidth {...params}
          label="Job Category"
          inputProps={{
            ...params.inputProps,
          }}
        />}
    />
  );
})




export const CountryFilter = memo(({setForm, form,label}) => (


    <Autocomplete
      id="country-select-country"
      // options={countries}
      autoHighlight
      options={countries.sort((a, b) => -b.label[0].toUpperCase().localeCompare(a.label[0].toUpperCase()))}
      groupBy= {option => option.label[0].toUpperCase()}
      getOptionLabel={(option) => option.label}
      sx= {{width: '100%'}}
      isOptionEqualToValue= {(option, value) => option == value || option !== value}
      onChange= {(e, value) => {
        setForm({...form, [label]: { ...form[label], country: value.label }})}
      }
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    />
))