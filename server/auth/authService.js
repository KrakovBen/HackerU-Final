const config = require('config')
const { handleError } = require('../utils/errorHandler')
const { verifyAuthToken } = require('./providers/jwt')

const tokenGenerator = config.get('TOKEN_GENERATOR')
console.log(tokenGenerator);


const auth = (req, res, next) => {
    if(tokenGenerator === 'jwt') {
        try {
            const tokenFromClient = req.headers['x-auth-token']
            if(!tokenFromClient) throw new Error('האימות נכשל: יש לבצע התחברות.')

            const userInfo = verifyAuthToken(tokenFromClient)
            if(!userInfo) throw new Error('האימות נכשל: אינך מורשה לבצע פעולה זו.')

            req.user = userInfo
            return next()
        } catch (error) {
            handleError(res, 401, error.message)
        }
    }

    return handleError(res, 500, 'אתה לא משתמש ב-JWT')
}

module.exports = auth