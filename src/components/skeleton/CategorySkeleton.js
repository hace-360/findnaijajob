// @mui
import { Skeleton, Stack, Card, Divider, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function CategorySkeleton({ ...other }) {
  return (
    <Card {...other}>
      <Stack spacing={2} sx={{ p: 5 }} alignItems= 'center'>

        <Skeleton variant="circular" width={60} height={60} />
      
        <Skeleton
            variant="rectangular"
            sx={{ width: '100%', height: 20, borderRadius: 0.5 }}
          />
        </Stack>
    </Card>
  );
}
