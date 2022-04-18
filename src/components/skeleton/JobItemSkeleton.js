// @mui
import { Skeleton, Stack, Card, Divider, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function JobItemSkeleton({ ...other }) {
  return (
    <Card {...other} sx= {{width: '100%'}}>
      <Stack spacing={2} sx={{ p: 3, width:'100%' }}>
        <Skeleton variant="rounded" sx= {{ borderRadius: 1 }} width={52} height={52} />

        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="text"
            sx={{
              height: 20 - index * 2,
              width: (7 - index) * 50,
            }}
          />
        ))}
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box
        sx={{
          p: 3,
          display: 'grid',
          gap: 3,
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {[...Array(4)].map((_, index) => (
          <Skeleton
            key={index}
            variant="rectangular"
            sx={{ width: 1, height: 20, borderRadius: 0.5 }}
          />
        ))}
      </Box>
    </Card>
  );
}
