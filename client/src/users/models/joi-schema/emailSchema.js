import Joi from 'joi'

const emailSchema = {
    email: Joi.string()
    .email({ tlds: { allow: false } })
    .rule({ message: "יש להכניס כתובת אימייל תקינה" })
    .required()
}

export default emailSchema