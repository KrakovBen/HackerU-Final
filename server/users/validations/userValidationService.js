const config = require('config')
const registerValidation = require('./Joi/registerValidation')
const loginValidation = require('./Joi/loginValidation')
const userUpdateValidation = require('./Joi/userUpdateValidation')
const VALIDATOR = config.get("VALIDATOR")

const validateRegistration = (user) => {
    if(VALIDATOR === 'Joi') return registerValidation(user)
}

const validateLogin = (user) => {
    if(VALIDATOR === 'Joi') return loginValidation(user)
}

const validateUserUpdate = user => {
    if (VALIDATOR === "Joi") return userUpdateValidation(user)  
}

exports.validateRegistration = validateRegistration
exports.validateLogin = validateLogin
exports.validateUserUpdate = validateUserUpdate