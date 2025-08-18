const config = require('config')
const mongoose = require('mongoose')
const chalk = require('chalk')
const DB_URL = config.get('DB_URL')

mongoose.connect(DB_URL)
.then( ()=>{ console.log(chalk.magentaBright('Connected to monogDB Cloud'))})
.catch((error)=> console.log(chalk.redBright.bold(`monogDB error: ${error}`)))