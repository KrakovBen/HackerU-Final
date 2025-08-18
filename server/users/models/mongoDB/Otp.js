const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    txId: {
        type: String,
        index: true,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        index: true
    },
    codeHash: String,
    expiresAt: Date,
    attempts: {
        type: Number,
        default: 0
    },
    used: {
        type: Boolean,
        default: false
    },
    meta: {
        ip: String,
        ua: String
    }
}, { timestamps: true })

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

module.exports = mongoose.model('Otp', otpSchema)