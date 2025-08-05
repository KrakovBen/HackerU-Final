const bcrypt = require('bcryptjs')

const generateUserPassword = async (password) => bcrypt.hashSync(password, 10)
const comparePassword = (password, anotherPassword) => bcrypt.compareSync(password, anotherPassword)

module.exports = { generateUserPassword, comparePassword }