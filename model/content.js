const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    age:String,
    height:String,
    weight:String,
    // vegtrian:String,
    // gender:String,
    // conditions:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})

module.exports = mongoose.model('Content',contentSchema,'content');