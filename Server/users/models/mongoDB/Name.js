const mongoose = require('mongoose')
const { DEFAULT_VALIDATORE } = require('../../helpers/mongooseValidator')

const NameSchema = new mongoose.Schema({
    fisrtName: DEFAULT_VALIDATORE,
    lastName: DEFAULT_VALIDATORE
})

module.exports = NameSchema