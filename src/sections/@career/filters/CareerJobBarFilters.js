import { useState } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
import filterIcon from '@iconify/icons-carbon/filter';
// @mui
import { Stack, Button, Drawer, Box } from '@mui/material';
// config
import { DRAWER_WIDTH } from '../../../config';
// components
import { Iconify } from '../../../components';
//
import CareerJobTypeFilter from './CareerJobTypeFilter';
import CareerJobLevelFilter from './CareerJobLevelFilter';
import CareerJobSalaryFilter from './CareerJobSalaryFilter';
import CareerJobKeywordFilter from './CareerJobKeywordFilter';
import CareerJobBenefitsFilter from './CareerJobBenefitsFilter';
import CareerJobLocationsFilter from './CareerJobLocationsFilter';
import CareerJobCategoriesFilter from './CareerJobCategoriesFilter';
import {useRouter} from 'next/router'

// ----------------------------------------------------------------------

const defaultValues = {
  title: null,
  category: null,
  location: null,
  type: [],
  // filterLevel: [],
  benefit: [],
  // filterSalary: [0, 20000],
};

export default function CareerJobBarFilters() {

  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false);

  const [filters, setFilters] = useState(defaultValues);

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  const handleChangeKeyword = (keyword) => {
    setFilters({
      ...filters,
      title: keyword,
    });
  };

  const handleChangeCategory = (keyword) => {
    setFilters({
      ...filters,
      category: keyword,
    });
  };

  const handleChangeLocation = (keyword) => {
    setFilters({
      ...filters,
      location: keyword?.label,
    });
  };

  const handleChangeJobType = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      type: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // const handleChangeJobLevel = (event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setFilters({
  //     ...filters,
  //     filterLevel: typeof value === 'string' ? value.split(',') : value,
  //   });
  // };

  const handleChangeJobBenefits = (event) => {
    const {
      target: { value },
    } = event;
    setFilters({
      ...filters,
      benefit: typeof value === 'string' ? value.split(',') : value,
    });
  };

  // const handleChangeSalary = (event, newValue) => {
  //   setFilters({
  //     ...filters,
  //     filterSalary: newValue,
  //   });
  // };

  const onReset = () => {
    setFilters(defaultValues);
  };

  const onSubmit = async () => {
    let query = []
    for (let [k, v] of Object.entries(filters)) {
      if (k && v) {
        query.push(`${k}=${v}`)
      }
    }
    query = query.join('&').toLowerCase()
    router.push(`/jobs?${query}`)
  };

  const renderFilters = (
    <>
      <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }} alignItems="center">
        <CareerJobKeywordFilter
          filterKeyword={filters.title}
          onChangeKeyword={handleChangeKeyword}
        />
        <CareerJobCategoriesFilter
          filterCategories={filters.category}
          onChangeCategory={handleChangeCategory}
        />
        <CareerJobLocationsFilter
          filterLocation={filters.location}
          onChangeLocation={handleChangeLocation}
        />
        <Button
          size="large"
          variant="contained"
          onClick={onSubmit}
          sx={{
            px: 0,
            minWidth: { md: 48 },
            display: { xs: 'none', md: 'inline-flex' },
          }}
        >
          <Iconify icon={searchIcon} sx={{ width: 24, height: 24 }} />
        </Button>
      </Stack>

      <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2.5, md: 1 }} sx={{ mt: 2.5 }}>
        <CareerJobTypeFilter
          filterType={filters.type}
          onChangeJobType={handleChangeJobType}
        />
        {/* <CareerJobLevelFilter
          filterLevel={filters.filterLevel}
          onChangeJobType={handleChangeJobLevel}
        /> */}
        {/* <CareerJobSalaryFilter
          filterSalary={filters.filterSalary}
          onChangeSalary={handleChangeSalary}
        /> */}
        <CareerJobBenefitsFilter
          filterBenefits={filters.benefit}
          onChangeJobBenefits={handleChangeJobBenefits}
        />
      </Stack>

      <Button
        size="large"
        variant="contained"
        startIcon={<Iconify icon={searchIcon} sx={{ width: 20, height: 20 }} />}
        sx={{
          mt: 2.5,
          display: { md: 'none' },
        }}
      >
        Search
      </Button>
    </>
  );

  return (
    <>
      {/* -- Desktop -- */}
      <Box
        sx={{
          pt: 5,
          pb: 8,
          display: {
            xs: 'none',
            md: 'block',
          },
        }}
      >
        {renderFilters}
      </Box>

      {/* -- Mobile -- */}
      <Stack
        alignItems="flex-end"
        sx={{
          py: 2.5,
          display: { md: 'none' },
        }}
      >
        <Button
          color="inherit"
          variant="contained"
          startIcon={<Iconify icon={filterIcon} sx={{ width: 18, height: 18 }} />}
          onClick={handleMobileOpen}
        >
          Filters
        </Button>
      </Stack>
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            pt: 5,
            px: 3,
            width: DRAWER_WIDTH,
          },
        }}
      >
        {renderFilters}
      </Drawer>
    </>
  );
}
