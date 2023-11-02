const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //This id comes from when a new resource is created mongoose auto creates ids on creation.
        required: true,
        ref: 'User', // tells which model an object ID belongs to, which is the user in this case.
    },
    text: {
        type: String,    //triggered if first param isn't fulfilled.
        required: [true, 'Please add a text value']
    }
}, 
{
    timestamps: true // this creates an "updated at" and "created at" field automatically
}
)

//     export model with    Model name, from goalSchema
module.exports = mongoose.model('Goal', goalSchema)