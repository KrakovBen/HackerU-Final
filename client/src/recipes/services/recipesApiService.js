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

export const updateRecipe = async (recipeID, recipeData) => {
    try {
        const { data } = await axios.put(`${apiUrl}/recipes/${recipeID}`, recipeData)
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

export const changeRecipeLike = async (recipeID) => {
    try {
        const { data } = await axios.patch(`${apiUrl}/recipes/like/${recipeID}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const updateRecipeImage = async (recipeID, imageFile) => {
    try {
        const formData = new FormData()
        formData.append('image', imageFile)
        const { data } = await axios.post(`${apiUrl}/recipes/${recipeID}/image`, formData)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const createRecipe = async (recipeData) => {
    try {
        const { data } = await axios.post(`${apiUrl}/recipes`, recipeData)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}

export const deleteRecipe = async (recipeID) => {
    try {
        const { data } = await axios.delete(`${apiUrl}/recipes/${recipeID}`)
        return data
    } catch (error) {
        return Promise.reject(error.message)
    }
}
