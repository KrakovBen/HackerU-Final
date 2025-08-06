const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { getRecipes, getRecipe, getAllRecipes } = require('../models/recipeAccessDataService')
const auth = require('../../auth/authService')
const Recipe = require('../models/mongoDB/Recipe')

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

module.exports = router