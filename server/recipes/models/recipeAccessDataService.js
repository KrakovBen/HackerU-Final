const config = require('config')
const DB_TYPE = config.get("DB_TYPE")
const Recipe = require('./mongoDB/Recipe')
const { pick } = require('lodash')
const PORT = config.get("PORT")
const absoluteUrl = `http://localhost:${PORT}`

const appendFullImageUrl = (recipe) => {
    if (!recipe?.imageUrl) return recipe
    if (/^https?:\/\//i.test(recipe.imageUrl)) return recipe
    return { ...recipe, imageUrlFull: `${absoluteUrl}${recipe.imageUrl}` }
}

const getRecipes = async () => {
    if(DB_TYPE === "mongoDB") {
        try {
            const recipes = await Recipe.find()
            if(!recipes.length) return ([])
            return Promise.resolve(recipes.map(recipe => appendFullImageUrl(recipe.toObject())))
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
            return Promise.resolve(recipe ? appendFullImageUrl(recipe.toObject()) : null)
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

            return Promise.resolve({ recipes: recipes.map(recipe => appendFullImageUrl(recipe.toObject())) })
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
            let newRecipe = new Recipe(recipe)
            newRecipe = await newRecipe.save()
            newRecipe = pick(newRecipe, ['title', 'description', 'ingredients', 'category', 'prepTimeMinutes', 'cookTimeMinutes', 'imageUrl', 'tags', 'createdBy', '_id'])

            return Promise.resolve(appendFullImageUrl(newRecipe))
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const updateRecipe = async (id, recipe) => {
    if(DB_TYPE === "mongoDB") {
        try {
            const allowed = [
                'title','description','ingredients','instructions',
                'category','prepTimeMinutes','cookTimeMinutes',
                'imageUrl','tags',
            ]
            const toSet = Object.fromEntries( Object.entries(recipe || {}).filter(([key]) => allowed.includes(key)) )

            const updated = await Recipe.findByIdAndUpdate(id, { $set: toSet }, { new: true, runValidators: true }).lean()
            if (!updated) throw new Error('לא נמצא מתכון')
            
            return Promise.resolve(appendFullImageUrl(updated))
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const likeRecipe = async (recipeID, userID) => {
    if(DB_TYPE === "mongoDB") {
        try {
            let recipe = await Recipe.findById(recipeID)

            if (!recipe) throw new Error('לא נמצא מתכון')

            if(!recipe.likes.length) {
                recipe.likes.push(userID)
                recipe = await Recipe.findByIdAndUpdate(recipeID, { likes: recipe.likes }, { new: true })
                return Promise.resolve(recipe)
            }

            const index = recipe.likes.findIndex(id => id === userID)
            if (index === -1){
                recipe.likes.push(userID)
                recipe = await Recipe.findByIdAndUpdate(recipeID, { likes: recipe.likes }, { new: true })
                return Promise.resolve(recipe)
            }

            recipe.likes.pop(index)
            recipe = await Recipe.findByIdAndUpdate(recipeID, { likes: recipe.likes }, { new: true })
            return Promise.resolve(recipe)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }
}

module.exports = { getRecipes, createRecipe, getRecipe, getAllRecipes, updateRecipe, likeRecipe }
