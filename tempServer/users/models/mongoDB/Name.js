const mongoose = require('mongoose')
const { DEFAULT_VALIDATORE } = require('../../halpers/mongooseValidator')

const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATORE,
    last: DEFAULT_VALIDATORE
}, { id: false })

module.exports = NameSchema