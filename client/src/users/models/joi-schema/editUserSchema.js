import Joi from "joi"

const editUserSchema = Joi.object({
    firstName: Joi.string().min(2).max(256).required(),
    middleName: Joi.string().min(2).max(256).allow(""),
    lastName: Joi.string().min(2).max(256).required(),
    phoneNumber: Joi.string().ruleset.regex(/0[0-9]{1,2}-?\s?[0-9]{3}\s?[0-9]{4}/)
    .rule({ message: 'יש להזין מספר טלפון תקין' })
    .required(),
    password: Joi.string().ruleset.regex(
        /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
      )
      .rule({
        message:
          'יש להזין סיסמה המכילה אותיות באנגלית (אות קטנה וגדולה) מספרים ותו מיוחד',
      })
      .required()
})

export default editUserSchema