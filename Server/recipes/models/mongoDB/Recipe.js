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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    prepTimeMinutes: Number,
    cookTimeMinutes: Number,
    imageUrl: String,
    tags: [String],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })

module.exports = mongoose.model("Recipe", RecipeSchema)