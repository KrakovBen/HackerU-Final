const config = require('config')
const express = require('express')
const router = express.Router()
const { handleError } = require('../../utils/errorHandler')
const { auth } = require('../../auth/authService')
const { getRecipes } = require('../models/recipesAccessDataService')

router.get('/', async (req, res) => {
    try {
        const recipes = await getRecipes()
        return res.status(200).send(recipes)
    } catch (error) {
        return handleError(res, error.status || 500, error.message)
    }
})

module.exports = router