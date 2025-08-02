const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({origin: ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173", 'http://10.10.0.110:5173', 'http://10.10.0.110:3000'], credentials: true, optionsSuccessStatus: 200}))

module.exports = app