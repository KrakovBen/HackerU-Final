import Joi from "joi"

const signupSchema = {
  email: Joi.string()
    .ruleset.pattern(/^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+)\.([a-zA-Z]{2,5})$/)
    .rule({ message: 'יש להזין כתובת אי-מייל תקנית' })
    .required(),
  password: Joi.string()
    .ruleset.regex(
      /((?=.*\d{1})(?=.*[A-Z]{1})(?=.*[a-z]{1})(?=.*[!@#$%^&*-]{1}).{7,20})/
    )
    .rule({
      message:
        'הסיסמה חייבת לכלול לפחות 9 תווים, אות גדולה, אות קטנה, מספר ותו מיוחד',
    })
    .required()
}

export default signupSchema