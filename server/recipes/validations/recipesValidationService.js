const config = require('config')
const { validateRecipeWithJoi } = require('./Joi/recipeValidation')
const VALIDATOR = config.get('VALIDATOR')

const validateRecipe = (recipe) => {
    if (VALIDATOR === "Joi") return validateRecipeWithJoi(recipe)
}

module.exports = { validateRecipe }
