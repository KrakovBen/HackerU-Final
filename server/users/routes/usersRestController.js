const config = require('config')
const express = require('express')
const { handleError } = require('../../utils/errorHandler')
const normalizeUser = require('../helpers/normalizeUser')
const { generateUserPassword } = require('../helpers/bcrypt')
const { validateRegistration, validateLogin, validateUserUpdate } = require('../validations/userValidationService')
const { registerUser, loginUser, deleteUser, updateUser } = require('../models/usersAccessDataService')
const { verifyAuthToken } = require('../../auth/providers/jwt')
const auth = require('../../auth/authService')

const router = express.Router()

router.post( '/', async (req, res) => {
    try {
        let user = req.body
        const { error } = validateRegistration(user)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        user = normalizeUser(user)
        user.password = generateUserPassword(user.password)
        
        user = await registerUser(user)
        return res.status(201).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.post('/login', async (req, res) => {
    try {
        const { error } = validateLogin(req.body)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        const user = await loginUser(req.body)
        return res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.get('/', async (req, res) => {
    try {
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        if(!req.user.isAdmin && (id.toString() !== req.user._id.toString())) throw new Error('You are not Authorised')
        
        const user = await deleteUser(id)
        return res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.put('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params
        let user = req.body

        const { error } = validateUserUpdate(user)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        if(!user.isAdmin && (id.toString() !== req.user._id.toString())) throw new Error('You are not Authorised')
        
        user = normalizeUser(user)
        user = await updateUser(id, user)
        return res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )


module.exports = router