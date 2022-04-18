import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import {
  Stack,
  TextField
} from '@mui/material'
import axios from 'axios'
import {useSettings} from '../../../hooks'


const FormSchema = Yup.object().shape({
  email: Yup.string().required('Email is required').email('That is not an email'),
  subject: Yup.string().required('Subject of your message is required'),
  message: Yup.string().required('message is required'),
});

// ----------------------------------------------------------------------

export default function MarketingContactForm() {
  const {
    reset,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: 'onTouched',
    resolver: yupResolver(FormSchema),
    defaultValues: {
      subject: '',
      email: '',
      phone: '',
      company: '',
      website: '',
      message: '',
    },
  });
  const {setAlert} = useSettings()

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/contact-us', data)
      if (!res.data.success) throw new Error(res.data.message)
      console.log(res.data.data)
      setAlert({message: res.data.message})
      return reset()
    }
    catch(err) {
      return setAlert({message: err.message, type: 'error'})
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2.5} alignItems="flex-start">

          <Controller
            name="subject"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Subject"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

        <Controller
          name="email"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Email"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              label="Phone number"
              error={Boolean(error)}
              helperText={error?.message}
            />
          )}
        />

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={{ xs: 2.5, md: 2 }}
          sx={{ width: 1 }}
        >
          <Controller
            name="company"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Company"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />

          <Controller
            name="website"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label="Website"
                error={Boolean(error)}
                helperText={error?.message}
              />
            )}
          />
        </Stack>

        <Controller
          name="message"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <TextField
              {...field}
              fullWidth
              multiline
              rows={4}
              label="Message"
              error={Boolean(error)}
              helperText={error?.message}
              sx={{ pb: 2.5 }}
            />
          )}
        />

        <LoadingButton size="large" type="submit" variant="contained">
          {isSubmitting ? 'sending message...' : 'Send Message'}
        </LoadingButton>
      </Stack>
    </form>
  );
}
