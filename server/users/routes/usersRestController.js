const express = require('express')
const router = express.Router()
const { getUsers, registerUser } = require('../models/usersAccessDataService')
const { handleError } = require('../../utils/errorHandler')

router.get('/', async (req, res) => {
    try {
        const users = await getUsers()
        res.status(200).send(users)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await registerUser(req.body)
        res.status(201).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router