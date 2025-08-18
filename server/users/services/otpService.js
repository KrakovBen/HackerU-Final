const crypto = require('crypto')
const bcrypt = require('bcryptjs')
const { v4: uuidv4 } = require('uuid')
const Otp = require('../models/mongoDB/Otp')
const sendEmail = require('./../../services/brevoEmailService')

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

    await sendEmail({
        to: user.email,
        subject: 'קוד אימות חד-פעמי',
        text: `קוד האימות שלך: ${code}\nתקף ל-${OTP_TTL_MIN} דקות.`,
        tags: ['otp','auth']
    })

    return { txId, ttl: OTP_TTL_MIN }
}

const verifyEmailOtp = async ({ txId, code }) => {
    const rec = await Otp.findOne({ txId, used: false })
    if (!rec) {
        const e = new Error('OTP לא קיים או כבר שומש'); e.status = 400; throw e
    }
    if (rec.expiresAt < new Date()) {
        const e = new Error('OTP פג תוקף'); e.status = 400; throw e
    }
    if (rec.attempts >= MAX_ATTEMPTS) {
        const e = new Error('יותר מדי ניסיונות'); e.status = 429; throw e
    }

    const ok = bcrypt.compare(code, rec.codeHash)
    if (!ok) {
        await Otp.updateOne({ _id: rec._id }, { $inc: { attempts: 1 } })
        const e = new Error('קוד שגוי'); e.status = 400; throw e
    }

    await Otp.updateOne({ _id: rec._id }, { used: true })

    return { userId: rec.userId }
}

module.exports = { requestEmailOtp, verifyEmailOtp }