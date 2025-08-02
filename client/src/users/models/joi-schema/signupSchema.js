import Joi from 'joi'

const signupSchema = {
    firstName: Joi.string().min(2).max(256).required(),
    lastName: Joi.string().min(2).max(256).required(),
    email: Joi.string()
    .email({ tlds: { allow: false } })
    .rule({ message: "יש להכניס כתובת אימייל תקינה" })
    .required(),
    password: Joi.string()
    .ruleset.regex(/((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/)
    .rule({ message: "יש להכניס סיסמה עם לפחות 7 תווים, אות גדולה, אות קטנה, תו מיוחד ומספרים" })
    .required()
}

export default signupSchema