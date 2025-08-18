const connectDB = (ENVIROMENT) => {
    if(ENVIROMENT === 'development') require('./mongoDB/connectToLocal')
    if(ENVIROMENT === 'production') require('./mongoDB/connectToCloud')
}

module.exports = connectDB