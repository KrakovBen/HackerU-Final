const express = require('express')
const { handleError } = require('../utils/errorHandler')

const router = express.Router()

const usersRestController = require('../users/routes/usersRestController')
const recipesRestController = require('../recipes/routes/recipesRestController')

router.use('/users', usersRestController)
router.use('/recipes', recipesRestController)

router.use((err, req, res, next) => {
    handleError(res, 404, 'Error 404: Page not found.')
})

module.exports = router