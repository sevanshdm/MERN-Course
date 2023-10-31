const express = require('express')
const dotenv = require('dotenv').config() // will allow us to have a .env file with your variables in it.
const {errorHandler} = require('./middleware/errorMiddleware')
// create a port for your server to run on
const port = process.env.PORT || 5000 // this allows you to access the port variable you created in the .env file, if not found it'll be port 5000

const app = express()

// Middleware (lines 10,12)
//body parser for raw json
app.use(express.json())
//body parser for urlencoded
app.use(express.urlencoded({extended: false}))

// This gets the route
app.use('/api/goals', require('./routes/goalRoutes'))

//This middelware error handler created in errorMiddleware.js will overwrite the default express error handler.
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))