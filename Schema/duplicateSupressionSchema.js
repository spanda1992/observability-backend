const mongoose = require('mongoose')

const duplicateSuppressionTimeSchema = new mongoose.Schema({

    timeWindow:{
        type:Number,
        required:true,
        unique:true
    }
})

const DuplicateSUppressionTime = mongoose.model('DuplicateTimeWindow',duplicateSuppressionTimeSchema)

module.exports = DuplicateSUppressionTime