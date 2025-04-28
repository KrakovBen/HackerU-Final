const config = require('config')
const express = require('express')
const { handleError } = require('../../utils/errorHandler')
const normalizeUser = require('../helpers/normalizeUser')
const { generateUserPassword } = require('../helpers/bcrypt')
const { validateRegistration, validateLogin } = require('../validations/userValidationService')
const { registerUser } = require('../models/usersAccessDataService')

const router = express.Router()

router.post( '/', async (req, res) => {
    try {
        let user = req.body
        const { error } = validateRegistration(user)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        user = normalizeUser(user)
        user.password = generateUserPassword(user.password)
        
        user = await registerUser(user)
        return res.send(user).status(201)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.post('/login', async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        // const user = await loginUser(req.body)
        return res.send(user).status(200)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router