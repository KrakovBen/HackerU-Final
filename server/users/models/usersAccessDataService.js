const config = require('config')
const DATA_BASE = config.get('DATA_BASE')
const { pick } = require('lodash')

const UserSchema = require('./mongoDB/User')

const registerUser = async (normalizeUser) => {
    if(DATA_BASE === 'mongoDB'){
        try {
            const { email } = normalizeUser
            let user = await UserSchema.findOne({email})
            if (user) throw new Error('This Email is already registered!')
            
            user = new UserSchema(normalizeUser)
            user = await user.save()
            user = pick(user, ['name', 'email', '_id'])
            return Promise.resolve(user)
        } catch (error) {
            return Promise.reject(error)
        }
    }
}

module.exports = { registerUser }