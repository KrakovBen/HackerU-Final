const express = require('express')
const router = express.Router()
const { getUsers, registerUser, loginUser, deleteUser, getUser, toggleAdmin, getUsersWithRecipes, getUserByEmail, updateUserPassword } = require('../models/usersAccessDataService')
const { handleError } = require('../../utils/errorHandler')
const auth = require('../../auth/authService')
const { verifyAuthToken, generateAuthToken } = require('../../auth/providers/jwt')
const { requestEmailOtp, verifyEmailOtp } = require('../services/otpService')

router.get('/', auth, async (req, res) => {
    try {
        if(!req.user.isAdmin) throw new Error('אתה לא מורשה לבצע פעולה זו.')
        
        const users = await getUsers()
        res.status(200).send(users)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get('/users-with-recipes', async (req, res) => {
    try {
        const users = await getUsersWithRecipes()
        res.status(200).send(users)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id        
        const user = await getUser(id)
        res.status(200).send(user)
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
        
        if(!user) throw new Error('שם משתמש או סיסמה שגויים.')
        const otp = await requestEmailOtp(user, req)
    res.status(200).send(otp)
} catch (error) {
    return handleError(res, error.status || 500, error.message)
}
})

router.post('/otp', async (req, res) =>{
    try {
        const { txId, code } = req.body
        let user = await verifyEmailOtp({ txId, code })
        user = await getUser(user.userId)
        const token = generateAuthToken(user)
        res.status(200).send(token)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

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

        const user = await toggleAdmin(id)
        res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.post('/email', async (req, res) => {
    try {
        const { email } = req.body
        const user = await getUserByEmail(email)
        if(!user) throw new Error('כתובת Email שגויה.')
        const otp = await requestEmailOtp(user, req)
        res.status(200).send(otp)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.patch('/:id/password', auth, async (req, res) => {
    try {
        const id = req.params.id
        const { password, verifyPassword } = req.body
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if( password != verifyPassword ) throw new Error('הסיסמאות אינן תואמות.')
        if(id != verifiedUser._id) throw new Error('אינך מורשה לבצע פעולה זו.')
        const user = await updateUserPassword(password, verifyPassword, id)
        res.status(200).send(user)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router