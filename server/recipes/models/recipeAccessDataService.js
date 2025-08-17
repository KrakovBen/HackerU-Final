const config = require('config')
const { Types } = require('mongoose')
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
    if(DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

    try {
        const recipes = await Recipe.find()
        if(!recipes.length) return ([])
        return Promise.resolve(recipes.map(recipe => appendFullImageUrl(recipe.toObject())))
    } catch (error) {
        error.status = 404
        return Promise.reject(error)
    }
}

const getRecipe = async (id) => {
    if(DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

    try {
        const recipe = await Recipe.aggregate( [ { $match: { _id: new Types.ObjectId(id) } }, { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'userData' } }, { $unwind: { path: '$userData', preserveNullAndEmptyArrays: true } }, { $addFields: { createdByName: { $concat: ['$userData.name.first', ' ', '$userData.name.last'] } } } ] )
        if(!recipe) throw new Error('לא נמצא מתכון')
        return Promise.resolve(recipe ? appendFullImageUrl(recipe[0]) : null)
    } catch (error) {
        error.status = 404
        return Promise.reject(error)
    }
}

const getAllRecipes = async () => {
    if (DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

    try {
        const recipes = await Recipe.aggregate([ { $sort: { createdAt: -1 } }, { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'userData' } }, { $unwind: '$userData' }, { $addFields: { createdByName: { $concat: ['$userData.name.first', ' ', '$userData.name.last'] } } } ])
        if(!recipes.length) return Promise.resolve({ recipes })                
        return Promise.resolve({ recipes: recipes.map(recipe => appendFullImageUrl(recipe)) })
    } catch (error) {
        error.status = 404
        return Promise.reject(error)
    }
}

const createRecipe = async (recipe) => {
    if(DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

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

const updateRecipe = async (id, recipe) => {
    if(DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

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

const likeRecipe = async (recipeID, userID) => {
    if (DB_TYPE !== 'mongoDB') return Promise.resolve('Not in mongoDB')

    try {
        const recipe = await Recipe.findById(recipeID).select('likes')
        if (!recipe) throw new Error('לא נמצא מתכון')

        const hasLiked = recipe.likes.some(id => id.toString() === userID.toString())
        const update = hasLiked
            ? { $pull: { likes: userID } }
            : { $addToSet: { likes: userID } }

        const updated = await Recipe.findByIdAndUpdate(recipeID, update, { new: true })
        return updated
    } catch (error) {
        error.status = 400
        throw error
    }
}

const getRecipesByUser = async (userID) => {
    if(DB_TYPE !== "mongoDB") return Promise.resolve('Not in mongoDB')

    try {
        const recipes = await Recipe.aggregate([{ $match: { createdBy: new Types.ObjectId(userID) } }, { $sort: { createdAt: -1 } }, { $lookup: { from: 'users', localField: 'createdBy', foreignField: '_id', as: 'userData' } }, { $unwind: '$userData' }, { $addFields: { createdByName: { $concat: ['$userData.name.first', ' ', '$userData.name.last'] } } } ])
        
        if(!recipes.length) return Promise.resolve({ recipes })

        return Promise.resolve({ recipes: recipes.map(recipe => appendFullImageUrl(recipe)) })
    } catch (error) {
        error.status = 404
        return Promise.reject(error)
    }
}

module.exports = { getRecipes, createRecipe, getRecipe, getAllRecipes, updateRecipe, likeRecipe, getRecipesByUser }
