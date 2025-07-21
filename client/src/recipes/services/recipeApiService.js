import axios from "axios"

const apiUrl = "http://localhost:8181"

export const getRecipes = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/cards`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}