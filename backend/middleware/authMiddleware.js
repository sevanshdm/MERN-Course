const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {
    let token
                                                            // JS method
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {                                   // Bearer whateverthetokenishere
            //Get token from header
            token = req.headers.authorization.split(' ')[1] //split() turns it into an array and splits it by the " " and sees Bearer in first index and token in second
                                                    // this'll give us just the token
            // Verify Token
            const decoded =  jwt.verify(token, process.env.JWT_SECRET)

            // Get user from the token            // this .select and "-" makes it so password isn't included
            req.user = await User.findById(decoded.id).select('-password') //allows us to get the payload after it's decoded. The Id was set in userController.js
                                                                            // in generateToken funct when it was signed, you set the Id.
            next() //moves along and calls the next piece of middleware
        } catch (error) {                              
            console.log(error)
            res.status(401)
            throw new Error('Not authorized')
        }
    }

    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = { protect }