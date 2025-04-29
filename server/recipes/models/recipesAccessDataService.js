const config = require('config')
const DATA_BASE = config.get("DATA_BASE")
const RecipeSchema = require('./mongoDB/Recipe')

const getRecipes = async (req) => {
    if(DATA_BASE !== 'mongoDB') throw new Error('Invalid data base')
    try {
        const page = parseInt(req.query.page) || 1
        const limit = 10
        const skip = (page - 1) * limit
        const totalRecipes = await RecipeSchema.countDocuments()
        const totalPages = Math.ceil(totalRecipes / limit)
        const filter = {}

        if (req.query.tag) filter.tags = req.query.tag
        if (req.query.createdBy) filter.createdBy = req.query.createdBy
        console.log(filter)

        const recipes = await RecipeSchema.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .select('title description image tags createdBy likes')
            .populate('createdBy', 'name')

        return {recipes, currentPage: page, totalPages, totalRecipes}
    } catch (error) {
        throw new Error(error.message)
    }
}

const createRecipe = async (recipe) => {
    if(DATA_BASE !== 'mongoDB') throw new Error('Invalid data base')
    try {
        const newRecipe = new RecipeSchema(recipe)
        return newRecipe.save()
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { getRecipes, createRecipe }