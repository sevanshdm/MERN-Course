const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    text: {
        type: String,    //triggered if first param isn't fulfilled.
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true // this creates an "updated at" and "created at" field automatically
}
)

module.exports = mongoose.model('Goal', goalSchema)