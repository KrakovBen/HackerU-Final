const mongoose = require('mongoose')
const DEFAULT_SCHEMA_STRING = require('../../helpers/defaultSchemaString')
const RecipeContentSchema = require('./RecipeContent')
const ImageSchema = require('./Image')

const RecipeSchema = new mongoose.Schema({
    title: DEFAULT_SCHEMA_STRING,
    description: DEFAULT_SCHEMA_STRING,
    image: ImageSchema,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }],
    tags: [String],
    sections:[RecipeContentSchema]
}, { timestamps: true })

module.exports = mongoose.model("recipe", RecipeSchema)