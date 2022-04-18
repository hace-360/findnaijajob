import axios from "axios"
import { mutate } from "swr"


async function create ({setAlert, form, close}) {
    try {
        const res = await axios.post('/education', form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/education')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function deleteEdu ({setAlert, id}) {
    try {
        const res = await axios.delete(`/education/${id}`)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        return mutate('/education')
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

async function update ({setAlert, form, close, id}) {
    try {
        const res = await axios.put(`/education/${id}`, form)
        if (res.data && !res.data.success) throw new Error(res.data.message)
        setAlert({message: res.data.message })
        mutate('/education')
        return close()
    }
    catch(err) {
        return setAlert({message: err.message, type: 'error'})
    }
}

export const educationAction = {
    create,
    update,
    deleteEdu
}