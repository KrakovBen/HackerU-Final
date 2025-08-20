const fs = require('fs')
const path = require('path')

function renderTemplate(templateName, variables ) {
    const templatePath = path.join( __dirname, 'templates', `${templateName}.html` )

    let html = fs.readFileSync(templatePath, 'utf8')

    for (const [key, value] of Object.entries(variables)) {
        const regex = new RegExp(`{{\\s*${key}\\s*}}`, 'g')
        html = html.replace(regex, value)
    }

    return html
}

module.exports = { renderTemplate }