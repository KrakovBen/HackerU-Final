const connectDB = (ENVIROMENT) => {
    if(ENVIROMENT === 'development') require('./mongoDB/connectToDev')
    // if(ENVIROMENT === 'production') require('./mongoDB/connectToCloud')
}

module.exports = connectDB