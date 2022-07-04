const mongoose = require('mongoose')

const entityListSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true
    },

    source:{
        type:String,
        required:true
    },

    priority:{
        type:String,
        required:true
    },

    assignmentGroup:{
        type:String,
        required:true
    },

    cmdbCI: {
        type:String,
        required:true
    }
})

const EntityList = mongoose.model('EntityList',entityListSchema)

module.exports = EntityList