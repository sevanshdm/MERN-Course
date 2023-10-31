// this file is what connects you to MongoDB, you'll use mongoose to do so.

const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) //this URI is from the .env file

        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    } catch(error) {                                            // from colors package
        console.log(error)
        process.exit(1)// exit the process with a failure(1)
    }
}

module.exports = connectDB