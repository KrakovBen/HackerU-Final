const config = require('config')
const axios = require("axios")
const { handleBadRequest } = require('../utils/errorHandler')
const BREVO_API_URL = config.get('BREVO_API_URL')
const EMAIL_FROM_NAME = config.get('EMAIL_FROM_NAME')
const EMAIL_FROM_EMAIL = config.get('EMAIL_FROM_EMAIL')

const DEFAULT_FROM = {
    name: EMAIL_FROM_NAME,
    email: EMAIL_FROM_EMAIL,
}

const sendEmail = async ({ to, subject, text, html, from = DEFAULT_FROM, tags }) => {
    try {
        if (!config.get('BREVO_API_KEY')) throw new Error("BREVO_API_KEY חסר")
        if (!to) throw new Error("שדה to חסר")
        if (!subject) throw new Error("שדה subject חסר")
        if (!text && !html) throw new Error("חייבים text או html")
        
        const payload = {
            sender: from,
            to: [{ email: to }],
            subject,
            ...(tags ? { tags } : {}),
            ...(text ? { textContent: text } : {}),
            ...(html ? { htmlContent: html } : {})
        }
    
        const response = await axios.post(BREVO_API_URL, payload, {
            headers: {
                "api-key": config.get('BREVO_API_KEY'),
                "content-type": "application/json",
                "accept": "application/json"
            },
            timeout: 15000
        })
    
        return response.data
    } catch (error) {
        return handleBadRequest("Brevo", error.response?.data || error.message)
    }
}

module.exports = sendEmail