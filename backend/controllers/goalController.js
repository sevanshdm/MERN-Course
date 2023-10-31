// this file is for functionality of goal

// This is for if you don't want to use "try-catches with async functions" and want to use the errorHandler.
const asyncHandler = require('express-async-handler')

// @desc Get goals 
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
   res.status(200).json({ message: 'Get goals' }) // sends back a json file as a response to the client.
})

// @desc Set goals 
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    // error handling
    if(!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field')
    }

    res.status(200).json({ message: 'Set goal' }) 
})

// @desc Update goal
// @route PUT /api/goals:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
   res.status(200).json({ message: `Update goal ${req.params.id}` }) 
})

// @desc Delete goal 
// @route DELETE /api/goal:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Delete goal ${req.params.id}` }) 
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}