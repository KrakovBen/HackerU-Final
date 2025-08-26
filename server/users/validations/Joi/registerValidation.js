const Joi = require('joi')

const registerValidation = (user) => {
    const schema = Joi.object({
        name: Joi.object().keys({
            first: Joi.string().min(2).max(256).required(),
            last: Joi.string().min(2).max(256).required()
        }).required(),
        email: Joi.string().ruleset.pattern(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).rule({ message: 'כתובת אימייל זו אינה תקינה' }).required(),
        password: Joi.string().ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/).rule({ message: 'הסיסמה חייבת להכיל לפחות 7 תווים, אות גדולה, אות קטנה, ותו מיוחד' }).required(),
        isAdmin: Joi.boolean().default(false)
    })

    return schema.validate(user)
}

module.exports = registerValidation