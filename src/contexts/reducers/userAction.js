import axios from "axios"
import { mutate } from "swr"
import {GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from 'firebase/auth'
import {convertToFormData} from '../../hooks'
import {auth} from '../../hooks/firebase'


async function logOut () {
    mutate(`/profile`, null, false)
    await axios.delete('/account/logout')
    mutate('/profile')
}

// Login
async function doLogin ({data, setAlert}) {
    try {
        // gets authToken
        const loggedIn = await axios.post('/account/login', data)
        if(loggedIn && !loggedIn.data.success) throw new Error(loggedIn.data.message)
        // 
        setAlert({message: `login successful`})
        mutate('/profile')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

// signup
async function doSignup ({data, setAlert}) {
    try {
        // gets authToken
        const firstName = data.name.split(' ')[0] || ''
        const lastName = data.name.split(' ').length > 1 ? data.name.split(' ').pop() : ''
        const token = await axios.post('/account/signup', {...data, lastName, firstName})
        if(token && !token.data.success) throw new Error(token.data.message)
        // 
        setAlert({message: 'account successfuly created.'})
        // 
        const user = await axios.post('/account/login', {email: data.email, password: data.password})
        if(user && !user.data.success) throw new Error(user.data.message)
        //
        setAlert({message: `login successful`})
        return mutate('/profile')
        
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'}) 
    }
}

// signin with Facebook
const facebookSignin = async ({setAlert}) => {

        const provider = new FacebookAuthProvider();
        provider.addScope('user_birthday');

    try {
        const result = await signInWithPopup(auth, provider)
        const token  = await result.user.getIdToken()

        const action = await axios.post('/account/google', {token})
        if(action && !action.data.success) throw new Error(action.data.message)

        setAlert({message: 'login successful'})
        mutate('/profile')
        return ({
            success: true,
            message: 'signin successful',
            // data: user
        })
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}
export const googleSignin = async ({setAlert}) => {
      

    const provider = new GoogleAuthProvider();
    // provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

    try {
        const result = await signInWithPopup(auth, provider)
        const token  = await result.user.getIdToken()
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken

        const action = await axios.post('/account/google', {token})
        if(action && !action.data.success) throw new Error(action.data.message)

        setAlert({message: 'login successful'})
        mutate('/profile')

        // // The signed-in user info.
        // const user = result.user;

        // setAlert({message: `logged in as ${user.firstName}`})
        return ({
            success: true,
            message: 'signin successful',
            // data: user
        })
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
  }

// update user
const updateUser = async ({form, setAlert}) => {
    try{
        const firstName = form.name.split(' ')[0] || ''
        const lastName = form.name.split(' ').length > 1 ? form.name.split(' ').pop() : ''
        const data = convertToFormData({...form, firstName, lastName})  //convert form to Form data
        const res = await axios.put(`/profile/update`, data)
        if(!res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message})
        return mutate(`/profile`)
    }
    catch(err){
        return setAlert({message: err.message, type: 'error'})
    }
}

// update password
const updatePassword = async ({form, setAlert, setForm}) => {
    try{
        const data = convertToFormData(form)  //convert form to Form data
        const res = await axios.put(`/profile/update/password`, data)
        if(!res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message})
        setForm({})
        return mutate(`/profile`)
    }
    catch(err){
        return setAlert({message: err.message, type: 'error'})
    }
}

// update Social
const updateSocial = async ({form, setAlert}) => {
    try{
        const data = convertToFormData(form)  //convert form to Form data
        const res = await axios.put(`/profile/update/social`, data)
        if(!res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message})
        return mutate(`/profile`)
    }
    catch(err){
        return setAlert({message: err.message, type: 'error'})
    }
}

// update Skills
const updateOptions = async ({form, setAlert}) => {
    try{
        // const data = convertToFormData(form)  //convert form to Form data
        const res = await axios.put(`/profile/update/options`, form)
        if(!res.data.success) throw new Error(res.data.message)
        setAlert && setAlert({message: res.data.message})
        return mutate(`/profile`)
    }
    catch(err){
        return setAlert ? setAlert({message: err.message, type: 'error'}) : ''
    }
}

// update Skills
const updateCover = async ({form, setAlert, close}) => {
    try{
        // const data = convertToFormData(form)  //convert form to Form data
        const res = await axios.post(`/cover`, form)
        if(!res.data.success) throw new Error(res.data.message)
        setAlert && setAlert({message: res.data.message})
        mutate(`/profile`)
        return close()
    }
    catch(err){
        return setAlert ? setAlert({message: err.message, type: 'error'}) : ''
    }
}



export const userAction = {
    googleSignin, logOut, 
    doLogin, doSignup, 
    updateUser,updatePassword, 
    updateSocial, facebookSignin,
    updateOptions,
    updateCover
}
