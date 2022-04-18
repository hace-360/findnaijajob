import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Stack, FilledInput, FormHelperText } from '@mui/material';
import {useRef} from 'react'

// ----------------------------------------------------------------------

const FormSchema = Yup.object().shape({
  code: Yup.array().of(Yup.string().required()),
});

export default function VerifyCodeForm() {

  

  return (
      <Stack spacing={3} sx={{ mt: 5, mb: 3 }}>
        <Stack direction="row" spacing={2} justifyContent="center">
          {[...Array(6)].map((_, index) => (
            <Controller
              key={`code-${index}`}
              name={`code.${index}`}
              control={control}
              render={({ field, fieldState: { error } }) => (
                <FilledInput
                  {...field}
                  fullWidth
                  placeholder="-"
                  error={Boolean(error)}
                  sx={{
                    maxWidth: { xs: 48, sm: 56 },
                    '& .MuiFilledInput-input': {
                      px: 0,
                      py: { xs: '14px', sm: '18px' },
                      textAlign: 'center',
                    },
                  }}
                />
              )}
            />
          ))}
        </Stack>

        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
        >
          Verify
        </LoadingButton>
      </Stack>
  );
}
