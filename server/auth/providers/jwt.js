const jwt = require('jsonwebtoken')
const config = require('config')

const JWT_KEY = config.get("JWT_KEY")
const JWT_EXPIRES_IN = config.get("JWT_EXPIRES_IN")

const generateAuthToken = (user) => {
    const { _id, isAdmin } = user

    const token = jwt.sign({ _id, isAdmin }, JWT_KEY, { expiresIn: JWT_EXPIRES_IN })

    return token
}

const verifyAuthToken = (token) => {
    try {
        const userData = jwt.verify(token, JWT_KEY)
        return userData
    } catch (error) {
        if (error.name === 'TokenExpiredError') return null
        return null
    }
}

module.exports = { verifyAuthToken, generateAuthToken }