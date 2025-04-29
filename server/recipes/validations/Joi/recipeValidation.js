const Joi = require('joi')

const sectionSchema = Joi.object({
    type: Joi.string().valid('title', 'text', 'image').required(),

    content: Joi.alternatives().conditional('type', {
        switch: [
            {
                is: 'title',
                then: Joi.string().min(2).max(256).required()
            },
            {
                is: 'text',
                then: Joi.string().min(10).max(3000).required()
            },
            {
                is: 'image',
                then: Joi.object({
                    url: Joi.string().ruleset.regex( /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).rule({ message: "user image must be a valid url" }).allow(""),
                    alt: Joi.string().min(2).max(256).allow("")
                }).required()
            }
        ],
        otherwise: Joi.forbidden()
    })
})

const validateRecipeWithJoi = (recipe) => {
    const schema = Joi.object({
        title: Joi.string().min(2).max(256).required(),
        description: Joi.string().min(10).max(512).required(),
        image: Joi.object({
            url: Joi.string().ruleset.regex( /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/).rule({ message: "user image must be a valid url" }).allow(""),
            alt: Joi.string().min(2).max(256).allow("")
        }).required(),
        tags: Joi.array().items(Joi.string().min(2).max(50)).max(20).optional(),
        sections: Joi.array().items(sectionSchema).min(1).required()
    })

    return schema.validate(recipe, { abortEarly: false })
}

module.exports = { validateRecipeWithJoi }