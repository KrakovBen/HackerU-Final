const Joi = require('joi')

const stringPattern = /^[\u0590-\u05FFA-Za-z0-9\s"',().\-–—:/+*%\u00BC-\u00BE\u2150-\u215E]+$/u

const validateRecipeWithJoi = (recipe) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
        description: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
        instructions: Joi.array().items(Joi.string().min(2).max(256).trim().pattern(stringPattern).required()).min(1).required(),
        ingredients: Joi.array().items(Joi.string().min(2).max(256).trim().pattern(stringPattern).required()).min(1).required(),
        category: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
        prepTimeMinutes: Joi.number().min(1).max(256).required(),
        cookTimeMinutes: Joi.number().min(1).max(256).required(),
        imageUrl: Joi.string().max(1024).pattern(/\.(jpg|jpeg|png|gif)$/i).required(),
        imageUrlFull: Joi.any().optional().strip(),
        __imageFile: Joi.any().optional().strip()
    })
    return schema.validate(recipe)
}

module.exports = validateRecipeWithJoi
