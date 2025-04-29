const mongoose = require('mongoose')

const RecipeContentSchema = new mongoose.Schema( {
    type: {
        type: String,
        enum: ['title', 'text', 'image'],
        required: true
    },
    content: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: function (value) {
                if (this.type === 'title' || this.type === 'text') {
                    return typeof value === 'string';
                }
                if (this.type === 'image') {
                    return (
                        typeof value === 'object' &&
                        typeof value.url === 'string' &&
                        typeof value.alt === 'string'
                    );
                }
                return false;
            },
            message: 'Invalid content format for section type'
        }
    },
    position: {
        type: Number,
        required: true
    }
}, { _id: false } )

module.exports = RecipeContentSchema