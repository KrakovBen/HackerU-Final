const config = require('config')
const DB_TYPE = config.get("DB_TYPE")
const User = require('./mongoDB/User')
const { pick } = require('lodash')
const LoginUserSchema = require('../models/mongoDB/Login')
const { generateAuthToken } = require('../../auth/providers/jwt')
const { comparePassword, generateUserPassword } = require('../halpers/bcrypt')

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

const getUser = async (_id) => {
    if (DB_TYPE === 'mongoDB') {
        try {
            const user = await User.findById(_id, {password: 0})
            if (!user) throw new Error('לא נמצא משתמש')
            return Promise.resolve(user)
        } catch (error) {
            error.status = 400
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
            if (user) throw new Error('כתובת Email זו כבר רשומה!')

            user = new User(normalizeUser)
            user.password = await generateUserPassword(user.password)
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

const loginUser = async ({email, password}) => {
    if(DB_TYPE === "mongoDB") {
        try {
            const nowTime = new Date()
            const user = await User.findOne({email})
            if (!user) throw new Error('שם משתמש או סיסמה שגויים.')

            console.log(password);
            console.log(user.password);
                
            const validPassword = comparePassword(password, user.password)
            let counter = await LoginUserSchema.findOne({userId: user._id})
            if(counter){
                if(counter.counter.length === 3){
                    const diff = nowTime - counter.counter[2]
                    const day = 3600 * 1000 * 24
    
                    if(diff < day) throw new Error(`עליך להמתין 24 שעות ע״מ להתחבר.`)
                    await LoginUserSchema.findByIdAndDelete(counter._id)
                }
            }

            if(!validPassword) {
                if(!counter) {
                    let login = {userId: user._id, counter: [nowTime]}
                    login = new LoginUserSchema(login)
                    await login.save()
                    throw new Error('שם משתמש או סיסמה שגויים.')
                }

                if(counter.counter.length < 3){
                    counter.counter.push(nowTime)
                    await LoginUserSchema.findByIdAndUpdate(counter._id, {counter: counter.counter})
                    throw new Error('שם משתמש או סיסמה שגויים.')
                }
            }

            const token = generateAuthToken(user)

            if(counter){
                await LoginUserSchema.findByIdAndDelete(counter._id);
            }

            return Promise.resolve(token)
        } catch (error) {
            error.status = 401
            return Promise.reject(error)
        }
    }
    return Promise.resolve('Not in mongoDB')
}

const deleteUser = async (id) => {
    if(DB_TYPE === 'mongoDB') {
        try {
            const user = await User.findByIdAndDelete(id, {isAdmin:0, password:0})
            if(!user) throw new Error('לא נמצא משתמש')
            return Promise.resolve(user)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

const toggleAdmin = async (id) => {
    if (DB_TYPE === 'mongoDB') {
        try {
            let user = await User.findById(id)
            if(!user) throw new Error('לא נמצא משתמש')

            user = await User.findByIdAndUpdate(id, {isAdmin: !user.isAdmin}, {new: true}).select(["-password"])            
            return Promise.resolve(user)
        } catch (error) {
            error.status = 400
            return Promise.reject(error)
        }
    }

    return Promise.resolve('Not in mongoDB')
}

module.exports = { getUsers, registerUser, loginUser, deleteUser, toggleAdmin, getUser }