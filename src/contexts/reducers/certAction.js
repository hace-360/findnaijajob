import axios from "axios"
import { mutate } from "swr"


async function create ({setAlert, form, close}) {
    try {
        const res = await axios.post('/certificate', form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/certificate')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteCert ({setAlert, id}) {
    try {
        const res = await axios.delete(`/certificate/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/certificate')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, close, id}) {
    try {
        const res = await axios.put(`/certificate/${id}`, form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/certificate')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const certAction = {
    create,
    update,
    deleteCert
}