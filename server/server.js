const config = require('config')
const express = require('express')
const app = express()
const chalk = require('chalk')
const cors = require('./middlewares/cors')
const router = require('./router/router')

require('./utils/timeService')

app.use(cors)
app.use(express.json())
app.use(router)

const PORT = config.get("PORT")
const ENV = config.get("NODE_ENV")

app.listen(PORT, () => {
    console.log(chalk.yellowBright(`Listening on: http://localhost:${PORT}`))
    console.log(chalk.yellowBright(`Environment: ${ENV}`))
})