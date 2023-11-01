const express = require('express')
const router = express.Router() // Router objects handle requests.
const {getGoals, setGoal, updateGoal, deleteGoal} = require ('../controllers/goalController')

router.route('/').get(getGoals).post(setGoal)
router.route('/:id').put(updateGoal).delete(deleteGoal)

//this is what the routes looked like before lines 5-6 of code above

// get request to listen for, and a function of what to do with that request
// router.get('/', getGoals) // getGoals is from goalController.js

// router.post('/', setGoal)

// update request 
// router.put('/:id', updateGoal)

// router.delete('/:id', deleteGoal)


module.exports = router