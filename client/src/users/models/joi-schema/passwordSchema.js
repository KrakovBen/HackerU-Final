import Joi from 'joi'

const passwordSchema = {
    password: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({ message: "יש להכניס סיסמה עם לפחות 7 תווים, אות גדולה, אות קטנה, תו מיוחד ומספרים" })
    .required(),
    verifyPassword: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({ message: "יש להכניס סיסמה עם לפחות 7 תווים, אות גדולה, אות קטנה, תו מיוחד ומספרים" })
    .required()
}

export default passwordSchema