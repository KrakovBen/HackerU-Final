const express = require('express')
const router = express.Router()
const { handleError } = require('../utils/errorHandler')
const usersRouter = require('../users/routes/usersRestController')

router.use('/users', usersRouter)

router.use((err, req, res, next) => {
    handleError(res, 404, 'Error 404: Page not found.')
})

module.exports = router