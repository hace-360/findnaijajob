// scroll bar
import 'simplebar/src/simplebar.css';

// lightbox
import 'react-image-lightbox/style.css';

// slick-carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// lazy image
import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import PropTypes from 'prop-types';
// next
import Head from 'next/head';
// @mui
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
// contexts
import { SettingsProvider } from '../src/contexts/SettingsContext';
// theme
import ThemeProvider from '../src/theme';
import ProgressBar from '../src/components/ProgressBar';
import ThemeColorPresets from '../src/components/ThemeColorPresets';
import MotionLazyContainer from '../src/components/animate/MotionLazyContainer';
import axios from 'axios'
import {SWRConfig} from 'swr'
import Alert from '../src/components/Alert'
import ResumeContextProvider from '../src/contexts/ResumeContext'
import LetterContextProvider from '../src/contexts/LetterContext'
// ----------------------------------------------------------------------

MyApp.propTypes = {
  Component: PropTypes.func,
  pageProps: PropTypes.object,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  axios.defaults.baseURL = process.env.NODE_ENV == 'development' ? 'http://localhost:5050/api' : 'https://api.findnaijajob.com/api'
  axios.defaults.withCredentials = true
  axios.defaults.headers['Content-Type'] = 'application/json'


  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width ,maximum-scale=1.0, user-scalable=0" />
        <meta 
            property="og:image" 
            content="https://firebasestorage.googleapis.com/v0/b/hace-360.appspot.com/o/findnaijajob%20logo.png?alt=media&token=6a7d6144-b563-4691-8818-5e2611ffaedc"
          />
      </Head>

      <SWRConfig
        value={{
          revalidateOnFocus: true,
          refreshInterval: 0,
          fetcher: (...args) => axios(...args)
          .then(res => res?.data.data)
          .catch(err => Promise.reject(err))
        }}
      >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SettingsProvider>
          <LetterContextProvider>
          <ResumeContextProvider>
          <ThemeProvider>
            <ThemeColorPresets>
              <MotionLazyContainer>
                  <ProgressBar />
                  <Alert />
                    {getLayout(<Component {...pageProps} />)}
              </MotionLazyContainer>
            </ThemeColorPresets>
          </ThemeProvider>
          </ResumeContextProvider>
          </LetterContextProvider>
        </SettingsProvider>
      </LocalizationProvider>
      </SWRConfig>
    </>
  );
}
