const express = require('express')
const router = express.Router()
const { handleError } = require('../utils/errorHandler')

router.use((err, req, res, next) => {
    handleError(res, 404, 'Error 404: Page not found.')
})

module.exports = router