import {getAuth } from 'firebase/auth'
import {initializeApp} from 'firebase/app'


const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "hace-360.firebaseapp.com",
  projectId: "hace-360",
  storageBucket: "hace-360.appspot.com",
  messagingSenderId: "10681245570",
  appId: process.env.appId,
  measurementId: process.env.measurementId
};

  const firebaseApp = initializeApp(firebaseConfig)
  export const auth = getAuth(firebaseApp)

