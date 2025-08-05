const express = require('express')
const router = express.Router()
const { getUsers, registerUser, loginUser, deleteUser, getUser, toggleAdmin } = require('../models/usersAccessDataService')
const { handleError } = require('../../utils/errorHandler')
const auth = require('../../auth/authService')
const { verifyAuthToken } = require('../../auth/providers/jwt')

router.get('/', auth, async (req, res) => {
    try {
        if(!req.user.isAdmin) throw new Error('אתה לא מורשה לבצע פעולה זו.')
        
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

router.post('/login', async (req, res) => {
    try {
        const user = await loginUser(req.body)
        res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if(!req.user.isAdmin && (id != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
        
        const user = await deleteUser(id)
        res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.patch('/:id/admin', auth, async (req, res) => {
    try {
        const id = req.params.id

        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if(!req.user.isAdmin && (id != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
        
        const chackUserPermission = await getUser(req.user._id)
        if(!chackUserPermission.isAdmin) throw new Error('אינך מורשה לבצע פעולה זו.')

        const user = await toggleAdmin(id);
        res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router