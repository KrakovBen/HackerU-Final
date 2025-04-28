const config = require('config')
const registerValidation = require('./Joi/registerValidation')
const loginValidation = require('./loginValidation')
const VALIDATOR = config.get("VALIDATOR")

const validateRegistration = (user) => {
    if(VALIDATOR === 'Joi') return registerValidation(user)
}

const validateLogin = (user) => {
    if(VALIDATOR === 'Joi') return loginValidation(user)
}

exports.validateRegistration = validateRegistration
exports.validateLogin = validateLogin