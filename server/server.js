const config = require('config')
const chalk = require('chalk')
const express = require('express')
const app = express()
const cors = require('./middlewares/cors')
const router = require('./router/router')

app.use(cors)
app.use(express.json())
app.use(router)

const PORT = config.get("PORT")
const ENV = config.get("NODE_ENV")

app.listen(PORT, async () => {
    console.log(chalk.blue(`✅ - Listening on: http://localhost:${PORT}`))
})