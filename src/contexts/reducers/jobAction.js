import axios from "axios"
import { mutate } from "swr"
import {convertToFormData} from '../../hooks'


async function create ({setAlert, form, close}) {
    try {
        const data = await convertToFormData(form)
        let res = await axios.post('/jobs', data)
        res = res.data
        if (!res.success) throw new Error(res.message)
        setAlert({message: res.message })
        mutate('/jobs')
        return close()  || ''
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteJob ({setAlert, id}) {
    try {
        const res = await axios.delete(`/jobs/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/jobs')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, id}) {
    try {
        const data = await convertToFormData(form)
        const res = await axios.put(`/jobs/${id}`, data)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/jobs')
        return
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const jobAction = {
    create,
    update,
    deleteJob
}