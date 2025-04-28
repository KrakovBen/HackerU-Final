const mongoose = require('mongoose')
const chalk = require('chalk')
const config = require('config')
const DATABASE_URL = config.get('DATABASE_URL')

mongoose.connect(DATABASE_URL)
    .then( () => { console.log(chalk.bgBlue('🫙 - Connected to monogDB [ DEVELOPMENT ]'))})
    .catch((error) => { console.log(chalk.redBright.bold(`monogDB error: ${error}`))})