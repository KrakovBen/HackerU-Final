const config = require('config')
const express = require('express')
const app = express()
const chalk = require('chalk')

const PORT = config.get("PORT")
const ENV = config.get("NODE_ENV")

app.listen(PORT, async () => {
    console.log(chalk.blue(`✅ - Listening on: http://localhost:${PORT}`))
})