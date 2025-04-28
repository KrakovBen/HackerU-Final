const config = require('config')
const registerValidation = require('./Joi/registerValidation')
const VALIDATOR = config.get("VALIDATOR")

const validateRegistration = (user) => {
    if(VALIDATOR === 'Joi') return registerValidation(user)
    return Promise.reject(new Error('Validator not found'))
}

exports.validateRegistration = validateRegistration