const config = require('config')
const DB_TYPE = config.get("DB_TYPE")
const User = require('./mongoDB/User')
const { pick } = require('lodash')

const getUsers = async () => {
    if( DB_TYPE === "mongoDB") {
        try {
            const users = await User.find({}, {password: 0})
            if(!users.length) return ([])
            return Promise.resolve(users)
        } catch (error) {
            error.status = 404
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const registerUser = async (normalizeUser) => {
    if(DB_TYPE === "mongoDB") {
        try {
            const { email } = normalizeUser
            let user = await User.findOne({email})
            if (user) throw new Error('This Email is already registered!')

            user = new User(normalizeUser)
            user = await user.save()
            user = pick(user, ['name', 'email', '_id'])

            return Promise.resolve(user)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

module.exports = { getUsers, registerUser }