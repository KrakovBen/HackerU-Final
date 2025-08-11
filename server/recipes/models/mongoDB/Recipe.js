const mongoose = require('mongoose')
const { DEFAULT_VALIDATORE } = require('./mongooseValidator')

const RecipeSchema = new mongoose.Schema({
    title: {
        ...DEFAULT_VALIDATORE,
        required: true
    },
    description: DEFAULT_VALIDATORE,
    ingredients: {
        type: [{...DEFAULT_VALIDATORE}],
        required: true
    },
    category: {
        ...DEFAULT_VALIDATORE,
        required: true
    },
    prepTimeMinutes: Number,
    cookTimeMinutes: Number,
    imageUrl: {
        type: String,
        default: ''
    },
    instructions: {
        type: [{...DEFAULT_VALIDATORE, maxLength: 500}],
        default: [],
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    }
}, { timestamps: true })

module.exports = mongoose.model("Recipe", RecipeSchema)