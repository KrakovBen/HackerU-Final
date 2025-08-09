const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { getRecipes, getRecipe, getAllRecipes, updateRecipe } = require('../models/recipeAccessDataService')
const auth = require('../../auth/authService')
const { verifyAuthToken } = require('../../auth/providers/jwt')
const { getUser } = require('../../users/models/usersAccessDataService')

router.get('/', async (req, res) => {
    try {
        const recipes = await getRecipes()
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get('/all-recipes', async (req, res) => {
    try {
        const recipes = await getAllRecipes()
        res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const recipe = await getRecipe(id)        
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

router.put('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const verifiedUser = verifyAuthToken(req.headers['x-auth-token'])
        if(!req.user.isAdmin && (id != verifiedUser._id)) throw new Error('אינך מורשה לבצע פעולה זו.')
        if( req.user.isAdmin ){
            const userData = await getUser(verifiedUser._id)
            if(!userData.isAdmin) throw new Error('אינך מורשה לבצע פעולה זו.')
        }

        const recipe = await updateRecipe(id, req.body)
        res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router