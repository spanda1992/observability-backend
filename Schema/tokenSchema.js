const mongoose = require('mongoose')

const tokenSchema = mongoose.Schema({

    userID :{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },

    token:{
        type:String,
        required:true
    },
    timeStamp :{

        type:Date,
        default:Date.now,
        required:true
    }
})

const Token = mongoose.model('Token',tokenSchema)

module.exports = Token