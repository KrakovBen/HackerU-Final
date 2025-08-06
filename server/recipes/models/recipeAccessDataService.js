const config = require('config')
const DB_TYPE = config.get("DB_TYPE")
const Recipe = require('./mongoDB/Recipe')
const { pick } = require('lodash')

const getRecipes = async () => {
    if(DB_TYPE === "mongoDB") {
        try {
            const recipes = await Recipe.find()
            if(!recipes.length) return ([])
            return Promise.resolve(recipes)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const getRecipe = async (id) => {
    if(DB_TYPE === "mongoDB") {
        try {
            const recipe = await Recipe.findById(id)            
            if(!recipe) throw new Error('לא נמצא מתכון')
            return Promise.resolve(recipe)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const getAllRecipes = async () => {
    if (DB_TYPE === "mongoDB") {
        try {
            const recipes = await Recipe.find().sort({ createdAt: -1 })
            if(!recipes.length) return Promise.resolve({ recipes })

            return Promise.resolve({ recipes })
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const createRecipe = async (recipe) => {
    if(DB_TYPE === "mongoDB") {
        try {
            const newRecipe = new Recipe(recipe)
            newRecipe = await newRecipe.save()
            newRecipe = pick(newRecipe, ['title', 'description', 'ingredients', 'category', 'prepTimeMinutes', 'cookTimeMinutes', 'imageUrl', 'tags', 'createdBy', '_id'])

            return Promise.resolve(newRecipe)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

module.exports = { getRecipes, createRecipe, getRecipe, getAllRecipes }
