const mongoose = require('mongoose')
const DEFAULT_SCHEMA_STRING = require('../../helpers/defaultSchemaString')

const Recipe = mongoose.model('recipes', new mongoose.Schema({
    title: DEFAULT_SCHEMA_STRING,
    description: DEFAULT_SCHEMA_STRING,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }],
    tags: [String],
    sections:[{
        type: {
            type: String,
            enum: ['title', 'text', 'image'],
            required: true
        },
        content: {
            type: mongoose.Schema.Types.Mixed,
            required: true
        }
    }]
}, { timestamps: true }))

module.exports = Recipe