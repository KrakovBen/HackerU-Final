const config = require('config')
const sendEmail = require('../brevoEmailService')
const { renderTemplate } = require('./renderTemplate')

const sendVerificationCode = async ({ to, code, expiresInMinutes, tags = ['verification', 'otp'] }) => {
    if (!to) throw new Error('to is required')
    if (!code) throw new Error('code is required')
    if (!expiresInMinutes) throw new Error('expiresInMinutes is required')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) throw new Error('invalid email')
    if (!Number.isFinite(expiresInMinutes) || expiresInMinutes <= 0) throw new Error('invalid expiresInMinutes')

    const appName = 'Bisbook'
    const supportEmail = config.get('EMAIL_FROM_EMAIL')
    const year = new Date().getFullYear()

    const subject = `קוד אימות • ${appName}`

    const html = renderTemplate('verification-code', { appName, code, expiresInMinutes, supportEmail, year })

    const text = `הקוד שלך: ${code}. תקף ל-${expiresInMinutes} דקות. אם לא ביקשת—התעלם.`

    return sendEmail({ to, subject, text, html, tags })
}

module.exports = { sendVerificationCode }