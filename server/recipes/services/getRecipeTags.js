const axios = require("axios")
const jwt = require("jsonwebtoken")
const config = require('config')
const N8N_API_URL = config.get('N8N_API_URL')
const N8N_API_KEY = config.get('N8N_API_KEY')

function makeJwt() {
    const now = Math.floor(Date.now() / 1000);
    const payload = {
        iss: "bisbook-client",
        sub: "get-recipe-tags",
        aud: "bisbook/tags",
        iat: now,
        exp: now + 300 // 5 דקות
    };
    return jwt.sign(payload, N8N_API_KEY, { algorithm: "HS256" });
}

const getRecipeTags = async ( data ) => {
    try {
        let config = {
            method: 'patch',
            maxBodyLength: Infinity,
            url: `${N8N_API_URL}/bisbook/tags`,
            headers: { 
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${makeJwt()}`
            },
            data : data
        }
          
        const response = await axios(config)

        return response.data
    } catch (error) {
        console.error('Error fetching recipe tags:', error)
        throw error
    }
}

module.exports = { getRecipeTags }