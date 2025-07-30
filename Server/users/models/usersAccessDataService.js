const config = require('config')
const DB_TYPE = config.get("DB_TYPE")
const UserSchema = require('./mongoDB/User')

const getUsers = async () => {
    if( DB_TYPE === "mongoDB") {
        try {
            const users = await UserSchema.find({}, {password: 0})
            if(!users.length) return ([])
            return Promise.resolve(users)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

module.exports = { getUsers }