const express = require('express')
const router = express.Router() // Router objects handle requests.
const {getGoals, setGoal, updateGoal, deleteGoal} = require ('../controllers/goalController')

const {protect} = require('../middleware/authMiddleware')

            // you can put in middleware(protect) here, this one protects the route
router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal)

//this is what the routes looked like before lines 5-6 of code above

// get request to listen for, and a function of what to do with that request
// router.get('/', getGoals) // getGoals is from goalController.js

// router.post('/', setGoal)

// update request 
// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)


module.exports = router