const config = require('config')
const mongoose = require('mongoose')
const DATA_BASE = config.get("DATA_BASE")

const getRecipes = async () => {
    if(DATA_BASE !== 'mongoDB') throw new Error('Invalid data base')
    try {
        const recipes = await mongoose.model('recipes')
        return recipes
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { getRecipes }