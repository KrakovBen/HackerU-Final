const config = require('config')
const DATA_BASE = config.get('DATA_BASE')
const { pick } = require('lodash')

const UserSchema = require('./mongoDB/User')
const LoginUserSchema = require('./mongoDB/Login')
const { comparePassword } = require('../helpers/bcrypt')
const { generateAuthToken } = require('../../auth/providers/jwt')

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

const loginUser = async ({ email, password }) => {
    if(DATA_BASE === 'mongoDB'){
        try {
            const nowTime = new Date()
            const user = await UserSchema.findOne({email})
            if (!user) throw new Error('Invalid email or Password.')
            const validPassword = comparePassword(password, user.password)
            let counter = await LoginUserSchema.findOne({userId: user._id})

            if(counter){
                if(counter.counter.length === 3){
                    const diff = nowTime - counter.counter[2]
                    const day = 3600 * 1000 * 24
    
                    if(diff < day) throw new Error(`You need to wait 24 hours to login`)
                    await LoginUserSchema.findByIdAndDelete(counter._id)
                }
            }

            if(!validPassword) {
                if(!counter) {
                    let login = {userId: user._id, counter: [nowTime]}
                    login = new LoginUserSchema(login)
                    await login.save()
                    throw new Error('Invalid email or Password.')
                }

                if(counter.counter.length < 3){
                    counter.counter.push(nowTime)
                    await LoginUserSchema.findByIdAndUpdate(counter._id, {counter: counter.counter})
                    throw new Error('Invalid email or Password.')
                }
            }

            const token = generateAuthToken(user)

            if(counter){
                await LoginUserSchema.findByIdAndDelete(counter._id);
            }

            return Promise.resolve(token)
        } catch (error) {
            error.status = 403
            return Promise.reject(error)
        }
    }
}

module.exports = { registerUser, loginUser }