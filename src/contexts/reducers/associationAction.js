import axios from "axios"
import { mutate } from "swr"


async function create ({setAlert, form, close}) {
    try {
        const res = await axios.post('/association', form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/association')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteAss ({setAlert, id}) {
    try {
        const res = await axios.delete(`/association/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/association')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, close, id}) {
    try {
        const res = await axios.put(`/association/${id}`, form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/association')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const associationAction = {
    create,
    update,
    deleteAss
}