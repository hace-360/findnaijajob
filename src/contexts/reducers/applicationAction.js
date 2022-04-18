import axios from "axios"
import {convertToFormData} from '../../hooks'
import { mutate } from "swr"


async function create ({setAlert, form, close,jobId}) {
    try {
        const data = await convertToFormData(form)
        const res = await axios.post('/application', data)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        await setAlert({message: res.data.message })
        mutate('/application')
        mutate(`/application/${jobId}`)
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteApp ({setAlert, id}) {
    try {
        const res = await axios.delete(`/application/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/application')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, close, id}) {
    try {
        const res = await axios.put(`/application/${id}`, form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/application')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const applicationAction = {
    create,
    update,
    deleteApp
}