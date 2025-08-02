import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const login = async (user) => {
    try {
        const { data } = await axios.post(`${apiUrl}/users/login`, user, { withCredentials: true })
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const signup = async (normalizedUser) => {
    try {
        const { data } = await axios.post(`${apiUrl}/users`, normalizedUser)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/users`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}