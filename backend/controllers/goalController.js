// this file is for functionality of goal

// This is for if you don't want to use "try-catches with async functions" and want to use the errorHandler.
const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')

// @desc Get goals 
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find() //finds all goals

   res.status(200).json(goals) // sends back a json file as a response to the client.
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

    const goal = await Goal.create({
        text: req.body.text
    })

    res.status(200).json(goal) 
})

// @desc Update goal
// @route PUT /api/goals:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
    })

   res.status(200).json(updatedGoal) 
})

// @desc Delete goal 
// @route DELETE /api/goal:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    await goal.deleteOne()

    res.status(200).json({ id: req.params.id }) 
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}