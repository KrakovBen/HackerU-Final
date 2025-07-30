const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:8181", "http://127.0.0.1:8181", "http://localhost:9191", "http://127.0.0.1:9191"], optionsSuccessStatus: 200}))

module.exports = app