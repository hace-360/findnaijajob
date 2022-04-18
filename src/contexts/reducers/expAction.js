import axios from "axios"
import { mutate } from "swr"


async function create ({setAlert, form, close}) {
    try {
        const res = await axios.post('/experience', form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/experience')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteExp ({setAlert, id}) {
    try {
        const res = await axios.delete(`/experience/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/experience')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, close, id}) {
    try {
        const res = await axios.put(`/experience/${id}`, form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/experience')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const expAction = {
    create,
    update,
    deleteExp
}