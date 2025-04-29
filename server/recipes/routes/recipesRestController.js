// const config = require('config')
const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { getRecipes, createRecipe, updateRecipe, likeRecipe } = require('../models/recipesAccessDataService')
const auth = require('../../auth/authService')
const { normalizeRecipe } = require('../helpers/normalizeRecipe')
const { validateRecipe } = require('../validations/recipesValidationService')

router.get('/', async (req, res) => {
    try {
        const recipes = await getRecipes(req)
        return res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.post('/', auth, async (req, res) => {
    try {
        const user = req.user
        // if(!user.isBusiness) throw new Error('You are not a business account')

        let recipe = req.body
        const { error } = validateRecipe(recipe)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)
        
        recipe = await normalizeRecipe(recipe, user._id)
        recipe = await createRecipe(recipe)
        return res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.put('/:id', auth, async (req, res) => {
    try {
        let recipe = req.body
        const recipeId = req.params.id
        const authUser = req.user
        // if(!authUser.isBusiness) throw new Error('You are not Business User!')

        const { error } = validateRecipe(recipe)
        if (error) return handleError(res, 400, `Joi Error: ${error.details[0].message}`)

        recipe = await normalizeRecipe(recipe, authUser._id)
        recipe = await updateRecipe(recipeId, recipe)
        return res.status(200).send(recipe)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

router.patch('/:id', auth, async (req, res) => {
    try {
        const id = req.params.id
        const userId = req.user._id
        const likes = await likeRecipe(id, userId)
        return res.status(200).send(likes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
} )

module.exports = router