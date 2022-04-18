import PropTypes from 'prop-types';
import { createContext } from 'react';
// hooks
import { useLocalStorage } from '../hooks';
// utils
import getColorPresets, { colorPresets } from '../utils/getColorPresets';
// config
import { defaultSettings } from '../config';
import { useState } from 'react';
import useSWR from 'swr';
import {userAction} from './reducers/userAction'
import {educationAction} from './reducers/educationAction'
import {associationAction} from './reducers/associationAction'
import {certAction} from './reducers/certAction'
import {expAction} from './reducers/expAction'
import {jobAction} from './reducers/jobAction'
import {applicationAction} from './reducers/applicationAction'

// ----------------------------------------------------------------------

const initialState = {
  ...defaultSettings,
  onToggleMode: () => {},
  onToggleDirection: () => {},
  onChangeColorPresets: () => {},
  onResetSetting: () => {},
  setColor: colorPresets[0],
  colorOption: [],
};

const SettingsContext = createContext(initialState);

SettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

function SettingsProvider({ children }) {
  const [settings, setSettings] = useLocalStorage('settings', {
    ...defaultSettings,
  });

  const onToggleMode = () => {
    setSettings({
      ...settings,
      themeMode: settings.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  const onToggleDirection = () => {
    setSettings({
      ...settings,
      themeDirection: settings.themeDirection === 'ltr' ? 'rtl' : 'ltr',
    });
  };

  const onChangeColorPresets = (event) => {
    setSettings({
      ...settings,
      themeColorPresets: event.target.value,
    });
  };

  const onResetSetting = () => {
    setSettings({
      ...defaultSettings,
    });
  };

  // --Alert- ----
  const [alert, setAlert] = useState({message: '', type: ''})

  // ---user ----
  const {data: user} = useSWR(`/profile` , {revalidateOnFocus: true, initialData: null})
  const {data: education} = useSWR(`/education` , {revalidateOnFocus: true, initialData: []})
  const {data: association} = useSWR(`/association` , {revalidateOnFocus: true, initialData: []})
  const {data: certificate} = useSWR(`/certificate` , {revalidateOnFocus: true, initialData: []})
  const {data: experience} = useSWR(`/experience` , {revalidateOnFocus: true, initialData: []})
  const {data: jobs} = useSWR(() => user ? `/jobs/all/${user._id}` : '' , {revalidateOnFocus: true, initialData: []})
  const {data: application} = useSWR(`/application` , {revalidateOnFocus: true, initialData: []})
  const {data: subscription} = useSWR(`/subscription` , {revalidateOnFocus: true, initialData: null})



  
  return (
    <SettingsContext.Provider
      value={{
        ...settings,
        alert,
        setAlert,
        user,
        education,
        certificate,
        experience,
        expAction,
        educationAction,
        association,
        associationAction,
        certAction,
        userAction,
        jobAction,
        applicationAction,
        subscription,
        application,
        jobs,
        // Mode
        onToggleMode,

        // Direction
        onToggleDirection,

        // Color Presets
        onChangeColorPresets,
        setColor: getColorPresets(settings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          primary: color.primary.main,
          secondary: color.secondary.main,
        })),

        // Reset Setting
        onResetSetting,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
