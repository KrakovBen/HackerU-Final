import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL

export const getAllRecipes = async () => {
    try {
        const { data } = await axios.get(`${apiUrl}/recipes/all-recipes`)
        return data.recipes
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const getRecipe = async (recipeID) => {
    try {
        const { data } = await axios.get(`${apiUrl}/recipes/${recipeID}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const getRecipesByUser = async (userID) => {
    try {
        const { data } = await axios.get(`${apiUrl}/recipes/user/${userID}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}