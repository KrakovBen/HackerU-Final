const mongoose = require('mongoose')
const { DEFAULT_VALIDATORE } = require('../../helpers/mongooseValidator')

const NameSchema = new mongoose.Schema({
    first: DEFAULT_VALIDATORE,
    middle: {
        type: String,
        maxLength: 256,
        trim: true,
        lowercase: true
    },
    last: DEFAULT_VALIDATORE
}, { _id: false })  

module.exports = NameSchema