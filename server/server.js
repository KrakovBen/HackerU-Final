const config = require('config')
const express = require('express')
const path = require('path')
const app = express()
const chalk = require('chalk')
const cors = require('./middlewares/cors')
const logger = require('./logger/loggerService')
const router = require('./router/router')
const connectDB = require('./db/dbService')
const generateInitialData = require('./initialData/initialDataService')

require('./utils/timeService')

app.use(cors)
app.use(logger)
app.use(express.json())
app.use(router)
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

const PORT = config.get("PORT")
const ENV = config.get("NODE_ENV")

app.listen(PORT, async () => {
    console.log(chalk.yellowBright(`Listening on: http://localhost:${PORT}`))
    connectDB(ENV)
    await generateInitialData()
})