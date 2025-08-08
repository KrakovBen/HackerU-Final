import Joi from 'joi'

const stringPattern = /^[\u0590-\u05FFa-zA-Z0-9\s\-'"()?!.,:;]+$/

const recipeSchema = {
    title: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
    description: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
    instructions: Joi.array().items(Joi.string().min(2).max(256).trim().pattern(stringPattern).required()).min(1).required(),
    ingredients: Joi.array().items(Joi.string().min(2).max(256).trim().pattern(stringPattern).required()).min(1).required(),
    category: Joi.string().min(2).max(256).trim().pattern(stringPattern).required(),
    prepTimeMinutes: Joi.number().min(1).max(256).required(),
    cookTimeMinutes: Joi.number().min(1).max(256).required(),
    imageUrl: Joi.string().uri().max(1024).required(),
}

export default recipeSchema
