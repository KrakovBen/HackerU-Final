import Joi from 'joi'

const otpSchema = {
    otp: Joi.string()
    .ruleset.regex(/^[0-9]{6}$/)
    .rule({ message: "יש להכניס קוד אימות תקין" })
    .required()
}

export default otpSchema