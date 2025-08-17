const validateRecipeWithJoi = require('./Joi/validateRecipeWithJoi')
const config = require('config')
const VALIDATOR = config.get('VALIDATOR')

const validateRecipe = (recipe) => {
    if(VALIDATOR === 'Joi') return validateRecipeWithJoi(recipe)
    throw new Error('Invalid validator')
}

module.exports = validateRecipe
