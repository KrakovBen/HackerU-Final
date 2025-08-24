const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Otp = require('../models/mongoDB/Otp')
const { sendVerificationCode } = require('../../services/mail/sendVerificationCode')

const OTP_LEN = 6
const OTP_TTL_MIN = 10
const MAX_ATTEMPTS = 5

const requestEmailOtp = async (user, req) => {
    const code = String(crypto.randomInt(0, 10 ** OTP_LEN)).padStart(OTP_LEN, '0')
    const codeHash = await bcrypt.hash(code, 10)
    const txId = uuidv4()
    const expiresAt = new Date(Date.now() + OTP_TTL_MIN * 60 * 1000)

    await Otp.create({
        txId,
        userId: user._id,
        codeHash,
        expiresAt,
        meta: { ip: req.ip, ua: req.get('user-agent') }
    })

    await sendVerificationCode({ to: user.email, code, expiresInMinutes: OTP_TTL_MIN, tags: ['otp', 'auth'] })

    return { txId, ttl: OTP_TTL_MIN }
}

const verifyEmailOtp = async ({ txId, code }) => {
    const rec = await Otp.findOne({ txId, used: false })
    if (!rec) {
        const error = new Error('OTP לא קיים או כבר שומש'); error.status = 400; throw error
    }
    if (rec.expiresAt < new Date()) {
        const error = new Error('OTP פג תוקף'); error.status = 400; throw error
    }
    if (rec.attempts >= MAX_ATTEMPTS) {
        const error = new Error('יותר מדי ניסיונות'); error.status = 429; throw error
    }

    const ok = await bcrypt.compare(code, rec.codeHash)
    if (!ok) {
        await Otp.updateOne({ _id: rec._id }, { $inc: { attempts: 1 } })
        const error = new Error('קוד שגוי'); error.status = 400; throw error
    }

    await Otp.updateOne({ _id: rec._id }, { used: true })

    return { userId: rec.userId }
}

module.exports = { requestEmailOtp, verifyEmailOtp }